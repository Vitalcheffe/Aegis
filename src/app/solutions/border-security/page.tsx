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

const borderSpecs = [
  { label: "Detection Range", value: "25 km (radar), 12 km (EO/IR)" },
  { label: "Coverage per Node", value: "50 km of border corridor" },
  { label: "Tracking Capacity", value: "400+ simultaneous targets" },
  { label: "Neutralization Range", value: "12 km (RF), 5 km (directed energy)" },
  { label: "Network Architecture", value: "Mesh / satellite / cellular backhaul" },
  { label: "Power", value: "Solar / wind / grid / diesel hybrid" },
  { label: "Autonomy", value: "Unattended operation up to 90 days" },
  { label: "Weather Rating", value: "MIL-STD-810H / IP67" },
  { label: "Terrain", value: "Desert / mountain / jungle / arctic" },
  { label: "Integration", value: "CBP / Frontex / national border systems" },
  { label: "False Alarm Rate", value: "< 0.05 per operating hour" },
  { label: "Response Options", value: "RF deny / kinetic alert / intercept vector" },
];

export default function BorderSecurityPage() {
  return (
    <main>
      <SectionHero
        image="/images/pages/border-hero.jpg"
        label="Sovereignty Solutions"
        title="Border Security"
        subtitle="Persistent Surveillance. Immediate Response."
        cta="Request Briefing"
        ctaHref="/request-demo"
      />

      <SplitSection
        image="/images/pages/border-coastal.jpg"
        label="Corridor Surveillance"
        title="Watching the Corridors That Matter"
        description="Smuggling organizations have adopted drones for reconnaissance, payload delivery, and counter-surveillance — flying contraband across borders with minimal risk to human couriers. Aegis border security solutions provide persistent, automated surveillance across vast and remote border corridors that cannot be staffed continuously. Each sensor node covers up to 50 kilometers of border terrain, linking to neighboring nodes via encrypted mesh network to create an unbroken surveillance chain. The system automatically distinguishes between birds, weather phenomena, and genuine UAS threats, reducing false alarms to near-zero even in challenging environments. When a drone is detected, the system provides border agents with real-time tracking, predicted flight path, and recommended interdiction point — enabling interception before the payload reaches its destination."
        reverse={false}
        stats={[
          { value: "50 km", label: "Coverage per Node" },
          { value: "90 days", label: "Unattended Operation" },
        ]}
      />

      <SplitSection
        image="/images/pages/border-patrol.jpg"
        label="Coastal Monitoring"
        title="Coastal and Maritime Border Defense"
        description="Coastal borders present unique challenges — vast expanses of open water, dense maritime traffic, and drone launch platforms that can be as small as a fishing vessel. Aegis coastal monitoring systems combine shore-based radar arrays with elevated EO/IR platforms to detect low-altitude drone flights over water, where radar clutter from waves and weather can mask small UAS signatures. Our maritime-correlation algorithms fuse AIS vessel tracking data with UAS detection, identifying likely launch platforms and enabling interdiction at the source. For archipelagic nations, our distributed architecture links island-based sensor nodes via satellite backhaul, creating a unified operating picture across hundreds of kilometers of maritime border. The system operates autonomously for up to 90 days between maintenance visits, making it practical for deployment on remote islands and atolls."
        reverse={true}
        stats={[
          { value: "400+", label: "Simultaneous Tracks" },
          { value: "25 km", label: "Radar Detection" },
        ]}
      />

      <QuoteSection
        quote="In the first six months of deployment along our southern corridor, Aegis detected over 300 smuggling drone flights and enabled the interdiction of 2.7 tons of contraband. The ROI was immediate and overwhelming."
        author="Commissioner Rafael Torres"
        role="National Border Protection Agency"
      />

      <SpecTable
        label="Technical Specifications"
        title="Border Security System Specifications"
        specs={borderSpecs}
      />

      <CTASection
        title="Secure Your Borders"
        subtitle="Deploy persistent Counter-UAS surveillance across your border corridors and coastal perimeters. Our team will design a distributed architecture for your terrain and operational requirements."
        primaryCta="Request Border Security Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Solutions"
        secondaryHref="/solutions"
      />
    </main>
  );
}
