"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(100);
      setDone(true);
      setGone(true);
      document.body.classList.add("ready");
      return;
    }

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 2200);
      setProgress(Math.floor(t * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      setProgress(100);
      window.setTimeout(() => {
        setDone(true);
        document.body.classList.add("ready");
        window.setTimeout(() => setGone(true), 900);
      }, 280);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (gone) return null;

  const t = progress / 100;

  return (
    <div
      className="fixed inset-0 z-[90] bg-[var(--color-bg)] transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ opacity: done ? 0 : 1, pointerEvents: done ? "none" : "auto" }}
    >
      <p className="absolute top-8 left-8 z-[2] text-[0.72rem] uppercase tracking-[0.32em] text-[var(--color-faint)] md:top-12 md:left-12">
        {site.shortName}
      </p>

      <motion.svg
        data-star
        viewBox="0 0 64 64"
        aria-hidden
        initial={false}
        animate={
          done
            ? { left: "50%", top: "42%", scale: 1, rotate: 0 }
            : {
                left: `${50 + t * 38}%`,
                top: `${40 + t * 46}%`,
                scale: 0.72 + t * 0.55,
                rotate: t * 28,
              }
        }
        transition={{ duration: done ? 0.85 : 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute z-[3] h-14 w-14 -translate-x-1/2 -translate-y-1/2 fill-[var(--color-em-soft)] drop-shadow-[0_0_28px_rgb(46_230_160_/_0.55)] md:h-20 md:w-20"
      >
        <path d="M32 2 L38 26 L62 32 L38 38 L32 62 L26 38 L2 32 L26 26 Z" />
      </motion.svg>

      <p className="serif absolute right-8 bottom-8 z-[2] text-[clamp(4rem,10vw,8.5rem)] leading-none tabular-nums md:right-12 md:bottom-12">
        {String(progress).padStart(3, "0")}
      </p>
      <div className="absolute right-0 bottom-0 left-0 z-[2] h-[3px] bg-[rgb(31_31_31_/_0.5)]">
        <div
          className="h-full origin-left shadow-[0_0_8px_rgb(46_230_160_/_0.35)]"
          style={{
            transform: `scaleX(${progress / 100})`,
            background: "linear-gradient(90deg, var(--color-em-soft), var(--color-em))",
          }}
        />
      </div>
    </div>
  );
}
