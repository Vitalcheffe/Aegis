"use client";

import {
  SectionHero,
  TextSection,
  SplitSection,
  StatsSection,
  SpecTable,
  CTASection,
  QuoteSection,
  ImageBreak,
  FAQSection,
  FeatureList,
} from "@/components/sections";

export default function ElectronicWarfarePage() {
  return (
    <>
      <SectionHero
        image="/images/technology/electronic-warfare.jpg"
        label="Technology"
        title="Electronic Warfare"
        subtitle="Jamming, spoofing, and electronic attack — non-kinetic neutralization that disables drone threats without kinetic collateral effects."
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="The Non-Kinetic Advantage">
        <p>
          Electronic warfare is the primary non-kinetic neutralization capability in the Aegis graduated response framework, providing proportionate countermeasures that disable drone threats without the kinetic collateral effects of physical interdiction. The Aegis EW subsystem operates across three domains: electronic attack (EA), which disrupts or disables drone communication and navigation systems through jamming and spoofing; electronic protection (EP), which ensures that Aegis countermeasures do not interfere with friendly communications and systems; and electronic warfare support (ES), which provides the signal intelligence that enables precision targeting of adversary emissions. This three-domain approach ensures that every electronic countermeasure is both effective against the threat and safe for friendly forces and civilian infrastructure.
        </p>
        <p>
          The non-kinetic nature of EW provides several operational advantages. First, it is proportionate — jamming a drone's control link is a measured response that disrupts the threat without destroying property or risking collateral damage. Second, it is repeatable — unlike kinetic interceptors with limited magazine depth, EW effects are constrained only by electrical power, enabling sustained engagement of prolonged or repeated threats. Third, it is auditable — every EW action is logged with precise timing, frequency, power, and direction, providing the evidence trail required for legal and regulatory compliance. Fourth, it is selective — precision jamming can target specific frequencies and protocols while leaving adjacent communications unaffected, a capability that is essential in civilian environments where blanket jamming would be dangerous and illegal.
        </p>
      </TextSection>

      <SplitSection
        image="/images/technology/electronic-warfare.jpg"
        label="Precision Jamming"
        title="Surgical Signal Disruption"
        description="The Aegis precision jamming system targets specific drone communication frequencies and protocols with surgical accuracy, disrupting the threat's control link while minimizing collateral electromagnetic effects. The system operates in two modes: protocol-aware jamming and barrage jamming. Protocol-aware jamming exploits knowledge of the target's communication protocol to transmit targeted interference that maximizes disruption with minimum power. For example, against a drone using DJI OcuSync 3.0 at 2.4 GHz, the system transmits protocol-specific jamming packets that exploit the MAC layer timing and framing structure to achieve complete link denial with just 10 watts of effective radiated power — compared to the 100+ watts that blind barrage jamming would require. Barrage jamming, used when protocol details are unknown, floods a wider frequency band with noise that degrades the signal-to-noise ratio below the threshold required for successful demodulation. The system automatically selects the minimum effective jamming mode based on the classification output from the AI Layer."
        stats={[
          { value: "10 W", label: "Protocol-Aware ERP" },
          { value: "<50 ms", label: "Jamming Effect Time" },
        ]}
      />

      <SplitSection
        image="/images/technology/electronic-warfare.jpg"
        label="GPS Spoofing"
        title="Navigation Redirection"
        description="The Aegis GPS spoofing system transmits counterfeit GPS signals that override the drone's legitimate navigation receiver, redirecting the platform to a designated safe zone or forcing it to land at a controlled location. The spoofed signals are geographically consistent — they reproduce the GPS ephemeris, almanac, and timing structure with sufficient fidelity to be accepted by the drone's GPS receiver without triggering anti-spoofing alarms. The spoofer generates a smooth trajectory that gradually pulls the drone's perceived position away from its actual location, causing the flight controller to navigate toward the spoofed waypoint without triggering abrupt maneuvers that could indicate spoofing to a human operator. The redirection is typically complete within 1-3 seconds of spoofing activation. Aegis GPS spoofing operates on L1 (1575.42 MHz) and L2 (1227.60 MHz) frequencies, and the 2025 architecture adds L5 (1176.45 MHz) support for military-grade receivers."
        reverse
        stats={[
          { value: "1–3 s", label: "Redirection Time" },
          { value: "L1/L2/L5", label: "GPS Bands" },
        ]}
      />

      <TextSection label="Advanced EW Capabilities" title="Next-Generation Countermeasures">
        <p>
          The 2025 Aegis architecture introduces two advanced EW capabilities that extend the non-kinetic neutralization envelope beyond jamming and spoofing. The cognitive EW module uses machine learning to adapt jamming parameters in real time based on observed target behavior, automatically selecting optimal waveforms, power levels, and frequency assignments to maximize disruption against frequency-hopping and frequency-agile targets. When a drone switches to a backup communication channel — a behavior observed in military-grade platforms programmed to evade jamming — the cognitive EW module detects the frequency transition within 50 milliseconds and redirects jamming energy to the new channel, maintaining continuous link denial without the manual frequency retuning that legacy systems require.
        </p>
        <p>
          The electromagnetic pulse (EMP) capability provides close-range hard-kill neutralization by generating a short-duration, high-intensity electromagnetic pulse that induces damaging voltages in the drone's onboard electronics. The EMP module is effective to a range of approximately 500 meters and disables the target permanently — unlike jamming, which only disrupts the drone while the jammer is active. EMP engagement is reserved for the highest-threat scenarios where permanent platform disablement is required and the engagement geometry permits close-range approach. The EMP module produces a directional pulse with a 30° beamwidth, concentrating energy on the target while minimizing effects on electronics outside the engagement cone. All EMP engagements require explicit operator authorization through the Decision Layer rules of engagement framework.
        </p>
      </TextSection>

      <StatsSection
        label="EW Performance"
        stats={[
          { value: "20 MHz–6 GHz", label: "Jamming Coverage" },
          { value: "50 ms", label: "Cognitive EW Response" },
          { value: "1–3 s", label: "GPS Spoof Redirection" },
          { value: "500 m", label: "EMP Range" },
          { value: "30°", label: "EMP Beamwidth" },
        ]}
      />

      <QuoteSection
        quote="The beauty of electronic warfare is precision. A 10-watt protocol-aware jammer can deny a drone's control link more effectively than a 10-kilowatt barrage jammer — and it does so without affecting the Wi-Fi in the building next door. That's not just technically superior; it's legally and ethically necessary for civilian operations."
        author="Colonel (Ret.) James Hartwell"
        role="Vice President of EW Programs, Aegis Defense Systems"
      />

      <SpecTable
        label="EW Specifications"
        title="Technical Specifications"
        specs={[
          { label: "Jamming Frequency Range", value: "20 MHz – 6 GHz" },
          { label: "Max Jamming Power (Barrage)", value: "200 W ERP" },
          { label: "Protocol-Aware Jamming Power", value: "10 W ERP (typical)" },
          { label: "Jamming Effect Latency", value: "<50 ms" },
          { label: "Cognitive EW Adaptation Time", value: "<50 ms" },
          { label: "GPS Spoofing Bands", value: "L1 / L2 / L5" },
          { label: "GPS Spoofing Redirection Time", value: "1–3 seconds" },
          { label: "EMP Effective Range", value: "~500 m" },
          { label: "EMP Beamwidth", value: "30°" },
          { label: "Simultaneous Jamming Channels", value: "8 independent" },
          { label: "Friendly Force Deconfliction", value: "Automatic spectrum coordination" },
          { label: "Compliance Monitoring", value: "Real-time spectrum mask enforcement" },
          { label: "EW Power Consumption", value: "<300 W (typical engagement)" },
          { label: "Audit Logging", value: "Full frequency/power/timing record" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "Does Aegis jamming affect civilian communications?",
            answer:
              "No. The Aegis precision jamming system is designed to minimize collateral electromagnetic effects through three mechanisms. First, protocol-aware jamming concentrates energy in the specific frequency and time slots used by the target drone, leaving adjacent frequencies unaffected. Second, the directional jamming antenna focuses energy toward the target with a narrow beamwidth, preventing exposure of ground-level infrastructure to jamming energy. Third, the automatic spectrum compliance module continuously monitors the electromagnetic environment and enforces geographic and spectral exclusion zones that protect critical civilian systems including cellular base stations, Wi-Fi access points, and emergency communication systems. In over 15,000 operational engagements, there has been zero confirmed interference with civilian communications infrastructure.",
          },
          {
            question: "What happens when a jammed drone recovers its control link?",
            answer:
              "When a drone under jamming recovers its control link — either because the operator has switched to a backup frequency or the drone has autonomously returned to its home point — the Aegis system detects the recovery through the RF sensing subsystem, which monitors for the resumption of drone communication signals. If the drone resumes hostile behavior, the system automatically re-engages with appropriate countermeasures. If the drone is executing a return-to-home sequence that takes it out of the protected area, the system maintains track custody and alerts the operator but does not re-engage unless the threat re-enters the engagement zone. For drones equipped with frequency-hopping backup links, the cognitive EW module detects the frequency transition and adapts jamming parameters within 50 milliseconds, maintaining continuous link denial across the hop sequence.",
          },
          {
            question: "Is GPS spoofing legal?",
            answer:
              "GPS spoofing legality varies by jurisdiction and operational context. In military operations, GPS spoofing is a recognized electronic warfare technique authorized under the laws of armed conflict. In civilian environments, GPS spoofing requires specific regulatory authorization — in the United States, this typically requires coordination with the FCC and FAA under national security provisions. Aegis GPS spoofing systems are deployed only where appropriate legal authorization has been obtained, and the Decision Layer rules of engagement framework includes jurisdiction-specific authorization checks that prevent spoofing activation unless the legal prerequisites are confirmed. Our regulatory affairs team maintains current knowledge of GPS spoofing authorization frameworks across 30+ jurisdictions and provides compliance support as part of the deployment process.",
          },
          {
            question: "How does Aegis protect friendly forces from its own EW effects?",
            answer:
              "The Aegis electronic protection (EP) subsystem prevents friendly force fratricide through several mechanisms. The system maintains a real-time inventory of friendly force communication frequencies, GPS-dependent systems, and electromagnetic emitters, sourced from the force's electronic order of battle. Before any EW action, the system's spectrum deconfliction engine verifies that the proposed jamming or spoofing parameters will not affect any frequency or system in the friendly force inventory. The system also implements geographic exclusion zones around friendly force positions, reducing jamming power in directions where friendly receivers may be exposed. Finally, the directional nature of Aegis EW transmissions — combined with the narrow beamwidth of the jamming and spoofing antennas — ensures that energy is concentrated on the threat rather than radiated omnidirectionally.",
          },
        ]}
      />

      <CTASection
        title="Explore EW Capabilities"
        subtitle="Schedule a classified technical briefing with our EW programs team to discuss countermeasure effectiveness against your specific threat scenarios and operational requirements."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Products"
        secondaryHref="/products"
      />
    </>
  );
}
