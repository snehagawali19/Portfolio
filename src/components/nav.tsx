"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";

export function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = ["hero", ...nav.map((item) => item.id)];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id && visible.target.id !== "hero") {
          setActive(visible.target.id);
        }
        if (visible?.target.id === "hero") setActive("");
      },
      { threshold: [0.2, 0.45, 0.7] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-8 py-6 mix-blend-difference md:px-12 md:py-7">
      <a
        href="#hero"
        data-magnetic="6"
        className="text-[0.72rem] font-medium tracking-[0.32em] whitespace-nowrap uppercase text-[var(--color-ink)]"
      >
        {site.shortName}
      </a>
      <div className="absolute left-1/2 hidden -translate-x-1/2 gap-8 md:flex">
        {nav.map((item) => (
          <a
            key={item.id}
            href={item.href}
            data-magnetic="6"
            className={`text-[0.9rem] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              active === item.id ? "text-[var(--color-em)]" : "text-[var(--color-soft)] hover:text-white"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
      <a
        href={site.resume}
        data-magnetic="6"
        className="text-[0.78rem] tracking-[0.08em] text-[var(--color-faint)] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white"
      >
        Resume
      </a>
    </nav>
  );
}
