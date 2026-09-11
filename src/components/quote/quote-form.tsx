"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitQuote } from "@/app/contact/actions";
import { SERVICE_OPTIONS, TIMELINE_OPTIONS, type QuoteState } from "@/lib/quote-schema";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

const initialState: QuoteState = { status: "idle" };

const fieldBase =
  "w-full border border-line bg-surface px-4 py-3.5 text-[0.95rem] text-chalk placeholder:text-fog-dim " +
  "transition-colors focus:border-accent focus:outline-none";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2.5 flex items-baseline gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-fog">
      {children}
      {optional && <span className="text-fog-dim normal-case tracking-normal">optional</span>}
    </label>
  );
}

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-2 font-mono text-[0.68rem] text-accent-hot">
      {errors[0]}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center justify-center gap-3 bg-accent px-8 py-5 font-mono text-[0.75rem] uppercase tracking-[0.16em] leading-none text-accent-ink transition-colors hover:bg-accent-hot disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send quote request"}
      {!pending && (
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      )}
    </button>
  );
}

export function QuoteForm() {
  const [state, formAction] = useActionState(submitQuote, initialState);
  const [fleetSelected, setFleetSelected] = useState(false);
  const renderedAt = useRef<HTMLInputElement>(null);
  const headingId = useId();
  const statusRef = useRef<HTMLDivElement>(null);

  // Timestamp the render so the server can reject sub-3-second submissions.
  useEffect(() => {
    if (renderedAt.current) renderedAt.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        className="border border-line bg-surface p-10 focus:outline-none sm:p-14"
      >
        <div className="hatch mb-8 h-2.5 w-16" aria-hidden />
        <h2 className="font-display text-3xl font-extrabold uppercase text-chalk sm:text-4xl">
          Request received
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-fog">
          A confirmation is on its way to your inbox. A real person reads every enquiry and we normally
          come back within one business day.
        </p>
        <p className="mt-5 max-w-lg leading-relaxed text-fog">
          <span className="text-chalk">Speed things up:</span> reply to that confirmation with photos of
          the vehicle — a three-quarter front, a straight side, and close-ups of any damage or previous
          paintwork. Photos are the difference between a rough range and a firm number.
        </p>
        <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fog-dim">
          In a hurry?{" "}
          <a href={site.phoneHref} className="text-accent hover:text-accent-hot">
            Call {site.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-8" aria-labelledby={headingId}>
      <h2 id={headingId} className="sr-only">
        Quote request form
      </h2>

      {state.status === "error" && state.message && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="border-l-2 border-accent bg-surface p-5 text-sm leading-relaxed text-chalk focus:outline-none"
        >
          {state.message}
        </div>
      )}

      {/* Honeypot — hidden from people, left in the DOM for bots. */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input ref={renderedAt} type="hidden" name="renderedAt" defaultValue="0" />

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <fieldset className="space-y-6">
        <legend className="mb-6 flex items-center gap-4">
          <span className="font-mono text-[0.7rem] tabular text-accent">01</span>
          <span className="hatch h-2.5 w-8 opacity-70" aria-hidden />
          <span className="eyebrow">Who you are</span>
        </legend>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <input
              id="name" name="name" type="text" required autoComplete="name"
              placeholder="Alex Moreau"
              aria-invalid={!!state.errors?.name}
              aria-describedby={state.errors?.name ? "err-name" : undefined}
              className={cn(fieldBase, state.errors?.name && "border-accent")}
            />
            <FieldError id="err-name" errors={state.errors?.name} />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <input
              id="email" name="email" type="email" required autoComplete="email" inputMode="email"
              placeholder="alex@example.com"
              aria-invalid={!!state.errors?.email}
              aria-describedby={state.errors?.email ? "err-email" : undefined}
              className={cn(fieldBase, state.errors?.email && "border-accent")}
            />
            <FieldError id="err-email" errors={state.errors?.email} />
          </div>

          <div>
            <Label htmlFor="phone" optional>Phone</Label>
            <input
              id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel"
              placeholder={site.phone}
              className={cn(fieldBase, state.errors?.phone && "border-accent")}
            />
            <FieldError id="err-phone" errors={state.errors?.phone} />
          </div>

          <div>
            <Label htmlFor="company" optional>Company</Label>
            <input
              id="company" name="company" type="text" autoComplete="organization"
              placeholder="For fleet and commercial work"
              className={fieldBase}
            />
          </div>
        </div>
      </fieldset>

      {/* ── Job ───────────────────────────────────────────────────────────── */}
      <fieldset className="space-y-6 border-t border-line pt-8">
        <legend className="mb-6 flex items-center gap-4">
          <span className="font-mono text-[0.7rem] tabular text-accent">02</span>
          <span className="hatch h-2.5 w-8 opacity-70" aria-hidden />
          <span className="eyebrow">What you want done</span>
        </legend>

        <div>
          <span className="mb-3 block font-mono text-[0.66rem] uppercase tracking-[0.16em] text-fog">
            Service — pick all that apply
          </span>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {SERVICE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 bg-surface px-4 py-4 text-sm text-chalk transition-colors hover:bg-surface-2 has-checked:bg-surface-2"
              >
                <input
                  type="checkbox"
                  name="services"
                  value={option.value}
                  onChange={(e) => option.value === "fleet" && setFleetSelected(e.currentTarget.checked)}
                  className="h-4 w-4 shrink-0 accent-[var(--color-accent)]"
                />
                {option.label}
              </label>
            ))}
          </div>
          <FieldError id="err-services" errors={state.errors?.services} />
        </div>

        <div className={cn("grid gap-6", fleetSelected ? "sm:grid-cols-[1fr_9rem]" : "")}>
          <div>
            <Label htmlFor="vehicle">Vehicle</Label>
            <input
              id="vehicle" name="vehicle" type="text" required
              placeholder="2021 Porsche 911 Carrera S"
              aria-invalid={!!state.errors?.vehicle}
              aria-describedby={state.errors?.vehicle ? "err-vehicle" : "hint-vehicle"}
              className={cn(fieldBase, state.errors?.vehicle && "border-accent")}
            />
            <p id="hint-vehicle" className="mt-2 text-xs text-fog-dim">
              Year, make and model. For fleets, describe the vehicle types.
            </p>
            <FieldError id="err-vehicle" errors={state.errors?.vehicle} />
          </div>

          {fleetSelected && (
            <div>
              <Label htmlFor="vehicleCount">How many</Label>
              <input
                id="vehicleCount" name="vehicleCount" type="number" min={1} max={500} defaultValue={1}
                className={cn(fieldBase, "tabular")}
              />
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="timeline">Timeline</Label>
          <select id="timeline" name="timeline" defaultValue="month" className={cn(fieldBase, "appearance-none")}>
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-surface">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="message">Details</Label>
          <textarea
            id="message" name="message" required rows={6}
            placeholder="Colour or finish you have in mind, coverage you want, and anything we should know about the paint — previous respray, bodywork, stone chips."
            aria-invalid={!!state.errors?.message}
            aria-describedby={state.errors?.message ? "err-message" : undefined}
            className={cn(fieldBase, "resize-y leading-relaxed", state.errors?.message && "border-accent")}
          />
          <FieldError id="err-message" errors={state.errors?.message} />
        </div>

        <div>
          <Label htmlFor="referral" optional>How did you hear about us</Label>
          <input
            id="referral" name="referral" type="text"
            placeholder="Instagram, a wrapped car you saw, a referral…"
            className={fieldBase}
          />
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-6 border-t border-line pt-8">
        <SubmitButton />
        <p className="max-w-xs text-xs leading-relaxed text-fog-dim">
          We use your details to answer this enquiry and nothing else. No lists, no resale.
        </p>
      </div>
    </form>
  );
}
