"use client";

import {
  SectionHero,
  CardGrid,
  AnimatedStatsSection,
  CTASection,
  ScrollReveal,
} from "@/components/sections";

export default function ResourcesPage() {
  return (
    <>
      <SectionHero
        image="/images/resources/white-papers.jpg"
        label="Resources"
        title="Knowledge Center"
        subtitle="Technical documentation, operational insights, and educational materials — everything you need to evaluate, deploy, and optimize Aegis counter-UAS defense systems."
        cta="Explore White Papers"
        ctaHref="/resources/white-papers"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedStatsSection
        label="Library Overview"
        stats={[
          { value: 20, label: "White Papers", suffix: "+" },
          { value: 8, label: "Datasheets" },
          { value: 15, label: "Videos", suffix: "+" },
          { value: 6, label: "Webinars" },
        ]}
      />

      <CardGrid
        label="Resource Categories"
        title="Browse by Type"
        cards={[
          {
            title: "White Papers",
            description:
              "In-depth technical analyses covering counter-UAS strategy, system architecture, threat landscape assessments, and emerging technology trends. Authored by our engineering and research teams with contributions from defense sector subject matter experts.",
            href: "/resources/white-papers",
            tag: "20+ Papers",
          },
          {
            title: "Product Datasheets",
            description:
              "Complete technical specifications for every Aegis product — detection ranges, processing throughput, environmental ratings, power requirements, and integration interfaces. The authoritative reference for system architects and procurement teams.",
            href: "/resources/datasheets",
            tag: "8 Datasheets",
          },
          {
            title: "Video Library",
            description:
              "Product demonstrations, operational footage from live deployments, system walkthroughs, and expert interviews. See Aegis technology in action across military, critical infrastructure, and urban security environments.",
            href: "/resources/videos",
            tag: "15+ Videos",
          },
          {
            title: "Webinars & Events",
            description:
              "Live and on-demand presentations covering emerging threats, regulatory changes, deployment best practices, and technology roadmap previews. Interactive Q&A sessions with our engineering leadership and field operations teams.",
            href: "/resources/webinars",
            tag: "6 Webinars",
          },
          {
            title: "Frequently Asked Questions",
            description:
              "Comprehensive answers to the most common questions about Aegis technology, deployment timelines, compliance requirements, and integration processes. Organized by category for quick navigation across 20+ topics.",
            href: "/resources/faq",
            tag: "20+ Questions",
          },
          {
            title: "Counter-UAS Glossary",
            description:
              "Definitions for 30+ specialized terms in counter-UAS technology, radar engineering, electronic warfare, and defense procurement. An essential reference for program managers and technical evaluators new to the C-UAS domain.",
            href: "/resources/glossary",
            tag: "30+ Terms",
          },
          {
            title: "Solution Selection Guide",
            description:
              "Decision framework for matching Aegis products to your operational environment, threat profile, and budget. Interactive assessment criteria covering force protection, critical infrastructure, urban security, and maritime applications.",
            href: "/resources/selection-guide",
            tag: "Decision Tool",
          },
          {
            title: "Brochures",
            description:
              "Downloadable PDF overviews of the Aegis product portfolio, company capabilities, and sector-specific solution briefs. Designed for executive review and stakeholder distribution across defense and security organizations.",
            href: "/resources/brochures",
            tag: "Downloadable",
          },
        ]}
      />

      <CardGrid
        label="Featured Resources"
        title="Most Requested"
        cards={[
          {
            title: "2025 Counter-UAS Threat Landscape Report",
            description:
              "Our annual assessment of the global drone threat — covering 147 new commercial drone models with potential military application, 23 confirmed swarm attack incidents, and the evolution of GPS-denied navigation in adversarial platforms. This 48-page report is cited by NATO JAPCC and five national C-UAS programs as a primary threat reference.",
            href: "/resources/white-papers",
            tag: "White Paper",
          },
          {
            title: "Aegis Core System Datasheet",
            description:
              "The flagship Aegis Core platform — 35 km radar detection range, 500+ concurrent track capacity, 175 TOPS AI inference, and full graduated response capability. This datasheet covers all performance specifications, environmental ratings, integration interfaces, and deployment configurations for the most widely deployed counter-UAS system in the NATO alliance.",
            href: "/resources/datasheets",
            tag: "Datasheet",
          },
          {
            title: "Live Fire Exercise: Swarm Engagement",
            description:
              "Operational footage from a classified NATO exercise demonstrating Aegis Command coordinating the simultaneous engagement of a 25-drone swarm attack. The video shows the complete kill chain — detection, classification, tracking, and graduated neutralization — executed autonomously in under 12 seconds from first contact to last neutralization.",
            href: "/resources/videos",
            tag: "Video",
          },
        ]}
      />

      <CTASection
        title="Need Something Specific?"
        subtitle="Our solutions engineering team can provide tailored technical documentation, architecture recommendations, and threat assessments for your operational environment."
        primaryCta="Contact Solutions Team"
        primaryHref="/request-demo"
        secondaryCta="Request a Briefing"
        secondaryHref="/contact"
      />
    </>
  );
}
