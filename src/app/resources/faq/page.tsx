"use client";

import {
  SectionHero,
  FAQSection,
  CTASection,
  TextSection,
} from "@/components/sections";

const generalQuestions = [
  {
    question: "What is counter-UAS?",
    answer:
      "Counter-UAS (C-UAS) is the defense discipline encompassing the complete kill chain against unmanned aerial systems: detect, track, classify, and neutralize. Detection involves multi-spectral surveillance using radar, RF, electro-optical, and acoustic sensors to discover unauthorized drone activity. Tracking maintains continuous custody of detected contacts, correlating sensor observations into unified trajectory solutions. Classification identifies the specific drone type, assessed intent, and potential payload using AI-driven analysis of RF signatures, flight behavior, and visual characteristics. Neutralization applies graduated countermeasures — from non-kinetic soft-kill methods such as RF jamming and GPS spoofing through kinetic hard-kill and directed energy engagement — proportionate to the assessed threat level. The Aegis Architecture closes this entire chain in under 20 milliseconds.",
  },
  {
    question: "How does Aegis differ from traditional air defense?",
    answer:
      "Traditional air defense systems were designed for large, fast, high-altitude threats — fighter aircraft, cruise missiles, and ballistic missiles — with radar cross sections measured in square meters and speeds measured in hundreds of knots. Drones invert every parameter: they are small (RCS as low as 0.001 m²), slow (20-80 knots), and fly low (below 400 feet AGL), often in cluttered urban or terrain-masked environments. Aegis was engineered from the ground up for these targets. Our S-Band phased array radar achieves detection thresholds 40 dB below legacy air defense systems, our AI classification models are trained exclusively on the 12 million+ UAS signal signatures in our library, and our effectors are calibrated for the specific electronic and physical characteristics of small unmanned platforms. A legacy SAM system modified for C-UAS is fundamentally compromised; Aegis is purpose-built.",
  },
  {
    question: "What drone types can Aegis detect?",
    answer:
      "Aegis detects and classifies all categories of unmanned aerial systems: fixed-wing UAVs (detection range up to 35 km), rotary-wing UAVs (up to 30 km), multi-rotor drones including commercial platforms from DJI, Autel, and Skydio (up to 25 km), micro-drones weighing under 250 grams (up to 15 km), swarm formations operating in coordinated patterns, and modified commercial platforms that have been weaponized or repurposed for hostile reconnaissance. Our AI classification models cover over 12 million known signal signatures and can identify specific drone models, assess behavioral intent, and detect payload modifications. The graduated response framework provides proportionate neutralization for each threat category, from non-kinetic RF jamming and GPS spoofing through to kinetic interdiction and directed energy engagement.",
  },
  {
    question: "Is Aegis compliant with civilian aviation regulations?",
    answer:
      "Yes. Aegis systems are deployed at airports, seaports, and urban environments worldwide under various regulatory frameworks. In the United States, C-UAS operations in civilian airspace require FAA authorization under Section 333 exemption or specific congressional authority. In the European Union, EASA Special Conditions provide the certification framework. Aegis systems include built-in coordination protocols for both FAA and EASA airspace management, including spectrum management for jamming operations, automatic deconfliction with air traffic control frequencies, and graduated response protocols that prioritize non-kinetic neutralization in civilian environments. Our regulatory affairs team maintains current knowledge of C-UAS authorization frameworks across 30+ jurisdictions and provides compliance support as part of every deployment.",
  },
  {
    question: "What is the Aegis kill chain closure time?",
    answer:
      "The Aegis Architecture closes the complete kill chain — from first sensor contact to engagement authorization — in under 20 milliseconds. This timing breaks down as follows: sensor data acquisition and preprocessing takes approximately 3 milliseconds, sensor fusion and track update takes approximately 4 milliseconds, AI classification and threat assessment takes approximately 8 milliseconds, and decision layer processing and engagement authorization takes approximately 3 milliseconds. The actual neutralization time depends on the effector selected and the threat geometry: RF jamming takes effect within 50-200 milliseconds of activation, GPS spoofing redirects the target within 1-3 seconds, and kinetic interdiction timelines depend on interceptor flight time. The 20-millisecond figure refers to the decision loop — the time from detection to authorized response — making Aegis the fastest integrated C-UAS system in production.",
  },
];

