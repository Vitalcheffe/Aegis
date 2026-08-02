"use client";

import {
  SectionHero,
  TextSection,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function PrivacyPolicyPage() {
  return (
    <>
      <SectionHero
        image="/images/pages/legal-privacy.jpg"
        label="Legal"
        title="Privacy Policy"
        subtitle="Your Privacy Matters"
      />

      <TextSection label="Effective Date: January 1, 2025" title="Privacy Policy">
        <p>
          Aegis Defense Systems, Inc. (&quot;Aegis,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy and security of all individuals who interact with our products, services, and digital platforms. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website, engage with our counter-UAS defense systems, participate in demonstrations, or otherwise interact with our organization.
        </p>
        <p>
          Given the sensitive nature of our defense and national security work, we adhere to the highest standards of data protection and information security. Our privacy practices are designed not only to comply with applicable laws and regulations but also to meet the rigorous demands of government agencies, military organizations, and critical infrastructure operators who depend on our solutions.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 1" title="Information We Collect">
        <p>
          We collect information that you provide directly to us, information that is generated automatically when you use our services, and information from third-party sources. The types of information we collect include:
        </p>
        <p>
          <strong className="text-white">Personal Identification Information:</strong> When you contact us, request a demonstration, register for an account, or engage with our sales team, we may collect your full name, email address, phone number, job title, organization name, country of residence, and security clearance level. This information is necessary to verify your identity, assess eligibility for access to controlled technical data, and facilitate communication.
        </p>
        <p>
          <strong className="text-white">Technical and Operational Data:</strong> When our counter-UAS systems are deployed at your facility, we may collect operational telemetry including detection events, tracking data, classification results, and system performance metrics. This data is processed in accordance with your deployment agreement and any applicable government data handling requirements.
        </p>
        <p>
          <strong className="text-white">Automatically Collected Information:</strong> When you visit our website, we automatically collect certain technical information, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed. We use cookies and similar tracking technologies to collect this information and improve your experience on our platform.
        </p>
        <p>
          <strong className="text-white">Communication Data:</strong> We retain records of communications between you and Aegis, including emails, phone call records, support tickets, and meeting notes. These records are maintained for quality assurance, regulatory compliance, and to support the defense procurement process.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 2" title="How We Use Your Information">
        <p>
          We use the information we collect for the following purposes:
        </p>
        <p>
          <strong className="text-white">Identity Verification and Eligibility Assessment:</strong> To verify your identity, confirm your authorization to access controlled technical data subject to ITAR and EAR regulations, and ensure compliance with export control laws before disclosing any controlled information.
        </p>
        <p>
          <strong className="text-white">Service Delivery and Support:</strong> To deliver, maintain, and support our counter-UAS defense systems, provide technical assistance, process software updates, and ensure the operational readiness of deployed solutions.
        </p>
        <p>
          <strong className="text-white">Communication and Engagement:</strong> To respond to your inquiries, schedule demonstrations and briefings, send important notifications about system updates or security advisories, and provide information about products and services that may be relevant to your operational requirements.
        </p>
        <p>
          <strong className="text-white">Security and Threat Prevention:</strong> To protect the security of our systems, detect and prevent unauthorized access, identify potential threats to our infrastructure, and maintain the integrity of classified and controlled information.
        </p>
        <p>
          <strong className="text-white">Compliance and Legal Obligations:</strong> To comply with applicable laws, regulations, and government contracts, including ITAR, EAR, FAR, DFARS, and CMMC requirements. We may also use your information to respond to lawful government requests, judicial proceedings, or regulatory inquiries.
        </p>
        <p>
          <strong className="text-white">Analytics and Improvement:</strong> To analyze usage patterns, improve our products and services, develop new capabilities, and enhance the performance and effectiveness of our counter-UAS systems.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 3" title="Information Sharing and Disclosure">
        <p>
          Aegis does not sell, rent, or trade your personal information to third parties. We may share your information only in the following limited circumstances:
        </p>
        <p>
          <strong className="text-white">Government Agencies and Authorized Partners:</strong> We may disclose information to government agencies, defense ministries, and authorized international partners as required by law, regulation, or government contract. All such disclosures are made in compliance with ITAR, EAR, and applicable bilateral defense cooperation agreements.
        </p>
        <p>
          <strong className="text-white">Subcontractors and Service Providers:</strong> We may share information with vetted subcontractors and service providers who perform services on our behalf, subject to strict confidentiality obligations and compliance with applicable security requirements. All subcontractors handling controlled data must maintain appropriate security clearances and facility clearances.
        </p>
        <p>
          <strong className="text-white">Business Transfers:</strong> In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of that transaction, subject to the same privacy protections and regulatory requirements.
        </p>
        <p>
          <strong className="text-white">Legal Requirements:</strong> We may disclose information when required by law, subpoena, court order, or other legal process, or when we believe in good faith that disclosure is necessary to protect our rights, the safety of our personnel, or the public interest.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 4" title="Data Security">
        <p>
          We implement comprehensive technical, administrative, and physical safeguards to protect your information against unauthorized access, alteration, disclosure, or destruction. Our security measures include:
        </p>
        <p>
          End-to-end encryption for all data in transit and at rest using AES-256 encryption standards. Multi-factor authentication and role-based access controls for all systems containing sensitive information. Continuous monitoring and intrusion detection systems deployed across our network infrastructure. Regular security assessments, penetration testing, and compliance audits conducted by independent third-party evaluators. Physical security measures at our facilities including access control systems, surveillance, and secure areas for processing classified information.
        </p>
        <p>
          All personnel with access to controlled data undergo thorough background investigations and maintain appropriate security clearances. Our information security program is aligned with NIST SP 800-171, CMMC Level 3, and ISO 27001 standards.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 5" title="Your Rights and Choices">
        <p>
          Depending on your jurisdiction, you may have the following rights regarding your personal information:
        </p>
        <p>
          <strong className="text-white">Access and Portability:</strong> You may request a copy of the personal information we hold about you, in a commonly used electronic format where technically feasible.
        </p>
        <p>
          <strong className="text-white">Correction:</strong> You may request correction of inaccurate or incomplete personal information.
        </p>
        <p>
          <strong className="text-white">Deletion:</strong> You may request deletion of your personal information, subject to legal and regulatory retention requirements. Please note that certain information may be retained as required by ITAR, EAR, FAR, or other applicable regulations.
        </p>
        <p>
          <strong className="text-white">Objection and Restriction:</strong> You may object to or request restriction of certain processing activities, including direct marketing communications.
        </p>
        <p>
          To exercise any of these rights, please contact our Data Protection Officer at privacy@aegisdefense.com. We will respond to your request within 30 days, or as required by applicable law.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 6" title="International Data Transfers">
        <p>
          Aegis operates globally, and your information may be transferred to and processed in countries other than your country of residence. All international transfers of personal data are conducted in compliance with applicable data protection laws and export control regulations.
        </p>
        <p>
          For transfers from the European Economic Area, we rely on Standard Contractual Clauses approved by the European Commission, adequacy decisions, or other legally permissible transfer mechanisms. For transfers of controlled technical data, we comply with ITAR and EAR requirements, including obtaining necessary export licenses and authorizations.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 7" title="Cookies and Tracking Technologies">
        <p>
          Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand how visitors interact with our content. We use strictly necessary cookies for site functionality, performance cookies to monitor and optimize site performance, and analytics cookies to understand usage patterns.
        </p>
        <p>
          You can manage your cookie preferences through your browser settings at any time. Please note that disabling certain cookies may affect the functionality of our website. We do not use advertising cookies or share tracking data with advertising networks.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 8" title="Data Retention">
        <p>
          We retain personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required by law or regulation. Records related to ITAR-controlled transactions are retained for a minimum of five years as required by 22 CFR §122.5. Records subject to FAR and DFARS retention requirements are maintained in accordance with applicable contract clauses.
        </p>
        <p>
          When personal information is no longer needed, we securely delete or anonymize it in accordance with our data retention and destruction policies. All media containing controlled data are destroyed using methods that comply with NIST SP 800-88 guidelines.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 9" title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. We will post the updated policy on our website with a revised effective date. We encourage you to review this policy periodically. Your continued use of our services after any changes constitutes your acceptance of the updated policy.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 10" title="Contact Us">
        <p>
          If you have questions about this Privacy Policy or our data practices, please contact our Data Protection Officer:
        </p>
        <p>
          Aegis Defense Systems, Inc.<br />
          Attn: Data Protection Officer<br />
          1200 Defense Boulevard, Suite 800<br />
          Washington, DC 20001<br />
          Email: privacy@aegisdefense.com<br />
          Phone: +1 (202) 555-0142
        </p>
      </TextSection>

      <CTASection
        title="Have Questions?"
        subtitle="Our compliance team is available to address any privacy or data protection inquiries."
        primaryCta="Contact Us"
        primaryHref="/contact"
        secondaryCta="ITAR Compliance"
        secondaryHref="/legal/itar"
      />
    </>
  );
}
