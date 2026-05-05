"use client";

import {
  SectionHero,
  TextSection,
  FeatureList,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function CompliancePage() {
  return (
    <>
      <SectionHero
        image="/images/pages/legal-compliance.jpg"
        label="Legal"
        title="Compliance"
        subtitle="Regulatory Excellence"
      />

      <TextSection label="Compliance Framework" title="Commitment to Regulatory Excellence">
        <p>
          Aegis Defense Systems operates at the intersection of defense technology, national security, and international law. Our compliance framework is not simply a set of policies — it is a core operational capability that ensures every product we develop, every system we deploy, and every engagement we undertake meets the highest standards of legal and regulatory compliance.
        </p>
        <p>
          Our compliance program is built on three foundational pillars: proactive identification of regulatory requirements across all jurisdictions where we operate, systematic integration of compliance controls into our business processes and technical systems, and continuous monitoring and improvement to adapt to evolving regulatory landscapes.
        </p>
        <p>
          We recognize that in the defense industry, compliance failures carry consequences far beyond financial penalties. They can compromise national security, erode the trust of our government partners, and undermine the legitimacy of our mission. That is why we invest in compliance not as a cost of doing business, but as a strategic imperative.
        </p>
      </TextSection>

      <AnimatedLine />

      <FeatureList
        label="Compliance Areas"
        title="Regulatory Domains"
        items={[
          {
            title: "Export Control",
            description:
              "Comprehensive compliance with ITAR, EAR, and other export control regulations governing the international transfer of defense articles, dual-use items, and controlled technical data. Our export control program covers classification, licensing, deemed export controls, technology transfer, end-user monitoring, and sanctions compliance. All exports are processed through our dedicated trade compliance team with oversight from our Empowered Official.",
            tag: "ITAR / EAR",
          },
          {
            title: "Classification",
            description:
              "Rigorous classification processes for all products, components, and technical data to determine applicable export control jurisdiction and classification. We maintain an internal classification database that maps every product, subsystem, and technology element to its appropriate USML category or ECCN. Classification determinations are reviewed annually and updated to reflect regulatory changes and product modifications.",
            tag: "USML / ECCN",
          },
          {
            title: "Licensing",
            description:
              "End-to-end management of export licenses, technical assistance agreements, manufacturing license agreements, and other government authorizations. Our licensing team works closely with DDTC, BIS, and other agencies to obtain and maintain all necessary authorizations. We track license conditions, expiration dates, and quantities to ensure ongoing compliance and timely renewals.",
            tag: "DDTC / BIS",
          },
          {
            title: "Record Keeping",
            description:
              "Systematic retention of all compliance-related records in accordance with ITAR, EAR, FAR, and DFARS requirements. Our records management system maintains a complete audit trail of all export transactions, license applications, classification determinations, training records, and compliance incidents. Records are retained for the minimum periods specified by applicable regulations and are available for government review upon request.",
            tag: "22 CFR §122.5",
          },
          {
            title: "Training",
            description:
              "Mandatory compliance training programs for all employees, with specialized curricula for personnel in export-facing roles. Training covers ITAR, EAR, FCPA, sanctions, insider threat awareness, cybersecurity, and classification. New hire training is completed within 30 days of start date, with annual refresher training for all personnel. Compliance training completion rates are tracked and reported to senior management.",
            tag: "Corporate Standard",
          },
          {
            title: "Auditing",
            description:
              "Regular internal and external audits of compliance programs, controls, and procedures. Internal audits are conducted quarterly by our compliance team, with annual external audits performed by independent third-party assessors. Audit findings are reported to the Compliance Committee and tracked through corrective action plans. We also participate in government compliance assessments and implement corrective actions as directed.",
            tag: "Annual Review",
          },
        ]}
      />

      <AnimatedLine />

      <TextSection label="Cybersecurity" title="CMMC and NIST Compliance">
        <p>
          Aegis maintains compliance with the Cybersecurity Maturity Model Certification (CMMC) framework at Level 3, ensuring the protection of Controlled Unclassified Information (CUI) throughout our information systems. Our CMMC implementation covers all 14 domains and 110 practices specified in NIST SP 800-171, as supplemented by CMMC-specific requirements.
        </p>
        <p>
          Our information systems are assessed and authorized in accordance with NIST SP 800-53 and the Risk Management Framework (RMF). We maintain System Security Plans (SSPs) and Plan of Action and Milestones (POA&Ms) for all systems processing CUI. All cloud services used by Aegis meet FedRAMP Moderate or High baseline requirements.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Anti-Corruption" title="FCPA and Anti-Bribery Compliance">
        <p>
          Aegis maintains a robust anti-corruption compliance program in accordance with the Foreign Corrupt Practices Act (FCPA), the UK Bribery Act, and other applicable anti-corruption laws. Our program includes policies prohibiting bribery and corruption, due diligence procedures for third-party intermediaries and business partners, gifts and hospitality guidelines, and reporting mechanisms for potential violations.
        </p>
        <p>
          Given the international nature of defense procurement, we apply heightened scrutiny to transactions involving foreign government officials, state-owned enterprises, and intermediaries in high-risk jurisdictions. All international business engagements undergo compliance review before execution.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Government Contracts" title="FAR and DFARS Compliance">
        <p>
          As a government contractor, Aegis complies with all applicable Federal Acquisition Regulation (FAR) and Defense Federal Acquisition Regulation Supplement (DFARS) requirements. Our government contracts compliance program covers proper charging of costs, timekeeping, procurement integrity, organizational conflicts of interest, and small business subcontracting requirements.
        </p>
        <p>
          We maintain an approved purchasing and estimating system, compliant with DFARS 252.242-7006 requirements. Our accounting system has been audited and approved for cost-reimbursement contracts. We also comply with cybersecurity requirements under DFARS 252.204-7012, including the requirement to report cyber incidents to the DoD Cyber Crime Center (DC3) within 72 hours of discovery.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Governance" title="Compliance Governance Structure">
        <p>
          Our compliance program is governed by a dedicated Compliance Committee chaired by the Chief Compliance Officer and reporting directly to the Board of Directors. The committee includes representatives from Legal, Export Control, Security, Finance, and Operations. The committee meets monthly to review compliance metrics, audit findings, regulatory developments, and emerging risks.
        </p>
        <p>
          The Chief Compliance Officer has independent authority to implement compliance policies, conduct investigations, and recommend corrective actions without interference from business operations. This independence ensures that compliance considerations are never subordinated to commercial interests.
        </p>
      </TextSection>

      <CTASection
        title="Need Compliance Information?"
        subtitle="Our compliance team provides detailed regulatory guidance for partners, customers, and government agencies."
        primaryCta="Contact Compliance"
        primaryHref="/contact"
        secondaryCta="ITAR Compliance"
        secondaryHref="/legal/itar"
      />
    </>
  );
}
