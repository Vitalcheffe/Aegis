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

export default function UrbanAirMobilitySecurity() {
  return (
    <>
      <SectionHero
        image="/images/blog/urban-security.jpg"
        label="Blog / Industry"
        title="Urban Air Mobility Security Challenges"
        subtitle="The coming wave of eVTOL aircraft will transform city skies — and create unprecedented security challenges that demand new frameworks"
      />

      <TextSection label="Overview" title="The Urban Air Mobility Revolution">
        <p>
          Urban air mobility (UAM) represents one of the most significant transformations in aviation since the jet age. Electric vertical takeoff and landing (eVTOL) aircraft, commonly known as air taxis, are poised to enter commercial service in cities worldwide between 2026 and 2030, promising to reshape urban transportation by moving traffic from congested roads into the low-altitude airspace above metropolitan areas. Major aerospace manufacturers including Airbus, Boeing, Joby Aviation, and Lilium have advanced eVTOL programs through certification testing, with multiple aircraft types receiving or approaching type certification from the FAA and EASA. The market is projected to exceed $30 billion by 2030, with initial routes connecting airports to city centers and expanding into intra-urban point-to-point services.
        </p>
        <p>
          While the transportation benefits are compelling, UAM introduces a category of security challenges that existing counter-UAS frameworks were never designed to address. Traditional counter-UAS systems are designed to detect and defeat unauthorized, hostile, or errant drone operations — they are fundamentally threat-detection systems. UAM, by contrast, involves authorized, regulated, and commercially operated aircraft flying predictable routes at low altitude through dense urban airspace. The security challenge is not detecting these aircraft — they will be visible, audible, and broadcasting their positions — but rather distinguishing legitimate UAM operations from threats that exploit the cover of UAM traffic, protecting UAM infrastructure from drone attacks, and managing the interaction between UAM vehicles and unauthorized drones in the same airspace corridor.
        </p>
        <p>
          The convergence of UAM and drone traffic in the same low-altitude urban airspace creates a complex environment where traditional counter-UAS approaches may produce unacceptable false alarm rates or, worse, inadvertently target legitimate UAM operations. The security framework for UAM must therefore be built from the ground up, integrating counter-UAS capabilities with UAM traffic management systems, urban airspace monitoring, and city-level security infrastructure in ways that preserve the safety and efficiency of commercial air taxi operations while maintaining effective defense against malicious drone activity.
        </p>
      </TextSection>

      <SplitSection
        image="/images/blog/urban-security.jpg"
        label="Threat Analysis"
        title="Security Threats in the UAM Environment"
        description="The UAM security threat landscape encompasses several distinct vectors. Impersonation threats involve malicious drones that mimic UAM vehicle transponder signals, flight profiles, or visual characteristics to penetrate protected airspace undetected. Infrastructure threats target UAM vertiports, charging stations, and maintenance facilities with drone attacks that could disable critical nodes in the transportation network. Collision threats arise from unauthorized drones operating in UAM corridors, creating mid-air collision risks with air taxis carrying passengers. Cyber-physical threats exploit UAM communication and navigation systems, potentially hijacking vehicle control or spoofing UTM data to create hazardous situations. Each threat vector requires dedicated detection and response capabilities integrated within the broader urban security architecture."
        stats={[
          { value: "$30B+", label: "UAM Market Projection 2030" },
          { value: "200+", label: "eVTOL Aircraft in Development" },
          { value: "60+", label: "Cities Planning UAM Services" },
          { value: "2026", label: "First Commercial UAM Routes" },
        ]}
      />

      <TextSection title="Integrating Counter-UAS with Urban Traffic Management">
        <p>
          The fundamental challenge of UAM security is the need to integrate counter-UAS capabilities with Unmanned Aircraft System Traffic Management (UTM) and UAM traffic management systems. UTM systems manage the flow of drone and UAM traffic through designated airspace corridors, providing deconfliction services, flight plan management, and real-time position monitoring. Counter-UAS systems must interface seamlessly with UTM to access real-time flight plan data, enabling them to distinguish authorized UAM and drone operations from unauthorized or hostile activity. Without this integration, counter-UAS systems would generate excessive false alarms against legitimate traffic and could potentially target authorized aircraft.
        </p>
        <p>
          The technical architecture for this integration involves bidirectional data exchange between counter-UAS sensors and UTM systems. The counter-UAS system provides UTM with surveillance data on all detected airborne objects, including those not filing flight plans. The UTM system provides the counter-UAS with real-time flight plan information, enabling immediate correlation of detected objects with authorized operations. Objects that correlate with valid flight plans are flagged as authorized; objects that do not correlate are assessed as potential threats requiring further investigation and potential interdiction. This correlation must occur in real-time, processing hundreds of objects simultaneously in a dense urban environment where UAM vehicles may be separated from potential threats by only hundreds of meters.
        </p>
        <p>
          The challenge is compounded by the need to protect passenger-carrying UAM vehicles from mid-air collisions with unauthorized drones. A drone impacting an eVTOL carrying six passengers at 500 feet above a dense urban area could produce catastrophic consequences. Counter-UAS systems deployed along UAM corridors must provide continuous surveillance and rapid interdiction capability, creating a protective bubble around active flight routes. This requires a distributed sensor network covering the entire corridor with overlapping coverage, ensuring no gaps that a hostile drone could exploit to approach a UAM vehicle undetected.
        </p>
      </TextSection>

      <QuoteSection
        quote="Urban air mobility will put aircraft where drones fly today. The security framework must ensure that when an air taxi and a rogue drone share the same airspace, the outcome is never in doubt."
        author="Dr. Helena Strauss"
        role="Director, Urban Air Mobility Security Alliance"
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "How does UAM change the counter-UAS security challenge?",
            answer:
              "UAM introduces authorized, passenger-carrying aircraft into the same low-altitude airspace where drones operate, making threat discrimination far more complex. Traditional counter-UAS systems treat all small aircraft as potential threats; UAM requires systems that can reliably distinguish legitimate air taxis from hostile drones. Additionally, UAM infrastructure (vertiports, charging stations) creates new high-value targets for drone attacks that must be protected within dense urban environments.",
          },
          {
            question: "Can counter-UAS systems distinguish between UAM vehicles and drones?",
            answer:
              "Yes, with proper integration. UAM vehicles will carry transponders, broadcast ADS-B signals, and file flight plans through UTM systems. Counter-UAS systems that interface with UTM can correlate detected objects with authorized flight plans, immediately identifying objects without valid authorization as potential threats. Multi-sensor classification (RF fingerprinting, radar signature analysis, and visual identification) provides additional discrimination layers for objects that may be spoofing UAM signals.",
          },
          {
            question: "What is UTM and how does it relate to counter-UAS?",
            answer:
              "UTM (Unmanned Aircraft System Traffic Management) is the framework for managing drone and UAM traffic in low-altitude airspace. It provides flight plan management, deconfliction services, and real-time position monitoring. Counter-UAS integration with UTM enables automatic correlation of detected objects with authorized operations, dramatically reducing false alarm rates and enabling focused attention on genuinely unauthorized activity in the UAM corridor.",
          },
          {
            question: "When will UAM services become operational?",
            answer:
              "Several eVTOL manufacturers are targeting 2026-2027 for initial commercial operations, with early routes connecting airports to city centers. Full urban air mobility networks with multiple vertiports and high-frequency service are expected by 2028-2030 in major metropolitan areas. Security frameworks must be developed and tested alongside the aircraft certification process to ensure they are operational from the first day of commercial service.",
          },
          {
            question: "How will cities protect UAM corridors from drone threats?",
            answer:
              "Cities will deploy distributed sensor networks along UAM corridors with overlapping coverage, integrated with UTM for real-time flight plan correlation. Fixed sensor installations at vertiports and along route corridors will provide continuous surveillance. Mobile response teams with portable counter-UAS systems will address threats detected outside fixed coverage areas. The protective architecture must balance security effectiveness with the urban environment's constraints on electromagnetic emissions and kinetic interdiction.",
          },
        ]}
      />

      <CTASection
        title="Secure the Urban Sky"
        subtitle="Aegis is developing integrated security solutions for the urban air mobility environment. Request a briefing on our UAM corridor protection architectures."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Capabilities"
        secondaryHref="/capabilities"
      />
    </>
  );
}
