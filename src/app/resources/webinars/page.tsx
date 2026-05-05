"use client";

import {
  SectionHero,
  FeatureList,
  CTASection,
  TextSection,
  StatsSection,
} from "@/components/sections";

export default function WebinarsPage() {
  return (
    <>
      <SectionHero
        image="/images/resources/webinars.jpg"
        label="Resources"
        title="Webinars & Events"
        subtitle="Live and on-demand presentations covering emerging threats, technology deep dives, deployment best practices, and regulatory compliance — with interactive Q&A from our engineering and operations teams."
        cta="Register for Next Event"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="Learn from the Experts">
        <p>
          Aegis webinars bring the expertise of our engineering leadership and field operations teams directly to your desk. Each session is designed for defense professionals, system integrators, and procurement decision-makers who need authoritative, detailed information about counter-UAS technology and operations without the time and expense of travel. Our presenters are the same engineers who design our systems and the same operators who deploy them, ensuring that every webinar delivers actionable technical insight rather than marketing generalities.
        </p>
        <p>
          Our webinar program runs on a monthly cadence with two session formats. Technical Deep Dives are 90-minute sessions that examine a specific technology area in comprehensive detail, including live system demonstrations and extended Q&A. Strategic Briefings are 60-minute sessions that address broader topics such as threat landscape evolution, regulatory changes, and operational doctrine, featuring panel discussions with external experts from allied defense organizations and government agencies. All sessions are recorded and made available in our on-demand library within 48 hours of the live event.
        </p>
      </TextSection>

      <StatsSection
        label="Program Overview"
        stats={[
          { value: "6", label: "Upcoming Sessions" },
          { value: "24+", label: "On-Demand Recordings" },
          { value: "3,200+", label: "Attendees YTD" },
          { value: "94%", label: "Satisfaction Rating" },
        ]}
      />

      <FeatureList
        label="Upcoming"
        title="Live Webinars"
        items={[
          {
            title: "2025 Swarm Threat Evolution",
            tag: "March 18, 2025",
            description:
              "Our annual swarm threat update, presented by Dr. Elena Vasquez, Director of Threat Intelligence. This session covers the latest observed swarm tactics from conflict zones, the emergence of AI-coordinated decentralized swarm architectures, and new Aegis countermeasures optimized for heterogenous swarm engagement. Includes live demonstration of the updated Swarm Resolution Algorithm against a 30-platform simulated attack. Attendees will receive an advance copy of the 2025 Swarm Tactics white paper before public release. Open to cleared defense professionals only — ITAR compliance verification required.",
            href: "/request-demo",
          },
          {
            title: "Electronic Warfare in the C-UAS Fight",
            tag: "April 15, 2025",
            description:
              "A technical deep dive into the electronic warfare dimension of counter-UAS operations, presented by Colonel (Ret.) James Hartwell, VP of EW Programs. The session covers precision jamming techniques that disable drone control links without affecting friendly communications, GPS spoofing methodologies for redirecting threats to safe zones, and the emerging challenge of frequency-agile drones that hop across hundreds of channels per second. Includes classified performance data from recent operational deployments and a preview of the Aegis cognitive EW module scheduled for Q3 2025 release.",
            href: "/request-demo",
          },
          {
            title: "Airport C-UAS: Navigating Regulatory Complexity",
            tag: "May 20, 2025",
            description:
              "A strategic briefing on the regulatory landscape governing counter-UAS operations in civilian airspace, presented by Aegis Legal Counsel and representatives from the FAA and EASA. The session covers the latest FAA Section 333 exemption requirements, EASA Special Condition updates for C-UAS equipment, spectrum allocation for jamming operations, and the legal framework for drone interdiction across 12 jurisdictions. Features case studies from four international airports currently operating Aegis systems and a panel discussion with airport security directors on lessons learned from 24 months of operational deployment.",
            href: "/request-demo",
          },
        ]}
      />

      <FeatureList
        label="On-Demand"
        title="Recorded Sessions"
        items={[
          {
            title: "Introduction to the Aegis Architecture",
            tag: "Recorded",
            description:
              "The foundational overview of the five-layer Aegis Architecture — Sensor, Fusion, AI, Decision, and Action. This session covers the design philosophy behind each layer, the inter-layer data flows and timing requirements, and how the architecture achieves sub-20-millisecond kill chain closure from first sensor contact to engagement authorization. Recommended as the starting point for all new evaluators and integration teams. Includes 30 minutes of Q&A from the live session covering common integration questions and deployment scenarios.",
            href: "/request-demo",
          },
          {
            title: "RF Sensing Technology: Beyond Detection",
            tag: "Recorded",
            description:
              "Dr. Sarah Chen explains how modern RF sensing goes far beyond simple signal detection to provide threat identification, intent assessment, and forensic evidence collection. The session covers direction-finding array geometry, signal processing pipelines for extracting drone control protocols, and the emerging challenge of encrypted and frequency-hopping control links. Includes performance data from the latest Aegis RF array showing 50+ km detection range and 99.7% protocol identification accuracy against a library of 8,400 known drone communication signatures.",
            href: "/request-demo",
          },
          {
            title: "Edge Computing for Defense: Why It Matters",
            tag: "Recorded",
            description:
              "Markus Weber, VP of AI Engineering, makes the case for edge-first architecture in defense systems. The session explains why relying on cloud connectivity is unacceptable for mission-critical applications, how Aegis delivers 175 TOPS of AI inference in a deployable 800-watt package, and the engineering decisions that enable full autonomous operation when network connectivity is denied. Includes thermal and vibration testing footage from our environmental qualification program and a comparison of edge vs. cloud processing latency for the Aegis classification pipeline.",
            href: "/request-demo",
          },
          {
            title: "Critical Infrastructure Protection: Lessons from the Field",
            tag: "Recorded",
            description:
              "A panel discussion featuring Aegis field operations managers from three critical infrastructure deployments — a nuclear power station, a major seaport, and a government data center campus. The panel shares lessons learned from 18 months of continuous operation, covering false alarm management in cluttered environments, coordination with existing security infrastructure, regulatory compliance across different jurisdictions, and the operational procedures that maintain 99.97% system uptime. Includes anonymized engagement logs and statistical analysis of threat patterns observed at each site.",
            href: "/request-demo",
          },
          {
            title: "Sensor Fusion: Making Sense of Multi-Modal Data",
            tag: "Recorded",
            description:
              "A technical session on the mathematical foundations and practical implementation of multi-modal sensor fusion for counter-UAS. The presentation derives the Iterated Multi-Model Unscented Kalman Filter used in the Aegis Fusion Layer and demonstrates how combining radar, RF, EO/IR, and acoustic observations produces tracks that are more accurate and more reliable than any single sensor modality alone. Includes a live demonstration showing the performance difference between radar-only tracking and fused tracking against a low-observable drone in cluttered terrain.",
            href: "/request-demo",
          },
        ]}
      />

      <CTASection
        title="Stay Informed"
        subtitle="Register for our webinar mailing list and receive invitations to upcoming sessions plus early access to on-demand recordings."
        primaryCta="Register for Updates"
        primaryHref="/request-demo"
        secondaryCta="View All Events"
        secondaryHref="/news/events"
      />
    </>
  );
}
