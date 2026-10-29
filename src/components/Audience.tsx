"use client";

import { useState } from "react";
import { AUDIENCE } from "@/content/site";

const VIEW = [
  {
    screen: "Programme overview",
    rows: [["Readiness", "96.2%", "ok"], ["Policies awaiting approval", "3", "warn"], ["Audit date", "14 Jan · 11 wks", "ok"]],
    line: "Monday 9:00 — three policies to sign, one remediation to chase. Nothing else to think about.",
  },
  {
    screen: "Controls in production",
    rows: [["A.8.20 Network security", "Drifted · S3", "bad"], ["A.8.5 MFA coverage", "412 / 412", "ok"], ["A.8.8 Vuln SLA", "2 overdue", "warn"]],
    line: "Not what the policy says. What CloudTrail, IAM and GitHub say right now.",
  },
  {
    screen: "Connectors",
    rows: [["AWS (read-only)", "Healthy · 12s", "ok"], ["GitHub", "Healthy · 40s", "ok"], ["Okta", "Token expires in 9d", "warn"]],
    line: "Scoped read-only credentials. No agents on hosts, no cron jobs to babysit.",
  },
  {
    screen: "Auditor workspace",
    rows: [["Evidence package", "1.2 GB · 93 controls", "ok"], ["Sampled artefacts", "48 / 48 with lineage", "ok"], ["Open queries", "2", "warn"]],
    line: "Read-only role. Pull any artefact and trace it to its source and timestamp.",
  },
];

const DOT = { ok: "bg-emerald-500", warn: "bg-amber-400", bad: "bg-rose-500" };

export default function Audience() {
  const [i, setI] = useState(0);
  const a = AUDIENCE[i];
  const v = VIEW[i];
  return (
    <div className="card grid overflow-hidden lg:grid-cols-[1fr_1fr]">
      <div className="flex flex-col divide-y divide-line">
        {AUDIENCE.map((x, k) => (
          <button
            key={x.title}
            onMouseEnter={() => setI(k)}
            onClick={() => setI(k)}
            className={`flex items-start gap-4 p-5 text-left transition ${k === i ? "bg-surface" : "hover:bg-surface/60"}`}
          >
            <span className={`mt-1 h-8 w-1 shrink-0 rounded-full transition ${k === i ? "bg-brand" : "bg-line"}`} />
            <span>
              <span className={`block font-semibold ${k === i ? "text-navy" : "text-ink/70"}`}>{x.title}</span>
              <span className={`block overflow-hidden text-sm text-muted transition-all duration-500 ${k === i ? "mt-1 max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>{x.body}</span>
            </span>
          </button>
        ))}
      </div>
      <div key={i} className="ticker-row bg-navy p-6 text-white sm:p-8">
        <p className="text-xs text-white/60">What {a.title.toLowerCase()} see</p>
        <div className="mt-3 rounded-xl border border-white/10 bg-white/5">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-xs text-white/60">
            <span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="ml-2 font-mono">{v.screen}</span>
          </div>
          <ul className="divide-y divide-white/10">
            {v.rows.map(([k, val, s], n) => (
              <li key={k} className="flow-item flex items-center justify-between px-4 py-3 text-sm" style={{ animationDelay: `${n * 0.08}s` }}>
                <span>{k}</span>
                <span className="flex items-center gap-2 font-mono text-xs text-white/80">
                  {val} <span className={`h-2 w-2 rounded-full ${DOT[s as keyof typeof DOT]}`} />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-sm text-white/75">{v.line}</p>
      </div>
    </div>
  );
}
