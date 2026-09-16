"use client";

import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { constellation, site } from "@/data/site";

export function About() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-[160vh] md:min-h-[180vh]"
    >
      <div className="sticky top-0 flex min-h-[100dvh] items-center overflow-hidden px-4 md:px-8">
        <p className="sr-only">{site.about}</p>
        {constellation.map((word, i) => (
          <Word
            key={word.text}
            word={word}
            index={i}
            progress={scrollYProgress}
            reduce={reduce}
          />
        ))}
      </div>
    </section>
  );
}

function Word({
  word,
  index,
  progress,
  reduce,
}: {
  word: (typeof constellation)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
}) {
  const start = 0.08 + index * 0.07;
  const opacity = useTransform(progress, [start, start + 0.08, start + 0.22], [0, 1, 0.15]);
  const y = useTransform(progress, [start, start + 0.08], [24, 0]);
  const filter = useTransform(progress, [start, start + 0.08], ["blur(8px)", "blur(0px)"]);

  return (
    <motion.p
      style={
        reduce
          ? { left: word.x, top: word.y }
          : { opacity, y, filter, left: word.x, top: word.y }
      }
      className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap max-md:!left-1/2 ${
        word.kind === "serif"
          ? "serif text-[clamp(1.75rem,5.2vw,4.27rem)] text-[var(--color-em)]"
          : "text-[clamp(1.25rem,2.4vw,2.19rem)] font-medium text-[var(--color-ink)]"
      }`}
    >
      {word.text}
    </motion.p>
  );
}
