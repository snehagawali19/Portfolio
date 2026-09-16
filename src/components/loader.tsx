"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [word, setWord] = useState(0);
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
      const t = Math.min(1, (now - start) / 1600);
      setProgress(Math.floor(t * 100));
      setWord(Math.min(site.loaderWords.length - 1, Math.floor(t * site.loaderWords.length)));
      if (t < 1) frame = requestAnimationFrame(tick);
      else {
        setProgress(100);
        setTimeout(() => {
          setDone(true);
          document.body.classList.add("ready");
          setTimeout(() => setGone(true), 620);
        }, 180);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[90] bg-[var(--color-bg)] transition-opacity duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ opacity: done ? 0 : 1, pointerEvents: done ? "none" : "auto" }}
    >
      <p className="absolute top-8 left-8 text-[0.72rem] uppercase tracking-[0.32em] text-[var(--color-faint)] md:top-12 md:left-12">
        {site.shortName}
      </p>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="serif text-[clamp(2.19rem,7vw,4.27rem)] text-[rgb(245_245_245_/_0.82)]">
          {site.loaderWords[word]}
        </p>
      </div>
      <p className="serif absolute right-8 bottom-8 text-[clamp(4rem,10vw,8.5rem)] leading-none tabular-nums md:right-12 md:bottom-12">
        {String(progress).padStart(3, "0")}
      </p>
      <div className="absolute right-0 bottom-0 left-0 h-[3px] bg-[rgb(31_31_31_/_0.5)]">
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
