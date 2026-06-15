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

const urbanSpecs = [
  { label: "Detection Range", value: "10 km radius" },
  { label: "Tracking Capacity", value: "200+ simultaneous targets" },
  { label: "Classification Time", value: "< 1.0 seconds" },
  { label: "Neutralization Range", value: "5 km (selective RF)" },
  { label: "Urban Clutter Rejection", value: "99.2% false-positive reduction" },
  { label: "City Integration", value: "Smart city IoT / CCTV / public safety" },
  { label: "Regulatory Compliance", value: "FCC / national telecom / civil aviation" },
  { label: "Civilian Safety", value: "Non-kinetic neutralization only" },
  { label: "Reporting", value: "Automated law enforcement data sharing" },
  { label: "Power", value: "Grid / municipal fiber PoE" },
  { label: "Deployment", value: "Building rooftop / tower / mobile unit" },
  { label: "Scalability", value: "Single district to entire metropolitan area" },
];

export default function UrbanSecurityPage() {
  return (
    <main>
      <SectionHero
        image="/images/pages/urban-hero.jpg"
        label="Municipal Solutions"
        title="Urban Security"
        subtitle="Smart Cities. Safe Skies."
        cta="Request Briefing"
        ctaHref="/request-demo"
      />

      <SplitSection
        image="/images/pages/urban-smart.jpg"
        label="Urban Detection"
        title="Drone Detection in the Urban Canyons"
        description="Urban environments present the most challenging detection scenario — a forest of RF-emitting devices, canyon-like streets that scatter radar returns, and a sky full of legitimate commercial drones delivering packages and inspecting infrastructure. Aegis urban security solutions are specifically engineered for this complexity. Our multi-modal sensor fusion combines radar with RF spectrum analysis, EO/IR cameras, and acoustic arrays to detect and classify drone threats in environments where any single sensor modality would fail. Advanced machine-learning algorithms trained on millions of urban drone flights distinguish between authorized commercial UAS operating under waiver and unauthorized threats with hostile intent. The system integrates with municipal smart city platforms, pulling in real-time drone flight authorization data to automatically deconflict known-good operations from genuine threats."
        reverse={false}
        stats={[
          { value: "99.2%", label: "Clutter Rejection" },
          { value: "< 1.0s", label: "Classification Time" },
        ]}
      />

      <SplitSection
        image="/images/pages/urban-cityscape.jpg"
        label="Public Events"
        title="Securing Public Gatherings and Events"
        description="Marathons, concerts, sporting events, political rallies — large public gatherings present an irresistible target for drone operators, whether their intent is disruption, surveillance, or attack. Aegis event security solutions deploy rapidly around venues of any size, creating a protective counter-drone umbrella that operates transparently to the public. Our non-kinetic neutralization approach ensures that interdiction is invisible to attendees — drones simply lose command link and execute pre-programmed return-to-home behavior, eliminating the risk of a disabled drone falling into a crowd. For recurring events, the system learns the operational pattern and automatically tunes its detection thresholds, reducing false alarms with each deployment. Post-event analytics provide law enforcement with comprehensive threat reports and forensic data for investigation and prosecution."
        reverse={true}
        stats={[
          { value: "Non-Kinetic", label: "Interdiction Mode" },
          { value: "Metro-Wide", label: "Scalable Coverage" },
        ]}
      />

      <QuoteSection
        quote="During the city's New Year's celebration with 1.2 million attendees, Aegis detected and safely diverted 11 unauthorized drones — including one carrying a chemical dispersal device. The public never knew."
        author="Chief Superintendent Elena Voss"
        role="Metropolitan Police, Public Order Command"
      />

      <SpecTable
        label="Technical Specifications"
        title="Urban Security System Specifications"
        specs={urbanSpecs}
      />

      <CTASection
        title="Secure Your City"
        subtitle="Deploy smart city-integrated Counter-UAS capabilities for your municipality. Our urban security team will design a scalable architecture for your threat environment and regulatory framework."
        primaryCta="Request Urban Security Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Solutions"
        secondaryHref="/solutions"
      />
    </main>
  );
}
