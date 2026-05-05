"use client";

import {
  SectionHero,
  Callout,
  StatsSection,
  FeatureList,
  CTASection,
  AnimatedLine,
  ImageBreak,
} from "@/components/sections";

export default function CapabilitiesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/capabilities-hero.jpg"
        label="Capabilities"
        title="Full-Spectrum Counter-UAS"
        subtitle="From first detection to final neutralization, Aegis covers every phase of the counter-UAS kill chain with unmatched speed, precision, and reliability."
        cta="Request Briefing"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Aegis covers every phase of the counter-unmanned aerial threat lifecycle
        — detection, tracking, classification, neutralization, command and control,
        and multi-system integration — in a single, hardened, deployable platform.
      </Callout>

      <AnimatedLine />

      {/* ── CAPABILITIES LIST ── */}
      <FeatureList
        label="Six Capabilities"
        title="Complete Kill Chain Coverage"
        items={[
          {
            title: "Detection",
            description:
              "Multi-spectral sensor fusion across S-Band radar, RF direction finding, electro-optical/infrared cameras, and acoustic arrays. Detects micro-drones at 15 km, fixed-wing UAVs at 35 km, and swarm signatures at 25 km — with 360° coverage and zero blind spots.",
            href: "/capabilities/detection",
            tag: "Phase 01",
          },
          {
            title: "Tracking",
            description:
              "Iterated Multi-Model Unscented Kalman Filter maintains firm track on 500+ concurrent targets with sub-meter positional accuracy. Automatic track initiation, multi-sensor correlation, and seamless handoff between distributed sensor nodes.",
            href: "/capabilities/tracking",
            tag: "Phase 02",
          },
          {
            title: "Classification",
            description:
              "Deep learning models trained on 12 million signal signatures classify threats by type, manufacturer, intent, and payload in 20 milliseconds. Distinguishes friendly from hostile, identifies swarm behavior, and predicts threat trajectory with 98.9% accuracy.",
            href: "/capabilities/classification",
            tag: "Phase 03",
          },
          {
            title: "Neutralization",
            description:
              "Graduated response architecture from RF jamming and GPS spoofing to directed energy and kinetic interceptors. Rules-of-engagement engine ensures proportional, legally compliant countermeasures with full chain-of-custody audit trail.",
            href: "/capabilities/neutralization",
            tag: "Phase 04",
          },
          {
            title: "Command & Control",
            description:
              "Unified common operating picture fusing all sensor and effector nodes into a single decision-quality display. Real-time situational awareness, automated engagement workflows, and multi-echelon coordination from tactical to strategic.",
            href: "/capabilities/command-control",
            tag: "C2",
          },
          {
            title: "Integration",
            description:
              "Middleware layer connecting Aegis to third-party sensors, effectors, and command networks. Supports STANAG 4671, JADC2, ATAK, MOSA, and custom REST/gRPC APIs with sub-100ms latency data bridging across all domain boundaries.",
            href: "/capabilities/integration",
            tag: "Interoperability",
          },
        ]}
      />

      {/* ── IMAGE BREAK ── */}
      <ImageBreak
        image="/images/pages/command-hero.jpg"
        height="50vh"
        overlay="bg-black/50"
      />

      {/* ── STATS ── */}
      <StatsSection
        label="Performance Metrics"
        stats={[
          { value: "<20 ms", label: "Classification Speed" },
          { value: "500+", label: "Concurrent Tracks" },
          { value: "98.9%", label: "Detection Accuracy" },
          { value: "12", label: "Nations Deployed" },
          { value: "35 km", label: "Max Detection Range" },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="See Every Phase in Action"
        subtitle="Request a classified technical briefing and witness the complete Aegis kill chain — from first detection to final neutralization."
        primaryCta="Request Briefing"
        primaryHref="/request-demo"
        secondaryCta="View Products"
        secondaryHref="/products"
      />
    </>
  );
}
