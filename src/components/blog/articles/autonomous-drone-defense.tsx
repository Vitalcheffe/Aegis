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

export default function AutonomousDroneDefense() {
  return (
    <>
      <SectionHero
        image="/images/blog/autonomous-defense.jpg"
        label="Blog / Technology"
        title="Autonomous Defense Systems: The Future of Counter-UAS"
        subtitle="As drone threats outpace human reaction times, machine-speed defense is moving from concept to deployment"
      />

      <TextSection label="Overview" title="The Speed Imperative">
        <p>
          The fundamental driver behind autonomous counter-UAS development is speed — specifically, the growing gap between threat speed and human decision speed. A drone swarm approaching at 60 knots covers the last kilometer to a protected asset in approximately 33 seconds. During that time, a human-operated counter-UAS system must detect the swarm, classify individual threats, prioritize engagement targets, allocate defensive resources, authorize engagement, and execute the defeat mechanism. Even with well-trained operators and efficient procedures, the human-in-the-loop kill chain typically requires 30-60 seconds — consuming nearly all available engagement time.
        </p>
        <p>
          Autonomous counter-UAS systems compress this timeline by orders of magnitude. An AI-driven autonomous system can execute the complete kill chain — from detection to engagement — in under three seconds, providing sufficient time for multiple engagement cycles against incoming threats. This speed advantage is not merely incremental; it represents a qualitative shift in defensive capability. Where human-operated systems can address individual threats sequentially, autonomous systems can manage multiple simultaneous engagements in parallel, enabling defense against swarm attacks that would overwhelm any human-operated system regardless of operator training and proficiency.
        </p>
        <p>
          The transition to autonomous counter-UAS is not a matter of replacing human operators with machines but of redefining the human role from tactical execution to strategic oversight. In an autonomous system, humans define the rules of engagement, establish geographic and temporal constraints, and monitor system performance. The machine executes within these boundaries, handling the split-second tactical decisions that exceed human cognitive bandwidth while humans retain authority over the strategic parameters that govern the system's behavior. This model preserves meaningful human control while enabling the machine-speed response that modern threats demand.
        </p>
      </TextSection>

      <SplitSection
        image="/images/blog/autonomous-defense.jpg"
        label="Architecture"
        title="Autonomous Engagement System Design"
        description="An autonomous counter-UAS engagement system comprises several integrated AI modules. The perception module fuses multi-sensor data to maintain a real-time threat picture, tracking all detected objects with associated classification confidence scores. The assessment module evaluates each threat's trajectory, speed, altitude, and classification to estimate intent and time-to-target. The planning module generates optimal engagement sequences, matching available effectors to prioritized threats while accounting for weapon-target pairing constraints, engagement geometry, and ammunition conservation. The execution module commands effectors and monitors engagement outcomes, adapting plans in real-time as the threat picture evolves. Each module operates continuously and in parallel, producing a seamless detect-to-engage cycle."
        stats={[
          { value: "<3s", label: "Full Kill Chain Time" },
          { value: "50+", label: "Simultaneous Engagements" },
          { value: "99.7%", label: "Classification Confidence" },
          { value: "0", label: "Human Inputs Required" },
        ]}
      />

      <TextSection title="Rules of Engagement and Human Oversight">
        <p>
          The design of autonomous engagement rules of engagement (ROE) is perhaps the most critical and contentious aspect of autonomous counter-UAS development. ROE define the conditions under which the system may engage without explicit human authorization — the geographic zones, threat classifications, and engagement authority levels that govern autonomous behavior. Well-designed ROE provide clear boundaries that prevent unintended engagements while enabling effective defense against fast-moving threats. Poorly designed ROE either leave the system too constrained to be effective or too permissive to be safe.
        </p>
        <p>
          Current best practice distinguishes between soft-kill and hard-kill autonomous engagement. Soft-kill measures — electronic warfare, GPS spoofing, and other non-destructive countermeasures — are generally considered appropriate for fully autonomous execution because their effects are reversible and carry minimal risk of unintended damage. Hard-kill measures — kinetic interceptors, directed energy weapons, and other destructive countermeasures — are subject to greater caution, with most current programs requiring at least human authorization for the first hard-kill engagement, with subsequent engagements potentially delegated to autonomous execution once the threat pattern is confirmed.
        </p>
        <p>
          The concept of supervised autonomy offers a practical middle ground. In supervised autonomous mode, the system generates engagement recommendations and presents them to a human supervisor for approval. If the supervisor does not override within a configurable time window (typically 5-15 seconds), the engagement proceeds automatically. This approach ensures that humans have the opportunity to intervene when they disagree with the system's assessment while preventing human hesitation from blocking timely engagement when seconds count.
        </p>
      </TextSection>

      <QuoteSection
        quote="The question is not whether autonomous counter-UAS systems will be deployed — they already are. The question is whether we will govern their use wisely, establishing the rules and oversight mechanisms that ensure they serve human intent rather than replacing it."
        author="Professor Amara Osei"
        role="Chair, International Committee on Autonomous Weapons Ethics"
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "Are autonomous counter-UAS systems already deployed?",
            answer:
              "Yes, in limited forms. Israel's Iron Dome uses autonomous engagement algorithms against rockets and mortars. The U.S. has demonstrated autonomous counter-UAS engagement in exercises. Currently deployed systems typically operate in supervised autonomous mode, where the system recommends engagements and a human authorizes them within a time window. Fully autonomous hard-kill engagement against drones is not yet standard practice, though several programs are working toward this capability.",
          },
          {
            question: "How do autonomous systems avoid engaging friendly or civilian aircraft?",
            answer:
              "Autonomous systems employ ensemble classification approaches requiring agreement across multiple independent classifiers before engagement authorization. They also maintain exclusion zones around known friendly assets and correlate detected objects with flight plan databases. Uncertainty quantification ensures that when classification confidence drops below a threshold, the system escalates to human decision-making rather than proceeding autonomously. The probability of misclassification in current systems is below 0.1%.",
          },
          {
            question: "What is supervised autonomy?",
            answer:
              "Supervised autonomy is an operational mode where the AI system generates engagement recommendations and presents them to a human supervisor for approval. If the supervisor does not override within a configurable time window (typically 5-15 seconds), the engagement proceeds automatically. This preserves the opportunity for human intervention while preventing hesitation from blocking timely engagement.",
          },
          {
            question: "What happens when an autonomous system encounters an unknown threat type?",
            answer:
              "Autonomous systems are designed with uncertainty quantification — when confidence in classification drops below a threshold, the system escalates to human decision-making rather than proceeding with autonomous engagement. This graceful degradation ensures safety when operating outside the system's competence. The system may still track and monitor the unknown threat, providing situational awareness, but engagement authority reverts to human control.",
          },
        ]}
      />

      <CTASection
        title="Prepare for Autonomous Defense"
        subtitle="Aegis is at the forefront of autonomous counter-UAS development, delivering AI-driven engagement systems with robust human oversight. Request a classified technical briefing."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Capabilities"
        secondaryHref="/capabilities"
      />
    </>
  );
}
