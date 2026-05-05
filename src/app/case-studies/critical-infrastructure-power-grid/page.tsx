"use client";

import {
  SectionHero,
  TextSection,
  SplitSection,
  StatsSection,
  SpecTable,
  CTASection,
  QuoteSection,
  FAQSection,
} from "@/components/sections";

export default function CriticalInfrastructurePowerGridPage() {
  return (
    <>
      <SectionHero
        image="/images/case-studies/power-grid.jpg"
        label="Case Study"
        title="Defending Critical Energy Infrastructure in the Nordics"
        subtitle="How Aegis Core deployed across 14 critical substations to eliminate hostile state-actor drone reconnaissance and protect a nation's power grid"
      />

      <StatsSection
        label="Mission Results"
        stats={[
          { value: "14", label: "Substations Protected" },
          { value: "0", label: "Unauthorized Penetrations" },
          { value: "340+", label: "Recon Drones Intercepted" },
          { value: "99.99%", label: "System Uptime" },
        ]}
      />

      <TextSection label="Background" title="The Challenge">
        <p>
          A Nordic nation's national security intelligence service identified a systematic drone reconnaissance campaign targeting its critical energy infrastructure, including the high-voltage substations that form the backbone of the national power grid. Over an eighteen-month observation period, the intelligence service documented 89 drone flights over 14 of the nation's most critical substations — those responsible for transmitting over 70% of the country's electricity generation capacity. Forensic analysis of recovered drone debris confirmed that the platforms were military-grade systems manufactured by a hostile state actor, equipped with high-resolution electro-optical and thermal imaging payloads. The flight patterns demonstrated deliberate mapping of substation layouts, security postures, equipment configurations, and connection points — the type of reconnaissance that precedes a coordinated kinetic or cyber-kinetic attack on the power grid.
        </p>
        <p>
          The threat was particularly acute because the Nordic power grid operates with limited redundancy — the loss of three or more critical substations could cascade into a regional blackout affecting millions of residents during the harsh winter months when temperatures regularly drop below -20°C. The national energy regulator classified the drone reconnaissance campaign as the most significant threat to energy security since the Cold War. Existing security measures at the substations consisted of perimeter fencing, CCTV surveillance, and security guard patrols — none of which could detect, let alone defeat, drones operating at altitudes between 50 and 300 meters. The government authorized an emergency procurement of a comprehensive counter-UAS system with a mandate to achieve full operational capability at all 14 substations within six months.
        </p>
      </TextSection>

      <SplitSection
        image="/images/pages/infrastructure-power.jpg"
        label="Solution"
        title="Aegis Core Grid Defense Architecture"
        description="Aegis Defense Systems designed a distributed defense architecture centered on Aegis Core multi-modal sensor fusion nodes deployed at each of the 14 critical substations. Each Aegis Core installation combined a compact phased-array radar optimized for low-altitude detection in the substation's electromagnetic environment, EO/IR tracking cameras with thermal imaging capability for 24/7 operation in Nordic winter conditions, and RF direction-finding arrays to detect and locate drone command links. All 14 installations were networked via the Aegis Command cloud-based battle management system, which correlated data across the entire grid to detect patterns indicative of coordinated reconnaissance — such as multiple drones appearing at different substations within short time windows. The neutralization layer combined RF denial for command-guided drones and GPS spoofing for autonomous platforms, with the additional capability to dispatch law enforcement to the drone's estimated operator location based on RF triangulation."
        stats={[
          { value: "14", label: "Substation Sites" },
          { value: "8 km", label: "Detection Radius per Site" },
          { value: "24/7", label: "Arctic-Rated Operation" },
        ]}
      />

      <TextSection label="Operations" title="Mission Execution">
        <p>
          The Aegis Core system reached full operational capability at all 14 substations within five months — one month ahead of the government mandate. The accelerated timeline was achieved through standardized installation procedures, pre-configured system images, and a deployment team that worked in parallel across multiple sites. During the first month of full operation, the system detected 47 drone incursions across the 14 sites — significantly more than the intelligence service had documented, confirming that many drone flights had previously gone undetected. The system classified 43 of these as hostile reconnaissance platforms based on their flight behavior, sensor payloads detected by RF signature analysis, and flight profiles consistent with the previously identified patterns. All 43 were neutralized by RF denial or GPS spoofing without any impact on substation operations.
        </p>
        <p>
          A critical success came in the third month of operation when the Aegis Command system detected a coordinated reconnaissance operation involving four drones appearing simultaneously at four different substations — a pattern that would have been invisible without the networked multi-site correlation capability. The system alerted the national security operations center, which dispatched law enforcement teams to the estimated operator locations derived from RF triangulation. Two operators were apprehended with their ground control stations, and forensic analysis of the recovered equipment confirmed the hostile state-actor connection. Over the twelve-month reporting period, the system intercepted 340+ reconnaissance drones and facilitated the arrest of 11 operators. No unauthorized drone penetrated the defended airspace of any substation after Aegis Core reached operational capability. The intelligence data collected by Aegis systems contributed to a diplomatic response at the NATO level that resulted in the cessation of the reconnaissance campaign.
        </p>
      </TextSection>

      <QuoteSection
        quote="When four drones appeared at four substations simultaneously, we knew this wasn't hobbyists — it was a military-grade reconnaissance operation. Aegis didn't just stop the drones; it gave us the intelligence to expose the campaign and end it at the source."
        author="Director Erik Lindqvist"
        role="National Security Intelligence Service"
      />

      <SpecTable
        label="Deployment Details"
        title="System Configuration"
        specs={[
          { label: "Products Deployed", value: "Aegis Core (14 units), Aegis Command, SkyWatch" },
          { label: "Coverage Area", value: "14 substations, 8 km radius each (2,814 km² total)" },
          { label: "Threats Neutralized", value: "340+ over 12 months" },
          { label: "Operational Hours", value: "8,760 per site (24/7/365)" },
          { label: "Mission Duration", value: "Ongoing since deployment" },
          { label: "Operating Temperature", value: "-40°C to +45°C" },
          { label: "Neutralization Methods", value: "RF denial (62%), GPS spoofing (24%), Law enforcement interdiction (14%)" },
          { label: "Network", value: "Cloud-based Aegis Command with encrypted VPN" },
          { label: "Detection Range", value: "8 km (radar), 5 km (EO/IR)" },
          { label: "Operators Arrested", value: "11" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "How does Aegis Core operate reliably in extreme Nordic winter conditions?",
            answer:
              "All Aegis Core hardware is rated for operation from -40°C to +55°C, with the Nordic deployment specifically validated to -45°C through extended cold-chamber testing. The radar and EO/IR systems include integrated heaters and de-icing systems that activate automatically when temperatures drop below freezing. The phased-array radar has no moving parts, eliminating mechanical failures in cold conditions. During the deployment, the system maintained 99.99% operational availability through a winter that saw temperatures reach -38°C and wind chill below -50°C at several substation sites.",
          },
          {
            question: "How does the system avoid interfering with substation electromagnetic environments?",
            answer:
              "High-voltage substations generate significant electromagnetic interference that can overwhelm poorly designed detection systems. Aegis Core's radar employs advanced clutter-rejection algorithms specifically tuned for the substation electromagnetic environment, and the RF detection arrays use adaptive filtering to distinguish drone command signals from the broadband noise generated by transformers and switchgear. Each installation was calibrated on-site against measured EMI profiles to ensure optimal detection sensitivity without false alarms. No interference with substation protection relay systems or SCADA communications was recorded.",
          },
          {
            question: "How does the multi-site correlation capability detect coordinated operations?",
            answer:
              "The Aegis Command cloud-based battle management system continuously analyzes threat activity across all 14 sites, correlating events by time, drone type, flight profile, and RF signature. When multiple incursions occur within a defined time window — typically 30 minutes — and share characteristics such as similar drone types or overlapping RF signatures, the system automatically generates a coordinated activity alert. This capability was instrumental in detecting the four-site simultaneous reconnaissance operation in the third month, which would have appeared as four independent incidents without cross-site correlation.",
          },
          {
            question: "What measures protect the Aegis system itself from cyber attack?",
            answer:
              "Aegis Core installations communicate with the Aegis Command cloud via end-to-end encrypted VPN tunnels using FIPS 140-2 Level 3 validated cryptographic modules. All firmware updates are digitally signed and verified before installation. The local processing nodes are air-gapped from the substation's operational technology networks, ensuring that a compromise of the Aegis system cannot affect power grid operations. The system undergoes continuous penetration testing by the national cybersecurity agency, and no successful compromise has been achieved in any test to date.",
          },
        ]}
      />

      <CTASection
        title="Defend Your Critical Infrastructure"
        subtitle="State-actor drone reconnaissance is the prelude to attack. Aegis Core provides the layered detection and neutralization capability your infrastructure demands."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="View All Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
