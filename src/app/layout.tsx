import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RevealOnce } from "@/components/reveal-once";
import { site } from "@/config/site";
import { JsonLd, localBusinessSchema, websiteSchema } from "@/lib/schema";
import { warnOnPlaceholders } from "@/lib/seo";
import "./globals.css";

/**
 * DM Sans is the only face on the site. Low-contrast and geometric; the
 * optical-size axis tightens the display sizes and opens up the small text on
 * its own.
 */
const dmSans = DM_Sans({ subsets: ["latin"], axes: ["opsz"], variable: "--font-dm-sans", display: "swap" });

/** Homepage slogan only: squared, slanted condensed caps that echo the
    PADDOCK PRO lettering on the shop wall */
const slogan = Barlow_Condensed({
  subsets: ["latin"],
  weight: "800",
  style: "italic",
  variable: "--font-slogan",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  formatDetection: { telephone: true, address: true, email: true },
  category: "automotive",
};

export const viewport: Viewport = {
  themeColor: "#0d1b2e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  warnOnPlaceholders();

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${slogan.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-navy text-chalk">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-wall focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-navy"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <RevealOnce />

        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
