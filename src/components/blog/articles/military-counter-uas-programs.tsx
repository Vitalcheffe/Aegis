"use client";

import {
  SectionHero,
  TextSection,
  SplitSection,
  QuoteSection,
  FAQSection,
  CTASection,
  ImageBreak,
} from "@/components/sections";

export default function MilitaryCounterUASPrograms() {
  return (
    <>
      <SectionHero
        image="/images/blog/military-programs.jpg"
        label="Blog / Operations"
        title="Inside Military Counter-UAS Programs Worldwide"
        subtitle="From the U.S. REPLICATOR initiative to Israel's Iron Beam — a survey of the most significant defense programs across twelve nations"
      />

      <TextSection label="Overview" title="The Global Military Counter-UAS Landscape">
        <p>
          Military counter-UAS programs have undergone an unprecedented expansion since 2023, driven by the demonstrated impact of drone warfare in Ukraine, the Red Sea, and multiple regional conflicts. What was once a niche capability housed within electronic warfare units has become a top-line procurement priority for defense ministries worldwide. The scale of investment is staggering: the U.S. Department of Defense alone has allocated over $2.7 billion to counter-UAS programs in fiscal year 2026, while European NATO members have collectively committed approximately $3 billion through various national and alliance-funded initiatives.
        </p>
        <p>
          The diversity of military counter-UAS programs mirrors the diversity of the threats they address. Programs range from tactical, man-portable systems designed for dismounted infantry and special operations forces, to strategic, fixed-site installations protecting national capitals and critical military infrastructure. Some programs emphasize soft-kill electronic warfare solutions, while others prioritize kinetic and directed energy interceptors. The most advanced programs are developing integrated systems-of-systems that combine multiple sensor and effector types within a unified command and control architecture, enabling layered defense against the full spectrum of drone threats.
        </p>
        <p>
          This survey examines the most significant military counter-UAS programs across twelve nations, analyzing their technological approaches, operational doctrines, and strategic implications. The programs selected represent the leading edge of counter-UAS capability development and provide insight into the future trajectory of military drone defense. Each program reflects its nation's unique threat environment, defense industrial base, and strategic priorities, creating a diverse global landscape of counter-UAS innovation and investment.
        </p>
      </TextSection>

      <SplitSection
        image="/images/blog/military-programs.jpg"
        label="Program Survey"
        title="United States: Multi-Domain Counter-UAS Architecture"
        description="The United States operates the world's most extensive counter-UAS program portfolio, spanning the Department of Defense, Department of Homeland Security, and intelligence community. The cornerstone is the Joint Counter-Small Unmanned Aircraft Systems Office (JCO), which establishes interoperability standards and evaluates candidate systems for joint service adoption. Key programs include the Fixed Site-Low Slow Small UAV Integrated Defeat System (FS-LIDS) for installation protection, the Mobile-Low Slow Small UAV Integrated Defeat System (M-LIDS) for maneuver forces, and the REPLICATOR initiative focused on countering mass drone swarms with autonomous defensive capabilities. The U.S. has also made significant investments in directed energy integration, with 50 kW and 300 kW laser systems undergoing operational testing across multiple service branches."
        stats={[
          { value: "$2.7B", label: "U.S. C-UAS Budget FY2026" },
          { value: "12", label: "Nations Surveyed" },
          { value: "300kW", label: "Laser Power (DE M-SHORAD)" },
          { value: "200+", label: "Systems Evaluated by JCO" },
        ]}
      />

      <TextSection title="European and Indo-Pacific Programs">
        <p>
          European counter-UAS investment has accelerated dramatically since 2022, driven by the Ukraine conflict and the recognition that NATO's eastern flank faces immediate drone threats. France leads European programs with the PARAD program, which integrates detection, identification, and neutralization capabilities across fixed and mobile configurations. Germany's counter-UAS program focuses on sensor fusion and integrated air defense, embedding counter-drone capabilities within the existing tactical air defense architecture. The United Kingdom has invested heavily in both detection and interdiction capabilities, with the Ministry of Defence's Counter-UAS program fielding systems for base protection, maritime deployment, and urban operations.
        </p>
        <p>
          The Indo-Pacific region presents unique counter-UAS challenges characterized by vast maritime distances, dispersed island chains, and the strategic imperative to counter Chinese drone capabilities. Japan has established a dedicated counter-UAS program within its Self-Defense Forces, with particular emphasis on protecting naval assets and coastal infrastructure. South Korea has invested heavily in counter-UAS systems for DMZ protection, with the $180 million Aegis Shield deployment representing one of the largest single-nation counter-UAS procurements in the region. Australia is developing integrated counter-UAS capabilities for both land and maritime domains as part of its broader force modernization program.
        </p>
        <p>
          Israel maintains the world's most operationally experienced counter-UAS force, having confronted drone threats continuously for over two decades. The Iron Beam program — a 100 kW directed energy system designed for drone and mortar defense — represents the cutting edge of hard-kill counter-UAS technology. Israel's layered defense architecture combines the Iron Dome missile defense system with dedicated counter-drone sensors and effectors, providing comprehensive protection that has been combat-proven against Hamas and Hezbollah drone operations in multiple conflict cycles.
        </p>
      </TextSection>

      <QuoteSection
        quote="Every major military conflict since 2020 has demonstrated the same lesson: the side that controls the air below 10,000 feet wins. Counter-UAS is no longer a supporting capability — it is the decisive capability."
        author="Lieutenant General Mark Hamilton"
        role="Former Deputy Commander, U.S. European Command"
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "What is the U.S. REPLICATOR initiative?",
            answer:
              "REPLICATOR is a Department of Defense initiative focused on countering mass drone threats through autonomous defensive capabilities. The program aims to field thousands of autonomous systems that can counter adversary drone swarms at scale. It represents a shift from expensive, exquisite counter-UAS systems to affordable, attritable platforms that can be deployed in large numbers to match the mass of incoming threats.",
          },
          {
            question: "Which country has the most advanced counter-UAS capability?",
            answer:
              "Israel is widely regarded as having the most operationally experienced and battle-tested counter-UAS capability, having faced continuous drone threats for over two decades. The United States has the most extensive and well-funded program portfolio. However, capability assessments depend on the specific metric — Israel leads in operational experience, the U.S. in investment scale, and several European nations in sensor fusion and civil-military integration.",
          },
          {
            question: "What role does NATO play in counter-UAS?",
            answer:
              "NATO coordinates counter-UAS standards development, interoperability testing, and collective procurement through its Counter-UAS Working Group and the NATO Support and Procurement Agency. The alliance develops shared threat libraries, common data formats, and interoperability standards (STANAGs) that enable national systems to share real-time threat information. NATO also conducts regular exercises to test allied counter-UAS coordination and integration.",
          },
          {
            question: "Are directed energy weapons operational for counter-UAS?",
            answer:
              "Yes, directed energy systems are transitioning from development to operational deployment. Israel's Iron Beam (100 kW laser) is approaching initial operational capability. The U.S. has deployed 50 kW laser systems on Stryker vehicles under the DE M-SHORAD program. High-power microwave systems have been demonstrated operationally against swarms. While not yet standard equipment, directed energy is moving rapidly from experimental to operational status across multiple nations' armed forces.",
          },
        ]}
      />

      <CTASection
        title="Explore Military Solutions"
        subtitle="Aegis Defense Systems delivers battle-proven counter-UAS capabilities to military forces worldwide. Request a classified briefing on our defense programs."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Capabilities"
        secondaryHref="/capabilities"
      />
    </>
  );
}
