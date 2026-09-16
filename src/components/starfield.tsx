"use client";

import { useScroll } from "motion/react";
import { useEffect, useRef } from "react";

type Particle = {
  a: number;
  r: number;
  z: number;
  mint: boolean;
  size: number;
};

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const particles: Particle[] = Array.from({ length: 420 }, (_, i) => ({
      a: Math.random() * Math.PI * 2,
      r: 0.08 + Math.random() ** 1.6 * 0.92,
      z: Math.random(),
      mint: i % 5 !== 0,
      size: 0.6 + Math.random() * 1.6,
    }));

    let frame = 0;
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.width = Math.floor(window.innerWidth * devicePixelRatio);
      h = canvas.height = Math.floor(window.innerHeight * devicePixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const p = scrollYProgress.get();
      const t = reduce ? 0 : p;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const doorH = Math.min(window.innerHeight * 0.62, 560);
      const doorW = doorH / 2.6;
      const stretch = Math.min(1, t / 0.28);
      const scatter = Math.max(0, (t - 0.45) / 0.4);

      for (const star of particles) {
        const doorX = Math.cos(star.a) * (doorW / 2) * star.r;
        const doorY = Math.sin(star.a) * (doorH / 2) * (0.35 + star.r * 0.65);
        const colY = (star.z - 0.5) * window.innerHeight * 1.15;
        const colX = (star.r - 0.5) * 28 + Math.sin(star.a * 3) * 10;
        const fieldX = (star.z - 0.5) * window.innerWidth * 1.2;
        const fieldY = (star.r - 0.5) * window.innerHeight * 1.2;

        const x =
          cx +
          doorX * (1 - stretch) +
          colX * stretch * (1 - scatter) +
          fieldX * scatter;
        const y =
          cy +
          doorY * (1 - stretch) +
          colY * stretch * (1 - scatter) +
          fieldY * scatter;

        const alpha = 0.18 + star.z * 0.55;
        ctx.fillStyle = star.mint
          ? `rgba(46, 230, 160, ${alpha})`
          : `rgba(245, 245, 245, ${alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [scrollYProgress]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2]"
    />
  );
}
