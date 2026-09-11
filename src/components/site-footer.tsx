import Image from "next/image";
import Link from "next/link";
import { GoogleRating } from "./google-rating";
import { footerNav } from "@/config/nav";
import { site, fullAddress } from "@/config/site";
import { Container } from "./ui/container";

const DAY_ABBR: Record<string, string> = {
  Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu",
  Friday: "Fri", Saturday: "Sat", Sunday: "Sun",
};

function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, "0")}${suffix}`;
}

function formatDays(days: readonly string[]) {
  if (days.length === 1) return DAY_ABBR[days[0]];
  return `${DAY_ABBR[days[0]]}–${DAY_ABBR[days[days.length - 1]]}`;
}

export function SiteFooter() {
  const socials = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className="border-t border-line bg-ink-soft">
      <div className="hatch h-1.5 w-full opacity-60" aria-hidden />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Identity + NAP. This block is the canonical NAP for local SEO —
              it must match the Google Business Profile character for character. */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo.png"
                alt=""
                width={150}
                height={150}
                className="h-10 w-10 object-contain"
              />
              <span className="font-display text-base font-extrabold uppercase tracking-[0.05em] text-chalk">
                Paddock&nbsp;Pro
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fog">{site.tagline}.</p>

            <GoogleRating className="mt-6" />

            <address className="mt-7 space-y-1 text-sm not-italic leading-relaxed text-fog">
              <div className="text-chalk">{site.address.street}{site.address.unit && `, ${site.address.unit}`}</div>
              <div>{site.address.city}, {site.address.region} {site.address.postalCode}</div>
              <div className="pt-3">
                <a href={site.phoneHref} className="text-chalk transition-colors hover:text-accent">
                  {site.phone}
                </a>
              </div>
              <div>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
                  {site.email}
                </a>
              </div>
            </address>

            {socials.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-2">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block border border-line px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fog transition-colors hover:border-accent hover:text-accent"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {footerNav.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="eyebrow">{column.heading}</h2>
              <ul className="mt-6 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-fog transition-colors hover:text-chalk">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="eyebrow">Opening hours</h2>
            <dl className="mt-6 space-y-2 text-sm">
              {site.hours.map((row) => (
                <div key={row.days.join()} className="flex justify-between gap-4 border-b border-line pb-2">
                  <dt className="text-fog">{formatDays(row.days)}</dt>
                  <dd className="tabular text-chalk">
                    {formatTime(row.opens)} – {formatTime(row.closes)}
                  </dd>
                </div>
              ))}
              {site.closedDays.map((day) => (
                <div key={day} className="flex justify-between gap-4 border-b border-line pb-2">
                  <dt className="text-fog">{DAY_ABBR[day]}</dt>
                  <dd className="text-fog-dim">Closed</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-3 bg-accent px-5 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent-ink transition-colors hover:bg-accent-hot"
            >
              Request a quote <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fog-dim">
            © {new Date().getFullYear()} {site.legalName} · {fullAddress}
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fog-dim">
            3M · Avery Dennison · Inozetek
          </p>
        </div>
      </Container>
    </footer>
  );
}
