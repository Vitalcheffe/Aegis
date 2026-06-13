"use client";

import {
  SectionHero,
  Callout,
  StatsSection,
  CardGrid,
  CTASection,
  ScrollReveal,
  AnimatedLine,
} from "@/components/sections";

const solutionCards = [
  {
    title: "Military",
    description:
      "Battlefield-proven Counter-UAS systems for forward operating bases, naval vessels, convoys, special operations, and integrated air defense. Trusted by allied forces across every theater of operation.",
    image: "/images/pages/military-hero.jpg",
    href: "/solutions/military",
    tag: "Defense",
  },
  {
    title: "Airports",
    description:
      "Zero-disruption drone detection and mitigation integrated with ATC systems. Protect passengers, runways, and terminal infrastructure without impacting flight operations.",
    image: "/images/pages/airports-hero.jpg",
    href: "/solutions/airports",
    tag: "Aviation",
  },
  {
    title: "Critical Infrastructure",
    description:
      "Multi-layered defense for power plants, data centers, water treatment facilities, and telecommunications hubs. Prevent surveillance and kinetic attacks on essential national assets.",
    image: "/images/pages/infrastructure-hero.jpg",
    href: "/solutions/critical-infrastructure",
    tag: "Infrastructure",
  },
  {
    title: "Border Security",
    description:
      "Persistent surveillance and interdiction across vast land borders and coastal perimeters. Detect smuggling drones, unauthorized crossings, and aerial surveillance threats in real time.",
    image: "/images/pages/border-hero.jpg",
    href: "/solutions/border-security",
    tag: "Sovereignty",
  },
  {
    title: "VIP Protection",
    description:
      "Discreet, comprehensive counter-drone security for executives, dignitaries, and high-profile events. Man-packable and vehicle-mounted options with silent neutralization capabilities.",
    image: "/images/pages/vip-hero.jpg",
    href: "/solutions/vip-protection",
    tag: "Executive",
  },
  {
    title: "Prisons",
    description:
      "Stop contraband delivery by drone before it reaches inmates. Automated detection and interdiction systems designed for correctional facility perimeters of any size.",
    image: "/images/pages/prisons-hero.jpg",
    href: "/solutions/prisons",
    tag: "Corrections",
  },
  {
    title: "Urban Security",
    description:
      "Smart city integration for municipal drone detection and mitigation. Protect public events, government buildings, and dense urban populations from unauthorized and malicious UAS activity.",
    image: "/images/pages/urban-hero.jpg",
    href: "/solutions/urban-security",
    tag: "Municipal",
  },
  {
    title: "Maritime",
    description:
      "Port security, offshore asset protection, and strategic waterway monitoring. Defend vessels, oil platforms, and naval installations from drone-borne threats at sea.",
    image: "/images/pages/maritime-hero.jpg",
    href: "/solutions/maritime",
    tag: "Naval",
  },
];

const stats = [
  { value: "8", label: "Solution Domains" },
  { value: "47+", label: "Countries Deployed" },
  { value: "99.7%", label: "Detection Rate" },
  { value: "2.1s", label: "Avg. Response Time" },
  { value: "24/7", label: "Always Operational" },
];

export default function SolutionsPage() {
  return (
    <main>
      <SectionHero
        image="/images/pages/solutions-hero.jpg"
        label="Aegis Defense Systems"
        title="Solutions"
        subtitle="Protecting What Matters Most"
        cta="Request Briefing"
        ctaHref="/request-demo"
      />

      <Callout>
        Every critical asset — military, civilian, or sovereign — faces an
        evolving aerial threat. Aegis delivers the intelligence and
        interdiction capabilities to neutralize it before harm is done.
      </Callout>

      <StatsSection stats={stats} label="By the Numbers" />

      <CardGrid
        label="Our Solutions"
        title="Domain-Specific Defense"
        cards={solutionCards}
      />

      <CTASection
        title="Find Your Solution"
        subtitle="Our team will design a tailored Counter-UAS architecture for your operational environment."
        primaryCta="Schedule Consultation"
        primaryHref="/request-demo"
        secondaryCta="Explore Technology"
        secondaryHref="/technology"
      />
    </main>
  );
}
