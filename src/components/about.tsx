"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/data/site";

const STAR: [number, number][] = [
  [32, 2],
  [38, 26],
  [62, 32],
  [38, 38],
  [32, 62],
  [26, 38],
  [2, 32],
  [26, 26],
];

function insideStar(x: number, y: number) {
  let inside = false;
  for (let i = 0, j = STAR.length - 1; i < STAR.length; j = i++) {
    const [xi, yi] = STAR[i];
    const [xj, yj] = STAR[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Dot = { x: number; y: number; r: number; o: number; pale: boolean; delay: number };

const DOTS = (() => {
  const rand = seeded(11);
  const dots: Dot[] = [];
  const swirl = (x: number, y: number) => {
    const dx = x - 32;
    const dy = y - 32;
    const angle = (Math.hypot(dx, dy) / 30) * 0.45;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return { x: 32 + dx * cos - dy * sin, y: 32 + dx * sin + dy * cos };
  };

  while (dots.length < 340) {
    const x = 2 + rand() * 60;
    const y = 2 + rand() * 60;
    if (!insideStar(x, y)) continue;
    const d = Math.hypot(x - 32, y - 32) / 30;
    dots.push({
      ...swirl(x, y),
      r: 0.55 + rand() * 1.05 * (1 - d * 0.45),
      o: 0.5 + rand() * 0.5 * (1 - d * 0.35),
      pale: rand() < 0.75 - d * 0.35,
      delay: rand() * 2.8,
    });
  }

  for (let i = 0; i < 55; i++) {
    const arm = Math.floor(rand() * 4) * (Math.PI / 2) - Math.PI / 2;
    const angle = arm + (rand() - 0.5) * 0.9;
    const dist = 10 + rand() * 22;
    dots.push({
      ...swirl(32 + Math.cos(angle) * dist, 32 + Math.sin(angle) * dist),
      r: 0.4 + rand() * 0.8,
      o: 0.2 + rand() * 0.45,
      pale: false,
      delay: rand() * 2.8,
    });
  }
  return dots;
})();

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["4vh", "38vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.06, 0.82, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.8, 1], [0.45, 1, 1.15, 0.3]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const copyOp = useTransform(scrollYProgress, [0.12, 0.28, 0.62, 0.78], [0, 1, 1, 0]);
  const copyY = useTransform(scrollYProgress, [0.12, 0.28, 0.62, 0.78], [28, 0, 0, -20]);
  const events = useTransform(opacity, (value) => (value > 0.2 ? "auto" : "none"));

  return (
    <section id="about" ref={ref} className="relative h-[220vh] md:h-[240vh]">
      <div className="pointer-events-none sticky top-0 min-h-[100dvh] overflow-hidden">
        <motion.div
          initial={false}
          style={{ opacity: copyOp, y: copyY }}
          className="absolute top-[14%] left-4 z-[5] w-[min(34rem,calc(100%-2rem))] pr-4 md:top-1/2 md:left-[8%] md:w-[min(28rem,36vw)] md:-translate-y-1/2"
        >
          <p className="text-[0.66rem] tracking-[0.22em] text-[var(--color-faint)] uppercase">
            01 / About
          </p>
          <h2 className="serif mt-5 max-w-[18ch] text-[clamp(1.7rem,4.2vw,3.1rem)] leading-[1.12] text-[var(--color-ink)]">
            {site.aboutHeadline}
          </h2>
          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed font-light text-[var(--color-soft)]">
            {site.about}
          </p>
          <div className="mt-6 space-y-1.5 text-[0.72rem] tracking-[0.08em] text-[var(--color-faint)]">
            {site.aboutMeta.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </motion.div>
        <motion.div
          style={{ y, opacity, scale, rotate, pointerEvents: events }}
          className="absolute left-1/2 z-[6] -translate-x-1/2"
        >
          <motion.svg
            data-star
            drag
            dragSnapToOrigin
            dragElastic={0.6}
            dragTransition={{ bounceStiffness: 180, bounceDamping: 14 }}
            whileHover={{ scale: 1.08 }}
            whileDrag={{ scale: 1.15 }}
            viewBox="-4 -4 72 72"
            className="h-28 w-28 cursor-grab touch-none overflow-visible drop-shadow-[0_0_18px_rgb(46_230_160_/_0.45)] active:cursor-grabbing md:h-44 md:w-44"
            aria-hidden
          >
            <defs>
              <radialGradient id="bokeh-pale">
                <stop offset="0%" stopColor="#d6ffef" />
                <stop offset="55%" stopColor="#9ff5d4" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#9ff5d4" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="bokeh-deep">
                <stop offset="0%" stopColor="#5fe3b0" />
                <stop offset="55%" stopColor="#2ee6a0" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#1f9e70" stopOpacity="0" />
              </radialGradient>
            </defs>
            {DOTS.map((dot, i) => (
              <g key={i} opacity={dot.o}>
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={dot.r}
                  fill={dot.pale ? "url(#bokeh-pale)" : "url(#bokeh-deep)"}
                  className="twinkle"
                  style={{ animationDelay: `${dot.delay}s` }}
                />
              </g>
            ))}
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}
