"use client";

import {
  SectionHero,
  Callout,
  StatsSection,
  FeatureList,
  SplitSection,
  CardGrid,
  CTASection,
} from "@/components/sections";

export default function CareersPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/careers-hero.jpg"
        label="Aegis Defense Systems"
        title="Careers"
        subtitle="Build the Future of Defense"
        gradient="from-black via-black/80 to-black/50"
        align="center"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Join the team that is defining the next generation of counter-UAS
        defense. At Aegis, your work protects nations, safeguards critical
        infrastructure, and saves lives — every single day.
      </Callout>

      {/* ── STATS ── */}
      <StatsSection
        label="By the Numbers"
        stats={[
          { value: "800+", label: "Employees" },
          { value: "15", label: "Countries" },
          { value: "40%", label: "Veterans" },
          { value: "98%", label: "Retention" },
        ]}
      />

      {/* ── DEPARTMENTS ── */}
      <FeatureList
        label="Explore Teams"
        title="Departments"
        items={[
          {
            title: "Engineering",
            description:
              "Design and build the core systems that power our counter-UAS platform — from real-time sensor fusion algorithms and distributed command architectures to embedded firmware and high-frequency RF systems. Our engineers work on problems with no textbook solutions, pushing the boundary of what's possible in detection, classification, and neutralization.",
            href: "/careers/openings",
            tag: "120+ Engineers",
          },
          {
            title: "Product",
            description:
              "Translate operational requirements from warfighters and security operators into product features that matter. Product managers at Aegis own the roadmap from customer discovery through deployment, working at the intersection of defense mission needs and cutting-edge technology. Every feature ships to real operators in the field within months.",
            href: "/careers/openings",
            tag: "Product-Led",
          },
          {
            title: "Research",
            description:
              "Aegis Research Labs operates at the frontier of AI, signal processing, and directed energy. Our researchers publish in top-tier journals, hold 90+ patents, and directly transform breakthroughs into operational capabilities within 18 months. Current focus areas include transformer-based swarm detection, quantum RF sensing, and autonomous kill-chain optimization.",
            href: "/careers/openings",
            tag: "90+ Patents",
          },
          {
            title: "Operations",
            description:
              "Deploy, sustain, and optimize Aegis systems across 12 nations and every operational environment — from Arctic research stations to desert forward operating bases to naval vessels at sea. Operations engineers are the bridge between our technology and the customers who depend on it, ensuring 99.97% operational availability.",
            href: "/careers/openings",
            tag: "Global Deployment",
          },
          {
            title: "Sales",
            description:
              "Build and maintain relationships with defense ministries, intelligence agencies, and critical infrastructure operators worldwide. Our sales team navigates complex procurement landscapes, manages multi-year contract cycles, and ensures that every customer deployment delivers measurable operational impact. Deep domain expertise in defense acquisition required.",
            href: "/careers/openings",
            tag: "12 Nations",
          },
          {
            title: "Security",
            description:
              "Protect Aegis infrastructure, intellectual property, and personnel against nation-state threats. Our security team manages facility clearances, insider threat programs, cyber defense operations, and classified program protection — ensuring that our technology remains secure from adversarial compromise at every layer of the stack.",
            href: "/careers/openings",
            tag: "Classified Programs",
          },
        ]}
      />

      {/* ── CULTURE SPLIT ── */}
      <SplitSection
        image="/images/pages/careers-culture.jpg"
        label="Culture"
        title="Mission-Driven. People-First."
        description="At Aegis, we believe that the strongest defense starts with the strongest team. Our culture blends the discipline and purpose of military service with the velocity and innovation of a technology startup. Every project has direct operational impact — the code you write, the systems you design, and the analysis you produce are protecting real people in real places, right now. We hire for mission alignment as much as technical excellence, and we invest in our people through continuous learning, leadership development, and industry-leading benefits."
        cta="Explore Our Culture"
        ctaHref="/careers/culture"
      />

      {/* ── BENEFITS SPLIT ── */}
      <SplitSection
        image="/images/pages/careers-benefits.jpg"
        label="Benefits"
        title="Invested in Your Success"
        description="Aegis offers comprehensive benefits designed for the unique demands of defense work. Competitive equity packages with four-year vesting give every employee ownership in our mission. Unlimited PTO is matched with mandatory minimums to prevent burnout. Relocation support, security clearance sponsorship, and professional development budgets ensure that nothing stands between you and your best work. For our veteran employees, we provide transition support, skill credentialing, and a community that values your service."
        reverse
        stats={[
          { value: "100%", label: "Health Coverage" },
          { value: "$10K", label: "Annual Learning Budget" },
          { value: "4 yr", label: "Equity Vesting" },
          { value: "12 wk", label: "Parental Leave" },
        ]}
      />

      {/* ── FEATURED OPENINGS ── */}
      <CardGrid
        label="Featured Openings"
        title="Open Positions"
        cards={[
          {
            title: "Senior Radar Engineer",
            description:
              "Lead the design and optimization of S-Band and X-Band radar processing pipelines for our next-generation detection system. Requires 8+ years in radar systems engineering with expertise in CFAR algorithms, STAP, and phased array beamforming.",
            image: "/images/pages/detection-sensor.jpg",
            href: "/careers/openings",
            tag: "Engineering",
          },
          {
            title: "ML Research Scientist",
            description:
              "Develop novel transformer architectures for real-time multi-spectral threat classification. Work with the largest labeled C-UAS dataset in existence to push accuracy beyond 99.5%. PhD in ML, CV, or signal processing preferred.",
            image: "/images/pages/classification-ai.jpg",
            href: "/careers/openings",
            tag: "Research",
          },
          {
            title: "Counter-UAS Analyst",
            description:
              "Analyze evolving drone threat patterns, produce tactical intelligence reports, and inform product requirements based on real-world operational data. Military intelligence background and active TS/SCI clearance required.",
            image: "/images/pages/tracking-screen.jpg",
            href: "/careers/openings",
            tag: "Operations",
          },
          {
            title: "Systems Architect",
            description:
              "Design the distributed systems architecture for Aegis Core v4.0, spanning edge compute nodes, cloud-based analytics, and hardened tactical networks. Experience with real-time distributed systems and defense certifications preferred.",
            image: "/images/pages/integrator-code.jpg",
            href: "/careers/openings",
            tag: "Engineering",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="View All Openings"
        subtitle="Explore all available positions across engineering, research, operations, and more. Find the role where your expertise meets our mission."
        primaryCta="View All Openings"
        primaryHref="/careers/openings"
        secondaryCta="Our Culture"
        secondaryHref="/careers/culture"
      />
    </>
  );
}
