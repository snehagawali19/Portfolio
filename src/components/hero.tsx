"use client";

import { CaretDown } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";

export function Hero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center"
    >
      <div
        data-star
        className="pointer-events-none absolute top-1/2 left-1/2 z-[1] h-[min(62vh,560px)] w-[calc(min(62vh,560px)/2.6)] -translate-x-1/2 -translate-y-1/2 rounded-[48px] border border-dashed border-[rgb(207_251_233_/_0.28)] shadow-[0_0_22px_rgb(245_245_245_/_0.12)]"
      />
      <svg
        data-star
        viewBox="0 0 64 64"
        className="pointer-events-none absolute top-[42%] left-1/2 z-[2] h-16 w-16 -translate-x-1/2 -translate-y-1/2 fill-[var(--color-em-soft)] drop-shadow-[0_0_26px_rgb(46_230_160_/_0.45)] md:h-20 md:w-20"
        aria-hidden
      >
        <path d="M32 2 L38 26 L62 32 L38 38 L32 62 L26 38 L2 32 L26 26 Z" />
      </svg>

      <motion.h1
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[4] px-4 text-center text-[clamp(2.6rem,11vw,11.5rem)] leading-[0.95] font-extrabold tracking-[0.04em] whitespace-nowrap text-[rgb(255_255_255_/_0.55)] max-[560px]:whitespace-normal"
      >
        {site.heroName}
      </motion.h1>
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[4] mt-6 text-center text-[clamp(0.62rem,1.4vw,0.82rem)] tracking-[0.42em] text-[var(--color-soft)] uppercase mix-blend-difference max-[560px]:tracking-[0.32em]"
      >
        {site.roleLine}
      </motion.p>
      <motion.a
        href="#about"
        data-magnetic="6"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-8 left-1/2 z-[4] -translate-x-1/2 mix-blend-difference"
        aria-label="About"
      >
        <CaretDown
          size={22}
          className="animate-[caretPulse_2.2s_ease-in-out_infinite] text-[var(--color-faint)]"
        />
      </motion.a>
    </section>
  );
}
