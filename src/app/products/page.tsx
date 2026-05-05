"use client";

import {
  SectionHero,
  Callout,
  FeatureList,
  CTASection,
  ImageBreak,
  StatsSection,
} from "@/components/sections";

export default function ProductsPage() {
  return (
    <>
      <SectionHero
        image="/images/pages/products-hero.jpg"
        label="Platforms"
        title="Built for Every Mission"
        subtitle="Eight purpose-engineered counter-UAS platforms. From fixed strategic installations to individual soldier protection — every threat vector covered."
        cta="Explore Platforms"
        ctaHref="#platforms"
      />

      <Callout>
        The Aegis platform family represents the most comprehensive counter-UAS
        capability ever assembled — a unified architecture spanning detection,
        tracking, classification, and neutralization across every operational
        domain.
      </Callout>

      <StatsSection
        label="Platform Family"
        stats={[
          { value: "8", label: "Platforms" },
          { value: "500+", label: "Max Targets" },
          { value: "20ms", label: "Classification" },
          { value: "12km", label: "Detection Range" },
          { value: "360°", label: "Coverage" },
        ]}
      />

      <ImageBreak image="/images/pages/products-defense.jpg" height="50vh" />

      <div id="platforms">
        <FeatureList
          label="Platform Family"
          title="Every Mission. Every Domain."
          items={[
            {
              title: "Aegis Core",
              description:
                "The flagship fixed-site Counter-UAS platform. Simultaneously tracks 500+ targets with 50Hz update rate and 20ms AI classification. The world's most capable C-UAS system — designed for strategic installations, military bases, and critical infrastructure protection.",
              href: "/products/aegis-core",
              tag: "500+ Targets · 50Hz · 20ms",
            },
            {
              title: "Aegis Tactical",
              description:
                "Rapid-deploy mobile counter-UAS platform for forward operating bases and expeditionary missions. Tracks 200+ targets with 25Hz update rate. Vehicle-mountable with full operational capability in under 30 minutes from arrival.",
              href: "/products/aegis-tactical",
              tag: "200+ Targets · 25Hz · Mobile",
            },
            {
              title: "Aegis Mobile",
              description:
                "Man-packable RF direction-finding system for individual soldier and small unit protection. Tracks 50+ targets with precision RF DF and jamming capability. Lightweight, battery-powered, and operational in under 5 minutes.",
              href: "/products/aegis-mobile",
              tag: "50+ Targets · RF DF · Man-Packable",
            },
            {
              title: "Aegis Shield",
              description:
                "Passive defense system with 360° coverage and zero electromagnetic emissions. Detects and classifies UAS threats using acoustic, thermal, and visual sensors without revealing defensive positions. Ideal for covert operations and VIP protection.",
              href: "/products/aegis-shield",
              tag: "Passive Defense · 360° · Zero Emissions",
            },
            {
              title: "Aegis SkyWatch",
              description:
                "Long-range air surveillance platform providing persistent wide-area UAS detection and tracking. Extends the defensive perimeter to 50km+ with elevated sensor arrays and multi-domain awareness for strategic air sovereignty.",
              href: "/products/aegis-skywatch",
              tag: "Air Surveillance · Long-Range · Persistent",
            },
            {
              title: "Aegis Command",
              description:
                "Unified battle management and C2 system for coordinating multi-platform counter-UAS operations. Integrates kill chain automation, multi-domain coordination, and real-time situational awareness across all Aegis platforms and third-party systems.",
              href: "/products/aegis-command",
              tag: "Battle Management · C2 · Kill Chain",
            },
            {
              title: "Aegis Sentinel",
              description:
                "Autonomous sentry system with AI-driven threat assessment and autonomous engagement capabilities. Provides 24/7 persistent vigilance with minimal human oversight — autonomous detect-track-classify-neutralize cycles in under 15 seconds.",
              href: "/products/aegis-sentinel",
              tag: "Autonomous · AI-Driven · Sentry",
            },
            {
              title: "Aegis Integrator",
              description:
                "Multi-system integration platform connecting disparate C-UAS sensors, effectors, and command systems through an API-first architecture. Supports multi-vendor interoperability, legacy system bridging, and STANAG compliance for coalition operations.",
              href: "/products/aegis-integrator",
              tag: "Integration · API-First · Multi-Vendor",
            },
          ]}
        />
      </div>

      <ImageBreak image="/images/pages/mobile-vehicle.jpg" height="60vh" />

      <CTASection
        title="Ready to Deploy"
        subtitle="Every Aegis platform is combat-proven, NATO-interoperable, and available for classified briefings."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Compare Platforms"
        secondaryHref="/products"
      />
    </>
  );
}
