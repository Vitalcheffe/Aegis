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
          { value: "1,200+", label: "Test Cases" },
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
              "Aegis holds ISO 9001:2015 certification for our entire quality management system, covering design, development, manufacturing, and support of counter-UAS defense systems. The certification was awarded by BSI Group following a comprehensive audit of our processes, procedures, and organizational quality culture. Annual surveillance audits by BSI ensure continuous compliance and drive ongoing improvement. Our ISO 9001:2015 certification encompasses seven quality management principles: customer focus, leadership, engagement of people, process approach, improvement, evidence-based decision making, and relationship management. Each principle is operationalized through documented procedures, measurable objectives, and regular management review. Our quality manual, which exceeds 400 pages, details every aspect of our QMS from document control and record management to internal audit protocols and corrective action procedures. Every employee completes ISO 9001:2015 awareness training within their first 30 days at Aegis, and quality-critical roles require additional certification.",
            tag: "Foundation",
          },
          {
            title: "Quality Testing Program",
            description:
              "Aegis operates one of the most comprehensive testing programs in the defense industry, with over 1,200 individual test cases spanning hardware, software, and system-level validation. Our testing regime operates across five tiers: component-level testing verifies that every part meets its specification before assembly — including incoming inspection for all critical components; subsystem integration testing validates that components work together correctly across 280 integration test cases; system-level testing exercises the complete Aegis platform in realistic operational scenarios through 450 scenario-based test cases; environmental stress screening subjects every system to temperature cycling, vibration, and electrical stress; and our 72-hour burn-in test catches early-life failures before systems reach the field. Additionally, we maintain a regression test suite of 340 automated software tests that run on every code commit, plus 130 manual test procedures for acceptance testing. Every test case is documented, version-controlled, and mapped to specific requirements through our traceability matrix. No Aegis system ships until every one of the 1,200+ test cases has passed without exception.",
            tag: "Testing",
          },
          {
            title: "MIL-STD Compliance",
            description:
              "Aegis systems are designed, tested, and qualified to the full range of applicable military standards, ensuring interoperability with defense infrastructure and survivability in operational environments. MIL-STD-810H environmental engineering covers all 29 environmental categories — including low pressure (altitude), high temperature, low temperature, temperature shock, contamination by fluids, solar radiation, rain, humidity, fungus, salt fog, sand and dust, explosive atmosphere, leakage, acceleration, vibration, acoustic noise, shock, pyroshock, acid atmosphere, gunfire vibration, and more. MIL-STD-461G electromagnetic compatibility ensures that Aegis systems do not emit or are not susceptible to electromagnetic interference in the complex RF environments where they operate. MIL-STD-1275E regulates electrical power quality for military vehicle integration. DO-160G qualification covers environmental conditions for airborne equipment, applicable to our Aegis SkyWatch product line. MIL-STD-882E system safety ensures that hazard identification and risk mitigation are embedded in the design process from day one. STANAG 4671 certification validates counter-UAS interoperability for NATO customers.",
            tag: "MIL-STD",
          },
          {
            title: "Software Quality Assurance",
            description:
              "Software quality at Aegis is ensured through a multi-layered approach that treats code quality with the same rigor as hardware quality. Every code change is peer-reviewed by at least two qualified engineers before merge — a policy with zero exceptions, even for urgent hotfixes. Automated static analysis tools (including SonarQube, Coverity, and custom linting rules) enforce coding standards and detect potential defects before they enter the codebase. A comprehensive automated test suite covers unit tests, integration tests, and end-to-end functional tests with a minimum 85% code coverage requirement — our actual coverage currently stands at 91.3%. Security scanning tools check for known vulnerabilities in both first-party and third-party code through automated dependency auditing and SAST/DAST pipelines. Every software release undergoes manual testing by our dedicated quality assurance team, including adversarial testing by our internal red team that attempts to find failure modes through boundary condition testing, fault injection, and stress testing. Software configuration management ensures that every deployed system's exact software version is documented and that rollback capability is maintained for all production deployments. Our mean time to patch for critical vulnerabilities is 14 days — six times faster than the defense industry average.",
            tag: "Software QA",
          },
          {
            title: "Continuous Improvement Process",
            description:
              "Our QMS is not a static framework — it is a living system that is continuously improved based on data-driven analysis and customer feedback. Every field failure triggers a formal root cause analysis and corrective action process using the 8D problem-solving methodology. Every customer complaint is tracked to resolution and analyzed for systemic patterns through our Customer Feedback Analysis Board, which meets bi-weekly. Quarterly quality reviews examine trends in process performance, supplier quality, and field reliability to identify opportunities for improvement before they become problems. Our annual management review — a full-day session involving the CEO and all C-suite executives — evaluates QMS effectiveness, sets quality objectives for the coming year, and allocates resources for improvement initiatives. This proactive approach to quality improvement has reduced our field failure rate by 65% over the past three years, decreased our average corrective action closure time from 45 days to 18 days, and improved our first-pass yield in manufacturing from 94% to 99.1%. Continuous improvement is not a slogan at Aegis — it is a measurable, managed process with defined metrics, executive accountability, and documented results.",
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
          { label: "MIL-STD-461G", value: "EMC/EMI Qualified" },
          { label: "MIL-STD-1275E", value: "Vehicle Power Quality" },
          { label: "MIL-STD-882E", value: "System Safety" },
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
          { value: "22", label: "Compliance Specialists" },
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
            question: "How many test cases does Aegis execute before shipping a system?",
            answer:
              "Every Aegis system must pass over 1,200 individual test cases before shipment. This includes 280 subsystem integration tests, 450 system-level operational scenario tests, 340 automated software regression tests, and 130 manual acceptance test procedures. Additionally, every system undergoes environmental stress screening and a 72-hour burn-in test. No system ships with any test case in a failed state — there are zero exceptions to this rule.",
          },
          {
            question: "How does Aegis ensure software quality?",
            answer:
              "Software quality at Aegis is ensured through a multi-layered approach. Every code change is peer-reviewed by at least two qualified engineers before merge. Automated static analysis tools enforce coding standards and detect potential defects. A comprehensive automated test suite covers unit tests, integration tests, and end-to-end functional tests with 91.3% code coverage — well above our 85% minimum requirement. Security scanning tools check for known vulnerabilities in both first-party and third-party code. And every software release undergoes manual testing by our dedicated quality assurance team, including adversarial red team testing. Our mean time to patch for critical vulnerabilities is 14 days.",
          },
          {
            question: "What MIL-STD standards do Aegis systems comply with?",
            answer:
              "Aegis systems comply with MIL-STD-810H (environmental engineering across all 29 categories), MIL-STD-461G (electromagnetic compatibility), MIL-STD-1275E (vehicle power quality), MIL-STD-882E (system safety), and DO-160G (airborne equipment environmental conditions). Additionally, we comply with STANAG 4671 for NATO counter-UAS interoperability. Compliance is verified through testing at our Sterling Advanced Engineering Center and documented in qualification reports that are available for customer review.",
          },
          {
            question: "What is Aegis's approach to supply chain quality?",
            answer:
              "Every Aegis supplier undergoes a formal qualification process that includes capability assessment, quality system evaluation, and sample testing before approval. Qualified suppliers are subject to periodic audits and performance monitoring through our supplier scorecard system. Critical components — those whose failure could affect system safety or mission capability — are subject to additional controls including incoming inspection, lot traceability, and dual-source requirements. Our supply chain quality program ensures that every component in an Aegis system meets the same quality standards as the system itself.",
          },
          {
            question: "How does Aegis handle quality issues discovered in the field?",
            answer:
              "Every field quality issue triggers our Corrective and Preventive Action (CAPA) process using the 8D problem-solving methodology. The issue is formally documented, assigned a severity classification, and investigated by a cross-functional team. Root cause analysis identifies the underlying cause — not just the symptom — and corrective actions are implemented to prevent recurrence. Preventive actions extend the learning to other products and processes that could be affected by similar root causes. All CAPA actions are tracked to completion and verified for effectiveness. Our average corrective action closure time is 18 days. Customers affected by quality issues receive proactive notification and remediation support, regardless of warranty status.",
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
