"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { site } from "@/config/site";
import { customerConfirmation, shopNotification } from "@/lib/emails";
import { quoteSchema, type QuoteState } from "@/lib/quote-schema";
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
    timeline: formData.get("timeline") || "researching",
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
  const shopEmail = shopNotification(data);

  try {
    const { error } = await resend.emails.send({
      from: site.fromEmail,
      to: [site.quoteInbox],
      replyTo: data.email,
      subject: shopEmail.subject,
      html: shopEmail.html,
      text: shopEmail.text,
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
    const confirmation = customerConfirmation(data);
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
