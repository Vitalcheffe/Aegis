"use client";

import {
  SectionHero,
  TextSection,
  FeatureList,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function ExportControlPage() {
  return (
    <>
      <SectionHero
        image="/images/pages/legal-export.jpg"
        label="Legal"
        title="Export Control"
        subtitle="Strict Adherence to International Law"
      />

      <TextSection label="Regulatory Overview" title="Export Control Regulations">
        <p>
          Aegis Defense Systems is subject to a comprehensive framework of U.S. export control laws and regulations that govern the international transfer of defense articles, dual-use items, technical data, and software. Our export control compliance program is designed to ensure that all international activities — including sales, demonstrations, technical discussions, and data sharing — are conducted in full compliance with applicable laws.
        </p>
        <p>
          The primary export control regimes applicable to Aegis products and technology are the International Traffic in Arms Regulations (ITAR), administered by the U.S. Department of State, Directorate of Defense Trade Controls (DDTC), and the Export Administration Regulations (EAR), administered by the U.S. Department of Commerce, Bureau of Industry and Security (BIS). Additionally, we comply with sanctions programs administered by the U.S. Department of the Treasury, Office of Foreign Assets Control (OFAC).
        </p>
        <p>
          Our export control program is managed by a dedicated Trade Compliance team that operates under the direction of our Empowered Official. The team is responsible for classification, licensing, screening, training, and enforcement across all Aegis business activities worldwide.
        </p>
      </TextSection>

      <AnimatedLine />

      <FeatureList
        label="Export Control Categories"
        title="Key Areas of Compliance"
        items={[
          {
            title: "ECCN Classifications",
            description:
              "For items subject to EAR jurisdiction, we maintain accurate Export Control Classification Number (ECCN) determinations for all products, components, and technologies. Classification is performed using a systematic process that evaluates each item against the criteria specified in the Commerce Control List (CCL). Items that are not specifically listed on the CCL are classified as EAR99. Our classification database is updated regularly to reflect product changes and regulatory updates.",
            tag: "EAR / CCL",
          },
          {
            title: "License Requirements",
            description:
              "We determine export license requirements based on the classification of the item, the destination country, the end-user, and the end-use. For ITAR-controlled items, DDTC licenses (DSP-5, DSP-73, DSP-61) or exemptions are required for all exports. For EAR-controlled items, BIS export licenses may be required depending on the ECCN, destination, end-user, and end-use. We maintain a license determination matrix that maps each product and destination to the applicable licensing requirements.",
            tag: "ITAR / EAR",
          },
          {
            title: "Deemed Exports",
            description:
              "A deemed export occurs when controlled technology or source code is released to a foreign national within the United States. We implement strict controls to prevent unauthorized deemed exports, including citizenship verification for all personnel with access to controlled technology, technology control plans for each facility, and network segmentation to prevent unauthorized access to controlled data. Release of controlled technology to foreign nationals requires either a DDTC or BIS authorization, as applicable.",
            tag: "22 CFR §120.17 / 15 CFR §734.2",
          },
          {
            title: "Technology Transfer",
            description:
              "All transfers of controlled technology — whether through written documentation, oral communication, visual inspection, or electronic transmission — are subject to export control regulations. We control technology transfer through Technical Assistance Agreements (TAAs) for ITAR-controlled data and BIS license applications for EAR-controlled technology. Each TAA specifies the authorized scope, duration, and conditions of technology transfer, including restrictions on retransfer and re-export.",
            tag: "TAA / MLA",
          },
          {
            title: "End-User Monitoring",
            description:
              "We conduct thorough end-user due diligence and ongoing monitoring for all international transfers of controlled items. End-user verification includes screening against U.S. government denied parties lists, conducting end-use checks, obtaining end-user certificates, and verifying the legitimacy of procurement requests. Post-shipment monitoring includes verification of delivery, confirmation of end-use compliance, and tracking of any retransfer requests. We cooperate fully with U.S. government end-use monitoring programs.",
            tag: "EUC / EUM",
          },
          {
            title: "Sanctions Compliance",
            description:
              "Aegis complies with all U.S. sanctions programs administered by the Office of Foreign Assets Control (OFAC), including comprehensive sanctions against embargoed countries and targeted sanctions against designated individuals and entities. We screen all customers, partners, and counterparties against OFAC's Specially Designated Nationals (SDN) List, the BIS Entity List, the DDTC Debarred Parties List, and other restricted parties lists prior to any transaction. Enhanced due diligence is applied to transactions involving high-risk jurisdictions.",
            tag: "OFAC / SDN",
          },
        ]}
      />

      <AnimatedLine />

      <TextSection label="Dual-Use Items" title="EAR and Dual-Use Technology Controls">
        <p>
          Certain Aegis technologies and components may be classified as dual-use items subject to the Export Administration Regulations. Dual-use items are products and technologies that have both civilian and military applications, and their export is controlled to prevent diversion to weapons of mass destruction programs, military end-uses in restricted countries, or terrorist organizations.
        </p>
        <p>
          Our classification process evaluates each item against the Commerce Control List to determine if it falls within a specific ECCN category. Items classified under Categories 3 (Electronics), 4 (Computers), 5 (Telecommunications), 6 (Sensors and Lasers), 7 (Navigation), 9 (Propulsion), or 11 (Encryption) may be subject to EAR controls if they do not fall within ITAR jurisdiction.
        </p>
        <p>
          For dual-use items, license requirements vary based on the destination country, end-user, and end-use. Countries are grouped into tiers (A through E) based on their relationship with the United States and their nonproliferation record. Exports to Country Group A:1 (close allies) generally face fewer restrictions, while exports to Country Group E:1 or E:2 (terrorist-supporting or embargoed states) are generally prohibited.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Encryption Controls" title="Encryption and Cybersecurity Export Controls">
        <p>
          Aegis products incorporate advanced encryption technologies for secure communications, data protection, and authentication. The export of encryption items is subject to specific controls under both ITAR and EAR. Military-grade encryption incorporated into defense articles is controlled under USML Category XI or XII, while commercial encryption items may be subject to EAR Category 5, Part 2 (Information Security).
        </p>
        <p>
          We maintain the necessary encryption registration and classification review submissions with BIS. All encryption exports comply with the Wassenaar Arrangement provisions on dual-use encryption items, and we obtain the required encryption review and classification determinations before exporting any encryption-enabled products or technology.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Screening" title="Restricted Party Screening">
        <p>
          Aegis maintains an automated restricted party screening system that checks all customers, partners, suppliers, and other counterparties against comprehensive lists of denied persons, debarred parties, sanctioned entities, and otherwise restricted parties. The screening system is updated daily to incorporate the latest changes to U.S. government restricted party lists.
        </p>
        <p>
          Our screening process covers the following lists: the DDTC Debarred Parties List, the BIS Denied Persons List, Unverified List, and Entity List, the OFAC Specially Designated Nationals and Consolidated Sanctions Lists, the State Department Nonproliferation Sanctions Lists, and additional international restricted party lists as applicable. Positive matches are referred to the Trade Compliance team for review and disposition before any transaction proceeds.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Incident Response" title="Export Control Violations and Voluntary Disclosures">
        <p>
          In the event of an actual or suspected export control violation, Aegis follows established internal procedures for investigation and reporting. Our incident response process includes immediate containment of any ongoing violation, thorough internal investigation to determine the scope and cause of the violation, preparation and submission of voluntary self-disclosures to DDTC or BIS as appropriate, and implementation of corrective actions to prevent recurrence.
        </p>
        <p>
          Voluntary self-disclosure is a cornerstone of our compliance program. We believe that proactive disclosure demonstrates good faith, mitigates potential penalties, and reinforces our commitment to compliance. All employees are encouraged and required to report potential violations through our confidential compliance hotline or directly to the Trade Compliance team, without fear of retaliation.
        </p>
      </TextSection>

      <CTASection
        title="Export Control Inquiries"
        subtitle="Our trade compliance team can provide detailed guidance on export control requirements for Aegis products and technology."
        primaryCta="Contact Trade Compliance"
        primaryHref="/contact"
        secondaryCta="ITAR Compliance"
        secondaryHref="/legal/itar"
      />
    </>
  );
}
