"use client";

import {
  SectionHero,
  FeatureList,
  CTASection,
} from "@/components/sections";

export default function CareersOpeningsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/openings-hero.jpg"
        label="Careers"
        title="Open Positions"
        subtitle="Find Your Role"
        gradient="from-black via-black/80 to-black/50"
        align="center"
      />

      {/* ── JOB LISTINGS ── */}
      <FeatureList
        label="Current Openings"
        title="Available Positions"
        items={[
          {
            title: "Senior Radar Engineer",
            description:
              "Lead the design, simulation, and optimization of S-Band and X-Band radar signal processing pipelines for Aegis detection systems. You will own the end-to-end radar processing chain from raw I/Q data through CFAR detection, STAP clutter suppression, and track initiation. Requires 8+ years in radar systems engineering with demonstrated expertise in phased array beamforming, waveform design, and real-time DSP implementation on GPU-accelerated platforms. Active Secret clearance required; TS/SCI preferred. Location: Arlington, VA or San Francisco, CA.",
            tag: "Engineering",
            href: "/request-demo",
          },
          {
            title: "ML Research Scientist",
            description:
              "Develop novel transformer and diffusion architectures for real-time multi-spectral threat classification and trajectory prediction. You will work with Aegis Research Labs' 12-million-signature labeled dataset — the largest of its kind — to push classification accuracy beyond 99.5% while maintaining sub-20ms inference latency on edge hardware. Publish in top-tier venues (NeurIPS, ICML, CVPR) and directly ship research into operational systems within 18 months. PhD in ML, computer vision, or signal processing required. Location: San Francisco, CA.",
            tag: "Research",
            href: "/request-demo",
          },
          {
            title: "Counter-UAS Analyst",
            description:
              "Analyze evolving drone threat patterns from operational theaters worldwide, produce tactical intelligence reports, and translate adversary TTPs into product requirements. You will maintain the Aegis Threat Library, brief senior leadership and customers, and work directly with engineering to ensure our systems stay ahead of the threat curve. Military intelligence or SIGINT background required. Active TS/SCI clearance mandatory. Location: Arlington, VA with 25% travel to operational sites.",
            tag: "Operations",
            href: "/request-demo",
          },
          {
            title: "Systems Architect",
            description:
              "Design the distributed systems architecture for Aegis Core v4.0, spanning real-time edge compute nodes, cloud-based analytics pipelines, and hardened tactical mesh networks. You will define service boundaries, data contracts, and deployment topologies that support 500+ concurrent target tracking with five-nines availability. Experience with real-time distributed systems, Kubernetes, and defense certifications (STIG, RMF) required. Location: San Francisco, CA or London, UK.",
            tag: "Engineering",
            href: "/request-demo",
          },
          {
            title: "DevOps Engineer",
            description:
              "Build and maintain the CI/CD pipelines, infrastructure automation, and deployment tooling that ship Aegis software from development to operational sites worldwide. You will manage air-gapped deployment workflows, cross-domain solution configurations, and automated compliance validation for STIG and RMF requirements. Experience with Terraform, Ansible, container hardening, and IL4/IL5 environments required. Location: San Francisco, CA with occasional CONUS travel.",
            tag: "Engineering",
            href: "/request-demo",
          },
          {
            title: "Product Manager",
            description:
              "Own the product roadmap for Aegis Command, our enterprise multi-site management platform. Translate operational requirements from defense ministries and critical infrastructure operators into prioritized feature specifications. Drive sprint planning, stakeholder alignment, and release coordination across engineering, design, and field operations teams. 5+ years in B2B SaaS product management; defense or critical infrastructure domain experience strongly preferred. Location: Arlington, VA or San Francisco, CA.",
            tag: "Product",
            href: "/request-demo",
          },
          {
            title: "Field Service Engineer",
            description:
              "Deploy, commission, and sustain Aegis systems at customer sites across EUCOM, INDOPACOM, and CENTCOM areas of responsibility. You will perform hardware installation, software configuration, system validation, and on-site operator training — ensuring 99.97% operational availability for systems protecting critical national assets. Requires 4+ years in defense field engineering, active Secret clearance, and willingness to travel 60% to austere locations. Locations: Multiple — Germany, South Korea, UAE, and CONUS.",
            tag: "Operations",
            href: "/request-demo",
          },
          {
            title: "Cybersecurity Specialist",
            description:
              "Protect Aegis infrastructure, source code, and classified program data against nation-state cyber threats. You will manage the vulnerability management program, conduct red team exercises, maintain RMF/STIG compliance, and lead incident response for our global network of development and operational environments. Experience with CMMC Level 3, NIST 800-171, and classified system accreditation required. Active TS/SCI clearance mandatory. Location: Arlington, VA.",
            tag: "Security",
            href: "/request-demo",
          },
          {
            title: "Software Engineer",
            description:
              "Build the real-time command interface and sensor fusion backend that powers Aegis Core. You will develop high-throughput data pipelines processing 10,000+ sensor messages per second, implement multi-target tracking algorithms, and design intuitive operator workflows that reduce cognitive load under combat conditions. Strong systems programming skills in Rust, C++, or Go required. Experience with real-time graphics or defense C2 systems preferred. Location: San Francisco, CA or London, UK.",
            tag: "Engineering",
            href: "/request-demo",
          },
          {
            title: "Test Engineer",
            description:
              "Design and execute comprehensive verification and validation campaigns for Aegis products across all operational environments. You will develop automated test frameworks for hardware-in-the-loop simulation, manage formal qualification testing to MIL-STD-810 and MIL-STD-461, and produce test reports for customer acceptance. Experience with defense test methodologies and environmental testing required. Location: San Francisco, CA with travel to test ranges (White Sands, Yuma, Eglin AFB).",
            tag: "Engineering",
            href: "/request-demo",
          },
          {
            title: "Technical Writer",
            description:
              "Create and maintain the documentation suite for Aegis products — from operator manuals and maintenance procedures to API references and system architecture guides. You will work directly with engineers and operators to translate complex technical concepts into clear, actionable documentation that supports deployment, training, and compliance. Experience with defense technical publications (MIL-DTL-87900) and XML-based authoring systems preferred. Location: Remote with quarterly on-site in San Francisco, CA.",
            tag: "Engineering",
            href: "/request-demo",
          },
          {
            title: "Business Development Manager",
            description:
              "Identify, qualify, and close new business opportunities with defense ministries, intelligence agencies, and critical infrastructure operators across assigned territories. You will manage the full procurement lifecycle from initial engagement through contract award, coordinate with engineering on proposal technical volumes, and represent Aegis at international defense exhibitions. 10+ years in defense BD with established relationships in EUCOM or INDOPACOM required. Active Secret clearance preferred. Location: Arlington, VA or London, UK with 40% travel.",
            tag: "Sales",
            href: "/request-demo",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Don't See Your Role?"
        subtitle="We're always looking for exceptional people. Send us your resume and tell us how you can contribute to the mission."
        primaryCta="Submit Your Resume"
        primaryHref="/request-demo"
        secondaryCta="Our Culture"
        secondaryHref="/careers/culture"
      />
    </>
  );
}
