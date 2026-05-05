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

const navalSpecs = [
  { label: "Detection Range", value: "20 km (sea-level)" },
  { label: "Tracking Capacity", value: "300+ simultaneous targets" },
  { label: "Stabilization", value: "6-axis gyro-stabilized platform" },
  { label: "Sea State Rating", value: "Operational through Sea State 6" },
  { label: "Neutralization Range", value: "10 km (RF), 5 km (directed energy)" },
  { label: "Swarm Interdiction", value: "75+ concurrent neutralizations" },
  { label: "Integration", value: "AEGIS Combat System / NATO Link 16 / SeaWeb" },
  { label: "Ship Classes", value: "Frigate, Destroyer, Carrier, Littoral" },
  { label: "EMCON Modes", value: "Silent watch / LPI / Active" },
  { label: "Power Draw", value: "4.5 kW (ship power)" },
  { label: "Crew", value: "1 operator (semi-autonomous)" },
  { label: "Corrosion Rating", value: "MIL-DTL-5541 Type III" },
];

export default function NavalPage() {
  return (
    <main>
      <SectionHero
        image="/images/pages/naval-hero.jpg"
        label="Military Solutions"
        title="Naval"
        subtitle="Maritime Counter-UAS Defense"
        cta="Request Naval Briefing"
        ctaHref="/request-demo"
      />

      <SplitSection
        image="/images/pages/naval-ship.jpg"
        label="Shipboard Defense"
        title="Protecting the Fleet at Sea"
        description="Modern naval vessels face a rapidly evolving drone threat — from explosive-laden surface drones to aerial UAS conducting targeting for anti-ship missiles. Aegis naval Counter-UAS systems are purpose-built for the maritime environment, with gyro-stabilized sensor platforms that maintain track accuracy through heavy rolls and pitch. Our phased-array radar and EO/IR suites cut through sea clutter to identify low-flying threats that conventional naval radar misses. Integrated directly with shipboard combat management systems, Aegis provides automated threat handoff and engagement authorization, keeping the crew focused on the broader maritime fight while counter-drone operations run semi-autonomously."
        reverse={false}
        stats={[
          { value: "Sea State 6", label: "Operational Limit" },
          { value: "20 km", label: "Detection Range" },
        ]}
      />

      <SplitSection
        image="/images/pages/naval-warship.jpg"
        label="Swarm Defense"
        title="Defeating Coordinated Swarm Attacks"
        description="The age of the drone swarm has arrived at sea. Adversaries can now launch dozens of coordinated UAS from shore-based or maritime platforms, overwhelming traditional point-defense systems through sheer numbers and simultaneous attack vectors. Aegis naval systems employ wideband RF denial to disrupt swarm command-and-control links across multiple frequency bands simultaneously. When RF interdiction alone is insufficient, our layered approach transitions to directional energy and kinetic options, prioritizing the highest-threat elements while maintaining coverage against follow-on attacks. The system's autonomous engagement logic can simultaneously neutralize over 75 individual drones in a single swarm event."
        reverse={true}
        stats={[
          { value: "75+", label: "Concurrent Interdictions" },
          { value: "< 2s", label: "Swarm Response" },
        ]}
      />

      <QuoteSection
        quote="In the Red Sea engagement, Aegis was the only system that maintained track through the electronic warfare environment. It gave us the firing solution when everything else was blinded."
        author="Rear Admiral Sarah K. Vasquez"
        role="Commander, Carrier Strike Group Seven"
      />

      <SpecTable
        label="Technical Specifications"
        title="Naval Counter-UAS System Specifications"
        specs={navalSpecs}
      />

      <CTASection
        title="Defend Your Fleet"
        subtitle="Equip your vessels with maritime-proven Counter-UAS capabilities. Our naval solutions team will design a shipboard configuration for your class and operational profile."
        primaryCta="Request Naval Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Military Solutions"
        secondaryHref="/solutions/military"
      />
    </main>
  );
}
