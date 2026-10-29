"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Adds `.in` to the element when it scrolls into view (once). */
export function Reveal({
  children,
  className = "",
  stagger = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  as?: "div" | "ul" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`${stagger ? "reveal-stagger" : "reveal"} ${className}`}>
      {children}
    </Tag>
  );
}

/** Counts from 0 to `to` when visible. Keeps prefix/suffix text static. */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1400,
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (reduced) {
        setV(to);
        return;
      }
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setV(to * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const EVENTS = [
  ["aws:iam", "MFA enforced for 412 / 412 users", "ok"],
  ["github:main", "branch protection verified · 2 reviewers", "ok"],
  ["jira:ACC-1187", "access request closed by owner", "ok"],
  ["aws:s3", "0 public buckets", "ok"],
  ["hrms", "2 leavers still active in Jira", "warn"],
  ["cloudtrail", "root login · none in 30 days", "ok"],
  ["policy:A.8.24", "cryptography policy approved · v2", "ok"],
];

/** Live-cycling evidence feed for the hero. */
export function Ticker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % EVENTS.length), 2600);
    return () => clearInterval(id);
  }, []);
  const [src, msg, state] = EVENTS[i];
  return (
    <div key={i} className="ticker-row flex items-center gap-2 text-xs">
      <span className={`relative h-2 w-2 shrink-0 rounded-full pulse-dot ${state === "ok" ? "bg-emerald-400" : "bg-amber-400"}`} />
      <span className="font-mono text-[11px] text-brand">{src}</span>
      <span className="truncate text-navy">{msg}</span>
    </div>
  );
}

/** Flip card: front/back faces; flips on hover, focus, or tap. */
export function FlipCard({ front, back, className = "" }: { front: ReactNode; back: ReactNode; className?: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`flip ${flipped ? "flipped" : ""} ${className}`}
      tabIndex={0}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
      role="button"
      aria-pressed={flipped}
    >
      <div className="flip-inner h-full">
        <div className="flip-face h-full">{front}</div>
        <div className="flip-face flip-back h-full">{back}</div>
      </div>
    </div>
  );
}
