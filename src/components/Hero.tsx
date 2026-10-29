const SOURCES = [
  { label: "AWS IAM", sub: "users & policies" },
  { label: "CloudTrail", sub: "events.json" },
  { label: "GitHub", sub: "branch rules" },
  { label: "Jira", sub: "access requests" },
  { label: "HRMS", sub: "onboarding.csv" },
];

const CONTROLS = [
  { id: "A.5.15", label: "Access control", pct: 100 },
  { id: "A.8.9", label: "Config management", pct: 96 },
  { id: "A.8.15", label: "Logging", pct: 100 },
  { id: "A.8.32", label: "Change management", pct: 88 },
  { id: "A.6.1", label: "Screening", pct: 92 },
  { id: "A.5.1", label: "Policies for infosec", pct: 100 },
];

export default function Hero() {
  return (
    <section className="brand-grad relative overflow-hidden text-white">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-white/15 blur-3xl" aria-hidden />
      <div className="absolute -bottom-40 left-1/4 h-[24rem] w-[24rem] rounded-full bg-navy/30 blur-3xl" aria-hidden />

      <div className="container-x relative grid gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-24">
        <div>
          <p className="rise eyebrow text-white/80">ISO 27001 · Compliance automation · LLM-powered</p>
          <h1 className="rise rise-1 mt-4 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            ISO 27001 certified in weeks, <span className="text-navy">not months.</span>
          </h1>
          <p className="rise rise-2 mt-6 max-w-xl text-lg text-white/85">
            AscendIQ drafts your policies, pulls evidence straight from AWS, GitHub and Jira, maps it
            to all 93 Annex A controls, and keeps watching after the auditor leaves.
          </p>
          <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
            <a href="#next-step" className="btn btn-dark shadow-lg">Book a readiness call</a>
            <a href="#how-it-works" className="btn border border-white/40 text-white hover:bg-white/10">See how it works</a>
          </div>
          <div className="rise rise-3 mt-10 grid grid-cols-3 gap-6 border-t border-white/25 pt-8">
            {[
              ["4–8 wks", "to audit-ready"],
              ["80%+", "evidence automated"],
              ["93", "controls pre-mapped"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl font-bold tracking-tight sm:text-3xl">{v}</div>
                <div className="mt-1 text-xs text-white/75">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagram */}
        <div className="rise rise-2 relative">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_30px_70px_-20px_rgb(10_37_64/0.5)] text-navy">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_1.35fr] sm:items-center">
              <div className="space-y-2">
                <p className="num mb-3 text-muted">SOURCES</p>
                {SOURCES.map((s) => (
                  <div key={s.label} className="rounded-lg border border-line bg-surface px-3 py-2">
                    <div className="text-sm font-semibold text-navy">{s.label}</div>
                    <div className="font-mono text-[11px] text-muted">{s.sub}</div>
                  </div>
                ))}
              </div>

              <svg width="56" height="320" viewBox="0 0 56 320" fill="none" aria-hidden className="hidden self-center text-cyan sm:block">
                {[36, 98, 160, 222, 284].map((y) => (
                  <path key={y} d={`M2 ${y} C 28 ${y}, 28 160, 54 160`} stroke="currentColor" strokeWidth="1.5" className="flow-line" opacity="0.7" />
                ))}
                <circle cx="54" cy="160" r="4" fill="currentColor" />
              </svg>

              <div>
                <p className="num mb-3 text-muted">ANNEX A CONTROLS</p>
                <div className="space-y-2">
                  {CONTROLS.map((c) => (
                    <div key={c.id} className="rounded-lg border border-line bg-surface px-3 py-2">
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="font-mono text-[11px] text-cyan">{c.id}</span>
                        <span className="truncate font-medium text-navy">{c.label}</span>
                        <span className="text-[11px] text-muted">{c.pct}%</span>
                      </div>
                      <div className="mt-1.5 h-1 overflow-hidden rounded bg-line">
                        <div className="h-full rounded bg-gradient-to-r from-brand to-cyan" style={{ width: `${c.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs">
              <span className="text-muted">Compliance posture</span>
              <span className="font-mono text-brand">96.2% · 89 / 93 implemented</span>
            </div>
          </div>
          <div className="absolute -bottom-4 left-2 flex sm:-left-4 items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs text-navy shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Evidence validated · 11:42 IST
          </div>
        </div>
      </div>
    </section>
  );
}
