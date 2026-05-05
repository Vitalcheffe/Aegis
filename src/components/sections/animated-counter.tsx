"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "./index";

export function AnimatedCounter({
  value,
  label,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.02em]">
        {prefix}{current.toLocaleString()}{suffix}
      </div>
      <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-2">
        {label}
      </div>
    </div>
  );
}

export function AnimatedStatsSection({
  label,
  stats,
}: {
  label?: string;
  stats: { value: number; label: string; suffix?: string; prefix?: string }[];
}) {
  return (
    <section className="py-20 md:py-32 bg-black border-y border-white/10">
      {label && (
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20 mb-16">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              {label}
            </span>
          </ScrollReveal>
        </div>
      )}
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        {stats.map((s, i) => (
          <ScrollReveal key={s.label} delay={i * 80}>
            <AnimatedCounter
              value={s.value}
              label={s.label}
              suffix={s.suffix}
              prefix={s.prefix}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
