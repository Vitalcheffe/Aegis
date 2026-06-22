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

const convoySpecs = [
  { label: "Detection Range", value: "8 km (mobile), 12 km (halt)" },
  { label: "Tracking Capacity", value: "100+ simultaneous targets" },
  { label: "Neutralization Range", value: "5 km (RF denial)" },
  { label: "Speed Compatibility", value: "0–80 km/h on-road" },
  { label: "Setup / Teardown", value: "< 10 minutes" },
  { label: "Vehicle Mounting", value: "MRAP, JLTV, HMMWV, custom" },
  { label: "Power", value: "Vehicle integration or 1.5 kW autonomous" },
  { label: "Crew", value: "1 operator (dismount capable)" },
  { label: "Network", value: "ATAK / JADC2 / mesh radio" },
  { label: "Jamming Modes", value: "Selective / wideband / stealth" },
  { label: "IFF Integration", value: "Mode 5 compatible" },
  { label: "Operating Temp", value: "-40°C to +55°C" },
];

export default function ConvoysPage() {
  return (
    <main>
      <SectionHero
        image="/images/pages/convoy-hero.jpg"
        label="Military Solutions"
        title="Convoy Protection"
        subtitle="On the Move. Always Protected."
        cta="Request Briefing"
        ctaHref="/request-demo"
      />

      <SplitSection
        image="/images/pages/convoy-mobile.jpg"
        label="Mobile Defense"
        title="Continuous Protection While Moving"
        description="Convoys are most vulnerable when they're predictable — and enemy drone operators know it. IED-laden UAS, ISR platforms tracking route patterns, and loitering munitions that strike at chokepoints represent an existential threat to mobile columns. Aegis convoy protection systems are designed to operate at speed, with vehicle-mounted sensor suites that maintain full hemispherical coverage while the convoy is in motion. Adaptive RF jamming blankets deny enemy command links across the convoy's path, while intelligent frequency management ensures friendly communications remain unimpeded. The system automatically transitions between mobile and halted configurations, expanding its detection envelope when the convoy stops for resupply or overnight positions."
        reverse={false}
        stats={[
          { value: "80 km/h", label: "Max Convoy Speed" },
          { value: "< 3s", label: "Threat Classification" },
        ]}
      />

      <SplitSection
        image="/images/pages/convoy-vehicles.jpg"
        label="Route Clearance"
        title="Aerial Route Clearance and Overwatch"
        description="Before a convoy moves, the route must be clear — not just of IEDs on the ground, but of UAS loitering above. Aegis convoy systems provide aerial route clearance by scanning the intended path forward, identifying drones positioned for ambush, and neutralizing them before the column enters the engagement zone. When integrated with our mesh radio network, multiple convoy vehicles form a distributed sensor array that extends detection coverage across the entire column. Each vehicle's sensors share threat data in real time, creating a collective operating picture that no single-node system can match. Route clearance mode can be initiated by the convoy commander or triggered automatically when the system detects pre-positioned UAS along the planned route."
        reverse={true}
        stats={[
          { value: "12 km", label: "Route Scan Range" },
          { value: "Mesh", label: "Networked Coverage" },
        ]}
      />

      <QuoteSection
        quote="We completed 147 convoy missions in theater with zero successful drone attacks after installing Aegis. Before that, we were averaging one attack every three patrols."
        author="Major Daniel Ortega"
        role="S3 Operations, 3rd Armored Brigade Combat Team"
      />

      <SpecTable
        label="Technical Specifications"
        title="Convoy Protection System Specifications"
        specs={convoySpecs}
      />

      <CTASection
        title="Protect Your Convoys"
        subtitle="Equip your mobile forces with the only Counter-UAS system proven to operate at convoy speeds. Our team will configure a mobile defense suite for your vehicle fleet and threat environment."
        primaryCta="Request Convoy Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Military Solutions"
        secondaryHref="/solutions/military"
      />
    </main>
  );
}
