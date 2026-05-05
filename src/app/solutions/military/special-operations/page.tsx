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

const specOpsSpecs = [
  { label: "System Weight", value: "8.2 kg (man-packable)" },
  { label: "Detection Range", value: "5 km (handheld), 8 km (tripod)" },
  { label: "Tracking Capacity", value: "30+ simultaneous targets" },
  { label: "Neutralization Range", value: "3 km (directional RF)" },
  { label: "Battery Life", value: "6 hours continuous" },
  { label: "Setup Time", value: "< 90 seconds" },
  { label: "Acoustic Signature", value: "0 dB (passive mode)" },
  { label: "EM Emission", value: "Zero (passive) / LPI (active)" },
  { label: "Encryption", value: "Type 1 / AES-256" },
  { label: "Crew", value: "1 operator" },
  { label: "Environmental", value: "MIL-STD-810H, IP68" },
  { label: "Airdrop Rated", value: "MIL-DTL-5541 certified" },
];

export default function SpecialOperationsPage() {
  return (
    <main>
      <SectionHero
        image="/images/pages/specialops-hero.jpg"
        label="Military Solutions"
        title="Special Operations"
        subtitle="Silent. Precise. Effective."
        cta="Request Briefing"
        ctaHref="/request-demo"
      />

      <SplitSection
        image="/images/pages/specialops-stealth.jpg"
        label="Stealth Operations"
        title="Covert Counter-UAS for Denied Areas"
        description="Special operations forces operate in the most demanding environments — behind enemy lines, in contested airspace, and under strict emission control. Aegis special operations systems are engineered from the ground up for stealth. In passive mode, the system emits zero electromagnetic radiation, detecting threats purely through electro-optical and acoustic sensors. When active neutralization is required, low-probability-of-intercept (LPI) RF modes minimize the risk of detection by enemy SIGINT assets. The entire system weighs under 9 kilograms and can be operated by a single warfighter, making it the most capable man-packable counter-drone system ever fielded. Whether conducting a raid, establishing a surveillance post, or exfiltrating under pressure, operators can trust that the sky above them is secure."
        reverse={false}
        stats={[
          { value: "8.2 kg", label: "Total System Weight" },
          { value: "0 dB", label: "Passive Acoustics" },
        ]}
      />

      <SplitSection
        image="/images/pages/specialops-night.jpg"
        label="Man-Packable"
        title="One Operator. Total Coverage."
        description="Traditional counter-drone systems require vehicles, power generators, and teams of operators — luxuries that SOF units cannot afford. Aegis man-packable systems are designed around the individual operator, with an intuitive heads-up display that integrates with existing night vision and helmet systems. Threat alerts appear as directional indicators on the operator's HUD, allowing immediate situational awareness without looking down at a separate screen. Engagement is semi-autonomous: the operator authorizes neutralization, and the system handles frequency selection, directional beam steering, and power optimization automatically. For extended operations, the tripod-mounted configuration expands detection range to 8 kilometers while maintaining full stealth capability. Hot-swappable batteries ensure continuous operation through missions lasting 24 hours or more."
        reverse={true}
        stats={[
          { value: "< 90s", label: "Setup Time" },
          { value: "6 hrs", label: "Battery Life" },
        ]}
      />

      <QuoteSection
        quote="We carried it on a 72-hour recon mission through contested airspace. It detected three enemy drones that our standard EW suite missed completely. The weight penalty was negligible. The capability was priceless."
        author="Master Chief Petty Officer R. Chen"
        role="Naval Special Warfare Development Group"
      />

      <SpecTable
        label="Technical Specifications"
        title="Special Operations System Specifications"
        specs={specOpsSpecs}
      />

      <CTASection
        title="Equip Your Operators"
        subtitle="Man-packable counter-drone capability for the most demanding missions. Our SOF team will configure a system matched to your operational requirements and threat environment."
        primaryCta="Request SOF Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Military Solutions"
        secondaryHref="/solutions/military"
      />
    </main>
  );
}
