import { site } from "@/config/site";
import { serviceLabel, timelineLabel, type QuoteInput } from "./quote-schema";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

/**
 * Emails are deliberately light-themed, table-based and inline-styled — the
 * site's dark palette does not survive contact with Outlook or Gmail's clipper.
 */
function shell(title: string, body: string) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>${esc(title)}</title></head>
<body style="margin:0;padding:24px 12px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#18181b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;">
    <tr><td style="height:5px;background:#22b4e8;"></td></tr>
    <tr><td style="padding:28px 32px 8px;">
      <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#71717a;">${esc(site.name)}</p>
      <h1 style="margin:10px 0 0;font-size:22px;line-height:1.2;color:#18181b;">${esc(title)}</h1>
    </td></tr>
    <tr><td style="padding:20px 32px 32px;">${body}</td></tr>
    <tr><td style="padding:18px 32px;background:#fafafa;border-top:1px solid #e4e4e7;font-size:12px;line-height:1.6;color:#71717a;">
      ${esc(site.name)} · ${esc(site.address.street)}, ${esc(site.address.city)}, ${esc(site.address.region)} ${esc(site.address.postalCode)}<br>
      <a href="${site.phoneHref}" style="color:#71717a;">${esc(site.phone)}</a> ·
      <a href="mailto:${esc(site.email)}" style="color:#71717a;">${esc(site.email)}</a>
    </td></tr>
  </table>
</body></html>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#71717a;width:38%;vertical-align:top;">${esc(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;font-size:15px;color:#18181b;vertical-align:top;">${value}</td>
  </tr>`;
}

/** Notification sent to the shop. reply-to is set to the customer. */
export function shopNotification(data: QuoteInput) {
  const rows = [
    row("Name", esc(data.name)),
    data.company ? row("Company", esc(data.company)) : "",
    row("Email", `<a href="mailto:${esc(data.email)}" style="color:#1460a9;">${esc(data.email)}</a>`),
    data.phone ? row("Phone", `<a href="tel:${esc(data.phone)}" style="color:#1460a9;">${esc(data.phone)}</a>`) : "",
    row("Services", data.services.map((s) => esc(serviceLabel(s))).join("<br>")),
    row("Vehicle", esc(data.vehicle)),
    data.vehicleCount > 1 ? row("Vehicle count", String(data.vehicleCount)) : "",
    row("Timeline", esc(timelineLabel(data.timeline))),
    data.referral ? row("Heard about us via", esc(data.referral)) : "",
    row("Details", nl2br(data.message)),
  ]
    .filter(Boolean)
    .join("");

  const subject = `Quote request — ${data.name}${data.company ? ` (${data.company})` : ""} · ${data.vehicle}`;

  const html = shell(
    "New quote request",
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
     <p style="margin:24px 0 0;font-size:13px;color:#71717a;">Hit reply to answer ${esc(data.name)} directly.</p>`,
  );

  const text = [
    `New quote request — ${site.name}`,
    "",
    `Name: ${data.name}`,
    data.company && `Company: ${data.company}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    `Services: ${data.services.map(serviceLabel).join(", ")}`,
    `Vehicle: ${data.vehicle}`,
    data.vehicleCount > 1 && `Vehicle count: ${data.vehicleCount}`,
    `Timeline: ${timelineLabel(data.timeline)}`,
    data.referral && `Heard via: ${data.referral}`,
    "",
    "Details:",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

/** Confirmation sent back to the customer so the enquiry doesn't feel like a void. */
export function customerConfirmation(data: QuoteInput) {
  const subject = `We've got your enquiry — ${site.name}`;

  const html = shell(
    `Thanks, ${esc(data.name.split(" ")[0])}`,
    `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;">
       Your enquiry is in and a real person will read it. We normally reply within one business day.
     </p>
     <p style="margin:0 0 16px;font-size:15px;line-height:1.65;">
       <strong>Speed this up:</strong> reply to this email with a few photos of the vehicle — a three-quarter
       front, a straight side, and close-ups of any existing damage or previous paintwork. Photos are the
       difference between a rough range and a firm number.
     </p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0;background:#fafafa;border:1px solid #e4e4e7;">
       <tr><td style="padding:16px 18px;">
         <p style="margin:0 0 6px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#71717a;">What you sent</p>
         <p style="margin:0;font-size:14px;line-height:1.6;">
           <strong>${esc(data.vehicle)}</strong><br>
           ${data.services.map((s) => esc(serviceLabel(s))).join(" · ")}<br>
           ${esc(timelineLabel(data.timeline))}
         </p>
       </td></tr>
     </table>
     <p style="margin:0;font-size:15px;line-height:1.65;">
       In a hurry? Call the shop on
       <a href="${site.phoneHref}" style="color:#1460a9;font-weight:600;">${esc(site.phone)}</a>.
     </p>`,
  );

  const text = [
    `Thanks, ${data.name.split(" ")[0]} — we've got your enquiry.`,
    "",
    "A real person will read it and we normally reply within one business day.",
    "",
    "Speed this up: reply to this email with photos of the vehicle — a three-quarter front,",
    "a straight side, and close-ups of any damage or previous paintwork.",
    "",
    `What you sent: ${data.vehicle}`,
    `Services: ${data.services.map(serviceLabel).join(", ")}`,
    `Timeline: ${timelineLabel(data.timeline)}`,
    "",
    `In a hurry? Call ${site.phone}.`,
    "",
    site.name,
  ].join("\n");

  return { subject, html, text };
}
