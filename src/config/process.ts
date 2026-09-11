export type ProcessStep = {
  index: string;
  title: string;
  duration: string;
  body: string;
  detail: string[];
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Consultation & quote",
    duration: "Same week",
    body:
      "We need to know the vehicle, the coverage you want and the condition of the paint. Photos get us to a realistic range; seeing the car in person gets us to a fixed price.",
    detail: [
      "Year, make, model and trim — panel count and body complexity drive the labour",
      "Coverage: full change, partial, PPF package or specific accent pieces",
      "Honest paint history, including any respray or bodywork",
      "A written quote with the film, the coverage and the shop time spelled out",
    ],
  },
  {
    index: "02",
    title: "Colour & material selection",
    duration: "Allow a week",
    body:
      "Screens lie. Every film we quote can be seen as a physical sample in daylight, against your car, before you commit to several thousand dollars of it.",
    detail: [
      "Physical swatches from 3M, Avery Dennison and Inozetek",
      "Finish behaviour explained — how satin greys out in shade, how flake reads at angle",
      "Aftercare and washing implications, which differ sharply between finishes",
      "Special-order films confirmed for stock and lead time before the date is booked",
    ],
  },
  {
    index: "03",
    title: "Intake & inspection",
    duration: "Drop-off day",
    body:
      "The car is photographed panel by panel before a hand goes on it. Existing chips, dents, scratches and previous paintwork are documented and shown to you.",
    detail: [
      "Dated photographic record of the vehicle's condition at intake",
      "Paint depth checked where a respray is suspected",
      "Any panel we consider a removal risk flagged in writing before work starts",
      "Deep defects noted — film conforms to a dent, it does not hide one",
    ],
  },
  {
    index: "04",
    title: "Disassembly & preparation",
    duration: "The longest stage",
    body:
      "This is the part customers never see and the part that decides whether the wrap is still tight in year five. Badges, handles, lights, mirrors and trim come off rather than getting cut around.",
    detail: [
      "Trim, emblems, door handles, mirror caps and lamps removed where serviceable",
      "Full wash, then chemical decontamination of tar, iron and adhesive residue",
      "Clay treatment on contaminated panels and a final solvent wipe",
      "Panel gaps, seams and recesses cleaned out — the places grit hides and edges lift",
    ],
  },
  {
    index: "05",
    title: "Application",
    duration: "Bulk of the shop time",
    body:
      "Film goes on in a controlled, dust-managed bay, panel by panel, in sequence. Adjacent panels are cut from the same roll so metallic flake and colour stay consistent across the car.",
    detail: [
      "Temperature-controlled bay — film behaves differently hot and cold",
      "Inlays and relief cuts used on compound curves instead of over-stretching",
      "Cuts made off the paint wherever possible; knifeless tape where they cannot be",
      "Edges wrapped into panel returns rather than trimmed flush at the visible edge",
    ],
  },
  {
    index: "06",
    title: "Post-heat & reassembly",
    duration: "Final day",
    body:
      "Every stretched area, tucked edge and recess is heated to its manufacturer-specified post-heat temperature. Skip this and the film remembers its old shape and pulls back — usually in the first hot week.",
    detail: [
      "Post-heat to the film manufacturer's specified temperature, verified with an IR thermometer",
      "Trim, badges and hardware refitted with new clips and fasteners where needed",
      "Panel gaps and shut lines checked and dressed",
      "Vehicle rests indoors so adhesive can begin its cure before it goes out",
    ],
  },
  {
    index: "07",
    title: "Inspection & handover",
    duration: "Collection",
    body:
      "We walk the car with you in good light, then hand over the care instructions in writing along with the material and batch details for the film on your vehicle.",
    detail: [
      "Joint walk-around in daylight, not under shop fluorescents",
      "Written aftercare specific to your finish — matte and satin have their own rules",
      "Film brand, series, colour and batch recorded for future panel repairs",
      "Warranty terms explained: what the manufacturer covers, what we cover",
    ],
  },
];

export const aftercare = [
  {
    title: "The first week",
    body:
      "Leave the car alone. Adhesive is still curing, so no washing for the first 48 hours and no pressure washing for a week. If you can keep it out of heavy rain and off the highway for a couple of days, do.",
  },
  {
    title: "Washing",
    body:
      "Hand wash only, with a pH-neutral soap and a clean mitt, working top down. Automatic brush washes are the fastest way to destroy a wrap. Keep pressure washer nozzles at least a foot back and never aim them straight at an edge or seam.",
  },
  {
    title: "Contaminants",
    body:
      "Bird droppings, bug splatter, fuel spills and tree sap etch film faster than they etch paint. Get them off the same day with a wrap-safe detailer. Fuel dripped down a filler recess will stain if it sits.",
  },
  {
    title: "Matte & satin",
    body:
      "No wax, no polish, no compound, ever — they fill the texture and leave shiny patches you cannot undo. Use a matte-specific soap and detail spray. Light scuffs on satin can sometimes be heat-relaxed; call us before you try anything abrasive.",
  },
  {
    title: "Storage",
    body:
      "Garage-kept film comfortably outlasts film that lives outside. If the car parks outdoors, expect the roof, hood and trunk to age first and consider a cover for long stationary periods.",
  },
  {
    title: "Repairs",
    body:
      "Wraps are panel-repairable. A scraped bumper corner or a keyed door can usually be redone as a single panel rather than the whole car — which is exactly why we record the film series and batch for every vehicle we do.",
  },
];

