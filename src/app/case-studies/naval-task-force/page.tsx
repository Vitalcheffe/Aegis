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

export default function NavalTaskForcePage() {
  return (
    <>
      <SectionHero
        image="/images/case-studies/naval-task-force.jpg"
        label="Case Study"
        title="Counter-UAS for Maritime Task Forces"
        subtitle="How Aegis Mobile protected a naval task force across 3,200 nautical miles of contested waters against coordinated drone swarm attacks"
      />

      <StatsSection
        label="Mission Results"
        stats={[
          { value: "3,200", label: "Nautical Miles Protected" },
          { value: "156", label: "Threats Neutralized" },
          { value: "99.4%", label: "Intercept Rate" },
          { value: "0", label: "Ship Damages" },
        ]}
      />

      <TextSection label="Background" title="The Challenge">
        <p>
          A multinational naval task force comprising six surface combatants and two support vessels operated in contested waters where a near-peer adversary had established sophisticated shore-based drone launch capabilities. Intelligence assessments indicated that the adversary operated a fleet of over 200 military-grade UAS from mobile launch sites along a 400 km coastline, including intelligence-surveillance-reconnaissance platforms, swarm-attack drones carrying explosive payloads, and one-way attack drones designed for kinetic impact against ship superstructures and radar arrays. The task force's existing close-in weapon systems were designed for anti-ship missiles and aircraft — not for the small, slow, low-altitude drones that could approach at wave-top height and swarm simultaneously from multiple axes.
        </p>
        <p>
          During the first two months of the deployment, the task force experienced 43 confirmed drone approach events, including two coordinated swarm attacks involving 12 and 18 drones respectively. The first swarm attack overwhelmed the task force's defensive coordination, with four drones penetrating within 500 meters of the flagship before being engaged by conventional weapons. The second swarm attack resulted in one drone impacting the deck of a guided-missile destroyer, causing superficial structural damage and forcing the ship to withdraw for emergency repairs. The task force commander identified the counter-UAS gap as the most critical vulnerability in the force's defensive posture and requested an urgent capability injection.
        </p>
      </TextSection>

      <SplitSection
        image="/images/pages/naval-warship.jpg"
        label="Solution"
        title="Aegis Mobile Maritime Deployment"
        description="Aegis Defense Systems deployed Aegis Mobile units — containerized, transportable counter-UAS systems designed for rapid integration onto naval platforms. Each Aegis Mobile unit combines a compact phased-array radar, EO/IR tracking sensors, and dual-mode RF denial and spoofing effectors in a single ISO-standard container that can be mounted on any ship with deck space and power. Four units were installed across the task force within 72 hours of arrival, with primary coverage assigned to the flagship and the two guided-missile destroyers. The Aegis Mobile units were networked via the Aegis Command battle management system, which fused data from all four units and the ships' existing combat management systems to provide a common operational picture across the entire task force. This networked approach enabled distributed engagement — any Aegis Mobile unit could detect a threat and hand off engagement to the unit with the best effector geometry, ensuring optimal neutralization regardless of threat approach axis."
        stats={[
          { value: "72 hrs", label: "Installation Time" },
          { value: "4", label: "Ships Equipped" },
          { value: "360°", label: "Force Coverage" },
        ]}
      />

      <TextSection label="Operations" title="Mission Execution">
        <p>
          The first major test of the Aegis Mobile system came three days after installation, when the adversary launched a 22-drone swarm attack from three separate coastal launch sites. The Aegis Command system detected the launch activity via the lead ship's radar at 28 km range and classified the formation as a coordinated swarm within 1.2 seconds. The battle management system automatically assigned engagement responsibilities across the four Aegis Mobile units, prioritizing the closest threats to each ship. Over the next 140 seconds, the networked Aegis Mobile units neutralized 20 of the 22 drones — 16 via RF denial that forced the command-guided drones into failsafe landings at sea, and 4 via GPS spoofing that redirected autonomous drones away from the task force into open water. The remaining two drones were engaged by the ships' conventional close-in weapons after penetrating the Aegis engagement envelope. No ships were damaged, and the task force maintained formation throughout the engagement.
        </p>
        <p>
          Over the six-month deployment period, the Aegis Mobile system processed 156 hostile drone engagements across 47 separate events. The system achieved a 99.4% neutralization rate, with 71% of threats defeated by RF denial, 18% by GPS spoofing, and the remaining 11% by conventional weapons after Aegis tracking provided fire-control quality data. The task force recorded zero drone impacts on any ship after Aegis Mobile reached operational capability. The system also provided critical intelligence value — by recording the RF signatures and flight profiles of every drone engaged, Aegis built a comprehensive threat library that improved classification speed by 40% over the deployment period. The Aegis Command system's ability to correlate launch site activity with swarm timing enabled the task force to predict attacks with 85% accuracy, allowing proactive defensive posturing that further reduced risk to the force.
        </p>
      </TextSection>

      <QuoteSection
        quote="We went from ducking drones every week to watching them drop out of the sky before they got within five kilometers. The Aegis Mobile units gave us a layered defense that our CIWS and 5-inch guns were never designed to provide. My crews could focus on their primary missions instead of swatting drones."
        author="Rear Admiral Carlos M. Velez"
        role="Commander, Combined Task Force 152"
      />

      <SpecTable
        label="Deployment Details"
        title="System Configuration"
        specs={[
          { label: "Products Deployed", value: "Aegis Mobile (4 units), Aegis Command" },
          { label: "Coverage Area", value: "3,200 NM operational area, 360° per ship" },
          { label: "Threats Neutralized", value: "156 over 6 months" },
          { label: "Operational Hours", value: "4,380 continuous (sea state 0-5)" },
          { label: "Mission Duration", value: "6 months" },
          { label: "Installation Time", value: "72 hours per task force" },
          { label: "Neutralization Methods", value: "RF denial (71%), GPS spoofing (18%), Ship weapons handoff (11%)" },
          { label: "Detection Range", value: "28 km (radar), 12 km (EO/IR)" },
          { label: "Swarm Capacity", value: "50+ simultaneous targets per unit" },
          { label: "Sea State Operation", value: "Up to Sea State 5" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "How does Aegis Mobile handle the motion and vibration of shipboard operations?",
            answer:
              "Aegis Mobile units are designed from the ground up for maritime deployment. The phased-array radar uses electronic beam steering rather than mechanical gimbals, eliminating vibration-induced pointing errors. All optical systems feature gyro-stabilized mounts rated for Sea State 5 conditions. The ISO container housing is shock-rated to MIL-S-901D standards and features vibration isolation for all sensitive electronics. The system has been tested and validated in Sea State 5 conditions with no degradation in detection or tracking performance.",
          },
          {
            question: "Can Aegis Mobile operate while the ship is conducting other electronic warfare operations?",
            answer:
              "Yes. The Aegis Mobile system includes a comprehensive electromagnetic compatibility framework that coordinates with the ship's existing electronic warfare suite. RF denial transmissions are carefully scheduled and frequency-managed to avoid interfering with the ship's own EW operations, radar, and communications. During the deployment, Aegis Mobile operated continuously alongside shipboard SLQ-32 and Nulka systems with zero electromagnetic interference incidents.",
          },
          {
            question: "What is the installation process for Aegis Mobile on a naval vessel?",
            answer:
              "Aegis Mobile is housed in standard ISO containers that can be loaded by shipboard cranes or helicopter airlift. Installation requires deck space of approximately 20 feet by 8 feet, 440V 60Hz power supply, and a network connection to the ship's combat management system. Physical installation takes 8-12 hours, with system calibration and integration testing requiring an additional 12-24 hours. The four-unit task force installation was completed in 72 hours including cross-ship network setup and operational testing.",
          },
          {
            question: "How does GPS spoofing work as a neutralization method for autonomous drones?",
            answer:
              "For autonomous drones that navigate by GPS, Aegis Mobile can transmit spoofed GPS signals that cause the drone to believe it is in a different location, effectively redirecting it along a chosen trajectory away from the protected asset. The spoofed signals are precisely calibrated to overpower the true GPS signals only in the direction of the threat drone, without affecting the ship's own navigation systems. This technique was effective against 18% of the drones encountered during the deployment, all of which were autonomous designs without RF command links susceptible to denial.",
          },
        ]}
      />

      <CTASection
        title="Protect Your Maritime Forces"
        subtitle="Aegis Mobile is proven at sea against the most sophisticated drone threats. Request a maritime capability briefing for your fleet."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="View All Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
