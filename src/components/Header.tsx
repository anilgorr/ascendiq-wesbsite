"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SECTIONS } from "@/content/site";

const NAV = [
  { href: "#overview", label: "Product" },
  { href: "#integrations", label: "Integrations" },
  { href: "#cost", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy text-xs text-white/80">
        <div className="container-x flex h-8 items-center justify-between">
          <span className="hidden sm:inline">ISO 27001:2022 · 93 Annex A controls · Multi-tenant SaaS</span>
          <a href="mailto:hello@ascendiq.ai" className="hover:text-white">hello@ascendiq.ai</a>
        </div>
      </div>
      <div className="border-b border-line bg-white/90 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" aria-label="AscendIQ home" className="flex items-center">
            <Image src="/brand/ascendiq_logo_color.svg" alt="AscendIQ" width={150} height={40} priority />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-ink md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-brand">{n.label}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href="#next-step" className="btn btn-ghost">Talk to us</a>
            <a href="#next-step" className="btn btn-primary">Book a demo</a>
          </div>
          <button
            className="md:hidden rounded-md border border-line p-2"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 5h14M3 10h14M3 15h14" />}
            </svg>
          </button>
        </div>
        {open && (
          <div className="border-t border-line bg-white md:hidden">
            <div className="container-x flex flex-col gap-3 py-4 text-sm font-medium">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
              ))}
              <a href="#next-step" onClick={() => setOpen(false)} className="btn btn-primary mt-2 justify-center">Book a demo</a>
            </div>
          </div>
        )}
      </div>
      {/* In-page section nav, Logic Motive style */}
      <div className="hidden border-b border-line bg-white/95 backdrop-blur lg:block">
        <div className="container-x flex h-11 items-center gap-1 overflow-x-auto text-[13px]">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 transition ${
                active === s.id ? "bg-navy text-white" : "text-muted hover:text-navy"
              }`}
            >
              <span className={`num ${active === s.id ? "text-cyan" : "text-cyan/70"}`}>{String(i + 1).padStart(2, "0")}</span>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
