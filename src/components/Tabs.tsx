"use client";

import { useState } from "react";
import { TABS } from "@/content/site";
import { Check } from "./Section";

export default function Tabs() {
  const [active, setActive] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <div className="card overflow-hidden">
      <div className="flex overflow-x-auto border-b border-line bg-surface" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={`shrink-0 border-b-2 px-5 py-3.5 text-sm font-medium transition ${
              active === t.id ? "border-brand bg-white text-navy" : "border-transparent text-muted hover:text-navy"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-navy">{tab.heading}</h3>
          <p className="mt-3 text-muted">{tab.body}</p>
          <ul className="mt-6 space-y-3">
            {tab.points.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-ink">
                <Check /> {p}
              </li>
            ))}
          </ul>
        </div>
        <Preview id={tab.id} />
      </div>
    </div>
  );
}

function Preview({ id }: { id: string }) {
  if (id === "policies")
    return (
      <Frame title="A.5.1 Information security policy · draft v3">
        <div className="space-y-2 font-mono text-[12px] leading-relaxed text-ink/80">
          <p><span className="text-brand">1. Purpose.</span> This policy establishes the information security objectives of <b>Acme Fintech Pvt Ltd</b> (210 employees, AWS + GitHub)…</p>
          <p><span className="text-brand">2. Scope.</span> Applies to all production workloads in ap-south-1 and eu-west-1…</p>
          <p className="text-muted">3. Roles and responsibilities. The CISO shall…</p>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-md bg-surface px-3 py-2 text-xs">
          <span>Validation against ISO 27001:2022</span>
          <span className="font-mono text-emerald-600">PASS · confidence 0.94</span>
        </div>
      </Frame>
    );
  if (id === "evidence")
    return (
      <Frame title="Evidence · last 24h">
        <Row k="aws:iam:mfa-report" v="412 users · 412 MFA" ok />
        <Row k="aws:s3:public-access" v="0 public buckets" ok />
        <Row k="github:branch-protection" v="main · 2 reviewers" ok />
        <Row k="jira:access-requests" v="38 closed · 2 open" warn />
        <Row k="hrms:offboarding" v="3 leavers · 2 deprovisioned" warn />
      </Frame>
    );
  if (id === "mapping")
    return (
      <Frame title="Suggested mapping">
        <div className="rounded-md border border-line p-3 text-sm">
          <div className="font-mono text-[11px] text-muted">github:branch-protection · main</div>
          <div className="mt-2 space-y-1.5">
            {[["A.8.32 Change management", 0.97], ["A.8.4 Access to source code", 0.91], ["A.8.25 Secure development", 0.74]].map(([c, s]) => (
              <div key={c as string} className="flex items-center justify-between">
                <span>{c}</span>
                <span className="font-mono text-[11px] text-cyan">{s as number}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <span className="rounded bg-brand px-2 py-1 text-xs font-medium text-white">Accept</span>
            <span className="rounded border border-line px-2 py-1 text-xs">Override…</span>
          </div>
        </div>
      </Frame>
    );
  if (id === "dashboard")
    return (
      <Frame title="Compliance posture">
        <div className="flex items-end gap-6">
          <div>
            <div className="text-5xl font-bold tracking-tight text-navy">96.2%</div>
            <div className="text-xs text-muted">▲ 3.1 pts this week</div>
          </div>
          <div className="flex-1 space-y-2 text-xs">
            {[["Implemented", 89, "bg-emerald-500"], ["Pending", 3, "bg-amber-400"], ["Non-compliant", 1, "bg-rose-500"]].map(([l, n, c]) => (
              <div key={l as string}>
                <div className="flex justify-between"><span>{l}</span><span className="font-mono">{n}</span></div>
                <div className="mt-1 h-1.5 rounded bg-surface"><div className={`h-full rounded ${c}`} style={{ width: `${((n as number) / 93) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 rounded-md bg-brand/5 p-3 text-xs text-ink">
          <span className="font-semibold text-brand">AI insight ·</span> Two leavers from last week still hold Jira access. Closing them lifts A.5.18 to 100%.
        </div>
      </Frame>
    );
  return (
    <Frame title="Exports">
      {[["Readiness report", "PDF · 24 pp"], ["Gap analysis + remediation plan", "PDF · 9 pp"], ["Evidence package (auditor)", "ZIP · 1.2 GB"], ["Executive summary", "PDF · 2 pp"]].map(([n, m]) => (
        <div key={n} className="flex items-center justify-between border-b border-line py-2.5 text-sm last:border-0">
          <span>{n}</span>
          <span className="font-mono text-[11px] text-muted">{m}</span>
        </div>
      ))}
    </Frame>
  );
}

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 text-xs text-muted">
        <span className="h-2 w-2 rounded-full bg-line" /><span className="h-2 w-2 rounded-full bg-line" /><span className="h-2 w-2 rounded-full bg-line" />
        <span className="ml-2 font-mono">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Row({ k, v, ok, warn }: { k: string; v: string; ok?: boolean; warn?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-line py-2 text-sm last:border-0">
      <span className="font-mono text-[12px] text-ink/80">{k}</span>
      <span className="flex items-center gap-2 text-xs text-muted">
        {v}
        <span className={`h-2 w-2 rounded-full ${ok ? "bg-emerald-500" : warn ? "bg-amber-400" : "bg-line"}`} />
      </span>
    </div>
  );
}
