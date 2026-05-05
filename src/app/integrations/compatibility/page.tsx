"use client";

import {
  SectionHero,
  TextSection,
  SplitSection,
  SpecTable,
  FeatureList,
  FAQSection,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function CompatibilityPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/integration-network.jpg"
        label="Compatibility"
        title="System Compatibility"
        subtitle="Aegis integrates with the defense systems you already operate. NATO standards compliance, multi-vendor interoperability, and backward-compatible architecture ensure that your investment in existing infrastructure is protected."
        cta="Check Compatibility"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── OVERVIEW ── */}
      <TextSection label="Overview" title="Designed for Your Existing Architecture">
        <p>
          Deploying a new defense system should not mean discarding the systems you have spent years perfecting. Aegis was designed from the ground up to integrate cleanly with existing defense architectures, from legacy Cold War-era radar networks to next-generation Joint All-Domain Command and Control systems. Our standards-first approach means that Aegis speaks the protocols your systems already understand — NATO STANAG messaging, Link 16 tactical data links, and coalition interoperability frameworks — without requiring custom middleware or protocol translation devices.
        </p>
        <p>
          Compatibility is not an afterthought at Aegis — it is a core architectural principle. Every interface in the Aegis platform conforms to published military and commercial standards, and every integration with a third-party system is validated through rigorous interoperability testing before certification. Our dedicated compatibility engineering team maintains a library of over 40 pre-built adapters for the most common defense system interfaces, reducing integration timelines from months to days for pre-certified configurations.
        </p>
        <p>
          Whether you are operating a NATO-standardized air defense network in Europe, a U.S. military installation with JADC2 connectivity, or a national defense system with proprietary protocols, Aegis provides a compatible integration path that respects your existing infrastructure while adding the counter-UAS capability that modern threats demand. Our field engineering team has completed over 200 system integrations across 15 countries, and we bring that experience to every new deployment.
        </p>
      </TextSection>

      {/* ── NATO COMPATIBILITY ── */}
      <SplitSection
        image="/images/pages/c2-operations.jpg"
        label="NATO Standards"
        title="Full NATO Interoperability"
        description="Aegis holds NATO STANAG 4671 certification for Counter-Unmanned Aerial Systems — the first counter-UAS platform to achieve this distinction. Beyond STANAG 4671, Aegis implements or supports over a dozen NATO standardization agreements that ensure seamless interoperability with allied defense systems. These include STANAG 4586 for unmanned vehicle control interfaces, STANAG 4609 for motion imagery formatting, STANAG 5500 for message text formatting, and STANAG 7023 for digital terrain elevation data. Aegis also supports NATO Interoperability Standards and Profiles (NISP) for network connectivity, ensuring that Aegis systems can be deployed on NATO operational networks without modification."
        cta="Explore Standards Compliance"
        ctaHref="/about/certifications"
        stats={[
          { value: "4671", label: "STANAG Certified" },
          { value: "12+", label: "STANAG Protocols" },
        ]}
      />

      {/* ── COMPATIBILITY SPEC TABLE ── */}
      <SpecTable
        label="System Compatibility"
        title="Supported Standards & Interfaces"
        specs={[
          { label: "NATO STANAG 4671", value: "Certified — Counter-UAS" },
          { label: "NATO STANAG 4586", value: "Level 4 — UAV Control Interface" },
          { label: "NATO STANAG 4609", value: "Motion Imagery — H.264/H.265" },
          { label: "NATO STANAG 5500", value: "ADatP-3 Message Format" },
          { label: "NATO STANAG 7023", value: "Digital Terrain Elevation Data" },
          { label: "Link 16 (STANAG 5516)", value: "Series J Messages — Full Support" },
          { label: "Link 22 (STANAG 5522)", value: "Participating — Allied Networks" },
          { label: "JADC2 Architecture", value: "Compatible — Northrop Grumman Interface" },
          { label: "Aegis Combat System", value: "Integrated — Lockheed Martin Data Bridge" },
          { label: "Patriot GEM-T", value: "Compatible — Raytheon Interface" },
          { label: "NASAMS", value: "Compatible — Kongsberg Interface" },
          { label: "Tactical Data Link-C", value: "Supported — Legacy Integration" },
          { label: "VMF (Variable Message Format)", value: "Supported — Army C2" },
          { label: "JREAP (Joint Range Extension)", value: "Supported — Beyond Line of Sight" },
          { label: "ASTERIX Cat. 062", value: "Supported — ATC Radar Data" },
          { label: "NISP Network Standards", value: "Compliant — NATO Operational Networks" },
          { label: "SIPR/NIPR Network", value: "Dual-Stack — DoD Networks" },
          { label: "AWS GovCloud", value: "FedRAMP Authorized — Cloud Deployments" },
        ]}
      />

      {/* ── COMPATIBILITY TIERS ── */}
      <FeatureList
        label="Integration Tiers"
        title="Three Paths to Compatibility"
        items={[
          {
            title: "Tier 1 — Standards Compliant",
            description:
              "Any defense system that implements NATO STANAG protocols, Link 16 messaging, or ASTERIX data formats can integrate with Aegis out of the box — no custom development required. Tier 1 compatibility covers the vast majority of modern Western defense systems, including all NATO-standardized air defense networks, tactical operations centers, and intelligence fusion centers. Integration is typically completed in 72 hours or less, using standard configuration tools and published interface documentation. Over 85% of Aegis integrations fall into the Tier 1 category.",
            tag: "Zero Development",
          },
          {
            title: "Tier 2 — Pre-Certified Adapter",
            description:
              "Defense systems with proprietary or non-standard interfaces that Aegis has previously integrated are supported through our library of 40+ pre-certified adapters. These adapters translate vendor-specific data formats into the Aegis Common Sensor Model and vice versa, enabling seamless bidirectional data exchange without modifying either system. Pre-certified adapters are available for major defense platforms including Thales, Raytheon, Lockheed Martin, Saab, and IAI products. Integration timelines for Tier 2 systems range from 1-4 weeks including validation testing.",
            tag: "Adapter Available",
          },
          {
            title: "Tier 3 — Custom Integration",
            description:
              "Defense systems with novel or classified interfaces that have not been previously integrated with Aegis require custom adapter development. Our compatibility engineering team works closely with the system vendor or operator to develop, test, and certify a custom adapter that meets both Aegis and customer requirements. Custom integration timelines range from 4-12 weeks depending on interface complexity and documentation availability. All custom adapters become part of the Aegis adapter library for future use by the same customer or, with customer approval, by other customers operating the same system.",
            tag: "Custom Development",
          },
        ]}
      />

      {/* ── LEGACY COMPATIBILITY ── */}
      <SplitSection
        image="/images/pages/defense-antenna.jpg"
        label="Legacy Systems"
        title="Backward Compatibility"
        description="Aegis maintains backward compatibility with legacy defense system interfaces that remain in widespread operational use. Our adapter architecture supports older serial protocols (RS-232, RS-422, MIL-STD-188-114), legacy message formats (USMTF, OTH-Gold, IBS), and analog sensor interfaces through the Aegis Integrator middleware platform. For customers operating systems that are no longer supported by their original vendors, Aegis provides a sustainable integration path that extends the useful life of existing infrastructure while adding modern counter-UAS capability. Our engineering team has completed integrations with systems dating back to the 1990s, demonstrating that Aegis compatibility is not limited to modern platforms."
        cta="Discuss Legacy Integration"
        ctaHref="/request-demo"
        reverse
        stats={[
          { value: "200+", label: "Legacy Integrations" },
          { value: "40+", label: "Pre-Built Adapters" },
        ]}
      />

      {/* ── FAQ ── */}
      <FAQSection
        label="Compatibility FAQ"
        title="System Compatibility Questions"
        items={[
          {
            question: "Does Aegis require any modifications to my existing systems?",
            answer:
              "No. Aegis is designed to integrate without modifying your existing systems. All data exchange occurs through standard or adapted interfaces that your systems already support. In rare cases where a system lacks any external data interface, Aegis can accept operator-entered data or integrate through screen-scraping approaches — though we always recommend proper API-based integration when available.",
          },
          {
            question: "How do I determine if my system is compatible with Aegis?",
            answer:
              "Contact our integration team with details about your system's external data interfaces, network protocols, and messaging formats. We maintain a compatibility database covering over 200 defense systems and can provide an initial compatibility assessment within 48 hours. For systems not in our database, we offer a no-cost technical evaluation that determines the appropriate integration tier and estimated timeline.",
          },
          {
            question: "Can Aegis operate on classified networks?",
            answer:
              "Yes. Aegis is certified for operation on Unclassified, Secret, and Top Secret networks. Our cross-domain solution enables controlled data flow between security domains, and the platform supports NSA-certified Type 1 encryption for data in transit on classified networks. Aegis has been deployed on SIPRNet, JWICS, and allied national classified networks.",
          },
          {
            question: "What happens when Aegis or my existing system is updated?",
            answer:
              "Aegis maintains backward compatibility for at least two major software versions, ensuring that updates do not break existing integrations. Pre-certified adapters are regression-tested against every new Aegis release. For your existing systems, Aegis adapters are designed to accommodate version changes through configurable protocol parameters that can be updated without code changes.",
          },
          {
            question: "Does Aegis support dual-use military/civilian airspace integration?",
            answer:
              "Yes. Aegis supports ASTERIX Category 062 for air traffic control radar data exchange, enabling integration with civilian ATC systems for airports and critical infrastructure protection scenarios. The dual-use capability allows Aegis to fuse military and civilian radar data into a single counter-UAS picture, providing comprehensive coverage of all airspace users while maintaining separate data channels for military-classified and civilian-shared information.",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Check Your Compatibility"
        subtitle="Contact our integration team for a no-cost compatibility assessment of your existing defense systems. Most assessments are completed within 48 hours."
        primaryCta="Request Assessment"
        primaryHref="/request-demo"
        secondaryCta="Explore Technology Partners"
        secondaryHref="/integrations/technology-partners"
      />
    </>
  );
}
