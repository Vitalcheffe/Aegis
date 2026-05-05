"use client";

import Image from "next/image";
import Link from "next/link";
import { Radar, GitCompare, ShieldAlert, MapPin, ArrowRight } from "lucide-react";
import { SectionHero, Callout, CTASection, ScrollReveal } from "@/components/sections";

const tools = [
  {
    title: "Range Calculator",
    description:
      "Compute maximum detection, tracking, classification, and neutralization ranges using the radar equation. Configure radar type, target RCS, frequency band, and environmental conditions.",
    href: "/tools/range-calculator",
    icon: Radar,
    available: true,
    tag: "LIVE",
  },
  {
    title: "Product Comparison",
    description:
      "Compare Aegis platforms side-by-side across detection range, response time, effectors, and deployment footprint. Find the right system for your mission.",
    href: "/products/compare",
    icon: GitCompare,
    available: true,
    tag: "LIVE",
  },
  {
    title: "Threat Identifier",
    description:
      "Identify and classify drone threats by behavioral signatures, RF emissions, and flight patterns. Access our continuously updated threat library.",
    href: "#",
    icon: ShieldAlert,
    available: false,
    tag: "COMING SOON",
  },
  {
    title: "Deployment Planner",
    description:
      "Plan optimal sensor placement and coverage zones for your operational environment. Visualize detection envelopes and blind spots before deployment.",
    href: "#",
    icon: MapPin,
    available: false,
    tag: "COMING SOON",
  },
];

export default function ToolsPage() {
  return (
    <>
      <SectionHero
        image="/images/pages/radar-scope.jpg"
        label="Interactive Tools"
        title="Mission-Critical Calculators"
        subtitle="Engineering-grade tools for defense planners. No guesswork — just physics, validated models, and real-time computation."
        cta="Try Range Calculator"
        ctaHref="/tools/range-calculator"
      />

      <section className="py-28 md:py-44 bg-black">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <div className="mb-16 md:mb-24">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                Toolkit
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
                Interactive Defense Tools
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-0">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              const content = (
                <div className="py-10 md:py-16 flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12 px-2 md:px-4 -mx-2 md:-mx-4 group-hover:bg-white/[0.02] transition-colors">
                  <div className="md:flex-1 flex items-start gap-6">
                    <div
                      className={`mt-1 shrink-0 ${
                        tool.available ? "text-white" : "text-[#767676]"
                      }`}
                    >
                      <Icon className="size-7" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <h3
                          className={`text-[clamp(1.8rem,4vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1] ${
                            tool.available
                              ? "text-white group-hover:text-white/90 transition-colors"
                              : "text-[#767676]"
                          }`}
                        >
                          {tool.title}
                        </h3>
                        <span
                          className={`inline-block text-[9px] uppercase tracking-[0.15em] px-3 py-1 ${
                            tool.available
                              ? "text-white/60 border border-white/20"
                              : "text-[#767676] border border-[#333]"
                          }`}
                        >
                          {tool.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="md:flex-1 md:pt-4">
                    <p
                      className={`text-base md:text-lg leading-relaxed ${
                        tool.available ? "text-[#b9b9b9]" : "text-[#767676]"
                      }`}
                    >
                      {tool.description}
                    </p>
                    {tool.available && (
                      <span className="inline-block mt-6 text-[10px] uppercase tracking-[0.15em] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
                        Launch Tool →
                      </span>
                    )}
                  </div>
                </div>
              );

              return (
                <ScrollReveal key={tool.title} delay={i * 60}>
                  {tool.available && tool.href !== "#" ? (
                    <Link
                      href={tool.href}
                      className="block border-t border-white/10 group"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="border-t border-white/10 cursor-not-allowed">
                      {content}
                    </div>
                  )}
                </ScrollReveal>
              );
            })}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      <Callout>
        Built on validated radar propagation models. No approximations. No
        marketing ranges.
      </Callout>

      <CTASection
        title="Ready for Live Assessment?"
        subtitle="Use our tools to model your operational scenario, then request a live demonstration with your actual threat profiles."
        primaryCta="Request a Demo"
        primaryHref="/request-demo"
        secondaryCta="Explore Technology"
        secondaryHref="/technology"
      />
    </>
  );
}
