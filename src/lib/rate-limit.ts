/**
 * Fixed-window rate limiter held in module memory.
 *
 * On Vercel each serverless instance keeps its own counter, so this is burst
 * protection rather than a hard global guarantee — enough to stop a single
 * script hammering the form, and it costs nothing. If the form ever gets
 * seriously targeted, swap the Map for Upstash Redis or Vercel KV; the
 * signature below is deliberately the same shape those libraries use.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
    }
    return { ok: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_PER_WINDOW) {
    return { ok: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfterSeconds: 0 };
}
