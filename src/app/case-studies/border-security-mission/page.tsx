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

export default function BorderSecurityMissionPage() {
  return (
    <>
      <SectionHero
        image="/images/case-studies/border-mission.jpg"
        label="Case Study"
        title="Border Surveillance and Drone Interdiction"
        subtitle="How Aegis Command integrated with CBP systems to achieve 99.8% interdiction across 450 km of the southern border"
      />

      <StatsSection
        label="Mission Results"
        stats={[
          { value: "450 km", label: "Border Coverage" },
          { value: "99.8%", label: "Interdiction Rate" },
          { value: "1,500+", label: "Crossings Prevented" },
          { value: "$28M", label: "Contraband Seized" },
        ]}
      />

      <TextSection label="Background" title="The Challenge">
        <p>
          The southern border of the United States faced an unprecedented surge in drone-enabled criminal activity as transnational cartels adopted military-grade unmanned aerial systems to support smuggling operations. Over a six-month period, U.S. Customs and Border Protection documented over 1,500 drone crossings carrying contraband — including narcotics, cellular phones, and weapons — into the United States. These drones were typically small multi-rotor platforms modified to carry payloads of 2-5 kg, operated by cartel-employed pilots located just across the border in Mexico. The flights were brief — often under 10 minutes — and conducted at low altitude to avoid detection by existing radar systems designed for aircraft and vehicle tracking. The drones exploited the vast, remote stretches of the border where physical surveillance is limited and response times are measured in hours.
        </p>
        <p>
          Beyond contraband delivery, the cartels employed larger, fixed-wing drones for surveillance of Border Patrol positions, sensor placements, and infrastructure. These reconnaissance flights mapped patrol routes, identified gaps in coverage, and provided real-time intelligence to smuggling teams on the ground. The intelligence advantage enabled by drone surveillance was estimated to have increased successful smuggling attempts by 35%, as cartels could route their ground operations around detected Border Patrol positions. CBP's existing counter-drone capabilities were limited to a handful of handheld RF detectors and one fixed-site system covering a single port of entry. The agency identified an urgent requirement for a wide-area counter-UAS capability that could detect, track, and neutralize drones along hundreds of kilometers of remote border terrain while integrating seamlessly with existing CBP command and control infrastructure.
        </p>
      </TextSection>

      <SplitSection
        image="/images/pages/border-patrol.jpg"
        label="Solution"
        title="Aegis Command Border Integration"
        description="Aegis Defense Systems deployed a distributed Aegis Command architecture spanning 450 km of the southern border, centered on eight Aegis SkyWatch long-range surveillance radar installations positioned at high-elevation sites to maximize line-of-sight coverage over the border corridor. Each SkyWatch installation provided detection coverage out to 25 km, with overlapping coverage ensuring no gaps along the defended sector. Aegis Core sensor fusion nodes at 12 tactical positions provided classification and tracking refinement, while Aegis Sentinel rapid-response units at six forward operating bases enabled immediate law enforcement dispatch to drone landing zones. The entire system was integrated into CBP's existing Integrated Surveillance Tower program and the Air and Marine Operations Center, providing a unified operational picture that fused Aegis drone tracking data with CBP's ground sensor networks, camera systems, and agent position reporting."
        stats={[
          { value: "8", label: "SkyWatch Sites" },
          { value: "25 km", label: "Detection Range" },
          { value: "12", label: "Tactical Nodes" },
        ]}
      />

      <TextSection label="Operations" title="Mission Execution">
        <p>
          The Aegis Command system achieved initial operational capability across the 450 km sector within four months, with full operational capability at all 20 sites completed in six months. The system immediately revealed the true scale of the drone threat — during the first week of operation, Aegis detected 67 drone crossings, more than three times the number CBP had documented in its previous best week. The majority were small multi-rotor contraband delivery drones flying at altitudes between 30 and 100 meters, making brief 5-8 minute flights from launch points 1-3 km inside Mexico to pre-arranged landing zones on the U.S. side. The Aegis Command system's ability to detect these low-altitude, short-duration flights and immediately alert Border Patrol agents with precise landing zone coordinates transformed the interdiction dynamic.
        </p>
        <p>
          Over the twelve-month deployment period, the Aegis Command system detected 3,247 drone incursions and achieved a 99.8% interdiction rate — defined as either preventing the drone from reaching its destination or intercepting the contraband at the landing zone. RF denial was employed against 68% of detected drones, causing them to land short of their intended drop points where Border Patrol agents could recover the contraband. For the remaining 32%, primarily drones operating on pre-programmed autonomous routes without active command links, the system provided precise landing zone predictions that enabled law enforcement to position agents for ground interdiction. The operation resulted in the seizure of contraband valued at $28 million, including 340 kg of fentanyl, 1.2 tons of methamphetamine, and 2,800 cellular devices. Additionally, the system's surveillance detection capability identified 147 cartel reconnaissance drone flights, enabling CBP to adjust patrol patterns and deny the cartels their intelligence advantage.
        </p>
      </TextSection>

      <QuoteSection
        quote="Before Aegis, we were chasing shadows. We'd find a crashed drone or a drop package and know we missed it. Now we see every flight, we know where it's going, and our agents are waiting when it lands. We've taken away the cartels' air superiority."
        author="Chief Patrol Agent Maria Delgado"
        role="U.S. Customs and Border Protection, Tucson Sector"
      />

      <SpecTable
        label="Deployment Details"
        title="System Configuration"
        specs={[
          { label: "Products Deployed", value: "Aegis Command, SkyWatch (8), Core (12), Sentinel (6)" },
          { label: "Coverage Area", value: "450 km border sector (11,250 km²)" },
          { label: "Threats Neutralized", value: "3,247 over 12 months" },
          { label: "Operational Hours", value: "8,760 continuous" },
          { label: "Mission Duration", value: "12 months (ongoing)" },
          { label: "Detection Range", value: "25 km (SkyWatch), 8 km (Core)" },
          { label: "Neutralization Methods", value: "RF denial (68%), Ground interdiction (32%)" },
          { label: "CBP Integration", value: "IST, AMOC, ground sensor network, agent GPS" },
          { label: "Contraband Seized", value: "$28M (including 340 kg fentanyl)" },
          { label: "Operator Apprehensions", value: "43" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "How does the system handle drones that cross from Mexican airspace — does it violate sovereignty?",
            answer:
              "Aegis systems deployed on U.S. territory detect and track drones only within U.S. airspace. The detection radar's coverage extends to the border but is configured to respect the international boundary. RF denial is activated only against drones that have crossed into U.S. airspace. For drones detected approaching from Mexico, the system provides early warning to CBP agents but does not engage until the drone enters U.S. sovereign airspace. This approach was developed in close coordination with the Department of State and the Mexican government to ensure full compliance with international law and bilateral agreements.",
          },
          {
            question: "How does Aegis Command integrate with CBP's existing surveillance infrastructure?",
            answer:
              "Aegis Command was designed from the outset to integrate with CBP's existing systems through a standards-based API layer. The system feeds drone track data into the Air and Marine Operations Center's common operational picture and correlates Aegis tracks with CBP's Integrated Surveillance Tower camera feeds, ground sensor alerts, and agent position data. This bidirectional integration means that Aegis detections can cue camera systems for visual confirmation, and ground sensor alerts can prompt Aegis to focus tracking resources on specific areas. The integration required no modifications to CBP's existing systems — all interoperability was achieved through the Aegis Command middleware layer.",
          },
          {
            question: "How does the system perform in the extreme heat and dust of the desert border environment?",
            answer:
              "All Aegis hardware is rated for operation from -40°C to +55°C, and the desert deployment specifically validated performance at sustained temperatures above 50°C. The radar and EO/IR systems include sealed enclosures rated to IP67 with positive-pressure filtration to prevent dust infiltration. The phased-array radar's electronic beam steering is unaffected by dust, unlike conventional mechanically scanned antennas. During the deployment, the system maintained 99.94% operational availability despite summer temperatures exceeding 48°C and multiple severe dust storm events.",
          },
          {
            question: "What happens to contraband when a drone is neutralized by RF denial?",
            answer:
              "When RF denial forces a command-guided drone to lose its control link, the drone enters a pre-programmed failsafe mode — typically landing in place or returning to its launch point. In either case, the Aegis Command system continues tracking the drone until it lands, providing Border Patrol agents with precise coordinates for recovery. The system predicts the landing zone within 15 meters accuracy, enabling rapid interdiction. In practice, 94% of drones neutralized by RF denial landed on the U.S. side of the border, where agents recovered both the drone and its contraband payload.",
          },
        ]}
      />

      <CTASection
        title="Secure Your Border Against Drone Threats"
        subtitle="Cartels and hostile actors are exploiting drone technology. Aegis Command provides the wide-area detection and interdiction capability to regain control of your airspace."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="View All Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
