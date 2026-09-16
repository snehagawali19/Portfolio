"use client";

import { education, experience, projects } from "@/data/site";
import { Reveal } from "./reveal";

export function Work() {
  return (
    <section id="projects" className="relative px-4 pb-32 md:px-8 md:pb-40">
      <Reveal>
        <h2 className="mb-20 text-[clamp(1.75rem,5vw,3.42rem)] md:ml-[17%]">
          Projects
        </h2>
      </Reveal>

      <ul className="mx-auto flex max-w-[1200px] flex-col gap-28 md:gap-40">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.04}>
            <li
              className={`w-full md:w-[min(40vw,600px)] ${
                project.accent === "right" ? "md:ml-auto md:mr-[7vw]" : "md:ml-[7vw]"
              }`}
            >
              <article className="group relative block">
                <span className="pc pc-tl" />
                <span className="pc pc-tr" />
                <span className="pc pc-bl" />
                <span className="pc pc-br" />
                {"href" in project ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`Open ${project.title}`}
                  />
                ) : null}
                <div className="overflow-hidden">
                  <ProjectVisual slug={project.slug} title={project.title} />
                </div>
                <div className="pt-5 md:absolute md:inset-x-0 md:bottom-0 md:bg-[linear-gradient(to_top,#050505d9_0,#050505d9_104px,transparent_152px)] md:pt-20 md:pr-5 md:pb-5 md:pl-5">
                  <p className="mb-1.5 text-[0.66rem] tracking-[0.15em] text-[rgb(255_255_255_/_0.55)] uppercase">
                    {project.kind}
                  </p>
                  <h3 className="text-[clamp(1.75rem,2.4vw,2.19rem)] leading-[1.1] text-[var(--color-ink)]">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[0.9rem] leading-relaxed font-light text-[var(--color-soft)]">
                    {project.summary}
                  </p>
                  <p className="mt-3 text-[0.66rem] tracking-[0.12em] text-[var(--color-faint)] uppercase">
                    {project.stack}
                  </p>
                </div>
              </article>
            </li>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mx-auto mt-32 max-w-[900px] md:mt-40">
        <ul className="space-y-12">
          {experience.map((item) => (
            <li key={item.org} className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-6">
              <p className="text-[0.72rem] tracking-[0.2em] text-[var(--color-faint)] uppercase md:col-span-2">
                {item.year}
              </p>
              <div className="md:col-span-4">
                <p className="text-[clamp(1.4rem,2vw,1.75rem)] text-[var(--color-ink)]">
                  {item.org}
                </p>
                <p className="mt-1 text-[0.72rem] tracking-[0.14em] text-[var(--color-soft)] uppercase">
                  {item.title}
                </p>
              </div>
              <p className="max-w-md text-[0.95rem] leading-relaxed font-light text-[var(--color-soft)] md:col-span-6">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-16 max-w-lg text-[0.85rem] leading-relaxed text-[var(--color-faint)]">
          {education.degree}. {education.school}. {education.meta}.
        </p>
      </Reveal>
    </section>
  );
}

function ProjectVisual({ slug, title }: { slug: string; title: string }) {
  return (
    <div className="relative flex aspect-[16/11] items-center justify-center overflow-hidden bg-[#0c0c0c] bg-[radial-gradient(ellipse_at_30%_20%,rgb(46_230_160_/_0.08),transparent_60%)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
      <svg viewBox="0 0 400 275" className="h-full w-full" aria-hidden>
        {slug === "rebalancerl" ? (
          <>
            {[[60, 80], [140, 50], [230, 90], [310, 46], [90, 180], [200, 170], [300, 200]].map(
              ([x, y], i, arr) => (
                <g key={i}>
                  {arr[i + 1] ? (
                    <line
                      x1={x}
                      y1={y}
                      x2={arr[i + 1][0]}
                      y2={arr[i + 1][1]}
                      stroke="rgba(159,245,212,0.35)"
                    />
                  ) : null}
                  <circle cx={x} cy={y} r={5} fill={i % 2 ? "#2EE6A0" : "#9FF5D4"} />
                </g>
              ),
            )}
          </>
        ) : null}
        {slug === "incidentrag" ? (
          <>
            <rect x="70" y="48" width="170" height="22" rx="3" fill="rgba(245,245,245,0.08)" />
            <rect x="70" y="82" width="240" height="14" rx="3" fill="rgba(46,230,160,0.2)" />
            <rect x="70" y="108" width="210" height="14" rx="3" fill="rgba(245,245,245,0.08)" />
            <rect x="70" y="134" width="180" height="14" rx="3" fill="rgba(46,230,160,0.12)" />
            <rect x="70" y="168" width="90" height="28" rx="14" fill="#2EE6A0" />
          </>
        ) : null}
        {slug === "disputeflow" ? (
          <>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i}>
                {i < 5 ? (
                  <line
                    x1={58 + i * 56}
                    y1="128"
                    x2={90 + i * 56}
                    y2="128"
                    stroke="rgba(46,230,160,0.35)"
                  />
                ) : null}
                <rect
                  x={40 + i * 56}
                  y="110"
                  width="36"
                  height="36"
                  rx="6"
                  fill={i === 3 ? "#2EE6A0" : "rgba(46,230,160,0.12)"}
                  stroke="rgba(46,230,160,0.45)"
                />
              </g>
            ))}
            <rect x="70" y="188" width="260" height="12" rx="3" fill="rgba(245,245,245,0.08)" />
            <rect x="70" y="208" width="180" height="12" rx="3" fill="rgba(46,230,160,0.16)" />
          </>
        ) : null}
        {slug === "deepshield" ? (
          <>
            <rect x="72" y="48" width="160" height="110" rx="10" fill="rgba(245,245,245,0.06)" stroke="rgba(46,230,160,0.35)" />
            <circle cx="152" cy="92" r="22" fill="rgba(46,230,160,0.18)" stroke="#2EE6A0" />
            <rect x="248" y="56" width="90" height="10" rx="3" fill="rgba(46,230,160,0.45)" />
            <rect x="248" y="78" width="70" height="8" rx="3" fill="rgba(245,245,245,0.12)" />
            <rect x="248" y="98" width="78" height="8" rx="3" fill="rgba(46,230,160,0.2)" />
            <rect x="248" y="128" width="52" height="22" rx="11" fill="#2EE6A0" />
          </>
        ) : null}
      </svg>
      <span className="sr-only">{title}</span>
    </div>
  );
}
