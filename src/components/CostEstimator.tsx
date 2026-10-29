"use client";

import { useMemo, useState } from "react";

const TOOLS = ["AWS", "GitHub", "Jira", "Okta", "HRMS", "ServiceNow"];

export default function CostEstimator() {
  const [people, setPeople] = useState(120);
  const [tools, setTools] = useState<string[]>(["AWS", "GitHub", "Jira"]);
  const [certified, setCertified] = useState(false);

  const est = useMemo(() => {
    // Simple, honest heuristics: more tools = more automated evidence, fewer manual weeks.
    const automation = Math.min(92, 55 + tools.length * 7);
    const base = certified ? 3 : 8;
    const weeks = Math.max(certified ? 2 : 4, Math.round(base - tools.length * 0.6 + (people > 500 ? 1 : 0)));
    const manualMonths = certified ? 3 : people > 300 ? 12 : 9;
    return { automation, weeks, manualMonths, users: people };
  }, [people, tools, certified]);

  const toggle = (t: string) => setTools((xs) => (xs.includes(t) ? xs.filter((x) => x !== t) : [...xs, t]));

  const PLAN = [
    { label: "Scope & connect", from: 0, to: 1 },
    { label: "Policies drafted", from: 1, to: 2.5 },
    { label: "Evidence collected", from: 1.5, to: est.weeks - 1.5 },
    { label: "Review & approve", from: est.weeks - 2.5, to: est.weeks - 0.5 },
    { label: "Audit package", from: est.weeks - 1, to: est.weeks },
  ];

  return (
    <div className="card grid overflow-hidden lg:grid-cols-[22rem_1fr]">
      {/* Inputs */}
      <div className="border-b border-line bg-surface p-6 sm:p-8 lg:border-b-0 lg:border-r">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Your organisation</p>

        <label className="mt-6 block">
          <span className="flex items-center justify-between text-sm font-medium text-navy">
            People <span className="font-mono text-brand">{people.toLocaleString()}</span>
          </span>
          <input
            type="range"
            min={10}
            max={2000}
            step={10}
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            className="range mt-2 w-full"
          />
          <span className="flex justify-between text-[11px] text-muted"><span>10</span><span>2,000</span></span>
        </label>

        <div className="mt-6">
          <span className="text-sm font-medium text-navy">Tools you run</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {TOOLS.map((t) => {
              const on = tools.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggle(t)}
                  aria-pressed={on}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    on ? "border-brand bg-brand text-white shadow-sm" : "border-line bg-white text-muted hover:border-brand hover:text-brand"
                  }`}
                >
                  {on ? "✓ " : "+ "}{t}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <span className="text-sm font-medium text-navy">Starting point</span>
          <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg bg-white p-1 text-xs">
            {[["Not yet certified", false], ["Already certified", true]].map(([l, v]) => (
              <button
                key={String(l)}
                onClick={() => setCertified(v as boolean)}
                className={`rounded-md px-3 py-2 font-medium transition ${certified === v ? "bg-navy text-white" : "text-muted hover:text-navy"}`}
              >
                {l as string}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat big={`${Math.max(est.weeks - 2, certified ? 2 : 4)}–${est.weeks}`} unit="weeks" label={certified ? "to continuous monitoring live" : "to audit-ready"} accent />
          <Stat big="$0" unit="per seat" label={`${est.users.toLocaleString()} users, no per-user fee`} />
          <Stat big={`${est.automation}%`} unit="" label="evidence collected automatically" />
        </div>

        {/* Gantt */}
        <div className="mt-8">
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="font-semibold uppercase tracking-wider">Plan</span>
            <span className="font-mono">{est.weeks} weeks</span>
          </div>
          <div className="mt-3 space-y-2">
            {PLAN.map((r, i) => (
              <div key={r.label} className="grid grid-cols-[9rem_1fr] items-center gap-3 text-xs">
                <span className="truncate text-navy">{r.label}</span>
                <div className="relative h-5 rounded bg-surface">
                  <div
                    className="gantt-bar absolute top-0 h-full rounded bg-gradient-to-r from-brand to-cyan"
                    style={{
                      left: `${(Math.max(0, r.from) / est.weeks) * 100}%`,
                      width: `${((Math.min(est.weeks, r.to) - Math.max(0, r.from)) / est.weeks) * 100}%`,
                      transitionDelay: `${i * 60}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="ml-[9.75rem] mt-1 flex justify-between font-mono text-[10px] text-muted">
            {Array.from({ length: est.weeks + 1 }, (_, i) => <span key={i}>{i === 0 ? "W0" : i}</span>)}
          </div>
        </div>

        {/* vs manual */}
        <div className="mt-6 rounded-xl border border-line bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Compared with doing it by hand</p>
          <div className="mt-3 space-y-2 text-xs">
            <Bar label="Manual / consultant" pct={100} value={`${est.manualMonths} months`} muted />
            <Bar label="AscendIQ" pct={(est.weeks / (est.manualMonths * 4.33)) * 100} value={`${est.weeks} weeks`} />
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            Estimates only. Your written quote is fixed-scope, after a free 45-minute readiness call.
          </p>
          <a href="#next-step" className="btn btn-primary shrink-0">Get a fixed-scope quote</a>
        </div>
      </div>
    </div>
  );
}

function Stat({ big, unit, label, accent }: { big: string; unit: string; label: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl p-5 ${accent ? "brand-grad text-white" : "border border-line"}`}>
      <div className="text-3xl font-bold tracking-tight tabular-nums">
        {big} <span className={`text-sm font-semibold ${accent ? "text-white/80" : "text-muted"}`}>{unit}</span>
      </div>
      <p className={`mt-1 text-xs ${accent ? "text-white/85" : "text-muted"}`}>{label}</p>
    </div>
  );
}

function Bar({ label, pct, value, muted }: { label: string; pct: number; value: string; muted?: boolean }) {
  return (
    <div className="grid grid-cols-[9rem_1fr_auto] items-center gap-3">
      <span className="text-navy">{label}</span>
      <div className="h-2.5 rounded bg-white">
        <div className={`gantt-bar h-full rounded ${muted ? "bg-line" : "bg-gradient-to-r from-brand to-cyan"}`} style={{ width: `${Math.max(4, pct)}%` }} />
      </div>
      <span className="font-mono text-[11px] text-muted">{value}</span>
    </div>
  );
}
