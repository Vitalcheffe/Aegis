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

const fobSpecs = [
  { label: "Detection Range", value: "15 km radius" },
  { label: "Tracking Capacity", value: "200+ simultaneous targets" },
  { label: "Classification Time", value: "< 0.8 seconds" },
  { label: "Neutralization Range", value: "8 km (RF), 3 km (kinetic)" },
  { label: "Setup Time", value: "45 minutes (rapid deploy)" },
  { label: "Operational Uptime", value: "99.8%" },
  { label: "Power Requirements", value: "2.5 kW (solar/battery capable)" },
  { label: "Crew Requirement", value: "2 operators minimum" },
  { label: "Network Integration", value: "JADC2 / ATAK / MOSA compatible" },
  { label: "Weather Rating", value: "MIL-STD-810H" },
  { label: "EM Emission", value: "LPI/LPD modes available" },
  { label: "Swarm Handling", value: "50+ concurrent interdictions" },
];

export default function ForwardOperatingBasesPage() {
  return (
    <main>
      <SectionHero
        image="/images/pages/fob-hero.jpg"
        label="Military Solutions"
        title="Forward Operating Bases"
        subtitle="360° Protection for Forward Positions"
        cta="Request Briefing"
        ctaHref="/request-demo"
      />

      <SplitSection
        image="/images/pages/fob-perimeter.jpg"
        label="Perimeter Defense"
        title="Layered Perimeter Protection"
        description="Forward operating bases face an unprecedented spectrum of aerial threats — from hobbyist drones conducting ISR to military-grade loitering munitions executing precision strikes. Aegis FOB defense systems create a multi-layered protective dome that detects, classifies, and neutralizes threats before they enter the base's inner perimeter. Our radar-EO/IR fusion architecture eliminates blind spots, while automated engagement protocols reduce operator response time to under three seconds. Each system integrates directly with existing base C2 infrastructure, providing real-time threat visualization on ATAK and MOSA-compatible displays."
        reverse={false}
        stats={[
          { value: "15 km", label: "Detection Radius" },
          { value: "< 3s", label: "Engagement Time" },
        ]}
      />

      <SplitSection
        image="/images/pages/fob-military.jpg"
        label="Sensor Integration"
        title="Integrated Sensor Coverage"
        description="No single sensor modality can address the full threat landscape. Aegis FOB solutions combine phased-array radar for long-range detection, electro-optical and infrared cameras for visual confirmation, and RF spectrum monitoring for command-link identification. Sensor fusion algorithms correlate data across all modalities in real time, producing a single integrated operating picture that eliminates false positives and ensures no threat goes untracked. The system automatically prioritizes threats based on trajectory, speed, and behavioral analysis, presenting operators with actionable intelligence rather than raw data feeds."
        reverse={true}
        stats={[
          { value: "200+", label: "Simultaneous Tracks" },
          { value: "3", label: "Sensor Modalities" },
        ]}
      />

      <QuoteSection
        quote="During a 72-hour sustained attack involving over 40 individual UAS sorties, the Aegis system maintained 100% detection and 98% neutralization — with zero false engagements on friendly aircraft."
        author="Colonel James R. Whitfield"
        role="Commander, Joint Counter-UAS Task Force — Central Command"
      />

      <SpecTable
        label="Technical Specifications"
        title="FOB Defense System Specifications"
        specs={fobSpecs}
      />

      <CTASection
        title="Secure Your Forward Positions"
        subtitle="Deploy proven Counter-UAS defense at your forward operating bases. Our team will design a configuration matched to your threat environment and operational requirements."
        primaryCta="Request FOB Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Military Solutions"
        secondaryHref="/solutions/military"
      />
    </main>
  );
}
