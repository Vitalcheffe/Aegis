"use client";

import {
  SectionHero,
  SplitSection,
  SpecTable,
  CTASection,
  QuoteSection,
  ScrollReveal,
  AnimatedLine,
} from "@/components/sections";

const airportSpecs = [
  { label: "Detection Range", value: "15 km radius (full airport coverage)" },
  { label: "Tracking Capacity", value: "250+ simultaneous targets" },
  { label: "Classification Time", value: "< 1.2 seconds" },
  { label: "Neutralization Range", value: "6 km (selective RF)" },
  { label: "ATC Integration", value: "ICAO / Eurocontrol / FAA STARS" },
  { label: "False Alarm Rate", value: "< 0.01 per operating hour" },
  { label: "Aviation Safety", value: "No interference with ATC comms/nav" },
  { label: "Runway Coverage", value: "100% approach and departure paths" },
  { label: "Operating Modes", value: "Passive monitor / Active interdict" },
  { label: "Response Time", value: "< 5 seconds (alert to neutralize)" },
  { label: "Regulatory Compliance", value: "EASA / FAA / ICAO compliant" },
  { label: "Reporting", value: "Automated incident logs and chain-of-custody" },
];

export default function AirportsPage() {
  return (
    <main>
      <SectionHero
        image="/images/pages/airports-hero.jpg"
        label="Aviation Solutions"
        title="Airports"
        subtitle="Zero Disruption. Full Coverage."
        cta="Request Aviation Briefing"
        ctaHref="/request-demo"
      />

      <SplitSection
        image="/images/pages/airports-atc.jpg"
        label="ATC Integration"
        title="Seamless Air Traffic Control Integration"
        description="Drone incursions at airports have caused billions in disruption — flight cancellations, diversions, and passengers stranded for hours while authorities hunt for the offending UAS. Aegis airport solutions are designed from the ground up to integrate with existing ATC infrastructure, providing controllers with drone threat overlays on their primary displays without requiring separate monitoring stations. Our system identifies and classifies drone threats in under 1.2 seconds and presents actionable recommendations to ATC staff, including which runways are clear and which approach paths are compromised. Unlike military systems, Aegis aviation products are EASA and FAA certified for use in controlled airspace, with frequency management that guarantees zero interference with ATC communications, navigation aids, and instrument landing systems."
        reverse={false}
        stats={[
          { value: "0", label: "ATC Interference Events" },
          { value: "< 1.2s", label: "Classification Time" },
        ]}
      />

      <SplitSection
        image="/images/pages/airport-terminal.jpg"
        label="Passenger Safety"
        title="Protecting Passengers Without Disruption"
        description="The ultimate measure of an airport counter-drone system is not just threat neutralization — it's operational continuity. Every minute of runway closure costs airlines and airports hundreds of thousands of dollars; every diversion disrupts thousands of passengers. Aegis systems are designed to neutralize threats while keeping the airport operational. Our selective RF interdiction targets only the specific frequencies used by the offending drone, leaving all other RF traffic — including airport communications, WiFi, and cellular services — completely unaffected. When a threat is detected, the system provides ATC with real-time geofence recommendations that isolate the drone's operating area while keeping adjacent runways and taxiways clear. This surgical approach has enabled Aegis-equipped airports to maintain operations during drone incidents that would have shut down unprotected facilities for hours."
        reverse={true}
        stats={[
          { value: "98%", label: "Ops Continuity Rate" },
          { value: "< 0.01", label: "False Alarms/Hour" },
        ]}
      />

      <QuoteSection
        quote="In the 18 months since we deployed Aegis, we have neutralized 23 unauthorized drone incursions with zero flight cancellations. Before Aegis, each incident cost us an average of four hours and €2.3 million."
        author="Dr. Heinrich Müller"
        role="Director of Operations, Frankfurt Airport"
      />

      <SpecTable
        label="Technical Specifications"
        title="Airport Counter-UAS System Specifications"
        specs={airportSpecs}
      />

      <CTASection
        title="Secure Your Airspace"
        subtitle="Deploy certified Counter-UAS capabilities at your airport. Our aviation team will design a system integrated with your ATC infrastructure and compliant with all regulatory requirements."
        primaryCta="Request Aviation Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Solutions"
        secondaryHref="/solutions"
      />
    </main>
  );
}
