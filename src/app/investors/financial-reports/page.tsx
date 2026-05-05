"use client";

import {
  SectionHero,
  FeatureList,
  CTASection,
} from "@/components/sections";

export default function FinancialReportsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/financial-hero.jpg"
        label="Investors"
        title="Financial Reports"
        subtitle="Transparency and Accountability"
        gradient="from-black via-black/80 to-black/50"
        align="center"
      />

      {/* ── REPORTS ── */}
      <FeatureList
        label="Reports & Filings"
        title="Financial Documents"
        items={[
          {
            title: "Annual Report 2025",
            description:
              "A comprehensive review of fiscal year 2025 performance, including revenue of $840M (180% YoY growth), 4 new sovereign customer acquisitions, the successful deployment of Aegis Core v3.0 across NATO, and our strategic roadmap for directed energy integration and Pacific theater expansion. The report includes audited financial statements, management discussion and analysis, risk factors, and CEO letter to shareholders. Full-year gross margin expanded to 73%, with annual recurring revenue reaching $538M — a 195% increase year-over-year.",
            tag: "FY 2025",
            href: "/investors",
          },
          {
            title: "Q4 2024 Earnings Report",
            description:
              "Fourth quarter revenue of $262M, representing 168% year-over-year growth and 14% sequential improvement. Key highlights include the $180M Republic of Korea contract, the White Sands directed energy milestone, and the closing of the $340M Series D round at $2.4B valuation. Operating losses narrowed to ($18M) as gross margins reached 71% and operating leverage improved. Cash and equivalents of $520M provide substantial runway for continued investment. Adjusted EBITDA turned positive at $12M — the first profitable quarter in company history.",
            tag: "Q4 2024",
            href: "/investors",
          },
          {
            title: "Q3 2024 Earnings Report",
            description:
              "Third quarter revenue of $230M, up 155% year-over-year, driven by the UK Ministry of Defence convoy protection contract (£45M) and expansion of existing NATO deployments. Gross margins improved to 69%, reflecting increasing software revenue mix. R&D investment of $68M (30% of revenue) funded next-generation swarm detection research and directed energy weapon integration. Customer count grew to 12 nations with average contract value increasing 40% to $28M. Net revenue retention rate of 162% confirms strong expansion within the installed base.",
            tag: "Q3 2024",
            href: "/investors",
          },
          {
            title: "Q2 2024 Earnings Report",
            description:
              "Second quarter revenue of $198M, up 142% year-over-year, marking the tenth consecutive quarter of triple-digit growth. New customer wins included the UAE Armed Forces and the Australian Defence Force, expanding Aegis coverage to the Middle East and Oceania. Aegis Shield achieved 99.97% operational availability across all deployed sites, validating the platform's reliability for critical infrastructure protection. Operating expenses scaled at 85% of revenue growth rate, demonstrating improving operating leverage. Free cash flow improved to ($24M), tracking toward breakeven by mid-2025.",
            tag: "Q2 2024",
            href: "/investors",
          },
          {
            title: "Q1 2024 Earnings Report",
            description:
              "First quarter revenue of $164M, up 128% year-over-year, establishing the growth trajectory that would define FY2024. Key contract wins included the German Bundeswehr C-UAS framework agreement (€95M) and the expansion of the Japanese Ministry of Defense deployment. Gross margins reached 65%, up from 58% in Q1 2023, as software licensing and recurring sustainment revenue grew to 52% of total revenue. Headcount grew to 620 employees across 9 offices, with 45% of new hires in engineering and research roles.",
            tag: "Q1 2024",
            href: "/investors",
          },
          {
            title: "Annual Report 2024",
            description:
              "Fiscal year 2024 marked Aegis's transition from high-growth startup to scaled defense platform. Full-year revenue reached $300M (156% YoY growth), with 8 sovereign customers, 180+ systems deployed, and 854 employees across 13 offices. The year was defined by three strategic achievements: NATO STANAG 4671 certification for Aegis Tactical, the closing of the $340M Series D at $2.4B valuation, and the operational deployment of Aegis Core v3.0. Net revenue retention of 162% and expanding gross margins demonstrated the power of our software-defined, land-and-expand business model.",
            tag: "FY 2024",
            href: "/investors",
          },
          {
            title: "SEC Filings",
            description:
              "All required filings with the U.S. Securities and Exchange Commission, including Form D (Regulation D exemption for Series A–D offerings), Regulation D supplemental filings, and foreign agent registration documentation. As a privately held company, Aegis files under applicable exemptions and provides voluntary disclosures to investors on a quarterly basis. All filings are available for download in PDF format. For access to classified supplemental materials, contact investor relations with verification of accredited investor status.",
            tag: "Regulatory",
            href: "/investors",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Investor Inquiries"
        subtitle="For access to detailed financial data, board presentations, or to schedule a meeting with our CFO, contact our investor relations team."
        primaryCta="Contact IR Team"
        primaryHref="/request-demo"
        secondaryCta="Back to Investors"
        secondaryHref="/investors"
      />
    </>
  );
}
