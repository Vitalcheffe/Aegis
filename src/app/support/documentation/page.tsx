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
} from "@/components/sections";

export default function DocumentationPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/support/documentation.jpg"
        label="Documentation"
        title="Technical Documentation"
        subtitle="Comprehensive, accurate, and always current — Aegis technical documentation provides the information you need to operate, maintain, integrate, and extend your counter-UAS systems with confidence."
        cta="Access Documentation Portal"
        ctaHref="/support/customer-portal"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── OVERVIEW ── */}
      <TextSection label="Overview" title="Knowledge at Your Fingertips">
        <p>
          In defense operations, accurate documentation is not a convenience — it is a mission-critical requirement. When an operator needs to interpret an unfamiliar classification alert at 0200, or a system administrator must restore a failed sensor integration during a deployment, the documentation must be precise, accessible, and authoritative. Aegis invests heavily in documentation quality because we understand that the gap between what a system can do and what an operator can make it do is bridged by documentation.
        </p>
        <p>
          Our documentation is developed by a dedicated team of technical writers who work alongside Aegis engineers and operators throughout the product development lifecycle. Every feature is documented before release, every procedure is validated by operators before publication, and every document is version-controlled against the software release it describes. The result is a documentation suite that consistently earns top marks in customer satisfaction surveys and is frequently cited as a key differentiator by defense procurement evaluators.
        </p>
        <p>
          All documentation is accessible through the Aegis Customer Portal, which provides search across all document types, version history and change tracking, offline download for deployed environments, and automatic notification when documents relevant to your system configuration are updated. Documentation is also available in print format for environments where electronic access is restricted or impractical.
        </p>
      </TextSection>

      {/* ── DOCUMENTATION CATEGORIES ── */}
      <CardGrid
        label="Document Library"
        title="Documentation Categories"
        cards={[
          {
            title: "Operator Manuals",
            description:
              "Comprehensive operator manuals covering all Aegis system functions from basic operation through advanced engagement procedures. Each manual includes step-by-step procedures, screenshot-annotated workflows, decision trees for common operational scenarios, and quick-reference cards for high-stress situations. Manuals are organized by operational role — operator, shift supervisor, and mission commander — ensuring that each user sees only the procedures relevant to their function. Updated quarterly with each software release.",
            image: "/images/pages/defense-screen.jpg",
            tag: "Operators",
          },
          {
            title: "Integration Guides",
            description:
              "Technical integration guides for connecting Aegis with external sensors, C2 systems, and effector platforms. Each guide covers interface specifications, data format descriptions, configuration procedures, validation test procedures, and troubleshooting references. Integration guides are available for all Tier 1 and Tier 2 compatible systems, with new guides published as additional integrations are certified. Integration guides include worked examples with sample data and expected results.",
            image: "/images/pages/integrator-network.jpg",
            tag: "Integration",
          },
          {
            title: "API Reference",
            description:
              "Complete API reference documentation for all Aegis RESTful and gRPC endpoints. Each endpoint is documented with request and response schemas, authentication requirements, rate limits, error codes, and usage examples in all four SDK languages. The API reference is generated directly from source code annotations, ensuring that documentation always matches implementation. Interactive API explorer available in the customer portal enables authenticated testing of endpoints from a web browser.",
            image: "/images/pages/integrator-code.jpg",
            tag: "Developers",
          },
          {
            title: "Maintenance Procedures",
            description:
              "Detailed maintenance procedures for all Aegis hardware components, organized by maintenance level (operator, organizational, depot). Procedures include required tools and test equipment, step-by-step instructions with photographic illustrations, safety precautions and hazard warnings, and acceptance criteria for completed maintenance. Maintenance procedures are aligned with the Aegis spare parts catalog and include cross-references to relevant technical bulletins and service advisories.",
            image: "/images/pages/robot-arm.jpg",
            tag: "Maintenance",
          },
          {
            title: "System Administration Guide",
            description:
              "Comprehensive guide for Aegis system administrators covering installation, configuration, user management, security hardening, network setup, backup and recovery, performance tuning, and troubleshooting. The guide includes configuration templates for common deployment scenarios, automated setup scripts, and diagnostic flowcharts for rapid fault isolation. Also covers system monitoring, log analysis, and capacity planning for enterprise deployments.",
            image: "/images/pages/data-center.jpg",
            tag: "Admin",
          },
          {
            title: "Threat Reference Library",
            description:
              "The Aegis Threat Reference Library catalogs over 800 UAS threat types with detailed specifications including physical dimensions, performance characteristics, RF signatures, navigation system types, payload capabilities, and known employment tactics. Each threat profile includes Aegis classification parameters, recommended detection and tracking configurations, and graduated response recommendations. The library is updated monthly with new threat entries and revised profiles based on operational intelligence.",
            image: "/images/pages/tracking-screen.jpg",
            tag: "Intelligence",
          },
        ]}
      />

      {/* ── DOCUMENTATION FEATURES ── */}
      <SplitSection
        image="/images/pages/matrix-code.jpg"
        label="Platform"
        title="Documentation Portal Features"
        description="The Aegis Documentation Portal is more than a file repository — it is a purpose-built knowledge management platform designed for defense operational environments. Full-text search across all document types returns relevant results in under 200 milliseconds, with intelligent ranking that prioritizes operational procedures over reference material. Contextual help links embedded in the Aegis operator interface connect directly to relevant documentation sections, eliminating the need to search for information during time-critical situations. The portal supports offline synchronization for deployed environments, allowing operators to maintain a complete local copy of all documentation on the Aegis system itself. Version control ensures that every document is tied to a specific software release, and change highlights are automatically generated for each new version so operators can quickly identify what has changed."
        cta="Access Documentation Portal"
        ctaHref="/support/customer-portal"
        stats={[
          { value: "2,400+", label: "Documents" },
          { value: "<200ms", label: "Search Latency" },
        ]}
      />

      {/* ── DOCUMENT TYPES ── */}
      <FeatureList
        label="Document Types"
        title="Additional Resources"
        items={[
          {
            title: "Release Notes",
            description:
              "Detailed release notes accompany every Aegis software update, documenting new features, enhancements, resolved issues, and known limitations. Release notes are published 30 days before general availability, giving system administrators time to plan and test updates before deployment. Each release note includes a compatibility matrix that identifies which hardware variants and integration configurations are affected by the update, along with rollback procedures if issues are encountered during installation.",
            tag: "Updates",
          },
          {
            title: "Technical Bulletins",
            description:
              "Technical bulletins address time-sensitive operational topics including newly identified threat variants, configuration recommendations for specific operational environments, security vulnerability advisories, and interim operating procedures. Bulletins are issued as needed and distributed through the customer portal with email notification to registered system administrators. Critical security bulletins are delivered within 24 hours of vulnerability identification, with recommended mitigations and patched software availability timelines.",
            tag: "Advisories",
          },
          {
            title: "Training Materials",
            description:
              "Comprehensive training materials support all Aegis training courses, including student guides, instructor lesson plans, practical exercise instructions, and assessment rubrics. Training materials are available to certified Aegis instructors through the customer portal and are updated with each training curriculum revision. Self-study packages are available for operators who need to prepare for formal training or maintain proficiency between recertification cycles.",
            tag: "Training",
          },
          {
            title: "Compliance Documentation",
            description:
              "Certification reports, audit findings, and compliance statements for all Aegis certifications including NATO STANAG 4671, ISO 27001, FIPS 140-2, and FedRAMP. Compliance documentation is available to qualified defense and government customers upon request through the secure documentation portal. Export-controlled compliance documents require ITAR authorization verification before release.",
            tag: "Compliance",
          },
        ]}
      />

      {/* ── FAQ ── */}
      <FAQSection
        label="Documentation FAQ"
        title="Frequently Asked Questions"
        items={[
          {
            question: "How do I access Aegis documentation?",
            answer:
              "All Aegis documentation is accessible through the Customer Portal using your organizational credentials. Documentation is organized by product line, document type, and software version. You can also access documentation directly from within the Aegis operator interface using the contextual help system, which links to relevant sections based on the current screen and operator role.",
          },
          {
            question: "Is documentation available offline?",
            answer:
              "Yes. The Documentation Portal supports offline synchronization, which downloads a complete copy of all documentation to your local Aegis system. Offline documentation is automatically updated when network connectivity is restored. You can also download individual documents in PDF format for printing or storage on isolated systems. A complete documentation set is also shipped on encrypted USB media with each Aegis hardware delivery.",
          },
          {
            question: "How often is documentation updated?",
            answer:
              "Operator manuals and system administration guides are updated quarterly with each software release. API reference documentation is generated from source code and is always current. Integration guides are updated as new integrations are certified. Threat reference library entries are updated monthly. Critical technical bulletins are published as needed, typically within 24 hours of the triggering event.",
          },
          {
            question: "Can I request custom documentation?",
            answer:
              "Yes. Aegis offers custom documentation services for customers with unique operational requirements, specialized system configurations, or classified deployment environments. Custom documentation is developed by our technical writing team in collaboration with your operational subject matter experts, ensuring that the content accurately reflects your specific procedures and configurations. Contact your Aegis account representative for a custom documentation consultation.",
          },
          {
            question: "In what languages is documentation available?",
            answer:
              "All core documentation is available in English. Operator manuals and quick-reference cards are also available in French, German, Japanese, and Arabic. Additional language translations are available upon request with a typical delivery timeline of 6-8 weeks. API reference documentation is available only in English, as is standard practice in the software industry, but code examples include comments in all four SDK languages.",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Never Fly Blind"
        subtitle="Aegis documentation ensures that every operator, administrator, and integrator has the knowledge they need — when they need it, where they need it."
        primaryCta="Access Documentation"
        primaryHref="/support/customer-portal"
        secondaryCta="Contact Documentation Team"
        secondaryHref="/request-demo"
      />
    </>
  );
}