const technologyQuestions = [
  {
    question: "How does multi-spectral sensor fusion work?",
    answer:
      "Multi-spectral sensor fusion is the process of combining observations from radar, RF direction-finding arrays, electro-optical/infrared cameras, and acoustic sensors into unified, high-confidence tracks that are more accurate and reliable than any single sensor modality alone. The Aegis Fusion Layer uses an Iterated Multi-Model Unscented Kalman Filter (IMM-UKF) as its mathematical framework. The IMM component maintains multiple kinematic models simultaneously — constant velocity, coordinated turn, and acceleration — and blends their outputs based on which model best explains the current observations. The UKF component handles the nonlinear relationships between sensor measurements and target state without the linearization errors of simpler filters. This architecture achieves 98.9% classification accuracy versus 78.3% for radar-only approaches, with sub-meter positional accuracy even when individual sensors are degraded or denied.",
  },
  {
    question: "What AI models does Aegis use for classification?",
    answer:
      "Aegis employs a hybrid neural network architecture combining three model families, each optimized for a distinct aspect of the classification problem. Convolutional neural networks (CNNs) process RF signal spectrograms and radar range-Doppler maps, extracting spectral features that identify drone type, communication protocol, and modulation characteristics. Transformer models analyze behavioral sequences — flight trajectories, speed profiles, and maneuver patterns — to assess operational intent (recreational, commercial, surveillance, or hostile). Graph neural networks (GNNs) model the relationships between multiple detected contacts, identifying swarm structures, command hierarchies, and coordinated attack patterns. The three model outputs are fused in a meta-classifier that produces a unified threat assessment with confidence scores. All models run on our purpose-built Neural Processing Unit at 175 TOPS, with INT8 quantization maintaining classification accuracy within 0.2% of the FP32 baseline.",
  },
  {
    question: "Can Aegis operate in GPS-denied environments?",
    answer:
      "Yes. Aegis systems operate autonomously without requiring GPS through the PRN-200 Resilient Navigation Module, which provides precision timing and platform orientation using a combination of inertial measurement, cesium atomic clock references, and stellar navigation. The PRN-200 maintains microsecond-precision timing for sensor fusion without GPS discipline, ensuring that radar ranging, RF direction-finding, and track correlation remain accurate. Platform orientation is derived from a tactical-grade MEMS inertial measurement unit with zero-velocity updates during stationary operation, providing heading accuracy better than 0.5 mils. For mobile deployments, the PRN-200 supplements inertial navigation with visual odometry from the EO/IR payload, maintaining sensor boresight accuracy even during extended GPS denial periods. All Aegis systems are tested and validated in GPS-denied conditions per MIL-STD-461G electromagnetic compatibility requirements.",
  },
  {
    question: "How does Aegis handle swarm attacks?",
    answer:
      "The Aegis Swarm Resolution Algorithm decomposes a swarm engagement into individual threat tracks and assigns graduated responses based on each platform's assessed role and capability. When the AI Layer detects swarm behavior — characterized by correlated trajectories, synchronized timing, or coordinated communication patterns — it triggers the swarm-specific processing pathway. Graph neural networks model the relationships between swarm elements, identifying command nodes, reconnaissance platforms, and strike elements within the formation. The Decision Layer then assigns priority targets and proportionate responses to each element, optimizing the use of available effectors to neutralize the most threatening platforms first while maintaining coverage of the remaining swarm. In live testing against swarms of up to 50 platforms, Aegis achieves 99.2% neutralization success within the first engagement cycle. For larger swarms exceeding 100 elements, the HPM area-denial capability provides simultaneous neutralization of all platforms within the engagement radius.",
  },
  {
    question: "What is directed energy capability?",
    answer:
      "Aegis integrates two directed energy weapon systems for unlimited-munition counter-UAS operations. The High-Energy Laser (HEL) delivers 50 kW of concentrated electromagnetic energy, achieving sub-second neutralization of individual drones at ranges up to 3 km through thermal structural failure or sensor destruction. The HEL's magazine is effectively unlimited, constrained only by electrical power supply — a critical advantage in sustained engagements where kinetic interceptors would be depleted. The High-Power Microwave (HPM) system emits short-duration, high-intensity electromagnetic pulses that disable electronic components within a defined radius, providing area denial capability against swarm attacks without requiring individual targeting. The HPM neutralizes multiple drones simultaneously, making it the optimal effector for mass swarm engagements. Both systems are integrated into the Aegis decision loop, with the AI Layer automatically selecting the appropriate directed energy system based on threat geometry, swarm density, and rules of engagement.",
  },
];

