"use client";

import {
  ProductHero,
  Callout,
  SplitSection,
  SpecTable,
  CTASection,
  ImageBreak,
  StatsSection,
} from "@/components/sections";

export default function AegisShieldPage() {
  return (
    <>
      <ProductHero
        image="/images/pages/aegis-shield-hero.jpg"
        label="Passive Defense"
        title="Aegis Shield"
        subtitle="Silent, invisible, uncompromising — passive counter-UAS detection with 360° coverage and zero electromagnetic emissions for covert operations and VIP protection."
        specs={[
          { value: "360°", label: "Coverage" },
          { value: "0", label: "EM Emissions" },
          { value: "6km", label: "Detection Range" },
          { value: "3", label: "Sensor Types" },
        ]}
      />

      <Callout>
        You cannot jam what you cannot find. Aegis Shield detects hostile drones
        without transmitting a single electromagnetic pulse — invisible to
        adversarial SIGINT, safe for covert operations, and effective in
        electromagnetic-denied environments.
      </Callout>

      <SplitSection
        image="/images/pages/aegis-shield-passive.jpg"
        label="Passive Sensors"
        title="See Without Being Seen"
        description="Aegis Shield operates entirely through passive detection modalities — acoustic arrays, thermal imaging, and optical sensors — eliminating any electromagnetic signature that could reveal defensive positions or trigger adversarial anti-radiation measures. The acoustic sensor array consists of 64 MEMS microphones arranged in a distributed aperture configuration, detecting drone motor signatures at 6 km and rotor blade acoustic signatures at 3.5 km. The thermal imaging suite uses long-wave infrared (LWIR) cameras with custom germanium optics to detect the thermal plume of drone motors against sky and terrain clutter, maintaining positive track through darkness, fog, and smoke. The optical sensor array employs high-resolution cameras with AI-enhanced image processing to provide visual classification confirmation across the full detection volume."
        stats={[
          { value: "64", label: "Acoustic Elements" },
          { value: "LWIR", label: "Thermal Imaging" },
          { value: "0W", label: "EM Emissions" },
        ]}
      />

      <SplitSection
        image="/images/pages/shield-array.jpg"
        label="Stealth Operation"
        title="Defensive Dominance Without Signature"
        description="The strategic value of Aegis Shield lies in its complete electromagnetic silence. In an era where adversarial drones routinely carry RF detection payloads that map defensive positions, Aegis Shield provides counter-UAS awareness without revealing its existence. This makes it uniquely suited for VIP protection details, covert forward operating bases, diplomatic facilities, and any scenario where operational security demands that defensive capabilities remain undetected. The system integrates seamlessly with existing physical security infrastructure — mounted on building perimeters, vehicle convoys, or temporary barriers. When combined with an active Aegis platform through the network backbone, Aegis Shield provides the silent detection layer that hands off classified threat data to kinetic and non-kinetic effectors without ever emitting."
        reverse
        stats={[
          { value: "0", label: "EM Signature" },
          { value: "SIGINT", label: "Safe" },
          { value: "Covert", label: "Operations" },
        ]}
      />

      <SplitSection
        image="/images/pages/shield-defense.jpg"
        label="Full Coverage"
        title="360° Awareness, Zero Gaps"
        description="Aegis Shield provides complete hemispherical coverage through its distributed sensor architecture. The acoustic array detects and localizes threats across the full 360° azimuth with ±5° bearing accuracy, while the thermal and optical arrays provide overlapping coverage sectors that eliminate detection gaps. The fusion engine correlates acoustic, thermal, and visual detections to maintain continuous track even when individual sensor modalities are degraded — drone motors masked by wind noise are still tracked via thermal signature, and heat-obscured targets are still detected acoustically. This multi-modal redundancy ensures no threat approaches undetected, regardless of environmental conditions or adversarial countermeasures. The system maintains full detection capability while operating alongside sensitive electronics, medical equipment, and communication systems with zero electromagnetic interference."
        stats={[
          { value: "360°", label: "Azimuth" },
          { value: "±5°", label: "Bearing Accuracy" },
          { value: "0", label: "Detection Gaps" },
        ]}
      />

      <ImageBreak image="/images/pages/shield-perimeter.jpg" height="50vh" />

      <StatsSection
        label="Shield Performance"
        stats={[
          { value: "360°", label: "Coverage" },
          { value: "6km", label: "Acoustic Detection" },
          { value: "0", label: "EM Emissions" },
          { value: "3", label: "Sensor Modalities" },
          { value: "96.8%", label: "Detection Rate" },
        ]}
      />

      <SpecTable
        label="Technical Specifications"
        title="Aegis Shield Specifications"
        specs={[
          { category: "Performance" },
          { label: "Detection Range (Acoustic)", value: "6 km (rotor drone), 4 km (fixed-wing)" },
          { label: "Detection Range (Thermal)", value: "3.5 km (small UAS), 5 km (medium UAS)" },
          { label: "Detection Range (Optical)", value: "2.5 km (day), 1.5 km (night, aided)" },
          { label: "Tracking Capacity", value: "100+ concurrent targets" },
          { label: "Bearing Accuracy (Acoustic)", value: "±5° at 6 km" },
          { label: "Classification Accuracy", value: "96.8% (multi-modal fusion)" },
          { label: "Kill Chain Closure", value: "<500 ms (detect-to-alert)" },
          { label: "Coverage", value: "360° azimuth, -10° to +85° elevation" },
          { label: "EM Emissions", value: "Zero (fully passive)" },
          { category: "Sensors" },
          { label: "AI Processing", value: "45 TOPS" },
          { label: "Acoustic Array", value: "64-element MEMS distributed aperture" },
          { label: "Thermal Resolution", value: "640×512, 12μm pixel pitch (LWIR)" },
          { label: "Optical Resolution", value: "4K, 30fps, AI-enhanced" },
          { label: "Sensor Modalities", value: "Acoustic, Thermal (LWIR), Optical" },
          { category: "Physical" },
          { label: "Power Consumption", value: "800W (operational), 200W (standby)" },
          { label: "Weight", value: "1,800 kg (system total)" },
          { label: "Mounting Options", value: "Perimeter wall, vehicle, tripod, building" },
          { label: "Setup Time", value: "2 hours (full operational)" },
          { label: "Crew Requirement", value: "1 operator" },
          { category: "Environmental" },
          { label: "Operating Temperature", value: "-40°C to +55°C" },
          { label: "MIL-STD Compliance", value: "810H, 461G" },
          { label: "Weather Resistance", value: "IP65 (outdoor sensor units)" },
          { label: "MTBF", value: ">15,000 hours" },
          { category: "Connectivity" },
          { label: "Network Interfaces", value: "Ethernet, fiber, tactical radio" },
          { label: "Interoperability", value: "STANAG 4586, Aegis Command handoff" },
          { label: "Alert Outputs", value: "SNMP, REST API, relay contacts" },
          { label: "Classification", value: "NATO RESTRICTED / ITAR Controlled" },
        ]}
      />

      <CTASection
        title="Silent Vigilance"
        subtitle="Aegis Shield protects the most sensitive installations without revealing its presence. Evaluate passive counter-UAS for your covert and VIP protection requirements."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Platforms"
        secondaryHref="/products"
      />
    </>
  );
}