export type MaterialBrand = {
  brand: string;
  line: string;
  positioning: string;
  body: string;
  strengths: string[];
  bestFor: string;
  warranty: string;
};

export const materials: MaterialBrand[] = [
  {
    brand: "3M",
    line: "2080 Series · Scotchgard Pro PPF",
    positioning: "The default, and the benchmark",
    body:
      "3M 2080 is the film most shops reach for first, and with good reason. Controlled Adhesion means it can be repositioned during application instead of committing on first contact, and the Comply air-release channels let trapped air out rather than leaving you chasing bubbles. The colour range is the broadest on the market and stock is consistently available, which matters more than it sounds when a panel needs redoing.",
    strengths: [
      "Comply air-release adhesive — repositionable during install",
      "Widest colour and finish range available",
      "Reliable stock, so panel repairs match years later",
      "Scotchgard Pro PPF with a self-healing topcoat",
    ],
    bestFor: "Full colour changes, commercial fleet work, and any job where a future panel repair needs to match.",
    warranty: "Up to 7 years vertical on 2080 · up to 10 years on Scotchgard Pro",
  },
  {
    brand: "Avery Dennison",
    line: "SW900 Supreme Wrapping · MPI 1105",
    positioning: "Conformability specialists",
    body:
      "Avery's SW900 is a touch more conformable than its closest 3M equivalent, which shows on cars with deep recesses, aggressive body swages and compound curves where the film has to travel a long way without over-stretching. Easy Apply RS gives the same repositionability, and the satin and matte finishes in particular are among the best-looking films we install.",
    strengths: [
      "Excellent conformability on complex bodywork",
      "Easy Apply RS — repositionable, air-egress adhesive",
      "Strong satin, matte and metallic ranges",
      "MPI 1105 cast media for printed commercial work",
    ],
    bestFor: "Sculpted modern bodywork, satin and matte finishes, and printed fleet graphics.",
    warranty: "Up to 8 years vertical on SW900",
  },
  {
    brand: "Inozetek",
    line: "Super Gloss · Metallic Gloss",
    positioning: "Paint-depth finishes",
    body:
      "Inozetek built its reputation on gloss depth. Their Super Gloss films read closer to fresh paint than anything else we install — the reflection holds together in a way most wrap film does not. It is a thicker, less forgiving film that demands more time and more skill on curves, and it costs accordingly. On the right car it is worth every hour of it.",
    strengths: [
      "Gloss depth that genuinely reads as paint",
      "Distinctive colors you will not see on other wraps",
      "Thicker gauge with good self-levelling over minor surface texture",
      "Widely used on show and concours-level builds",
    ],
    bestFor: "Show cars, exotics, and any build where the finish is the whole point.",
    warranty: "Manufacturer terms vary by film — confirmed at quote",
  },
];

export const materialFaqs = [
  {
    q: "Why not use cheaper vinyl?",
    a: "Because the film is a minority of the cost of a wrap and labour is the majority. Cheap calendered vinyl shrinks back from edges, fades unevenly and turns brittle, which means a job that has to be redone in two years — and you pay the same labour again. There is no version of this where the cheap film saves money.",
  },
  {
    q: "What is the difference between cast and calendered vinyl?",
    a: "Cast film is made as a liquid poured thin and cured flat, so it has no built-in tension and stays where you put it. Calendered film is squeezed to thickness through rollers, which leaves it stressed and wanting to return to its original shape — so it shrinks at edges and lifts in recesses. Every film we use on a vehicle body is cast. Calendered has its place on flat signage; it has none on a car.",
  },
  {
    q: "Which brand is best for my car?",
    a: "It depends on the finish you want and the shape of the car more than on brand loyalty. 3M for range and repairability, Avery for deeply sculpted bodywork and the best satins, Inozetek when gloss depth is the entire point. We will lay physical samples on your car and let you decide in daylight.",
  },
  {
    q: "Do you warranty the installation as well as the film?",
    a: "Yes, and the distinction matters. The manufacturer warrants the film against fading, cracking and adhesive failure. We separately warrant our workmanship — lifting edges, failed seams and application defects. Both are explained in writing at handover.",
  },
];
