"use client";

import {
  SectionHero,
  Callout,
  FeatureList,
  CTASection,
  AnimatedLine,
  ImageBreak,
  SpecTable,
} from "@/components/sections";

export default function IntegrationPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/integration-hero.jpg"
        label="Integration"
        title="Connect Everything. Silo Nothing."
        subtitle="Aegis Integrator bridges every sensor, effector, and command network into a single coherent system — eliminating data silos and enabling joint, multi-domain counter-UAS operations."
        cta="Request Briefing"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="left"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        No defense system operates in isolation. Aegis Integrator connects to
        third-party sensors, effectors, and command networks through open
        standards and custom adapters — ensuring that your existing investments
        in radar, cameras, jammers, and C2 infrastructure contribute to the
        unified counter-UAS fight.
      </Callout>

      <AnimatedLine />

      {/* ── INTEGRATION FEATURES ── */}
      <FeatureList
        label="Integration Architecture"
        title="Interoperate by Design"
        items={[
          {
            title: "STANAG 4671",
            description:
              "Full compliance with NATO STANAG 4671 enables seamless data exchange with allied counter-UAS systems. Aegis publishes and consumes standard track messages, sensor tasking requests, and engagement orders — ensuring interoperability in coalition operations where multiple nations contribute sensors and effectors to a shared air picture. STANAG compliance has been validated through NATO CWIX exercises with 8 allied nations.",
          },
          {
            title: "JADC2 Integration",
            description:
              "Aegis connects to the Joint All-Domain Command and Control framework through ABMS-compatible interfaces, contributing counter-UAS sensor data and effectors to the joint force commander's common operating picture. Bi-directional data flows enable tasking from higher-echelon JADC2 nodes and reporting of engagement results back to the joint force — closing the sensor-to-shooter loop across domain boundaries.",
          },
          {
            title: "ATAK Compatibility",
            description:
              "Android Team Awareness Kit integration delivers real-time threat overlays to dismounted operators and tactical vehicle crews. Every detected drone appears as a georeferenced icon on the operator's ATAK display with classification data, threat level, and recommended action. ATAK push notifications alert operators to approaching threats even when the device is stowed — providing critical seconds of additional reaction time at the tactical edge.",
          },
          {
            title: "Sensor Integration",
            description:
              "Pre-built adapters connect to 50+ third-party sensor systems including Thales, Lockheed Martin, Saab, and Indra radar families; FLIR, Hensoldt, and Rheinmetall EO/IR platforms; and Rohde & Schwarz, Aaronia, and CRFS RF sensors. Custom adapter development for proprietary or legacy systems typically takes 4–6 weeks, with full integration testing and validation included.",
          },
          {
            title: "Effector Integration",
            description:
              "Aegis Integrator connects to non-Aegis neutralization systems including Dedrone, DroneShield, and SRC counter-UAS effectors — orchestrating multi-vendor engagements from a single C2 interface. Effector status, availability, and engagement results are visible in the common operating picture, enabling coordinated response across heterogeneous effector fleets.",
          },
          {
            title: "Custom API & SDK",
            description:
              "For systems without pre-built adapters, the Aegis Integration SDK provides REST APIs, gRPC services, and WebSocket streams with comprehensive documentation and sandboxed testing environments. The SDK supports custom data ingestion, third-party track publishing, and effector control — with sub-100ms latency guarantees and automatic schema evolution that maintains backward compatibility across Aegis software updates.",
          },
          {
            title: "MOSA Architecture",
            description:
              "Built on Modular Open Systems Approach principles, Aegis integration layer uses standardized interfaces and published data models that allow any compliant module to plug into the Aegis ecosystem. MOSA compliance ensures long-term extensibility, vendor independence, and technology refresh without platform-level redesign — protecting your investment across decades of operational life.",
          },
          {
            title: "Air-Gapped Deployment",
            description:
              "All integration capabilities function identically in air-gapped and classified network environments. Data synchronization between enclaves uses secure removable media with integrity verification, ensuring that even the most restrictive network architectures can benefit from Aegis integration without compromising security classification boundaries.",
          },
        ]}
      />

      {/* ── IMAGE BREAK ── */}
      <ImageBreak
        image="/images/pages/integration-api.jpg"
        height="50vh"
        overlay="bg-black/50"
      />

      {/* ── SPEC TABLE ── */}
      <SpecTable
        label="Technical Specifications"
        title="Integration Capabilities"
        specs={[
          { label: "NATO Compliance", value: "STANAG 4671 validated" },
          { label: "JADC2 Interface", value: "ABMS-compatible" },
          { label: "Tactical Display", value: "ATAK overlay + push" },
          { label: "Pre-Built Sensor Adapters", value: "50+" },
          { label: "Pre-Built Effector Adapters", value: "20+" },
          { label: "API Protocols", value: "REST + gRPC + WebSocket" },
          { label: "Integration Latency", value: "<100 ms" },
          { label: "Custom Adapter Dev Time", value: "4–6 weeks" },
          { label: "SDK", value: "Full REST/gRPC/WebSocket SDK" },
          { label: "Architecture", value: "MOSA-compliant" },
          { label: "Data Encryption", value: "AES-256 + TLS 1.3" },
          { label: "Classification Handling", value: "Up to NATO SECRET" },
          { label: "Air-Gap Support", value: "Secure sync via removable media" },
          { label: "Backward Compatibility", value: "Schema evolution guaranteed" },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Unify Your Counter-UAS Fight"
        subtitle="Stop operating in silos. See how Aegis Integration connects your existing systems into a single, lethal, coordinated defense."
        primaryCta="Request Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Capabilities"
        secondaryHref="/capabilities"
      />
    </>
  );
}
