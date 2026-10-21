import { z } from "zod";

export const SERVICE_OPTIONS = [
  { value: "color-change", label: "Full colour change wrap" },
  { value: "ppf", label: "Paint protection film" },
  { value: "fleet", label: "Commercial / fleet graphics" },
  { value: "decals", label: "Decals, accents or chrome delete" },
  { value: "unsure", label: "Not sure yet — advise me" },
] as const;

/**
 * Photo uploads. The browser resizes each photo to a JPEG of about 2000px on
 * the long edge before sending, which lands around 300-600 KB, so these caps
 * are generous for real use. The total stays under Vercel's 4.5 MB request
 * limit (and serverActions.bodySizeLimit in next.config.ts) with room for
 * the rest of the form.
 */
export const PHOTO_LIMITS = {
  maxCount: 6,
  maxBytesEach: 1_500_000,
  maxBytesTotal: 3_800_000,
  /** Long edge, in pixels, that the browser resizes to */
  maxEdge: 2000,
  types: ["image/jpeg", "image/png", "image/webp"],
} as const;

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(80),
  email: z.email("That email address doesn't look right."),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === "" || v.replace(/\D/g, "").length >= 7, "That phone number looks too short.")
    .optional()
    .default(""),
  company: z.string().trim().max(120).optional().default(""),

  services: z
    .array(z.enum(SERVICE_OPTIONS.map((o) => o.value) as [string, ...string[]]))
    .min(1, "Pick at least one service."),

  vehicle: z.string().trim().min(2, "Year, make and model helps us quote accurately.").max(140),
  vehicleCount: z.coerce.number().int().min(1).max(500).optional().default(1),

  message: z
    .string()
    .trim()
    .min(10, "A sentence or two about what you want helps us give a real number.")
    .max(4000),

  referral: z.string().trim().max(120).optional().default(""),

  // ── Spam gates ───────────────────────────────────────────────────────────
  /** Honeypot. Hidden from humans, irresistible to naive bots. */
  website: z.string().max(0, "Rejected.").optional().default(""),
  /** Client timestamp of form render — submissions faster than 3s are bots. */
  renderedAt: z.coerce.number().optional().default(0),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export type QuoteState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level errors keyed by field name. */
  errors?: Partial<Record<keyof QuoteInput | "photos" | "form", string[]>>;
};

export const serviceLabel = (value: string) =>
  SERVICE_OPTIONS.find((o) => o.value === value)?.label ?? value;
