"use client";

import {
  SectionHero,
  FAQSection,
  CTASection,
  TextSection,
} from "@/components/sections";

export default function FAQPage() {
  return (
    <>
      <SectionHero
        image="/images/resources/faq.jpg"
        label="Resources"
        title="Frequently Asked Questions"
        subtitle="Comprehensive answers to the most common questions about Aegis technology, deployment, compliance, and integration — organized by category for quick navigation."
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="Answers to Your Questions">
        <p>
          We understand that evaluating and deploying a counter-UAS system raises questions across technical, operational, regulatory, and organizational dimensions. This FAQ consolidates the questions we receive most frequently from defense professionals, system integrators, procurement teams, and end users. Each answer is authored by the relevant Aegis subject matter expert and reviewed by our engineering leadership for technical accuracy. Where applicable, we cite the specific standards, regulations, or test results that support our answers, enabling you to verify our claims independently.
        </p>
        <p>
          The FAQ is organized into four categories: General questions about Aegis and the counter-UAS market, Technology questions about our detection, classification, and neutralization capabilities, Deployment questions about installation, operation, and maintenance, and Compliance questions about regulatory requirements, certifications, and legal frameworks. If your question is not addressed here, our solutions engineering team is available for direct consultation — use the contact form at the bottom of this page to reach them.
        </p>
      </TextSection>

      <FAQSection
        label="General"
        title="General Questions"
        items={[
          {
            question: "What is Aegis Defense Systems?",
            answer:
              "Aegis Defense Systems is a defense technology company exclusively focused on counter-unmanned aerial system (C-UAS) solutions. Founded in 2018, we design, manufacture, and deploy integrated detection, classification, tracking, and neutralization systems that protect military installations, critical infrastructure, airports, and urban environments from unauthorized and hostile drone operations. Our Aegis Architecture is a five-layer defense system — Sensor, Fusion, AI, Decision, and Action — that closes the kill chain from first detection to threat neutralization in under 20 milliseconds. We are the most widely deployed counter-UAS provider in the NATO alliance, with over 200 systems operational across 14 countries.",
          },
          {
            question: "How does Aegis differ from other C-UAS solutions?",
            answer:
              "Aegis differs in three fundamental ways. First, we are a vertically integrated system provider — we design and manufacture our own radar arrays, RF sensors, AI inference hardware, and effectors, rather than assembling third-party components. This integration delivers performance that component-based systems cannot match: our five-layer architecture is optimized as a unified system, eliminating the latency, data translation overhead, and compatibility issues that plague multi-vendor assemblies. Second, our edge-first architecture means every Aegis system operates autonomously without requiring cloud connectivity, ensuring that your defense capability is never dependent on network availability. Third, our AI models are continuously updated through secure over-the-air updates, incorporating new threat signatures from our global deployed fleet within 72 hours of first observation — a capability no competitor currently offers.",
          },
          {
            question: "What types of drones can Aegis detect and neutralize?",
            answer:
              "Aegis detects and classifies all categories of unmanned aerial systems: fixed-wing UAVs (detection range up to 35 km), rotary-wing UAVs (up to 30 km), multi-rotor drones including commercial platforms like DJI and Autel (up to 25 km), micro-drones weighing under 250 grams (up to 15 km), and swarm elements operating in coordinated formations. Our AI classification models cover over 12 million known signal signatures and can identify specific drone models, assess behavioral intent, and detect modified commercial platforms that have been weaponized or repurposed for hostile reconnaissance. The graduated response framework provides proportionate neutralization for each threat category, from non-kinetic RF jamming and GPS spoofing through to kinetic interdiction recommendations.",
          },
          {
            question: "What is the Aegis Architecture?",
            answer:
              "The Aegis Architecture is our purpose-engineered five-layer defense system. Layer 1 (Sensor) provides multi-spectral surveillance using S-Band phased array radar, passive RF direction-finding arrays, EO/IR cameras, and acoustic sensors. Layer 2 (Fusion) correlates data from all sensor modalities into unified, high-confidence tracks using an Iterated Multi-Model Unscented Kalman Filter. Layer 3 (AI) classifies every detected contact by type, intent, and payload in under 20 milliseconds using a hybrid neural network architecture running on our purpose-built Neural Processing Unit. Layer 4 (Decision) translates AI assessments into actionable engagement recommendations with configurable rules of engagement and full audit trail. Layer 5 (Action) executes the graduated response through precision jamming, GPS spoofing, electromagnetic pulse, interceptor drones, and directed energy systems.",
          },
          {
            question: "How many Aegis systems are currently deployed?",
            answer:
              "As of Q1 2025, over 200 Aegis systems are operational across 14 countries, protecting military installations, airports, critical infrastructure, government facilities, and VIP residences. The Aegis Core platform is the most widely deployed counter-UAS system in the NATO alliance. Our deployed fleet has collectively processed over 15,000 confirmed drone threat engagements with a 99.4% neutralization success rate. Due to operational security requirements, we cannot disclose specific deployment locations or customer identities, but references are available through appropriate security channels upon request.",
          },
        ]}
      />

      <FAQSection
        label="Technology"
        title="Technology Questions"
        items={[
          {
            question: "How does Aegis achieve sub-20ms classification time?",
            answer:
              "The Aegis classification pipeline is optimized end-to-end for latency, from sensor data acquisition through neural network inference to decision output. Our custom Neural Processing Unit executes 175 trillion operations per second (TOPS) on a hybrid architecture combining convolutional neural networks for RF signal pattern recognition, transformer models for behavioral sequence analysis, and graph neural networks for swarm relationship mapping. The model weights are quantized to INT8 precision using our proprietary quantization-aware training pipeline, which maintains classification accuracy within 0.2% of the FP32 baseline while delivering 4x inference speedup. The entire pipeline — from radar return to classification output — completes in under 18 milliseconds on the production system, with 20 milliseconds as the guaranteed maximum under worst-case processing load.",
          },
          {
            question: "Can Aegis detect encrypted or frequency-hopping drone signals?",
            answer:
              "Yes. While encrypted control links prevent content decoding, Aegis RF sensing does not rely on decoding drone communications to detect and classify threats. Our direction-finding array detects the RF energy itself — the carrier signal, modulation characteristics, burst timing patterns, and spectral footprint — which cannot be hidden by encryption. For frequency-hopping spread spectrum (FHSS) signals, our cognitive radio subsystem monitors up to 2 GHz of instantaneous bandwidth simultaneously, capturing hop sequences and reconstructing the transmission pattern in real time. Our AI models classify FHSS signals with 97.3% accuracy based on spectral characteristics alone, even without decoding the payload. The latest Aegis RF array also detects IEEE 802.11-based drone communication protocols, including Wi-Fi direct and proprietary mesh networking schemes.",
          },
          {
            question: "What is the Aegis kill chain closure time?",
            answer:
              "The Aegis Architecture closes the complete kill chain — from first sensor contact to engagement authorization — in under 20 milliseconds. This timing breaks down as follows: sensor data acquisition and preprocessing takes approximately 3 milliseconds, sensor fusion and track update takes approximately 4 milliseconds, AI classification and threat assessment takes approximately 8 milliseconds, and decision layer processing and engagement authorization takes approximately 3 milliseconds. The actual neutralization time depends on the effector selected and the threat geometry: RF jamming takes effect within 50-200 milliseconds of activation, GPS spoofing redirects the target within 1-3 seconds, and kinetic interdiction timelines depend on interceptor flight time. The 20-millisecond figure refers to the decision loop, not the total engagement time.",
          },
          {
            question: "How does Aegis handle swarm attacks?",
            answer:
              "The Aegis Swarm Resolution Algorithm decomposes a swarm engagement into individual threat tracks and assigns graduated responses based on each platform's assessed role and capability. When the AI Layer detects swarm behavior — characterized by correlated trajectories, synchronized timing, or coordinated communication patterns — it triggers the swarm-specific processing pathway. This pathway uses graph neural networks to model the relationships between swarm elements, identifying command nodes, reconnaissance platforms, and strike elements within the formation. The Decision Layer then assigns priority targets and proportionate responses to each element, optimizing the use of available effectors to neutralize the most threatening platforms first while maintaining coverage of the remaining swarm. In live testing against swarms of up to 50 platforms, Aegis achieves 99.2% neutralization success within the first engagement cycle.",
          },
          {
            question: "What is the Aegis Neural Processing Unit?",
            answer:
              "The Aegis Neural Processing Unit (NPU) is our purpose-built AI inference accelerator, designed and manufactured in-house for the specific computational requirements of counter-UAS threat classification. The NPU delivers 175 TOPS of AI inference performance while consuming less than 400 watts — a power efficiency of 0.44 TOPS/watt that enables deployment in the constrained power environments of tactical vehicles and forward operating bases. The NPU uses a heterogeneous computing architecture with dedicated tensor processing cores for matrix operations, programmable vector units for signal processing, and a real-time scheduling engine that guarantees deterministic inference latency under all processing loads. The NPU operates from -40°C to +55°C and withstands 30G shock loads, meeting the requirements for MIL-STD-810H deployment.",
          },
        ]}
      />

      <FAQSection
        label="Deployment"
        title="Deployment Questions"
        items={[
          {
            question: "How long does it take to deploy an Aegis system?",
            answer:
              "Deployment timelines vary by product. Aegis Core requires 2-3 days for a standard fixed-site installation, including sensor array mounting, cable routing, system calibration, and operator training. Aegis Tactical can be operational within 30 minutes of arrival at a deployment site — the sensor head mounts on a tripod or vehicle roof, and the processing unit requires only power and a network connection. Aegis Mobile installs in a vehicle in approximately 4 hours, including sensor array mounting, power system integration, and vibration isolation calibration. Aegis Shield deploys from backpack to operational in under 4 minutes. All timelines assume a prepared site with power and network infrastructure available. Our field engineering team provides on-site deployment support for initial installations and can train your personnel for subsequent redeployments.",
          },
          {
            question: "What are the power requirements for Aegis systems?",
            answer:
              "Aegis Core requires 800W typical / 1200W peak at 110-240V AC, 50/60 Hz. The system can operate on generator power, grid power, or battery-backed UPS systems. Aegis Tactical requires 400W typical / 600W peak at 24V DC, compatible with standard military vehicle power systems and portable generators. Aegis Mobile operates from the vehicle electrical system with a 500W typical / 750W peak draw at 12V or 24V DC. Aegis Shield is battery-powered with 6 hours of continuous operation per charge and hot-swappable battery packs for indefinite field operation. Aegis Sentinel can be solar-powered with a 200W panel and includes a 48-hour battery backup for night and low-light operation. All power specifications include the full sensor array and processing suite.",
          },
          {
            question: "Does Aegis require internet connectivity to operate?",
            answer:
              "No. Aegis systems are designed with an edge-first architecture that processes all sensor data and makes all engagement decisions locally, at the tactical edge, without requiring any external network connectivity. When network connectivity is available, Aegis systems share threat data with the Aegis Command enterprise platform and allied networks through STANAG 4676 C2 data exchange. When connectivity is denied or degraded, the system continues fully autonomous operation with zero degradation in detection, classification, or neutralization capability. The only function that requires connectivity is the secure over-the-air update pipeline, which delivers new threat signatures and model updates but operates on a deferred basis — the system queues updates and applies them when connectivity is restored, with no impact on operational capability during the update process.",
          },
          {
            question: "What training is required to operate Aegis?",
            answer:
              "Aegis operator training consists of a 5-day certification course covering system operation, threat assessment, rules of engagement configuration, and maintenance procedures. The course is conducted at our training facility or at your site and includes both classroom instruction and hands-on live-fire exercises. No prior radar or EW experience is required — the Aegis operator interface is designed for intuitive operation with automated workflows that guide the operator through the engagement sequence. System administrator training is a separate 3-day course covering network configuration, sensor calibration, software updates, and hardware maintenance. We also offer an advanced 2-day course for commanders covering rules of engagement doctrine, escalation management, and after-action review procedures. All training is included in the system purchase price for up to 12 personnel.",
          },
          {
            question: "What is the maintenance requirement for Aegis systems?",
            answer:
              "Aegis systems are designed for minimal preventive maintenance. The radar array and RF sensors are solid-state with no moving parts, requiring only periodic visual inspection and lens cleaning for the EO/IR cameras (recommended quarterly). The system performs automated self-diagnosis every 60 seconds, monitoring 1,400 health parameters across all subsystems, and reports any anomalies to the operator console and to Aegis Command (when connected). Preventive maintenance schedule includes quarterly calibration verification, semi-annual environmental seal inspection, and annual comprehensive system health assessment. All maintenance procedures can be performed by trained operators without specialized tools or test equipment. Aegis maintains a 99.97% uptime SLA across our deployed fleet, and our global support team provides 24/7 remote monitoring and troubleshooting with 4-hour on-site response for critical issues.",
          },
        ]}
      />

      <FAQSection
        label="Compliance"
        title="Compliance & Regulatory Questions"
        items={[
          {
            question: "Is Aegis ITAR compliant?",
            answer:
              "Yes. All Aegis products are designed, manufactured, and exported in full compliance with the International Traffic in Arms Regulations (ITAR) administered by the U.S. Department of State, Directorate of Defense Trade Controls (DDTC). Aegis Defense Systems holds a DDTC manufacturing license and export authorization. International sales require appropriate end-user certifications, government-to-government agreements, and compliance with the import regulations of the destination country. Our export compliance team manages all licensing requirements and provides full documentation for customs and trade compliance. Contact our export compliance office for specific country eligibility and licensing timeline estimates.",
          },
          {
            question: "What cybersecurity certifications does Aegis hold?",
            answer:
              "Aegis holds Common Criteria EAL4+ certification for our zero-trust security architecture, FIPS 140-2 validation for our cryptographic modules, and is compliant with NIST SP 800-171 for controlled unclassified information handling. Our zero-trust architecture authenticates and authorizes every interaction between system components — hardware, software, and network — regardless of whether the interaction originates inside or outside the network perimeter. Every sensor node, computing module, and effector controller holds a unique cryptographic identity provisioned during manufacturing. All inter-component communication is encrypted with perfect forward secrecy. The secure boot chain verifies firmware integrity at every power cycle, and runtime integrity monitoring detects and isolates any component exhibiting anomalous behavior.",
          },
          {
            question: "Can Aegis be used in civilian airspace?",
            answer:
              "Yes, with appropriate regulatory authorization. Aegis systems are deployed at airports, seaports, and urban environments worldwide under various regulatory frameworks. In the United States, C-UAS operations in civilian airspace require FAA authorization under Section 333 exemption or specific congressional authority. In the European Union, EASA Special Conditions provide the certification framework. Aegis systems are designed to comply with these regulatory requirements, including spectrum management for jamming operations, coordination with air traffic control, and graduated response protocols that prioritize non-kinetic neutralization in civilian environments. Our regulatory affairs team maintains current knowledge of C-UAS authorization frameworks across 30+ jurisdictions and provides compliance support as part of the deployment process.",
          },
          {
            question: "What standards does Aegis comply with?",
            answer:
              "Aegis systems comply with STANAG 4671 (UAV System Airworthiness Requirements) for safe operation in military airspace, STANAG 4586 (Standard Interfaces of UAV Control System) for sensor interoperability, and STANAG 4676 (C2 Data Exchange) for integration with allied command and control networks. We also comply with MIL-STD-810H for environmental engineering, MIL-STD-461G for electromagnetic compatibility, MIL-STD-1275 for vehicle power quality, and DO-160G for airborne equipment qualification. Civilian certifications include CE marking for European markets, FCC Part 15 for electromagnetic emissions, and IEC 62368-1 for electrical safety. Our quality management system is certified to ISO 9001:2015 and AS9100D for aerospace applications.",
          },
          {
            question: "How does Aegis handle rules of engagement and audit trails?",
            answer:
              "The Aegis Decision Layer implements a three-tier rules of engagement framework: fully autonomous engagement for pre-approved threat categories, supervised autonomous engagement where the system recommends and the operator approves, and manual engagement where every action requires explicit human authorization. The appropriate tier is configured by the mission commander based on operational requirements and legal authorization. Every decision — whether made autonomously or by a human operator — is logged in an immutable audit trail that records the threat data, classification confidence score, rules applied, authorization chain, and the full sensor data snapshot at the moment of decision. This audit trail meets the evidentiary standards of military after-action reviews, legal proceedings, and international incident investigations. Audit logs are encrypted, timestamped with GPS time, and cannot be modified or deleted by any operator.",
          },
        ]}
      />

      <CTASection
        title="Have More Questions?"
        subtitle="Our solutions engineering team is available for direct consultation on technical, operational, and regulatory questions specific to your deployment environment."
        primaryCta="Contact Solutions Team"
        primaryHref="/request-demo"
        secondaryCta="Schedule a Briefing"
        secondaryHref="/contact"
      />
    </>
  );
}
