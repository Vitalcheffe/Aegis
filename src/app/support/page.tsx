"use client";

import {
  SectionHero,
  TextSection,
  CardGrid,
  FeatureList,
  AnimatedStatsSection,
  FAQSection,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function SupportPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/support/training.jpg"
        label="Support & Services"
        title="Mission-Ready Support"
        subtitle="From initial deployment through sustained operations, Aegis provides comprehensive support services that keep your counter-UAS systems operational, your operators trained, and your capabilities current."
        cta="Access Customer Portal"
        ctaHref="/support/customer-portal"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── OVERVIEW ── */}
      <TextSection label="Overview" title="Support Without Compromise">
        <p>
          Defense systems do not operate on business hours. Threats emerge at 0300, system updates are needed between missions, and operator questions must be answered before the next engagement — not after. Aegis support services are structured around the operational reality of our customers: 24/7 availability, rapid response times, and deep technical expertise that extends from software troubleshooting to operational employment advice. Our support organization is staffed by former military operators and defense engineers who understand the stakes because they have lived them.
        </p>
        <p>
          Our support philosophy is built on three commitments. First, we guarantee a two-hour initial response time for all Priority 1 issues — the critical problems that take a system off-line or degrade operational capability. Second, we invest continuously in training and knowledge transfer so that your team becomes self-sufficient over time, reducing dependence on vendor support. Third, we proactively monitor every deployed Aegis system through our secure telemetry channel, identifying and resolving potential issues before they impact operations. The result is a support experience that our customers consistently rate at 98.5% satisfaction — the highest in the defense industry.
        </p>
        <p>
          Beyond reactive support, Aegis offers professional services that maximize the value of your investment. Our training programs have certified over 500 operators across 12 nations. Our field engineering teams provide on-site integration support, system optimization, and capability demonstrations. And our customer portal delivers 24/7 access to firmware updates, knowledge base articles, support ticket management, and direct communication with your dedicated Aegis support team.
        </p>
      </TextSection>

      {/* ── ANIMATED STATS ── */}
      <AnimatedStatsSection
        label="Support Metrics"
        stats={[
          { value: 24, label: "7/365 Support", suffix: "/7" },
          { value: 98, label: "Satisfaction Rate", suffix: ".5%" },
          { value: 2, label: "Response Time", suffix: "hr" },
          { value: 500, label: "Trained Operators", suffix: "+" },
        ]}
      />

      {/* ── SUPPORT CATEGORIES ── */}
      <CardGrid
        label="Services"
        title="Comprehensive Support Ecosystem"
        cards={[
          {
            title: "Training Programs",
            description:
              "From basic operator qualification to advanced threat analysis and system administration, Aegis training programs produce confident, capable operators who can leverage the full power of the Aegis platform under operational stress. Our training curriculum includes classroom instruction, simulator exercises, and live-fire demonstrations, all delivered by instructors with real-world counter-UAS experience. Programs are available at our dedicated training centers or at customer sites worldwide.",
            image: "/images/support/training.jpg",
            href: "/support/training",
            tag: "Training",
          },
          {
            title: "Technical Documentation",
            description:
              "Aegis provides comprehensive technical documentation covering system operation, maintenance procedures, integration specifications, and API references. All documentation is maintained in a secure, version-controlled repository accessible through the customer portal, with update notifications delivered automatically when new versions are published. Documentation is available in English, with select titles translated into French, German, Japanese, and Arabic.",
            image: "/images/support/documentation.jpg",
            href: "/support/documentation",
            tag: "Documentation",
          },
          {
            title: "Customer Portal",
            description:
              "The Aegis Customer Portal provides 24/7 access to support ticket management, firmware and software updates, knowledge base articles, operational advisories, and direct communication with your dedicated support team. The portal integrates with our proactive monitoring system, giving you real-time visibility into the health and performance of all your deployed Aegis systems from a single dashboard.",
            image: "/images/support/customer-portal.jpg",
            href: "/support/customer-portal",
            tag: "Portal",
          },
          {
            title: "Professional Services",
            description:
              "Aegis field engineers provide on-site support for system integration, capability demonstrations, operational planning, and performance optimization. Our professional services team includes former military operators who can advise on tactics, techniques, and procedures for counter-UAS employment, as well as systems engineers who can design and implement custom integrations with your existing defense architecture.",
            image: "/images/pages/engineering-team.jpg",
            tag: "Services",
          },
          {
            title: "Firmware & Software Updates",
            description:
              "Aegis delivers regular software updates that introduce new capabilities, enhance existing features, and address emerging threat profiles. Updates are delivered through our secure over-the-air (OTA) update system, which validates package integrity, verifies compatibility, and enables rollback if any issue is detected. Critical security patches are delivered within 24 hours of vulnerability identification, and feature updates follow a quarterly release cadence.",
            image: "/images/pages/tech-circuit.jpg",
            tag: "Updates",
          },
          {
            title: "Spare Parts & Logistics",
            description:
              "Aegis maintains strategic spare parts inventories at distribution centers in the United States, United Kingdom, United Arab Emirates, and Singapore, ensuring that replacement components are available for rapid shipment to any deployment location worldwide. Our logistics team provides end-to-end supply chain management, including customs clearance support for international shipments and proactive inventory replenishment based on component reliability data.",
            image: "/images/pages/factory-manufacturing.jpg",
            tag: "Logistics",
          },
        ]}
      />

      {/* ── SUPPORT TIERS ── */}
      <FeatureList
        label="Support Tiers"
        title="Right-Sized Support for Every Mission"
        items={[
          {
            title: "Standard Support",
            description:
              "Included with every Aegis system purchase, Standard Support provides 12/5 access to our technical support team, 4-hour response time for Priority 1 issues, access to the customer portal and knowledge base, quarterly software updates, and annual on-site system health checks. Standard Support is designed for customers with trained on-site maintenance personnel who can perform basic troubleshooting and who do not require 24/7 vendor support coverage.",
            tag: "Included",
          },
          {
            title: "Enhanced Support",
            description:
              "Enhanced Support upgrades coverage to 24/7 with a guaranteed 2-hour response time for Priority 1 issues and 4-hour response for Priority 2 issues. Enhanced Support also includes a dedicated support engineer assigned to your account, quarterly operational reviews, proactive system health monitoring, and priority access to firmware updates and security patches. This tier is recommended for operational deployments where system downtime directly impacts mission capability.",
            tag: "Recommended",
          },
          {
            title: "Premium Support",
            description:
              "Premium Support provides the highest level of Aegis support, including a named account team with a dedicated support lead, 1-hour response time for Priority 1 issues, on-site engineering support within 72 hours of request, unlimited training seats, quarterly capability briefings, and direct escalation paths to Aegis engineering leadership. Premium Support customers also receive early access to pre-release software for evaluation and feedback, ensuring that their operational requirements are reflected in the product roadmap.",
            tag: "Maximum",
          },
        ]}
      />

      {/* ── FAQ ── */}
      <FAQSection
        label="Support FAQ"
        title="Frequently Asked Questions"
        items={[
          {
            question: "How do I open a support ticket?",
            answer:
              "Support tickets can be opened through the Aegis Customer Portal, by email to support@aegisdefense.com, or by calling our 24/7 support hotline. Enhanced and Premium Support customers also have access to a dedicated Slack Connect channel for real-time communication with their assigned support engineer. All tickets are automatically triaged by our AI-based routing system, which analyzes the issue description and routes it to the most qualified available engineer.",
          },
          {
            question: "What is the response time for critical issues?",
            answer:
              "Priority 1 issues — those that cause complete system outage or significantly degrade operational capability — receive a 2-hour initial response time under Enhanced Support and a 1-hour initial response under Premium Support. Standard Support provides a 4-hour response for Priority 1 issues during business hours. Our average actual response time for Priority 1 issues across all support tiers is 38 minutes, significantly exceeding our contractual commitments.",
          },
          {
            question: "Can Aegis provide remote diagnostic support?",
            answer:
              "Yes. With customer authorization, Aegis support engineers can establish a secure remote connection to your Aegis system for real-time diagnostics, configuration review, and troubleshooting. Remote access is mediated through our secure gateway, which enforces role-based access controls, session recording, and automatic session termination after 4 hours of inactivity. All remote access events are logged and auditable.",
          },
          {
            question: "How are software updates delivered and installed?",
            answer:
              "Software updates are delivered through our secure over-the-air (OTA) update system, which validates package integrity using digital signatures, verifies compatibility with your system configuration, and creates an automatic rollback point before installation. Updates can be scheduled for installation during planned maintenance windows or applied immediately for critical security patches. All updates are tested in our integration lab against the full range of Aegis hardware and software configurations before release.",
          },
          {
            question: "Does Aegis offer on-site support during exercises and operations?",
            answer:
              "Yes. Aegis provides on-site engineering support for exercises, deployments, and operational missions through our Professional Services offering. Enhanced and Premium Support customers receive priority scheduling for on-site support requests. Our field engineers are cleared to the same levels as the systems they support and are experienced in operating in deployed, austerely maintained, and classified environments.",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="We Are Here When It Matters"
        subtitle="Aegis support is built around your operational tempo — not the other way around. Contact our team to find the right support package for your mission."
        primaryCta="Contact Support Team"
        primaryHref="/request-demo"
        secondaryCta="Access Customer Portal"
        secondaryHref="/support/customer-portal"
      />
    </>
  );
}
