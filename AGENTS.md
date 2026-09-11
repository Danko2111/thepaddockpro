<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-rules -->

# The Paddock Pro — project rules

**Business data lives in exactly one place.** `src/config/site.ts` holds every
phone number, address, hour and social URL. It feeds the header, footer, contact
page, quote emails, sitemap and JSON-LD. Never hard-code NAP details in a
component or page.

**Content is data, not JSX.** Service copy lives in `src/config/services.ts` (six services);
process steps, materials and aftercare in `src/config/process.ts`. Pages read
from those and render. Adding a service means adding an object, not a page.

**The gallery is filesystem-driven.** Images go in
`public/gallery/<service-folder>/descriptive-file-name.jpg`. The folder becomes
the filter, the filename becomes the caption and alt text.
`scripts/build-gallery-manifest.mjs` runs on `predev`/`prebuild` and writes
`src/data/gallery.generated.json` with dimensions and blur placeholders. Never
edit the generated file — use `src/data/gallery-overrides.json`.

**Every page ships JSON-LD.** Use the builders in `src/lib/schema.tsx` and the
`buildMetadata()` helper in `src/lib/seo.ts`. A new page without a canonical URL
and a breadcrumb is incomplete.

**Keep it static.** Every route prerenders. Server Components by default; the
only Client Components are the header, the gallery grid, the quote form and
`Reveal`. Don't add a client boundary without a reason that survives scrutiny.

**American English** throughout the copy.
<!-- END:project-rules -->
