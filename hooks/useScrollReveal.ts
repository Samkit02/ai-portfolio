"use client";

import { useEffect } from "react";

const VISIBLE_CLASS = "visible";

export function useScrollReveal(selector = ".reveal", options?: IntersectionObserverInit) {
  useEffect(() => {
    const el = typeof selector === "string" ? document.querySelectorAll(selector) : null;
    const elements = el ? Array.from(el) : [];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(VISIBLE_CLASS);
        });
      },
      { threshold: 0.1, ...options }
    );

    elements.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [selector, options?.threshold, options?.rootMargin]);
}
