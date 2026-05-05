"use client";

import {
  SectionHero,
  TextSection,
  SpecTable,
  FeatureList,
  SplitSection,
  FAQSection,
  CTASection,
  AnimatedLine,
  StatsSection,
  Callout,
} from "@/components/sections";

export default function QualityPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/certifications-hero.jpg"
        label="Quality & Compliance"
        title="Quality Without Compromise"
        subtitle="In defense technology, quality is not a competitive advantage — it is a moral obligation. Aegis maintains the most rigorous quality management system in the counter-UAS industry, because the systems we build protect lives."
        cta="Request Quality Documentation"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── OVERVIEW ── */}
      <TextSection label="Overview" title="Quality Is a System, Not a Slogan">
        <p>
          Quality in defense technology is fundamentally different from quality in commercial products. When a consumer device fails, the consequence is inconvenience. When a counter-UAS system fails, the consequence can be catastrophic — a drone carrying explosives penetrating a military perimeter, a swarm overwhelming an airport's defenses, a hostile UAS surveilling a critical installation undetected. This is why Aegis approaches quality not as a department or a process step, but as a comprehensive management system that permeates every aspect of our organization, from requirements definition through decades of sustained operational support.
        </p>
        <p>
          Our Quality Management System (QMS) is certified to ISO 9001:2015 and AS9100D — the aerospace quality standard that imposes additional requirements beyond ISO 9001 for configuration management, risk management, product safety, and traceability. Every Aegis system is manufactured under this QMS, with full traceability from raw material procurement through final acceptance testing and field deployment. Our field failure rate of 0.3% — ten times better than the defense industry average — is the direct result of this systematic approach to quality.
        </p>
        <p>
          Beyond product quality, Aegis maintains comprehensive compliance with the regulatory frameworks that govern defense technology development, manufacturing, and export. Our compliance program covers ITAR, EAR, FCPA, and the defense procurement regulations of 12 allied nations. We employ 22 full-time compliance specialists and invest $18 million annually in compliance operations — because regulatory compliance is not just a legal requirement; it is a reflection of our commitment to Integrity Without Compromise.
        </p>
      </TextSection>

      {/* ── QUALITY STATS ── */}
      <StatsSection
        label="Quality Metrics"
        stats={[
          { value: "0.3%", label: "Field Failure Rate" },
          { value: "AS9100D", label: "Quality Certification" },
          { value: "100%", label: "Traceability" },
          { value: "$18M", label: "Annual Compliance Investment" },
          { value: "72hr", label: "Burn-in Test" },
        ]}
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Quality is not what you inspect — it is what you build. At Aegis, quality
        is engineered into every component, every line of code, and every
        process from the moment a requirement is defined to the moment a system
        is retired from service. Our 0.3% field failure rate is not achieved by
        catching defects at final test. It is achieved by designing and building
        systems that do not generate defects in the first place.
      </Callout>

      {/* ── QUALITY MANAGEMENT SYSTEM ── */}
      <FeatureList
        label="QMS"
        title="Quality Management System"
        items={[
          {
            title: "ISO 9001:2015 Certification",
            description:
              "Aegis holds ISO 9001:2015 certification for our entire quality management system, covering design, development, manufacturing, and support of counter-UAS defense systems. The certification was awarded by BSI Group following a comprehensive audit of our processes, procedures, and organizational quality culture. Annual surveillance audits by BSI ensure continuous compliance and drive ongoing improvement. Our ISO 9001 certification demonstrates that our QMS meets the international standard for quality management, providing customers with independent assurance that Aegis processes are controlled, documented, and continuously improved.",
            tag: "Foundation",
          },
          {
            title: "AS9100D Aerospace Certification",
            description:
              "AS9100D extends ISO 9001 with additional requirements specific to the aviation, space, and defense industries. Aegis holds AS9100D certification, which imposes stricter requirements for configuration management, product safety, risk management, and traceability than ISO 9001 alone. The AS9100D certification is particularly relevant for our airborne product line — Aegis SkyWatch — which must meet airworthiness requirements for installation on military aircraft. The certification ensures that our quality management system addresses the unique risks and requirements of aerospace and defense applications.",
            tag: "Aerospace",
          },
          {
            title: "Configuration Management",
            description:
              "Every Aegis system is tracked through our configuration management system from initial design through decades of operational service. Configuration management ensures that the exact hardware and software configuration of every deployed system is known and documented, enabling rapid root cause analysis when issues arise and ensuring that software updates are compatible with each system's specific configuration. Our configuration management system maintains full traceability from system serial number through bill of materials, software version, integration configuration, and modification history. This level of traceability is essential for defense systems that may remain in service for 15-20 years.",
            tag: "Traceability",
          },
          {
            title: "Testing & Validation",
            description:
              "Aegis testing and validation practices exceed industry standards at every stage of the product lifecycle. Component-level testing verifies that every part meets its specification before assembly. Subsystem integration testing validates that components work together correctly. System-level testing exercises the complete Aegis platform in realistic operational scenarios. Environmental stress screening subjects every system to temperature cycling, vibration, and electrical stress before shipment. And our 72-hour burn-in test catches early-life failures before systems reach the field. The result is a field failure rate of 0.3% — ten times better than the defense industry average and a testament to the effectiveness of our testing regime.",
            tag: "Validation",
          },
          {
            title: "Continuous Improvement",
            description:
              "Our QMS is not a static framework — it is a living system that is continuously improved based on data-driven analysis and customer feedback. Every field failure triggers a formal root cause analysis and corrective action process. Every customer complaint is tracked to resolution and analyzed for systemic patterns. And our quarterly quality reviews examine trends in process performance, supplier quality, and field reliability to identify opportunities for improvement before they become problems. This proactive approach to quality improvement has reduced our field failure rate by 65% over the past three years.",
            tag: "Improvement",
          },
        ]}
      />

      {/* ── CERTIFICATIONS TABLE ── */}
      <SpecTable
        label="Certifications"
        title="Quality & Compliance Certifications"
        specs={[
          { label: "ISO 9001:2015", value: "Certified — BSI Group Audited" },
          { label: "AS9100D", value: "Certified — Aerospace Quality" },
          { label: "ISO 27001", value: "Certified — Information Security" },
          { label: "NATO STANAG 4671", value: "Certified — Counter-UAS" },
          { label: "ITAR Compliance", value: "Full — DDTC Registered" },
          { label: "EAR Compliance", value: "Full — BIS Compliant" },
          { label: "FCPA Compliance", value: "Full — DOJ Certified" },
          { label: "MIL-STD-810H", value: "29 Environmental Categories" },
          { label: "DO-160G", value: "Certified — Airborne Equipment" },
          { label: "Common Criteria EAL4+", value: "NIAP Evaluated" },
          { label: "FIPS 140-2", value: "NIST CMVP Validated" },
          { label: "FedRAMP Moderate", value: "GSA Authorized" },
          { label: "CMMI Level 3", value: "Appraised — Development" },
          { label: "SOC 2 Type II", value: "Audited — Security Controls" },
          { label: "Cybersecurity Maturity Model", value: "CMMC Level 3 — In Process" },
          { label: "Last QMS Audit", value: "Q4 2024" },
          { label: "Next Surveillance Audit", value: "Q2 2025" },
          { label: "Compliance Team", value: "22 Full-Time Specialists" },
        ]}
      />

      {/* ── COMPLIANCE PROGRAM ── */}
      <SplitSection
        image="/images/pages/legal-compliance.jpg"
        label="Compliance"
        title="Regulatory Compliance Program"
        description="Aegis maintains a comprehensive regulatory compliance program that covers every aspect of our international defense business. Our ITAR compliance program includes automated export classification screening, end-user verification procedures, technology control plans for all international offices, and regular audits by external trade compliance counsel. Our FCPA compliance program includes due diligence on all sales intermediaries, gift and entertainment policies, and anti-bribery training for all customer-facing employees. Our EAR compliance program governs the export of dual-use technology that is not subject to ITAR but still requires export authorization. And our defense procurement compliance program ensures that we meet the specific procurement integrity requirements of each of the 12 allied nations where we do business. All compliance programs are overseen by our Chief Compliance Officer, who reports directly to the board of directors and has independent authority to halt any transaction that raises compliance concerns."
        cta="Request Compliance Documentation"
        ctaHref="/request-demo"
        stats={[
          { value: "12", label: "Nations Compliant" },
          { value: "0", label: "Violations" },
        ]}
      />

      {/* ── FAQ ── */}
      <FAQSection
        label="Quality FAQ"
        title="Quality & Compliance Questions"
        items={[
          {
            question: "What is Aegis's field failure rate and how is it measured?",
            answer:
              "Aegis maintains a field failure rate of 0.3%, measured as the percentage of deployed systems experiencing a hardware failure requiring component replacement within the first 12 months of operation. This rate is approximately 10 times better than the defense industry average of 3-5%. Our failure rate is calculated from the complete population of deployed systems, not a statistical sample, and includes all failure modes regardless of severity. The rate has improved by 65% over the past three years through continuous improvement of our testing and validation processes.",
          },
          {
            question: "How does Aegis ensure software quality?",
            answer:
              "Software quality at Aegis is ensured through a multi-layered approach. Every code change is peer-reviewed by at least two qualified engineers before merge. Automated static analysis tools enforce coding standards and detect potential defects. A comprehensive automated test suite covers unit tests, integration tests, and end-to-end functional tests with a minimum 85% code coverage requirement. Security scanning tools check for known vulnerabilities in both first-party and third-party code. And every software release undergoes manual testing by our dedicated quality assurance team before release to customers.",
          },
          {
            question: "What is Aegis's approach to supply chain quality?",
            answer:
              "Every Aegis supplier undergoes a formal qualification process that includes capability assessment, quality system evaluation, and sample testing before approval. Qualified suppliers are subject to periodic audits and performance monitoring through our supplier scorecard system. Critical components — those whose failure could affect system safety or mission capability — are subject to additional controls including incoming inspection, lot traceability, and dual-source requirements. Our supply chain quality program ensures that every component in an Aegis system meets the same quality standards as the system itself.",
          },
          {
            question: "How does Aegis handle quality issues discovered in the field?",
            answer:
              "Every field quality issue triggers our Corrective and Preventive Action (CAPA) process. The issue is formally documented, assigned a severity classification, and investigated by a cross-functional team. Root cause analysis identifies the underlying cause — not just the symptom — and corrective actions are implemented to prevent recurrence. Preventive actions extend the learning to other products and processes that could be affected by similar root causes. All CAPA actions are tracked to completion and verified for effectiveness. Customers affected by quality issues receive proactive notification and remediation support, regardless of warranty status.",
          },
          {
            question: "Can customers audit Aegis quality processes?",
            answer:
              "Yes. Aegis welcomes customer quality audits and has hosted over 40 customer audits in the past three years. Audit scope can include manufacturing processes, test procedures, configuration management, software development practices, and supplier management. Our quality team provides full access to process documentation, quality records, and corrective action histories. For customers who cannot visit in person, we offer virtual audits conducted via secure video conferencing with live demonstration of manufacturing and test processes.",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Quality You Can Verify"
        subtitle="Aegis quality and compliance standards are documented, audited, and available for customer review. Request detailed certification reports, audit findings, and quality metrics through our secure portal."
        primaryCta="Request Quality Documentation"
        primaryHref="/request-demo"
        secondaryCta="View Certifications"
        secondaryHref="/about/certifications"
      />
    </>
  );
}
