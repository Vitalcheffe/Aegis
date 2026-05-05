"use client";

import {
  SectionHero,
  TextSection,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function TermsOfServicePage() {
  return (
    <>
      <SectionHero
        image="/images/pages/legal-terms.jpg"
        label="Legal"
        title="Terms of Service"
        subtitle="Legal Agreement"
      />

      <TextSection label="Effective Date: January 1, 2025" title="Terms of Service">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of the products, services, software, and digital platforms provided by Aegis Defense Systems, Inc. (&quot;Aegis,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using any Aegis product or service, you agree to be bound by these Terms. If you are accessing our services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
        </p>
        <p>
          Given the defense and national security nature of our business, these Terms incorporate specific provisions related to export control, classified information handling, and government contract compliance. Your use of our services is also subject to applicable laws, regulations, and government contract terms.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 1" title="Definitions">
        <p>
          <strong className="text-white">&quot;Services&quot;</strong> means all counter-UAS defense products, software platforms, hardware systems, maintenance and support services, training programs, demonstrations, and digital tools provided by Aegis Defense Systems, including the Aegis Command™, Aegis Sentinel™, Aegis Shield™, Aegis SkyWatch™, Aegis Tactical™, Aegis Mobile™, and Aegis Integrator™ product lines.
        </p>
        <p>
          <strong className="text-white">&quot;Controlled Technical Data&quot;</strong> means any technical data, software, or information subject to the International Traffic in Arms Regulations (ITAR), the Export Administration Regulations (EAR), or other applicable export control laws, including but not limited to defense articles, defense services, and dual-use items.
        </p>
        <p>
          <strong className="text-white">&quot;Authorized User&quot;</strong> means an individual who has been verified and approved by Aegis to access specific Services, subject to applicable export control restrictions, security clearance requirements, and license terms.
        </p>
        <p>
          <strong className="text-white">&quot;Deployment Site&quot;</strong> means any physical or virtual location where Aegis counter-UAS systems are installed and operated under a valid deployment agreement.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 2" title="Eligibility and Access">
        <p>
          Access to Aegis products and services is restricted to authorized entities and individuals who meet the following eligibility requirements:
        </p>
        <p>
          You must be a representative of a government agency, military organization, critical infrastructure operator, law enforcement entity, or approved defense contractor. You must be a citizen or lawful permanent resident of the United States or an approved allied nation as defined by applicable defense cooperation agreements. You must possess the appropriate security clearance level required for the specific product or service you are accessing. You must not be listed on any denied persons list, debarred list, entity list, or sanctions list maintained by the U.S. Department of State, U.S. Department of Commerce, or U.S. Department of Treasury.
        </p>
        <p>
          Aegis reserves the right to deny access to any individual or entity that does not meet these eligibility requirements or that poses a potential risk to national security, export control compliance, or the integrity of our systems.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 3" title="Use of Services">
        <p>
          You agree to use Aegis services only for their intended purpose and in compliance with all applicable laws, regulations, and government contract requirements. Specifically, you agree to:
        </p>
        <p>
          Operate Aegis counter-UAS systems only within the authorized deployment parameters and geographical boundaries specified in your deployment agreement. Not reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of any Aegis software or firmware. Not disclose, transfer, or export any Controlled Technical Data except as authorized by applicable export control laws and the specific licenses governing your deployment. Not use Aegis systems for any purpose that would violate international humanitarian law, human rights law, or the laws of armed conflict. Not attempt to gain unauthorized access to any Aegis system, network, or data, or interfere with the proper functioning of our services.
        </p>
        <p>
          Any use of Aegis systems that is inconsistent with these terms may result in immediate suspension or termination of access, in addition to any legal or regulatory consequences.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 4" title="Intellectual Property">
        <p>
          All Aegis products, services, software, documentation, and related materials are protected by intellectual property laws, including copyright, patent, trademark, and trade secret laws. Aegis retains all right, title, and interest in and to its intellectual property.
        </p>
        <p>
          The Aegis name, logo, product names (including Aegis Command™, Aegis Sentinel™, Aegis Shield™, Aegis SkyWatch™, Aegis Tactical™, Aegis Mobile™, and Aegis Integrator™), and all associated trademarks are the exclusive property of Aegis Defense Systems, Inc. You may not use any Aegis trademark without prior written authorization.
        </p>
        <p>
          Technical data, specifications, and documentation provided with Aegis products are proprietary and may be subject to export control restrictions. You may not reproduce, distribute, or publicly display any Aegis technical data without written authorization and compliance with applicable export control regulations.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 5" title="Export Control Compliance">
        <p>
          Aegis products and services are subject to U.S. export control laws, including the Arms Export Control Act (AECA), ITAR (22 CFR Parts 120-130), and EAR (15 CFR Parts 730-774). By accessing or using Aegis services, you acknowledge and agree that:
        </p>
        <p>
          You will not export, re-export, or transfer any Aegis product, technical data, or software except in compliance with all applicable export control laws and regulations. You will not disclose or provide access to Controlled Technical Data to any non-U.S. person without the required export authorization. You will comply with all conditions and limitations of any export license, license exception, or other authorization applicable to your use of Aegis products. You will immediately notify Aegis of any known or suspected violation of export control laws related to Aegis products or technical data.
        </p>
        <p>
          Violations of export control laws may result in criminal penalties, civil fines, and debarment from future export privileges. Aegis cooperates fully with U.S. government agencies in the investigation and enforcement of export control violations.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 6" title="Confidentiality and Classified Information">
        <p>
          If you receive or have access to classified information in connection with Aegis services, you agree to handle such information in strict compliance with applicable government security classification guidelines, including the National Industrial Security Program Operating Manual (NISPOM) and any agency-specific classification guidance.
        </p>
        <p>
          All non-public information provided by Aegis, including pricing, technical specifications, operational capabilities, and deployment details, is considered confidential. You agree not to disclose such confidential information to any third party without prior written consent from Aegis, except as required by law or regulation.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 7" title="Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, Aegis shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services, including but not limited to loss of profits, loss of data, business interruption, or failure to detect or neutralize a specific UAS threat.
        </p>
        <p>
          Our total liability for any claim arising from these Terms or your use of our services shall not exceed the amount you paid Aegis for the specific service giving rise to the claim during the twelve months preceding the claim. This limitation applies regardless of the legal theory on which the claim is based.
        </p>
        <p>
          Notwithstanding the foregoing, nothing in these Terms limits liability for damages caused by willful misconduct, gross negligence, or violations of law, or for liabilities that cannot be limited under applicable law, including liabilities for personal injury or death caused by negligence.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 8" title="Indemnification">
        <p>
          You agree to indemnify, defend, and hold harmless Aegis Defense Systems, its officers, directors, employees, agents, and authorized representatives from and against any claims, damages, losses, liabilities, costs, and expenses arising from your use of Aegis services in violation of these Terms, applicable export control laws, or government contract requirements.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 9" title="Termination">
        <p>
          Aegis may suspend or terminate your access to any service at any time, with or without cause, including but not limited to violations of these Terms, export control requirements, or government directives. Upon termination, you must immediately cease all use of Aegis services and return or destroy all Controlled Technical Data and confidential information in your possession, in accordance with applicable security requirements.
        </p>
        <p>
          You may terminate your account at any time by contacting our support team. Termination does not relieve you of obligations that survive termination, including export control compliance, confidentiality, indemnification, and limitation of liability provisions.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 10" title="Dispute Resolution and Governing Law">
        <p>
          These Terms are governed by and construed in accordance with the laws of the United States and the Commonwealth of Virginia, without regard to conflict of law principles. Any disputes arising from these Terms shall be resolved in the federal courts of the Eastern District of Virginia or the state courts of Arlington County, Virginia, and you consent to the exclusive jurisdiction of such courts.
        </p>
        <p>
          For government customers, disputes shall be resolved in accordance with the dispute resolution procedures specified in the applicable government contract, including FAR 33.2 and DFARS 33.2.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 11" title="Modifications">
        <p>
          Aegis reserves the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our website with a revised effective date or by sending notification through other appropriate channels. Your continued use of Aegis services after changes become effective constitutes acceptance of the revised Terms.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Section 12" title="Contact">
        <p>
          For questions regarding these Terms of Service, please contact:
        </p>
        <p>
          Aegis Defense Systems, Inc.<br />
          Attn: Legal Department<br />
          1200 Defense Boulevard, Suite 800<br />
          Washington, DC 20001<br />
          Email: legal@aegisdefense.com<br />
          Phone: +1 (202) 555-0140
        </p>
      </TextSection>

      <CTASection
        title="Questions About Our Terms?"
        subtitle="Our legal team is available to clarify any provisions of these Terms of Service."
        primaryCta="Contact Legal"
        primaryHref="/contact"
        secondaryCta="Privacy Policy"
        secondaryHref="/legal/privacy"
      />
    </>
  );
}
