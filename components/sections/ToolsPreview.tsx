"use client";

import Link from "next/link";
import { getAllTools } from "@/lib/tools/registry";

export function ToolsPreview() {
  const TOOLS = getAllTools();
  return (
    <section
      id="tools"
      className="border-y border-[var(--border)] bg-[var(--surface)] px-6 py-[120px] md:px-[60px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal">
          <p className="font-[family-name:var(--font-dm-mono)] mb-4 text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
            // Tools I&apos;ve Built
          </p>
          <h2 className="font-[family-name:var(--font-syne)] text-[clamp(36px,5vw,60px)] font-extrabold leading-none tracking-[-2px]">
            AI-Powered
            <br />
            Demos
          </h2>
          <p className="mt-4 max-w-[560px] leading-[1.7] text-[var(--muted)]">
            Try the demos below. To use them in your own project, clone or download the repo — no payments, just showcase.
          </p>
        </div>
        <div className="reveal mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TOOLS.map((tool) => (
            <div
              key={tool.slug}
              className={`relative border border-[var(--border)] bg-[var(--bg)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] ${
                tool.popular ? "border-[rgba(108,99,255,0.4)]" : ""
              }`}
            >
              {tool.popular && (
                <div className="absolute right-5 top-0 bg-[var(--accent)] px-2.5 py-1 font-[family-name:var(--font-dm-mono)] text-[9px] uppercase tracking-[0.1em] text-white">
                  Popular
                </div>
              )}
              <div className="mb-5 flex h-12 w-12 items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[22px]">
                {tool.icon}
              </div>
              <h3 className="font-[family-name:var(--font-syne)] mb-2 text-[18px] font-bold">
                {tool.name}
              </h3>
              <p className="mb-6 text-[13px] leading-[1.6] text-[var(--muted)]">
                {tool.description}
              </p>
              <Link
                href={`/tools/${tool.slug}`}
                className={`mt-5 block w-full border border-[var(--accent)] py-3 text-center text-[13px] font-bold tracking-wide transition-colors duration-300 ${
                  tool.popular
                    ? "bg-[var(--accent)] text-white hover:bg-[rgba(108,99,255,0.8)]"
                    : "bg-transparent text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                }`}
              >
                Try demo →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
