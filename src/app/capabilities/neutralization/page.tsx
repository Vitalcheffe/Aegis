"use client";

import {
  SectionHero,
  Callout,
  SplitSection,
  SpecTable,
  CTASection,
  AnimatedLine,
  ImageBreak,
} from "@/components/sections";

export default function NeutralizationPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/neutralization-hero.jpg"
        label="Neutralization"
        title="Graduated Response. Decisive Action."
        subtitle="From non-kinetic RF disruption to directed energy and kinetic interceptors — Aegis delivers proportionate, compliant, and effective countermeasures across the full engagement spectrum."
        cta="Request Briefing"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="left"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Aegis graduated response architecture ensures that every countermeasure is
        proportionate to the threat, compliant with rules of engagement, and
        executed with full audit trail — from RF jamming and GPS spoofing through
        directed energy and kinetic interception, operators choose the right tool
        for the right threat at the right time.
      </Callout>

      <AnimatedLine />

      {/* ── RF JAMMING ── */}
      <SplitSection
        image="/images/pages/neutralization-jamming.jpg"
        label="Effect Mode 01"
        title="RF Jamming"
        description="Precision directional jamming disrupts drone command-and-control links and GPS navigation with surgical selectivity — neutralizing the threat while minimizing collateral interference to friendly communications and civilian infrastructure. Cognitive jamming algorithms adapt in real-time to frequency-hopping and spread-spectrum protocols, maintaining disruption effectiveness against even the most sophisticated anti-jam receivers. Power management ensures that jamming energy is focused on the target with spillover reduced by 40 dB, enabling safe operation near airports and populated areas."
        cta="Explore Detection"
        ctaHref="/capabilities/detection"
        stats={[
          { value: "40 dB", label: "Spillover Suppression" },
          { value: "<2 s", label: "Time-to-Effect" },
        ]}
      />

      {/* ── DIRECTED ENERGY ── */}
      <SplitSection
        image="/images/pages/neutralization-laser.jpg"
        label="Effect Mode 02"
        title="Directed Energy"
        description="High-energy laser systems deliver decisive kinetic-grade neutralization without projectile expenditure or fragmentation risk. The Aegis DEW module engages targets at ranges up to 3 km with continuous-wave and pulsed modes optimized for different airframe materials — melting plastic housings, detonating explosive payloads, or disabling control surfaces with surgical precision. Adaptive optics compensate for atmospheric turbulence in real-time, maintaining beam quality and spot size across the full engagement envelope."
        cta="Explore Classification"
        ctaHref="/capabilities/classification"
        reverse
        stats={[
          { value: "3 km", label: "Engagement Range" },
          { value: "Surgical", label: "Precision" },
        ]}
      />

      {/* ── IMAGE BREAK ── */}
      <ImageBreak
        image="/images/pages/neutralization-kinetic.jpg"
        height="50vh"
        overlay="bg-black/50"
      />

      {/* ── KINETIC OPTIONS ── */}
      <SplitSection
        image="/images/pages/neutralization-hero.jpg"
        label="Effect Mode 03"
        title="Kinetic Options"
        description="For high-value or armored threats that resist non-kinetic countermeasures, Aegis integrates with kinetic interceptor systems including guided missiles, programmable airburst munitions, and net capture devices. The fire control solution leverages the same tracking and classification data that drives the kill chain, ensuring first-round hit probability above 97%. Integration supports both gun-based and missile-based interceptors with automatic ballistic computation, wind compensation, and lead angle optimization."
        cta="Explore Command & Control"
        ctaHref="/capabilities/command-control"
        stats={[
          { value: "97%+", label: "First-Round Hit Pk" },
          { value: "Multi-Type", label: "Interceptor Support" },
        ]}
      />

      {/* ── SPEC TABLE ── */}
      <SpecTable
        label="Technical Specifications"
        title="Neutralization Performance"
        specs={[
          { label: "RF Jamming Bands", value: "300 MHz – 6 GHz" },
          { label: "Jamming Effective Range", value: "8 km" },
          { label: "GPS Spoofing Range", value: "10 km" },
          { label: "Spillover Suppression", value: "40 dB" },
          { label: "Cognitive Jamming", value: "Adaptive frequency-hopping" },
          { label: "DEW Type", value: "Fiber Laser (CW + Pulsed)" },
          { label: "DEW Power", value: "10–50 kW (scalable)" },
          { label: "DEW Engagement Range", value: "3 km" },
          { label: "Kinetic Hit Probability", value: ">97%" },
          { label: "Time-to-Effect (RF)", value: "<2 seconds" },
          { label: "Time-to-Effect (DEW)", value: "<5 seconds" },
          { label: "Rules of Engagement", value: "Configurable per-mission" },
          { label: "Audit Trail", value: "Full chain-of-custody" },
          { label: "Collateral Risk", value: "Minimal (non-kinetic preferred)" },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Neutralize Any Threat. Proportionately."
        subtitle="From warning to elimination — see how Aegis graduated response gives operators the right tool for every scenario."
        primaryCta="Request Briefing"
        primaryHref="/request-demo"
        secondaryCta="Next: Command & Control"
        secondaryHref="/capabilities/command-control"
      />
    </>
  );
}
