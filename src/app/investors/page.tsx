"use client";

import { motion } from "framer-motion";
import {
  SectionHero,
  Callout,
  StatsSection,
  Timeline,
  CTASection,
  CardGrid,
} from "@/components/sections";
import { ScrollReveal as ScrollRevealComponent } from "@/components/sections/scroll-reveal";
import {
  TrendingUp,
  Shield,
  Globe,
  Building2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

/* ────────────────────────────────────────────────────────────────
   INVESTOR THESIS CARDS — 3 reasons to invest
   ──────────────────────────────────────────────────────────────── */

function InvestorThesis() {
  const theses = [
    {
      icon: TrendingUp,
      title: "Market Growth",
      description:
        "The counter-UAS market is experiencing unprecedented expansion driven by the proliferation of commercial drone technology. With over 4,200 documented hostile drone incidents across 47 countries in 2024 alone — a 340% increase from 2020 — governments worldwide are mandating C-UAS procurement. Aegis holds the leading market position with the only fully integrated detection-to-neutralization platform operating at scale across 12 nations.",
    },
    {
      icon: Shield,
      title: "Technology Moat",
      description:
        "Aegis maintains a deep competitive moat built on 8+ years of classified R&D, 147 active patents, and the industry's largest operational dataset — over 2.1 million intercepted drone signatures. Our AI-driven classification engine achieves 99.4% accuracy at 18ms latency, a benchmark no competitor has matched. The flywheel effect of deployed systems feeding threat intelligence back into our models creates compounding advantages that widen with every new installation.",
    },
    {
      icon: Globe,
      title: "Global Expansion",
      description:
        "Aegis has expanded from 3 to 12 sovereign customers in under three years, with active procurement pipelines in 18 additional nations. Our newly established regional headquarters in Abu Dhabi, London, and Singapore position us to capture the three fastest-growing defense procurement markets. The NATO STANAG 4671 certification and ITAR compliance framework remove regulatory barriers to allied nation sales, enabling an asset-light international expansion model.",
    },
  ];

  return (
    <section className="py-28 md:py-44 bg-black">
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
        <ScrollRevealComponent>
          <div className="mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Investment Thesis
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              Three Reasons to Invest
            </h2>
          </div>
        </ScrollRevealComponent>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {theses.map((thesis, i) => (
            <ScrollRevealComponent key={thesis.title} delay={i * 100}>
              <div className="border border-white/10 p-8 md:p-10 hover:border-white/20 transition-colors group">
                <thesis.icon
                  className="text-white/40 mb-6 group-hover:text-white/70 transition-colors"
                  size={32}
                  strokeWidth={1.5}
                />
                <h3 className="text-2xl font-bold text-white mb-4 tracking-[-0.02em]">
                  {thesis.title}
                </h3>
                <p className="text-[#b9b9b9] text-sm md:text-base leading-relaxed">
                  {thesis.description}
                </p>
              </div>
            </ScrollRevealComponent>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   LEAD INVESTORS — 6 VC/PE firms
   ──────────────────────────────────────────────────────────────── */

function LeadInvestors() {
  const investors = [
    {
      name: "Andreessen Horowitz",
      focus: "Defense Tech & AI",
      description:
        "Lead investor since Series B. a16z's American Dynamism fund identified Aegis as the category-defining platform for counter-UAS at the intersection of AI and national security.",
    },
    {
      name: "General Catalyst",
      focus: "Government Technology",
      description:
        "Co-lead of Series D. General Catalyst's defense practice partnered with Aegis to accelerate the transition from prototype to deployed capability across allied defense ministries.",
    },
    {
      name: "Founders Fund",
      focus: "Deep Tech & Defense",
      description:
        "Series A lead investor. Founders Fund backed Aegis at the earliest stage, recognizing that the drone threat would create an entirely new defense category requiring software-first solutions.",
    },
    {
      name: "Lux Capital",
      focus: "Frontier Science & Security",
      description:
        "Series C participant. Lux Capital's investment thesis centered on Aegis's directed energy integration roadmap and the convergence of AI sensing with kinetic defense systems.",
    },
    {
      name: "DCVC (Data Collective)",
      focus: "Applied AI & Autonomy",
      description:
        "Series B co-investor. DCVC recognized Aegis's proprietary threat intelligence dataset as the most valuable asset in the C-UAS ecosystem — a compounding data advantage that deepens with every deployment.",
    },
    {
      name: "In-Q-Tel",
      focus: "National Security Technology",
      description:
        "Strategic investor since Series A. As the CIA's venture arm, In-Q-Tel's investment signals Aegis's alignment with the highest-priority intelligence community requirements for counter-UAS capability.",
    },
  ];

  return (
    <section className="py-28 md:py-44 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
        <ScrollRevealComponent>
          <div className="mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Our Backers
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              Lead Investors
            </h2>
          </div>
        </ScrollRevealComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investors.map((investor, i) => (
            <ScrollRevealComponent key={investor.name} delay={i * 60}>
              <div className="border border-white/10 p-6 md:p-8 hover:border-white/20 transition-colors bg-black">
                <div className="flex items-start gap-4 mb-4">
                  <Building2
                    className="text-white/30 flex-shrink-0 mt-1"
                    size={20}
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-[-0.01em]">
                      {investor.name}
                    </h3>
                    <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-2 py-0.5 inline-block mt-1">
                      {investor.focus}
                    </span>
                  </div>
                </div>
                <p className="text-[#767676] text-sm leading-relaxed">
                  {investor.description}
                </p>
              </div>
            </ScrollRevealComponent>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   RESOURCE LINK CARDS
   ──────────────────────────────────────────────────────────────── */

function ResourceLinks() {
  return (
    <section className="py-20 md:py-28 bg-black border-t border-white/10">
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
        <ScrollRevealComponent>
          <div className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Investor Resources
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              Documents & Governance
            </h2>
          </div>
        </ScrollRevealComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollRevealComponent delay={0}>
            <Link
              href="/investors/financial-reports"
              className="group block border border-white/10 hover:border-white/20 transition-colors p-8 md:p-10 bg-[#0a0a0a]"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1">
                  Financial Reports
                </span>
                <ArrowRight
                  className="text-white/20 group-hover:text-white/60 transition-colors -rotate-45"
                  size={20}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em] mb-4">
                Annual & Quarterly Reports
              </h3>
              <p className="text-[#767676] text-sm leading-relaxed">
                Access audited financial statements, quarterly earnings
                summaries, and SEC filings. Comprehensive transparency for
                current and prospective investors.
              </p>
            </Link>
          </ScrollRevealComponent>

          <ScrollRevealComponent delay={80}>
            <Link
              href="/investors/governance"
              className="group block border border-white/10 hover:border-white/20 transition-colors p-8 md:p-10 bg-[#0a0a0a]"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1">
                  Governance
                </span>
                <ExternalLink
                  className="text-white/20 group-hover:text-white/60 transition-colors"
                  size={20}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em] mb-4">
                Corporate Governance
              </h3>
              <p className="text-[#767676] text-sm leading-relaxed">
                Board composition, committee charters, conflict of interest
                policies, and shareholder rights. Aegis is committed to the
                highest standards of corporate governance.
              </p>
            </Link>
          </ScrollRevealComponent>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════ */

export default function InvestorsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/investors-hero.jpg"
        label="Aegis Defense Systems"
        title="Investors"
        subtitle="Investing in the Future of Defense"
        gradient="from-black via-black/80 to-black/50"
        align="center"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Aegis is the market leader in counter-UAS defense — the fastest-growing
        segment in the most resilient sector on Earth. With 42% year-over-year
        growth, 85% gross margins, and a $2.4B valuation, we are building the
        defining platform for aerial threat neutralization.
      </Callout>

      {/* ── KEY FINANCIAL METRICS ── */}
      <StatsSection
        label="Key Financial Metrics — FY2025"
        stats={[
          { value: "$1.2B", label: "Revenue FY2025" },
          { value: "42%", label: "YoY Growth" },
          { value: "85%", label: "Gross Margin" },
          { value: "$800M", label: "Total Funding" },
          { value: "$2.4B", label: "Valuation" },
        ]}
      />

      {/* ── FUNDING HISTORY TIMELINE ── */}
      <Timeline
        label="Funding History"
        title="Capital Milestones"
        events={[
          {
            year: "2017",
            title: "Series A — $45M",
            description:
              "Led by Founders Fund with participation from In-Q-Tel. Funding enabled initial product development of Aegis Shield, hiring of the core engineering team from Lockheed Martin and Raytheon, and the first operational deployment with the U.S. Army at Fort Bliss. The round validated the counter-UAS market as a standalone defense category.",
          },
          {
            year: "2019",
            title: "Series B — $120M",
            description:
              "Led by Andreessen Horowitz with co-investment from DCVC. Capital funded the development of Aegis Command, our AI-driven C2 platform, and expansion to 4 sovereign customers including the UK Ministry of Defence. Revenue grew from $8M to $67M ARR during this period, establishing product-market fit at scale.",
          },
          {
            year: "2021",
            title: "Series C — $250M",
            description:
              "Led by General Catalyst with participation from Lux Capital. This round accelerated directed energy weapon integration, established the Abu Dhabi and London regional headquarters, and funded the NATO STANAG 4671 certification process. Deployment count reached 120+ systems across 8 nations.",
          },
          {
            year: "2023",
            title: "Series D — $385M",
            description:
              "Led by General Catalyst at a $2.4B post-money valuation. The round provided balance sheet capacity for continued R&D investment in autonomous swarm defense and multi-domain sensor fusion, geographic expansion into the Indo-Pacific theater, and strategic acquisitions in RF sensing and edge computing. Revenue surpassed $850M ARR with 85% gross margins.",
          },
        ]}
      />

      {/* ── INVESTOR THESIS ── */}
      <InvestorThesis />

      {/* ── MARKET OPPORTUNITY ── */}
      <section className="py-28 md:py-44 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollRevealComponent>
            <div className="mb-16 md:mb-24">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                Market Opportunity
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
                A Generational Defense Shift
              </h2>
            </div>
          </ScrollRevealComponent>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">
            <ScrollRevealComponent>
              <p className="text-[#b9b9b9] text-lg md:text-xl leading-relaxed">
                The proliferation of commercial drone technology has fundamentally
                altered the threat landscape for military forces, critical
                infrastructure, and civilian populations worldwide. In 2024
                alone, there were over 4,200 documented hostile drone incidents
                across 47 countries — a 340% increase from 2020. Traditional air
                defense systems, designed for manned aircraft and missiles, are
                architecturally incapable of countering small, cheap, and
                numerous UAV threats.
              </p>
              <p className="text-[#b9b9b9] text-lg md:text-xl leading-relaxed mt-6">
                This gap has created an entirely new defense category —
                counter-UAS — that is projected to grow from $5.2 billion in
                2025 to $18.4 billion by 2030, representing a compound annual
                growth rate of 28.7%. Aegis holds the leading market position
                with the only fully integrated detection-to-neutralization
                platform operating at scale across 12 nations.
              </p>
            </ScrollRevealComponent>

            <ScrollRevealComponent delay={150}>
              <div className="space-y-8">
                <div className="border border-white/10 p-8 bg-black">
                  <div className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.02em]">
                    $5.2B → $18.4B
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-2">
                    C-UAS Market Size 2025–2030
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="border border-white/10 p-6 bg-black">
                    <div className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
                      28.7%
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-2">
                      CAGR
                    </div>
                  </div>
                  <div className="border border-white/10 p-6 bg-black">
                    <div className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
                      4,200+
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-2">
                      Incidents in 2024
                    </div>
                  </div>
                  <div className="border border-white/10 p-6 bg-black">
                    <div className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
                      47
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-2">
                      Countries Affected
                    </div>
                  </div>
                  <div className="border border-white/10 p-6 bg-black">
                    <div className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
                      340%
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-2">
                      Increase Since 2020
                    </div>
                  </div>
                </div>
              </div>
            </ScrollRevealComponent>
          </div>
        </div>
      </section>

      {/* ── LEAD INVESTORS ── */}
      <LeadInvestors />

      {/* ── RESOURCE LINK CARDS ── */}
      <ResourceLinks />

      {/* ── CTA ── */}
      <CTASection
        title="Investor Resources"
        subtitle="Access our latest financial reports, governance documents, and SEC filings. For investor inquiries, contact our IR team."
        primaryCta="Financial Reports"
        primaryHref="/investors/financial-reports"
        secondaryCta="Governance"
        secondaryHref="/investors/governance"
      />
    </>
  );
}
