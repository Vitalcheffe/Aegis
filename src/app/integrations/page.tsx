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

export default function IntegrationsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/integration-hero.jpg"
        label="Integrations"
        title="Integrations & Partnerships"
        subtitle="Aegis is built to connect. Our open architecture, extensive API ecosystem, and deep technology partnerships ensure seamless integration with the defense systems you already operate — and the ones you will deploy tomorrow."
        cta="Explore Our API"
        ctaHref="/integrations/api-sdk"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── OVERVIEW ── */}
      <TextSection label="Overview" title="An Ecosystem, Not an Island">
        <p>
          Modern defense architectures demand interoperability. No counter-UAS system operates in isolation — it must ingest sensor data from disparate sources, feed tracks to command and control networks, coordinate effectors across engagement zones, and share intelligence with allied forces in real time. The Aegis platform was engineered from its inception as an integration-first system, designed to slot into existing defense infrastructures without requiring costly rip-and-replace upgrades or proprietary lock-in.
        </p>
        <p>
          Our integration philosophy rests on three pillars: openness, standards compliance, and partner depth. Openness means that every Aegis system exposes well-documented APIs and SDKs that allow customers and partners to build custom integrations without depending on Aegis engineering resources. Standards compliance means that Aegis natively supports NATO STANAG protocols, Link 16 messaging, and coalition data-sharing frameworks out of the box. Partner depth means that we maintain dedicated integration teams working alongside the world's leading radar vendors, EO/IR manufacturers, electronic warfare providers, and C2 platform developers to deliver pre-certified, plug-and-play interoperability.
        </p>
        <p>
          The result is a counter-UAS platform that amplifies your existing investments rather than displacing them. Whether you operate a legacy air defense network, a next-generation Joint All-Domain Command and Control architecture, or a hybrid of both, Aegis integrates cleanly, quickly, and reliably — so you can focus on the mission instead of the middleware.
        </p>
      </TextSection>

      {/* ── ANIMATED STATS ── */}
      <AnimatedStatsSection
        label="Integration by the Numbers"
        stats={[
          { value: 35, label: "Technology Partners", suffix: "+" },
          { value: 12, label: "API Integrations" },
          { value: 4671, label: "NATO STANAG Compliant", prefix: "STANAG " },
          { value: 98, label: "Multi-Vendor Compatible", suffix: "%" },
        ]}
      />

      {/* ── PARTNER CATEGORIES ── */}
      <CardGrid
        label="Partner Ecosystem"
        title="Integration Categories"
        cards={[
          {
            title: "Radar & Sensor Vendors",
            description:
              "Aegis integrates with over 15 radar and sensor platforms, from long-range surveillance radars to short-range acoustic arrays. Pre-built adapters translate vendor-specific data formats into the Aegis Common Sensor Model, enabling immediate fusion of new sensor feeds without custom development. Partners include leading radar manufacturers across the US, Europe, and Israel.",
            image: "/images/pages/radar-installation.jpg",
            href: "/integrations/technology-partners",
            tag: "Sensors",
          },
          {
            title: "EO/IR Manufacturers",
            description:
              "Electro-optical and infrared camera systems provide the visual confirmation layer essential for rules-of-engagement compliance. Aegis integrates with stabilized EO/IR turrets from four major manufacturers, enabling automatic slew-to-cue, persistent tracking, and AI-assisted visual classification directly within the Aegis operator interface.",
            image: "/images/pages/detection-eoir.jpg",
            href: "/integrations/technology-partners",
            tag: "Optical",
          },
          {
            title: "Electronic Warfare Providers",
            description:
              "Non-kinetic neutralization through RF jamming, GNSS spoofing, and cyber RF injection requires precise coordination between detection and effectors. Aegis integrates with EW systems from five allied-nation providers, enabling graduated response protocols that match the right effector to the right threat at the right time.",
            image: "/images/pages/neutralization-ew.jpg",
            href: "/integrations/technology-partners",
            tag: "EW",
          },
          {
            title: "C2 & Battle Management",
            description:
              "Aegis feeds clean, classified tracks into existing command and control networks including NATO CAOC, Aegis Combat System, and distributed Common Ground Station architectures. Our track data conforms to STANAG 4586 and Link 16 message standards, ensuring that counter-UAS situational awareness is available to every operator in the chain of command.",
            image: "/images/pages/command-ops.jpg",
            href: "/integrations/compatibility",
            tag: "C2",
          },
          {
            title: "Cloud & Enterprise IT",
            description:
              "The Aegis Command enterprise platform runs on AWS GovCloud and Azure Government, integrating with existing IT service management, identity providers, and compliance monitoring tools. SAML 2.0 and OpenID Connect support enables single sign-on with DoD CAC, PKI, and allied national credential systems.",
            image: "/images/pages/data-center.jpg",
            href: "/integrations/api-sdk",
            tag: "Enterprise",
          },
          {
            title: "Developer & Custom Integration",
            description:
              "For partners and customers building bespoke integrations, Aegis provides a comprehensive SDK with client libraries for Python, C++, Java, and Go. RESTful and gRPC APIs expose every system function, from sensor management to engagement authorization, enabling rapid development of custom workflows and third-party extensions.",
            image: "/images/pages/integrator-code.jpg",
            href: "/integrations/api-sdk",
            tag: "SDK",
          },
        ]}
      />

      {/* ── INTEGRATION CAPABILITIES ── */}
      <FeatureList
        label="Capabilities"
        title="How Aegis Connects"
        items={[
          {
            title: "Real-Time Data Fusion",
            description:
              "Aegis ingests, correlates, and fuses data from heterogeneous sensor sources in real time, producing a single integrated air picture that includes both conventional air tracks and small UAS detections. Our multi-hypothesis tracking engine resolves conflicting sensor reports, eliminates duplicate tracks, and maintains track continuity through sensor handovers — ensuring that operators see one truth, not a fragmented mosaic of partial detections. The fusion engine processes over 50,000 sensor reports per second with sub-100-millisecond latency, meeting the real-time requirements of tactical engagement scenarios.",
            tag: "Core",
          },
          {
            title: "Standards-Based Messaging",
            description:
              "All Aegis outbound data conforms to NATO STANAG messaging standards, including Link 16 Series J messages, STANAG 4586 vehicle and payload control interfaces, and STANAG 4609 motion imagery formats. Inbound data adapters translate over 40 proprietary sensor formats into the Aegis Common Sensor Model. This standards-first approach means that Aegis can integrate with any STANAG-compliant system without custom middleware, reducing integration timelines from months to days.",
            tag: "Standards",
          },
          {
            title: "Graduated Response Integration",
            description:
              "The Aegis graduated response framework coordinates kinetic and non-kinetic effectors based on threat classification, rules of engagement, and engagement zone geometry. Integration with EW jamming systems, directed energy weapons, and kinetic interceptors enables a proportional response that escalates from non-destructive disruption to lethal engagement only when authorized. The framework supports manual, supervised, and autonomous engagement modes, giving commanders full control over the level of automated response.",
            tag: "Effectors",
          },
          {
            title: "Multi-Level Security",
            description:
              "Aegis operates across multiple security domains simultaneously, maintaining separate data channels for Unclassified, Secret, and Top Secret networks. Our cross-domain solution has been certified by the NSA for bi-directional data transfer between security enclaves, enabling counter-UAS track data to flow from tactical sensors on classified networks to strategic command elements on unclassified networks — filtered, sanitized, and compliant with all applicable security classification guides.",
            tag: "Security",
          },
        ]}
      />

      {/* ── FAQ ── */}
      <FAQSection
        label="Common Questions"
        title="Integration FAQ"
        items={[
          {
            question: "How long does a typical Aegis integration take?",
            answer:
              "For pre-certified partner integrations, deployment can be completed in as little as 72 hours. Custom integrations with new sensor types or proprietary C2 systems typically require 4-8 weeks, including testing and validation. Our dedicated integration engineering team provides on-site support throughout the process and maintains a library of reusable adapters that accelerate new integrations.",
          },
          {
            question: "Does Aegis require proprietary hardware for integration?",
            answer:
              "No. Aegis uses open standards and commercially available computing platforms. Integration with existing sensor and C2 networks is achieved through software adapters and standard network protocols. The only Aegis-specific hardware is the Aegis Core processing unit, which connects to your network via standard Ethernet and fiber interfaces.",
          },
          {
            question: "Can Aegis integrate with non-NATO defense systems?",
            answer:
              "Yes. While Aegis natively supports NATO STANAG protocols, we also provide integration frameworks for allied nation systems that use proprietary data formats. Our adapter architecture allows custom protocol translation modules to be developed and deployed without modifying the core Aegis platform. We have active integrations with defense systems from over a dozen non-NATO allied nations.",
          },
          {
            question: "What API protocols does Aegis support?",
            answer:
              "Aegis exposes RESTful APIs over HTTPS for configuration and management functions, and gRPC endpoints for high-throughput, low-latency data streaming. Real-time track data is also available via STANAG-compliant Link 16 and tactical data link interfaces. SDK client libraries are available for Python, C++, Java, and Go.",
          },
          {
            question: "How does Aegis handle integration with legacy systems?",
            answer:
              "Aegis maintains backward compatibility with legacy defense system interfaces through a dedicated adapter layer. We support older serial protocols, legacy message formats, and analog sensor interfaces through our Aegis Integrator middleware. Our engineering team has completed over 200 legacy system integrations across 15 countries, and we maintain a growing library of pre-built adapters for the most common legacy platforms.",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Integrate with Aegis"
        subtitle="Whether you are a defense agency, a technology partner, or a systems integrator, Aegis provides the tools, standards, and support to make integration seamless."
        primaryCta="Contact Integration Team"
        primaryHref="/request-demo"
        secondaryCta="Explore API & SDK"
        secondaryHref="/integrations/api-sdk"
      />
    </>
  );
}
