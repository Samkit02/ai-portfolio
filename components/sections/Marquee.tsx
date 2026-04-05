"use client";

import { SKILLS } from "@/content/resume";

const MARQUEE_ITEMS = [
  ...SKILLS.frontend.slice(0, 4),
  ...SKILLS.backend.slice(0, 3),
  ...SKILLS.ai.slice(0, 2),
  "PostgreSQL",
  "Docker",
  "Three.js",
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
].filter(Boolean);

const ITEMS = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-[var(--border)] bg-[var(--surface)] py-4">
      <div
        className="flex gap-14 whitespace-nowrap"
        style={{
          animation: "marquee 20s linear infinite",
        }}
      >
        {ITEMS.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-[family-name:var(--font-syne)] flex-shrink-0 text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]"
          >
            {item} <span className="ml-14 text-[var(--accent)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
