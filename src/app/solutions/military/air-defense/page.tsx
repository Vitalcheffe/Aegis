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

const airDefenseSpecs = [
  { label: "Detection Range", value: "25 km (low-altitude), 50 km (high-altitude)" },
  { label: "Altitude Coverage", value: "10 m AGL to 20,000 m" },
  { label: "Tracking Capacity", value: "500+ simultaneous targets" },
  { label: "Classification Time", value: "< 0.6 seconds" },
  { label: "Neutralization Range", value: "15 km (RF), 8 km (directed energy)" },
  { label: "Swarm Handling", value: "100+ concurrent interdictions" },
  { label: "IFF Integration", value: "Mode 5 / NATO STANAG 4193" },
  { label: "Network", value: "NATO ACCS / JADC2 / IBCS" },
  { label: "Radar Type", value: "Active phased-array, 360° coverage" },
  { label: "Sensor Fusion", value: "Radar + EO/IR + RF + Acoustic" },
  { label: "Response Modes", value: "Semi-auto / Autonomous / Manual" },
  { label: "Airspace Deconfliction", value: "Real-time NOTAM + flight plan integration" },
];

export default function AirDefensePage() {
  return (
    <main>
      <SectionHero
        image="/images/pages/airdefense-hero.jpg"
        label="Military Solutions"
        title="Air Defense"
        subtitle="Layered Airspace Protection"
        cta="Request Briefing"
        ctaHref="/request-demo"
      />

      <SplitSection
        image="/images/pages/airdefense-radar.jpg"
        label="Integrated Defense"
        title="Integrated Air and Missile Defense"
        description="Conventional air defense systems were designed for aircraft and missiles — not for the small, slow, low-flying drones that now dominate the threat landscape. Aegis air defense solutions bridge the gap between strategic SAM coverage and the tactical drone threat, providing layered protection from 10 meters above ground level to 20,000 meters altitude. Our active phased-array radar delivers 360° coverage with instantaneous beam steering, while multi-modal sensor fusion ensures that even stealth-enhanced UAS are detected and tracked. Integrated with NATO ACCS, JADC2, and IBCS networks, Aegis systems provide seamless handoff to existing air defense assets and deconflict the airspace to prevent blue-on-blue engagements."
        reverse={false}
        stats={[
          { value: "50 km", label: "High-Altitude Detection" },
          { value: "500+", label: "Simultaneous Tracks" },
        ]}
      />

      <SplitSection
        image="/images/pages/airdefense-patriot.jpg"
        label="Low-Altitude Threats"
        title="Engaging the Low-Altitude Gap"
        description="The most dangerous drones fly low and slow — below the coverage envelope of traditional air defense radar, exploiting terrain masking and urban clutter to approach undetected. Aegis systems are specifically optimized for this low-altitude gap, with clutter-rejection algorithms that distinguish drone returns from birds, ground vehicles, and atmospheric noise. When a threat enters the engagement zone, the system automatically selects the optimal neutralization method based on target profile, distance, altitude, and collateral risk assessment. RF denial is the first response for command-guided drones; directed energy options are employed for autonomous threats that cannot be jammed. The entire detect-track-classify-neutralize cycle completes in under three seconds for the highest-priority threats."
        reverse={true}
        stats={[
          { value: "10 m", label: "Minimum Altitude" },
          { value: "< 3s", label: "Engagement Cycle" },
        ]}
      />

      <QuoteSection
        quote="Aegis closed the low-altitude gap that our Patriot and NASAMS batteries couldn't address. For the first time, we have true layered defense from strategic missiles down to hobby drones."
        author="Lieutenant General Markus Brenner"
        role="Commander, NATO Allied Air Command"
      />

      <SpecTable
        label="Technical Specifications"
        title="Air Defense System Specifications"
        specs={airDefenseSpecs}
      />

      <CTASection
        title="Close the Gap in Your Air Defense"
        subtitle="Integrate Aegis counter-drone capabilities into your existing air defense network. Our team will design a layered architecture that covers the full altitude and speed spectrum."
        primaryCta="Request Air Defense Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Military Solutions"
        secondaryHref="/solutions/military"
      />
    </main>
  );
}
