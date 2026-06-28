"use client";

import {
  SectionHero,
  Callout,
  FeatureList,
  SpecTable,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function CommandControlPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/command-hero.jpg"
        label="Command & Control"
        title="One Picture. Complete Control."
        subtitle="A unified common operating picture fuses every sensor, every track, and every effector into a single decision-quality display — giving commanders the situational awareness to act with speed and confidence."
        cta="Request Briefing"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="left"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Aegis C2 architecture provides a single source of truth for the
        counter-UAS battle — fusing distributed sensor data, automating
        engagement workflows, and coordinating multi-echelon response from
        tactical operator to strategic commander with sub-second latency.
      </Callout>

      <AnimatedLine />

      {/* ── C2 FEATURES ── */}
      <FeatureList
        label="C2 Architecture"
        title="Command at Every Echelon"
        items={[
          {
            title: "Common Operating Picture",
            description:
              "A single, authoritative air picture assembled from all sensor feeds and track data — displayed on a geospatial canvas with 3D terrain, satellite imagery, and real-time weather overlay. Operators see every detected, tracked, and classified threat in relation to protected assets, exclusion zones, and friendly forces. The COP updates at 1 Hz with sub-100 ms latency from sensor to display, ensuring decision currency even in fast-moving swarm scenarios.",
          },
          {
            title: "Automated Engagement Workflows",
            description:
              "Configurable decision trees automate the kill chain from classification to neutralization — reducing human decision time from minutes to seconds. Operators configure rules of engagement, threat prioritization, and effector allocation policies; the system executes within those boundaries, presenting recommendations for approval or operating in full autonomous mode when authorized. Every automated action is logged with timestamp, rationale, and operator context for post-mission review.",
          },
          {
            title: "Multi-Echelon Coordination",
            description:
              "Aegis C2 scales from a single operator at a tactical node to a distributed command network spanning continents. Tactical operators engage individual threats; regional coordinators manage resource allocation across multiple sites; strategic commanders monitor aggregate threat posture and force readiness. Each echelon sees the appropriate level of detail — with unified data ensuring that everyone operates from the same picture.",
          },
          {
            title: "Threat Prioritization Engine",
            description:
              "AI-driven threat ranking evaluates every detected target against configurable criteria — proximity to protected assets, estimated payload, approach velocity, and classification confidence. The prioritization engine continuously re-ranks as new data arrives, ensuring that the most dangerous threat is always at the top of the operator's queue. Swarm threats are ranked as a system, with the formation's collective threat level driving engagement priority.",
          },
          {
            title: "Resource Management",
            description:
              "Automated effector allocation considers sensor geometry, effector availability, engagement envelopes, and rules of engagement to recommend the optimal neutralization method for each threat. The resource manager prevents double-targeting, ensures effector redundancy for high-value threats, and maintains reserve capacity for follow-on engagements — all while respecting per-engagement cost constraints and munitions inventory levels.",
          },
          {
            title: "Mission Replay & Analytics",
            description:
              "Full mission recording captures every sensor detection, track update, classification decision, engagement action, and operator input with nanosecond timestamps. Post-mission replay enables forensic analysis, training, and after-action review. Built-in analytics generate statistical summaries of engagement performance, false alarm rates, and system availability — supporting continuous operational improvement and compliance reporting.",
          },
        ]}
      />

      {/* ── SPEC TABLE ── */}
      <SpecTable
        label="Technical Specifications"
        title="C2 Performance"
        specs={[
          { label: "Display Latency", value: "<100 ms sensor-to-screen" },
          { label: "COP Update Rate", value: "1 Hz" },
          { label: "Concurrent Operators", value: "100+" },
          { label: "Echelon Levels", value: "3 (Tactical / Regional / Strategic)" },
          { label: "Automated Workflows", value: "Configurable decision trees" },
          { label: "Threat Prioritization", value: "AI-driven real-time ranking" },
          { label: "Effector Allocation", value: "Automated with operator approval" },
          { label: "Mission Recording", value: "Full chain-of-custody logging" },
          { label: "Analytics", value: "Built-in statistical dashboard" },
          { label: "Network Topology", value: "Mesh + Star hybrid" },
          { label: "Data Encryption", value: "AES-256 + TLS 1.3" },
          { label: "Classification Handling", value: "Up to NATO SECRET" },
          { label: "API Access", value: "REST + gRPC + WebSocket" },
          { label: "Deployment", value: "On-premise / Air-gapped / Cloud" },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Take Command of Your Airspace"
        subtitle="See how Aegis C2 gives every operator and commander the situational awareness and decision support to act decisively."
        primaryCta="Request Briefing"
        primaryHref="/request-demo"
        secondaryCta="Next: Integration"
        secondaryHref="/capabilities/integration"
      />
    </>
  );
}
