"use client";

import {
  SectionHero,
  Callout,
  SplitSection,
  FeatureList,
  SpecTable,
  CTASection,
  ImageBreak,
  AnimatedLine,
} from "@/components/sections";

export default function TechnologyPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/technology-hero.jpg"
        label="Technology"
        title="The Aegis Architecture"
        subtitle="A five-layer defense architecture engineered from the ground up for speed, precision, and resilience — detecting, classifying, and neutralizing unmanned aerial threats faster than any system ever deployed."
        cta="Explore Capabilities"
        ctaHref="/capabilities"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        The Aegis Architecture is not an assembly of off-the-shelf components —
        it is a purpose-engineered defense system where every layer, every
        algorithm, and every data path is designed to work as a unified whole.
        Five interdependent layers — Sensor, Fusion, AI, Decision, and Action
        — form an unbroken chain from threat detection to threat elimination,
        closing the kill chain in under 20 milliseconds.
      </Callout>

      <AnimatedLine />

      {/* ── LAYER 1: SENSOR ── */}
      <SplitSection
        image="/images/pages/detection-radar.jpg"
        label="Layer 01"
        title="Sensor Layer"
        description="The Sensor Layer is the Aegis Architecture's eyes and ears — a multi-spectral sensor array that provides persistent 360° surveillance across the entire threat envelope. Unlike legacy air defense radars optimized for fast-moving, high-altitude targets, Aegis sensors are specifically engineered for the counter-UAS mission: detecting small, low-flying, low-speed objects in cluttered environments. The primary sensor is our custom S-Band phased array radar, which provides simultaneous detection and tracking of 500+ targets at ranges up to 35 kilometers. This is complemented by a passive RF direction-finding array that detects drone control signals and telemetry at ranges exceeding 50 kilometers, day/night electro-optical and infrared cameras for visual identification, and an acoustic sensor network that detects drone propeller signatures in environments where electromagnetic sensors are jammed or degraded. Every sensor node is self-calibrating, self-diagnosing, and capable of autonomous operation when disconnected from the network."
        cta="Detection Capability"
        ctaHref="/capabilities/detection"
        stats={[
          { value: "35 km", label: "Radar Range" },
          { value: "500+", label: "Concurrent Tracks" },
        ]}
      />

      {/* ── LAYER 2: FUSION ── */}
      <SplitSection
        image="/images/pages/classification-ml.jpg"
        label="Layer 02"
        title="Fusion Layer"
        description="The Fusion Layer is where raw sensor data becomes actionable intelligence. Using a custom Iterated Multi-Model Unscented Kalman Filter (IMM-UKF), the Fusion Layer correlates observations from every sensor modality into unified, high-confidence tracks that are more accurate than any single sensor could produce alone. The fusion engine processes over 2 million data points per second, resolving conflicts between sensor observations, managing track initiation and termination, and maintaining firm track custody even when individual sensors are degraded or denied. The Fusion Layer also implements a proprietary sensor management algorithm that dynamically allocates sensor resources — pointing cameras, adjusting radar waveforms, and prioritizing RF scan patterns — to maximize detection probability against the most threatening contacts. The result is a common operating picture that provides commanders with situational awareness that is both comprehensive and unambiguous."
        cta="Tracking Capability"
        ctaHref="/capabilities/tracking"
        reverse
        stats={[
          { value: "2M+", label: "Data Points/Sec" },
          { value: "<1 m", label: "Positional Accuracy" },
        ]}
      />

      {/* ── LAYER 3: AI ── */}
      <SplitSection
        image="/images/pages/classification-hero.jpg"
        label="Layer 03"
        title="AI Layer"
        description="The AI Layer is the brain of the Aegis Architecture — a custom inference engine trained on over 12 million signal signatures that classifies every detected contact by type, intent, and payload in under 20 milliseconds. The classification pipeline runs on the Aegis Neural Processing Unit, a purpose-built AI accelerator that executes 175 trillion operations per second while consuming less than 400 watts. The AI Layer does not merely categorize drones by model; it assesses behavioral intent — distinguishing between a recreational drone flying an innocent pattern and a hostile platform executing a reconnaissance or attack profile. It identifies swarm behavior, predicts trajectory endpoints, and flags anomalous flight characteristics that indicate novel or modified threats. The models are continuously updated through Aegis's secure over-the-air update channel, incorporating new threat signatures identified across our global deployed fleet into every system worldwide within 72 hours of first observation."
        cta="Classification Capability"
        ctaHref="/capabilities/classification"
        stats={[
          { value: "20 ms", label: "Classification Time" },
          { value: "12M+", label: "Known Signatures" },
        ]}
      />

      {/* ── LAYER 4: DECISION ── */}
      <SplitSection
        image="/images/pages/command-hero.jpg"
        label="Layer 04"
        title="Decision Layer"
        description="The Decision Layer translates AI-driven threat assessments into actionable engagement recommendations — and in autonomous mode, into engagement authorizations. The Rules of Engagement Engine is the most configurable and auditable decision framework in the counter-UAS industry. It supports multi-tiered authorization protocols: fully autonomous engagement for pre-approved threat categories, supervised autonomous engagement where the system recommends and the operator approves, and manual engagement where every action requires explicit human authorization. Every decision — whether made by the AI or a human operator — is logged in an immutable audit trail that records the threat data, the classification confidence, the rules applied, and the authorization chain. This audit trail meets the evidentiary standards of military after-action reviews, legal proceedings, and international incident investigations. The Decision Layer also manages deconfliction with friendly forces, ensuring that countermeasures never interfere with allied aircraft or communications."
        cta="Command & Control"
        ctaHref="/capabilities/command-control"
        reverse
        stats={[
          { value: "3", label: "Authorization Modes" },
          { value: "100%", label: "Audit Trail Coverage" },
        ]}
      />

      {/* ── LAYER 5: ACTION ── */}
      <SplitSection
        image="/images/pages/neutralization-laser.jpg"
        label="Layer 05"
        title="Action Layer"
        description="The Action Layer executes the graduated response — from non-kinetic soft-kill measures to kinetic hard-kill and directed energy engagement. The graduated response framework ensures that the countermeasure is always proportional to the threat, compliant with rules of engagement, and minimizes collateral effects. Soft-kill options include precision RF jamming that disrupts drone control links without affecting friendly communications, GPS spoofing that redirects threats to safe landing zones, and electromagnetic pulse that disables onboard electronics at close range. Hard-kill options include interceptor drones for kinetic engagement at extended range and, in the 2025 architecture, a 50-kilowatt high-energy laser for sub-second precision neutralization and a high-power microwave system for area denial against swarm attacks. The directed energy capability provides the first truly unlimited-munition counter-UAS solution — constrained only by electrical power, not by magazine depth or logistics tails."
        cta="Neutralization Capability"
        ctaHref="/capabilities/neutralization"
        stats={[
          { value: "5+", label: "Effector Types" },
          { value: "<$1", label: "Per Engagement Cost" },
        ]}
      />

      {/* ── IMAGE BREAK ── */}
      <ImageBreak
        image="/images/pages/integration-api.jpg"
        height="55vh"
        overlay="bg-black/40"
      />

      {/* ── TECHNOLOGY HIGHLIGHTS ── */}
      <FeatureList
        label="Technology Highlights"
        title="Engineered for the Edge"
        items={[
          {
            title: "Edge Computing",
            description:
              "Every Aegis system processes sensor data and makes engagement decisions locally — at the tactical edge — without requiring connectivity to centralized servers. Our ruggedized edge computing platform, built on Dell Technologies hardware and NVIDIA GPU accelerators, delivers 175 TOPS of AI inference performance in a package that operates from -40°C to +55°C, withstands 30G shock loads, and consumes less than 800 watts. When network connectivity is available, the system seamlessly shares threat data with the Aegis Command enterprise platform and allied networks. When connectivity is denied, it continues autonomous operation with no degradation in capability. Edge-first architecture is not a feature — it is a design philosophy that ensures Aegis works when it matters most.",
            tag: "Architecture",
          },
          {
            title: "Secure Over-the-Air Updates",
            description:
              "Aegis systems receive continuous capability improvements through our secure over-the-air (SOTA) update pipeline. New threat signatures identified by any Aegis sensor worldwide are validated by our AI research team, packaged into cryptographically signed update bundles, and distributed to the global fleet within 72 hours. The SOTA pipeline uses dual-channel verification — every update must be signed by both our development key and our operations key — and includes automatic rollback capability if any anomaly is detected during installation. In 2024, we delivered 47 capability updates to the deployed fleet, including 12 new threat classification models, 8 sensor performance improvements, and 27 operational feature enhancements. No system restart is required; updates are applied seamlessly during idle periods.",
            tag: "Continuous Delivery",
          },
          {
            title: "Zero-Trust Security Architecture",
            description:
              "The Aegis Architecture implements a zero-trust security model where every component — hardware, software, and network — authenticates and authorizes every interaction, regardless of whether it originates inside or outside the network perimeter. Every sensor node, computing module, and effector controller holds a unique cryptographic identity provisioned during manufacturing. All inter-component communication is encrypted using FIPS 140-2 validated modules with perfect forward secrecy. The secure boot chain verifies firmware integrity at every power cycle, and runtime integrity monitoring detects and isolates any component exhibiting anomalous behavior. This zero-trust approach earned us our Common Criteria EAL4+ certification and ensures that a compromise of any single component cannot propagate to the rest of the system.",
            tag: "Cybersecurity",
          },
          {
            title: "Modular Open Systems Architecture",
            description:
              "Aegis is built on a Modular Open Systems Architecture (MOSA) that enables rapid integration of new sensors, effectors, and AI models without modifying the core platform. The architecture uses well-defined APIs and standard data bus protocols — including STANAG 4586 for sensor interfaces, STANAG 4676 for C2 data exchange, and our proprietary Aegis Integration Bus for high-throughput real-time data streaming. This modularity means that when a new sensor technology becomes available — a quantum radar, a terahertz imager, a next-generation RF array — it can be integrated into the Aegis Architecture through a standard adapter module in weeks rather than years. Similarly, new effector technologies can be added to the graduated response framework without recertifying the entire system.",
            tag: "Open Architecture",
          },
        ]}
      />

      {/* ── ARCHITECTURE SPEC TABLE ── */}
      <SpecTable
        label="Architecture Specifications"
        title="Technical Specifications"
        specs={[
          { label: "Kill Chain Closure Time", value: "<20 milliseconds" },
          { label: "AI Inference Performance", value: "175 TOPS" },
          { label: "Concurrent Track Capacity", value: "500+ targets" },
          { label: "Detection Range (Radar)", value: "35 km (fixed-wing UAV)" },
          { label: "Detection Range (RF)", value: "50+ km (control signals)" },
          { label: "Detection Range (Micro-drones)", value: "15 km" },
          { label: "Classification Accuracy", value: "98.9%" },
          { label: "Neutralization Success Rate", value: "99.4%" },
          { label: "Known Signal Signatures", value: "12 million+" },
          { label: "Edge Compute Power Draw", value: "<800 watts" },
          { label: "Operating Temperature Range", value: "-40°C to +55°C" },
          { label: "Update Delivery Time (Global)", value: "72 hours" },
          { label: "Positional Accuracy", value: "<1 meter" },
          { label: "Uptime SLA", value: "99.97%" },
          { label: "Cybersecurity Certification", value: "EAL4+ / FIPS 140-2" },
          { label: "Interoperability Standards", value: "STANAG 4671 / 4586 / 4676" },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="See the Architecture in Action"
        subtitle="Schedule a classified technical briefing with our engineering team and discover how the Aegis Architecture can be tailored to your operational requirements."
        primaryCta="Request Technical Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Capabilities"
        secondaryHref="/capabilities"
      />
    </>
  );
}
