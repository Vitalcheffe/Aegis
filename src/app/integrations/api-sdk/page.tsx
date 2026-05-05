"use client";

import {
  SectionHero,
  TextSection,
  CardGrid,
  FeatureList,
  SplitSection,
  FAQSection,
  CTASection,
  AnimatedLine,
  AnimatedStatsSection,
} from "@/components/sections";

export default function ApiSdkPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/integration-api.jpg"
        label="Developer Resources"
        title="API & SDK"
        subtitle="Build on the Aegis platform. Our comprehensive API and SDK ecosystem gives developers the tools to integrate, extend, and customize counter-UAS capabilities for any mission requirement."
        cta="Request SDK Access"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── OVERVIEW ── */}
      <TextSection label="Overview" title="Integration at the Speed of Code">
        <p>
          The Aegis API and SDK ecosystem is designed for defense developers who need to integrate counter-UAS capabilities into their own systems, build custom workflows, or extend Aegis functionality to meet unique mission requirements. Our developer platform provides programmatic access to every Aegis system function — from sensor configuration and track data ingestion to classification model management and engagement authorization — through well-documented, version-controlled interfaces that follow industry best practices for security, reliability, and performance.
        </p>
        <p>
          Unlike legacy defense systems that require proprietary integration middleware and vendor-specific protocols, the Aegis API follows RESTful and gRPC design principles familiar to any modern software developer. Our SDK provides client libraries in four languages — Python, C++, Java, and Go — each offering type-safe access to Aegis services with built-in authentication, retry logic, and connection management. Whether you are building a simple dashboard widget or a full-scale command and control integration, the Aegis developer platform provides the foundation.
        </p>
        <p>
          Security is baked into every API interaction. All endpoints require mutual TLS authentication with DoD-approved PKI certificates. Role-based access control ensures that API consumers can only access the functions and data appropriate to their authorization level. And all data in transit is encrypted using FIPS 140-2 validated cryptographic modules, ensuring compliance with the most stringent defense information security requirements.
        </p>
      </TextSection>

      {/* ── ANIMATED STATS ── */}
      <AnimatedStatsSection
        label="Developer Platform"
        stats={[
          { value: 120, label: "API Endpoints" },
          { value: 4, label: "SDK Languages" },
          { value: 99, label: "Uptime SLA", suffix: "%" },
          { value: 50, label: "Max Latency", suffix: "ms" },
        ]}
      />

      {/* ── API ENDPOINTS ── */}
      <FeatureList
        label="API Reference"
        title="API Endpoints"
        items={[
          {
            title: "Track Data Service",
            description:
              "The Track Data Service provides real-time access to all Aegis sensor fusion tracks via server-sent events and gRPC streaming endpoints. Subscribe to track updates by geographic area, threat classification, or sensor source. Receive track position, velocity, classification confidence, threat score, and associated sensor metadata with sub-50-millisecond update latency. The service supports both push (WebSocket/SSE) and pull (REST) access patterns, enabling integration with both real-time tactical displays and batch analytical systems.",
            tag: "v3.0",
          },
          {
            title: "Sensor Management API",
            description:
              "The Sensor Management API provides programmatic control over all Aegis-connected sensors. Register new sensor sources, configure operational parameters (scan patterns, sensitivity thresholds, mode selections), monitor sensor health and status, and dynamically allocate sensor resources based on mission priorities. The API supports sensor discovery protocols that automatically detect and onboard new sensors when they connect to the Aegis network, reducing configuration overhead for field deployments.",
            tag: "v3.0",
          },
          {
            title: "Classification Engine API",
            description:
              "The Classification Engine API exposes Aegis AI-based threat classification capabilities to external systems. Submit sensor data for classification, retrieve classification results with confidence scores, and manage custom classification models trained on customer-specific threat libraries. The API supports batch classification for forensic analysis and real-time classification for operational use, with model update propagation that ensures all Aegis nodes run the latest classification models within 60 seconds of deployment.",
            tag: "v3.0",
          },
          {
            title: "Engagement Control API",
            description:
              "The Engagement Control API provides supervised and autonomous engagement authorization for Aegis-connected effectors. Define engagement zones, configure rules of engagement, authorize specific threat classes for automated response, and monitor engagement status in real time. The API enforces strict authorization chains — every autonomous engagement request must pass through configurable authorization gates that verify threat classification confidence, engagement zone compliance, and rules-of-engagement adherence before any effector is activated.",
            tag: "v3.0",
          },
          {
            title: "Threat Intelligence API",
            description:
              "The Threat Intelligence API provides access to the Aegis global threat library, containing RF signatures, flight profiles, and behavioral patterns for over 800 UAS types. Query the library for threat specifications, submit new threat observations for community review, and receive automated alerts when new threat variants are identified by any Aegis system worldwide. The API also supports custom threat model creation for classified or proprietary UAS types that require restricted distribution.",
            tag: "v3.0",
          },
          {
            title: "System Configuration API",
            description:
              "The System Configuration API manages Aegis platform configuration, including network settings, user accounts, role-based access controls, audit logging, and system health monitoring. All configuration changes are version-controlled and auditable, with rollback capability for any change made in the last 90 days. The API supports configuration templates that enable rapid deployment of standardized system configurations across multiple Aegis nodes in a networked deployment.",
            tag: "v3.0",
          },
        ]}
      />

      {/* ── SDK FEATURES ── */}
      <SplitSection
        image="/images/pages/integrator-code.jpg"
        label="SDK"
        title="Software Development Kit"
        description="The Aegis SDK provides language-native client libraries that abstract API complexity into intuitive, type-safe interfaces. Each library includes automatic authentication management, connection pooling, retry logic with exponential backoff, and comprehensive error handling. The SDK ships with integration test harnesses that simulate Aegis API responses, enabling developers to build and test integrations without requiring access to a live Aegis system. Example applications in each language demonstrate common integration patterns — from simple track data display to full engagement workflow automation. SDK releases are versioned independently from the Aegis platform and maintain backward compatibility for at least two major versions, ensuring that your integrations continue to work as the platform evolves."
        cta="Request SDK Access"
        ctaHref="/request-demo"
        stats={[
          { value: "4", label: "Languages" },
          { value: "2yr", label: "Backward Compat" },
        ]}
      />

      {/* ── SDK LANGUAGE CARDS ── */}
      <CardGrid
        label="Client Libraries"
        title="SDK Language Support"
        cards={[
          {
            title: "Python SDK",
            description:
              "Full-featured Python client library with async/await support for high-throughput data streaming. Includes NumPy and Pandas integration for track data analysis, Matplotlib bindings for visualization, and Jupyter notebook examples for rapid prototyping. Supports Python 3.9+ with type hints and Pydantic data models for IDE autocompletion and runtime validation.",
            tag: "v3.2.1",
          },
          {
            title: "C++ SDK",
            description:
              "High-performance C++17 client library optimized for real-time tactical applications. Zero-copy data paths minimize serialization overhead, while template-based message types provide compile-time type safety. Includes CMake integration, Conan package manager support, and pre-built binaries for Ubuntu 22.04, RHEL 9, and VxWorks 7 real-time operating system.",
            tag: "v3.2.1",
          },
          {
            title: "Java SDK",
            description:
              "Enterprise-grade Java 11+ client library with Spring Boot auto-configuration support. Connection pooling, circuit breaker patterns, and reactive stream adapters enable integration with existing enterprise service architectures. Includes Maven and Gradle artifacts with comprehensive Javadoc and OSGi bundle support for modular deployments.",
            tag: "v3.2.1",
          },
          {
            title: "Go SDK",
            description:
              "Lightweight Go client library designed for cloud-native and edge computing deployments. Context-based cancellation, goroutine-safe concurrency, and minimal dependency footprint make it ideal for containerized services and Kubernetes operators. Includes OpenTelemetry instrumentation for distributed tracing and Prometheus metrics for operational monitoring.",
            tag: "v3.2.1",
          },
        ]}
      />

      {/* ── FAQ ── */}
      <FAQSection
        label="Developer FAQ"
        title="API & SDK Questions"
        items={[
          {
            question: "How do I get access to the Aegis API and SDK?",
            answer:
              "API and SDK access requires an Aegis customer or partner account. Qualified defense and government organizations can request access through our customer portal or by contacting your Aegis account representative. SDK download credentials are provisioned within 24 hours of approval, along with access to our developer documentation portal, integration test environment, and developer support channel.",
          },
          {
            question: "What authentication methods does the API support?",
            answer:
              "All Aegis API endpoints require mutual TLS (mTLS) authentication using DoD-approved PKI certificates or Aegis-issued client certificates. API key authentication is available for non-sensitive configuration endpoints. OAuth 2.0 with SAML assertion grants is supported for enterprise identity provider integration. All authentication methods enforce role-based access controls that limit API access to authorized functions only.",
          },
          {
            question: "Is there a sandbox or test environment available?",
            answer:
              "Yes. Aegis provides a cloud-hosted integration test environment that simulates all API endpoints with realistic synthetic data. The test environment supports all SDK client libraries and includes scenario generators that simulate multi-target engagements, sensor failures, and degraded network conditions. The test environment is available 24/7 to all registered developers at no additional cost.",
          },
          {
            question: "How are API versioning and backward compatibility handled?",
            answer:
              "The Aegis API follows semantic versioning. Major versions (v1, v2, v3) are maintained concurrently for at least 24 months after a new major version release. Minor and patch versions are always backward-compatible within a major version. Breaking changes are only introduced in major versions and are communicated at least 6 months in advance through our developer changelog and migration guides.",
          },
          {
            question: "Can I build custom classification models using the API?",
            answer:
              "Yes. The Classification Engine API supports custom model training using customer-provided threat datasets. You can upload labeled sensor data, initiate model training jobs, validate model performance against holdout test sets, and deploy custom models to your Aegis nodes — all through the API. Custom models are isolated to your Aegis deployment and are not shared with other customers or with the Aegis global threat library without your explicit consent.",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Start Building"
        subtitle="Join the growing community of defense developers building on the Aegis platform. Request SDK access and start integrating today."
        primaryCta="Request SDK Access"
        primaryHref="/request-demo"
        secondaryCta="View Documentation"
        secondaryHref="/support/documentation"
      />
    </>
  );
}
