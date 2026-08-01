"use client";

import {
  SectionHero,
  TextSection,
  FeatureList,
  CTASection,
  AnimatedLine,
  StatsSection,
} from "@/components/sections";

export default function TrainingPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/support/training.jpg"
        label="Training"
        title="Training Programs"
        subtitle="From basic operator qualification to advanced threat analysis and system administration — Aegis training produces confident, capable professionals who can leverage the full power of the Aegis platform under operational stress."
        cta="Enroll in Training"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── OVERVIEW ── */}
      <TextSection label="Overview" title="Train Like You Fight">
        <p>
          The most sophisticated counter-UAS system in the world is only as effective as the operator behind the console. That is why Aegis invests more in training than any other counter-UAS vendor — because we have seen firsthand how operator proficiency directly determines mission outcomes. Our training programs are developed and delivered by former military operators and defense engineers who bring real-world counter-UAS experience to every course.
        </p>
        <p>
          Aegis training goes beyond button-pushing. Our curriculum emphasizes threat understanding, tactical decision-making, and adaptive problem-solving — the skills that separate effective operators from trained users. Every course includes immersive scenario-based exercises that simulate real engagement conditions, including degraded communications, multi-axis attacks, and rules-of-engagement constraints.
        </p>
      </TextSection>

      {/* ── TRAINING STATS ── */}
      <StatsSection
        label="Training Impact"
        stats={[
          { value: "500+", label: "Operators Trained" },
          { value: "12", label: "Nations Served" },
          { value: "98%", label: "Pass Rate" },
          { value: "24", label: "Instructors" },
        ]}
      />

      {/* ── COURSE CATALOG ── */}
      <FeatureList
        label="Course Catalog"
        title="Training Programs"
        items={[
          {
            title: "Aegis Operator Course",
            tag: "5 Days · Arlington or On-Site · Contact for Pricing",
            description:
              "The foundational training program for all Aegis system operators. Covers daily operations, threat assessment, engagement authorization, and graduated response protocols. Students complete 16 hours of simulator time across a minimum of 12 scenario-based exercises, culminating in a live-fire demonstration with real UAS targets. Topics include system architecture and components, sensor operations and management, track interpretation and situational awareness, classification confidence evaluation, engagement procedures and rules of employment, and basic troubleshooting. Upon successful completion, operators receive Aegis Operator Qualification required for unsupervised operation. No prerequisites beyond a valid security clearance. Pre-course self-study module (4 hours) required.",
          },
          {
            title: "System Administrator Course",
            tag: "10 Days · Arlington · Contact for Pricing",
            description:
              "Trains IT and communications professionals to install, configure, maintain, and troubleshoot Aegis hardware and software. Covers system configuration and deployment, maintenance procedures and spare parts management, software updates and rollback management, network troubleshooting and cybersecurity hardening, health monitoring and performance optimization, and disaster recovery and backup procedures. Students perform all first-line and second-line maintenance tasks on live Aegis hardware. Lab exercises include simulated failure scenarios requiring diagnostic fault isolation and system restoration. Prerequisite: Aegis Operator Course or equivalent operational experience.",
          },
          {
            title: "Aegis Command Master Class",
            tag: "3 Days · Arlington · Contact for Pricing",
            description:
              "Advanced C2 training for fleet managers and senior operators. Covers multi-system coordination across distributed defense networks, rules of engagement management and hierarchical authorization, after-action review methodology and reporting, resource allocation under contested conditions, and cross-domain coordination with allied C2 systems. The course uses the high-fidelity Aegis Tactical Simulator to reproduce complex multi-threat scenarios requiring coordination between four or more Aegis nodes. Students learn to manage overlapping coverage zones, deconflict engagement assignments, and maintain situational awareness across a distributed battlespace. Prerequisite: Aegis Operator Course qualification.",
          },
          {
            title: "Integration Engineering Workshop",
            tag: "5 Days · Arlington · Contact for Pricing",
            description:
              "Designed for partners and customer engineering teams who need to integrate Aegis with existing defense architectures. Covers API development and authentication flows, STANAG 4676 interface configuration and testing, custom sensor integration using the Aegis Adapter SDK, data model extensions and custom classification pipelines, and performance testing and validation procedures. Students build a working integration with a simulated external system during the course, including track data exchange, alert forwarding, and system status monitoring. Hands-on labs use the Aegis Integration Test Bench, which provides a sandboxed environment with simulated sensor feeds and external C2 interfaces. No prior Aegis experience required — suitable for software engineers and system architects.",
          },
          {
            title: "Executive Briefing Program",
            tag: "1 Day · Arlington or On-Site · Contact for Pricing",
            description:
              "For senior decision-makers who need to understand Aegis capabilities, limitations, and employment considerations without the technical depth of operator training. Covers the counter-UAS threat landscape and its strategic implications, Aegis system capabilities and demonstrated performance, rules of engagement and legal frameworks, force structure and staffing requirements, and total cost of ownership and lifecycle planning. The program includes a live demonstration of Aegis capabilities and a question-and-answer session with Aegis operational leadership. Ideal for procurement decision-makers, military leadership, and government stakeholders evaluating counter-UAS programs. No prerequisites. Available on-site at customer locations worldwide.",
          },
        ]}
      />

      {/* ── FACILITIES ── */}
      <section className="py-20 md:py-32 bg-black border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Arlington */}
            <div className="border border-white/10 bg-[#0a0a0a] p-8">
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1 inline-block mb-6">
                Americas
              </span>
              <h3 className="text-2xl font-bold text-white mb-4">
                Arlington, Virginia
              </h3>
              <p className="text-[#b9b9b9] text-sm leading-relaxed mb-6">
                Our flagship training center features multiple classrooms with Aegis operator workstations, a high-fidelity tactical simulator suite, a live-fire range for UAS engagement demonstrations, and secure briefing rooms for classified course content. Houses the Aegis Threat Library with over 800 curated threat profiles.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-white">6</div>
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[#767676] mt-1">Classrooms</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[#767676] mt-1">Simulator Stations</div>
                </div>
              </div>
            </div>

            {/* On-Site */}
            <div className="border border-white/10 bg-[#0a0a0a] p-8">
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1 inline-block mb-6">
                Global
              </span>
              <h3 className="text-2xl font-bold text-white mb-4">
                Mobile Training Teams
              </h3>
              <p className="text-[#b9b9b9] text-sm leading-relaxed mb-6">
                All courses are available at customer facilities worldwide. Mobile training requires a suitable classroom environment with network connectivity, projector, and space for operator workstations. For live-fire demonstrations, a suitable outdoor range with appropriate airspace clearances is required.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[#767676] mt-1">Countries Supported</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">1:6</div>
                  <div className="text-[10px] uppercase tracking-[0.12em] text-[#767676] mt-1">Instructor Ratio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Invest in Operator Excellence"
        subtitle="The best technology demands the best operators. Aegis training programs produce professionals who are confident under pressure, proficient across all system capabilities, and ready for whatever the threat environment delivers."
        primaryCta="Enroll in Training"
        primaryHref="/request-demo"
        secondaryCta="Contact Training Team"
        secondaryHref="/request-demo"
      />
    </>
  );
}
