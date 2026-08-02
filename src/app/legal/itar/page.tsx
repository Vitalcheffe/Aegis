"use client";

import {
  SectionHero,
  TextSection,
  FeatureList,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function ITARCompliancePage() {
  return (
    <>
      <SectionHero
        image="/images/pages/legal-itar.jpg"
        label="Legal"
        title="ITAR Compliance"
        subtitle="International Traffic in Arms Regulations"
      />

      <TextSection label="Regulatory Framework" title="ITAR Compliance at Aegis">
        <p>
          The International Traffic in Arms Regulations (ITAR), codified at 22 CFR Parts 120-130, implement the provisions of the Arms Export Control Act (AECA) and regulate the export and temporary import of defense articles and defense services listed on the United States Munitions List (USML). As a developer and manufacturer of counter-UAS defense systems, Aegis Defense Systems is subject to ITAR requirements and maintains comprehensive compliance programs to ensure full adherence to these regulations.
        </p>
        <p>
          ITAR compliance is not merely a legal obligation for Aegis — it is a fundamental component of our corporate responsibility and our commitment to U.S. national security. Our compliance program is designed to prevent the unauthorized export, re-export, or transfer of defense articles, technical data, and defense services to unauthorized persons or destinations.
        </p>
        <p>
          The U.S. Department of State, Directorate of Defense Trade Controls (DDTC), is the primary regulatory authority responsible for administering ITAR. Aegis maintains active registration with DDTC and operates under the oversight of our designated Empowered Official, who has the authority to sign license applications and other export control documents on behalf of the company.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="USML Coverage" title="United States Munitions List Classification">
        <p>
          Aegis counter-UAS defense systems are classified under Category XI (Military Electronics) and Category XII (Fire Control, Laser, Imaging, and Guidance Equipment) of the United States Munitions List. This classification means that all Aegis defense articles, associated technical data, and defense services are subject to ITAR controls.
        </p>
        <p>
          Specifically, our systems fall under the following USML categories: radar detection and tracking systems designed for military applications (Category XI(a)), electronic countermeasure systems and equipment (Category XI(b)), command and control systems for air defense operations (Category XI(c)), and directed energy systems designed for UAS neutralization (Category XII). Technical data related to the development, production, manufacturing, assembly, operation, repair, testing, maintenance, or modification of these defense articles is also subject to ITAR control.
        </p>
        <p>
          Our classification determinations are made in consultation with the DDTC and are reviewed annually to ensure continued accuracy. If there is any question regarding the classification of a specific item, component, or technology, we seek a formal commodity jurisdiction determination from the DDTC.
        </p>
      </TextSection>

      <AnimatedLine />

      <FeatureList
        label="Key Requirements"
        title="ITAR Compliance Requirements"
        items={[
          {
            title: "Registration",
            description:
              "Aegis maintains current registration with the Directorate of Defense Trade Controls (DDTC) as a manufacturer and exporter of defense articles. Our registration is renewed annually and covers all ITAR-controlled activities including manufacturing, exporting, and brokering of defense articles and defense services.",
            tag: "22 CFR §122",
          },
          {
            title: "Licensing",
            description:
              "All exports of Aegis defense articles, technical data, and defense services require a DDTC license or license exemption. We maintain a comprehensive licensing program that ensures all international transfers are authorized under the appropriate license types, including DSP-5 for permanent exports, DSP-73 for temporary exports, and TAA/MLA for technical assistance and manufacturing license agreements.",
            tag: "22 CFR §123-125",
          },
          {
            title: "Deemed Exports",
            description:
              "We strictly control access to ITAR-controlled technical data by non-U.S. persons within the United States, recognizing that disclosure to foreign nationals constitutes a deemed export. All personnel with access to controlled data undergo citizenship verification, and access controls are enforced through physical, technical, and administrative measures.",
            tag: "22 CFR §120.17",
          },
          {
            title: "Technology Control Plans",
            description:
              "Each Aegis facility and deployment site operates under a Technology Control Plan (TCP) that defines specific procedures for safeguarding ITAR-controlled articles and data. TCPs address physical security, access controls, IT network security, visitor management, and incident response procedures.",
            tag: "22 CFR §126.13",
          },
          {
            title: "Record Keeping",
            description:
              "We maintain comprehensive records of all ITAR-controlled transactions for a minimum of five years, as required by 22 CFR §122.5. Records include license applications, shipping documents, end-user certificates, technical assistance agreements, and all correspondence related to export activities.",
            tag: "22 CFR §122.5",
          },
          {
            title: "Training and Awareness",
            description:
              "All Aegis employees receive mandatory ITAR compliance training upon hire and annually thereafter. Training covers export control fundamentals, classification, licensing requirements, deemed export controls, technology control plans, and reporting obligations. Specialized training is provided to personnel in export-facing roles.",
            tag: "Corporate Policy",
          },
          {
            title: "Voluntary Disclosures",
            description:
              "In the event of any actual or suspected ITAR violation, Aegis follows established procedures for voluntary self-disclosure to the DDTC. Our compliance team conducts immediate internal investigations and submits timely disclosures in accordance with 22 CFR §127.12, demonstrating our commitment to transparency and corrective action.",
            tag: "22 CFR §127.12",
          },
          {
            title: "Empowered Official",
            description:
              "Aegis designates a qualified Empowered Official who is authorized to sign license applications, certify compliance statements, and make binding commitments on behalf of the company regarding ITAR compliance. The Empowered Official has independent authority to ensure compliance and report directly to senior management.",
            tag: "22 CFR §120.25",
          },
        ]}
      />

      <AnimatedLine />

      <TextSection label="International Operations" title="Foreign Military Sales and Direct Commercial Sales">
        <p>
          Aegis supports both Foreign Military Sales (FMS) and Direct Commercial Sales (DCS) channels for international customers. All international transfers of Aegis defense articles are conducted under the appropriate authorization, whether through government-to-government FMS cases or DDTC-approved direct commercial licenses.
        </p>
        <p>
          For FMS transactions, we work closely with the Defense Security Cooperation Agency (DSCA), the relevant military service acquisition office, and the Defense Technology Security Administration (DTSA) to ensure that all transfers are consistent with U.S. foreign policy and national security objectives.
        </p>
        <p>
          For DCS transactions, we conduct thorough due diligence on all prospective end-users and end-uses, verify the legitimacy of procurement requests, obtain necessary end-user certificates, and ensure that all license conditions are fully satisfied before, during, and after the transfer.
        </p>
      </TextSection>

      <AnimatedLine />

      <TextSection label="Prohibited Activities" title="ITAR Prohibitions and Restrictions">
        <p>
          ITAR prohibits the export of defense articles, technical data, and defense services to countries subject to U.S. arms embargoes, including countries designated as state sponsors of terrorism. Aegis does not engage in any transactions with or for the benefit of embargoed destinations, denied persons, debarred parties, or sanctioned entities.
        </p>
        <p>
          We also prohibit any activity that would constitute a violation of ITAR anti-boycott provisions, including participation in or support of international boycotts not sanctioned by the U.S. government. All employees are required to report any requests to furnish boycott-related information or to participate in restrictive trade practices.
        </p>
      </TextSection>

      <CTASection
        title="Compliance Questions?"
        subtitle="Our export control team is available to discuss ITAR requirements related to Aegis products and services."
        primaryCta="Contact Compliance"
        primaryHref="/contact"
        secondaryCta="Export Control"
        secondaryHref="/legal/export-control"
      />
    </>
  );
}
