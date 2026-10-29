import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white/70">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image src="/brand/ascendiq_logo_white.svg" alt="AscendIQ" width={150} height={40} />
          <p className="mt-4 max-w-sm text-sm">
            ISO 27001 compliance automation: LLM-drafted policies, self-collecting evidence and continuous
            monitoring for organisations that want to get certified fast and stay certified.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Product</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {[["#overview", "Overview"], ["#capabilities", "Capabilities"], ["#integrations", "Integrations"], ["#cost", "Pricing"], ["#faq", "FAQ"]].map(([h, l]) => (
              <li key={h}><a href={h} className="hover:text-white">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="mailto:hello@ascendiq.app" className="hover:text-white">hello@ascendiq.app</a></li>
            <li><a href="#next-step" className="hover:text-white">Book a readiness call</a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 AscendIQ. All rights reserved.</span>
          <span>ISO 27001:2022 · GDPR-ready · SOC 2 Type II (in progress)</span>
        </div>
      </div>
    </footer>
  );
}
