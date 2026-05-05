"use client";

import {
  SectionHero,
  Callout,
  StatsSection,
  FeatureList,
  ImageBreak,
  SplitSection,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function CompanyPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/company-hero.jpg"
        label="Company"
        title="Building the Future of Defense"
        subtitle="Aegis Defense Systems is the world's leading counter-UAS company — engineering the integrated platforms that detect, track, classify, and neutralize unmanned aerial threats across every domain and every theater of operation."
        cta="Learn Our Story"
        ctaHref="/about"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Aegis Defense Systems was founded on a singular conviction: that the
        proliferation of unmanned aerial systems demands an entirely new category
        of defense technology — one built from the ground up for speed,
        precision, and operational resilience in the most contested environments
        on Earth.
      </Callout>

      <AnimatedLine />

      {/* ── STATS ── */}
      <StatsSection
        label="By the Numbers"
        stats={[
          { value: "800+", label: "Employees" },
          { value: "12", label: "Nations" },
          { value: "$2.4B", label: "Valuation" },
          { value: "240+", label: "Deployed Systems" },
          { value: "15", label: "Patents" },
        ]}
      />

      {/* ── MISSION ── */}
      <SplitSection
        image="/images/pages/company-mission.jpg"
        label="Our Mission"
        title="Defend the Skies. Protect the Ground."
        description="Our mission is to ensure that no unmanned aerial threat goes undetected or unneutralized. We build the integrated defense platforms that give military commanders, critical infrastructure operators, and security forces the decisive advantage against the fastest-evolving threat vector of the 21st century. From forward operating bases in active combat zones to civilian airports and government facilities, Aegis systems operate continuously — scanning, analyzing, and responding to threats faster than any human operator could. Every sensor we deploy, every algorithm we train, and every effector we integrate serves a single purpose: closing the kill chain before the adversary can complete theirs. This is not incremental improvement. This is a fundamental re-architecture of how democracies defend their airspace."
        cta="Explore Our Capabilities"
        ctaHref="/capabilities"
        stats={[
          { value: "<20 ms", label: "Kill Chain" },
          { value: "98.9%", label: "Accuracy" },
        ]}
      />

      {/* ── VISION ── */}
      <SplitSection
        image="/images/pages/company-vision.jpg"
        label="Our Vision"
        title="A World Where Airspace Is Always Secure"
        description="We envision a future where every nation, every installation, and every community has the ability to control its airspace with confidence. A future where the proliferation of commercial and military drones no longer represents an existential risk but a managed variable — detected, classified, and neutralized in real time by autonomous systems that operate with surgical precision and full accountability. Our vision extends beyond technology. We are building the institutional frameworks, international standards, and operational doctrines that will define how the world responds to aerial threats for decades to come. Through partnerships with NATO, allied militaries, and research institutions, we are establishing the norms and capabilities that will keep societies safe as the drone revolution accelerates."
        cta="Meet Our Partners"
        ctaHref="/about/partners"
        reverse
        stats={[
          { value: "12", label: "Allied Nations" },
          { value: "24/7", label: "Global Coverage" },
        ]}
      />

      {/* ── IMAGE BREAK ── */}
      <ImageBreak
        image="/images/pages/company-office.jpg"
        height="55vh"
        overlay="bg-black/40"
      />

      {/* ── CORE VALUES ── */}
      <FeatureList
        label="Core Values"
        title="What We Stand For"
        items={[
          {
            title: "Innovation",
            description:
              "We reject the status quo. Every system we build, every algorithm we train, and every protocol we establish pushes the boundary of what counter-UAS technology can achieve. Our research division operates at the frontier of sensor fusion, directed energy, and autonomous decision-making — ensuring our customers always hold the technological advantage. Innovation at Aegis is not aspirational; it is operational. We ship capabilities, not concepts.",
            tag: "Value 01",
          },
          {
            title: "Integrity",
            description:
              "In defense technology, integrity is non-negotiable. We build systems that make life-and-death decisions, and we take that responsibility with the utmost seriousness. Our AI classification models are auditable, our engagement rules are transparent, and our audit trails are immutable. We never ship a system we cannot explain, defend, or verify. Integrity also means honest communication with our customers, our partners, and the public — even when the truth is inconvenient.",
            tag: "Value 02",
          },
          {
            title: "Precision",
            description:
              "In the counter-UAS domain, approximation is failure. A near-miss classification can mean the difference between neutralizing a threat and allowing a payload through. Every component of our architecture — from sensor calibration to effector targeting — is engineered for sub-millimeter, sub-millisecond precision. We measure ourselves not against industry benchmarks but against the laws of physics, and we build systems that approach those limits.",
            tag: "Value 03",
          },
          {
            title: "Resilience",
            description:
              "Our systems operate where others fail — in contested electromagnetic environments, under cyber attack, in extreme weather, and in communications-denied scenarios. Resilience is engineered into every layer of the Aegis architecture: redundant sensor paths, fallback communication channels, autonomous local processing, and hardened physical enclosures rated to MIL-STD-810. When the environment turns hostile, Aegis keeps operating.",
            tag: "Value 04",
          },
          {
            title: "Partnership",
            description:
              "No single company can defend the world's airspace alone. We build deep, enduring partnerships with allied militaries, defense agencies, technology companies, and research institutions. Our integration platform is designed for interoperability — connecting seamlessly with NATO STANAG systems, JADC2 architectures, and third-party sensor networks. We succeed when our partners succeed, and we measure our impact by the security of the nations and installations we protect.",
            tag: "Value 05",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Join the Mission"
        subtitle="Whether you are a defense professional, a technology innovator, or a government decision-maker, Aegis offers the partnership and platform to make airspace security a reality."
        primaryCta="Request Demo"
        primaryHref="/request-demo"
        secondaryCta="View Open Positions"
        secondaryHref="/careers"
      />
    </>
  );
}
