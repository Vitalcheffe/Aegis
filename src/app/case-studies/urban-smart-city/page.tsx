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

export default function UrbanSmartCityPage() {
  return (
    <>
      <SectionHero
        image="/images/case-studies/smart-city.jpg"
        label="Case Study"
        title="Smart City Integration for Urban Airspace Management"
        subtitle="How Aegis Command integrated with a metropolitan smart infrastructure platform to provide real-time urban airspace management for 4 million residents"
      />

      <StatsSection
        label="Mission Results"
        stats={[
          { value: "4M", label: "Residents Protected" },
          { value: "1,800+", label: "Violations Detected" },
          { value: "98.7%", label: "Interdiction Rate" },
          { value: "12", label: "Venues Secured" },
        ]}
      />

      <TextSection label="Background" title="The Challenge">
        <p>
          A major metropolitan area with 4 million residents faced an explosion of unauthorized drone flights that threatened public safety, critical venues, and the privacy of citizens. The city's smart infrastructure initiative had invested heavily in IoT sensors, integrated traffic management, and public safety systems — but had no capability to monitor or manage the increasingly congested low-altitude airspace above the city. In a single year, the city recorded over 1,200 drone-related complaints from residents, including drones hovering over private residences, filming through windows, and creating noise disturbances. More critically, drones were repeatedly spotted near the city's twelve major event venues, including stadiums, convention centers, and government buildings — venues that regularly hosted events with attendance exceeding 50,000 people.
        </p>
        <p>
          Two incidents crystallized the urgency of the problem. First, a drone carrying a camera crashed into the crowd at an outdoor music festival, injuring three attendees and causing a brief panic that could have escalated into a stampede. Second, a drone was observed hovering over the city's main government complex during a mayoral press conference, later determined to be operated by a foreign national conducting surveillance of the building's security layout. The city's police department had no dedicated counter-drone capability and relied on visual observation and citizen reports — an approach that was reactive, unreliable, and unable to provide the real-time situational awareness needed for effective urban airspace management. The city government issued an RFP for a comprehensive counter-UAS solution that could integrate with its existing smart city infrastructure, provide city-wide drone detection and monitoring, and enable rapid response to threats near critical venues and during major events.
        </p>
      </TextSection>

      <SplitSection
        image="/images/pages/urban-cityscape.jpg"
        label="Solution"
        title="Aegis Command Smart City Integration"
        description="Aegis deployed a city-wide counter-UAS architecture built on Aegis Command as the integration and battle management layer, connected to a distributed sensor network of 16 Aegis Core multi-modal sensor fusion nodes positioned on municipal buildings, cellular towers, and traffic management infrastructure across the metropolitan area. Each Aegis Core node provided 6 km detection coverage, with overlapping coverage ensuring continuous monitoring across the entire urban footprint. The critical differentiator was Aegis Command's deep integration with the city's existing smart infrastructure: the system correlated drone detections with the city's IoT sensor network for enhanced tracking in urban canyons, fed real-time drone position data to the traffic management system for drone-vehicle deconfliction, and integrated with the public safety dispatch system to automate law enforcement response to drone incidents. Aegis Command also provided a public-facing transparency dashboard that displayed authorized drone flight corridors and no-fly zones, enabling legitimate commercial drone operators to plan compliant flights."
        stats={[
          { value: "16", label: "Sensor Nodes" },
          { value: "6 km", label: "Detection Radius" },
          { value: "100%", label: "City Coverage" },
        ]}
      />

      <TextSection label="Operations" title="Mission Execution">
        <p>
          The Aegis Command system was deployed in a phased approach over six months, with initial operational capability covering the government district and three major event venues within the first eight weeks. Full city-wide coverage was achieved by month six. The system immediately transformed the city's understanding of its drone problem: during the first month of city-wide operation, Aegis detected an average of 47 drone flights per day across the metropolitan area — seven times the number reported by citizens. The data revealed clear patterns: peaks during evening hours when hobbyist operators were most active, concentrations near event venues during game days and concerts, and a small but consistent number of flights near government buildings and critical infrastructure that exhibited surveillance rather than recreational behavior.
        </p>
        <p>
          The system's interdiction capability was selectively applied based on threat classification and location. For drones near the 12 protected venues and government buildings, automatic RF denial was authorized, achieving a 98.7% interdiction rate against unauthorized flights in these zones. For drones in residential areas, the system provided precise operator geolocation to law enforcement, enabling a graduated response from warning to citation to arrest based on the severity of the violation. Over the twelve-month reporting period, the system detected 1,800+ drone violations, issued 947 automated warnings to identified operators, supported 312 citations, and facilitated 28 arrests for serious violations including surveillance and reckless endangerment. The system's transparency dashboard reduced accidental violations by 62%, as commercial operators could now easily identify no-fly zones and plan compliant routes. The city's insurance liability exposure from drone incidents decreased by 45%, and public confidence in urban airspace safety — measured through city surveys — increased from 23% to 78% within the first year of operation.
        </p>
      </TextSection>

      <QuoteSection
        quote="Before Aegis, we had no idea how many drones were flying over our city — and what we didn't know could hurt us. Now we have complete airspace awareness, we can protect our venues and residents, and we've given legitimate operators a clear framework to fly safely. This is what smart city airspace management looks like."
        author="Mayor Patricia Chen"
        role="Metropolitan Government"
      />

      <SpecTable
        label="Deployment Details"
        title="System Configuration"
        specs={[
          { label: "Products Deployed", value: "Aegis Command, Core (16), Sentinel (12 venues)" },
          { label: "Coverage Area", value: "650 km² metropolitan area" },
          { label: "Threats Detected", value: "1,800+ over 12 months" },
          { label: "Operational Hours", value: "8,760 continuous (24/7/365)" },
          { label: "Mission Duration", value: "Ongoing since deployment" },
          { label: "Interdiction Rate", value: "98.7% (protected venue zones)" },
          { label: "Neutralization Methods", value: "RF denial (venue zones), Law enforcement response (residential)" },
          { label: "Smart City Integration", value: "IoT sensors, traffic management, public safety dispatch" },
          { label: "Violations Reduced", value: "62% (through transparency dashboard)" },
          { label: "Public Confidence", value: "23% → 78%" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "How does Aegis Command integrate with existing smart city infrastructure?",
            answer:
              "Aegis Command uses a standards-based API architecture that connects to the city's IoT platform, traffic management system, public safety computer-aided dispatch, and GIS databases through secure REST APIs and MQTT messaging. The integration is bidirectional: Aegis consumes data from the city's systems to enhance its operational context (e.g., event schedules, traffic patterns, building footprints) and provides drone tracking and alert data back to the city's systems. The deployment required no modifications to the city's existing smart infrastructure — all integration was achieved through the Aegis Command middleware layer and existing data interfaces.",
          },
          {
            question: "How does the system handle the legitimate commercial drone operations that cities want to encourage?",
            answer:
              "Aegis Command includes a drone flight management module that supports authorized commercial operations. Operators can file flight plans through the public-facing transparency dashboard, which defines approved corridors, altitudes, and time windows. Authorized flights are registered in the system as friendly tracks that are monitored but not engaged. The system can also support beyond-visual-line-of-sight operations by providing real-time deconfliction between commercial drones and any unauthorized threats. During the deployment, 23 commercial drone operators registered with the system and conducted over 4,000 compliant flights without any engagement actions.",
          },
          {
            question: "How does the system address privacy concerns regarding city-wide drone surveillance?",
            answer:
              "Aegis Command is designed with privacy-by-design principles. The system detects and tracks drones — not people. Its sensors are pointed skyward and have no capability to monitor ground-level activity. The public transparency dashboard provides full visibility into what the system monitors and how data is used, and all detection data is subject to the city's data retention and privacy policies. The system was reviewed and approved by the city's privacy oversight board prior to deployment, and an independent privacy audit conducted six months after deployment found zero privacy violations.",
          },
          {
            question: "How does the system perform in dense urban environments with tall buildings?",
            answer:
              "Urban canyons present a detection challenge that Aegis addresses through a combination of dense sensor placement and IoT integration. The 16 Aegis Core nodes are positioned to ensure overlapping coverage with minimal radar shadow from buildings. For areas where buildings create significant obstructions, the system leverages the city's existing IoT sensor network — including air quality monitors with acoustic sensors and traffic cameras — to supplement detection in radar-shadowed zones. This hybrid approach ensures near-complete coverage across the metropolitan area, including downtown corridors between high-rise buildings. During the deployment, the system maintained detection coverage above 97% of the urban airspace, with the remaining 3% consisting of deep urban canyons where no drone operations were practical anyway.",
          },
          {
            question: "What is the cost model for a city-wide deployment of this scale?",
            answer:
              "Aegis Command smart city deployments are offered through a combination of capital investment for sensor infrastructure and a subscription model for the Command platform, threat intelligence updates, and maintenance. The subscription model allows cities to spread costs over multi-year terms and ensures continuous access to the latest threat signatures and software capabilities. Total cost of ownership for the metropolitan deployment — including hardware, installation, integration, and three years of platform subscription — was significantly less than the city's annual liability exposure from drone incidents prior to deployment. Aegis also offers shared-cost models where multiple city agencies and critical venue operators contribute to a common infrastructure, reducing per-agency costs.",
          },
        ]}
      />

      <CTASection
        title="Manage Your Urban Airspace"
        subtitle="The future of urban airspace requires intelligent management, not just interdiction. Aegis Command integrates with your smart city to provide comprehensive, transparent airspace control."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="View All Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
