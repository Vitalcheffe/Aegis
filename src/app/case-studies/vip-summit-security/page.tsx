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

export default function VIPSummitSecurityPage() {
  return (
    <>
      <SectionHero
        image="/images/case-studies/vip-summit.jpg"
        label="Case Study"
        title="G7 Summit: Full-Spectrum Counter-Drone Protection"
        subtitle="How Aegis deployed a multi-layered counter-UAS umbrella across 25 km² with zero security incidents during the 72-hour event"
      />

      <StatsSection
        label="Mission Results"
        stats={[
          { value: "25 km²", label: "Protected Area" },
          { value: "7", label: "Heads of State" },
          { value: "0", label: "Security Incidents" },
          { value: "72 hrs", label: "Continuous Protection" },
        ]}
      />

      <TextSection label="Background" title="The Challenge">
        <p>
          The G7 Summit presented one of the most complex counter-drone security challenges in recent history. Seven heads of state, their delegations totaling over 3,000 personnel, and thousands of media representatives converged on a venue complex that included multiple buildings, outdoor ceremonial spaces, and motorcade routes through urban streets. The event's high profile made it an attractive target for both state-sponsored drone attacks and publicity-seeking drone stunts by activist groups. Intelligence assessments identified credible threats from weaponized drones capable of delivering chemical or explosive payloads, surveillance drones operated by hostile intelligence services seeking to intercept communications or photograph secure areas, and protest drones carrying banners or deploying paint that could disrupt ceremonies and embarrass host nation security forces.
        </p>
        <p>
          The security requirements were unprecedented: absolute airspace security across a 25 km² area for 72 continuous hours, with zero tolerance for any drone penetration of the venue's inner security zone. The system had to operate in a dense urban environment with significant RF clutter from thousands of mobile devices, media broadcast equipment, and the summit's own communications infrastructure. It had to distinguish between the many legitimate small aircraft — police helicopters, medical evacuation flights, and VIP transport — that were authorized to operate in the area and any unauthorized drone activity. The host nation's security service required a system that could be deployed rapidly, operate without disrupting the summit's communications or broadcasting, and hand off interdiction of drone operators to law enforcement in real time. The timeline from contract to operational capability was just eight weeks.
        </p>
      </TextSection>

      <SplitSection
        image="/images/pages/vip-event.jpg"
        label="Solution"
        title="Aegis Shield VIP Protection Architecture"
        description="Aegis deployed a comprehensive VIP protection architecture built around Aegis Shield with multi-layered defense tailored to the summit's unique requirements. The outer detection ring comprised four Aegis SkyWatch long-range radar installations positioned on elevated buildings surrounding the venue, providing 360° detection coverage out to 20 km. The middle classification layer deployed eight Aegis Core sensor fusion nodes around the venue perimeter, integrating radar, EO/IR, and RF detection with real-time correlation against the summit's authorized flight plan database. The inner neutralization ring employed precision RF denial arrays and GPS spoofing capabilities positioned on the venue buildings themselves, providing immediate response to any drone that penetrated the outer detection zones. The entire system was managed by a dedicated Aegis Command instance operating in a hardened mobile command center co-located with the host nation's security operations center."
        stats={[
          { value: "20 km", label: "Early Warning Range" },
          { value: "8", label: "Sensor Fusion Nodes" },
          { value: "3", label: "Defense Layers" },
        ]}
      />

      <TextSection label="Operations" title="Mission Execution">
        <p>
          The Aegis Shield system was fully operational 72 hours before the summit's opening ceremony, providing a pre-event security baseline that recorded and cataloged all normal air traffic patterns in the venue area. During the 72-hour summit period, the system detected 23 drone incursion attempts across the 25 km² protected zone. The first incident occurred six hours before the opening ceremony when a hobbyist drone was launched from a residential balcony 3 km from the venue. The SkyWatch radar detected the launch at 2.8 km range, the Aegis Core node classified it as a small consumer drone within 0.4 seconds, and RF denial was activated within 1.8 seconds of classification. The drone landed on the balcony from which it was launched, and police were dispatched to the location within four minutes.
        </p>
        <p>
          The most serious incident occurred on the second day of the summit when a military-grade drone was detected approaching from the northeast at 8 km range, flying at 120 meters altitude at 65 km/h. The drone's RF signature and flight profile matched the characteristics of a known surveillance platform used by a hostile intelligence service. The Aegis Command system automatically escalated the alert to the highest priority and activated RF denial at 5 km range. The drone's command link was disrupted, but it continued on a pre-programmed autonomous route — confirming the system's classification as a military platform. GPS spoofing was then activated, redirecting the drone away from the venue to a pre-designated safe landing zone where law enforcement intercepted the platform and secured its intelligence payloads. The entire engagement was completed without any disruption to summit activities and without the knowledge of the delegations or media. All 23 drone incursions were neutralized without a single penetration of the inner security zone.
        </p>
      </TextSection>

      <QuoteSection
        quote="The drone that came in on day two was a military surveillance platform — this wasn't a hobbyist. Our team watched Aegis classify it, deny its command link, spoof its navigation, and redirect it to a safe zone — all in under 30 seconds and without anyone at the venue knowing anything was wrong. That's the standard for protecting heads of state."
        author="Assistant Director Jean-Marc Renault"
        role="Host Nation Internal Security Service"
      />

      <SpecTable
        label="Deployment Details"
        title="System Configuration"
        specs={[
          { label: "Products Deployed", value: "Aegis Shield, SkyWatch (4), Core (8), Command" },
          { label: "Coverage Area", value: "25 km² urban venue zone" },
          { label: "Threats Neutralized", value: "23 over 72 hours" },
          { label: "Operational Hours", value: "168 (including pre-event baseline)" },
          { label: "Mission Duration", value: "72-hour event (8-week preparation)" },
          { label: "Detection Range", value: "20 km (SkyWatch), 8 km (Core)" },
          { label: "Neutralization Methods", value: "RF denial (74%), GPS spoofing (17%), Law enforcement interdiction (9%)" },
          { label: "Authorized Flight Integration", value: "Real-time flight plan, transponder, and call-sign correlation" },
          { label: "Deployment Timeline", value: "8 weeks from contract to operational" },
          { label: "Inner Zone Penetrations", value: "0" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "How did the system distinguish between authorized aircraft and drone threats in a busy urban airspace?",
            answer:
              "The Aegis Command system was pre-loaded with the summit's complete authorized flight schedule, including all police helicopter sorties, medical evacuation standby flights, VIP transport movements, and media helicopter operations. Every radar track was automatically correlated against this database using transponder codes, call signs, flight plans, and aircraft signature profiles. Additionally, the system's multi-modal sensor fusion cross-referenced radar returns with EO/IR visual classification and RF emission analysis. Any contact that did not match an authorized flight profile was immediately classified as a potential threat and escalated for human verification if the automated classification was below the confidence threshold.",
          },
          {
            question: "What measures were taken to ensure the Aegis system itself didn't interfere with summit communications?",
            answer:
              "Comprehensive electromagnetic compatibility testing was conducted in the weeks before the summit, mapping every frequency used by the event's communications, broadcasting, and security systems. The Aegis RF denial and GPS spoofing systems were configured with exclusion zones covering all summit-essential frequencies. The system's passive detection modes — radar, EO/IR, and RF direction-finding — do not emit energy that could cause interference. Active denial transmissions were limited to the specific threat drone's command frequencies and activated only when a confirmed threat required engagement. No interference with summit communications was recorded.",
          },
          {
            question: "How rapidly can Aegis Shield be deployed for an event of this scale?",
            answer:
              "The G7 Summit deployment demonstrated an eight-week timeline from contract signature to full operational capability. This included site surveys, hardware procurement and shipping, installation at 12 separate sites, system integration and testing, operator training, and a 72-hour pre-event operational baseline period. For repeat events or venues where pre-positioning agreements are in place, the timeline can be reduced to as little as two weeks. Aegis maintains rapid-deployment kits at three regional hubs that can be air-freighted to any global location within 48 hours.",
          },
          {
            question: "What happened to the operators of the neutralized drones?",
            answer:
              "Of the 23 drone incursions during the summit, 21 operators were identified and apprehended by law enforcement. The Aegis Command system's RF triangulation capability provided estimated operator locations within 50 meters accuracy for command-guided drones, enabling rapid police response. For the two military-grade drones operating autonomously, the recovered hardware provided forensic evidence that contributed to diplomatic actions. The 21 apprehended individuals included 15 hobbyists unaware of the temporary flight restriction, 4 protest activists attempting to fly banner drones, and 2 individuals with suspected links to organized criminal activity who were subject to further investigation.",
          },
        ]}
      />

      <CTASection
        title="Protect Your Next High-Profile Event"
        subtitle="Aegis Shield is proven at the highest levels of VIP protection. Contact us for a tailored security architecture for your next summit, conference, or ceremony."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="View All Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
