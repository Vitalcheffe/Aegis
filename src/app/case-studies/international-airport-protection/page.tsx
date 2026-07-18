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

export default function InternationalAirportProtectionPage() {
  return (
    <>
      <SectionHero
        image="/images/case-studies/airport-protection.jpg"
        label="Case Study"
        title="Securing Major European Airport Against Drone Incursions"
        subtitle="How Aegis Shield eliminated runway disruptions and restored passenger confidence at one of Europe's busiest aviation hubs"
      />

      <StatsSection
        label="Mission Results"
        stats={[
          { value: "200+", label: "Prior Incursions/Year" },
          { value: "0", label: "Disruptions Post-Deploy" },
          { value: "40,000+", label: "Passengers Protected" },
          { value: "99.98%", label: "Uptime" },
        ]}
      />

      <TextSection label="Background" title="The Challenge">
        <p>
          One of Europe's ten busiest airports, handling over 75 million passengers annually, experienced a crisis of confidence as unauthorized drone flights repeatedly forced runway closures and ground stops. Over a twelve-month period preceding the Aegis deployment, the airport recorded 213 confirmed drone sightings within its controlled airspace, resulting in 34 runway closures totaling 47 hours of operational disruption. The economic impact was severe: each hour of runway closure cost the airport and its airline partners an estimated €2.4 million in delayed flights, diversions, and cascading schedule disruptions. Beyond the financial toll, the safety risk was escalating — on three separate occasions, drones were observed within 50 meters of aircraft on final approach, creating the potential for catastrophic engine ingestion or cockpit interference.
        </p>
        <p>
          The airport's existing counter-drone measures were limited to visual observation by air traffic control personnel and a single commercial RF detection system that covered only 30% of the airport's 15 km radius controlled airspace. The RF system suffered from persistent false alarms triggered by the airport's own communications, radar, and ground vehicle transponders, leading controllers to lose confidence in its alerts. Meanwhile, the drone threat evolved rapidly — operators shifted to frequency-hopping control links, pre-programmed autonomous flight paths, and drones modified with reduced radar cross-sections. The national aviation authority issued a formal safety recommendation requiring the airport to implement a comprehensive counter-UAS solution capable of detecting, classifying, and neutralizing drone threats without disrupting normal aviation operations.
        </p>
      </TextSection>

      <SplitSection
        image="/images/pages/airports-atc.jpg"
        label="Solution"
        title="Aegis Shield Airport Protection"
        description="Aegis deployed a tailored airport protection architecture built around Aegis Shield with deep integration into the airport's existing air traffic management systems. The core of the solution was a network of six Aegis Core multi-modal sensor fusion nodes distributed around the airport perimeter, each combining phased-array radar, electro-optical and infrared cameras, and RF direction-finding arrays. These nodes fed into a centralized Aegis Command instance that correlated all sensor data against the airport's real-time flight plan database, transponder returns, and known bird migration patterns to eliminate false positives. The neutralization layer employed precision RF denial with directional antenna arrays that could selectively jam a threat drone's command links without affecting aircraft communications or airport ground systems. The entire detect-to-neutralize cycle was designed to complete within the airport's mandated 30-second response window for airspace incursions."
        stats={[
          { value: "6", label: "Sensor Fusion Nodes" },
          { value: "15 km", label: "Detection Radius" },
          { value: "< 30s", label: "Response Time" },
        ]}
      />

      <TextSection label="Operations" title="Mission Execution">
        <p>
          The Aegis Shield system reached initial operational capability within six weeks of contract signature, with the full sensor network commissioned in under three months. During the first month of operation, the system detected and classified 28 drone incursions that the legacy RF system had entirely missed — including 12 autonomous drones operating without active command links that were tracked by radar and EO/IR sensors alone. Each incursion was resolved without runway closure: RF denial was employed against 24 command-guided drones, causing them to land or return to their operators, while four autonomous drones were tracked until they exited the controlled airspace and were intercepted by law enforcement on the ground. The airport recorded zero runway disruptions attributable to drone activity in the twelve months following full deployment.
        </p>
        <p>
          The operational impact extended beyond threat neutralization. The Aegis Command system's high-fidelity situational awareness display was integrated into the airport's operations center, providing controllers with a real-time overlay of all UAS activity in the controlled airspace. This transparency enabled informed decision-making — rather than closing runways on unconfirmed visual reports, controllers could verify threats on the Aegis display and authorize targeted response. The system also generated comprehensive forensic data on each incursion, including the drone's flight path, launch point estimate, and RF signatures, which law enforcement used to identify and prosecute 23 drone operators during the first year. Insurance premiums for the airport decreased by 12% following the deployment, reflecting the reduced operational risk. Passenger complaints about drone-related delays dropped to zero.
        </p>
      </TextSection>

      <QuoteSection
        quote="For two years, we were closing runways based on someone's visual sighting of a dot in the sky. Aegis gave us certainty — we know exactly what's out there, where it is, and we can deal with it before it ever reaches the approach corridor. Our passengers don't even know there was a threat."
        author="Director Katharina Vogt"
        role="Chief Operations Officer, Airport Authority"
      />

      <SpecTable
        label="Deployment Details"
        title="System Configuration"
        specs={[
          { label: "Products Deployed", value: "Aegis Shield, Core, Command, SkyWatch" },
          { label: "Coverage Area", value: "706 km² (15 km radius controlled airspace)" },
          { label: "Threats Neutralized", value: "28 in first month, 310+ over 12 months" },
          { label: "Operational Hours", value: "8,760 continuous (24/7)" },
          { label: "Mission Duration", value: "Ongoing since deployment" },
          { label: "Sensor Fusion Nodes", value: "6 perimeter nodes" },
          { label: "Neutralization Methods", value: "RF denial (86%), Tracking & law enforcement handoff (14%)" },
          { label: "ATC Integration", value: "Real-time flight plan correlation, transponder cross-reference" },
          { label: "False Positive Rate", value: "< 0.02%" },
          { label: "Runway Closures Post-Deploy", value: "0" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "How does Aegis Shield avoid interfering with aircraft communications and airport systems?",
            answer:
              "The Aegis Shield airport configuration uses precision directional RF denial that targets only the specific frequencies and spatial direction of the threat drone. The system maintains a real-time spectrum map of all active aviation communications, radar, and navigation aids, and automatically excludes these frequencies from any denial action. Additionally, the directional antenna arrays concentrate RF energy in a narrow beam toward the threat, with less than 0.01% energy spillage outside the intended direction. The system was formally tested and certified by the national communications authority to ensure zero interference with aviation systems.",
          },
          {
            question: "What happens when a drone is detected during peak traffic operations?",
            answer:
              "The Aegis Command system prioritizes threats based on proximity to active approach and departure corridors. When a drone is detected during peak operations, the system automatically assesses whether any aircraft are within the threat's potential flight path and escalates the response accordingly. For command-guided drones, RF denial is activated immediately without requiring ATC to alter traffic flow. For autonomous drones on collision courses, the system generates a priority alert to ATC with precise threat position and trajectory data, enabling controllers to issue targeted go-around instructions rather than closing entire runways. In practice, the system resolved all threats without requiring traffic modifications.",
          },
          {
            question: "Can the system handle multiple simultaneous drone incursions?",
            answer:
              "Yes. Aegis Shield is designed to detect and track hundreds of simultaneous targets and neutralize multiple concurrent threats. The six distributed sensor fusion nodes provide overlapping coverage with redundant tracking capability, and the Aegis Command system allocates neutralization resources dynamically based on threat priority. During the deployment, the system successfully handled an event involving five drones approaching from different directions simultaneously, neutralizing all five within 45 seconds of first detection.",
          },
          {
            question: "How was the forensic data used for law enforcement prosecution?",
            answer:
              "Each drone incursion generates a comprehensive forensic package including the drone's full flight track, altitude profile, speed data, RF command link signatures, estimated launch point, and operator location derived from RF triangulation. This data is timestamped and encrypted for evidentiary integrity. Law enforcement agencies received training on interpreting Aegis forensic reports, and the data was accepted as evidence in all 23 successful prosecutions. The estimated launch point data enabled police to conduct targeted operations that recovered drone equipment and identified operators.",
          },
        ]}
      />

      <CTASection
        title="Secure Your Airport's Airspace"
        subtitle="Aegis Shield is deployed at major airports worldwide. Contact us for a threat assessment and tailored protection architecture for your aviation facility."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="View All Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
