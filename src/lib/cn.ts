/** Minimal class joiner. No dependency needed for the handful of cases here. */
export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}
