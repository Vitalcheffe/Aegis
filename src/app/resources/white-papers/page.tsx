"use client";

import {
  SectionHero,
  FeatureList,
  CTASection,
  TextSection,
} from "@/components/sections";

export default function WhitePapersPage() {
  return (
    <>
      <SectionHero
        image="/images/resources/white-papers.jpg"
        label="Resources"
        title="White Papers"
        subtitle="In-depth technical analyses and strategic assessments from the Aegis research team — authoritative references for defense planners, system architects, and procurement professionals."
        cta="Download Library"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="Research & Analysis">
        <p>
          The Aegis research division publishes white papers that represent the most rigorous and comprehensive analyses available in the counter-UAS domain. Each paper undergoes a multi-stage peer review process involving our engineering leadership, field operations teams, and external subject matter experts from allied defense organizations. Our research program draws on data from over 200 deployed Aegis systems across 14 countries, providing an empirical foundation that purely academic studies cannot match. Every claim is substantiated by operational data, every model is validated against real-world performance, and every recommendation is grounded in deployable capability rather than theoretical possibility.
        </p>
        <p>
          Our white paper library spans four categories: Threat Intelligence reports that analyze emerging drone capabilities and adversarial tactics, Technology Deep Dives that examine the science behind Aegis detection, classification, and neutralization systems, Operational Analyses that document lessons learned from live deployments and field exercises, and Compliance Guides that navigate the regulatory landscape governing counter-UAS operations in civilian and military airspace. All papers are available for download in PDF format and are updated annually to reflect the latest threat intelligence and technology developments.
        </p>
      </TextSection>

      <FeatureList
        label="Threat Intelligence"
        title="Threat Landscape Reports"
        items={[
          {
            title: "2025 Counter-UAS Threat Landscape",
            description:
              "Our flagship annual threat assessment covering 147 new commercial drone models with potential military application, 23 confirmed swarm attack incidents across three continents, and the emergence of GPS-denied navigation in adversarial platforms. The report analyzes the rapid commoditization of autonomous flight controllers, the proliferation of encrypted control links that evade legacy RF detectors, and the increasing use of AI-based path planning that renders traditional trajectory prediction ineffective. Includes threat matrices for 12 operational scenarios ranging from VIP protection to forward operating base defense. Cited by NATO JAPCC and five national C-UAS programs as a primary reference document.",
            tag: "Annual Report",
            href: "/request-demo",
          },
          {
            title: "Swarm Tactics: Evolution & Countermeasures",
            description:
              "A comprehensive analysis of coordinated multi-drone attack methodologies observed in conflict zones and test environments from 2022 through 2025. This paper documents the evolution from simple synchronized attacks to sophisticated heterogenous swarms combining reconnaissance, kinetic strike, and electronic warfare platforms operating under decentralized command architectures. We present the Aegis Swarm Resolution Algorithm, which decomposes swarm engagements into individual threat tracks and assigns graduated responses based on each platform's assessed role and capability. Validated against 47 live swarm exercises with engagement success rates exceeding 99.2%.",
            tag: "Swarm Analysis",
            href: "/request-demo",
          },
          {
            title: "Civilian Drone Modifications for Hostile Use",
            description:
              "An intelligence assessment cataloging 84 documented cases of commercial DJI, Autel, and Skydio platforms modified for surveillance, weapons delivery, and electronic attack. The paper details common modification patterns — including encrypted communication retrofitting, payload bay adaptation for grenades and IEDs, and the installation of GPS spoofing modules for navigation in denied environments. For each modification category, we provide detection signatures, RF fingerprinting profiles, and recommended Aegis sensor configurations to ensure reliable identification of modified platforms that may appear benign to standard classification models.",
            tag: "Intelligence",
            href: "/request-demo",
          },
        ]}
      />

      <FeatureList
        label="Technology Deep Dives"
        title="Technical Research"
        items={[
          {
            title: "Multi-Modal Sensor Fusion for C-UAS",
            description:
              "A technical deep dive into the Iterated Multi-Model Unscented Kalman Filter (IMM-UKF) at the core of the Aegis Fusion Layer. This paper derives the mathematical framework for correlating observations from radar, RF direction-finding, EO/IR cameras, and acoustic sensors into unified high-confidence tracks. We present empirical results showing that multi-modal fusion achieves 98.9% classification accuracy compared to 78.3% for radar-only and 71.6% for RF-only approaches. The paper also covers our proprietary sensor management algorithm that dynamically allocates sensor resources to maximize detection probability against the most threatening contacts in real time.",
            tag: "Sensor Fusion",
            href: "/request-demo",
          },
          {
            title: "Neural Network Architectures for Real-Time Threat Classification",
            description:
              "An examination of the deep learning architectures deployed on the Aegis Neural Processing Unit for sub-20-millisecond threat classification. This paper details our hybrid architecture combining convolutional neural networks for RF signal pattern recognition, transformer models for behavioral sequence analysis, and graph neural networks for swarm relationship mapping. We present training methodology using our 12-million-signature dataset, adversarial robustness testing against deliberate signal spoofing, and deployment optimization techniques that achieve 175 TOPS inference throughput within a 400-watt power envelope. Includes performance benchmarks against legacy rule-based classification approaches.",
            tag: "AI & ML",
            href: "/request-demo",
          },
        ]}
      />

      <FeatureList
        label="Operational Analysis"
        title="Field Reports"
        items={[
          {
            title: "Airport C-UAS Deployment: 24-Month Performance Review",
            description:
              "A longitudinal study analyzing 24 months of continuous Aegis operation at a major international airport, documenting 347 confirmed drone intrusions, 100% detection rate for objects exceeding 2 kg within the 15 km protection zone, and zero false positives resulting in unnecessary operational disruption. The paper covers the graduated response protocol that resolved 312 incidents through RF jamming alone, 28 through GPS spoofing redirect, and 7 through kinetic interdiction by airport security personnel directed by Aegis tracking data. Includes detailed analysis of seasonal detection performance variations and recommended sensor tuning parameters for airport environments.",
            tag: "Case Study",
            href: "/request-demo",
          },
          {
            title: "Forward Operating Base Protection Under Electronic Attack",
            description:
              "An operational analysis of Aegis performance during a six-month deployment at a forward operating base in a contested electromagnetic environment. The paper documents 89 drone threats encountered while adversarial forces conducted continuous jamming of the 2.4 GHz and 5.8 GHz bands. Despite the degraded RF environment, Aegis maintained 96.7% detection rate through reliance on radar and EO/IR sensor modalities, with the Fusion Layer automatically deprioritizing corrupted RF observations and reallocating tracking resources to surviving sensor channels. The paper provides recommended configuration templates for operations in electromagnetically contested environments.",
            tag: "Military Ops",
            href: "/request-demo",
          },
          {
            title: "Urban C-UAS: Navigating the Civilian Airspace Challenge",
            description:
              "A framework for deploying counter-UAS systems in dense urban environments where the vast majority of radar returns are legitimate civilian aircraft, birds, and ground clutter. This paper presents the Aegis Urban Discrimination Model, which leverages 17 behavioral and 23 signal features to achieve a false alarm rate below 0.01% while maintaining 99.1% detection probability for genuine threats. The paper also addresses regulatory compliance in civilian airspace, including coordination with ATC, spectrum management for jamming operations, and the legal framework for drone interdiction across 12 jurisdictions.",
            tag: "Urban Ops",
            href: "/request-demo",
          },
        ]}
      />

      <CTASection
        title="Access the Full Library"
        subtitle="Register for complimentary access to our complete white paper library, or contact our solutions team for custom research and threat assessments tailored to your operational environment."
        primaryCta="Register for Access"
        primaryHref="/request-demo"
        secondaryCta="Contact Research Team"
        secondaryHref="/contact"
      />
    </>
  );
}
