"use client";

import { useScroll } from "motion/react";
import { useEffect, useRef } from "react";

type Particle = {
  a: number;
  r: number;
  z: number;
  u: number;
  v: number;
  mint: boolean;
  size: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const particles: Particle[] = Array.from({ length: 900 }, (_, i) => ({
      a: Math.random() * Math.PI * 2,
      r: 0.05 + Math.random() ** 1.65 * 0.95,
      z: Math.random(),
      u: Math.sqrt(Math.random()),
      v: Math.random() * Math.PI * 2,
      mint: i % 4 !== 0,
      size: 0.5 + Math.random() * 1.8,
    }));

    let frame = 0;
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * devicePixelRatio);
      canvas.height = Math.floor(window.innerHeight * devicePixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const y = reduce ? 0 : scrollY.get();
      const vh = window.innerHeight;
      const hero = document.getElementById("hero");
      const about = document.getElementById("about");
      const outro = document.getElementById("outro");
      const heroH = hero?.offsetHeight ?? vh * 2.8;
      const aboutTop = about?.offsetTop ?? heroH;
      const outroTop = outro?.offsetTop ?? aboutTop + vh * 8;
      const outroH = outro?.offsetHeight ?? vh * 1.6;

      const stretch = clamp((y - vh * 0.28) / (heroH * 0.5));
      const follow = clamp((y - aboutTop + vh * 0.15) / Math.max(vh, (about?.offsetHeight ?? vh) * 0.85));
      const form = Math.max(stretch, follow);
      const blast = easeOutExpo(clamp((y - outroTop + vh * 0.2) / (outroH * 0.62)));
      const settle = clamp((y - outroTop - outroH * 0.45) / (vh * 0.8));

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const ringEl = document.getElementById("hero-ring");
      const ringRect = ringEl?.getBoundingClientRect();
      const ringD = ringEl?.offsetWidth ?? Math.min(vh * 0.9, 820, window.innerWidth - 32);
      const ringR = ringD / 2 - 10;
      const ringDX = ringRect ? ringRect.left + ringRect.width / 2 - cx : 0;
      const ringDY = ringRect ? ringRect.top + ringRect.height / 2 - cy : 0;
      if (blast > 0.02 && blast < 0.55) {
        const flash = (0.55 - blast) / 0.53;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90 + blast * 520);
        grd.addColorStop(0, `rgba(159, 245, 212, ${0.22 * flash})`);
        grd.addColorStop(0.35, `rgba(46, 230, 160, ${0.1 * flash})`);
        grd.addColorStop(1, "rgba(46, 230, 160, 0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }

      for (const star of particles) {
        const doorX = ringDX + Math.cos(star.v) * ringR * star.u + Math.sin(star.a + y * 0.001) * 4;
        const doorY = ringDY + Math.sin(star.v) * ringR * star.u + Math.cos(star.a * 2 + y * 0.001) * 4;
        const colY = (star.z - 0.5) * vh * 1.4;
        const colX = (star.r - 0.5) * 18 + Math.sin(star.a * 4 + y * 0.0018) * 7;
        const reach = 140 + star.r * 980 + star.z * 220;
        const blastX = Math.cos(star.a) * reach * blast;
        const blastY = Math.sin(star.a) * reach * blast;
        const fieldX = (star.z - 0.5) * window.innerWidth * 1.2;
        const fieldY = (star.r - 0.5) * vh * 1.2;

        const x =
          cx +
          doorX * (1 - form) +
          colX * form * (1 - blast) +
          blastX * (1 - settle) +
          fieldX * settle;
        const yPos =
          cy +
          doorY * (1 - form) +
          colY * form * (1 - blast) +
          blastY * (1 - settle) +
          fieldY * settle;

        const alpha = (0.16 + star.z * 0.62) * (1 - settle * 0.2) + blast * 0.12 * (1 - settle);
        ctx.fillStyle = star.mint
          ? `rgba(46, 230, 160, ${alpha})`
          : `rgba(245, 245, 245, ${alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(x, yPos, star.size * (1 + blast * 0.7 * (1 - settle)), 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [scrollY]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2]"
    />
  );
}
