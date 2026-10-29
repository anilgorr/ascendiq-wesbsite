import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Tabs from "@/components/Tabs";
import Integrations from "@/components/Integrations";
import Monitoring from "@/components/Monitoring";
import Phases from "@/components/Phases";
import { Reveal, Counter, FlipCard } from "@/components/Motion";
import { Section, Check } from "@/components/Section";
import {
  AUDIENCE,
  COMPARISON,
  COST,
  DELIVERABLES,
  FAQ,
  STATS,
} from "@/content/site";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />

        {/* 01 Overview */}
        <Section
          id="overview"
          n="01"
          eyebrow="Overview"
          title="Compliance work that nobody should still be doing by hand"
          lead="Most ISO 27001 programmes stall on the same two things: writing policies from scratch and chasing screenshots for evidence. AscendIQ does both, then keeps the controls honest after the certificate arrives."
        >
          <Reveal stagger className="grid gap-6 lg:grid-cols-3">
            {STATS.map((s, i) => (
              <div key={s.label} className="card lift p-7">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <div className="mt-3 text-4xl font-bold tracking-tight text-navy">
                  {i === 0 ? <>4–<Counter to={8} /></> : i === 1 ? <Counter to={80} suffix="%+" /> : <Counter to={93} />}{" "}
                  <span className="text-xl font-semibold text-muted">{s.unit}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-8 grid gap-6 brand-grad rounded-2xl p-8 text-white lg:grid-cols-[1.2fr_1fr] lg:p-10">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Every control, one system</h3>
              <ul className="mt-5 grid gap-3 text-sm text-white/90 sm:grid-cols-2">
                {[
                  "Policies drafted from your industry, size and stack",
                  "Evidence pulled from AWS, GitHub, Jira and HRMS",
                  "Automatic mapping to all 93 Annex A controls",
                  "Live posture, drift alerts and remediation tracking",
                ].map((b) => (
                  <li key={b} className="flex gap-3 [&_svg]:text-white"><Check /> {b}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center card p-6">
              <p className="text-sm text-muted">Built for</p>
              <p className="mt-1 text-lg font-semibold text-navy">Compliance officers, security managers, IT admins, auditors and risk teams</p>
              <a href="#next-step" className="btn btn-primary mt-5 w-fit">Book a readiness call</a>
            </div>
          </Reveal>
        </Section>

        {/* 02 How it works */}
        <Section id="how-it-works" n="02" eyebrow="How it works" title="Three phases, six to eight weeks" tone="surface">
          <Reveal><Phases /></Reveal>
        </Section>

        {/* 03 Policy generation spotlight */}
        <Section
          id="policy-generation"
          n="03"
          eyebrow="Policy generation"
          title="A full policy set on day one, written for your organisation"
          lead="Not a template pack with blanks to fill. The model takes your context and drafts each policy, then checks it against the standard before you see it."
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal as="ul" stagger className="space-y-5">
              {[
                ["Context in, policies out", "Industry, headcount, cloud provider, code hosting, ticketing. That is all the model needs to draft 93 policies that read like yours."],
                ["Validated, not just generated", "Each draft is checked against ISO 27001 requirements and scored. Low-confidence sections are highlighted for human attention first."],
                ["Your approval workflow", "Version control, digital-signature approvals, distribution and acknowledgment tracking, scheduled reviews. The LLM drafts; your people sign."],
              ].map(([t, b]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-1 h-6 w-6 shrink-0 rounded-md bg-gradient-to-br from-brand to-cyan" />
                  <div>
                    <h3 className="font-semibold text-navy">{t}</h3>
                    <p className="mt-1 text-sm text-muted">{b}</p>
                  </div>
                </li>
              ))}
            </Reveal>
            <Reveal className="card overflow-hidden">
              <div className="border-b border-line bg-surface px-5 py-3 text-xs text-muted">Generation run · 93 controls · 4 min 12 s</div>
              <div className="divide-y divide-line">
                {[
                  ["A.5.1", "Policies for information security", "0.96"],
                  ["A.5.15", "Access control", "0.94"],
                  ["A.6.3", "Information security awareness", "0.91"],
                  ["A.8.9", "Configuration management", "0.89"],
                  ["A.8.24", "Use of cryptography", "0.78"],
                ].map(([id, name, score]) => (
                  <div key={id} className="flex items-center gap-4 px-5 py-3 text-sm">
                    <span className="w-14 font-mono text-[11px] text-cyan">{id}</span>
                    <span className="flex-1">{name}</span>
                    <span className={`rounded px-2 py-0.5 font-mono text-[11px] ${Number(score) < 0.85 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                      {score}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-surface px-5 py-3 text-xs text-muted">1 policy flagged for review · 92 ready for approval</div>
            </Reveal>
          </div>
        </Section>

        {/* 04 Capabilities tabs */}
        <Section id="capabilities" n="04" eyebrow="What AscendIQ does" title="Five jobs, one platform" tone="surface">
          <Reveal><Tabs /></Reveal>
        </Section>

        {/* 05 Integrations */}
        <Section
          id="integrations"
          n="05"
          eyebrow="Integrations"
          title="Connect once, with read-only credentials"
          lead="No agents to install. AscendIQ reads from the tools you already run and pulls the evidence auditors ask for."
        >
          <Reveal><Integrations /></Reveal>
          <Reveal stagger className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["Read-only, always", "Scoped credentials. AscendIQ never writes to your systems."],
              ["Retries and health", "Failed pulls retry automatically and surface on the dashboard."],
              ["REST API + webhooks", "OpenAPI 3.0 docs, versioning and rate limits for your own connectors."],
            ].map(([t, b]) => (
              <div key={t} className="flex gap-3 rounded-xl border border-line bg-surface p-4">
                <Check />
                <div>
                  <p className="text-sm font-semibold text-navy">{t}</p>
                  <p className="mt-0.5 text-xs text-muted">{b}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </Section>

        {/* 06 Monitoring */}
        <Section id="monitoring" n="06" eyebrow="Monitoring" title="Certification is day one. Monitoring is every day after." lead="Watch a real drift incident play out: a bucket goes public at 09:14, the owner is alerted, a fix is suggested, and the control is green again by 09:32." tone="navy">
          <Reveal><Monitoring /></Reveal>
        </Section>

        {/* 07 Cost & timeline */}
        <Section id="cost" n="07" eyebrow="Cost & timeline" title="Per organisation. Fixed scope. Weeks, not quarters.">
          <Reveal stagger className="grid gap-6 lg:grid-cols-3">
            {COST.map((c) => (
              <div key={c.value} className="card lift p-7">
                <div className="text-3xl font-bold tracking-tight text-navy">{c.value}</div>
                <p className="mt-3 text-sm text-muted">{c.label}</p>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-8 flex flex-col items-start gap-5 rounded-2xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-navy">Unlimited users, every plan</h3>
              <p className="mt-1 text-sm text-muted">Control owners, auditors, admins — invite everyone. Pricing scales with organisations, controls and integrations, never seats.</p>
            </div>
            <a href="#next-step" className="btn btn-primary">Get a fixed-scope quote</a>
          </Reveal>
        </Section>

        {/* 08 Comparison */}
        <Section id="comparison" n="08" eyebrow="Comparison" title="AscendIQ vs the way it is usually done" tone="surface">
          <Reveal className="card overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="bg-navy text-left text-white">
                  <th className="px-5 py-4 font-medium"> </th>
                  {COMPARISON.cols.map((c, i) => (
                    <th key={c} className={`px-5 py-4 font-semibold ${i === 2 ? "bg-brand" : ""}`}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {COMPARISON.rows.map((r) => (
                  <tr key={r.label}>
                    <th className="px-5 py-4 text-left font-semibold text-navy">{r.label}</th>
                    {r.cells.map((c, i) => (
                      <td key={i} className={`px-5 py-4 ${i === 2 ? "bg-blue-50/60 font-medium text-navy" : "text-muted"}`}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </Section>

        {/* 09 Deliverables + audience */}
        <Section id="deliverables" n="09" eyebrow="What you get" title="What is in the box">
          <p className="-mt-6 mb-6 text-sm text-muted">Hover, tap or tab to a card to turn it over.</p>
          <Reveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {DELIVERABLES.map((d, i) => (
              <FlipCard
                key={d.title}
                className="h-44 cursor-pointer outline-none"
                front={
                  <div className="card flex h-full flex-col justify-between p-5">
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-navy">{d.title}</h3>
                      <p className="mt-1 text-xs text-muted">{d.tags.length} included →</p>
                    </div>
                  </div>
                }
                back={
                  <div className="brand-grad flex h-full flex-col justify-center rounded-2xl p-5 text-white">
                    <h3 className="font-semibold">{d.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {d.tags.map((t) => (
                        <span key={t} className="rounded-md bg-white/20 px-2 py-1 text-[11px] font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                }
              />
            ))}
          </Reveal>
          <h3 className="mt-14 text-xl font-bold text-navy">Who it is for</h3>
          <Reveal stagger className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCE.map((a) => (
              <div key={a.title} className="lift rounded-xl border border-line border-l-4 border-l-brand bg-surface p-5">
                <h4 className="font-semibold text-navy">{a.title}</h4>
                <p className="mt-1.5 text-sm text-muted">{a.body}</p>
              </div>
            ))}
          </Reveal>
        </Section>

        {/* 10 FAQ */}
        <Section id="faq" n="10" eyebrow="FAQ" title="Questions compliance teams ask us" tone="surface">
          <Reveal className="card divide-y divide-line">
            {FAQ.map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-navy">
                  {f.q}
                  <span className="shrink-0 text-xl leading-none text-brand transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm text-muted">{f.a}</p>
              </details>
            ))}
          </Reveal>
        </Section>

        {/* Next step */}
        <section id="next-step" className="brand-grad relative overflow-hidden py-20 text-white">
          <div className="grid-bg absolute inset-0" aria-hidden />
          <div className="container-x relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <Reveal>
              <p className="eyebrow text-white/80">Next step</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Start with a 45-minute readiness call</h2>
              <p className="mt-4 max-w-xl text-white/85">
                We look at your stack, your statement of applicability and your audit date, and give you a written, fixed-scope quote. Reply within one business day.
              </p>
            </Reveal>
            <Reveal className="rise-1">
            <form
              action="mailto:hello@ascendiq.app"
              method="post"
              encType="text/plain"
              className="rounded-2xl border border-line bg-white p-6 text-ink shadow-[0_24px_60px_-20px_rgb(10_37_64/0.25)]"
            >
              <div className="grid gap-3">
                <input required name="name" placeholder="Your name" className="rounded-md border border-line px-3 py-2.5 text-sm outline-none focus:border-brand" />
                <input required type="email" name="email" placeholder="Work email" className="rounded-md border border-line px-3 py-2.5 text-sm outline-none focus:border-brand" />
                <input name="company" placeholder="Company" className="rounded-md border border-line px-3 py-2.5 text-sm outline-none focus:border-brand" />
                <select name="timeline" className="rounded-md border border-line px-3 py-2.5 text-sm text-muted outline-none focus:border-brand" defaultValue="">
                  <option value="" disabled>Target audit date</option>
                  <option>Within 3 months</option>
                  <option>3–6 months</option>
                  <option>6–12 months</option>
                  <option>Already certified — need monitoring</option>
                </select>
                <button type="submit" className="btn btn-primary justify-center">Book the call</button>
              </div>
              <p className="mt-3 text-center text-xs text-muted">No sales deck. We bring a readiness checklist.</p>
            </form>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
