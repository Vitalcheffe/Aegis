"use client";

import {
  SectionHero,
  Callout,
  StatsSection,
  FeatureList,
  CTASection,
  ImageBreak,
  ScrollReveal,
  AnimatedLine,
} from "@/components/sections";

const militaryFeatures = [
  {
    title: "Forward Operating Bases",
    description:
      "360° perimeter defense for remote and forward-deployed positions. Multi-sensor detection arrays with automated threat classification protect troops from ISR drones, loitering munitions, and swarm attacks. Integrated with existing base C2 systems for seamless force protection.",
    href: "/solutions/military/forward-operating-bases",
    tag: "Perimeter Defense",
  },
  {
    title: "Naval",
    description:
      "Shipboard Counter-UAS systems engineered for maritime environments. Stabilized sensor platforms and directional RF neutralization maintain effectiveness in heavy seas, protecting vessels from drone-borne IEDs, surveillance platforms, and coordinated swarm engagements at range.",
    href: "/solutions/military/naval",
    tag: "Maritime",
  },
  {
    title: "Convoy Protection",
    description:
      "Mobile defense systems that move with the force. Vehicle-mounted detection and interdiction suites provide continuous protection during route clearance and tactical movements. Rapid-deploy jamming blankets deny enemy UAS command links in under three seconds.",
    href: "/solutions/military/convoys",
    tag: "Mobile",
  },
  {
    title: "Special Operations",
    description:
      "Man-packable, silent, and lethal counter-drone systems for the most demanding missions. Covert detection and non-kinetic neutralization preserve operational security while eliminating aerial threats in denied areas and sensitive environments.",
    href: "/solutions/military/special-operations",
    tag: "Specialized",
  },
  {
    title: "Air Defense",
    description:
      "Layered airspace protection from low-altitude UAS incursions through high-altitude surveillance platforms. Integrated with national air defense networks, Aegis systems close the gap between conventional SAM coverage and the small-drone threat domain.",
    href: "/solutions/military/air-defense",
    tag: "Integrated",
  },
];

const militaryStats = [
  { value: "12,000+", label: "Threats Neutralized" },
  { value: "47", label: "Allied Nations" },
  { value: "0.8s", label: "Classification Time" },
  { value: "99.8%", label: "Operational Uptime" },
  { value: "350+", label: "Deployed Systems" },
];

export default function MilitaryPage() {
  return (
    <main>
      <SectionHero
        image="/images/pages/military-hero.jpg"
        label="Military Solutions"
        title="Military"
        subtitle="Battlefield-Proven Counter-UAS"
        cta="Request Military Briefing"
        ctaHref="/request-demo"
      />

      <Callout>
        Combat-proven across every theater. Aegis military systems have
        protected forward positions, naval task forces, and mobile columns
        from the full spectrum of unmanned aerial threats — from commercial
        drones repurposed for attack to sophisticated military-grade UAS.
      </Callout>

      <ImageBreak image="/images/pages/specialops-night.jpg" height="50vh" />

      <StatsSection stats={militaryStats} label="Military Performance" />

      <FeatureList
        label="Capabilities"
        title="Mission-Specific Defense"
        items={militaryFeatures}
      />

      <CTASection
        title="Deploy with Confidence"
        subtitle="Our military solutions team will design a Counter-UAS architecture matched to your operational requirements and threat profile."
        primaryCta="Request Classified Briefing"
        primaryHref="/request-demo"
        secondaryCta="View Technology"
        secondaryHref="/technology"
      />
    </main>
  );
}
