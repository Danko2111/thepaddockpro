import { site } from "./site";

export type Service = {
  slug: string;
  index: string;
  name: string;
  shortName: string;
  navLabel: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  /** Matches a folder name under /public/gallery */
  galleryCategory: string;
  intro: string[];
  options: { name: string; detail: string }[];
  materials: string[];
  spec: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "colour-change-wraps",
    index: "01",
    name: "Full Colour Change Wraps",
    shortName: "Colour Change",
    navLabel: "Colour change wraps",
    tagline: "A new finish, without touching the factory paint.",
    metaTitle: "Vinyl Car Wraps in Langley, BC",
    metaDescription:
      "Full colour change vinyl wraps in gloss, satin, matte, metallic and color-shift finishes. Installed with 3M 2080, Avery SW900 and Inozetek film over fully disassembled panels.",
    galleryCategory: "colour-change",
    intro: [
      "A colour change wrap is a cast vinyl film laid over your existing paint. Done properly it reads like a factory finish from three feet away and reverses cleanly years later, which is why it has become the default way to change a car's colour without committing to a respray.",
      "The difference between a wrap that lasts five years and one that lifts in five months is almost entirely preparation. We remove badges, handles, lights and trim rather than cutting around them, decontaminate every panel, and post-heat every tucked edge and recess so the film loses its memory and stays where it was put.",
    ],
    options: [
      { name: "Gloss", detail: "The closest match to factory paint. Shows prep quality more than any other finish, so panels are corrected and decontaminated before film goes on." },
      { name: "Satin & matte", detail: "Low-sheen finishes that flatten reflections and emphasise bodylines. Fingerprint-resistant topcoats on the premium films." },
      { name: "Metallic & pearl", detail: "Flake and pearl films that shift under direct light. Panel sequencing matters — we lay adjacent panels from the same roll to keep flake orientation consistent." },
      { name: "Color-shift", detail: "Multi-tone films that travel through a colour range with viewing angle. Highest material cost and the least forgiving to install." },
      { name: "Textured", detail: "Carbon fibre, brushed metal and textured films, typically used on roofs, spoilers, mirrors and interior trim rather than full bodies." },
      { name: "Partial wraps", detail: "Roof, hood, spoiler or two-tone treatments when a full change is more than the car needs." },
    ],
    materials: ["3M 2080 Series", "Avery Dennison SW900", "Inozetek Super Gloss"],
    spec: [
      { label: "Typical shop time", value: "4–7 days" },
      { label: "Expected life", value: "5–7 years, garage-kept" },
      { label: "Reversible", value: "Yes, on healthy OEM paint" },
      { label: "Film type", value: "Cast, air-release, repositionable" },
    ],
    faqs: [
      {
        q: "Will a wrap damage my paint?",
        a: "On healthy factory paint, no — cast wrap film is designed to be removed with heat and leaves the surface as it was found. The risk is not the film, it is what is underneath it. Resprayed panels, aftermarket bodywork, existing stone chips and areas of failing clear coat can lift during removal. We inspect for this before quoting and will tell you if a panel is a risk.",
      },
      {
        q: "How long does a car wrap last?",
        a: "Five to seven years is realistic for a garage-kept vehicle on a premium cast film. Cars parked outdoors full time in strong sun sit closer to three to five, and horizontal surfaces — roof, hood, trunk — always age first because they take the most UV. Finish matters too: gloss and satin generally outlast chrome and color-shift films.",
      },
      {
        q: "Can you wrap over a respray or damaged paint?",
        a: "Sometimes, but it changes the conversation. Vinyl telegraphs whatever is underneath, so orange peel, sanding marks and chips will show through. More importantly, aftermarket paint bonds less predictably than factory paint and can lift on removal. If your car has been resprayed, tell us before the quote and we will assess the panels in person.",
      },
      {
        q: "How do I wash a wrapped car?",
        a: "Hand wash with a pH-neutral soap and a clean mitt. Avoid automatic brush washes, keep pressure washers back from edges and seams, and remove bug splatter, fuel spills and bird droppings quickly — those etch film faster than they etch paint. Matte and satin finishes take a dedicated matte-safe soap and no wax or polish.",
      },
    ],
  },
  {
    slug: "paint-protection-film",
    index: "02",
    name: "Paint Protection Film",
    shortName: "PPF",
    navLabel: "Paint protection film",
    tagline: "Clear urethane armour for the panels that take the hits.",
    metaTitle: "Paint Protection Film in Langley, BC",
    metaDescription:
      "Self-healing paint protection film in partial front, full front, track and full-body coverage. Computer-cut patterns with wrapped edges to guard against stone chips and road rash.",
    galleryCategory: "ppf",
    intro: [
      "Paint protection film is a thick clear urethane laid over your paint to absorb stone chips, road rash and light scratching. Unlike a ceramic coating — which is a hard, microns-thin layer that helps with chemical etching and cleaning — PPF has real physical thickness and is the only product that actually stops a rock.",
      "Modern film has a self-healing topcoat: fine swirls and wash marks close up with heat from the sun or warm water. We cut patterns to your specific vehicle and, where the panel allows, wrap the film around the edge so there is no visible line collecting dirt at the panel border.",
    ],
    options: [
      { name: "Partial front", detail: "Bumper, mirrors, and the leading 18–24 inches of hood and fenders. The budget-conscious option, but it leaves a visible line across the hood." },
      { name: "Full front", detail: "Full hood, full fenders, bumper, mirrors and headlights, with no cut line to see. The most common choice and the one we recommend." },
      { name: "Track pack", detail: "Full front plus rocker panels, A-pillars, roof leading edge and rear-arch blast zones — the panels that suffer on track days and long highway miles." },
      { name: "Full body", detail: "Every painted panel. Usually chosen for collectible, high-value or delivery-mileage cars." },
      { name: "High-wear spots", detail: "Door cups, door edges, sill plates, load lip and the fuel filler. Inexpensive, and they cover the damage owners actually notice." },
      { name: "Matte & colored film", detail: "Satin-finish PPF that converts a gloss car to matte while protecting it, and gloss film over an existing vinyl wrap." },
    ],
    materials: ["3M Scotchgard Pro Series", "Avery Dennison Supreme Defense"],
    spec: [
      { label: "Typical shop time", value: "2–5 days by coverage" },
      { label: "Manufacturer warranty", value: "Up to 10 years" },
      { label: "Self-healing", value: "Yes, heat-activated topcoat" },
      { label: "Over a wrap", value: "Yes, on fully cured vinyl" },
    ],
    faqs: [
      {
        q: "PPF or a ceramic coating — which do I need?",
        a: "They solve different problems and are frequently sold as if they were alternatives. PPF is physical thickness that stops stone chips and road rash. A ceramic coating is a thin chemical layer that makes the car easier to clean and more resistant to etching and UV, but it will not stop a rock. The common answer is PPF on the front-facing panels and a coating over the whole car, including over the film.",
      },
      {
        q: "Will I be able to see the film?",
        a: "At the edges, if you look for them. We wrap edges around panels wherever the geometry allows, which hides the line entirely. Where a panel cannot be wrapped, the film is cut just inside the edge so the boundary sits in a shadow line rather than in the middle of a flat surface. On a clean install you will know where it is; a passer-by will not.",
      },
      {
        q: "How long does PPF last?",
        a: "Premium films carry manufacturer warranties up to ten years against yellowing, cracking, bubbling and delamination. Real-world life tracks how the car is used and stored — daily-driven cars parked outdoors will show wear on the bumper and hood leading edge well before a garage-kept weekend car does.",
      },
      {
        q: "Can PPF be removed later?",
        a: "Yes. Removed with heat by someone who has done it before, the film comes off cleanly and the paint underneath is generally in better condition than the surrounding unprotected panels. Film left far past its life gets brittle and harder to remove, so it is worth replacing on schedule rather than running it to failure.",
      },
    ],
  },
  {
    slug: "fleet-graphics",
    index: "03",
    name: "Commercial & Fleet Graphics",
    shortName: "Fleet",
    navLabel: "Fleet & commercial",
    tagline: "Rolling advertising that survives the work week.",
    metaTitle: "Fleet & Commercial Wraps in Langley, BC",
    metaDescription:
      "Fleet wraps, van lettering, box truck and trailer graphics on 3M and Avery Dennison cast print media. Scheduled around your operating hours to keep vehicles earning.",
    galleryCategory: "fleet",
    intro: [
      "A wrapped work vehicle is the cheapest advertising a local business owns. It is paid for once, it runs every day the vehicle runs, and it markets to exactly the neighbourhoods you already serve. The number that matters is cost per impression, and nothing else in a small-business marketing budget comes close.",
      "Commercial work is a scheduling problem as much as an installation problem. Vehicles off the road are vehicles not earning, so we stage fleet rollouts around your operating hours, keep your artwork and cut files on record, and match the finish exactly when you add trucks a year from now.",
    ],
    options: [
      { name: "Full wraps", detail: "Printed cast media over the whole vehicle, edge to edge. Maximum visual impact and the strongest choice for a design-led brand." },
      { name: "Partial wraps", detail: "Printed panels on the doors, rear and quarter sections, blended into the vehicle's factory colour. Most of the presence at a fraction of the material." },
      { name: "Cut vinyl lettering", detail: "Weeded, contour-cut logo and text applied direct to the body. The economical, legible choice for trades that just need name, service and number." },
      { name: "Box trucks & trailers", detail: "Large-format panels on box bodies, curtains and trailers, including riveted and corrugated surfaces that need heat and specific application technique." },
      { name: "Vans", detail: "Transit, Sprinter, ProMaster and Express, wrapped around body swages, sliding-door tracks and glass without lifting at the seams." },
      { name: "Reflective & conspicuity", detail: "Reflective film and DOT conspicuity tape for vehicles that work at night or on the roadside." },
    ],
    materials: ["3M IJ180 + 8518 overlaminate", "Avery MPI 1105 + DOL series"],
    spec: [
      { label: "Artwork accepted", value: "Vector .ai / .eps / .pdf" },
      { label: "Design service", value: "Available — ask when quoting" },
      { label: "Per-vehicle turnaround", value: "1–3 days" },
      { label: "Expected life", value: "5–7 years with laminate" },
    ],
    faqs: [
      {
        q: "How long will my van be off the road?",
        a: "A single van is typically one to three days depending on whether it is a full wrap, a partial or cut lettering — plus design time up front if we are producing the artwork. For a multi-vehicle fleet we stage the rollout so you never have more than an agreed number of vehicles in the shop at once. Tell us your operating constraints when you enquire and we will build the schedule around them.",
      },
      {
        q: "What artwork do you need from us?",
        a: "Vector artwork is ideal — .ai, .eps or a vector .pdf, with fonts outlined and any brand colors specified as Pantone or CMYK. If all you have is a logo lifted off a website we can usually redraw it, and if you have no artwork at all we can design to your brand from scratch. Send whatever you have and we will tell you what is missing.",
      },
      {
        q: "Can you match our existing fleet?",
        a: "Yes, and this is exactly why we keep production files. We record the print profile, media, laminate and cut files for every commercial job, so a truck added three years from now prints to the same colour on the same material as the first one. If you are coming from another shop, bring a wrapped vehicle by and we will color-match to it.",
      },
      {
        q: "What happens at the end of a lease?",
        a: "We remove the graphics and return the vehicle to plain bodywork. Removal is far easier on film that is within its rated life, so it is worth planning removal around your lease-end date rather than letting graphics bake for an extra two summers. Removal is quoted separately and is usually a same-day job per vehicle.",
      },
    ],
  },
  {
    slug: "decals-and-accents",
    index: "04",
    name: "Decals, Accents & Chrome Delete",
    shortName: "Decals",
    navLabel: "Decals & accents",
    tagline: "Small jobs, held to exactly the same standard.",
    metaTitle: "Chrome Delete & Custom Decals in Langley",
    metaDescription:
      "Chrome delete, roof and mirror wraps, racing stripes, badge overlays and custom cut decals. The detail work that changes a car's character without a full wrap.",
    galleryCategory: "decals",
    intro: [
      "Not every car needs a full colour change. Blacking out the window trim, wrapping the roof or reworking the badges can shift a car's character more than most owners expect, for a fraction of the cost and in a fraction of the time.",
      "These are the jobs where shortcuts show most clearly, because everything happens at the edges — around trim, into recesses, along a beltline your eye follows the length of the car. Same disassembly, same post-heat, same standard as a full wrap.",
    ],
    options: [
      { name: "Chrome delete", detail: "Window surrounds, beltline trim, grille frames, mirror caps and badge surrounds taken to gloss or satin black — the single highest-impact change per dollar on most modern cars." },
      { name: "Roof & pillar wraps", detail: "Gloss black roof and pillar treatments that create a floating-roof look on cars that never offered one." },
      { name: "Racing stripes", detail: "Centre stripes, over-the-top and rally-style graphics, laid out on the car and checked for symmetry against bodylines before anything is committed." },
      { name: "Badge treatments", detail: "Emblem overlays, de-badging and blackout kits, done by removing the badge rather than cutting around it." },
      { name: "Accent panels", detail: "Mirror caps, spoilers, diffusers, bonnet vents and interior trim in gloss, satin, carbon or brushed finishes." },
      { name: "Custom & one-off", detail: "Track numbers, sponsor decals, windshield banners, club graphics and anything else that can be cut, printed or plotted." },
    ],
    materials: ["3M 2080 Series", "Avery Dennison SW900", "Cut & print vinyl"],
    spec: [
      { label: "Chrome delete", value: "Typically 1 day" },
      { label: "Roof wrap", value: "Typically 1 day" },
      { label: "Stripes & decals", value: "Same day to 1 day" },
      { label: "Reversible", value: "Yes, fully" },
    ],
    faqs: [
      {
        q: "What exactly is a chrome delete?",
        a: "Wrapping every bright chrome trim piece on the car — window surrounds, beltline strips, grille frames, sometimes badges and mirror caps — in gloss or satin black film. It is the change people notice without being able to name, and on most modern cars it is the best value modification available.",
      },
      {
        q: "Do you remove the trim, or wrap around it?",
        a: "We remove it wherever it can be removed without damage. Wrapping around a piece of trim leaves a cut line at the exact place your eye travels along the car, and it is where a lazy install starts lifting first. Some pieces are bonded from the factory and genuinely cannot come off — on those we cut in place, carefully, and tell you in advance.",
      },
      {
        q: "Can you wrap just the roof or the mirrors?",
        a: "Yes, and it is one of our more common requests. Roof wraps, mirror caps, spoilers and pillar trim are all quick jobs with a disproportionate effect on how the car reads. Send a photo of your car when you enquire and we will quote the specific pieces.",
      },
      {
        q: "How long do stripes and decals last?",
        a: "The same five to seven years as a full wrap, because it is the same cast film. Smaller pieces on horizontal surfaces — hood stripes, roof graphics — take the most UV and will show age first. The advantage of small jobs is that refreshing them later is cheap.",
      },
    ],
  },
  {
    slug: "window-tint",
    index: "05",
    name: "Window Tint",
    shortName: "Tint",
    navLabel: "Window tint",
    tagline: "Heat and UV out, without the purple fade.",
    metaTitle: "Window Tinting in Langley, BC",
    metaDescription:
      "Ceramic and carbon window tint installed in Langley, BC. Real infrared heat rejection, 99% UV block, no signal interference, and cut to BC's legal limits.",
    galleryCategory: "window-tint",
    intro: [
      "Most people buy tint for how it looks and keep it for what it does to the cabin. A quality ceramic film rejects a large share of the infrared energy that actually makes a car hot, which you feel within a minute of getting in on a July afternoon in the Valley. It also blocks essentially all UV, which is what bakes and cracks a dashboard and fades upholstery over a few summers.",
      "The film grade matters more here than in almost any other product we install. Cheap dyed film turns purple and bubbles within a couple of years. Metallic film blocks heat well and interferes with GPS, cell and tyre-pressure sensors. Ceramic does the job without either problem, which is why it is what we quote by default.",
    ],
    options: [
      { name: "Ceramic film", detail: "The default recommendation. High infrared rejection, 99%+ UV block, no metal so no interference with GPS, cell or TPMS signals, and it holds its colour instead of fading purple." },
      { name: "Carbon film", detail: "A step below ceramic on heat rejection but colour-stable and non-metallic. A sensible choice when budget matters more than peak IR performance." },
      { name: "Rear-only tint", detail: "Rear side glass and rear windshield. Given BC's front-window rules, this is what most tint jobs on a daily driver actually look like." },
      { name: "Windshield strip", detail: "A tinted band across the top of the windshield, kept within the depth BC allows. Cuts low-sun glare on east-west runs." },
      { name: "Sun-strike and privacy", detail: "Heavier film on rear glass for privacy and back-seat comfort, common on family vehicles and work vans." },
      { name: "Tint removal", detail: "Stripping failed, bubbled or purpled film and cleaning the adhesive off the glass and defroster lines without damaging them." },
    ],
    materials: ["3M ceramic and carbon film"], // ⛔ TODO confirm the film brand the shop actually stocks
    spec: [
      { label: "Typical shop time", value: "Half a day to 1 day" },
      { label: "UV rejection", value: "99%+ on ceramic" },
      { label: "Signal interference", value: "None — non-metallic" },
      { label: "Cure time", value: "3–5 days, longer when cold" },
    ],
    faqs: [
      {
        /* ⛔ TODO — verify against the current BC Motor Vehicle Act Regulations
           (Division 7.05) before this page goes live, and re-check annually.
           Stating the law wrongly is worse than not stating it. */
        q: "What are the tint laws in BC?",
        a: "British Columbia is stricter than most provinces on front windows. The rules as they stand: no aftermarket film on the driver and front passenger windows unless it still lets more than 70% of light through, which rules out most films people picture when they think of tint. The windshield may only be tinted across a narrow band at the top. Rear side windows and the rear windshield have no darkness restriction, provided the vehicle has working mirrors on both sides. Medical exemptions exist and are handled through the province. We install to the current regulation and will tell you what is and is not legal on your vehicle before you book.",
      },
      {
        q: "Is ceramic tint actually worth the extra?",
        a: "For heat, yes, and it is not a subtle difference. Darkness and heat rejection are not the same thing — a cheap dark dyed film can block less infrared than a lighter ceramic one. Ceramic also stays the colour it started, where dyed film goes purple and starts bubbling, usually right around the time you have forgotten what you paid for it.",
      },
      {
        q: "Will tint interfere with my phone, GPS or TPMS?",
        a: "Not with the films we install. Interference comes from metallised films, which reject heat using a thin metal layer that also happens to attenuate radio signals. Ceramic and carbon films contain no metal, so GPS, cellular, keyless entry and tyre-pressure sensors all behave normally.",
      },
      {
        q: "How long before I can roll the windows down?",
        a: "Give it three to five days, and longer in cold or damp weather. Film is applied with a slip solution that has to fully evaporate through the film before the adhesive reaches full strength. You may see some haze or small water pockets during that window — those clear on their own. Rolling a window down early is the one thing that genuinely ruins a fresh tint job.",
      },
    ],
  },
  {
    slug: "ceramic-coating",
    index: "06",
    name: "Ceramic Coating",
    shortName: "Ceramic",
    navLabel: "Ceramic coating",
    tagline: "Easier washing, deeper gloss, real chemical resistance.",
    metaTitle: "Ceramic Coating in Langley, BC",
    metaDescription:
      "Professional ceramic coating over paint, PPF or vinyl wrap. Paint correction first, then a bonded SiO₂ layer that repels water, resists etching and makes the car far easier to keep clean.",
    galleryCategory: "ceramic-coating",
    intro: [
      "A ceramic coating is a liquid silica polymer that bonds to your clear coat and cures into a hard, slick, hydrophobic layer. Water beads and sheets off instead of sitting, road film has less to grip, and washing gets dramatically quicker — which matters more than it sounds, because most swirl marks in paint come from washing, not from driving.",
      "Be clear about what it is not. A coating is measured in microns and will not stop a stone chip; that is what film is for. What it does do is resist the chemical attacks that actually mark paint on the coast — bird droppings, tree sap, road salt, industrial fallout and hard-water spotting — and hold a gloss level that wax cannot maintain past a couple of months.",
    ],
    options: [
      { name: "Paint correction first", detail: "A coating locks in whatever is underneath it, permanently. Swirls and etching get corrected before anything is applied — this is the majority of the labour and the majority of the cost." },
      { name: "Single-stage coating", detail: "One bonded layer over corrected paint. The sensible baseline for a daily driver kept outdoors." },
      { name: "Multi-layer systems", detail: "Base plus topper for greater thickness, sharper water behaviour and longer service life. Suited to vehicles that get used hard and washed often." },
      { name: "Coating over PPF", detail: "Film-safe coating applied over paint protection film, so the film itself becomes hydrophobic and easier to clean. The standard pairing with a full front." },
      { name: "Coating over vinyl", detail: "Wrap-safe coating over a cured colour change. Makes a wrapped car far easier to wash and helps gloss films hold their depth." },
      { name: "Glass, wheels and trim", detail: "Coated glass sheds rain at speed and needs the wipers less. Coated wheels release brake dust instead of baking it on." },
    ],
    materials: ["Professional-grade SiO₂ coatings"], // ⛔ TODO name the actual coating brand and warranty tier
    spec: [
      { label: "Typical shop time", value: "2–4 days with correction" },
      { label: "Expected life", value: "2–5 years by system" },
      { label: "Over PPF or vinyl", value: "Yes, film-safe products" },
      { label: "First 7 days", value: "No wash while curing" },
    ],
    faqs: [
      {
        q: "Ceramic coating or PPF — which should I get?",
        a: "They are not competitors, they are layers. PPF is physical thickness that stops stone chips and road rash on the panels that take the hits. A coating is a chemical layer that resists etching and UV and makes the whole car easier to clean, but it will not stop a rock. The usual answer on a car worth protecting is PPF on the front-facing panels and a coating over everything, film included.",
      },
      {
        q: "Does a coating stop scratches?",
        a: "It resists the very light marring that comes from washing, and it makes the surface slicker so contact tends to slide rather than grab. It will not stop a key, a shopping cart or a branch. Anyone selling a coating as scratch-proof is overselling it, and you should weigh everything else they tell you accordingly.",
      },
      {
        q: "Do I still have to wash the car?",
        a: "Yes — but far less often and far more easily. Dirt has less to bond to, most of it comes off with a rinse, and water sheets away instead of drying into spots. Hand wash with a pH-neutral soap; the coating does the rest. Skipping washes entirely still lets contaminants sit and eventually etch through.",
      },
      {
        q: "Why does correction cost more than the coating itself?",
        a: "Because a coating is transparent and permanent for its service life. Every swirl, hologram and etch mark under it gets sealed in and preserved for the next several years. Machine-correcting paint back to a proper finish is skilled, slow work, and it is the part that decides whether the result looks extraordinary or merely shiny.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const serviceSlugs = services.map((s) => s.slug);

/** Filter labels for the gallery, derived from the service list. */
export const galleryCategories = [
  { key: "all", label: "All work" },
  ...services.map((s) => ({ key: s.galleryCategory, label: s.shortName })),
];

export const galleryCategoryLabel = (key: string) =>
  services.find((s) => s.galleryCategory === key)?.name ?? "Vehicle wrap";

export const siteName = site.name;
