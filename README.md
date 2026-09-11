# Paddock Pro

Marketing site for **Paddock Pro** — vehicle wraps, paint protection film, fleet
graphics, window tint and ceramic coating in Langley, BC.
Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · Resend · deployed on Vercel.

Every route prerenders to static HTML. There is no database and no CMS.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # add your Resend key
npm run dev                    # http://localhost:3000
```

`npm run dev` and `npm run build` both rebuild the gallery manifest first.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run gallery` | Rebuild the gallery manifest by hand |
| `npm run placeholders` | Regenerate placeholder imagery |

---

## 1. Before launch — fill in the business details

**Everything lives in `src/config/site.ts`.** It is the only file with business
data in it, and every `⛔ TODO` in it must be replaced. In development the app
prints a warning listing anything still on a placeholder.

That one file drives the header, the footer, the contact page, the quote emails,
`sitemap.xml`, `robots.txt`, canonical URLs and the `AutoBodyShop` structured
data Google reads for the local pack.

The address block must match the shop's **Google Business Profile character for
character** — inconsistent NAP data is the most common local-SEO own goal.

---

## 2. Adding work to the gallery

Drop the photo into the folder for its service:

```
public/gallery/colour-change/porsche-992-satin-black.jpg
public/gallery/ppf/bmw-m4-full-front-ppf.jpg
public/gallery/fleet/acme-plumbing-transit-van.jpg
public/gallery/decals/civic-type-r-chrome-delete.jpg
public/gallery/window-tint/bmw-x5-ceramic-tint-rear.jpg
public/gallery/ceramic-coating/porsche-cayenne-ceramic-coating.jpg
```

That is the whole workflow. On the next build the script reads the folder and:

- uses the **folder** as the gallery filter category
- turns the **filename** into the caption — so name files the way a customer
  would describe the car, because that text becomes the image `alt` and is what
  Google Images actually reads
- measures the image so it reserves layout space (no cumulative layout shift)
- generates a blur-up placeholder
- keeps `ImageObject` structured data in sync

Prefix a filename with a number (`01-porsche-992.jpg`) to pin it to the top.
Everything else sorts newest first.

Need a custom caption or a featured flag? Add an entry to
`src/data/gallery-overrides.json` keyed by the image path. Don't hand-edit
`gallery.generated.json` — it is rewritten on every build.

**Before real photos land**, the folders hold generated placeholders stamped
`PLACEHOLDER`. Delete them as real work comes in.

---

## 3. Quote form email — Resend setup

1. Create an account at [resend.com](https://resend.com).
2. **Domains → Add domain**, add `thepaddockpro.com`, and add the SPF/DKIM
   records it gives you to your DNS. Wait for verification. Mail sent before the
   domain verifies will not deliver.
3. **API Keys → Create**, then set `RESEND_API_KEY` in `.env.local` and in
   Vercel → Settings → Environment Variables.
4. Confirm `fromEmail` and `quoteInbox` in `src/config/site.ts` use the verified
   domain.

Without the key, the form fails politely and tells the visitor to call — it
never silently swallows a lead.

**What happens on submit:** Zod validation → honeypot check → sub-3-second
timing check → per-IP rate limit → notification to the shop with `reply-to` set
to the customer → confirmation email to the customer.

The form works with JavaScript disabled.

Rate limiting is in-process (`src/lib/rate-limit.ts`), so on serverless it is
burst protection rather than a hard guarantee. If the form ever gets targeted,
swap the `Map` for Vercel KV or Upstash — the function signature already
matches. Adding Cloudflare Turnstile is the other obvious next step.

---

## 4. Deploying to Vercel

1. Push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new).
   Framework detection and build settings need no changes.
2. Add `RESEND_API_KEY` for Production, Preview and Development.
3. Add the domain under **Settings → Domains** and point DNS at Vercel.
4. `site.url` is set to the apex `https://paddockpro.ca`. Add both apex and
   `www` in Vercel and let it redirect `www` → apex, so only one host is ever
   indexed.

