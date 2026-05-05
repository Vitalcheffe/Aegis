"use client";

export { KillChainDiagram } from "./kill-chain-diagram";
export { FAQSection } from "./faq-section";
export { AnimatedCounter, AnimatedStatsSection } from "./animated-counter";
export { BlogCard, CaseStudyCard, ResourceCard } from "./blog-card";

import { useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

/* ════════════════════════════════════════════════════════════════
   SCROLL REVEAL — Fades in + slides up on viewport entry
   ════════════════════════════════════════════════════════════════ */
export function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("revealed"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   ANIMATED LINE — Horizontal divider that slides in from left
   ════════════════════════════════════════════════════════════════ */
export function AnimatedLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`scroll-reveal-line h-px bg-white/20 w-full ${className}`} />
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION HERO — Full-screen cinematic hero with gradient overlay
   ════════════════════════════════════════════════════════════════ */
export function SectionHero({
  image,
  label,
  title,
  subtitle,
  cta,
  ctaHref = "/request-demo",
  gradient = "from-black via-black/70 to-black/40",
  align = "center",
}: {
  image: string;
  label?: string;
  title: string;
  subtitle?: string;
  cta?: string;
  ctaHref?: string;
  gradient?: string;
  align?: "center" | "left";
}) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${gradient}`} />
      <div
        className={`relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-32 w-full ${
          align === "center"
            ? "text-center flex flex-col items-center"
            : "text-left"
        }`}
      >
        {label && (
          <ScrollReveal>
            <span className="inline-block text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/50 mb-6 border border-white/10 px-4 py-1.5">
              {label}
            </span>
          </ScrollReveal>
        )}
        <ScrollReveal delay={100}>
          <h1
            className={`text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white ${
              align === "center" ? "max-w-5xl" : "max-w-4xl"
            }`}
          >
            {title}
          </h1>
        </ScrollReveal>
        {subtitle && (
          <ScrollReveal delay={200}>
            <p
              className={`mt-8 text-[#b9b9b9] text-lg md:text-xl lg:text-2xl leading-relaxed ${
                align === "center" ? "max-w-2xl" : "max-w-xl"
              }`}
            >
              {subtitle}
            </p>
          </ScrollReveal>
        )}
        {cta && (
          <ScrollReveal delay={300}>
            <Link
              href={ctaHref}
              className="inline-block mt-10 bg-white text-black px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#e0e0e0] transition-all duration-300"
            >
              {cta}
            </Link>
          </ScrollReveal>
        )}
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-[10px] uppercase tracking-[0.3em] animate-bounce">
        Scroll ↓
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   CALLOUT — Massive centered statement text
   ════════════════════════════════════════════════════════════════ */
export function Callout({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-28 md:py-44 bg-black ${className}`}>
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <ScrollReveal>
          <p className="text-[clamp(1.5rem,5vw,4.5rem)] font-bold tracking-[-0.04em] leading-[1.1] text-white">
            {children}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SPLIT SECTION — Image one side, text other side (alternating)
   ════════════════════════════════════════════════════════════════ */
