export const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How it works" },
  { id: "policy-generation", label: "Policy generation" },
  { id: "capabilities", label: "Capabilities" },
  { id: "integrations", label: "Integrations" },
  { id: "monitoring", label: "Monitoring" },
  { id: "cost", label: "Cost & timeline" },
  { id: "comparison", label: "Comparison" },
  { id: "deliverables", label: "What you get" },
  { id: "faq", label: "FAQ" },
];

export const STATS = [
  { value: "4–8", unit: "weeks", label: "to audit-ready, down from 6–12 months" },
  { value: "80%+", unit: "", label: "of evidence collected and validated automatically" },
  { value: "93", unit: "controls", label: "ISO 27001:2022 Annex A, pre-mapped and templated" },
];

export const PHASES = [
  {
    n: "01",
    title: "Scope & connect",
    time: "Week 1",
    body:
      "Tell AscendIQ your industry, headcount and stack. Connect AWS, GitHub and Jira with read-only credentials. The control library is already loaded — you pick what applies.",
    bullets: ["Organisation context inputs", "Read-only integrations", "Control scoping"],
  },
  {
    n: "02",
    title: "Generate & collect",
    time: "Weeks 2–5",
    body:
      "The LLM drafts every policy against Annex A. Connectors pull IAM, CloudTrail, branch-protection and ticket evidence, normalise it, and map it to controls. You review, edit, approve.",
    bullets: ["Policy drafts with confidence scores", "Evidence auto-mapped to controls", "Approval workflow with e-signatures"],
  },
  {
    n: "03",
    title: "Audit & stay compliant",
    time: "Week 6 onwards",
    body:
      "Export the audit-ready evidence package. After certification, continuous monitoring flags drift the moment a control slips and suggests the fix.",
    bullets: ["Audit-ready evidence package", "Drift alerts with remediation steps", "Scheduled policy reviews"],
  },
];

export const CONNECTORS = [
  { name: "AWS", detail: "IAM · CloudTrail · Security Groups · S3", status: "Built-in" },
  { name: "GitHub / GitLab", detail: "Access controls · branch protection · code reviews", status: "Built-in" },
  { name: "Jira", detail: "Access requests · change management", status: "Built-in" },
  { name: "ServiceNow", detail: "ITSM tickets · change records", status: "Built-in" },
  { name: "Okta / Azure AD / Google", detail: "SSO · SAML 2.0 · OIDC · MFA", status: "Built-in" },
  { name: "HRMS", detail: "Onboarding · offboarding · training evidence", status: "Connector" },
  { name: "Manual upload", detail: "PDF, screenshots — OCR’d and mapped", status: "Built-in" },
  { name: "Your tools", detail: "REST API · webhooks · connector framework", status: "Build it" },
];

