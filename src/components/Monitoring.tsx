"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    t: "09:14:02",
    title: "Continuous drift detection",
    body: "Controls are re-checked on a schedule. A public S3 bucket or a disabled branch rule shows up within the hour, not at the next audit.",
    log: "aws:s3 · bucket `customer-exports` public-read ENABLED",
    posture: 94.1,
    control: "non-compliant",
    alert: false,
    fix: false,
    health: "ok",
  },
  {
    t: "09:14:05",
    title: "Automated alerts",
    body: "Violations route to the control owner through email, Slack or webhook, with the evidence that triggered them attached.",
    log: "alert → priya@acme (owner, A.8.20) via Slack · evidence attached",
    posture: 94.1,
    control: "non-compliant",
    alert: true,
    fix: false,
    health: "ok",
  },
  {
    t: "09:14:06",
    title: "Remediation suggestions",
    body: "Every gap comes with a suggested fix, drawn from the control requirement and your own environment.",
    log: "suggest: enable S3 Block Public Access at account level",
    posture: 94.1,
    control: "non-compliant",
    alert: true,
    fix: true,
    health: "ok",
  },
  {
    t: "09:31:40",
    title: "Progress tracking",
    body: "Remediation is tracked to closure, and effectiveness is measured so repeat findings are visible.",
    log: "remediation applied by priya · re-check scheduled",
    posture: 94.1,
    control: "pending",
    alert: true,
    fix: true,
    health: "ok",
  },
  {
    t: "09:32:10",
    title: "Custom rules & thresholds",
    body: "Tighten any control beyond the standard — your risk appetite, your thresholds.",
    log: "rule `no-public-buckets` (custom, stricter than A.8.20) → PASS",
    posture: 96.2,
    control: "implemented",
    alert: false,
    fix: false,
    health: "ok",
  },
  {
    t: "09:32:11",
    title: "Integration health",
    body: "Connector failures retry automatically and surface on the dashboard, so a silent integration never becomes a gap.",
    log: "connectors 8/8 healthy · last pull 12s ago",
    posture: 96.2,
    control: "implemented",
    alert: false,
    fix: false,
    health: "ok",
  },
];

const STEP_MS = 2800;

export default function Monitoring() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % STEPS.length), STEP_MS);
    return () => clearInterval(id);
  }, [visible, paused]);

  const s = STEPS[i];

  return (
    <div ref={ref} className="card grid overflow-hidden lg:grid-cols-[1fr_1.1fr]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Timeline */}
      <div className="border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
      <ol className="relative">
        <span className="absolute left-3 top-4 bottom-4 w-px bg-line" aria-hidden />
        {STEPS.map((st, k) => {
          const active = k === i;
          const done = k < i;
          return (
            <li key={st.title} className="relative">
              <button onClick={() => setI(k)} className="flex w-full items-start gap-4 rounded-lg py-2.5 text-left transition hover:bg-surface/70">
                <span
                  className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[10px] transition ${
                    active ? "border-brand bg-brand text-white shadow-[0_0_0_6px_rgb(37_99_235/0.15)]" : done ? "border-brand bg-white text-brand" : "border-line bg-white text-muted"
                  }`}
                >
                  {done ? "✓" : k + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-semibold transition ${active ? "text-navy" : "text-ink/70"}`}>{st.title}</span>
                  <span
                    className={`block overflow-hidden text-sm text-muted transition-all duration-500 ${active ? "mt-1 max-h-24 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {st.body}
                  </span>
                </span>
              </button>
              {active && !paused && (
                <span className="absolute bottom-0 left-10 right-0 h-0.5 overflow-hidden rounded bg-line" aria-hidden>
                  <span key={i} className="step-progress block h-full bg-brand" style={{ animationDuration: `${STEP_MS}ms` }} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
        <p className="mt-4 text-[11px] text-muted">{paused ? "Paused — move the mouse away to resume" : <><span className="sm:hidden">Auto-playing · tap a step to jump</span><span className="hidden sm:inline">Auto-playing · hover to pause, click a step to jump</span></>}</p>
      </div>

      {/* Live console */}
      <div className="bg-navy p-6 text-white sm:p-8">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span className="flex items-center gap-2">
            <span className="relative h-2 w-2 rounded-full bg-emerald-400 pulse-dot" /> Live monitoring
          </span>
          <span className="font-mono">{s.t} IST</span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Tile label="Posture">
            <span className={`text-3xl font-bold tabular-nums transition-colors ${s.posture < 95 ? "text-amber-300" : "text-white"}`}>{s.posture.toFixed(1)}%</span>
          </Tile>
          <Tile label="A.8.20 Network security">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <span className={`h-2.5 w-2.5 rounded-full ${s.control === "implemented" ? "bg-emerald-400" : s.control === "pending" ? "bg-amber-400" : "bg-rose-500"}`} />
              {s.control === "implemented" ? "Implemented" : s.control === "pending" ? "Re-checking" : "Non-compliant"}
            </span>
          </Tile>
          <Tile label="Connectors">
            <span className="text-sm font-semibold">8 / 8 healthy</span>
          </Tile>
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="num mb-2 text-white/50">EVENT LOG</p>
          <ul className="space-y-1.5 font-mono text-[12px]">
            {STEPS.slice(0, i + 1).map((st, k) => (
              <li key={st.t + k} className={`ticker-row flex gap-3 ${k === i ? "text-white" : "text-white/45"}`}>
                <span className="shrink-0 text-cyan/80">{st.t}</span>
                <span>{st.log}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Card show={s.alert} tone="amber" title="Alert · Slack #security">
            <b>A.8.20</b> drifted — bucket <code className="rounded bg-black/20 px-1">customer-exports</code> is public. Owner: Priya. Evidence attached.
          </Card>
          <Card show={s.fix} tone="cyan" title="Suggested remediation">
            Enable <b>S3 Block Public Access</b> at the account level. 1 bucket affected. Est. 2 min.
          </Card>
        </div>
      </div>
    </div>
  );
}

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-[11px] text-white/50">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Card({ show, tone, title, children }: { show: boolean; tone: "amber" | "cyan"; title: string; children: React.ReactNode }) {
  const t = tone === "amber" ? "border-amber-400/40 bg-amber-400/10" : "border-cyan/40 bg-cyan/10";
  return (
    <div
      className={`rounded-xl border p-4 text-xs transition-all duration-500 ${t} ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
      aria-hidden={!show}
    >
      <p className={`mb-1 font-semibold ${tone === "amber" ? "text-amber-300" : "text-cyan"}`}>{title}</p>
      <p className="text-white/80">{children}</p>
    </div>
  );
}
