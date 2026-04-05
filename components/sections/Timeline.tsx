"use client";

import Link from "next/link";
import { EXPERIENCE, EDUCATION, PERSONAL } from "@/content/resume";

export function Timeline() {
  return (
    <section
      id="resume"
      className="px-6 py-[120px] md:px-[60px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal">
          <p className="font-[family-name:var(--font-dm-mono)] mb-4 text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
            // Experience
          </p>
          <h2 className="font-[family-name:var(--font-syne)] text-[clamp(36px,5vw,60px)] font-extrabold leading-none tracking-[-2px]">
            Where I&apos;ve
            <br />
            Worked
          </h2>
        </div>
        <div className="reveal mt-16 grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            {EXPERIENCE.map((job) => (
              <div
                key={job.id}
                className="relative border-l border-[var(--border)] pl-6 pb-10 before:absolute before:left-[-4px] before:top-1.5 before:h-[7px] before:w-[7px] before:rounded-full before:bg-[var(--accent)]"
              >
                <p className="font-[family-name:var(--font-dm-mono)] mb-2 text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
                  {job.period}
                </p>
                <h3 className="font-[family-name:var(--font-syne)] mb-1 text-[18px] font-bold">
                  {job.role}
                </h3>
                <p className="mb-3 text-[13px] font-medium text-[var(--accent)]">
                  {job.company}
                </p>
                <p className="text-[13px] leading-[1.7] text-[var(--muted)]">
                  {job.highlights[0]}
                </p>
              </div>
            ))}
          </div>
          <div>
            <p className="font-[family-name:var(--font-dm-mono)] mb-6 text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
              // Education
            </p>
            {EDUCATION.map((edu) => (
              <div
                key={edu.id}
                className="relative border-l border-[var(--border)] pl-6 pb-10 before:absolute before:left-[-4px] before:top-1.5 before:h-[7px] before:w-[7px] before:rounded-full before:bg-[var(--accent)]"
              >
                <p className="font-[family-name:var(--font-dm-mono)] mb-2 text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
                  {edu.period}
                </p>
                <h3 className="font-[family-name:var(--font-syne)] mb-1 text-[18px] font-bold">
                  {edu.degree}
                </h3>
                <p className="mb-3 text-[13px] font-medium text-[var(--accent)]">
                  {edu.school}
                </p>
                <p className="text-[13px] leading-[1.7] text-[var(--muted)]">
                  {edu.note}
                </p>
              </div>
            ))}
            <Link
              href={PERSONAL.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2.5 border border-[var(--border)] px-8 py-3.5 text-[13px] font-[family-name:var(--font-dm-mono)] uppercase tracking-[0.1em] text-[var(--text)] no-underline transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span>↓</span> Download Full Resume (PDF)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
