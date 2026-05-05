"use client";

import {
  ProductHero,
  Callout,
  SplitSection,
  SpecTable,
  CTASection,
  ImageBreak,
  StatsSection,
} from "@/components/sections";

export default function AegisIntegratorPage() {
  return (
    <>
      <ProductHero
        image="/images/pages/aegis-integrator-hero.jpg"
        label="System Integration"
        title="Aegis Integrator"
        subtitle="The connective tissue of coalition counter-UAS defense — an API-first integration platform connecting disparate sensors, effectors, and command systems across vendors, nations, and domains."
        specs={[
          { value: "API", label: "First Architecture" },
          { value: "Multi", label: "Vendor Support" },
          { value: "STANAG", label: "Compliant" },
          { value: "50+", label: "System Interfaces" },
        ]}
      />

      <Callout>
        No single vendor owns the entire counter-UAS battlespace. Aegis
        Integrator ensures every sensor, every effector, and every command
        system — regardless of manufacturer or nation — operates as one.
      </Callout>

      <SplitSection
        image="/images/pages/integrator-network.jpg"
        label="API Architecture"
        title="Built to Connect"
        description="Aegis Integrator is built on an API-first architecture that exposes every Aegis capability — sensor data, track management, threat assessment, effector control — through well-documented, versioned REST and gRPC interfaces. The API gateway handles authentication, authorization, rate limiting, and audit logging for all external integrations. Real-time data streaming uses a publish-subscribe message bus that delivers track updates, sensor feeds, and system events to subscribers with sub-100ms latency. The schema registry ensures forward and backward compatibility across API versions, enabling continuous platform evolution without breaking existing integrations. A comprehensive SDK supports integration development in Python, C++, Java, and JavaScript, with reference implementations for common integration patterns. The developer portal provides interactive API documentation, sandbox environments, and integration testing tools."
        stats={[
          { value: "REST+gRPC", label: "API Protocols" },
          { value: "<100ms", label: "Stream Latency" },
          { value: "4", label: "SDK Languages" },
        ]}
      />

      <SplitSection
        image="/images/pages/integrator-team.jpg"
        label="Multi-Vendor"
        title="Every Sensor. Every Effector."
        description="The counter-UAS battlespace is inherently multi-vendor — different manufacturers produce the radar, the jammer, the kinetic interceptor, and the command system. Aegis Integrator provides the integration layer that makes these disparate systems operate as a coherent whole. The platform includes pre-built adapters for 50+ commonly deployed C-UAS and air defense systems from 18 manufacturers, including Thales, Rheinmetall, Lockheed Martin, Rafael, Kongsberg, and Diehl Defence. For systems not covered by pre-built adapters, the Integration Development Framework provides a low-code environment for building custom adapters that map external system data models to the Aegis common data model. Each adapter handles protocol translation, data normalization, coordinate frame alignment, and temporal synchronization — the engineering complexity that traditionally makes multi-vendor integration prohibitively expensive and time-consuming."
        reverse
        stats={[
          { value: "50+", label: "Pre-Built Adapters" },
          { value: "18", label: "Manufacturers" },
          { value: "Low", label: "Code Framework" },
        ]}
      />

      <SplitSection
        image="/images/pages/integrator-code.jpg"
        label="Legacy Integration"
        title="Bridge to the Future"
        description="Defense forces operate legacy systems with decades of remaining service life — systems that were never designed for network-centric operations. Aegis Integrator brings these assets into the modern counter-UAS architecture without requiring replacement or modification. Legacy serial interfaces (RS-232, RS-422), military data buses (MIL-STD-1553), and tactical data links (Link 11, Link 16) are all supported through dedicated protocol adapters. The legacy integration framework extracts track data, status information, and control interfaces from these older systems and presents them through the same modern API as native Aegis platforms. This approach enables defense forces to protect their existing investments while gradually modernizing their C-UAS architecture. The migration path supports parallel operation of legacy and modern systems, with data fusion across both providing a more complete operational picture than either alone."
        stats={[
          { value: "1553", label: "MIL-STD Support" },
          { value: "Link 16", label: "Tactical Data" },
          { value: "Parallel", label: "Operation" },
        ]}
      />

      <ImageBreak image="/images/pages/integrator-network.jpg" height="50vh" />

      <StatsSection
        label="Integration Metrics"
        stats={[
          { value: "50+", label: "System Interfaces" },
          { value: "18", label: "Manufacturers" },
          { value: "4", label: "SDK Languages" },
          { value: "STANAG", label: "Compliant" },
          { value: "JADC2", label: "Compatible" },
        ]}
      />

      <SpecTable
        label="Technical Specifications"
        title="Aegis Integrator — Full Specification"
        specs={[
          { label: "Architecture", value: "API-first, microservices, event-driven" },
          { label: "API Protocols", value: "REST, gRPC, WebSocket, MQTT" },
          { label: "Stream Latency", value: "<100 ms (publish-subscribe)" },
          { label: "Pre-Built Adapters", value: "50+ systems from 18 manufacturers" },
          { label: "SDK Languages", value: "Python, C++, Java, JavaScript" },
          { label: "Integration Framework", value: "Low-code adapter development environment" },
          { label: "Legacy Interfaces", value: "RS-232/422, MIL-STD-1553, Link 11/16" },
          { label: "Interoperability Standards", value: "STANAG 4586, STANAG 4609, NATO C2" },
          { label: "JADC2 Compatibility", value: "Full (ABMS integration tested)" },
          { label: "Data Model", value: "Aegis Common Data Model (extensible)" },
          { label: "Coordinate Alignment", value: "Automatic (WGS84, local grid, MGRS)" },
          { label: "Temporal Sync", value: "NTP/PTP, <1ms accuracy" },
          { label: "Security", value: "Type 1 encryption, MLS, zero-trust" },
          { label: "Deployment", value: "On-premise, cloud (AWS/Azure/GOV), hybrid" },
          { label: "Scalability", value: "Horizontal, auto-scaling, containerized" },
          { label: "Monitoring", value: "Full observability, alerting, analytics" },
          { label: "API Versioning", value: "Semantic versioning, backward compatible" },
          { label: "Developer Portal", value: "Interactive docs, sandbox, test tools" },
          { label: "Classification", value: "NATO SECRET / ITAR Controlled" },
          { label: "MTBF", value: ">25,000 hours (cluster)" },
        ]}
      />

      <CTASection
        title="Unify Your Defense"
        subtitle="Aegis Integrator connects the counter-UAS ecosystem — regardless of vendor, vintage, or nation. Evaluate system integration for your multi-platform defense architecture."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Platforms"
        secondaryHref="/products"
      />
    </>
  );
}
