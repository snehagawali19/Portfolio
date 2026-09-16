"use client";

import { CaretDown } from "@phosphor-icons/react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/data/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.22, 0.55], [1, 0.55, 0]);
  const rise = useTransform(scrollYProgress, [0, 0.6], [0, -90]);
  const door = useTransform(scrollYProgress, [0, 0.18, 0.4], [1, 0.35, 0]);

  return (
    <section id="hero" ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden">
        <motion.div
          data-star
          style={{ opacity: door }}
          className="pointer-events-none absolute top-1/2 left-1/2 z-[1] h-[min(62vh,560px)] w-[calc(min(62vh,560px)/2.6)] -translate-x-1/2 -translate-y-1/2 rounded-[48px] border border-dashed border-[rgb(207_251_233_/_0.28)] shadow-[0_0_22px_rgb(245_245_245_/_0.12)]"
        />
        <motion.svg
          data-star
          style={{ opacity: door }}
          viewBox="0 0 64 64"
          className="pointer-events-none absolute top-[42%] left-1/2 z-[2] h-16 w-16 -translate-x-1/2 -translate-y-1/2 fill-[var(--color-em-soft)] drop-shadow-[0_0_26px_rgb(46_230_160_/_0.45)] md:h-20 md:w-20"
          aria-hidden
        >
          <path d="M32 2 L38 26 L62 32 L38 38 L32 62 L26 38 L2 32 L26 26 Z" />
        </motion.svg>

        <motion.div style={{ opacity: fade, y: rise }} className="relative z-[4] text-center">
          <h1 className="px-4 text-[clamp(2.6rem,11vw,11.5rem)] leading-[0.95] font-extrabold tracking-[0.04em] whitespace-nowrap text-[rgb(255_255_255_/_0.55)] max-[560px]:whitespace-normal">
            {site.heroName}
          </h1>
          <p className="mt-6 text-[clamp(0.62rem,1.4vw,0.82rem)] tracking-[0.42em] text-[var(--color-soft)] uppercase mix-blend-difference max-[560px]:tracking-[0.32em]">
            {site.roleLine}
          </p>
        </motion.div>
        <motion.a
          href="#about"
          data-magnetic="6"
          style={{ opacity: fade }}
          className="absolute bottom-8 left-1/2 z-[4] -translate-x-1/2 mix-blend-difference"
          aria-label="About"
        >
          <CaretDown
            size={22}
            className="animate-[caretPulse_2.2s_ease-in-out_infinite] text-[var(--color-faint)]"
          />
        </motion.a>
      </div>
    </section>
  );
}
