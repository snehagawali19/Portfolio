"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/data/site";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8vh", "82vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.06, 0.82, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.8, 1], [0.45, 1, 1.15, 0.3]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const copyOp = useTransform(scrollYProgress, [0.12, 0.28, 0.62, 0.78], [0, 1, 1, 0]);
  const copyY = useTransform(scrollYProgress, [0.12, 0.28, 0.62, 0.78], [28, 0, 0, -20]);

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
        </motion.div>
        <motion.svg
          data-star
          viewBox="0 0 64 64"
          style={{ y, opacity, scale, rotate }}
          className="absolute left-1/2 z-[4] h-16 w-16 -translate-x-1/2 fill-[var(--color-em-soft)] drop-shadow-[0_0_28px_rgb(46_230_160_/_0.55)] md:h-[5.5rem] md:w-[5.5rem]"
          aria-hidden
        >
          <path d="M32 2 L38 26 L62 32 L38 38 L32 62 L26 38 L2 32 L26 26 Z" />
        </motion.svg>
      </div>
    </section>
  );
}