export const TABS = [
  {
    id: "policies",
    label: "Policy generation",
    heading: "Every Annex A policy, drafted for your organisation",
    body:
      "Feed in industry, size and technology stack. AscendIQ drafts ISO 27001-aligned policies for all 93 controls, validates them against the standard, and attaches a confidence score so your team knows what to scrutinise first.",
    points: [
      "Templates for every ISO 27001:2022 Annex A control",
      "Validation against the standard, not just grammar",
      "Full manual editing — the LLM drafts, you decide",
      "Version control, approval workflow, acknowledgment tracking",
    ],
  },
  {
    id: "evidence",
    label: "Evidence collection",
    heading: "Evidence that collects itself",
    body:
      "Connectors pull raw data from AWS, GitHub, Jira and your HRMS. The LLM normalises it into a standard schema, checks completeness, and flags anything missing or contradictory before an auditor does.",
    points: [
      "Automated pulls from cloud, code and ticketing tools",
      "LLM normalisation into standardised evidence schemas",
      "Missing and inconsistent evidence flagged automatically",
      "Full audit trail and lineage on every artefact",
    ],
  },
  {
    id: "mapping",
    label: "Control mapping",
    heading: "Evidence lands on the right control",
    body:
      "AscendIQ suggests the optimal evidence-to-control mapping, tracks coverage across all controls, and lets a human override any suggestion — with the rationale recorded.",
    points: [
      "LLM-suggested mappings with manual override",
      "Coverage validation across every control",
      "Custom controls and additional requirements",
      "Change history on every mapping decision",
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    heading: "Your compliance posture, live",
    body:
      "A single number for readiness, broken down by control status — implemented, pending, non-compliant — with drill-down to the underlying evidence and AI-generated recommendations on what to fix next.",
    points: [
      "Real-time compliance percentage",
      "Control status breakdown with drill-down",
      "AI insights and prioritised recommendations",
      "Trend analysis over time",
    ],
  },
  {
    id: "reports",
    label: "Reports & audit",
    heading: "Audit-ready in one export",
    body:
      "Generate readiness reports, gap analyses with remediation plans, executive summaries and the complete evidence package your auditor needs — in PDF, Excel or CSV.",
    points: [
      "Compliance readiness reports",
      "Audit-ready evidence packages",
      "Gap analysis with remediation plans",
      "Scheduled, templated, multi-format exports",
    ],
  },
];

export const MONITORING = [
  { n: "01", title: "Continuous drift detection", body: "Controls are re-checked on a schedule. A public S3 bucket or a disabled branch rule shows up within the hour, not at the next audit." },
  { n: "02", title: "Automated alerts", body: "Violations route to the control owner through email, Slack or webhook, with the evidence that triggered them attached." },
  { n: "03", title: "Remediation suggestions", body: "Every gap comes with a suggested fix, drawn from the control requirement and your own environment." },
  { n: "04", title: "Progress tracking", body: "Remediation is tracked to closure, and effectiveness is measured so repeat findings are visible." },
  { n: "05", title: "Custom rules & thresholds", body: "Tighten any control beyond the standard — your risk appetite, your thresholds." },
  { n: "06", title: "Integration health", body: "Connector failures retry automatically and surface on the dashboard, so a silent integration never becomes a gap." },
];

export const COST = [
  { value: "4–8 wks", label: "Typical time to audit-ready, including policy review and evidence collection." },
  { value: "Per org", label: "Priced per organisation, not per user. Invite every control owner and auditor at no extra cost." },
  { value: "Fixed scope", label: "A written quote after a free 45-minute readiness call. No surprises after kick-off." },
];

export const COMPARISON = {
  cols: ["Manual / spreadsheets", "Legacy GRC tools", "AscendIQ"],
  rows: [
    { label: "Time to audit-ready", cells: ["6–12 months", "4–6 months", "4–8 weeks"] },
    { label: "Policy drafting", cells: ["Consultant writes from templates", "Static template library", "LLM drafts for your context, validated against Annex A"] },
    { label: "Evidence collection", cells: ["Screenshots, by hand", "Partly automated, manual mapping", "80%+ automated, auto-mapped to controls"] },
    { label: "Between audits", cells: ["Nothing until next year", "Periodic checks", "Continuous drift detection with alerts"] },
    { label: "Pricing", cells: ["Consultant day rates", "Per user, per module", "Per organisation, unlimited users"] },
    { label: "Best for", cells: ["One-off certifications", "Large enterprises with GRC teams", "Teams who want certified fast and want to stay certified"] },
  ],
};

export const DELIVERABLES = [
  { title: "Policies", tags: ["93 Annex A policies", "Version history", "E-signature approvals"] },
  { title: "Evidence", tags: ["Auto-collected", "Normalised schema", "Audit trail"] },
  { title: "Dashboard", tags: ["Live posture %", "Control breakdown", "AI insights"] },
  { title: "Reports", tags: ["Readiness report", "Gap analysis", "Evidence package"] },
  { title: "Monitoring", tags: ["Drift alerts", "Remediation", "Health checks"] },
];

export const AUDIENCE = [
  { title: "Compliance officers", body: "Own the programme without owning a spreadsheet. One dashboard, one source of truth." },
  { title: "Security managers", body: "See which controls actually hold in production, not which ones are documented." },
  { title: "IT administrators", body: "Connect once with read-only credentials. No agents, no scripts to maintain." },
  { title: "External auditors", body: "Auditor role with read access to evidence, lineage and policy approvals." },
];

export const FAQ = [
  { q: "What exactly does AscendIQ automate?", a: "Three things: drafting ISO 27001 policies from your organisation’s context, collecting and mapping evidence from your cloud, code and ticketing tools, and monitoring controls continuously after certification. Human review stays in the loop at every approval point." },
  { q: "Which version of ISO 27001 is supported?", a: "ISO 27001:2022, with all 93 Annex A controls pre-configured. You can add custom controls or map to additional frameworks on request." },
  { q: "How accurate is LLM-generated policy content?", a: "Generated policies are validated against the standard and carry a confidence score. Our acceptance target is 90%+ accuracy on validation, and every policy is editable and goes through your approval workflow before it is published. We use multi-model validation and human review to manage hallucination risk." },
  { q: "What integrations are available?", a: "AWS (IAM, CloudTrail, Security Groups, S3), GitHub and GitLab, Jira and ServiceNow, HRMS systems, and SSO via Okta, Azure AD and Google Workspace. A REST API, webhooks and a connector framework cover anything else." },
  { q: "What about our own security?", a: "AES-256 encryption at rest, TLS 1.3 in transit, role-based access with MFA for admins, comprehensive audit logging, automated backups every six hours, OWASP Top 10 testing, and SOC 2 Type II on our roadmap. The platform implements ISO 27001 controls on itself." },
  { q: "Is it multi-tenant? Where is our data stored?", a: "Yes — each organisation’s data is isolated. Data residency per jurisdiction is supported for enterprise plans, and GDPR export and deletion requests are handled in-product." },
  { q: "How long does onboarding take?", a: "Guided onboarding is designed to complete in under 30 minutes. Most teams have their first connectors live and first policies drafted on day one." },
  { q: "Does it replace our consultant or auditor?", a: "No. It replaces the manual work your consultant bills for — drafting, chasing screenshots, building spreadsheets. Your external auditor gets a dedicated read-only role to review evidence directly." },
  { q: "Can we start with a subset of controls?", a: "Yes. Scope the controls that apply to your statement of applicability and expand later. Coverage is tracked per control, so nothing silently drops out." },
  { q: "What does it cost?", a: "Pricing is per organisation with unlimited users. We quote a fixed scope after a free readiness call so you know the number before you commit." },
  { q: "What happens after we are certified?", a: "Continuous monitoring takes over: drift detection, alerts to control owners, remediation tracking and scheduled policy reviews, so the next surveillance audit is a formality." },
];

export const CONTACT = {
  email: "hello@ascendiq.ai",
  demoHref: "#next-step",
};
