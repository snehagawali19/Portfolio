"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const TRAIL = 7;

export function Cursor() {
  const reduce = useReducedMotion() ?? false;
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-40);
  const y = useMotionValue(-40);
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.35 });
  const [hot, setHot] = useState<"mag" | "star" | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const node = event.target as HTMLElement | null;
      if (node?.closest("[data-star]")) setHot("star");
      else if (node?.closest("a, button, [data-magnetic]")) setHot("mag");
      else setHot(null);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.body.classList.remove("has-cursor");
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      {Array.from({ length: TRAIL }).map((_, i) => (
        <TrailDot key={i} x={x} y={y} index={i} />
      ))}
      <motion.span
        aria-hidden
        className={`pointer-events-none fixed top-0 left-0 z-[100] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-difference ${
          hot === "star"
            ? "border-dashed border-[var(--color-em-soft)]"
            : hot === "mag"
              ? "border-[var(--color-em)]"
              : "border-white"
        }`}
        style={{ x: ringX, y: ringY }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{ x, y }}
      />
    </>
  );
}

function TrailDot({
  x,
  y,
  index,
}: {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  index: number;
}) {
  const tx = useSpring(x, {
    stiffness: 80 - index * 8,
    damping: 18,
    mass: 0.4 + index * 0.08,
  });
  const ty = useSpring(y, {
    stiffness: 80 - index * 8,
    damping: 18,
    mass: 0.4 + index * 0.08,
  });
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[99] h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-em)]"
      style={{ x: tx, y: ty, opacity: 0.55 - index * 0.06 }}
    />
  );
}
