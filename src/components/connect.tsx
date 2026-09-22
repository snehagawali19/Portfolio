"use client";

import { site } from "@/data/site";
import { Reveal } from "./reveal";

export function Connect() {
  return (
    <section
      id="contact"
      className="relative z-[6] flex min-h-[100dvh] flex-col items-center justify-center px-[6vw] py-32 text-center"
    >
      <Reveal>
        <p className="serif mb-8 text-[clamp(1.4rem,3.6vw,2.73rem)] text-[var(--color-soft)]">
          Let&apos;s connect.
        </p>
        <a
          href={`mailto:${site.email}`}
          data-magnetic="8"
          className="text-[clamp(1.4rem,5.4vw,4.27rem)] font-bold tracking-[-0.01em] break-all text-[var(--color-ink)] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--color-em)]"
        >
          {site.email}
        </a>
        <p className="mt-6 text-[0.66rem] tracking-[0.28em] text-[rgb(255_255_255_/_0.35)] uppercase">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            data-magnetic="6"
            className="inline-block text-[rgb(255_255_255_/_0.55)] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[rgb(255_255_255_/_0.9)]"
          >
            GitHub
          </a>
          <span aria-hidden> · </span>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            data-magnetic="6"
            className="inline-block text-[rgb(255_255_255_/_0.55)] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[rgb(255_255_255_/_0.9)]"
          >
            LinkedIn
          </a>
          <span aria-hidden> · </span>
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            data-magnetic="6"
            className="inline-block text-[rgb(255_255_255_/_0.55)] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[rgb(255_255_255_/_0.9)]"
          >
            Resume
          </a>
        </p>
      </Reveal>
      <footer className="absolute bottom-6 text-[0.66rem] tracking-[0.28em] text-[var(--color-faint)] uppercase">
        © 2026 {site.name}. AI · Robotics · {site.city}
      </footer>
    </section>
  );
}
