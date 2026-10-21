"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { site } from "@/config/site";
import { customerConfirmation, shopNotification } from "@/lib/emails";
import { PHOTO_LIMITS, quoteSchema, type QuoteState } from "@/lib/quote-schema";
import { rateLimit } from "@/lib/rate-limit";

const MIN_FILL_SECONDS = 3;

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const raw = {
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    company: formData.get("company") ?? "",
    services: formData.getAll("services").map(String),
    vehicle: formData.get("vehicle") ?? "",
    vehicleCount: formData.get("vehicleCount") || 1,
    message: formData.get("message") ?? "",
    referral: formData.get("referral") ?? "",
    website: formData.get("website") ?? "",
    renderedAt: formData.get("renderedAt") || 0,
  };

  const parsed = quoteSchema.safeParse(raw);

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      status: "error",
      message: "Some details need another look.",
      errors: flat.fieldErrors as QuoteState["errors"],
    };
  }

  const data = parsed.data;

  // Photos arrive already resized by the form; this guards against anything
  // that skipped it
  const photos = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const photoError = checkPhotos(photos);
  if (photoError) {
    return { status: "error", message: photoError, errors: { photos: [photoError] } };
  }

  // ── Spam gates. Bots get a success response so they stop retrying. ────────
  if (data.website) return { status: "success" };

  const elapsed = data.renderedAt ? (Date.now() - data.renderedAt) / 1000 : Infinity;
  if (elapsed < MIN_FILL_SECONDS) return { status: "success" };

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  const limit = rateLimit(`quote:${ip}`);
  if (!limit.ok) {
    return {
      status: "error",
      message: `That's a few requests in a short window. Try again in ${Math.ceil(
        limit.retryAfterSeconds / 60,
      )} minutes, or call the shop on ${site.phone}.`,
    };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — quote request was not delivered:", data.email);
    return {
      status: "error",
      message: `Our form isn't sending right now. Please call ${site.phone} or email ${site.email} — sorry about that.`,
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const shopEmail = shopNotification(data, photos.length);
  const attachments = await Promise.all(
    photos.map(async (photo, i) => ({
      filename: photoFilename(photo, i),
      content: Buffer.from(await photo.arrayBuffer()),
    })),
  );

  try {
    const { error } = await resend.emails.send({
      from: site.fromEmail,
      to: [site.quoteInbox],
      replyTo: data.email,
      subject: shopEmail.subject,
      html: shopEmail.html,
      text: shopEmail.text,
      attachments,
    });

    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("Quote notification failed to send:", err);
    return {
      status: "error",
      message: `We couldn't get that through. Please call ${site.phone} or email ${site.email} directly.`,
    };
  }

  // Confirmation is best-effort — the shop already has the lead either way.
  try {
    const confirmation = customerConfirmation(data, photos.length);
    await resend.emails.send({
      from: site.fromEmail,
      to: [data.email],
      replyTo: site.email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
  } catch (err) {
    console.error("Customer confirmation failed (lead was still delivered):", err);
  }

  return { status: "success" };
}

function checkPhotos(photos: File[]): string | null {
  if (photos.length > PHOTO_LIMITS.maxCount) {
    return `Up to ${PHOTO_LIMITS.maxCount} photos per request. Send the rest by replying to your confirmation email.`;
  }
  const types: readonly string[] = PHOTO_LIMITS.types;
  if (photos.some((photo) => !types.includes(photo.type))) {
    return "Photos need to be JPEG, PNG or WebP images.";
  }
  const total = photos.reduce((sum, photo) => sum + photo.size, 0);
  if (photos.some((photo) => photo.size > PHOTO_LIMITS.maxBytesEach) || total > PHOTO_LIMITS.maxBytesTotal) {
    return "Those photos are too large to send. Try fewer, or reply to your confirmation email with them.";
  }
  return null;
}

/** "photo-1.jpg", keeping a safe version of the customer's own name where there is one */
function photoFilename(photo: File, i: number) {
  const ext = photo.type === "image/png" ? "png" : photo.type === "image/webp" ? "webp" : "jpg";
  const stem = photo.name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9-_]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `photo-${i + 1}${stem ? `-${stem}` : ""}.${ext}`;
}
