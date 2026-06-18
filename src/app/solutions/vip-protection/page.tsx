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

const vipSpecs = [
  { label: "Detection Range", value: "8 km (portable), 15 km (vehicle)" },
  { label: "Tracking Capacity", value: "80+ simultaneous targets" },
  { label: "Neutralization Range", value: "5 km (selective RF)" },
  { label: "System Weight", value: "12 kg (portable suite)" },
  { label: "Setup Time", value: "< 3 minutes (portable)" },
  { label: "Battery Life", value: "8 hours continuous" },
  { label: "Acoustic Profile", value: "Silent (passive and active)" },
  { label: "EM Emission", value: "LPI / selectable power" },
  { label: "Integration", value: "Protective detail comms / venue security" },
  { label: "Encrypted", value: "Type 1 / AES-256 / suite B" },
  { label: "Venue Coverage", value: "Indoor/outdoor, up to 50,000 capacity" },
  { label: "Regulatory", value: "FCC / national telecom authority waivers" },
];

export default function VIPProtectionPage() {
  return (
    <main>
      <SectionHero
        image="/images/pages/vip-hero.jpg"
        label="Executive Solutions"
        title="VIP Protection"
        subtitle="Discreet. Comprehensive. Uncompromising."
        cta="Request Briefing"
        ctaHref="/request-demo"
      />

      <SplitSection
        image="/images/pages/vip-event.jpg"
        label="Executive Protection"
        title="Invisible Shield for Visible People"
        description="High-profile individuals — heads of state, corporate executives, dignitaries — face unique drone threats that range from paparazzi surveillance to assassination attempts. Aegis VIP protection systems are designed to be as discreet as they are effective. Portable suites weighing under 12 kilograms can be set up in under three minutes, providing comprehensive drone detection and neutralization around residences, offices, and transit routes. In passive mode, the system is completely silent and invisible, detecting threats through EO/IR and acoustic sensors without emitting any signals that could reveal its presence. When active interdiction is required, low-probability-of-intercept RF modes neutralize drones without causing visible disruption — no jamming of WiFi, no interference with communications, no alarm to the protectee that a threat was ever present."
        reverse={false}
        stats={[
          { value: "< 3 min", label: "Deploy Time" },
          { value: "Silent", label: "Operational Profile" },
        ]}
      />

      <SplitSection
        image="/images/pages/vip-security.jpg"
        label="Event Security"
        title="Securing High-Profile Events"
        description="Public events — summits, conferences, galas, rallies — present a nightmare security scenario: large crowds, open airspace, and predictable schedules that give adversaries time to plan drone attacks. Aegis event security solutions deploy temporary counter-drone perimeters around venues of any size, from intimate board meetings to 50,000-capacity outdoor events. Our advance team surveys the venue, identifies threat corridors, and pre-programs exclusion zones that trigger automatic interdiction when breached. During the event, the system operates alongside existing security infrastructure, correlating aerial threat data with ground-based CCTV and access control systems through a unified PSIM interface. After the event, the entire system packs into standard transit cases for rapid redeployment. Every event deployment includes a dedicated threat analyst who monitors the system and coordinates with the protective detail in real time."
        reverse={true}
        stats={[
          { value: "50,000+", label: "Venue Capacity" },
          { value: "24/7", label: "Analyst Support" },
        ]}
      />

      <QuoteSection
        quote="During the G7 summit, our Aegis suite detected and neutralized seven unauthorized drone flights — including two carrying explosive payloads — without any disruption to the proceedings or awareness by the delegations."
        author="Assistant Director Katherine Mercer"
        role="United States Secret Service, Protective Intelligence Division"
      />

      <SpecTable
        label="Technical Specifications"
        title="VIP Protection System Specifications"
        specs={vipSpecs}
      />

      <CTASection
        title="Protect Your Principals"
        subtitle="Deploy discreet, comprehensive Counter-UAS protection for your executives, dignitaries, and events. Our VIP protection team will design a security architecture matched to your threat profile."
        primaryCta="Request VIP Protection Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Solutions"
        secondaryHref="/solutions"
      />
    </main>
  );
}
