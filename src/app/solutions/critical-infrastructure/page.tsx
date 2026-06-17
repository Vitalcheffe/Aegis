"use client";

import {
  SectionHero,
  SplitSection,
  SpecTable,
  CTASection,
  QuoteSection,
  ScrollReveal,
  AnimatedLine,
} from "@/components/sections";

const infraSpecs = [
  { label: "Detection Range", value: "20 km radius" },
  { label: "Tracking Capacity", value: "300+ simultaneous targets" },
  { label: "Neutralization Range", value: "10 km (RF), 4 km (directed energy)" },
  { label: "Site Coverage", value: "Unlimited (modular architecture)" },
  { label: "SCADA Integration", value: "Modbus / DNP3 / IEC 61850" },
  { label: "Physical Security", value: "Integration with CCTV / ACS / PSIM" },
  { label: "Power Options", value: "Grid / Solar / UPS / Generator" },
  { label: "Operating Modes", value: "Monitor / Alert / Interdict / Autonomous" },
  { label: "Cyber Security", value: "IEC 62443 / NERC CIP compliant" },
  { label: "Regulatory", value: "NRC / DHS CFATS / NIST frameworks" },
  { label: "Reporting", value: "Automated compliance and audit trails" },
  { label: "Redundancy", value: "Dual-path comms / hot-standby sensors" },
];

export default function CriticalInfrastructurePage() {
  return (
    <main>
      <SectionHero
        image="/images/pages/infrastructure-hero.jpg"
        label="Infrastructure Solutions"
        title="Critical Infrastructure"
        subtitle="Protecting the Backbone of Nations"
        cta="Request Briefing"
        ctaHref="/request-demo"
      />

      <SplitSection
        image="/images/pages/infrastructure-power.jpg"
        label="Power Grid Protection"
        title="Defending the Grid from Aerial Attack"
        description="The electrical grid is the lifeline of modern civilization — and it is acutely vulnerable to drone-borne attacks. A single UAS carrying a conductive payload can short-circuit a high-voltage substation; a coordinated swarm could disable an entire regional grid. Aegis critical infrastructure solutions provide 24/7 autonomous surveillance and interdiction for power generation facilities, substations, and transmission corridors. Our systems integrate directly with SCADA networks, enabling automatic protective relay actions when drone threats approach critical equipment. For nuclear facilities, our NRC-compliant configurations provide defense-in-depth with radiation-hardened sensor options and containment-area exclusion zones that trigger immediate interdiction upon any unauthorized aerial incursion."
        reverse={false}
        stats={[
          { value: "20 km", label: "Protection Radius" },
          { value: "24/7", label: "Autonomous Operation" },
        ]}
      />

      <SplitSection
        image="/images/pages/infrastructure-power-plant.jpg"
        label="Data Center Security"
        title="Safeguarding the World's Data"
        description="Hyperscale data centers represent concentrations of value that rival any financial institution — and their rooftop cooling infrastructure, fiber optic entry points, and power feeds present attractive targets for drone-borne surveillance and attack. Aegis data center solutions provide multi-layered protection that begins at the outer perimeter and extends through the building envelope. Our systems detect drones conducting ISR overflights, neutralize UAS attempting to deliver electromagnetic pulse devices, and interdict aerial surveillance of fiber optic cable routes and power substations. Integrated with existing physical security infrastructure through PSIM platforms, Aegis provides a unified operating picture that correlates aerial and ground-based threats, enabling coordinated response across all security domains."
        reverse={true}
        stats={[
          { value: "300+", label: "Simultaneous Tracks" },
          { value: "IEC 62443", label: "Cyber Compliance" },
        ]}
      />

      <QuoteSection
        quote="After a drone was found hovering over our 500MW substation, we deployed Aegis within 30 days. The system has since interdicted 14 unauthorized UAS approaches — each one a potential blackout event."
        author="Patricia Lawson"
        role="VP of Security, American Electric Power"
      />

      <SpecTable
        label="Technical Specifications"
        title="Critical Infrastructure System Specifications"
        specs={infraSpecs}
      />

      <CTASection
        title="Protect Your Critical Assets"
        subtitle="Deploy proven Counter-UAS defense at your most essential facilities. Our infrastructure team will design a regulatory-compliant system for your operational environment."
        primaryCta="Request Infrastructure Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Solutions"
        secondaryHref="/solutions"
      />
    </main>
  );
}
