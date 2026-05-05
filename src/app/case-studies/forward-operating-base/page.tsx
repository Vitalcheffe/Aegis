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

export default function ForwardOperatingBasePage() {
  return (
    <>
      <SectionHero
        image="/images/case-studies/fob-defense.jpg"
        label="Case Study"
        title="FOB Defense Under Fire in Active Combat Zone"
        subtitle="How Aegis Tactical provided rapid-deploy counter-UAS that protected 2,400 personnel under sustained adversarial drone operations"
      />

      <StatsSection
        label="Mission Results"
        stats={[
          { value: "2,400", label: "Personnel Protected" },
          { value: "412", label: "Threats Neutralized" },
          { value: "99.5%", label: "Intercept Rate" },
          { value: "0", label: "Casualties from UAS" },
        ]}
      />

      <TextSection label="Background" title="The Challenge">
        <p>
          Forward Operating Base Sentinel, a combined joint operations base hosting 2,400 U.S. and coalition personnel in a high-threat region, faced the most sustained and sophisticated drone campaign against a single installation in the conflict's history. Over a six-month period, adversarial forces launched over 400 drone sorties against the base, employing a diverse and evolving arsenal that included commercially modified quadcopters carrying grenade payloads, fixed-wing one-way attack drones with explosive warheads designed for kinetic impact, and surveillance platforms that mapped base defenses and troop movements in real time for artillery targeting. The attacks were coordinated with indirect fire — drones provided battle damage assessment and corrected artillery fire in real time, creating a deadly synergy between aerial surveillance and ground-based fires that significantly increased the effectiveness of mortar and rocket attacks on the base.
        </p>
        <p>
          The base's existing counter-drone capabilities were limited to vehicle-mounted active protection systems originally designed for rocket and mortar defense, which were ineffective against the small radar cross-section and low flight speeds of the drones employed. Visual observation by sentries provided the primary detection method — a dangerously inadequate approach given that many attack drones approached at night or from terrain-masked directions. On three occasions, drone-delivered grenades landed within 50 meters of troop billets, and one surveillance drone spotted a helicopter landing zone just minutes before a rocket attack targeted the area, resulting in damage to two aircraft. The base commander identified the counter-UAS deficiency as an existential threat to the force and requested immediate deployment of a dedicated counter-drone system that could be installed and operational within days, not months, and could operate under combat conditions with minimal maintenance requirements.
        </p>
      </TextSection>

      <SplitSection
        image="/images/pages/fob-military.jpg"
        label="Solution"
        title="Aegis Tactical Rapid Deployment"
        description="Aegis Defense Systems deployed Aegis Tactical — a man-portable, rapid-deployment counter-UAS system designed specifically for forward operating bases and austere environments — within 96 hours of the request. Aegis Tactical combines a compact phased-array radar unit that can be set up by two operators in under 30 minutes, a ruggedized EO/IR tracker that provides visual classification and fire-control quality tracking, and a directional RF denial system with both command-link jamming and GPS spoofing capabilities. Four Aegis Tactical units were flown into the base on a C-130 transport and positioned at cardinal points around the perimeter, providing overlapping 360° coverage with a 6 km detection range and 4 km neutralization range. The units were networked via mesh radio to an Aegis Command battle management terminal in the base operations center, which fused data from all four units and integrated with the base's existing early warning and force protection systems."
        stats={[
          { value: "96 hrs", label: "Deployment Time" },
          { value: "4", label: "Tactical Units" },
          { value: "30 min", label: "Setup Per Unit" },
        ]}
      />

      <TextSection label="Operations" title="Mission Execution">
        <p>
          The Aegis Tactical system was operational within hours of arrival, and its first engagement occurred on the very first night of operation. At 0237 local time, the radar detected a fixed-wing drone approaching from the southeast at 80 km/h at an altitude of 150 meters — a one-way attack drone on a direct course for the base's helicopter parking area. The system classified the threat as hostile within 0.6 seconds and activated RF denial. The drone's GPS navigation was spoofed, redirecting it to an unoccupied area 3 km from the base where it crashed without causing damage. The engagement was completed in under 8 seconds from first detection. Two minutes later, a second drone — a quadcopter carrying two grenade payloads — was detected approaching from the north. RF denial disrupted its command link, causing it to descend and land 800 meters outside the perimeter where explosive ordnance disposal personnel recovered the armed drone the following morning.
        </p>
        <p>
          Over the subsequent eight months of continuous operation, the Aegis Tactical system processed 412 hostile drone engagements across 189 separate attack events. The system achieved a 99.5% neutralization rate, with 61% of threats defeated by RF denial, 24% by GPS spoofing, and 14.5% by kinetic engagement using the base's existing close-in weapons systems that were cued by Aegis tracking data. The remaining 0.5% — two drones — struck within the base perimeter but caused only minor damage to unoccupied structures. No personnel casualties resulted from drone attacks after Aegis Tactical became operational. The system's intelligence value proved equally critical: by recording the flight profiles and launch bearings of every drone engaged, the Aegis Command system identified seven enemy drone launch sites, enabling the base commander to direct counterfire that destroyed five of them and suppressed the remaining two. The correlation of drone surveillance with artillery attacks was broken — after Aegis reached operational capability, the accuracy of indirect fire attacks on the base decreased by 73% as the adversary lost its real-time aerial observation capability.
        </p>
      </TextSection>

      <QuoteSection
        quote="We were getting hit by drones every other night, and we couldn't do anything about it. The first night Aegis was online, we watched two attack drones get taken down before they got within four kilometers. After that, the drone attacks just stopped — they knew we could see them and stop them. Aegis gave us the airspace back."
        author="Lieutenant Colonel David Yoon"
        role="Commander, FOB Sentinel"
      />

      <SpecTable
        label="Deployment Details"
        title="System Configuration"
        specs={[
          { label: "Products Deployed", value: "Aegis Tactical (4 units), Aegis Command" },
          { label: "Coverage Area", value: "6 km detection radius, 4 km neutralization (360°)" },
          { label: "Threats Neutralized", value: "412 over 8 months" },
          { label: "Operational Hours", value: "5,840 continuous (combat conditions)" },
          { label: "Mission Duration", value: "8 months (extended from initial 6-month deployment)" },
          { label: "Deployment Time", value: "96 hours from request to operational" },
          { label: "Setup Time", value: "30 minutes per unit (2 operators)" },
          { label: "Neutralization Methods", value: "RF denial (61%), GPS spoofing (24%), Kinetic cue (14.5%), Missed (0.5%)" },
          { label: "Enemy Launch Sites Identified", value: "7 (5 destroyed, 2 suppressed)" },
          { label: "Indirect Fire Accuracy Reduction", value: "73%" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "How does Aegis Tactical handle the rapid evolution of adversarial drone tactics?",
            answer:
              "Aegis Tactical's multi-modal sensor fusion and machine learning classification engine are designed to adapt to evolving threats. The system's classification algorithms are updated over-the-air with new threat signatures as they are identified by the Aegis threat intelligence team. During the FOB deployment, the adversary shifted tactics four times — including switching to frequency-hopping command links, employing drones with no RF emissions, using swarm formations, and adopting terrain-following flight profiles. Each adaptation was countered within days through software updates and tactical repositioning of the Aegis Tactical units. The system's ability to detect drones using radar and EO/IR sensors alone ensured that RF-silent drones were still engaged effectively.",
          },
          {
            question: "What happens when multiple drones attack simultaneously from different directions?",
            answer:
              "The four Aegis Tactical units networked via mesh radio provide distributed detection and engagement capability. Each unit can simultaneously track and engage multiple drones, and the Aegis Command battle management system automatically assigns engagement responsibilities based on which unit has the best effector geometry for each threat. During the deployment, the system successfully handled a coordinated attack involving 11 drones approaching from four directions, neutralizing all 11 within 120 seconds. The mesh networking also provides resilience — if one unit is damaged or destroyed, the remaining units redistribute coverage to eliminate gaps.",
          },
          {
            question: "How is Aegis Tactical powered and maintained in a forward environment?",
            answer:
              "Each Aegis Tactical unit operates on standard military 24V DC power and can be powered by vehicle batteries, portable generators, or the base's electrical grid. Total power consumption is under 800 watts per unit. Maintenance is designed for the operator level — all line-replaceable units can be swapped by the two-operator team in under 15 minutes with no specialized tools. Aegis maintains a 48-hour parts delivery pipeline to forward locations, and the system's modular architecture means that only the failed component needs replacement, not the entire unit. Over the 8-month deployment, operational availability exceeded 99.2% with only three component replacements required.",
          },
          {
            question: "Can Aegis Tactical be relocated quickly if the FOB moves or the threat axis shifts?",
            answer:
              "Yes. Each Aegis Tactical unit breaks down into three man-portable cases weighing under 32 kg each, transportable by two operators or a single vehicle. Setup at a new location takes 30 minutes, with an additional 15 minutes for system calibration and network rejoining. This mobility was demonstrated twice during the deployment when the base command repositioned two units to cover a new approach axis identified through intelligence. The units were operational at their new positions within 90 minutes of the decision to move, with no degradation in coverage during the relocation thanks to the overlapping coverage from the remaining two units.",
          },
        ]}
      />

      <CTASection
        title="Defend Your Forward Operating Base"
        subtitle="Aegis Tactical is combat-proven, rapidly deployable, and designed for the austere environments where your forces operate. Request an urgent capability briefing."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="View All Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
