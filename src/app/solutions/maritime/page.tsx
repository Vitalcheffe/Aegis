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

const maritimeSpecs = [
  { label: "Detection Range", value: "20 km (open water), 12 km (port)" },
  { label: "Tracking Capacity", value: "300+ simultaneous targets" },
  { label: "Neutralization Range", value: "10 km (RF), 5 km (directed energy)" },
  { label: "Port Coverage", value: "Full harbor and approach channels" },
  { label: "Sea State Rating", value: "Operational through Sea State 5" },
  { label: "Platform Types", value: "Fixed / vessel-mounted / buoy-mounted" },
  { label: "AIS Integration", value: "Real-time vessel correlation" },
  { label: "Network", value: "Satellite / coastal fiber / mesh radio" },
  { label: "Autonomy", value: "Unattended operation up to 180 days (buoy)" },
  { label: "Corrosion Protection", value: "Marine-grade aluminum / C5M coating" },
  { label: "Power", value: "Solar / wave / diesel / grid hybrid" },
  { label: "Integration", value: "VTS / coast guard / port authority systems" },
];

export default function MaritimePage() {
  return (
    <main>
      <SectionHero
        image="/images/pages/maritime-hero.jpg"
        label="Maritime Solutions"
        title="Maritime"
        subtitle="Protecting Strategic Waterways"
        cta="Request Briefing"
        ctaHref="/request-demo"
      />

      <SplitSection
        image="/images/pages/maritime-port.jpg"
        label="Port Security"
        title="Securing the World's Ports"
        description="Ports are the arteries of global trade — and their openness makes them exceptionally vulnerable to drone threats. A single drone-borne IED detonated at a container terminal could cause billions in damage and disrupt supply chains for months. Aegis port security solutions provide comprehensive counter-drone coverage across entire harbor complexes, from approach channels to inland cargo facilities. Our shore-based sensor arrays detect drone threats at ranges up to 20 kilometers over open water, while close-in EO/IR systems provide visual confirmation and tracking in the congested port environment. The system integrates with Vessel Traffic Services (VTS) and coast guard command centers, providing maritime authorities with a unified operating picture that correlates aerial threats with surface vessel movements. For high-value terminals — LNG, petroleum, military cargo — we deploy dedicated interdiction capabilities with the shortest possible engagement timelines."
        reverse={false}
        stats={[
          { value: "20 km", label: "Open Water Detection" },
          { value: "180 days", label: "Buoy Autonomy" },
        ]}
      />

      <SplitSection
        image="/images/pages/naval-ship.jpg"
        label="Offshore Assets"
        title="Protecting Offshore Installations"
        description="Oil platforms, wind farms, and subsea pipeline terminals operate in some of the most remote and exposed environments on Earth — far from traditional security infrastructure and highly vulnerable to drone surveillance and attack. Aegis offshore solutions are engineered for these extreme conditions, with marine-grade construction rated for C5M corrosion environments and autonomous operation periods of up to 180 days between maintenance visits. Buoy-mounted sensor platforms can be deployed around offshore installations in any water depth, providing persistent drone detection and interdiction without requiring platform real estate or personnel. For mobile offshore assets like FPSO vessels and drill ships, our vessel-mounted systems provide the same level of protection while maintaining full operational capability in heavy seas. All offshore systems communicate via encrypted satellite links, ensuring continuous connectivity even when beyond the range of coastal networks."
        reverse={true}
        stats={[
          { value: "C5M", label: "Corrosion Rating" },
          { value: "Satellite", label: "Primary Comms" },
        ]}
      />

      <QuoteSection
        quote="After installing Aegis buoy sensors around our LNG terminal, we detected and interdicted three drone reconnaissance flights in the first month. Each one was collecting imagery of our security layout. The threat was real, and Aegis was the only system that saw it."
        author="Captain Henrik Larsson"
        role="Port Security Director, Rotterdam Europoort"
      />

      <SpecTable
        label="Technical Specifications"
        title="Maritime Counter-UAS System Specifications"
        specs={maritimeSpecs}
      />

      <CTASection
        title="Secure Your Waterways"
        subtitle="Deploy proven maritime Counter-UAS capabilities at your ports, offshore installations, and strategic waterways. Our maritime team will design a corrosion-rated, autonomous system for your environment."
        primaryCta="Request Maritime Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Solutions"
        secondaryHref="/solutions"
      />
    </main>
  );
}
