"use client";

import {
  SectionHero,
  Callout,
  FeatureList,
  SpecTable,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function TrackingPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/tracking-hero.jpg"
        label="Tracking"
        title="500 Targets. Zero Escapes."
        subtitle="Iterated Multi-Model Unscented Kalman Filter maintains firm, continuous track on hundreds of concurrent threats with sub-meter accuracy — even through maneuvering, jamming, and sensor handoff."
        cta="Request Briefing"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="left"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Aegis tracking architecture combines Iterated Multi-Model Unscented Kalman
        Filters with deep learning trajectory prediction to maintain unbroken track
        custody across 500+ concurrent targets — even through high-G maneuvers,
        electronic countermeasures, and multi-sensor handoff scenarios.
      </Callout>

      <AnimatedLine />

      {/* ── TRACKING FEATURES ── */}
      <FeatureList
        label="Tracking Architecture"
        title="Maintain Custody. Never Lose Contact."
        items={[
          {
            title: "IMM-UKF Filtering",
            description:
              "The Iterated Multi-Model Unscented Kalman Filter runs multiple motion models in parallel — constant velocity, coordinated turn, and acceleration — switching between them in real-time based on likelihood scoring. This enables unbroken tracking through aggressive maneuvers that defeat single-model trackers, maintaining track custody through 8G turns and altitude excursions with zero track drops.",
          },
          {
            title: "Multi-Sensor Correlation",
            description:
              "Distributed sensor nodes feed into a centralized correlation engine that fuses radar, RF, EO/IR, and acoustic tracks into a single authoritative track file. Measurement-to-track association uses probabilistic data association (PDA) with gating algorithms that handle dense target environments and swarm formations without track swapping or loss.",
          },
          {
            title: "Automatic Track Initiation",
            description:
              "New tracks are initiated automatically from as few as three sensor detections, with configurable confirmation logic that adapts to the operational environment. Track-before-detect algorithms process low-SNR returns to initiate tracks on stealth-configured UAVs that would be invisible to conventional systems, reducing time-to-first-track by 60%.",
          },
          {
            title: "Seamless Sensor Handoff",
            description:
              "As targets transit between sensor coverage zones, Aegis performs automatic track handoff with zero loss of track custody. Handoff decisions consider sensor geometry, target kinematics, and current environmental conditions — selecting the optimal sensor mix to maintain tracking quality while preserving sensor resources for other threats.",
          },
          {
            title: "Trajectory Prediction",
            description:
              "Deep learning models trained on 8 million flight trajectories predict future threat positions up to 30 seconds ahead with 95% accuracy. This enables pre-emptive effector allocation, early warning for protected assets, and proactive neutralization planning — turning reactive tracking into predictive defense.",
          },
          {
            title: "Swarm Tracking",
            description:
              "Specialized swarm-tracking algorithms maintain individual track custody on up to 200 drones in coordinated formation, even when formation geometry changes, drones cross paths, or individual units maneuver independently. Swarm-level and individual-level track files are maintained simultaneously, supporting both tactical engagement and strategic threat assessment.",
          },
        ]}
      />

      {/* ── SPEC TABLE ── */}
      <SpecTable
        label="Technical Specifications"
        title="Tracking Performance"
        specs={[
          { label: "Concurrent Tracks", value: "500+" },
          { label: "Positional Accuracy", value: "<1 m CEP" },
          { label: "Velocity Accuracy", value: "<0.5 m/s" },
          { label: "Track Update Rate", value: "1 Hz minimum" },
          { label: "Track Initiation", value: "3 detections" },
          { label: "Track Continuity", value: "99.7% through maneuver" },
          { label: "Swarm Resolution", value: "200 individual tracks" },
          { label: "Prediction Horizon", value: "30 seconds" },
          { label: "Prediction Accuracy", value: "95% at 10 s" },
          { label: "Sensor Handoff Latency", value: "<100 ms" },
          { label: "Track Association", value: "Probabilistic (PDA)" },
          { label: "Filter Architecture", value: "IMM-UKF (3 models)" },
          { label: "Track File History", value: "72 hours retained" },
          { label: "Multi-Sensor Fusion", value: "Radar + RF + EO/IR + Acoustic" },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Never Lose a Threat"
        subtitle="Discover how Aegis tracking maintains unbroken custody through any scenario — from single drone incursions to coordinated swarm attacks."
        primaryCta="Request Briefing"
        primaryHref="/request-demo"
        secondaryCta="Next: Classification"
        secondaryHref="/capabilities/classification"
      />
    </>
  );
}
