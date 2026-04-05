"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { PERSONAL } from "@/content/resume";
import { motion } from "framer-motion";

const HeroCanvas = dynamic(() => import("@/components/3d/HeroCanvas"), {
  ssr: false,
});

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <HeroCanvas />
      <div className="relative z-[2] max-w-[900px] px-6 md:px-[60px]">
        <motion.p
          className="font-[family-name:var(--font-dm-mono)] mb-6 text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          // {PERSONAL.title}
        </motion.p>
        <motion.h1
          className="font-[family-name:var(--font-syne)] text-[clamp(56px,8vw,96px)] font-extrabold leading-[0.95] tracking-[-3px] text-[var(--text)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          I Build
          <br />
          <span className="text-[var(--accent)]">Digital</span>
          <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1px rgba(108,99,255,0.4)" }}
          >
            Experiences.
          </span>
        </motion.h1>
        <motion.p
          className="mb-12 max-w-[480px] text-[17px] leading-[1.7] text-[var(--muted)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {PERSONAL.tagline}
        </motion.p>
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link
            href="#projects"
            className="relative overflow-hidden bg-[var(--accent)] px-9 py-4 text-[14px] font-bold tracking-wide text-white transition-all duration-300 after:absolute after:inset-0 after:translate-x-[-100%] after:bg-white/10 after:transition-transform after:duration-300 hover:after:translate-x-0"
          >
            View My Work
          </Link>
          <Link
            href="#tools"
            className="border border-[var(--border)] px-9 py-4 text-[14px] tracking-wide text-[var(--text)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Explore Tools
          </Link>
        </motion.div>
      </div>
      <div
        className="absolute bottom-10 left-6 flex items-center gap-3 font-[family-name:var(--font-dm-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] md:left-[60px]"
        style={{ animation: "fadeUp 0.8s ease 1.2s forwards" }}
      >
        <div className="relative h-px w-[60px] overflow-hidden bg-[var(--muted)]">
          <span
            className="absolute inset-y-0 left-0 w-full bg-[var(--accent)]"
            style={{
              animation: "scrollLine 2s ease infinite",
            }}
          />
        </div>
        Scroll to explore
      </div>
    </section>
  );
}
