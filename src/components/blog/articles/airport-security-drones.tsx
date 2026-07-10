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

export default function AirportSecurityDrones() {
  return (
    <>
      <SectionHero
        image="/images/blog/airport-security.jpg"
        label="Blog / Industry"
        title="Airport Security in the Age of Drones"
        subtitle="Drone incursions at airports have caused hundreds of flight cancellations — integrated counter-UAS solutions are now essential infrastructure"
      />

      <TextSection label="Overview" title="The Aviation Security Crisis">
        <p>
          The intersection of drone technology and aviation security has produced one of the most pressing operational challenges of the modern era. Between 2022 and 2025, reported drone sightings near airports increased by 340%, with multiple high-profile incidents resulting in complete airspace closures lasting hours or days. The December 2018 Gatwick Airport incident, which affected approximately 1,000 flights and 140,000 passengers over 36 hours, was a watershed moment that demonstrated the catastrophic economic and operational impact of drone incursions on aviation infrastructure. Since then, the threat has only intensified as drone capabilities have expanded.
        </p>
        <p>
          The challenge is fundamentally different from traditional aviation security threats. Drones are small enough to be invisible to primary radar systems designed to track commercial aircraft. They operate at altitudes and speeds that overlap with aircraft on approach and departure — the most critical phases of flight. They can appear without warning, loiter in airspace for extended periods, and depart before security forces can respond. And unlike birds, which aircraft are designed to survive encounters with, drone collisions pose catastrophic risks due to their lithium battery packs, dense metallic components, and spinning rotors that can destroy engine fan blades.
        </p>
        <p>
          Airport operators face a unique set of constraints that make counter-UAS deployment particularly challenging. Airports are densely populated electromagnetic environments, with radar, communication, and navigation systems that must not be disrupted by counter-UAS electronic warfare. The legal frameworks governing airspace around airports are complex and multi-jurisdictional, involving civil aviation authorities, air traffic control, law enforcement, and national security agencies. Any counter-UAS solution deployed at an airport must operate within these constraints while providing reliable, rapid threat detection and interdiction.
        </p>
      </TextSection>

      <SplitSection
        image="/images/blog/airport-security.jpg"
        label="Operational Impact"
        title="Economic and Safety Consequences of Drone Incursions"
        description="The economic impact of airport drone incursions extends far beyond the direct costs of flight cancellations. A single hour of airport closure at a major international hub costs between $500,000 and $1.5 million in lost revenue, diverted flights, passenger compensation, and cascading schedule disruptions. The Gatwick incident cost an estimated £50 million, while the 2019 Newark Liberty Airport drone incident caused disruptions that rippled through the entire U.S. air traffic system for days. Beyond economics, the safety implications are severe — a drone ingestion into a jet engine on approach could produce catastrophic results, and near-miss incidents between drones and commercial aircraft are reported with increasing frequency each year."
        stats={[
          { value: "340%", label: "Increase in Airport Incidents" },
          { value: "$1.5M", label: "Cost Per Hour of Closure" },
          { value: "1,000+", label: "Flights Affected (Gatwick)" },
          { value: "140K", label: "Passengers Disrupted" },
        ]}
      />

      <TextSection title="Integrated Counter-UAS Architecture for Airports">
        <p>
          Effective airport counter-UAS protection requires a multi-layered architecture that integrates seamlessly with existing aviation infrastructure. The foundation is a distributed sensor network providing 360-degree coverage of the airport's controlled airspace and approach corridors. This network typically combines radar systems optimized for small, low, slow targets; RF detection arrays that identify drone communications and locate operators; and electro-optical and infrared cameras for visual confirmation and forensic documentation. Each sensor type compensates for the limitations of others, ensuring continuous detection coverage across all weather conditions and threat profiles.
        </p>
        <p>
          The sensor network feeds into a centralized command and control system that correlates and fuses sensor data to produce a unified operational picture. This system must integrate with air traffic control displays, providing controllers with real-time drone position information alongside commercial aircraft tracks. The interface between counter-UAS and ATC systems is critical — controllers must be able to assess the drone threat's impact on active flight operations and make informed decisions about airspace management. Automated alert protocols can trigger predefined response procedures when drone threats are detected in critical airspace segments.
        </p>
        <p>
          The defeat mechanism layer for airports must be carefully designed to avoid interference with aviation systems. Active RF jamming, which is the default countermeasure for many military counter-UAS applications, poses unacceptable risks at airports where electromagnetic interference could affect aircraft communication, navigation, and surveillance systems. Airport-specific counter-UAS solutions therefore emphasize precision EW that targets only identified drone communication channels, GPS spoofing that redirects drones away from approach corridors, and kinetic interdiction methods including net capture systems that have been successfully deployed at several European airports.
        </p>
      </TextSection>

      <QuoteSection
        quote="When a drone appears on the approach path at 2,000 feet, you have seconds to decide whether to divert an aircraft carrying 300 passengers. That decision requires complete confidence in your detection system and clear authority to act."
        author="Captain Richard Holloway"
        role="Chief Pilot, Major European Airline"
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "Why can't airports just use their existing radar to detect drones?",
            answer:
              "Airport surveillance radar systems are designed to track large, fast-moving aircraft at altitude. Small drones have radar cross-sections comparable to birds and operate at low altitudes in ground clutter, making them virtually invisible to conventional airport radar. Specialized radar with higher resolution, lower minimum detection altitude, and advanced clutter rejection algorithms is required for reliable drone detection in the airport environment.",
          },
          {
            question: "How do counter-UAS systems avoid interfering with aircraft systems?",
            answer:
              "Airport counter-UAS systems employ precision electronic warfare that targets only identified drone communication channels at power levels insufficient to affect aircraft systems. RF detection is entirely passive and produces no interference. Active countermeasures use directional antennas focused on the drone's position, minimizing energy in directions occupied by aircraft. Systems undergo extensive electromagnetic compatibility testing before airport deployment.",
          },
          {
            question: "What happens when a drone is detected near an airport?",
            answer:
              "Response protocols vary by jurisdiction but typically involve immediate notification of air traffic control, assessment of the drone's position relative to active flight paths, implementation of airspace management measures (ground stops, approach diversions), dispatch of security or law enforcement to locate the operator, and activation of interdiction measures if authorized. The goal is to minimize disruption while ensuring safety of flight operations.",
          },
          {
            question: "Are airports legally permitted to disable drones?",
            answer:
              "Legal authority varies significantly. In most jurisdictions, airports cannot directly employ active countermeasures like jamming or kinetic interdiction — these require military or law enforcement authorization. Some countries have established protocols where airport detection systems cue authorized responders who execute interdiction. The regulatory trend is toward expanding airport authorities' counter-UAS capabilities, but current frameworks in most nations remain restrictive.",
          },
        ]}
      />

      <CTASection
        title="Protect Your Airspace"
        subtitle="Aegis airport counter-UAS solutions are designed for the unique constraints of aviation environments. Request a consultation to assess your airport's protection requirements."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Capabilities"
        secondaryHref="/capabilities"
      />
    </>
  );
}
