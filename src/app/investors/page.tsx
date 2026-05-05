"use client";

import {
  SectionHero,
  Callout,
  StatsSection,
  SplitSection,
  CTASection,
} from "@/components/sections";

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
        The counter-UAS market is projected to exceed $28 billion by 2030.
        Aegis is positioned at the intersection of AI, directed energy, and
        defense modernization — the fastest-growing segment in the most
        resilient sector on Earth.
      </Callout>

      {/* ── STATS ── */}
      <StatsSection
        label="Key Metrics"
        stats={[
          { value: "$2.4B", label: "Valuation" },
          { value: "180%", label: "YoY Revenue Growth" },
          { value: "12", label: "Nations" },
          { value: "240+", label: "Systems Deployed" },
          { value: "800+", label: "Employees" },
        ]}
      />

      {/* ── MARKET OPPORTUNITY ── */}
      <SplitSection
        image="/images/pages/investors-growth.jpg"
        label="Market Opportunity"
        title="A Generational Defense Shift"
        description="The proliferation of commercial drone technology has fundamentally altered the threat landscape for military forces, critical infrastructure, and civilian populations worldwide. In 2024 alone, there were over 4,200 documented hostile drone incidents across 47 countries — a 340% increase from 2020. Traditional air defense systems, designed for manned aircraft and missiles, are architecturally incapable of countering small, cheap, and numerous UAV threats. This gap has created an entirely new defense category — counter-UAS — that is projected to grow from $6.8 billion in 2024 to $28.3 billion by 2030 (CAGR 26.8%). Aegis holds the leading market position with the only fully integrated detection-to-neutralization platform operating at scale across 12 nations."
        cta="View Financial Reports"
        ctaHref="/investors/financial-reports"
        stats={[
          { value: "$28.3B", label: "Market by 2030" },
          { value: "26.8%", label: "CAGR" },
          { value: "4,200+", label: "Incidents in 2024" },
        ]}
      />

      {/* ── FINANCIAL PERFORMANCE ── */}
      <SplitSection
        image="/images/pages/investors-chart.jpg"
        label="Financial Performance"
        title="Sustained Hypergrowth"
        description="Aegis has achieved 180% year-over-year revenue growth driven by three reinforcing dynamics: expanding existing customer deployments (net revenue retention of 162%), winning new nation-level contracts (4 new sovereign customers in 2024), and upselling directed energy and AI capabilities into our installed base. Gross margins have expanded from 58% in 2022 to 71% in 2024 as our software-defined architecture increasingly drives revenue relative to hardware. Annual recurring revenue now represents 64% of total revenue, providing high-visibility forward coverage. The $340M Series D round closed in October 2024 at a $2.4B post-money valuation, providing balance sheet capacity to fund continued R&D investment and geographic expansion without near-term dilution pressure."
        reverse
        cta="View Governance"
        ctaHref="/investors/governance"
        stats={[
          { value: "180%", label: "YoY Growth" },
          { value: "71%", label: "Gross Margin" },
          { value: "162%", label: "Net Revenue Retention" },
          { value: "64%", label: "ARR Mix" },
        ]}
      />

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
