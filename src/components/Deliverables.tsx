"use client";

import { useState } from "react";
import { DELIVERABLES } from "@/content/site";

const ICONS = [
  <path key="0" d="M6 3h9l4 4v14H6V3zm9 0v4h4M9 12h7M9 16h7" />,
  <path key="1" d="M4 7h16v12H4V7zm0 4h16M8 7V4h8v3" />,
  <path key="2" d="M4 5h16v12H4V5zm4 16h8M8 13l3-3 2 2 4-4" />,
  <path key="3" d="M5 4h14v16H5V4zm3 11v2m4-5v5m4-8v8" />,
  <path key="4" d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3zM4 13h16" />,
];

const DETAIL = [
  "Every Annex A policy drafted for your org, versioned, approved with e-signatures and tracked for acknowledgment.",
  "Pulled from your tools, normalised into one schema, with lineage back to the source for every artefact.",
  "One number for readiness, control-level breakdown, AI recommendations and trend over time.",
  "Readiness report, gap analysis with remediation plan, and the complete evidence package your auditor needs.",
  "Drift detection, owner alerts, remediation tracking and connector health, every day after certification.",
];

export default function Deliverables() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      {/* Stack */}
      <div className="relative mx-auto h-[23rem] w-full max-w-md" style={{ perspective: "1600px" }}>
        {DELIVERABLES.map((d, i) => {
          const isActive = i === active;
          const depth = i - active;
          return (
            <button
              key={d.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={`stack-card absolute inset-x-0 top-0 rounded-2xl border p-5 text-left ${
                isActive ? "brand-grad border-white/30 text-white" : "border-line bg-white text-navy"
              }`}
              style={{
                transform: `translateY(${i * 66}px) translateZ(${isActive ? 60 : -Math.abs(depth) * 30}px) rotateX(${isActive ? 0 : 8}deg) scale(${isActive ? 1 : 1 - Math.abs(depth) * 0.03})`,
                zIndex: isActive ? 50 : 40 - Math.abs(depth),
                opacity: Math.abs(depth) > 3 ? 0.4 : 1,
                boxShadow: isActive
                  ? "0 30px 60px -20px rgb(37 99 235 / 0.55), 0 0 0 1px rgb(255 255 255 / 0.2) inset"
                  : "0 10px 24px -14px rgb(10 37 64 / 0.3)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${isActive ? "bg-white/20" : "bg-surface text-brand"}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ICONS[i]}</svg>
                </span>
                <span className={`font-mono text-[11px] ${isActive ? "text-white/70" : "text-cyan"}`}>0{i + 1}</span>
                <span className="text-lg font-bold">{d.title}</span>
                <span className={`ml-auto text-xs ${isActive ? "text-white/80" : "text-muted"}`}>{d.tags.length} items</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail */}
      <div key={active} className="ticker-row">
        <p className="num">INCLUDED · 0{active + 1}</p>
        <h3 className="mt-2 text-3xl font-bold tracking-tight text-navy">{DELIVERABLES[active].title}</h3>
        <p className="mt-3 text-muted">{DETAIL[active]}</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-3">
          {DELIVERABLES[active].tags.map((t, i) => (
            <li key={t} className="flow-item rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-navy" style={{ animationDelay: `${i * 0.08}s` }}>
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex gap-1.5">
          {DELIVERABLES.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Show item ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-brand" : "w-3 bg-line hover:bg-brand/40"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
