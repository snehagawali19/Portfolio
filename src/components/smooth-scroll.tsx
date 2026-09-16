"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchor = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest("a[href^='#']");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      event.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
    };
    document.addEventListener("click", onAnchor);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchor);
      lenis.destroy();
    };
  }, []);

  return children;
}