const deploymentQuestions = [
  {
    question: "How long does deployment take?",
    answer:
      "Deployment timelines vary by product configuration. Aegis Core requires approximately 4 hours for a standard fixed-site installation, including sensor array mounting, cable routing, system calibration, and operational verification. Aegis Tactical can be operational within 30 minutes of arrival at a deployment site — the sensor head mounts on a tripod or vehicle roof, and the processing unit requires only power and a network connection. Aegis Mobile installs in a vehicle in approximately 15 minutes for a rapid configuration, with full integration including sensor array mounting, power system integration, and vibration isolation calibration completed in 4 hours. Aegis Shield deploys from backpack to operational in under 10 minutes. All timelines assume a prepared site with power and network infrastructure available. Our field engineering team provides on-site deployment support for initial installations and can train your personnel for subsequent redeployments.",
  },
  {
    question: "What are the power requirements?",
    answer:
      "Power requirements range from 150W for the most compact configuration to 8kW for the full Shield system with directed energy. Aegis Sentinel operates on 150W typical, sustainable via solar panel with 48-hour battery backup. Aegis Shield man-portable configuration draws 300W from hot-swappable battery packs providing 6 hours of continuous operation; the full vehicle-mounted Shield system with integrated HEL requires up to 8kW. Aegis Core requires 800W typical / 1200W peak at 110-240V AC, 50/60 Hz, compatible with generator power, grid power, or battery-backed UPS systems. Aegis Tactical requires 400W typical / 600W peak at 24V DC, compatible with standard military vehicle power systems and portable generators. All power specifications include the full sensor array and processing suite; effector power requirements are specified separately.",
  },
  {
    question: "Can Aegis integrate with existing C2 systems?",
    answer:
      "Yes. Aegis integrates with existing command and control systems through the Aegis Integrator middleware platform and full STANAG protocol support. Aegis Integrator provides bidirectional translation between Aegis native data formats and the following C2 protocols: STANAG 4676 (C-UAS C2 data exchange), STANAG 4586 (UAV control system interfaces), ASTERIX (ATM surveillance data exchange), Link 16 (tactical data link), and SINCGARS (tactical radio). The integration is configuration-driven, not custom-code, meaning new C2 systems can be onboarded by loading a connector profile rather than developing custom software. Aegis Integrator also supports generic REST and WebSocket interfaces for integration with proprietary or non-standard C2 platforms. Integration typically takes 2-4 weeks from requirement definition to operational handoff, including lab testing and field validation.",
  },
  {
    question: "What training is required?",
    answer:
      "Aegis operator training consists of a 5-day certification course covering system operation, threat assessment, rules of engagement configuration, and basic maintenance procedures. The course is conducted at our training facility or at your site and includes both classroom instruction and hands-on live-fire exercises against representative drone targets. No prior radar or EW experience is required — the Aegis operator interface is designed for intuitive operation with automated workflows that guide the operator through the engagement sequence. A separate 2-week systems administrator course covers network architecture, sensor calibration, software updates, hardware maintenance, and troubleshooting of all subsystems. We also offer a 2-day advanced commander's course covering rules of engagement doctrine, escalation management, and after-action review procedures. All training is included in the system purchase price for up to 12 personnel, with additional training slots available at marginal cost.",
  },
  {
    question: "Is Aegis NATO interoperable?",
    answer:
      "Yes. Aegis is certified under STANAG 4671 (Counter-Unmanned Aerial Systems) and STANAG 4676 (C2 Data Exchange), making it fully interoperable with allied C-UAS and air defense networks across the NATO alliance. STANAG 4671 certification validates that Aegis meets the alliance's requirements for safe operation in military airspace, including rules of engagement compliance, identification friend-or-foe deconfliction, and environmental qualification across 14 test conditions including Arctic, desert, and maritime operations. STANAG 4676 certification enables seamless track data sharing, engagement coordination, and rules of enforcement synchronization across distributed defense networks. Aegis is the most widely deployed C-UAS system in the NATO alliance, with over 200 systems operational across 14 member nations, providing proven interoperability in live operational environments from the Baltic to the Mediterranean.",
  },
];

