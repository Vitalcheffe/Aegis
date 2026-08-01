"use client";

import {
  SectionHero,
  CardGrid,
  CTASection,
  TextSection,
  StatsSection,
} from "@/components/sections";

export default function DatasheetsPage() {
  return (
    <>
      <SectionHero
        image="/images/resources/datasheets.jpg"
        label="Resources"
        title="Product Datasheets"
        subtitle="Complete technical specifications for every Aegis counter-UAS product — detection ranges, processing throughput, environmental ratings, and integration interfaces."
        cta="Request Full Package"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="Technical Reference Documentation">
        <p>
          Aegis product datasheets provide the authoritative technical reference for system architects, procurement professionals, and integration engineers evaluating our counter-UAS portfolio. Every specification in these documents is validated through our ISO 9001:2015 certified testing program, which subjects each product to over 1,200 individual test cases covering performance, environmental resilience, electromagnetic compatibility, and cybersecurity posture. Our datasheets are updated with every software release and hardware revision, ensuring that the specifications you read reflect the exact capability of the system you will deploy. Unlike marketing materials that present best-case performance under ideal conditions, Aegis datasheets report guaranteed minimum performance across the full environmental envelope specified for each product.
        </p>
        <p>
          Each datasheet follows a standardized format that enables direct comparison across the Aegis product line. The specification tables cover detection and classification performance against six target categories (fixed-wing UAV, rotary-wing UAV, multi-rotor UAV, micro-drone, swarm elements, and modified commercial platforms), processing and networking specifications, physical dimensions and weight, power requirements, environmental operating ranges, and compliance certifications. Integration engineers will find complete interface definitions for every data bus, network protocol, and physical connector, along with timing diagrams and protocol specifications for STANAG 4586 and STANAG 4676 interoperability.
        </p>
      </TextSection>

      <StatsSection
        label="Portfolio at a Glance"
        stats={[
          { value: "8", label: "Products" },
          { value: "35 km", label: "Max Detection Range" },
          { value: "500+", label: "Concurrent Tracks" },
          { value: "175 TOPS", label: "AI Inference" },
          { value: "99.4%", label: "Neutralization Rate" },
        ]}
      />

      <CardGrid
        label="Complete Product Line"
        title="Product Datasheets"
        cards={[
          {
            title: "Aegis Core",
            description:
              "The flagship fixed-site counter-UAS platform — 35 km radar detection, 50 km RF sensing, 500+ concurrent tracks, 175 TOPS AI inference, and full graduated response capability including jamming, spoofing, and kinetic interdiction. Designed for critical infrastructure, military installations, and national border protection. Rack-mountable 19-inch chassis, 800W typical power consumption, and full STANAG 4676 C2 interoperability. The most widely deployed counter-UAS system in the NATO alliance with over 120 units operational across 14 countries.",
            href: "/products/aegis-core",
            tag: "Fixed Site",
          },
          {
            title: "Aegis Tactical",
            description:
              "Expeditionary counter-UAS system optimized for rapid deployment in austere environments — 20 km radar detection, 35 km RF sensing, 200 concurrent tracks, and 85 TOPS AI inference in a transit-case form factor that deploys in under 30 minutes. Designed for forward operating bases, temporary security perimeters, and convoy protection. Man-transportable with two-person carry for the sensor head and single-person carry for the processing unit. Full MIL-STD-810H environmental qualification and MIL-STD-461G EMC compliance.",
            href: "/products/aegis-tactical",
            tag: "Expeditionary",
          },
          {
            title: "Aegis Mobile",
            description:
              "Vehicle-integrated counter-UAS system for on-the-move protection — 15 km radar detection, 30 km RF sensing, 150 concurrent tracks, and 85 TOPS AI inference with automotive-grade vibration isolation and power management. Designed for military convoy protection, VIP motorcade security, and mobile border patrol operations. The sensor array integrates with the vehicle roof rack while the processing suite mounts in the cargo area or trunk. Supports simultaneous operation while the vehicle is in motion at speeds up to 80 km/h.",
            href: "/products/aegis-mobile",
            tag: "Vehicle-Mounted",
          },
          {
            title: "Aegis Shield",
            description:
              "Man-portable counter-UAS system for dismounted operations — 8 km detection range, 20 km RF sensing, 50 concurrent tracks, and 22 TOPS AI inference in a 12 kg backpack form factor. Designed for infantry squads, special operations teams, and dismounted patrol protection. The directional RF jammer provides a 60° neutralization cone effective to 3 km against standard commercial drones. Battery-powered with 6-hour continuous operation endurance and hot-swappable battery packs for indefinite operation in the field.",
            href: "/products/aegis-shield",
            tag: "Man-Portable",
          },
          {
            title: "Aegis SkyWatch",
            description:
              "Airborne counter-UAS payload for UAV-hosted deployment — 12 km detection range, 25 km RF sensing, 100 concurrent tracks, and 45 TOPS AI inference in a 4.5 kg pod that mounts on Group 3 and Group 4 unmanned aircraft. Designed for airborne early warning, area surveillance, and high-altitude relay of C-UAS data to ground forces. The payload includes a low-SWAP directional RF array and miniaturized radar providing 360° coverage below the host platform. Data links to Aegis Command for networked kill chain execution.",
            href: "/products/aegis-skywatch",
            tag: "Airborne",
          },
          {
            title: "Aegis Command",
            description:
              "Enterprise command and control platform for multi-system fleet management — coordinates up to 64 Aegis sensor nodes across a distributed defense network spanning 500+ km of coverage. Real-time common operating picture, AI-driven resource allocation, automated threat deconfliction, and hierarchical rules of engagement management. Browser-based interface with SIPRNet and NIPRNet connectivity, STANAG 4676 C2 data exchange, and comprehensive audit logging for after-action review. The central nervous system of any large-scale C-UAS deployment.",
            href: "/products/aegis-command",
            tag: "C2 Platform",
          },
          {
            title: "Aegis Sentinel",
            description:
              "Perimeter security sensor optimized for 24/7 autonomous surveillance — 10 km detection range, 15 km RF sensing, 100 concurrent tracks, and 45 TOPS AI inference in an IP67 weatherproof enclosure rated for unattended operation from -40°C to +65°C. Designed for permanent installation at airports, prisons, government facilities, and critical infrastructure sites. Solar-powerable with 48-hour battery backup, tamper detection, and automated health reporting. Integrates with existing physical security infrastructure via ONVIF and Modbus protocols.",
            href: "/products/aegis-sentinel",
            tag: "Perimeter",
          },
          {
            title: "Aegis Integrator",
            description:
              "Middleware platform for integrating Aegis C-UAS capability with legacy air defense, C2, and security systems — bidirectional protocol translation for STANAG 4586, STANAG 4676, ASTERIX, Link 16, and proprietary vendor formats. Real-time data normalization, track correlation across heterogeneous sensor networks, and unified rules of engagement management across mixed vendor deployments. Reduces integration timelines from months to weeks and eliminates the need for custom interface development when connecting Aegis to your existing infrastructure.",
            href: "/products/aegis-integrator",
            tag: "Integration",
          },
        ]}
      />

      <CTASection
        title="Need Detailed Specifications?"
        subtitle="Our solutions engineering team can provide custom specification packages, integration guidance, and compliance documentation for your program requirements."
        primaryCta="Request Full Package"
        primaryHref="/request-demo"
        secondaryCta="Explore Products"
        secondaryHref="/products"
      />
    </>
  );
}
