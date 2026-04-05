"use client";

import { PERSONAL } from "@/content/resume";

const SOCIALS = [
  { label: "GitHub", href: PERSONAL.github },
  { label: "LinkedIn", href: PERSONAL.linkedin },
  { label: "Resume", href: PERSONAL.resumePdf },
] as const;

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--surface)] px-6 py-[120px] text-center md:px-[60px]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 100% at 50% 100%, rgba(108,99,255,0.08), transparent 60%)",
        }}
      />
      <div className="reveal relative">
        <p className="font-[family-name:var(--font-dm-mono)] mb-4 text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
          // Let&apos;s Talk
        </p>
        <h2 className="font-[family-name:var(--font-syne)] mb-6 text-[clamp(48px,7vw,80px)] font-extrabold leading-none tracking-[-3px]">
          Got a Project
          <br />
          in Mind?
        </h2>
        <p className="relative mb-12 text-[16px] text-[var(--muted)]">
          I&apos;m open to freelance, full-time, and collaboration
          opportunities.
        </p>
        <a
          href={`mailto:${PERSONAL.email}`}
          className="relative font-[family-name:var(--font-syne)] text-[clamp(24px,3vw,40px)] font-extrabold tracking-[-1px] text-[var(--accent)] no-underline transition-opacity duration-300 hover:opacity-70"
        >
          {PERSONAL.email}
        </a>
        <div className="relative mt-16 flex justify-center gap-6">
          {SOCIALS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-dm-mono)] text-[11px] uppercase tracking-[0.15em] text-[var(--muted)] no-underline transition-colors duration-300 hover:text-[var(--accent)]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
