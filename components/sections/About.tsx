"use client";

import { PERSONAL, STATS, SKILLS } from "@/content/resume";

const skillTags = [
  ...SKILLS.frontend.slice(0, 4),
  ...SKILLS.backend.slice(0, 2),
  "TypeScript",
  "Claude API",
  "PostgreSQL",
  "Docker",
  "Three.js",
  "Stripe",
  "Supabase",
];

const statRows = [
  { value: `${STATS.projectsShipped}+`, label: "Projects Shipped" },
  { value: "5+", label: "Tools in Market" },
  { value: `${STATS.yearsExperience}`, label: "Years Building" },
  { value: "∞", label: "Things to Build" },
];

export function About() {
  return (
    <section
      id="about"
      className="border-y border-[var(--border)] bg-[var(--surface)] px-6 py-[120px] md:px-[60px]"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
        <div className="reveal">
          <p className="font-[family-name:var(--font-dm-mono)] mb-4 text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
            About Me
          </p>
          <h2 className="font-[family-name:var(--font-syne)] mb-6 text-[clamp(36px,5vw,60px)] font-extrabold leading-none tracking-[-2px]">
            The Person
            <br />
            Behind the Code
          </h2>
          {PERSONAL.bio.map((para, i) => (
            <p
              key={i}
              className="mb-5 text-[16px] leading-[1.8] text-[var(--muted)]"
            >
              {para}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap gap-2">
            {skillTags.map((skill) => (
              <span
                key={skill}
                className="font-[family-name:var(--font-dm-mono)] border border-[var(--border)] px-3.5 py-1.5 text-[11px] tracking-wide text-[var(--muted)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="reveal grid grid-cols-2 gap-0.5">
          {statRows.map(({ value, label }) => (
            <div
              key={label}
              className="border border-[var(--border)] bg-[var(--bg)] p-8 transition-colors duration-300 hover:border-[var(--accent)]"
            >
              <div className="font-[family-name:var(--font-syne)] text-[48px] font-extrabold leading-none tracking-[-2px] text-[var(--accent)]">
                {value}
              </div>
              <div className="font-[family-name:var(--font-dm-mono)] mt-2 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
