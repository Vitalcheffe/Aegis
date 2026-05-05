"use client";

import {
  ProductHero,
  Callout,
  SplitSection,
  SpecTable,
  CTASection,
  ImageBreak,
  StatsSection,
} from "@/components/sections";

export default function AegisSentinelPage() {
  return (
    <>
      <ProductHero
        image="/images/pages/aegis-sentinel-hero.jpg"
        label="Autonomous Sentry"
        title="Aegis Sentinel"
        subtitle="AI-driven autonomous counter-UAS sentry providing 24/7 persistent vigilance with minimal human oversight — autonomous detect-track-classify-neutralize cycles in under 15 seconds."
        specs={[
          { value: "AI", label: "Decision Engine" },
          { value: "<15s", label: "Full Cycle" },
          { value: "24/7", label: "Autonomous Ops" },
          { value: "150+", label: "Targets Tracked" },
        ]}
      />

      <Callout>
        The adversary never sleeps. Neither does Aegis Sentinel — an autonomous
        sentry that watches, decides, and acts without fatigue, hesitation, or
        delay. Human oversight where it matters. Machine speed where it counts.
      </Callout>

      <SplitSection
        image="/images/pages/sentinel-ai-neural.jpg"
        label="AI Decision-Making"
        title="Intelligence at the Edge"
        description="Aegis Sentinel's AI decision engine represents a fundamental advance in autonomous weapon systems — a multi-layered neural architecture that performs real-time threat assessment, rules-of-engagement compliance verification, and engagement authorization within a rigorous ethical and operational framework. The primary classification network identifies and categorizes UAS threats with 99.1% accuracy using multi-modal sensor fusion data. The secondary assessment network evaluates each classified threat against the configured ROE matrix, weighing threat priority, proximity to protected assets, collateral risk, and proportional response requirements. The tertiary decision network generates and evaluates engagement options, selecting the optimal effector and engagement geometry while verifying exclusion zones and deconfliction with friendly forces. Every autonomous decision is logged with full audit trail for post-engagement review and legal compliance verification."
        stats={[
          { value: "99.1%", label: "Classification Accuracy" },
          { value: "3", label: "Neural Layers" },
          { value: "100%", label: "Audit Trail" },
        ]}
      />

      <SplitSection
        image="/images/pages/sentinel-tower.jpg"
        label="Autonomous Engagement"
        title="Decide and Act at Machine Speed"
        description="The autonomous engagement capability of Aegis Sentinel compresses the entire detect-to-neutralize cycle to under 15 seconds — a timeline that no human operator can consistently achieve across thousands of hours of continuous watch. The system maintains persistent surveillance of the assigned sector, automatically detecting and classifying every airborne contact within its coverage volume. When a threat meets the autonomous engagement criteria defined in the ROE matrix, Sentinel executes the engagement without waiting for human authorization — selecting the appropriate effector, computing the engagement geometry, and initiating neutralization. For threats that fall outside autonomous engagement authority, the system alerts the human supervisor with a prioritized threat assessment and recommended action, enabling rapid authorization with a single confirmation input. The transition between autonomous and supervised modes is seamless, configurable per sector and threat category."
        reverse
        stats={[
          { value: "<15s", label: "Full Cycle" },
          { value: "24/7", label: "No Fatigue" },
          { value: "Seamless", label: "Mode Transition" },
        ]}
      />

      <SplitSection
        image="/images/pages/sentinel-watch.jpg"
        label="Persistent Vigilance"
        title="The Watch That Never Ends"
        description="Aegis Sentinel is designed for extended autonomous operation in remote, austere, and contested environments where continuous human presence is impractical or impossible. The system operates from fixed installations, perimeter towers, and vehicle-mounted configurations, drawing power from grid connections, solar arrays, or fuel cells depending on the deployment scenario. Automated health monitoring and self-test routines ensure continuous operational readiness, with predictive maintenance algorithms scheduling service interventions before component failures occur. The sensor suite maintains full detection capability across day, night, and degraded visibility conditions through its multi-modal architecture — radar for all-weather primary detection, EO/IR for visual confirmation, acoustic for low-RCS targets, and RF for command link detection. Sentinel communicates with the broader Aegis network through encrypted tactical data links, contributing its track data to the common operational picture while receiving updated threat libraries and ROE configurations from the command authority."
        stats={[
          { value: "90+", label: "Days Autonomous" },
          { value: "4", label: "Sensor Modalities" },
          { value: "Predictive", label: "Maintenance" },
        ]}
      />

      <ImageBreak image="/images/pages/sentinel-watch.jpg" height="50vh" />

      <StatsSection
        label="Sentinel Performance"
        stats={[
          { value: "150+", label: "Targets Tracked" },
          { value: "<15s", label: "Engagement Cycle" },
          { value: "99.1%", label: "Classification" },
          { value: "24/7", label: "Autonomous Ops" },
          { value: "90+", label: "Days Unattended" },
        ]}
      />

      <SpecTable
        label="Technical Specifications"
        title="Aegis Sentinel — Full Specification"
        specs={[
          { label: "Detection Range", value: "10 km (small UAS Class I)" },
          { label: "Tracking Capacity", value: "150+ simultaneous targets" },
          { label: "Update Rate", value: "30 Hz" },
          { label: "Classification Accuracy", value: "99.1% (multi-modal fusion)" },
          { label: "Autonomous Cycle Time", value: "<15 seconds (detect-to-neutralize)" },
          { label: "Classification Latency", value: "<25 ms" },
          { label: "Sensor Modalities", value: "Radar, EO/IR, Acoustic, RF" },
          { label: "Effector Types", value: "RF Jamming, GPS Spoofing, DEW (optional)" },
          { label: "Coverage", value: "360° azimuth, -5° to +80° elevation" },
          { label: "Autonomous Endurance", value: "90+ days (solar/fuel cell)" },
          { label: "AI Architecture", value: "3-layer neural (classify-assess-decide)" },
          { label: "ROE Compliance", value: "Configurable, verified per engagement" },
          { label: "Audit Trail", value: "100% decision logging, encrypted storage" },
          { label: "Power (Grid)", value: "3.5 kW operational" },
          { label: "Power (Off-Grid)", value: "Solar + fuel cell hybrid" },
          { label: "Weight (System Total)", value: "2,800 kg" },
          { label: "Operating Temperature", value: "-40°C to +55°C" },
          { label: "Wind Survival", value: "Up to 160 km/h" },
          { label: "Setup Time", value: "6 hours (full autonomous operational)" },
          { label: "Crew Requirement", value: "0 (autonomous), 1 (supervised)" },
          { label: "Communications", value: "STANAG 4586, encrypted tactical data link" },
          { label: "Classification", value: "NATO SECRET / ITAR Controlled" },
          { label: "MTBF", value: ">12,000 hours" },
        ]}
      />

      <CTASection
        title="Never Stop Watching"
        subtitle="Aegis Sentinel provides autonomous counter-UAS defense where human presence is limited. Evaluate persistent autonomous sentry for your remote and critical installations."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Platforms"
        secondaryHref="/products"
      />
    </>
  );
}
