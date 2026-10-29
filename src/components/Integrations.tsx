"use client";

import Image from "next/image";
import { useState } from "react";

type Connector = {
  id: string;
  name: string;
  mono: string;
  hue: string;
  status: "Built-in" | "Connector" | "Build it";
  pulls: string[];
  controls: { id: string; name: string }[];
  cadence: string;
};

const CONNECTORS: Connector[] = [
  {
    id: "aws", name: "AWS", mono: "AWS", hue: "from-orange-400 to-amber-500", status: "Built-in",
    pulls: ["IAM users, roles and MFA status", "CloudTrail root and console logins", "Security group ingress rules", "S3 bucket public-access settings"],
    controls: [{ id: "A.5.15", name: "Access control" }, { id: "A.8.5", name: "Secure authentication" }, { id: "A.8.15", name: "Logging" }, { id: "A.8.20", name: "Network security" }],
    cadence: "Every 60 min",
  },
  {
    id: "github", name: "GitHub / GitLab", mono: "GH", hue: "from-slate-700 to-slate-900", status: "Built-in",
    pulls: ["Branch protection on default branches", "Required reviewers and status checks", "Org members, 2FA enforcement", "Deploy keys and secrets scanning"],
    controls: [{ id: "A.8.4", name: "Access to source code" }, { id: "A.8.25", name: "Secure development" }, { id: "A.8.32", name: "Change management" }],
    cadence: "Every 60 min",
  },
  {
    id: "jira", name: "Jira", mono: "JI", hue: "from-blue-500 to-blue-700", status: "Built-in",
    pulls: ["Access-request tickets and approvals", "Change tickets with CAB sign-off", "Incident tickets and resolution times"],
    controls: [{ id: "A.5.18", name: "Access rights" }, { id: "A.8.32", name: "Change management" }, { id: "A.5.26", name: "Incident response" }],
    cadence: "Every 30 min",
  },
  {
    id: "snow", name: "ServiceNow", mono: "SN", hue: "from-emerald-500 to-teal-600", status: "Built-in",
    pulls: ["ITSM change records", "Asset and CMDB entries", "Problem and incident workflow states"],
    controls: [{ id: "A.5.9", name: "Inventory of assets" }, { id: "A.8.32", name: "Change management" }, { id: "A.5.26", name: "Incident response" }],
    cadence: "Every 30 min",
  },
  {
    id: "idp", name: "Okta / Azure AD / Google", mono: "ID", hue: "from-indigo-500 to-violet-600", status: "Built-in",
    pulls: ["User directory and group membership", "MFA enrolment per user", "Login policies, session timeouts", "Deprovisioned accounts"],
    controls: [{ id: "A.5.16", name: "Identity management" }, { id: "A.5.17", name: "Authentication info" }, { id: "A.8.5", name: "Secure authentication" }],
    cadence: "Every 15 min",
  },
  {
    id: "hrms", name: "HRMS", mono: "HR", hue: "from-pink-500 to-rose-600", status: "Connector",
    pulls: ["Joiners, movers and leavers", "Background-check completion", "Security-awareness training records", "Signed acceptable-use policies"],
    controls: [{ id: "A.6.1", name: "Screening" }, { id: "A.6.3", name: "Awareness and training" }, { id: "A.6.5", name: "Termination responsibilities" }],
    cadence: "Daily",
  },
  {
    id: "upload", name: "Manual upload", mono: "UP", hue: "from-cyan-500 to-sky-600", status: "Built-in",
    pulls: ["PDFs, screenshots and scans, OCR'd", "Vendor certificates and pen-test reports", "Signed physical-security records"],
    controls: [{ id: "A.5.19", name: "Supplier relationships" }, { id: "A.7.1", name: "Physical perimeters" }, { id: "A.8.8", name: "Vulnerability management" }],
    cadence: "On upload",
  },
  {
    id: "api", name: "Your tools", mono: "API", hue: "from-brand to-cyan", status: "Build it",
    pulls: ["Anything via REST API (OpenAPI 3.0)", "Webhooks for key events", "Connector framework with retries"],
    controls: [{ id: "Any", name: "Map to any control" }],
    cadence: "You decide",
  },
];

