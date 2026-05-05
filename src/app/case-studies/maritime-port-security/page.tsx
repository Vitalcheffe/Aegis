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

export default function MaritimePortSecurityPage() {
  return (
    <>
      <SectionHero
        image="/images/case-studies/port-security.jpg"
        label="Case Study"
        title="Port Security for Strategic Maritime Assets"
        subtitle="How Aegis Shield provided layered protection across a major commercial port handling 12 million TEU annually without disrupting cargo operations"
      />

      <StatsSection
        label="Mission Results"
        stats={[
          { value: "12M", label: "TEU Handled Annually" },
          { value: "0", label: "Operational Disruptions" },
          { value: "214", label: "Threats Intercepted" },
          { value: "45 km²", label: "Protected Area" },
        ]}
      />

      <TextSection label="Background" title="The Challenge">
        <p>
          A strategically vital commercial port — handling 12 million twenty-foot equivalent units annually and serving as a critical node in global supply chains — faced a dual drone threat that jeopardized both security and operations. The first threat vector was espionage: intelligence assessments confirmed that hostile state actors were using drones equipped with high-resolution cameras and signals intelligence payloads to surveil the port's container handling operations, tracking specific cargo movements that revealed sanctions enforcement activities and military logistics shipments. The second threat vector was smuggling: criminal organizations were using drones to deliver contraband directly onto container ships and port facilities, bypassing the port's extensive physical security screening at gates and vehicle checkpoints. Over a twelve-month period, port security recorded 89 confirmed drone incursions, but estimated the true number was significantly higher given the difficulty of visually detecting small drones in a busy, illuminated port environment.
        </p>
        <p>
          The challenge was uniquely complex because the port operated 24 hours a day, 365 days a year, with continuous crane operations, vessel movements, truck traffic, and rail operations that could not be interrupted for security responses. The port's electromagnetic environment was extraordinarily congested, with radar from vessel traffic services, port authority communications, shipboard radar and radios, and the RF emissions from thousands of shipping containers equipped with tracking devices. Any counter-UAS solution had to operate reliably in this environment without interfering with port operations, vessel navigation, or the safety systems that kept the port functioning. Additionally, the port's waterfront geography — with vessels of all sizes continuously entering and leaving — meant that any RF-based countermeasure had to be carefully managed to avoid affecting maritime safety communications and navigation systems. The port authority required a solution that could provide comprehensive drone detection and neutralization while being completely transparent to the port's daily operations.
        </p>
      </TextSection>

      <SplitSection
        image="/images/pages/maritime-port.jpg"
        label="Solution"
        title="Aegis Shield Port Architecture"
        description="Aegis deployed a port-specific defense architecture centered on Aegis Shield with six distributed Aegis Core sensor fusion nodes positioned at key points around the port's 45 km² footprint, including the container terminals, bulk cargo areas, petroleum terminal, and the port authority headquarters. Each node combined a compact phased-array radar optimized for the port's cluttered environment, EO/IR cameras with thermal imaging for nighttime operation, and RF direction-finding arrays tuned to detect drone command signals in the presence of maritime RF noise. Two Aegis SkyWatch long-range radar installations on elevated port infrastructure provided extended-range early warning out to 20 km for drones approaching from seaward. The neutralization layer employed a combination of RF denial with precision directional antennas that avoided affecting vessel communications, and GPS spoofing for autonomous drones. The entire system was integrated with the port's vessel traffic management system and the coast guard's maritime security operations center via Aegis Command."
        stats={[
          { value: "6", label: "Sensor Fusion Nodes" },
          { value: "20 km", label: "Seaward Detection" },
          { value: "0", label: "Ops Disruptions" },
        ]}
      />

      <TextSection label="Operations" title="Mission Execution">
        <p>
          The Aegis Shield system reached full operational capability within four months, with a phased deployment that brought each sensor node online sequentially to maintain continuous coverage during installation. The system immediately revealed the true scale of the drone threat: during the first month of operation, Aegis detected 42 drone incursions that had previously gone unobserved — including 12 surveillance drones operating at night using thermal imaging payloads, and 8 smuggling drones carrying contraband that were intercepted before they reached their target vessels. The system's ability to detect and classify drones in the port's challenging electromagnetic environment validated the custom calibration performed during installation, with false positive rates below 0.03% despite the dense RF clutter from maritime radar, shipboard communications, and container tracking systems.
        </p>
        <p>
          Over the twelve-month reporting period, the Aegis Shield system intercepted 214 drone threats — 128 classified as surveillance platforms and 86 as smuggling drones. RF denial neutralized 72% of the threats, causing command-guided drones to land or return to their operators. GPS spoofing redirected 19% of autonomous drones away from the port to safe landing areas. The remaining 9% were tracked and handed off to coast guard and law enforcement for ground interdiction. Critically, the system operated throughout this period without causing a single disruption to port operations — no vessel movements were delayed, no crane operations were halted, and no safety systems were affected. The port authority's insurance underwriter reduced the port's security risk premium by 18% following the deployment. Law enforcement used Aegis-generated forensic data to arrest 34 drone operators and dismantle two smuggling networks that had been using drones to deliver narcotics directly onto container ships for distribution at destination ports.
        </p>
      </TextSection>

      <QuoteSection
        quote="We handle 33,000 containers a day — we can't afford to shut down for a drone alert. Aegis gave us something no other system could: the ability to deal with drones without ever stopping operations. Our crane operators didn't even know there was a threat until it was already neutralized."
        author="Harbor Master Friedrich Braun"
        role="Port Authority Operations Director"
      />

      <SpecTable
        label="Deployment Details"
        title="System Configuration"
        specs={[
          { label: "Products Deployed", value: "Aegis Shield, Core (6), SkyWatch (2), Command" },
          { label: "Coverage Area", value: "45 km² port complex + 20 km seaward" },
          { label: "Threats Neutralized", value: "214 over 12 months" },
          { label: "Operational Hours", value: "8,760 continuous (24/7/365)" },
          { label: "Mission Duration", value: "Ongoing since deployment" },
          { label: "Neutralization Methods", value: "RF denial (72%), GPS spoofing (19%), Law enforcement (9%)" },
          { label: "VTS Integration", value: "Real-time vessel traffic correlation" },
          { label: "False Positive Rate", value: "< 0.03%" },
          { label: "Operations Disrupted", value: "0" },
          { label: "Smuggling Networks Dismantled", value: "2" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "How does the system avoid interfering with vessel navigation and maritime safety communications?",
            answer:
              "Aegis Shield's RF denial system uses precision directional antennas that concentrate energy only toward the threat drone, with less than 0.01% spillage in other directions. The system maintains a real-time exclusion list of all maritime safety frequencies — including VHF Channel 16, AIS frequencies, and radar bands — that are never targeted by denial transmissions. Additionally, the system correlates all radar tracks with the port's vessel traffic management system, ensuring that no RF denial action is directed toward any vessel. During the deployment, zero interference incidents with maritime safety systems were recorded, and the system received formal certification from the national maritime safety authority.",
          },
          {
            question: "How does the system detect drones among the port's cranes, containers, and vessel structures?",
            answer:
              "The port environment creates significant radar clutter, but Aegis Core's phased-array radar employs advanced clutter-rejection algorithms specifically optimized for the port geometry. The system uses a 3D terrain model of the port to predict and filter static clutter from cranes, containers, and buildings. For dynamic clutter from moving cranes and vessels, the system correlates radar returns with the vessel traffic management system and crane positioning data to distinguish drone returns from known moving objects. Additionally, the multi-modal sensor fusion cross-references radar detections with EO/IR and RF data to confirm drone classifications, achieving a false positive rate below 0.03%.",
          },
          {
            question: "How does the system handle drones launched from vessels at sea?",
            answer:
              "The two Aegis SkyWatch radar installations provide seaward detection coverage out to 20 km, enabling early detection of drones launched from vessels approaching or transiting near the port. Drones from vessels are classified using the same multi-modal sensor fusion process, with the additional consideration that vessel-launched drones may not exhibit the typical launch-from-shore flight profile. The system's RF direction-finding can trace the drone's command link back to the vessel, enabling the coast guard to board and investigate. During the deployment, 14 drones were traced to vessels at anchor near the port, resulting in coast guard boardings and the seizure of surveillance equipment.",
          },
          {
            question: "What is the impact on the port's own drone operations for inspection and surveying?",
            answer:
              "Many modern ports use their own drones for container inspection, infrastructure surveys, and security patrols. Aegis Command supports a whitelist of authorized drones based on their RF signatures, flight plans, and transponder codes. Authorized drones are tracked but not engaged, appearing as friendly tracks on the operator display. The port authority can schedule authorized drone operations in advance through the Aegis Command interface, and the system will automatically exclude these flights from neutralization actions. During the deployment, the port's own drone operations continued without interruption alongside the counter-UAS protection.",
          },
        ]}
      />

      <CTASection
        title="Secure Your Strategic Port"
        subtitle="Aegis Shield protects the world's busiest ports without disrupting operations. Contact us for a port-specific threat assessment and protection architecture."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="View All Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
