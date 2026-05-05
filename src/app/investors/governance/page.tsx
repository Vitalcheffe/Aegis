"use client";

import {
  SectionHero,
  Callout,
  FeatureList,
  CTASection,
} from "@/components/sections";

export default function InvestorsGovernancePage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/governance-hero.jpg"
        label="Investors"
        title="Governance"
        subtitle="Committed to the Highest Standards"
        gradient="from-black via-black/80 to-black/50"
        align="center"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Corporate governance at Aegis is not a compliance exercise — it is
        a strategic imperative. The trust placed in us by defense ministries,
        intelligence agencies, and investors demands the highest standards
        of accountability, transparency, and ethical conduct at every level
        of the organization.
      </Callout>

      {/* ── GOVERNANCE TOPICS ── */}
      <FeatureList
        label="Governance Framework"
        title="Governance & Compliance"
        items={[
          {
            title: "Board of Directors",
            description:
              "Aegis is governed by a nine-member Board of Directors combining deep defense sector expertise, technology leadership, and financial acumen. The Board includes three independent directors, two retired general officers, and representatives from our major investors. Current board members include General (Ret.) David Petraeus, Dr. Elena Vasquez (CEO), Alex Karp (Palantir Technologies), and representatives from General Catalyst and the Qatar Investment Authority. The Board meets quarterly and operates through four standing committees: Audit, Compensation, Nominating & Governance, and Security. All directors undergo annual conflict-of-interest review and security clearance verification.",
            tag: "Leadership",
            href: "/investors",
          },
          {
            title: "Board Committees",
            description:
              "The Audit Committee oversees financial reporting integrity, internal controls, and independent auditor engagement — chaired by Catherine Smith, former CFO of Raytheon Intelligence & Space. The Compensation Committee ensures executive pay aligns with long-term shareholder value and mission performance. The Nominating & Governance Committee manages board composition, independence standards, and succession planning. The Security Committee — unique to Aegis — oversees classified program protection, insider threat mitigation, and compliance with national security agreements, chaired by General (Ret.) David Petraeus. Each committee operates under a written charter reviewed annually.",
            tag: "Oversight",
            href: "/investors",
          },
          {
            title: "Code of Ethics",
            description:
              "The Aegis Code of Ethics establishes non-negotiable standards for every employee, contractor, and board member. Rooted in the principle that our work directly impacts national security and human safety, the code mandates: zero tolerance for corruption or bribery in any jurisdiction; truth in all representations to customers, regulators, and investors; protection of classified and proprietary information; responsible use of AI and autonomous systems in compliance with international humanitarian law; and mandatory reporting of ethical violations through anonymous channels. Violations result in immediate termination and referral to legal authorities where applicable. The code is reviewed and reaffirmed by every employee annually.",
            tag: "Ethics",
            href: "/investors",
          },
          {
            title: "Shareholder Rights",
            description:
              "As a privately held company with institutional investors, Aegis maintains a comprehensive shareholders' agreement that protects investor rights while preserving operational agility. Key provisions include: pro-rata participation rights in future funding rounds; information rights providing quarterly financial statements, annual budgets, and board materials; drag-along and tag-along rights ensuring fair treatment in liquidity events; protective provisions requiring investor consent for material decisions including M&A, debt incurrence, and executive compensation changes; and annual valuation by an independent third-party firm. All shareholder communications are distributed through our secure investor portal.",
            tag: "Rights",
            href: "/investors",
          },
          {
            title: "Executive Compensation",
            description:
              "Executive compensation at Aegis is designed to align leadership incentives with long-term company performance and mission outcomes. The compensation structure comprises: base salary benchmarked at the 50th percentile of comparable defense technology companies; annual cash bonus tied to revenue growth, gross margin expansion, and customer satisfaction metrics; four-year equity vesting with a one-year cliff, ensuring leadership retention through critical growth phases; and mission performance modifiers that adjust compensation based on operational outcomes (system availability, customer deployment success, safety record). Total CEO compensation for FY2024 was $4.2M, with 65% in equity. Full compensation details are available to qualified investors through the secure portal.",
            tag: "Compensation",
            href: "/investors",
          },
          {
            title: "Risk Management",
            description:
              "Aegis operates an enterprise risk management framework that identifies, assesses, and mitigates risks across six domains: operational risk (system failures, deployment delays), cybersecurity risk (nation-state threats, insider compromise), regulatory risk (export controls, defense procurement compliance), market risk (competitive dynamics, customer concentration), financial risk (liquidity, currency exposure), and reputational risk (ethical lapses, media exposure). The Chief Risk Officer reports directly to the Audit Committee and provides quarterly risk assessments to the full Board. Key risk indicators are monitored in real-time through our internal governance dashboard, with escalation protocols for any indicator breaching defined thresholds. Annual stress testing simulates extreme scenarios including loss of top-three customers, supply chain disruption, and classified program compromise.",
            tag: "Risk",
            href: "/investors",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Request Governance Documents"
        subtitle="Access detailed board charters, committee reports, and compliance certifications through our secure investor portal."
        primaryCta="Access Investor Portal"
        primaryHref="/request-demo"
        secondaryCta="Financial Reports"
        secondaryHref="/investors/financial-reports"
      />
    </>
  );
}
