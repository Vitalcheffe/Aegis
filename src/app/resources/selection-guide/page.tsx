"use client";

import {
  SectionHero,
  FeatureList,
  CTASection,
  TextSection,
  StatsSection,
} from "@/components/sections";

export default function SelectionGuidePage() {
  return (
    <>
      <SectionHero
        image="/images/resources/datasheets.jpg"
        label="Resources"
        title="Solution Selection Guide"
        subtitle="Match the right Aegis counter-UAS system to your operational environment, threat profile, and budget — with clear decision criteria for every deployment scenario."
        cta="Get a Recommendation"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="Choosing the Right Solution">
        <p>
          Selecting a counter-UAS system requires matching your operational environment, threat profile, and organizational constraints to the right combination of detection range, processing capability, neutralization options, and form factor. The Aegis product portfolio spans eight platforms designed for distinct operational scenarios — from permanent fixed-site installations protecting critical infrastructure to man-portable systems carried by dismounted infantry. This selection guide provides the decision framework to identify the optimal Aegis configuration for your mission, with clear criteria that enable direct comparison across the product line.
        </p>
        <p>
          The guide is organized by operational environment: Fixed-Site Protection for installations with permanent infrastructure, Expeditionary Operations for deployed forces in austere environments, Mobile Operations for on-the-move protection of convoys and VIPs, and Perimeter Security for 24/7 autonomous surveillance of facilities. For each environment, we identify the primary and secondary Aegis product recommendations, the key specifications that drive the selection, and common configuration options that extend the system's capability for specialized requirements. If your scenario does not fit neatly into one of these categories, our solutions engineering team can provide a custom recommendation based on your specific operational parameters.
        </p>
      </TextSection>

      <StatsSection
        label="Portfolio Range"
        stats={[
          { value: "8", label: "Products" },
          { value: "4–35 km", label: "Detection Range" },
          { value: "22–175", label: "TOPS (AI)" },
          { value: "12 kg–Full Rack", label: "Form Factor" },
        ]}
      />

      <FeatureList
        label="Fixed-Site Protection"
        title="Permanent Installations"
        items={[
          {
            title: "Aegis Core",
            tag: "Primary Recommendation",
            description:
              "The flagship platform for fixed-site counter-UAS defense, delivering 35 km radar detection, 50 km RF sensing, 500+ concurrent tracks, and full graduated response capability in a rack-mountable 19-inch chassis. Designed for military installations, airports, critical infrastructure, and national border protection where permanent infrastructure and power are available. The Core platform integrates with Aegis Command for multi-system coordination and with Aegis Integrator for legacy system interoperability. Typical deployment: 2-3 day installation, 800W power, 99.97% uptime SLA, and 200+ units deployed across 14 countries. Select Core when you need maximum detection range, highest track capacity, and the full suite of neutralization options including directed energy readiness.",
            href: "/products/aegis-core",
          },
          {
            title: "Aegis Sentinel",
            tag: "Perimeter & Autonomous",
            description:
              "Purpose-built for 24/7 autonomous perimeter surveillance at airports, prisons, government facilities, and critical infrastructure sites. The Sentinel operates unattended in an IP67 weatherproof enclosure rated from -40°C to +65°C, with solar-powerable operation and 48-hour battery backup. While its 10 km detection range is shorter than Core, the Sentinel excels in scenarios requiring zero-maintenance autonomous operation with automated health reporting and tamper detection. Select Sentinel when you need set-and-forget perimeter protection without dedicated operator staffing, or when deploying across multiple distributed sites that must operate independently.",
            href: "/products/aegis-sentinel",
          },
          {
            title: "Aegis Command",
            tag: "Fleet Coordination",
            description:
              "The enterprise C2 platform for coordinating multi-system deployments — manages up to 64 Aegis sensor nodes across a distributed defense network spanning 500+ km of coverage. Command provides the real-time common operating picture, AI-driven resource allocation, and hierarchical rules of engagement management essential for large-scale installations with overlapping coverage zones. Select Command when you are deploying three or more Aegis systems that must operate as a coordinated defense network, or when integration with allied C2 networks via STANAG 4676 is required.",
            href: "/products/aegis-command",
          },
        ]}
      />

      <FeatureList
        label="Expeditionary Operations"
        title="Deployed Forces"
        items={[
          {
            title: "Aegis Tactical",
            tag: "Primary Recommendation",
            description:
              "The expeditionary platform optimized for rapid deployment in austere environments — 20 km radar detection, 35 km RF sensing, 200 concurrent tracks, and 85 TOPS AI inference in a transit-case form factor that deploys in under 30 minutes. Designed for forward operating bases, temporary security perimeters, and expeditionary camps. Man-transportable with two-person carry for the sensor head and single-person carry for the processing unit. Full MIL-STD-810H environmental qualification and MIL-STD-461G EMC compliance. Select Tactical when you need high performance in a rapidly deployable package that can be repositioned as operational requirements change.",
            href: "/products/aegis-tactical",
          },
          {
            title: "Aegis Shield",
            tag: "Dismounted Operations",
            description:
              "The man-portable counter-UAS system for infantry squads, special operations teams, and dismounted patrols — 8 km detection range, 20 km RF sensing, 50 concurrent tracks, and 22 TOPS AI inference in a 12 kg backpack. The directional RF jammer provides a 60° neutralization cone effective to 3 km. Battery-powered with 6-hour endurance and hot-swappable packs. Select Shield when your operators are on foot and weight is the primary constraint, or when you need organic C-UAS capability embedded at the squad level without vehicle support.",
            href: "/products/aegis-shield",
          },
        ]}
      />

      <FeatureList
        label="Mobile Operations"
        title="On-the-Move Protection"
        items={[
          {
            title: "Aegis Mobile",
            tag: "Primary Recommendation",
            description:
              "Vehicle-integrated counter-UAS for on-the-move protection — 15 km radar detection, 30 km RF sensing, 150 concurrent tracks, and 85 TOPS AI inference with automotive-grade vibration isolation. Designed for military convoy protection, VIP motorcade security, and mobile border patrol. Supports simultaneous operation while the vehicle is in motion at speeds up to 80 km/h. Select Mobile when your mission requires protection during transit rather than at a fixed location, or when the threat environment demands the ability to detect and respond to drone threats while on the move.",
            href: "/products/aegis-mobile",
          },
          {
            title: "Aegis SkyWatch",
            tag: "Airborne Extension",
            description:
              "Airborne C-UAS payload for UAV-hosted deployment — 12 km detection range, 25 km RF sensing, 100 concurrent tracks, and 45 TOPS AI inference in a 4.5 kg pod for Group 3 and Group 4 unmanned aircraft. Extends the detection horizon by elevating the sensor array above terrain and ground clutter. Data links to Aegis Command for networked kill chain execution. Select SkyWatch when you need to extend the detection range of your ground-based Aegis network, or when airborne surveillance is required to cover terrain-masked approaches that ground sensors cannot see.",
            href: "/products/aegis-skywatch",
          },
        ]}
      />

      <FeatureList
        label="Integration"
        title="System Integration"
        items={[
          {
            title: "Aegis Integrator",
            tag: "Legacy Connectivity",
            description:
              "Middleware platform for connecting Aegis C-UAS capability with existing air defense, C2, and security systems — bidirectional protocol translation for STANAG 4586, STANAG 4676, ASTERIX, Link 16, and proprietary vendor formats. Real-time data normalization and track correlation across heterogeneous sensor networks. Select Integrator when you need to incorporate Aegis into an existing multi-vendor defense architecture, when legacy system compatibility is a hard requirement, or when you need to maintain investment in previously deployed sensor and C2 infrastructure while adding Aegis C-UAS capability.",
            href: "/products/aegis-integrator",
          },
        ]}
      />

      <CTASection
        title="Not Sure Which System?"
        subtitle="Our solutions engineering team will assess your operational environment, threat profile, and requirements — and recommend the optimal Aegis configuration with a detailed justification and cost estimate."
        primaryCta="Request Assessment"
        primaryHref="/request-demo"
        secondaryCta="View All Products"
        secondaryHref="/products"
      />
    </>
  );
}
