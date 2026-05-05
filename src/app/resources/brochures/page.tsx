"use client";

import {
  SectionHero,
  CardGrid,
  CTASection,
  TextSection,
} from "@/components/sections";

export default function BrochuresPage() {
  return (
    <>
      <SectionHero
        image="/images/resources/datasheets.jpg"
        label="Resources"
        title="Download Brochures"
        subtitle="Company and product overviews designed for executive review and stakeholder distribution — available as downloadable PDF documents."
        cta="Request Full Package"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="Printed & Digital Materials">
        <p>
          Aegis brochures provide concise, visually rich overviews of our counter-UAS portfolio for executive review, stakeholder distribution, and procurement committee presentations. Each brochure distills the essential capability, performance, and deployment information into a format designed for decision-makers who need to understand what Aegis can do without wading through technical datasheets. Our brochures are updated quarterly to reflect the latest product specifications, deployment references, and compliance certifications.
        </p>
        <p>
          The brochure library is organized into three categories: Company Brochures that provide an overview of Aegis Defense Systems, our history, and our full product portfolio; Product Brochures that focus on individual platforms with key specifications, deployment scenarios, and ordering information; and Sector Solution Briefs that describe how Aegis systems are configured for specific vertical markets including military, critical infrastructure, airports, and urban security. All brochures are available in PDF format and can be customized with your organization's branding for internal distribution through our partner program.
        </p>
      </TextSection>

      <CardGrid
        label="Company Overview"
        title="Corporate Brochures"
        cards={[
          {
            title: "Aegis Defense Systems: Company Overview",
            description:
              "A 12-page overview of Aegis Defense Systems covering our founding mission, the five-layer Aegis Architecture, the complete product portfolio, key performance metrics from our deployed fleet, and our commitment to continuous innovation through secure over-the-air updates. Includes corporate history, leadership profiles, and a summary of our compliance certifications including ITAR, FIPS 140-2, and Common Criteria EAL4+. Designed for executive decision-makers and procurement officers evaluating Aegis as a strategic C-UAS partner.",
            tag: "12 Pages · PDF",
            href: "/request-demo",
          },
          {
            title: "The Aegis Architecture: Technical Overview",
            description:
              "An 8-page technical summary of the five-layer Aegis Architecture — Sensor, Fusion, AI, Decision, and Action. This brochure explains how the architecture achieves sub-20-millisecond kill chain closure, the role of each layer, the data flows between layers, and the engineering principles that enable full autonomous operation without cloud connectivity. Includes the architecture specification table with all key performance metrics. Designed for technical evaluators and system architects who need to understand how Aegis works at a systems level.",
            tag: "8 Pages · PDF",
            href: "/request-demo",
          },
        ]}
      />

      <CardGrid
        label="Individual Platforms"
        title="Product Brochures"
        cards={[
          {
            title: "Aegis Core Brochure",
            description:
              "The flagship fixed-site counter-UAS platform — 35 km radar detection, 500+ concurrent tracks, 175 TOPS AI inference, and full graduated response. This 6-page brochure covers deployment scenarios, key specifications, and the graduated response framework with sample engagement timelines. Includes a comparison matrix showing how Core performance exceeds the nearest competitor across 14 key metrics.",
            tag: "6 Pages · PDF",
            href: "/products/aegis-core",
          },
          {
            title: "Aegis Tactical Brochure",
            description:
              "The expeditionary counter-UAS system — 20 km radar, 35 km RF sensing, deployable in under 30 minutes. This 6-page brochure covers the rapid deployment procedure, transit-case packaging, environmental qualification results, and common expeditionary deployment configurations for forward operating bases and temporary security perimeters.",
            tag: "6 Pages · PDF",
            href: "/products/aegis-tactical",
          },
          {
            title: "Aegis Mobile Brochure",
            description:
              "Vehicle-integrated on-the-move protection — 15 km radar, 80 km/h operational speed, automotive-grade ruggedization. This 6-page brochure covers vehicle integration options, power management, vibration isolation, and operational scenarios for convoy protection and VIP motorcade security.",
            tag: "6 Pages · PDF",
            href: "/products/aegis-mobile",
          },
          {
            title: "Aegis Shield Brochure",
            description:
              "Man-portable counter-UAS for dismounted operations — 8 km detection, 12 kg backpack, 6-hour battery life. This 4-page brochure covers the dismounted deployment procedure, the directional jamming cone, and the hot-swappable battery system for indefinite field operation.",
            tag: "4 Pages · PDF",
            href: "/products/aegis-shield",
          },
          {
            title: "Aegis SkyWatch Brochure",
            description:
              "Airborne C-UAS payload — 12 km detection, 4.5 kg pod, Group 3/4 UAV compatible. This 4-page brochure covers the airborne surveillance mission, host platform integration, data link specifications, and the extended detection horizon that elevating the sensor provides over ground-based systems.",
            tag: "4 Pages · PDF",
            href: "/products/aegis-skywatch",
          },
          {
            title: "Aegis Command Brochure",
            description:
              "Enterprise C2 for multi-system fleet management — 64-node coordination, STANAG 4676, real-time COP. This 6-page brochure covers the command hierarchy, rules of engagement management, network architecture, and the common operating picture interface that provides commanders with situational awareness across distributed defense networks.",
            tag: "6 Pages · PDF",
            href: "/products/aegis-command",
          },
        ]}
      />

      <CardGrid
        label="Sector-Specific"
        title="Solution Briefs"
        cards={[
          {
            title: "Military C-UAS Solutions",
            description:
              "How Aegis protects forward operating bases, military convoys, naval vessels, and special operations teams from drone threats. This 4-page solution brief covers the military-specific deployment configurations, rules of engagement frameworks, and STANAG interoperability that make Aegis the most widely deployed C-UAS system in the NATO alliance.",
            tag: "4 Pages · PDF",
            href: "/solutions/military",
          },
          {
            title: "Critical Infrastructure Protection",
            description:
              "How Aegis secures nuclear facilities, power stations, data centers, and government buildings against drone-borne surveillance, smuggling, and attack. This 4-page brief covers the unique challenges of infrastructure protection — 24/7 operation, urban clutter, regulatory compliance — and the Aegis Sentinel configuration optimized for this mission.",
            tag: "4 Pages · PDF",
            href: "/solutions/critical-infrastructure",
          },
          {
            title: "Airport C-UAS Solutions",
            description:
              "How Aegis protects airports from drone intrusions that threaten flight safety — with 24-month operational data showing 100% detection rate and zero unnecessary operational disruptions. This 4-page brief covers FAA and EASA compliance, ATC coordination, and the graduated response protocol that neutralizes threats without grounding aircraft.",
            tag: "4 Pages · PDF",
            href: "/solutions/airports",
          },
          {
            title: "Border Security Solutions",
            description:
              "How Aegis provides persistent surveillance of national borders against drone-borne smuggling, reconnaissance, and intrusion. This 4-page brief covers the distributed sensor network architecture, long-range detection configurations, and integration with existing border surveillance infrastructure including camera networks and ground sensors.",
            tag: "4 Pages · PDF",
            href: "/solutions/border-security",
          },
        ]}
      />

      <CTASection
        title="Need Custom Materials?"
        subtitle="Our marketing team can produce custom-branded brochures, solution briefs, and presentation materials for your organization's internal review and approval processes."
        primaryCta="Request Custom Package"
        primaryHref="/request-demo"
        secondaryCta="Contact Sales"
        secondaryHref="/contact"
      />
    </>
  );
}
