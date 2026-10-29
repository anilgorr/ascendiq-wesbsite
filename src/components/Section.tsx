import type { ReactNode } from "react";
import { Reveal } from "./Motion";

export function Section({
  id,
  n,
  eyebrow,
  title,
  lead,
  children,
  tone = "white",
}: {
  id: string;
  n: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
  tone?: "white" | "surface" | "navy";
}) {
  const bg = tone === "navy" ? "bg-blue-50" : tone === "surface" ? "bg-surface" : "bg-white";
  return (
    <section id={id} className={`${bg} py-16 lg:py-24`}>
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3">
            <span className="num">{n}</span>
            <span className="eyebrow">{eyebrow}</span>
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function Check() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-cyan" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
