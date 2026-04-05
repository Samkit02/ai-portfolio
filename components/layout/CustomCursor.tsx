"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const prefersPointer = window.matchMedia("(pointer: fine)").matches;
    if (!prefersPointer) return;

    document.body.style.cursor = "none";

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    let rafId: number;
    const animate = () => {
      dot.style.left = `${mx - 6}px`;
      dot.style.top = `${my - 6}px`;
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx - 18}px`;
      ring.style.top = `${ry - 18}px`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target?.closest?.("a, button")) {
        dot.style.transform = "scale(2.5)";
        ring.style.transform = "scale(1.5)";
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      const from = e.target as Element;
      if (!from?.closest?.("a, button") || (related?.closest?.("a, button"))) return;
      dot.style.transform = "scale(1)";
      ring.style.transform = "scale(1)";
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] h-3 w-3 rounded-full bg-[var(--accent)] mix-blend-screen transition-transform duration-100 ease-out"
        style={{ left: 0, top: 0 }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] h-9 w-9 rounded-full border border-[rgba(108,99,255,0.5)] transition-all duration-150 ease-out"
        style={{ left: 0, top: 0 }}
        aria-hidden
      />
    </>
  );
}
