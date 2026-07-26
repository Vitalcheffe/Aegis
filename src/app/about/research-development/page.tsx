"use client";

import {
  SectionHero,
  TextSection,
  SplitSection,
  StatsSection,
  FeatureList,
  FAQSection,
  CTASection,
  AnimatedLine,
  CardGrid,
} from "@/components/sections";

export default function ResearchDevelopmentPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/lab-research.jpg"
        label="R&D"
        title="Research & Development"
        subtitle="Aegis R&D is where tomorrow's counter-UAS capabilities are born. Our research programs push the boundaries of detection, classification, and neutralization — turning scientific breakthroughs into fielded systems within months, not decades."
        cta="Partner with Our R&D Team"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── OVERVIEW ── */}
      <TextSection label="Overview" title="Where Innovation Meets Mission">
        <p>
          The counter-UAS threat landscape evolves faster than traditional defense procurement cycles can accommodate. New drone types emerge monthly, adversarial tactics adapt weekly, and commercial drone technology improves continuously. Aegis Research and Development exists to ensure that our capabilities evolve faster than the threats they are designed to counter. Our R&D programs are not academic exercises — they are mission-driven research initiatives that are measured by their impact on operational capability, not by publication counts or patent filings.
        </p>
        <p>
          Our approach to R&D is fundamentally different from legacy defense contractors. We do not pursue technology for technology's sake. Every research program is motivated by a specific operational gap identified through customer feedback, threat intelligence analysis, or emerging requirement signals from allied defense ministries. Research programs are structured with clear milestones, operational success criteria, and transition pathways to production. If a research program cannot demonstrate a path to fielded capability within 18 months, it is restructured or terminated — because our customers cannot wait for capabilities that never arrive.
        </p>
        <p>
          Aegis R&D operates across three laboratories and maintains active research partnerships with MIT Lincoln Laboratory, Johns Hopkins Applied Physics Laboratory, and the NATO Science and Technology Organization. Our research portfolio spans artificial intelligence and machine learning, advanced signal processing, directed energy weapons, autonomous systems, and quantum sensing — the technologies that will define the next generation of counter-UAS defense.
        </p>
      </TextSection>

      {/* ── R&D STATS ── */}
      <StatsSection
        label="R&D Investment"
        stats={[
          { value: "$120M+", label: "Annual R&D Budget" },
          { value: "85", label: "Research Engineers" },
          { value: "14", label: "Active Programs" },
          { value: "32", label: "Patents Filed" },
          { value: "6mo", label: "Avg. Time to Field" },
        ]}
      />

      {/* ── KEY RESEARCH AREAS ── */}
      <SplitSection
        image="/images/pages/about-engineering.jpg"
        label="Core Research"
        title="Artificial Intelligence & Machine Learning"
        description="AI and ML are the foundation of Aegis's next-generation capabilities. Our AI research focuses on three areas: real-time threat classification using multi-modal sensor fusion, predictive threat modeling that anticipates adversary behavior, and autonomous engagement decision-making under human supervision. Our custom Neural Processing Unit, built on NVIDIA GPU architecture, delivers classification inference in under 20 milliseconds — fast enough to support automated engagement decisions against maneuvering UAS at tactical ranges. Current research programs include transformer-based models for multi-sensor fusion, reinforcement learning for adaptive engagement strategies, and federated learning architectures that enable collaborative model improvement across deployed systems without sharing classified training data."
        cta="Explore Our Technology"
        ctaHref="/technology"
        stats={[
          { value: "12ms", label: "Classification Latency" },
          { value: "99.4%", label: "Classification Accuracy" },
        ]}
      />

      {/* ── RESEARCH PROGRAMS ── */}
      <FeatureList
        label="Research Programs"
        title="Active R&D Programs"
        items={[
          {
            title: "Advanced Signal Processing",
            description:
              "Our signal processing research develops novel algorithms for detecting, characterizing, and geolocating UAS RF emissions in congested and contested electromagnetic environments. Current programs include cognitive radio techniques for adaptive spectrum monitoring, compressive sensing for wideband signal detection with reduced hardware requirements, and machine learning-based emitter identification that can distinguish between UAS command links and benign RF sources with 99.7% accuracy. These algorithms are implemented on our custom FPGA-based signal processing cards, which provide real-time processing of 2 GHz instantaneous bandwidth across the full 20 MHz to 6 GHz spectrum.",
            tag: "Signal Processing",
          },
          {
            title: "Directed Energy Weapons",
            description:
              "Aegis is developing directed energy weapon integration capabilities that will provide the first truly unlimited-munition counter-UAS solution. Our high-energy laser program integrates solid-state laser systems rated at 50-300 kW with the Aegis engagement framework, enabling sub-second engagement of Group 1 and Group 2 UAS at ranges exceeding 1.5 kilometers. Our high-power microwave program develops non-kinetic neutralization capabilities that can disable UAS electronics at range without causing collateral damage. Both programs are transitioning from laboratory demonstration to field prototype, with initial operational capability planned for 2026.",
            tag: "Directed Energy",
          },
          {
            title: "Swarm Detection & Defeat",
            description:
              "The emergence of UAS swarm tactics — where multiple drones coordinate to overwhelm defensive systems through sheer numbers — represents a fundamental challenge to existing counter-UAS approaches. Our swarm research program develops algorithms for detecting swarm behavior patterns, predicting swarm trajectories, and optimizing multi-target engagement strategies that maximize neutralization effectiveness with limited effector resources. Key innovations include graph neural networks for swarm topology analysis, game-theoretic engagement optimization, and distributed coordination protocols that enable multiple Aegis nodes to share engagement responsibilities in real time.",
            tag: "Swarm Defense",
          },
          {
            title: "Quantum Sensing",
            description:
              "Our quantum sensing program explores the use of quantum technologies for next-generation UAS detection. Current research focuses on quantum radar concepts that exploit quantum entanglement to achieve detection performance that exceeds classical radar limitations, particularly against low-observable UAS with reduced radar cross-sections. While practical quantum radar remains a long-term research objective, near-term applications include quantum-enhanced RF receivers with dramatically improved sensitivity and quantum magnetometers that can detect the magnetic signatures of small electric motors at ranges relevant to counter-UAS operations.",
            tag: "Quantum",
          },
          {
            title: "Autonomous Systems",
            description:
              "Aegis autonomous systems research develops the decision-making architectures that enable supervised autonomous counter-UAS engagements. Our research addresses the three key challenges of autonomous engagement: ensuring that autonomous decisions are consistent with rules of engagement, maintaining meaningful human oversight over automated processes, and verifying that autonomous behavior is predictable and reliable under all operational conditions. Current programs include formal verification methods for autonomous decision algorithms, explainable AI techniques that provide human-readable explanations of classification and engagement decisions, and human-autonomy teaming frameworks that optimize the allocation of decisions between human operators and automated systems.",
            tag: "Autonomy",
          },
        ]}
      />

      {/* ── RESEARCH LABS ── */}
      <CardGrid
        label="Facilities"
        title="Research Laboratories"
        cards={[
          {
            title: "Arlington Innovation Lab",
            description:
              "Our primary R&D facility, co-located with Aegis headquarters in Arlington, Virginia, houses 45 research engineers and our most advanced experimental systems. The lab includes an anechoic chamber for RF testing, a high-performance computing cluster for AI model training, a directed energy test range, and a simulator suite for algorithm validation. The Arlington lab also hosts our collaborative research programs with MIT Lincoln Laboratory and Johns Hopkins APL.",
            image: "/images/pages/tech-circuit.jpg",
            tag: "Primary",
          },
          {
            title: "Tel Aviv Advanced Research Center",
            description:
              "Our Tel Aviv research center focuses on signal processing, electronic warfare, and RF sensing — leveraging Israel's world-leading expertise in defense electronics. The center employs 25 researchers and maintains close relationships with Israeli defense technology companies and academic institutions. The Tel Aviv center also operates our Middle East field test facility, which provides access to operational environments and threat profiles unique to the region.",
            image: "/images/pages/technology-hero.jpg",
            tag: "Signal Processing",
          },
          {
            title: "Farnborough Systems Integration Lab",
            description:
              "Our Farnborough, UK facility serves as the primary integration and validation lab for European and NATO-specific requirements. The lab includes a NATO-standard network test bed, a multi-sensor integration suite, and a dedicated space for STANAG compliance testing. The Farnborough lab works closely with the UK Ministry of Defence and NATO research organizations on interoperability and coalition operations research programs.",
            image: "/images/pages/about-engineering.jpg",
            tag: "Integration",
          },
        ]}
      />

      {/* ── FAQ ── */}
      <FAQSection
        label="R&D FAQ"
        title="Research & Development Questions"
        items={[
          {
            question: "How does Aegis transition research to operational capability?",
            answer:
              "Every Aegis research program follows our Rapid Capability Transition (RCT) process, which structures the path from laboratory demonstration to fielded system. RCT defines five maturity gates — concept validation, prototype demonstration, operational assessment, limited deployment, and full operational capability — each with specific success criteria that must be met before advancing. This disciplined approach has enabled Aegis to transition research capabilities to production in an average of 6 months, compared to the 5-10 year timelines typical of traditional defense R&D programs.",
          },
          {
            question: "Can customers participate in Aegis research programs?",
            answer:
              "Yes. Aegis offers Cooperative Research and Development Agreements (CRADAs) that enable qualified customers to participate in research programs relevant to their operational requirements. Customer participation may include operational scenario definition, test and evaluation support, and early access to research prototypes. CRADA terms are customized to each program and customer, with clear provisions for IP ownership, data rights, and publication restrictions.",
          },
          {
            question: "What is Aegis's approach to AI ethics and responsible autonomy?",
            answer:
              "Aegis adheres to the U.S. Department of Defense Ethical Principles for Artificial Intelligence and the NATO Responsible AI Principles. Our autonomous systems research incorporates formal verification, explainable AI, and human-on-the-loop oversight as core requirements — not optional features. Every autonomous capability is designed with configurable authorization gates that ensure human decision-making authority over the use of force is maintained at all times.",
          },
          {
            question: "How is R&D funded at Aegis?",
            answer:
              "Aegis R&D is funded through a combination of internal investment, customer-funded research programs, and government research grants. Internal R&D investment represents approximately 15% of annual revenue, ensuring that we maintain an independent research capability that is not dependent on specific customer funding. Customer-funded research is conducted under separate agreements that define IP ownership and data rights. Government research grants support basic research in areas with broad defense applicability.",
          },
          {
            question: "Does Aegis publish its research findings?",
            answer:
              "Aegis publishes selected research findings in peer-reviewed journals and at defense technology conferences, subject to classification and export control review. We believe that responsible publication advances the broader counter-UAS field and attracts top research talent. Publications are reviewed by our classification office and export compliance team before submission. We also file patents on inventions that have commercial and defensive value, with 32 patents currently granted or pending.",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Shape the Future of Counter-UAS Defense"
        subtitle="Whether you are a defense agency with a research requirement, an academic institution seeking collaboration, or an engineer looking to solve the hardest problems in defense technology — Aegis R&D offers the resources, the mission, and the team to make it happen."
        primaryCta="Partner with Our R&D Team"
        primaryHref="/request-demo"
        secondaryCta="Explore Careers in R&D"
        secondaryHref="/careers"
      />
    </>
  );
}
