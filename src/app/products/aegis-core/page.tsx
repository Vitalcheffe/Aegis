"use client";

import {
  ProductHero,
  Callout,
  SplitSection,
  SpecTable,
  QuoteSection,
  CTASection,
  ImageBreak,
  StatsSection,
  TextSection,
} from "@/components/sections";

export default function AegisCorePage() {
  return (
    <>
      <ProductHero
        image="/images/pages/aegis-core-hero.jpg"
        label="Flagship Platform"
        title="Aegis Core"
        subtitle="The world's most capable Counter-UAS platform — simultaneously tracking, classifying, and neutralizing 500+ unmanned aerial threats with 20-millisecond response latency."
        specs={[
          { value: "500+", label: "Simultaneous Targets" },
          { value: "50Hz", label: "Update Rate" },
          { value: "20ms", label: "Classification" },
          { value: "12km", label: "Detection Range" },
        ]}
      />

      <Callout>
        No other counter-UAS system on the planet can track and classify more
        than five hundred simultaneous threats with sub-twenty-millisecond
        latency. Aegis Core is not incremental improvement — it is a generation
        ahead.
      </Callout>

      <SplitSection
        image="/images/pages/aegis-core-fusion.jpg"
        label="Sensor Architecture"
        title="Multi-Spectral Sensor Fusion"
        description="Aegis Core simultaneously ingests data from radar, electro-optical, infrared, acoustic, and RF sensor arrays — fusing disparate signal modalities into a single coherent operational picture. The fusion engine processes over 2.4 million data points per second, correlating tracks across spectral domains to eliminate false positives and maintain positive identification even in dense electronic warfare environments. Each sensor modality reinforces the others: radar provides range and velocity, EO/IR delivers visual confirmation, acoustic arrays detect low-RCS drones, and RF sensors identify command links and autopilot signatures."
        stats={[
          { value: "2.4M", label: "Data Points/Sec" },
          { value: "5", label: "Sensor Modalities" },
          { value: "99.7%", label: "Fusion Accuracy" },
        ]}
      />

      <SplitSection
        image="/images/pages/aegis-core-ai.jpg"
        label="AI Engine"
        title="AI-Driven Classification"
        description="At the heart of Aegis Core lies a purpose-built neural architecture trained on over 14 million flight hours of UAS signature data spanning 2,800+ drone models from 47 countries. The classification engine delivers positive identification in under 20 milliseconds — distinguishing between commercial quadcopters, fixed-wing military UAVs, swarm components, and friendly assets with 99.4% accuracy. Continuous learning from operational deployments ensures the system evolves with the threat landscape, automatically updating classification models through encrypted over-the-air updates without operational downtime."
        reverse
        stats={[
          { value: "20ms", label: "Classification Speed" },
          { value: "2,800+", label: "Drone Models" },
          { value: "99.4%", label: "Accuracy" },
        ]}
      />

      <SplitSection
        image="/images/pages/aegis-core-effector.jpg"
        label="Effector Suite"
        title="Integrated Effector Management"
        description="Aegis Core coordinates the full spectrum of kinetic and non-kinetic effectors through a unified engagement management system. RF jamming disrupts command and control links, GPS spoofing diverts hostile drones to safe corridors, directed energy systems neutralize high-value targets, and kinetic interceptors provide the final layer of defense. The effector selection algorithm autonomously determines the optimal neutralization method based on target classification, threat priority, collateral risk assessment, and rules of engagement — ensuring proportionate and precise response to every classified threat."
        stats={[
          { value: "4", label: "Effector Types" },
          { value: "<3s", label: "Engagement Time" },
          { value: "0", label: "Collateral Incidents" },
        ]}
      />

      <ImageBreak image="/images/pages/command-dashboard.jpg" height="50vh" />

      <StatsSection
        label="Performance Metrics"
        stats={[
          { value: "500+", label: "Simultaneous Targets" },
          { value: "50Hz", label: "Track Update Rate" },
          { value: "20ms", label: "Classification Latency" },
          { value: "12km", label: "Detection Range" },
          { value: "99.4%", label: "Classification Accuracy" },
        ]}
      />

      <SpecTable
        label="Technical Specifications"
        title="Aegis Core — Full Specification"
        specs={[
          { label: "Detection Range", value: "12 km (small UAS Class I)" },
          { label: "Tracking Capacity", value: "500+ simultaneous targets" },
          { label: "Update Rate", value: "50 Hz" },
          { label: "Classification Accuracy", value: "99.4%" },
          { label: "Classification Latency", value: "<20 ms" },
          { label: "False Alarm Rate", value: "<0.01 per hour" },
          { label: "Sensor Modalities", value: "Radar, EO/IR, Acoustic, RF, LIDAR" },
          { label: "Effector Types", value: "RF Jamming, GPS Spoofing, DEW, Kinetic" },
          { label: "Engagement Time", value: "<3 seconds (detect-to-neutralize)" },
          { label: "Simultaneous Engagements", value: "Up to 24 concurrent" },
          { label: "Coverage", value: "360° azimuth, -10° to +85° elevation" },
          { label: "Power Requirements", value: "45 kW (operational), 15 kW (standby)" },
          { label: "Weight (System Total)", value: "8,200 kg" },
          { label: "Operating Temperature", value: "-40°C to +55°C" },
          { label: "Wind Survival", value: "Up to 150 km/h" },
          { label: "Setup Time", value: "4 hours (full operational capability)" },
          { label: "Crew Requirement", value: "3 operators (reduced to 1 in autonomous mode)" },
          { label: "Communications", value: "STANAG 4586, NATO C2, Link 16" },
          { label: "Classification", value: "NATO SECRET / ITAR Controlled" },
          { label: "MTBF", value: ">12,000 hours" },
        ]}
      />

      <QuoteSection
        quote="After eighteen months of operational evaluation across three theaters, Aegis Core has fundamentally altered our force protection posture. The speed and accuracy of threat classification is unmatched — we've achieved zero successful UAS penetrations of protected airspace since deployment."
        author="Major General Richard Harlow"
        role="Director of Integrated Air & Missile Defense, Allied Joint Force Command"
      />

      <ImageBreak image="/images/pages/tracking-screen.jpg" height="40vh" />

      <CTASection
        title="Deploy the Standard"
        subtitle="Aegis Core is operational across 12 nations. Schedule a classified briefing to evaluate the platform for your force protection requirements."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Platforms"
        secondaryHref="/products"
      />
    </>
  );
}