const regulatoryQuestions = [
  {
    question: "What is ITAR and how does it affect Aegis?",
    answer:
      "ITAR — the International Traffic in Arms Regulations — is a set of U.S. government regulations administered by the Department of State, Directorate of Defense Trade Controls (DDTC), that control the export and import of defense-related articles and services listed on the United States Munitions List (USML). All Aegis products are ITAR-controlled defense articles. This means that international transfer of Aegis hardware, software, technical data, or defense services requires prior DDTC export authorization, typically in the form of a Defense Export License. Aegis Defense Systems holds a DDTC manufacturing license and maintains a dedicated export compliance team that manages all licensing requirements, end-user certifications, and government-to-government agreements. ITAR compliance affects procurement timelines — international customers should expect 90-180 days for export license processing — and imposes restrictions on who may access Aegis technical data and who may operate the system. Our export compliance office provides specific country eligibility assessments and licensing timeline estimates upon request.",
  },
  {
    question: "Can Aegis be used for civilian airport protection?",
    answer:
      "Yes, with appropriate regulatory authorization. Aegis systems are deployed at airports worldwide under various regulatory frameworks. In the United States, airport C-UAS operations require FAA authorization, typically under Section 333 exemption or specific congressional authority provided by the Preventing Emerging Threats Act. In the European Union, EASA Special Conditions SC-UA-01 provide the certification framework for C-UAS systems at civil airports. Aegis systems include built-in coordination protocols for FAA and EASA airspace management, including spectrum management for jamming operations that prevents interference with air traffic control frequencies and navigation aids. The graduated response framework prioritizes non-kinetic neutralization at airports — RF jamming and GPS spoofing — to avoid collateral effects on aircraft and infrastructure. Our regulatory affairs team provides complete compliance support as part of every airport deployment, including coordination with civil aviation authorities and air traffic control.",
  },
  {
    question: "What is the legal framework for drone neutralization?",
    answer:
      "The legal framework for drone neutralization varies significantly by jurisdiction, and Aegis is designed to operate within the specific legal constraints of each deployment environment. In the United States, the Preventing Emerging Threats Act authorizes the Department of Defense and Department of Homeland Security to detect, identify, monitor, and neutralize unmanned aircraft systems that pose a threat to covered facilities and assets. Similar authorities exist in EU member states under national security legislation and the EASA regulatory framework. Aegis addresses this jurisdictional complexity through a graduated response framework that provides proportionate countermeasures at each escalation level: passive detection and tracking (universally lawful), non-kinetic soft-kill including RF jamming and GPS spoofing (authorized under specific statutory frameworks), and kinetic hard-kill (restricted to military and designated national security applications). The Decision Layer enforces jurisdiction-specific rules of engagement that are configured during deployment, ensuring that every response is legally authorized.",
  },
  {
    question: "How does Aegis handle privacy concerns?",
    answer:
      "Aegis is engineered with privacy-by-design principles that minimize data collection to threat-only information. The system does not collect, store, or transmit personal data of any kind. EO/IR sensors operate in a detection mode that identifies the presence and classification of aerial objects without capturing identifiable imagery of persons on the ground. RF sensing detects the electromagnetic emissions of drone communication links and does not intercept, decode, or store the content of any communication. Acoustic sensors detect propeller noise signatures and do not record or process voice or conversation audio. When a threat is detected, the system records only the sensor data necessary for threat classification, engagement authorization, and audit trail compliance — all of which pertains to the unmanned aerial system, not to any individual. Audit logs are retained in encrypted storage with configurable retention periods and are accessible only to authorized personnel with appropriate security clearances. Aegis systems comply with GDPR data protection requirements for EU deployments and with relevant privacy legislation in all other jurisdictions.",
  },
  {
    question: "What export controls apply?",
    answer:
      "Aegis products are subject to multiple layers of export control. ITAR (International Traffic in Arms Regulations) controls the export of defense articles and services on the United States Munitions List, requiring DDTC licensing for all international transfers. EAR (Export Administration Regulations), administered by the Department of Commerce Bureau of Industry and Security, may apply to certain dual-use components and technologies not covered by ITAR. Additionally, many nations maintain their own export control regimes that apply to the import and re-export of defense articles, including the Wassenaar Arrangement in participating states, the EU Common Position on arms exports, and national export control laws in the destination country. Aegis Defense Systems maintains a dedicated export compliance team that manages all licensing requirements across these regulatory frameworks, provides full documentation for customs and trade compliance, and ensures that every international transfer is fully authorized before execution. Customers should anticipate 90-180 day export licensing timelines and provide required end-user certifications at the outset of procurement discussions.",
  },
];

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
          The FAQ is organized into four categories: General questions about the counter-UAS discipline and Aegis capabilities, Technology questions about our detection, classification, and neutralization systems, Deployment questions about installation, operation, and integration, and Regulatory questions about compliance, certifications, and legal frameworks. If your question is not addressed here, our solutions engineering team is available for direct consultation — use the contact form at the bottom of this page to reach them.
        </p>
      </TextSection>

      <FAQSection
        label="General"
        title="General Questions"
        items={generalQuestions}
      />

      <FAQSection
        label="Technology"
        title="Technology Questions"
        items={technologyQuestions}
      />

      <FAQSection
        label="Deployment"
        title="Deployment Questions"
        items={deploymentQuestions}
      />

      <FAQSection
        label="Regulatory"
        title="Regulatory & Compliance Questions"
        items={regulatoryQuestions}
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
