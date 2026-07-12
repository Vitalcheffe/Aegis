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

export default function CriticalInfrastructureProtection() {
  return (
    <>
      <SectionHero
        image="/images/blog/infrastructure-protection.jpg"
        label="Blog / Industry"
        title="Critical Infrastructure Protection Against Drone Threats"
        subtitle="Power plants, data centers, and government facilities face escalating drone threats — layered defense architectures are essential"
      />

      <TextSection label="Overview" title="The Infrastructure Vulnerability">
        <p>
          Critical infrastructure represents some of the most attractive targets for drone-based attacks and the most challenging environments for counter-UAS deployment. Power generation facilities, nuclear installations, data centers, government buildings, and communications infrastructure share common characteristics that make them vulnerable: fixed locations known to adversaries, large physical perimeters that are difficult to monitor continuously, and catastrophic consequences if successfully attacked. The threat is not hypothetical — drone incursions over nuclear power plants have been reported in France, Sweden, and the United States, while oil and gas facilities in the Middle East have faced coordinated drone attacks that caused significant damage and production disruption.
        </p>
        <p>
          The drone threat to critical infrastructure manifests in multiple forms. Surveillance drones can collect imagery of facility layouts, security procedures, and equipment configurations that inform subsequent attacks. Smuggling drones can deliver contraband into prisons and secure facilities. Weaponized drones can carry explosive payloads to detonate near critical equipment or infrastructure nodes. Electromagnetic attack drones can carry jamming equipment designed to disrupt facility communications and control systems. Each threat vector requires specific countermeasures, and infrastructure operators must defend against all of them simultaneously.
        </p>
        <p>
          The challenge is compounded by the regulatory environment surrounding critical infrastructure protection. While military installations generally have clear legal authority to employ active countermeasures against drone threats, civilian infrastructure operators typically lack such authority. In most jurisdictions, critical infrastructure operators can deploy detection systems but must rely on law enforcement or military partners for interdiction. This creates a response gap between detection and defeat that adversaries can exploit, particularly during hours when authorized responders may not be immediately available.
        </p>
      </TextSection>

      <SplitSection
        image="/images/blog/infrastructure-protection.jpg"
        label="Threat Assessment"
        title="Vulnerability Analysis for Infrastructure Operators"
        description="A comprehensive vulnerability analysis for critical infrastructure must evaluate multiple threat vectors. Surveillance threats involve drones conducting reconnaissance of facility perimeters, entry points, security patrol patterns, and critical equipment locations. Attack threats range from improvised explosive devices delivered by drone to precision strikes on specific infrastructure nodes. Smuggling threats involve drones delivering contraband, weapons, or communication devices into secure facilities such as prisons and government compounds. Electromagnetic threats include drones carrying jamming equipment designed to disrupt SCADA systems, communications, and GPS-dependent operations. Each threat vector requires dedicated sensor coverage and tailored response protocols to ensure comprehensive protection."
        stats={[
          { value: "87%", label: "Facilities Reporting Drone Incursions" },
          { value: "340%", label: "Increase in Incursions Since 2022" },
          { value: "$2.1M", label: "Average Cost Per Incident" },
          { value: "14", label: "Critical Infrastructure Sectors" },
        ]}
      />

      <TextSection title="Layered Defense Architecture for Infrastructure">
        <p>
          The layered defense model for critical infrastructure begins with an outer detection zone extending 5-15 kilometers from the facility perimeter. This zone employs long-range RF detection arrays that identify approaching drones and their operators at the earliest possible moment, providing maximum warning time for response activation. Radar systems with specialized drone detection capabilities provide complementary physical detection, particularly for autonomous drones that may not emit detectable RF signals. The combination of RF and radar coverage in the outer zone ensures that virtually all drone threats are detected before reaching the facility perimeter.
        </p>
        <p>
          The intermediate zone, extending from the perimeter to approximately 2 kilometers, provides the primary classification and tracking function. As detected drones enter this zone, electro-optical and infrared cameras acquire visual contact, enabling precise classification of drone type and payload assessment. The fusion of RF identification, radar tracking, and visual classification produces a comprehensive threat assessment that informs engagement decisions. This zone also incorporates acoustic sensors that provide additional detection capability for low-observable drones operating close to the surface.
        </p>
        <p>
          The inner zone encompasses the facility perimeter itself and provides the final protective layer. Point defense systems — including close-in electronic warfare, net capture launchers, and trained response teams — are positioned to defeat any drone that penetrates the outer and intermediate defenses. The inner zone also includes physical barriers such as netting and anti-drone screens that provide passive protection for the most critical infrastructure nodes. This defense-in-depth approach ensures that no single system failure results in a successful attack.
        </p>
      </TextSection>

      <QuoteSection
        quote="A drone carrying two kilograms of thermite can disable a substation transformer that takes eighteen months to replace. The asymmetric economics of drone attacks against infrastructure are staggering."
        author="Dr. Robert Katz"
        role="Director, Critical Infrastructure Protection Institute"
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "What types of critical infrastructure are most at risk from drones?",
            answer:
              "Nuclear facilities, power plants and substations, oil and gas infrastructure, data centers, government buildings, communications towers, water treatment facilities, and prisons are among the most targeted sectors. Nuclear and energy facilities face the highest threat severity due to the catastrophic consequences of successful attacks. Prisons face persistent smuggling threats. The risk to each facility depends on its strategic value, vulnerability, and the adversary's capability and intent.",
          },
          {
            question: "Can civilian infrastructure operators legally deploy counter-UAS systems?",
            answer:
              "In most jurisdictions, civilian operators can deploy passive detection systems (RF monitoring, radar, cameras) without special authorization. Active countermeasures (jamming, spoofing, kinetic interdiction) are generally restricted to authorized government entities. Some countries have established frameworks allowing designated critical infrastructure operators to employ limited active countermeasures under specific conditions. The regulatory trend is toward expanded authority, but current frameworks remain restrictive in most nations.",
          },
          {
            question: "How much does critical infrastructure counter-UAS protection cost?",
            answer:
              "Detection-only systems for a single facility range from $500K to $3M depending on coverage area and sensor sophistication. Comprehensive detection-and-interdiction systems with 24/7 monitoring cost $5-20M for initial deployment plus $1-3M annually for operations and maintenance. These costs must be weighed against the potential cost of a successful attack, which can range from millions to billions of dollars depending on the facility.",
          },
          {
            question: "How do counter-UAS systems avoid interfering with facility operations?",
            answer:
              "Counter-UAS systems designed for critical infrastructure undergo extensive electromagnetic compatibility testing to ensure they do not interfere with safety-critical systems. Directional antennas focus EW energy only toward identified threats. RF detection is completely passive. System installations are coordinated with facility engineering teams to identify and avoid frequency conflicts. For nuclear facilities, additional safety cases and regulatory approvals are required before any emitting system can be activated.",
          },
        ]}
      />

      <CTASection
        title="Protect Critical Assets"
        subtitle="Aegis delivers comprehensive counter-UAS solutions for critical infrastructure operators. Request a vulnerability assessment and protection plan consultation."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Capabilities"
        secondaryHref="/capabilities"
      />
    </>
  );
}
