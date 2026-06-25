"use client";

import {
  SectionHero,
  Callout,
  FeatureList,
  SpecTable,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function ClassificationPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/classification-hero.jpg"
        label="Classification"
        title="Know the Threat in 20ms"
        subtitle="Deep learning models trained on 12 million signal signatures classify threats by type, manufacturer, intent, and payload — giving operators decision-quality intelligence before the drone reaches its target."
        cta="Request Briefing"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="left"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Aegis ML-driven classification engine processes radar micro-Doppler
        signatures, RF protocol fingerprints, acoustic harmonics, and visual
        features to produce a complete threat assessment in 20 milliseconds —
        distinguishing friendly from hostile, identifying payload type, and
        predicting intent with 98.9% accuracy across 350+ drone models.
      </Callout>

      <AnimatedLine />

      {/* ── CLASSIFICATION FEATURES ── */}
      <FeatureList
        label="Classification Engine"
        title="Identify. Assess. Decide."
        items={[
          {
            title: "Multi-Modal Fusion",
            description:
              "Classification leverages all four sensor modalities simultaneously — radar micro-Doppler returns reveal blade count and RPM, RF fingerprints identify manufacturer and firmware version, acoustic signatures distinguish motor types, and EO/IR imagery confirms airframe configuration. The fusion architecture weights each modality dynamically based on environmental conditions, ensuring robust classification even when individual sensors are degraded or jammed.",
          },
          {
            title: "Threat Library",
            description:
              "A continuously updated library of 350+ drone models from 80 manufacturers — including commercial platforms from DJI, Autel, Parrot, and Skydio, military-grade UAVs from 15 nations, and custom-built threat configurations observed in the field. Each entry includes multi-spectral signature data, typical payload configurations, known vulnerability profiles, and recommended countermeasures.",
          },
          {
            title: "Intent Assessment",
            description:
              "Behavioral analysis models evaluate trajectory, approach vector, speed profile, and flight pattern against a database of known attack, surveillance, and delivery profiles. The system classifies intent as reconnaissance, payload delivery, swarm coordination, or diversionary — enabling rules-of-engagement-compliant response before hostile action is taken.",
          },
          {
            title: "Payload Estimation",
            description:
              "Micro-Doppler analysis and flight dynamics modeling estimate payload mass to within 200 grams, enabling operators to assess whether a drone carries a camera, explosive ordnance, chemical dispersal system, or contraband. Payload classification directly informs neutralization strategy and rules-of-engagement compliance — a drone carrying 2 kg of explosives demands a different response than one carrying a GoPro.",
          },
          {
            title: "Friend-or-Foe Discrimination",
            description:
              "Aegis integrates with NATO Mode 5 IFF, ADS-B transponders, and operator-defined friendly drone registries to prevent blue-on-blue engagement. Signal fingerprinting also identifies friendly drones that have been captured and repurposed — detecting anomalies in command-link behavior that indicate hostile takeover of friendly assets.",
          },
          {
            title: "Swarm Detection",
            description:
              "Coordinated behavior analysis identifies swarm signatures — consistent inter-drone spacing, synchronized heading changes, and relay communication patterns — even when individual drones appear to operate independently. Swarm classification triggers automated escalation protocols and coordinates multi-target neutralization sequences to defeat the formation as a system rather than engaging individual units.",
          },
        ]}
      />

      {/* ── SPEC TABLE ── */}
      <SpecTable
        label="Technical Specifications"
        title="Classification Performance"
        specs={[
          { label: "Classification Latency", value: "<20 ms" },
          { label: "Drone Models in Library", value: "350+" },
          { label: "Manufacturers Covered", value: "80+" },
          { label: "Classification Accuracy", value: "98.9%" },
          { label: "Intent Assessment Accuracy", value: "94.7%" },
          { label: "Payload Estimation Accuracy", value: "±200 g" },
          { label: "Friend-or-Foe Discrimination", value: "Mode 5 IFF + ADS-B + Registry" },
          { label: "Swarm Detection", value: "200+ drone formations" },
          { label: "Training Dataset", value: "12 million signatures" },
          { label: "Model Update Cycle", value: "Continuous (OTA)" },
          { label: "False Positive Rate", value: "<0.1%" },
          { label: "Zero-Shot Classification", value: "Unknown threat detection" },
          { label: "Signature Modalities", value: "Radar + RF + Acoustic + EO/IR" },
          { label: "Edge Deployment", value: "NVIDIA Jetson / Intel Movidius" },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Classify with Confidence"
        subtitle="See how Aegis classification turns raw sensor data into decision-quality intelligence in the time it takes to blink."
        primaryCta="Request Briefing"
        primaryHref="/request-demo"
        secondaryCta="Next: Neutralization"
        secondaryHref="/capabilities/neutralization"
      />
    </>
  );
}
