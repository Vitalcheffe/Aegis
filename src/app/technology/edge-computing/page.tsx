"use client";

import {
  SectionHero,
  TextSection,
  SplitSection,
  StatsSection,
  SpecTable,
  CTASection,
  QuoteSection,
  ImageBreak,
  FAQSection,
  FeatureList,
} from "@/components/sections";

export default function EdgeComputingPage() {
  return (
    <>
      <SectionHero
        image="/images/technology/edge-computing.jpg"
        label="Technology"
        title="Edge Computing"
        subtitle="Processing at the tactical edge — 175 TOPS of AI inference in a ruggedized, deployable package that operates without cloud connectivity."
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="Why Edge-First Matters">
        <p>
          Edge computing is not a feature of the Aegis Architecture — it is a design philosophy. Every Aegis system processes sensor data and makes engagement decisions locally, at the tactical edge, without requiring connectivity to centralized servers or cloud infrastructure. This edge-first approach is a non-negotiable requirement for defense systems that must perform in contested electromagnetic environments where network connectivity cannot be guaranteed, in forward operating areas where satellite bandwidth is limited and shared among multiple systems, and in mobile scenarios where the platform is constantly changing network topology. A counter-UAS system that requires cloud connectivity to classify a threat is a system that fails when connectivity is denied — and in military operations, connectivity is always denied at the worst possible moment.
        </p>
        <p>
          The Aegis edge computing platform delivers 175 TOPS (trillion operations per second) of AI inference performance in a package that consumes less than 800 watts, operates from -40°C to +55°C, and withstands 30G shock loads. This performance is sufficient to run the complete Aegis AI pipeline — including RF signal classification, radar signal processing, behavioral intent analysis, and swarm detection — simultaneously with full sensor data processing and track management. When network connectivity is available, the system seamlessly shares threat data with the Aegis Command enterprise platform and allied networks. When connectivity is denied, it continues autonomous operation with zero degradation in detection, classification, or neutralization capability. The edge-first architecture ensures that your defense capability is never dependent on a network link that an adversary can sever.
        </p>
      </TextSection>

      <SplitSection
        image="/images/technology/edge-computing.jpg"
        label="Hardware Architecture"
        title="Purpose-Built for Defense"
        description="The Aegis edge computing hardware is built on Dell Technologies server platforms augmented with NVIDIA GPU accelerators, integrated into ruggedized enclosures that meet the environmental and electromagnetic requirements of military deployment. The compute chassis houses the Neural Processing Unit — our custom AI inference accelerator delivering 175 TOPS — alongside the general-purpose processors that handle sensor data ingestion, track management, operator interface rendering, and network communication. The system uses a heterogeneous computing architecture with four processing tiers: the NPU for AI inference (175 TOPS, INT8), the GPU for signal processing and image analysis (48 TFLOPS, FP32), the CPU for general computing and control (64-core ARM Neoverse), and the FPGA for real-time sensor data preprocessing (200 MHz, custom logic). This tiered architecture ensures that each workload runs on the most efficient processing element, maximizing throughput while minimizing power consumption and thermal output."
        stats={[
          { value: "175 TOPS", label: "AI Inference" },
          { value: "<800 W", label: "Total Power" },
        ]}
      />

      <SplitSection
        image="/images/technology/edge-computing.jpg"
        label="Software Architecture"
        title="Real-Time Deterministic Processing"
        description="The Aegis software architecture is designed for deterministic real-time operation, ensuring that every processing deadline is met regardless of system load. The real-time operating system (RTOS) scheduler guarantees that the AI inference pipeline completes within its 20-millisecond deadline even when the system is simultaneously processing sensor data from all modalities, updating 500+ track states, rendering the operator interface, and managing network communication. The software uses a publish-subscribe message bus that decouples sensor producers from processing consumers, enabling independent scaling and fault isolation for each processing pipeline. All inter-process communication is mediated through the Aegis Integration Bus, which provides real-time delivery guarantees, message priority queuing, and automatic failover for redundant processing paths. The software architecture supports hot-swappable processing modules, enabling software updates to individual components without restarting the entire system."
        reverse
        stats={[
          { value: "20 ms", label: "Guaranteed Latency" },
          { value: "99.97%", label: "System Uptime" },
        ]}
      />

      <TextSection label="Environmental Hardening" title="Built for the Battlefield">
        <p>
          Defense computing hardware must survive conditions that would destroy commercial server equipment. The Aegis edge computing platform is qualified to MIL-STD-810H environmental engineering standards, with testing across 29 environmental categories including temperature extremes, humidity, altitude, salt fog, sand and dust, vibration, shock, and electromagnetic interference. The ruggedized chassis uses conduction cooling instead of forced-air fans, eliminating the most common failure mechanism in deployed computing systems — fan bearings that seize in dusty or sandy environments. The chassis seals to IP67, preventing ingress of water, dust, and sand that would contaminate internal components. All connectors are military-specification circular connectors with positive locking mechanisms that prevent accidental disconnection from vibration or impact.
        </p>
        <p>
          Thermal management is particularly critical for edge computing platforms that must deliver high performance in high ambient temperatures without liquid cooling infrastructure. The Aegis compute chassis uses a conduction-cooled design that transfers heat from the processors through thermal interface materials to the chassis walls, which act as the primary heat sink. The chassis is rated for continuous operation at ambient temperatures up to +55°C with direct solar loading, and the thermal management system includes automatic performance throttling that prevents component damage if ambient temperature exceeds the rated maximum. In extreme cold conditions (-40°C), the system includes self-heating capability that brings the processors to their minimum operating temperature within 5 minutes of power application, using the waste heat from the power supply to accelerate warmup.
        </p>
      </TextSection>

      <StatsSection
        label="Edge Computing Performance"
        stats={[
          { value: "175 TOPS", label: "AI Inference" },
          { value: "48 TFLOPS", label: "GPU Processing" },
          { value: "64-Core", label: "CPU" },
          { value: "-40°C to +55°C", label: "Operating Range" },
          { value: "30G", label: "Shock Rating" },
        ]}
      />

      <QuoteSection
        quote="We designed for the worst case — not the best case. When you're at a forward operating base in 50-degree heat, under electromagnetic attack, with no satellite connectivity, and a swarm of drones approaching — that's when your system must perform perfectly. Cloud connectivity is a nice-to-have. Edge capability is a must-have. There is no fallback."
        author="Dr. Alan Prescott"
        role="Chief Technology Officer, Aegis Defense Systems"
      />

      <SpecTable
        label="Edge Computing Specifications"
        title="Technical Specifications"
        specs={[
          { label: "AI Inference (NPU)", value: "175 TOPS (INT8)" },
          { label: "GPU Processing", value: "48 TFLOPS (FP32)" },
          { label: "CPU", value: "64-core ARM Neoverse" },
          { label: "FPGA", value: "200 MHz custom logic" },
          { label: "System Memory", value: "256 GB ECC" },
          { label: "Storage", value: "4 TB NVMe (encrypted)" },
          { label: "Total Power Consumption", value: "<800 W typical" },
          { label: "Power Input", value: "110–240V AC / 24V DC" },
          { label: "Operating Temperature", value: "-40°C to +55°C" },
          { label: "Storage Temperature", value: "-55°C to +70°C" },
          { label: "Ingress Protection", value: "IP67" },
          { label: "Shock Rating", value: "30G (MIL-STD-810H)" },
          { label: "Vibration Rating", value: "MIL-STD-810H Category 24" },
          { label: "Cooling", value: "Conduction (fanless)" },
          { label: "EMC Compliance", value: "MIL-STD-461G" },
          { label: "Chassis Form Factor", value: "19-inch rack / transit case" },
          { label: "Weight", value: "42 kg (compute unit)" },
          { label: "Self-Heating Cold Start", value: "5 minutes from -40°C" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "Why not use cloud computing for C-UAS?",
            answer:
              "Cloud computing is unsuitable for counter-UAS for three fundamental reasons. First, latency: the round-trip time from a sensor at the tactical edge to a cloud server and back is typically 100-500 milliseconds over satellite links — 5 to 25 times slower than the 20-millisecond classification deadline. In that latency window, a drone traveling at 30 m/s covers 3 to 15 meters, potentially crossing from detection range into the protected zone. Second, availability: cloud connectivity requires a communication link that an adversary can jam, intercept, or sever. In military operations, electromagnetic denial is a given, and any system that depends on external connectivity will fail when that connectivity is denied. Third, security: transmitting raw sensor data to external servers creates an attack surface that violates the zero-trust security principles required for defense systems. Edge computing eliminates all three issues by processing data where it is generated and making decisions where they are needed.",
          },
          {
            question: "How does the system handle software updates?",
            answer:
              "Software updates are delivered through our secure over-the-air (SOTA) pipeline using a dual-channel verification protocol. Every update must be cryptographically signed by both our development key and our operations key, and the system verifies both signatures before accepting the update. The update process is designed to be non-disruptive: individual software modules are updated independently without requiring a system restart, and the update process includes automatic rollback capability that reverts to the previous version if any anomaly is detected during installation. Updates are applied during idle periods when no threats are present, and the system can defer updates if the threat level is elevated. In 2024, we delivered 47 capability updates to the deployed fleet with zero failed installations and zero operational disruptions. When network connectivity is unavailable, updates are queued and applied when connectivity is restored, with no impact on operational capability during the deferral period.",
          },
          {
            question: "What happens if the NPU fails?",
            answer:
              "The Aegis edge computing platform includes redundant processing paths that ensure continued operation even if the Neural Processing Unit fails. If the NPU detects an internal fault — through its built-in self-test that runs every 60 seconds — the system automatically falls back to GPU-based inference, which provides approximately 70% of the NPU's throughput. If both the NPU and GPU fail, the system falls back to CPU-based inference, which provides approximately 20% of the NPU's throughput — sufficient to maintain tracking and classification for a reduced number of targets. In all fallback scenarios, the system alerts the operator and reports the hardware failure to Aegis Command for maintenance dispatch. The mean time between failures (MTBF) for the NPU exceeds 100,000 hours, and the complete edge computing platform achieves 99.97% system uptime across our deployed fleet.",
          },
          {
            question: "Can third-party AI models run on the Aegis edge platform?",
            answer:
              "The Aegis edge computing platform supports third-party AI models through our Modular Open Systems Architecture (MOSA) compliance. Models must be packaged in our standard inference container format, which includes the model weights, the input/output specification, the resource requirements, and the security metadata. The container format supports models compiled for the NPU, GPU, or CPU execution targets. All third-party models must pass our adversarial robustness testing suite and security audit before deployment, and they operate within the same zero-trust security framework as our native models. The MOSA adapter framework provides the interface between the third-party model and the Aegis sensor data pipeline, handling data format conversion, timing synchronization, and output integration with the classification meta-ensemble. This open architecture enables customers and partners to extend Aegis capability with specialized models for niche threat categories or operational environments.",
          },
        ]}
      />

      <CTASection
        title="Experience Edge Performance"
        subtitle="Schedule a technical briefing to evaluate Aegis edge computing performance against your specific operational requirements, including SWaP constraints and environmental conditions."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Products"
        secondaryHref="/products"
      />
    </>
  );
}
