"use client";

import { useRef, type MouseEvent } from "react";
import { PHASES } from "@/content/site";
import { Check } from "./Section";

const ICONS = [
  // plug
  <path key="a" d="M9 2v6M15 2v6M7 8h10v4a5 5 0 0 1-10 0V8zM12 17v5" />,
  // sparkles / generate
  <path key="b" d="M12 3l1.8 4.6L18.5 9.5l-4.7 1.9L12 16l-1.8-4.6L5.5 9.5l4.7-1.9L12 3zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />,
  // shield check
  <path key="c" d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3zM8.5 12.5l2.5 2.5 4.5-5" />,
];

export default function Phases() {
  return (
    <div className="relative">
      {/* Week rail behind the cards */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 lg:block" aria-hidden>
        <div className="relative mx-auto h-px w-[92%] bg-gradient-to-r from-brand/0 via-brand/40 to-cyan/0">
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-10" style={{ perspective: "1400px" }}>
        {PHASES.map((p, i) => (
          <TiltCard key={p.n} index={i}>
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-cyan text-white shadow-[0_8px_20px_-8px_rgb(37_99_235/0.8)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[i]}
                </svg>
              </span>
              <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-navy">{p.time}</span>
            </div>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="num">{p.n}</span>
              <h3 className="text-xl font-bold text-navy">{p.title}</h3>
            </div>
            <p className="mt-3 text-sm text-muted">{p.body}</p>
            <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-2.5">
                  <Check /> {b}
                </li>
              ))}
            </ul>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="tilt-card relative rounded-2xl"
      style={{ animationDelay: `${index * -2}s` }}
    >
      <div className="tilt-inner relative rounded-2xl border border-white/80 bg-white/90 p-7 backdrop-blur">
        <span className="tilt-glow pointer-events-none absolute inset-0 rounded-2xl" aria-hidden />
        <div className="relative">{children}</div>
      </div>
      <span className="tilt-shadow pointer-events-none absolute inset-x-4 -bottom-5 h-10 rounded-[100%] bg-navy/40 blur-2xl" aria-hidden />
    </div>
  );
}
