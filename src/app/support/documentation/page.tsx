"use client";

import {
  SectionHero,
  TextSection,
  CardGrid,
  FeatureList,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

/* ─── Document type ─── */
interface Doc {
  title: string;
  category: string;
  version: string;
  updated: string;
  pages: number;
  description: string;
}

/* ════════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════════ */

const gettingStarted: Doc[] = [
  {
    title: "Aegis Core Installation Guide",
    category: "Getting Started",
    version: "v4.1",
    updated: "2026-02-15",
    pages: 86,
    description:
      "Step-by-step installation from unboxing to operational handover. Covers site preparation, hardware mounting, power and network connections, sensor calibration, system initialization, and operational verification testing. Includes wiring diagrams, torque specifications, and a comprehensive commissioning checklist.",
  },
  {
    title: "Aegis Command Quick Start",
    category: "Getting Started",
    version: "v3.8",
    updated: "2026-01-28",
    pages: 42,
    description:
      "Setting up the C2 platform and connecting your first sensor nodes. Covers initial configuration, node discovery, operator account setup, display layout customization, and your first simulated engagement exercise. Designed to get a new Aegis Command deployment operational within four hours.",
  },
  {
    title: "Network Configuration Guide",
    category: "Getting Started",
    version: "v5.0",
    updated: "2026-03-01",
    pages: 114,
    description:
      "JADC2, SATCOM, and tactical radio network setup. Covers multicast configuration for sensor data distribution, STANAG 4676 interface setup, Link 16 gateway configuration, SATCOM terminal integration, and tactical radio bridge deployment. Includes network topology diagrams and port reference tables.",
  },
  {
    title: "Operator Training Manual",
    category: "Getting Started",
    version: "v6.2",
    updated: "2026-02-20",
    pages: 198,
    description:
      "Day-to-day operations, threat assessment, and response protocols. Covers all operator interface functions, track interpretation, classification confidence evaluation, graduated response authorization procedures, and common operational scenarios. Includes quick-reference cards for high-stress situations.",
  },
  {
    title: "System Administrator Guide",
    category: "Getting Started",
    version: "v4.5",
    updated: "2026-01-10",
    pages: 276,
    description:
      "Maintenance, updates, and health monitoring. Covers scheduled and preventive maintenance procedures, software update installation and rollback, system health dashboard interpretation, performance tuning, backup and disaster recovery, and capacity planning for enterprise deployments.",
  },
];

const apiDocs: Doc[] = [
  {
    title: "Aegis REST API v3.2",
    category: "API Reference",
    version: "v3.2.1",
    updated: "2026-02-28",
    pages: 324,
    description:
      "Full OpenAPI specification for third-party integration. Covers all REST endpoints for track data retrieval, system configuration, operator management, threat intelligence queries, and reporting. Includes authentication flows, rate limits, error codes, and worked examples in Python, C++, JavaScript, and Go.",
  },
  {
    title: "WebSocket Real-Time Feed",
    category: "API Reference",
    version: "v2.4",
    updated: "2026-01-15",
    pages: 68,
    description:
      "Streaming threat data integration via WebSocket. Covers subscription management, track update message formats, classification event streams, alert push notifications, and connection lifecycle management. Includes message schema definitions and a reference client implementation.",
  },
  {
    title: "STANAG 4676 Interface",
    category: "API Reference",
    version: "v1.7",
    updated: "2025-12-20",
    pages: 142,
    description:
      "NATO C2 data exchange protocol guide. Covers STANAG 4676 message formatting, track data exchange procedures, system-to-system handover protocols, and interoperability testing procedures. Aligned with NATO ADatP-3 message catalogue and tested against allied C2 platforms.",
  },
  {
    title: "SDK Reference — Python & C++",
    category: "API Reference",
    version: "v3.0",
    updated: "2026-03-05",
    pages: 186,
    description:
      "Python and C++ SDKs for custom integrations. Covers installation, authentication, session management, all API method signatures, data model classes, error handling, and best practices for high-throughput data ingestion. Includes twelve complete example applications.",
  },
];

const complianceDocs: Doc[] = [
  {
    title: "ITAR Compliance Guide",
    category: "Compliance",
    version: "v2.3",
    updated: "2026-01-20",
    pages: 54,
    description:
      "Comprehensive guide to International Traffic in Arms Regulations as they apply to Aegis systems. Covers USML classification, export licensing requirements, deemed export controls, technology transfer restrictions, and record-keeping obligations. Essential for any organization involved in Aegis procurement, deployment, or support outside the United States.",
  },
  {
    title: "EAR Classification Matrix",
    category: "Compliance",
    version: "v1.9",
    updated: "2025-11-30",
    pages: 38,
    description:
      "Export Administration Regulations classification matrix for all Aegis hardware, software, and technical data items. Each product and component is classified with its ECCN, reasons for control, and applicable license exceptions. Updated quarterly to reflect regulatory changes.",
  },
  {
    title: "Cybersecurity RMF Package",
    category: "Compliance",
    version: "v3.1",
    updated: "2026-02-10",
    pages: 92,
    description:
      "Complete Risk Management Framework authorization package for Aegis deployments in US government environments. Covers system categorization, control selection and implementation, assessment procedures, continuous monitoring strategy, and POA&M management. Aligned with NIST SP 800-53 Rev 5 and DoD RMF overlays.",
  },
  {
    title: "NATO Security Certification",
    category: "Compliance",
    version: "v2.0",
    updated: "2025-12-15",
    pages: 46,
    description:
      "NATO INFOSEC certification documentation for Aegis systems deployed in allied environments. Covers security target specification, evaluation assurance level, TOE boundary definition, and mutual recognition agreements under the CCRA. Includes results from independent evaluation by NATO-accredited testing laboratory.",
  },
];

/* ════════════════════════════════════════════════════════════════
   DOCUMENT CARD COMPONENT
   ════════════════════════════════════════════════════════════════ */

function DocCard({ doc }: { doc: Doc }) {
  return (
    <div className="border border-white/10 bg-[#0a0a0a] p-6 flex flex-col h-full hover:border-white/20 transition-colors">
      {/* Category badge */}
      <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1 inline-block w-fit mb-4">
        {doc.category}
      </span>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-3 leading-snug">
        {doc.title}
      </h3>

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.12em] text-[#767676] mb-4">
        <span>{doc.version}</span>
        <span>·</span>
        <span>{doc.pages} pages</span>
        <span>·</span>
        <span>Updated {doc.updated}</span>
      </div>

      {/* Description */}
      <p className="text-[#b9b9b9] text-sm leading-relaxed flex-1 mb-5">
        {doc.description}
      </p>

      {/* CTA */}
      <a
        href="/request-demo"
        className="inline-block text-[11px] uppercase tracking-[0.15em] text-white border border-white/30 px-5 py-2.5 hover:bg-white hover:text-black transition-all duration-300 text-center"
      >
        Request Access
      </a>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════ */

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
          Our documentation is developed by a dedicated team of technical writers who work alongside Aegis engineers and operators throughout the product development lifecycle. Every feature is documented before release, every procedure is validated by operators before publication, and every document is version-controlled against the software release it describes.
        </p>
      </TextSection>

      {/* ── GETTING STARTED ── */}
      <section className="py-20 md:py-32 bg-black">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Getting Started
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              Start Here
            </h2>
            <p className="mt-6 text-[#767676] text-base md:text-lg max-w-2xl leading-relaxed">
              Essential guides for deploying, configuring, and operating your Aegis systems — from first unboxing through sustained operational employment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gettingStarted.map((doc) => (
              <DocCard key={doc.title} doc={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* ── API DOCUMENTATION ── */}
      <section className="py-20 md:py-32 bg-black border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              API Reference
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              Integration Documentation
            </h2>
            <p className="mt-6 text-[#767676] text-base md:text-lg max-w-2xl leading-relaxed">
              REST APIs, real-time feeds, NATO protocol interfaces, and SDKs — everything your engineering team needs to integrate Aegis into your existing defense architecture.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apiDocs.map((doc) => (
              <DocCard key={doc.title} doc={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE DOCUMENTATION ── */}
      <FeatureList
        label="Compliance"
        title="Regulatory & Certification"
        items={complianceDocs.map((doc) => ({
          title: doc.title,
          tag: `${doc.version} · ${doc.pages} pp · ${doc.updated}`,
          description: doc.description,
        }))}
      />

      {/* ── DOCUMENTATION PORTAL ── */}
      <CardGrid
        label="Platform"
        title="Documentation Portal Features"
        cards={[
          {
            title: "Full-Text Search",
            description:
              "Search across all document types in under 200 milliseconds with intelligent ranking that prioritizes operational procedures over reference material.",
            tag: "Search",
          },
          {
            title: "Contextual Help",
            description:
              "Embedded help links in the Aegis operator interface connect directly to relevant documentation sections, eliminating search during time-critical situations.",
            tag: "Integration",
          },
          {
            title: "Offline Synchronization",
            description:
              "Maintain a complete local copy of all documentation on the Aegis system itself, automatically updated when network connectivity is restored.",
            tag: "Deployed",
          },
          {
            title: "Version Control",
            description:
              "Every document is tied to a specific software release. Change highlights are automatically generated so operators can quickly identify what has changed.",
            tag: "Accuracy",
          },
          {
            title: "Print & USB Media",
            description:
              "Complete documentation sets shipped on encrypted USB media with each hardware delivery. Individual documents available in PDF for printing.",
            tag: "Physical",
          },
          {
            title: "Multi-Language",
            description:
              "Core documentation in English. Operator manuals and quick-reference cards also available in French, German, Japanese, and Arabic.",
            tag: "Languages",
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