### The old site on this domain

`paddockpro.ca` previously ran a site built by another company, which replaced
it with an ad for their own business. Two things follow:

- **Confirm registrar and DNS access before scheduling a launch.** Everything
  else is blocked on it.
- **Build a redirect map.** Old URLs Google still has indexed will 404 on
  launch, and a wall of 404s on a domain with existing local authority throws
  away rankings the shop already paid for. `next.config.ts` has the empty
  `redirects()` array and instructions for recovering the old URL list from the
  Wayback Machine.

---

## 5. Post-launch SEO checklist

Code-side SEO is done: static rendering, self-hosted fonts, per-route canonicals
and Open Graph, `AutoBodyShop` / `Service` / `FAQPage` / `HowTo` / `Article` /
`ImageGallery` / `BreadcrumbList` structured data, generated `sitemap.xml` and
`robots.txt`, one `<h1>` per page, descriptive alt text on every image.

The rest is off-site and only the shop can do it:

- [ ] **Google Business Profile** — already live with 5.0 from 9 reviews. Point
      its Website field at the new site the day it launches, and keep the
      profile name (`Paddock Pro`) and address byte-identical to
      `src/config/site.ts`.
- [ ] **Geo coordinates** — the one remaining ⛔ in `site.ts`. Right-click the
      shop door in Google Maps, copy the lat/long, paste it in. They are
      omitted from structured data until then.
- [ ] **Verify the BC tint regulations** quoted on `/services/window-tint`
      against the current Motor Vehicle Act Regulations before launch, and
      re-check annually. Stating the law wrongly is worse than not stating it.
- [ ] **Google Search Console** — verify the domain, submit `/sitemap.xml`.
- [ ] **Bing Webmaster Tools** — same, takes five minutes.
- [ ] **NAP consistency** — identical name, address and phone on the site, GBP,
      Apple Maps, Yelp and any trade directories.
- [ ] **Reviews** — ask every happy customer. Volume and recency both count.
- [ ] **Real photography** — replace every placeholder. Original photos of local
      work is the one asset competitors cannot copy.
- [ ] **Social profiles** — Instagram and Google are wired. Add Facebook to
      `site.social` if one exists; those URLs become `sameAs` in structured
      data and help Google connect the entity.
- [ ] **Higher-resolution logo.** `public/brand/logo.png` is 150×150, which is
      soft on retina headers. A 512px+ PNG or an SVG would fix it.
- [ ] Run PageSpeed Insights on the live domain and keep an eye on INP.

---

## 6. Where things live

```
src/
  config/
    site.ts            ← all business data. The file to edit.
    services.ts        ← service copy, options, specs, FAQs
    process.ts         ← process steps, materials, aftercare
    nav.ts             ← header and footer navigation
  lib/
    seo.ts             ← buildMetadata() + placeholder warnings
    schema.tsx         ← JSON-LD builders and the <JsonLd> component
    gallery.ts         ← reads the manifest, composes alt text
    quote-schema.ts    ← Zod schema shared by form and server action
    emails.ts          ← quote notification + customer confirmation
    rate-limit.ts
  components/          ← header, footer, UI primitives, page sections
  app/                 ← routes, sitemap.ts, robots.ts, opengraph-image.tsx
  data/
    gallery.generated.json   ← generated, do not edit
    gallery-overrides.json   ← hand-authored overrides
scripts/
  build-gallery-manifest.mjs
  make-placeholders.mjs      ← delete once real photos are in
public/gallery/<service>/    ← drop photos here
```

### Adding a service

Add an object to the `services` array in `src/config/services.ts` and create
`public/gallery/<its galleryCategory>/`. The route, navigation entry, footer
link, sitemap entry, gallery filter and structured data all follow automatically.

### Re-skinning

`src/app/globals.css` holds the whole design system as Tailwind v4 tokens.
Changing `--color-accent` re-skins the site.
