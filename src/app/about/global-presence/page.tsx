"use client";

import {
  SectionHero,
  ScrollReveal,
  AnimatedLine,
  StatsSection,
  CTASection,
} from "@/components/sections";
import { DeploymentMap } from "@/components/sections/deployment-map";
import { motion } from "framer-motion";
import { Building2, Globe, Headphones, Clock } from "lucide-react";

// ──────────────────────────────────────────────
// Regional office data
// ──────────────────────────────────────────────
const regionalOffices = [
  {
    city: "Arlington, Virginia",
    region: "Americas HQ",
    description:
      "Global headquarters and primary engineering center. Houses executive leadership, core R&D, manufacturing, and the 24/7 global support operations center. Cleared to Top Secret/SCI.",
    stats: [
      { value: "450", label: "Employees" },
      { value: "120K", label: "Sq. Ft." },
    ],
  },
  {
    city: "London, United Kingdom",
    region: "EMEA HQ",
    description:
      "European headquarters leading business development, NATO compliance, and customer support for all European and allied nation programs. Includes secure briefing and demonstration facilities.",
    stats: [
      { value: "85", label: "Employees" },
      { value: "3", label: "NATO Programs" },
    ],
  },
  {
    city: "Abu Dhabi, UAE",
    region: "Middle East HQ",
    description:
      "Regional hub supporting critical infrastructure protection programs across the GCC nations. Features a dedicated training center and permanent demonstration system for customer evaluations.",
    stats: [
      { value: "45", label: "Employees" },
      { value: "18", label: "Systems" },
    ],
  },
  {
    city: "Singapore",
    region: "APAC HQ",
    description:
      "Asia-Pacific operations center with naval systems integration, regional manufacturing, and rapid engineering support for customers across Japan, Australia, South Korea, and Southeast Asia.",
    stats: [
      { value: "60", label: "Employees" },
      { value: "10", label: "Systems" },
    ],
  },
];

// ──────────────────────────────────────────────
// Stats data
// ──────────────────────────────────────────────
const globalStats = [
  { value: "12", label: "Nations" },
  { value: "240+", label: "Deployed Systems" },
  { value: "4", label: "Regional Offices" },
  { value: "24/7", label: "Global Coverage" },
];

// ──────────────────────────────────────────────
// Stat icon mapper
// ──────────────────────────────────────────────
const statIcons = [Globe, Building2, Building2, Clock];

export default function GlobalPresencePage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/corporate-office.jpg"
        label="Global Presence"
        title="Deployed Worldwide"
        subtitle="Aegis systems protect critical assets across 12 nations — from forward operating bases to international airports, from naval task forces to national borders. Real-time awareness, everywhere it matters."
        cta="Explore Deployments"
        ctaHref="#deployment-map"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── DEPLOYMENT MAP ── */}
      <section id="deployment-map" className="py-20 md:py-32 bg-black">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                Interactive Map
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
                Global Deployment Map
              </h2>
              <p className="mt-4 text-[#767676] text-base md:text-lg max-w-2xl">
                Hover over deployment markers to view installation details,
                system counts, and operational status.
              </p>
            </div>
          </ScrollReveal>

          {/* Map container with border */}
          <ScrollReveal delay={100}>
            <div className="border border-[#222222] bg-[#000000]">
              <DeploymentMap />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── GLOBAL STATS ── */}
      <section className="py-20 md:py-28 bg-black border-y border-[#222222]">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {globalStats.map((stat, i) => {
              const Icon = statIcons[i];
              return (
                <ScrollReveal key={stat.label} delay={i * 80}>
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-2.5 border border-[#222222]">
                        <Icon className="w-4 h-4 text-[#767676]" />
                      </div>
                    </div>
                    <motion.div
                      className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.02em]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-2">
                      {stat.label}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── REGIONAL OFFICES ── */}
      <section className="py-28 md:py-44 bg-black">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <div className="mb-16 md:mb-24">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                Regional Presence
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
                Four Hubs. One Mission.
              </h2>
              <p className="mt-6 text-[#767676] text-base md:text-lg max-w-2xl">
                Strategically positioned to provide responsive support
                wherever our customers operate — with local expertise,
                rapid response, and deep understanding of regional threat
                environments.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regionalOffices.map((office, i) => (
              <ScrollReveal key={office.city} delay={i * 80}>
                <div className="border border-[#222222] bg-[#0a0a0a] p-6 md:p-8 group hover:border-[#333333] transition-colors">
                  {/* Region badge */}
                  <span className="inline-block text-[9px] uppercase tracking-[0.15em] text-[#b9b9b9] border border-[#333333] px-3 py-1 mb-5">
                    {office.region}
                  </span>

                  {/* City name */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {office.city}
                  </h3>

                  {/* Description */}
                  <p className="text-[#767676] text-sm leading-relaxed mb-6">
                    {office.description}
                  </p>

                  {/* Stats */}
                  <div className="pt-5 border-t border-[#222222] flex gap-8">
                    {office.stats.map((s) => (
                      <div key={s.label}>
                        <div className="text-xl font-bold text-white">
                          {s.value}
                        </div>
                        <div className="text-[9px] uppercase tracking-[0.15em] text-[#767676] mt-1">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Global Reach. Local Presence."
        subtitle="No matter where your operations are, Aegis has the people, facilities, and logistics infrastructure to support your mission."
        primaryCta="Contact Regional Office"
        primaryHref="/contact"
        secondaryCta="Request a Briefing"
        secondaryHref="/request-demo"
      />
    </>
  );
}