const STATUS_STYLE = {
  "Built-in": "bg-emerald-50 text-emerald-700",
  Connector: "bg-blue-50 text-brand",
  "Build it": "bg-surface text-muted",
};

export default function Integrations() {
  const [sel, setSel] = useState(CONNECTORS[0].id);
  const c = CONNECTORS.find((x) => x.id === sel)!;

  return (
    <div className="card overflow-hidden lg:grid lg:grid-cols-[18rem_1fr]">
      {/* Connector rail */}
      <div className="border-b border-line bg-surface lg:border-b-0 lg:border-r">
        <p className="px-5 pt-5 text-xs font-semibold uppercase tracking-wider text-muted">Pick a connector</p>
        <div className="flex gap-2 overflow-x-auto px-5 py-4 lg:flex-col lg:overflow-visible">
          {CONNECTORS.map((x) => (
            <button
              key={x.id}
              onClick={() => setSel(x.id)}
              className={`flex shrink-0 items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition ${
                sel === x.id ? "border-brand bg-white shadow-sm" : "border-transparent hover:bg-white/70"
              }`}
            >
              <Mono c={x} small />
              <span className="font-medium text-navy">{x.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Flow */}
      <div key={c.id} className="ticker-row p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Mono c={c} />
            <div>
              <h3 className="text-xl font-bold text-navy">{c.name}</h3>
              <p className="text-xs text-muted">Read-only · {c.cadence}</p>
            </div>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[c.status]}`}>{c.status}</span>
        </div>

        <div className="mt-8 grid items-start gap-4 sm:grid-cols-[1fr_auto_auto_auto_1fr]">
          {/* Evidence pulled */}
          <div>
            <p className="num mb-2">EVIDENCE PULLED</p>
            <ul className="space-y-2">
              {c.pulls.map((p, i) => (
                <li key={p} className="flow-item rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink" style={{ animationDelay: `${i * 0.08}s` }}>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <FlowArrow />

          {/* Hub */}
          <div className="flex flex-col items-center justify-self-center sm:pt-6">
            <div className="relative">
              <div className="hub-ring absolute inset-0 rounded-full border-2 border-cyan/40" />
              <div className="hub-ring hub-ring-2 absolute inset-0 rounded-full border-2 border-brand/30" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_12px_30px_-10px_rgb(37_99_235/0.5)]">
                <Image src="/brand/ascendiq_icon_color.svg" alt="" width={56} height={56} />
              </div>
            </div>
            <p className="mt-3 text-xs font-semibold text-navy">AscendIQ</p>
            <p className="text-[11px] text-muted">normalise · validate · map</p>
          </div>

          <FlowArrow />

          {/* Controls */}
          <div>
            <p className="num mb-2">CONTROLS SATISFIED</p>
            <ul className="space-y-2">
              {c.controls.map((k, i) => (
                <li key={k.id} className="flow-item flex items-center gap-3 rounded-lg border border-line px-3 py-2 text-sm" style={{ animationDelay: `${0.35 + i * 0.08}s` }}>
                  <span className="font-mono text-[11px] text-cyan">{k.id}</span>
                  <span className="text-navy">{k.name}</span>
                  <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Mono({ c, small }: { c: Connector; small?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br font-mono font-bold text-white ${c.hue} ${
        small ? "h-8 w-8 text-[10px]" : "h-11 w-11 text-xs"
      }`}
    >
      {c.mono}
    </span>
  );
}

function FlowArrow() {
  return (
    <svg width="64" height="40" viewBox="0 0 64 40" fill="none" aria-hidden className="hidden justify-self-center text-cyan sm:block sm:mt-12">
      <path d="M2 20 H58" stroke="currentColor" strokeWidth="2" className="flow-line" />
      <path d="M52 13 L60 20 L52 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
