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

export default function AirForceBaseDefensePage() {
  return (
    <>
      <SectionHero
        image="/images/case-studies/air-base.jpg"
        label="Case Study"
        title="Protecting Forward Deployed Air Assets"
        subtitle="Aegis Shield at Al Dhafra: How 360° perimeter defense neutralized every drone threat before it reached the flightline"
      />

      <StatsSection
        label="Mission Results"
        stats={[
          { value: "847", label: "Threats Detected" },
          { value: "100%", label: "Intercept Rate" },
          { value: "0", label: "Flightline Disruptions" },
          { value: "14 mo", label: "Continuous Operation" },
        ]}
      />

      <TextSection label="Background" title="The Challenge">
        <p>
          Al Dhafra Air Base, one of the most strategically critical installations in the CENTCOM area of responsibility, faced an escalating and sustained drone threat that jeopardized both combat operations and the safety of over 5,000 deployed personnel. The base hosts multi-role fighter squadrons, intelligence surveillance and reconnaissance assets, and a regional air operations center — making it a high-value target for adversarial drone reconnaissance and potential attack. Over the preceding eighteen months, threat intelligence indicated that hostile actors had shifted from sporadic hobbyist drone incursions to coordinated, military-grade UAS operations designed to test base defenses and gather intelligence on aircraft movements, parking configurations, and force protection postures.
        </p>
        <p>
          The existing counter-drone measures at Al Dhafra consisted of legacy RF detection systems with limited directional capability and no integrated neutralization capability. These systems suffered from chronic false positives triggered by the base's own communications infrastructure and routinely failed to detect low-observable drones employing frequency-hopping command links. Between January and March of the deployment year alone, the base recorded 127 confirmed drone incursions that penetrated the outer perimeter, with at least 14 reaching the flightline itself. Two of these incursions resulted in temporary suspension of flight operations, costing an estimated 240 lost sortie-hours and forcing the relocation of four aircraft to hardened shelters. The 380th Air Expeditionary Wing commander identified the counter-UAS gap as the single most significant non-kinetic threat to mission accomplishment.
        </p>
      </TextSection>

      <SplitSection
        image="/images/pages/shield-defense.jpg"
        label="Solution"
        title="Aegis Shield Deployment"
        description="Aegis Defense Systems deployed a comprehensive Aegis Shield perimeter defense architecture tailored to the unique operational environment at Al Dhafra. The solution centered on four overlapping detection and neutralization rings, beginning with long-range Aegis SkyWatch surveillance radar positioned at 15 km from the base center, providing early warning and coarse tracking of incoming contacts. The second ring comprised Aegis Core multi-modal sensor fusion nodes at 8 km, integrating phased-array radar, electro-optical/infrared cameras, and RF direction-finding arrays to deliver precision classification of detected targets. The third ring deployed Aegis Sentinel autonomous interceptors at 4 km, providing rapid kinetic and non-kinetic neutralization options selected automatically by the Aegis Command battle management system based on target profile, rules of engagement, and collateral risk assessment. The fourth ring was an inner-sanctum RF denial zone around the flightline itself, preventing any drone that penetrated the outer rings from establishing or maintaining command-and-control links."
        stats={[
          { value: "15 km", label: "Early Warning Range" },
          { value: "4", label: "Defense Rings" },
          { value: "< 2.1s", label: "Detect-to-Neutralize" },
        ]}
      />

      <TextSection label="Operations" title="Mission Execution">
        <p>
          Within the first week of full operational capability, Aegis Shield demonstrated its value by detecting and neutralizing a coordinated swarm of six drones approaching from the northwest during a period of reduced visibility. The SkyWatch radar detected the formation at 14.3 km range, and the Aegis Command system classified all six targets as hostile within 0.8 seconds of sensor fusion lock. Three drones were neutralized by RF denial at 6.2 km range, causing them to enter failsafe routines and land in unoccupied desert terrain. The remaining three, which were operating on autonomous navigation without active command links, were engaged by Aegis Sentinel interceptors and neutralized at 3.8 km from the flightline. The entire engagement sequence from first detection to final neutralization was completed in under 90 seconds, and no flight operations were disrupted.
        </p>
        <p>
          Over the fourteen-month deployment period, Aegis Shield processed over 12,000 radar tracks, of which 847 were classified as hostile UAS. The system achieved a 100% neutralization rate against all confirmed threats, with 73% neutralized by RF denial and 27% requiring kinetic engagement by Sentinel interceptors. Critically, the system recorded zero false positive engagements — no friendly aircraft, birds, or atmospheric phenomena were incorrectly classified as hostile. The mean time from first detection to neutralization was 2.1 seconds for RF-denial targets and 11.4 seconds for kinetic engagements. The base recorded zero drone penetrations of the flightline perimeter after Aegis Shield reached full operational capability, compared to 14 penetrations in the three months prior. Sortie generation rates improved by 4.2% as aircrew confidence in base defense reduced mission-abort decisions driven by drone threat conditions.
        </p>
      </TextSection>

      <QuoteSection
        quote="Aegis Shield gave us something we hadn't had in eighteen months — the ability to operate without looking over our shoulder. When the swarm came in on day seven, the system handled it before our ops team even finished reading the alert. That's the difference between a warning system and a weapon system."
        author="Colonel James R. Patterson"
        role="Commander, 380th Air Expeditionary Wing"
      />

      <SpecTable
        label="Deployment Details"
        title="System Configuration"
        specs={[
          { label: "Products Deployed", value: "Aegis Shield, Core, SkyWatch, Sentinel, Command" },
          { label: "Coverage Area", value: "780 km² (4-ring defense architecture)" },
          { label: "Threats Neutralized", value: "847 over 14 months" },
          { label: "Operational Hours", value: "10,220 continuous" },
          { label: "Mission Duration", value: "14 months (ongoing)" },
          { label: "Detection Range", value: "15 km (early warning), 8 km (classification)" },
          { label: "Neutralization Methods", value: "RF denial (73%), Kinetic intercept (27%)" },
          { label: "Mean Engagement Time", value: "2.1s (RF), 11.4s (kinetic)" },
          { label: "False Positive Rate", value: "0%" },
          { label: "Integration", value: "CENTCOM AOR C2, Patriot, THAAD networks" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "How did Aegis Shield differentiate between hostile drones and friendly aircraft in a congested military airspace?",
            answer:
              "Aegis Shield integrates directly with the base's air traffic control and IFF systems via the Aegis Command battle management layer. All tracks are correlated against known flight plans, transponder codes, and radar cross-section profiles. Only contacts that fail all friendly correlation checks and exhibit UAS flight characteristics are classified as potential threats. The multi-modal sensor fusion — combining radar, EO/IR, and RF signatures — ensures classification accuracy above 99.97% even in high-clutter environments with multiple simultaneous air operations.",
          },
          {
            question: "What happens when a drone operates autonomously without an RF command link?",
            answer:
              "The Aegis Shield architecture accounts for autonomous drones through its layered defense design. While RF denial is the preferred first response due to its low collateral risk, drones operating on pre-programmed waypoints without active command links are engaged by Aegis Sentinel kinetic interceptors once they cross the 4 km engagement ring. The system's EO/IR tracking and radar provide continuous fire-control quality tracking for autonomous targets, enabling reliable kinetic engagement. At Al Dhafra, 27% of neutralized threats were autonomous and were successfully engaged by Sentinel interceptors.",
          },
          {
            question: "How was the system maintained during continuous 14-month operation?",
            answer:
              "Aegis Shield is designed for sustained operations in austere environments with modular line-replaceable units. A forward-deployed Aegis field service team of four technicians provided 24/7 on-site support during the initial 90-day operational validation period. After that, the base's own communications and electronics personnel maintained the system with remote technical support from Aegis engineering. The system achieved 99.94% operational availability over the 14-month period, with all maintenance performed without degrading the active defense posture through redundant sensor and effector coverage.",
          },
          {
            question: "Can Aegis Shield scale to protect larger installations or multiple bases simultaneously?",
            answer:
              "The Aegis Command battle management system is inherently scalable. Multiple Aegis Shield installations can be networked via the Aegis Integrator platform to provide shared situational awareness and coordinated defense across geographic regions. For the Al Dhafra deployment, the system was designed with excess processing capacity to accommodate future expansion of the sensor and effector network. Aegis has demonstrated coordinated multi-site defense in other theaters where three or more installations share a common operational picture and deconflict engagement authority.",
          },
          {
            question: "What was the impact on existing base communications and radar systems?",
            answer:
              "Aegis Shield was specifically engineered to operate in the same RF environment as military communications, radar, and electronic warfare systems without causing interference. The RF detection arrays use passive direction-finding techniques that do not emit energy, and the active RF denial systems are precisely targeted to affect only the threat drone's command frequencies. Extensive spectrum coordination was conducted with the base spectrum manager prior to deployment, and no interference incidents were recorded during the 14-month operational period.",
          },
        ]}
      />

      <CTASection
        title="Protect Your Forward Operating Base"
        subtitle="Aegis Shield is combat-proven in the most demanding environments. Request a classified briefing to learn how we can defend your critical air assets."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="View All Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