export function SplitSection({
  image,
  label,
  title,
  description,
  reverse = false,
  cta,
  ctaHref,
  stats,
}: {
  image: string;
  label?: string;
  title: string;
  description: string;
  reverse?: boolean;
  cta?: string;
  ctaHref?: string;
  stats?: { value: string; label: string }[];
}) {
  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      <div
        className={`relative w-full md:w-1/2 min-h-[50vh] md:min-h-screen ${
          reverse ? "md:order-2" : ""
        }`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/60 to-transparent`}
        />
      </div>
      <div
        className={`w-full md:w-1/2 flex items-center bg-black ${
          reverse ? "md:order-1" : ""
        }`}
      >
        <div className="px-6 md:px-12 lg:px-20 py-20 md:py-0 max-w-xl">
          <ScrollReveal>
            {label && (
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 block">
                {label}
              </span>
            )}
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[1] text-white">
              {title}
            </h2>
            <p className="mt-8 text-[#b9b9b9] text-base md:text-lg leading-relaxed">
              {description}
            </p>
            {cta && ctaHref && (
              <Link
                href={ctaHref}
                className="inline-block mt-8 text-[11px] uppercase tracking-[0.15em] text-white border-b border-white/30 pb-1 hover:border-white transition-colors"
              >
                {cta} →
              </Link>
            )}
            {stats && stats.length > 0 && (
              <div className="mt-12 grid grid-cols-2 gap-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
                      {s.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   STATS SECTION — Row of large stat numbers
   ════════════════════════════════════════════════════════════════ */
export function StatsSection({
  stats,
  label,
}: {
  stats: { value: string; label: string }[];
  label?: string;
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
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-12">
        {stats.map((s, i) => (
          <ScrollReveal key={s.label} delay={i * 80}>
            <div className="text-center">
              <div className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.02em]">
                {s.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-2">
                {s.label}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   FEATURE LIST — Border-separated list of features (Palantir style)
   ════════════════════════════════════════════════════════════════ */
export function FeatureList({
  label,
  title,
  items,
}: {
  label?: string;
  title: string;
  items: {
    title: string;
    description: string;
    href?: string;
    tag?: string;
  }[];
}) {
  return (
    <section className="py-28 md:py-44 bg-black">
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            {label && (
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                {label}
              </span>
            )}
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              {title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-0">
          {items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 60}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="block border-t border-white/10 group"
                >
                  <div className="py-10 md:py-16 flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12 hover:bg-white/[0.02] transition-colors px-2 md:px-4 -mx-2 md:-mx-4">
                    <div className="md:flex-1">
                      <h3 className="text-[clamp(1.8rem,4vw,4rem)] font-bold tracking-[-0.03em] text-white group-hover:text-white/90 transition-colors leading-[1]">
                        {item.title}
                      </h3>
                    </div>
                    <div className="md:flex-1 md:pt-4">
                      {item.tag && (
                        <span className="inline-block text-[9px] uppercase tracking-[0.15em] text-white/50 border border-white/10 px-3 py-1 mb-4">
                          {item.tag}
                        </span>
                      )}
                      <p className="text-[#b9b9b9] text-base md:text-lg leading-relaxed">
                        {item.description}
                      </p>
                      <span className="inline-block mt-6 text-[10px] uppercase tracking-[0.15em] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="border-t border-white/10">
                  <div className="py-10 md:py-16 flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12 px-2 md:px-4 -mx-2 md:-mx-4">
                    <div className="md:flex-1">
                      <h3 className="text-[clamp(1.8rem,4vw,4rem)] font-bold tracking-[-0.03em] text-white leading-[1]">
                        {item.title}
                      </h3>
                    </div>
                    <div className="md:flex-1 md:pt-4">
                      {item.tag && (
                        <span className="inline-block text-[9px] uppercase tracking-[0.15em] text-white/50 border border-white/10 px-3 py-1 mb-4">
                          {item.tag}
                        </span>
                      )}
                      <p className="text-[#b9b9b9] text-base md:text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </ScrollReveal>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   IMAGE BREAK — Full-bleed image between sections
   ════════════════════════════════════════════════════════════════ */
export function ImageBreak({
  image,
  height = "70vh",
  overlay = "bg-black/40",
}: {
  image: string;
  height?: string;
  overlay?: string;
}) {
  return (
    <section className="relative overflow-hidden" style={{ height }}>
      <Image
        src={image}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className={`absolute inset-0 ${overlay}`} />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   SPEC TABLE — Technical specifications grid
   ════════════════════════════════════════════════════════════════ */
export function SpecTable({
  label,
  title,
  specs,
}: {
  label?: string;
  title?: string;
  specs: { label: string; value: string }[];
}) {
  return (
    <section className="py-20 md:py-32 bg-black border-t border-white/10">
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
        {(label || title) && (
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              {label && (
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                  {label}
                </span>
              )}
              {title && (
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white">
                  {title}
                </h2>
              )}
            </div>
          </ScrollReveal>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {specs.map((spec, i) => (
            <ScrollReveal key={spec.label} delay={i * 40}>
              <div className="flex justify-between items-baseline border-b border-white/10 py-5">
                <span className="text-[#767676] text-sm">{spec.label}</span>
                <span className="text-white font-medium text-sm md:text-base">
                  {spec.value}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   CTA SECTION — Call to action with dual links
   ════════════════════════════════════════════════════════════════ */
export function CTASection({
  title,
  subtitle,
  primaryCta,
  primaryHref = "/request-demo",
  secondaryCta,
  secondaryHref = "/technology",
}: {
  title: string;
  subtitle?: string;
  primaryCta: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="py-28 md:py-44 bg-black">
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <ScrollReveal>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-6 text-[#767676] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryHref}
              className="bg-white text-black px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#e0e0e0] transition-all duration-300"
            >
              {primaryCta}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryHref}
                className="border border-white/30 text-white px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300"
              >
                {secondaryCta}
              </Link>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   QUOTE SECTION — Testimonial or blockquote
   ════════════════════════════════════════════════════════════════ */
export function QuoteSection({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <section className="py-28 md:py-44 bg-[#0a0a0a]">
      <div className="max-w-[56rem] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <ScrollReveal>
          <div className="text-white/10 text-[8rem] leading-none font-serif select-none mb-[-3rem]">
            &ldquo;
          </div>
          <blockquote className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium leading-relaxed text-white">
            {quote}
          </blockquote>
          <div className="mt-8">
            <div className="text-white text-sm font-medium">{author}</div>
            <div className="text-[#767676] text-[10px] uppercase tracking-[0.15em] mt-1">
              {role}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   TIMELINE — History / milestones
   ════════════════════════════════════════════════════════════════ */
export function Timeline({
  label,
  title,
  events,
}: {
  label?: string;
  title: string;
  events: { year: string; title: string; description: string }[];
}) {
  return (
    <section className="py-28 md:py-44 bg-black">
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            {label && (
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                {label}
              </span>
            )}
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              {title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-0">
          {events.map((event, i) => (
            <ScrollReveal key={event.year + event.title} delay={i * 60}>
              <div className="border-t border-white/10 py-10 md:py-12 grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] gap-6 md:gap-12 items-start">
                <div className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-white/30 tracking-[-0.02em]">
                  {event.year}
                </div>
                <div>
                  <h3 className="text-[clamp(1.2rem,2vw,1.5rem)] font-bold text-white mb-3">
                    {event.title}
                  </h3>
                  <p className="text-[#b9b9b9] text-base leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   TEAM GRID — Leadership / people cards
   ════════════════════════════════════════════════════════════════ */
export function TeamGrid({
  label,
  title,
  members,
}: {
  label?: string;
  title: string;
  members: {
    name: string;
    role: string;
    bio: string;
    image?: string;
  }[];
}) {
  return (
    <section className="py-28 md:py-44 bg-black">
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            {label && (
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                {label}
              </span>
            )}
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              {title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {members.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 80}>
              <div className="group">
                {member.image && (
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-[#111]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <div className="text-[10px] uppercase tracking-[0.15em] text-white/50 mt-1 mb-4">
                  {member.role}
                </div>
                <p className="text-[#767676] text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   CARD GRID — Generic card layout
   ════════════════════════════════════════════════════════════════ */
export function CardGrid({
  label,
  title,
  cards,
}: {
  label?: string;
  title: string;
  cards: {
    title: string;
    description: string;
    image?: string;
    href?: string;
    tag?: string;
  }[];
}) {
  return (
    <section className="py-28 md:py-44 bg-black">
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            {label && (
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                {label}
              </span>
            )}
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              {title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const inner = (
              <>
                {card.image && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6 md:p-8">
                  {card.tag && (
                    <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1 mb-4 inline-block">
                      {card.tag}
                    </span>
                  )}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#767676] text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </>
            );

            return (
              <ScrollReveal key={card.title} delay={i * 80}>
                {card.href ? (
                  <Link
                    href={card.href}
                    className="group border border-white/10 hover:border-white/20 transition-colors bg-[#0a0a0a]"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="border border-white/10 bg-[#0a0a0a]">
                    {inner}
                  </div>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   PRODUCT HERO — Full-screen product hero with specs strip
   ════════════════════════════════════════════════════════════════ */
export function ProductHero({
  image,
  label,
  title,
  subtitle,
  specs,
}: {
  image: string;
  label: string;
  title: string;
  subtitle: string;
  specs: { value: string; label: string }[];
}) {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 pb-20 md:pb-28 w-full">
        <ScrollReveal>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/50 mb-6 block">
            {label}
          </span>
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-bold tracking-[-0.04em] leading-[0.9] text-white max-w-4xl">
            {title}
          </h1>
          <p className="mt-6 text-[#b9b9b9] text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
            {specs.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   TEXT SECTION — Simple text section with label + heading + body
   ════════════════════════════════════════════════════════════════ */
export function TextSection({
  label,
  title,
  children,
  className = "",
}: {
  label?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-28 md:py-44 bg-black ${className}`}>
      <div className="max-w-[56rem] mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          {label && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              {label}
            </span>
          )}
          {title && (
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white mb-8">
              {title}
            </h2>
          )}
          <div className="text-[#b9b9b9] text-base md:text-lg leading-relaxed space-y-6">
            {children}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
