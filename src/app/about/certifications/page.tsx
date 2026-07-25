"use client";

import {
  SectionHero,
  Callout,
  FeatureList,
  SpecTable,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function CertificationsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/certifications-hero.jpg"
        label="Certifications"
        title="Certified for Mission-Critical Operations"
        subtitle="In defense technology, trust is earned through rigorous evaluation, independent verification, and transparent compliance. Aegis holds the most comprehensive set of certifications in the counter-UAS industry — because the systems that protect lives must be held to the highest possible standard."
        cta="Request Compliance Documentation"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Certification is not a checkbox exercise at Aegis — it is a core
        engineering discipline. Every system we build is designed from the ground
        up to meet or exceed the most demanding military, intelligence, and
        civilian standards in the world. Our compliance architecture is not
        bolted on after the fact; it is woven into the fabric of every line of
        code, every hardware component, and every operational procedure.
      </Callout>

      <AnimatedLine />

      {/* ── CERTIFICATIONS LIST ── */}
      <FeatureList
        label="Compliance & Certification"
        title="Verified. Validated. Certified."
        items={[
          {
            title: "NATO STANAG 4671",
            description:
              "The NATO Standardization Agreement for Counter-Unmanned Aerial Systems defines the interoperability, performance, and safety requirements for counter-UAS systems deployed by allied nations. Aegis was the first counter-UAS platform to achieve STANAG 4671 certification, passing all evaluation criteria on the first attempt — a feat that NATO assessment officials described as unprecedented. The certification covers detection range, classification accuracy, false alarm rates, electromagnetic compatibility, cybersecurity posture, and multi-national data interoperability. STANAG 4671 certification is required for any counter-UAS system deployed within NATO's integrated air and missile defense architecture, and Aegis's certification has been renewed three times since initial approval in 2019.",
            tag: "Interoperability",
          },
          {
            title: "ITAR Compliance",
            description:
              "The International Traffic in Arms Regulations (ITAR) governs the export and import of defense articles and services on the United States Munitions List. Aegis maintains comprehensive ITAR compliance across all operations, including manufacturing, software development, international shipments, and personnel access controls. Our ITAR compliance program includes automated export classification screening, end-user verification procedures, technology control plans for all international offices, and regular audits by external trade compliance counsel. Every Aegis employee receives annual ITAR training, and our compliance team reviews every international transaction to ensure full adherence to State Department Directorate of Defense Trade Controls (DDTC) requirements.",
            tag: "Export Control",
          },
          {
            title: "ISO 27001",
            description:
              "ISO/IEC 27001 is the international standard for information security management systems. Aegis holds ISO 27001 certification for its entire technology stack, including the Aegis Core platform, Aegis Command enterprise system, and all cloud-based services. The certification covers 114 security controls across 14 domains, including asset management, access control, cryptography, physical security, and incident response. Our ISO 27001 certification was awarded by BSI Group following a comprehensive audit of our development practices, operational procedures, and organizational security culture. Annual surveillance audits ensure continuous compliance and drive ongoing improvement of our security posture.",
            tag: "Information Security",
          },
          {
            title: "MIL-STD-810",
            description:
              "MIL-STD-810H is the Department of Defense test method standard for environmental engineering considerations and laboratory tests. Aegis hardware systems are tested and certified to MIL-STD-810H across 29 environmental categories, including low temperature (-51°C), high temperature (+71°C), temperature shock, altitude (up to 15,000 feet), rain, humidity, salt fog, sand and dust, vibration, shock, and gunfire vibration. Every Aegis hardware variant — from the man-packable Aegis Tactical to the fixed-site Aegis Shield — undergoes full MIL-STD-810H testing at certified independent test laboratories before release. Test reports are available to qualified customers upon request.",
            tag: "Environmental",
          },
          {
            title: "DO-160",
            description:
              "RTCA DO-160G is the standard for environmental conditions and test procedures for airborne equipment. Aegis SkyWatch, our airborne counter-UAS payload, is certified to DO-160G for operation on rotary-wing and fixed-wing aircraft platforms. The certification covers electromagnetic interference and compatibility, power input quality, voltage spikes, audio frequency susceptibility, and induced signal susceptibility. DO-160G certification is required for any equipment installed on certified aircraft, and our compliance enables seamless integration of Aegis SkyWatch onto military helicopters, ISR aircraft, and optionally-piloted vehicles operated by allied forces.",
            tag: "Airborne",
          },
          {
            title: "Common Criteria EAL4+",
            description:
              "Common Criteria Evaluation Assurance Level 4 (EAL4+) provides methodically designed, tested, and reviewed security assurance for IT products. Aegis's software platform has been evaluated and certified to EAL4+ by the National Information Assurance Partnership (NIAP), the U.S. scheme for Common Criteria evaluation. The evaluation covered our access control mechanisms, audit logging, cryptographic modules, secure boot chain, and software integrity verification. EAL4+ certification is the highest assurance level that is economically feasible for commercial products and is recognized by 31 participating nations under the Common Criteria Recognition Arrangement.",
            tag: "Security Assurance",
          },
          {
            title: "FIPS 140-2",
            description:
              "Federal Information Processing Standard 140-2 specifies the security requirements for cryptographic modules protecting sensitive but unclassified information. All cryptographic functions within Aegis — including data at rest encryption, data in transit encryption, secure key management, and authentication protocols — are implemented using FIPS 140-2 validated modules. Our cryptographic module validation certificates are issued by the NIST Cryptographic Module Validation Program (CMVP) and the Canadian Centre for Cyber Security. FIPS 140-2 compliance is a mandatory requirement for all U.S. federal government systems processing sensitive data, and it ensures that Aegis encryption meets the highest standards of cryptographic integrity.",
            tag: "Cryptography",
          },
          {
            title: "FedRAMP",
            description:
              "The Federal Risk and Authorization Management Program (FedRAMP) provides a standardized approach to security assessment, authorization, and continuous monitoring for cloud products and services. Aegis Command, our cloud-based enterprise management platform, holds FedRAMP Moderate authorization through the General Services Administration (GSA). The authorization covers our AWS GovCloud deployment and encompasses 325 security controls aligned with NIST SP 800-53 Rev 5. Continuous monitoring through automated compliance tools and monthly ConMon reports ensure that Aegis Command maintains its authorization without interruption, providing federal customers with confidence that our cloud infrastructure meets the most demanding government security requirements.",
            tag: "Cloud Security",
          },
        ]}
      />

      {/* ── CERTIFICATION SPEC TABLE ── */}
      <SpecTable
        label="Certification Summary"
        title="At a Glance"
        specs={[
          { label: "NATO STANAG 4671", value: "Certified — First in Industry" },
          { label: "ITAR Compliance", value: "Full Compliance — DDTC Registered" },
          { label: "ISO 27001", value: "Certified — BSI Group Audited" },
          { label: "MIL-STD-810H", value: "29 Environmental Categories" },
          { label: "DO-160G", value: "Certified — Airborne Equipment" },
          { label: "Common Criteria EAL4+", value: "NIAP Evaluated & Certified" },
          { label: "FIPS 140-2", value: "NIST CMVP Validated" },
          { label: "FedRAMP Moderate", value: "GSA Authorized — AWS GovCloud" },
          { label: "Last Audit Date", value: "Q4 2024" },
          { label: "Next Surveillance Audit", value: "Q2 2025" },
          { label: "Compliance Team Size", value: "22 Full-Time Specialists" },
          { label: "Annual Compliance Investment", value: "$18M" },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Compliance Documentation Available"
        subtitle="Qualified defense and government customers can request detailed certification reports, audit findings, and compliance documentation through our secure portal."
        primaryCta="Request Documentation"
        primaryHref="/request-demo"
        secondaryCta="Contact Compliance Team"
        secondaryHref="/request-demo"
      />
    </>
  );
}
