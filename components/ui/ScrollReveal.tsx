"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Client component that attaches IntersectionObserver to .reveal elements.
 * Include once in layout or page so scroll-reveal animations run.
 */
export function ScrollReveal() {
  useScrollReveal(".reveal", { threshold: 0.1 });
  return null;
}
