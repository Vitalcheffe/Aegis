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

export default function AegisTacticalPage() {
  return (
    <>
      <ProductHero
        image="/images/pages/aegis-tactical-hero.jpg"
        label="Mobile Platform"
        title="Aegis Tactical"
        subtitle="Rapid-deploy counter-UAS capability for forward operating bases and expeditionary operations — full operational capability in under 30 minutes from arrival on station."
        specs={[
          { value: "200+", label: "Simultaneous Targets" },
          { value: "25Hz", label: "Update Rate" },
          { value: "30min", label: "Deploy Time" },
          { value: "8km", label: "Detection Range" },
        ]}
      />

      <Callout>
        When the forward edge of the battle area moves, your counter-UAS
        protection must move with it. Aegis Tactical brings the full weight of
        the Aegis architecture to any location on the planet — in under thirty
        minutes.
      </Callout>

      <SplitSection
        image="/images/pages/aegis-tactical-mobile.jpg"
        label="Mobility"
        title="Born to Deploy"
        description="Aegis Tactical is engineered from the ground up for mobile operations. The complete system — sensors, processors, effectors, and communications — is integrated into a single vehicle-mountable platform that can be airlifted by C-130, CH-47 Chinook, or standard military flatbed. Upon arrival at a forward operating position, the hydraulic mast elevates the sensor suite to operational height while automated calibration routines bring all systems online. No external power infrastructure required — the onboard generator provides 72 hours of continuous operation on a single fuel load. The entire system is designed to pack down and redeploy in under 20 minutes when the tactical situation demands."
        stats={[
          { value: "30min", label: "Full Deployment" },
          { value: "20min", label: "Redeploy" },
          { value: "C-130", label: "Airlift Compatible" },
        ]}
      />

      <SplitSection
        image="/images/pages/aegis-tactical-deploy.jpg"
        label="Rapid Setup"
        title="Operational in Minutes, Not Days"
        description="Traditional fixed-site C-UAS installations require weeks of site preparation, sensor calibration, and network integration. Aegis Tactical eliminates that timeline entirely. Automated self-survey and GPS-denied positioning algorithms establish the sensor baseline within 8 minutes of mast elevation. Pre-loaded terrain databases and digital elevation models enable immediate clutter filtering, while the AI classification engine arrives pre-trained with the theater-specific threat library. Operators connect via ruggedized tablets with an intuitive touch interface — no specialized C-UAS training required for basic operations. Advanced operators can access the full mission planning suite through the integrated battle management workstation."
        reverse
        stats={[
          { value: "8min", label: "Sensor Calibration" },
          { value: "0", label: "Site Prep Required" },
          { value: "72hr", label: "Endurance" },
        ]}
      />

      <SplitSection
        image="/images/pages/mobile-vehicle.jpg"
        label="Tactical Operations"
        title="Forward Edge Protection"
        description="Aegis Tactical was purpose-built for the realities of forward operating base defense. The system provides layered protection against the full spectrum of UAS threats — from commercially modified quadcopters conducting ISR to military-grade fixed-wing UAVs delivering precision munitions. The integrated RF detection array identifies drone command links at 8km, while the compact radar provides 3D track data on targets as small as 0.001m² RCS. When threats penetrate the detection layer, the onboard effector suite — RF jamming and GPS spoofing — provides non-kinetic neutralization with zero collateral effects. For high-value threats, Aegis Tactical coordinates with Aegis Core or other networked platforms to assign kinetic effectors through the Aegis Command battle management network."
        stats={[
          { value: "0.001m²", label: "Min RCS Detection" },
          { value: "8km", label: "RF Detection" },
          { value: "360°", label: "Coverage" },
        ]}
      />

      <ImageBreak image="/images/pages/mobile-vehicle.jpg" height="50vh" />

      <StatsSection
        label="Tactical Performance"
        stats={[
          { value: "200+", label: "Targets Tracked" },
          { value: "25Hz", label: "Update Rate" },
          { value: "30min", label: "Deploy Time" },
          { value: "8km", label: "Detection Range" },
          { value: "72hr", label: "Endurance" },
        ]}
      />

      <SpecTable
        label="Technical Specifications"
        title="Aegis Tactical — Full Specification"
        specs={[
          { label: "Detection Range", value: "8 km (small UAS Class I)" },
          { label: "Tracking Capacity", value: "200+ simultaneous targets" },
          { label: "Update Rate", value: "25 Hz" },
          { label: "Classification Accuracy", value: "98.7%" },
          { label: "Classification Latency", value: "<35 ms" },
          { label: "Sensor Modalities", value: "Radar, EO/IR, RF" },
          { label: "Effector Types", value: "RF Jamming, GPS Spoofing" },
          { label: "Engagement Time", value: "<5 seconds (detect-to-neutralize)" },
          { label: "Coverage", value: "360° azimuth, -5° to +80° elevation" },
          { label: "Deployment Time", value: "30 minutes (full operational)" },
          { label: "Redeployment Time", value: "20 minutes" },
          { label: "Airlift", value: "C-130, CH-47, flatbed" },
          { label: "Power", value: "Onboard generator (72hr endurance)" },
          { label: "Weight (System Total)", value: "3,400 kg" },
          { label: "Operating Temperature", value: "-32°C to +50°C" },
          { label: "Wind Survival", value: "Up to 120 km/h" },
          { label: "Crew Requirement", value: "2 operators (1 in autonomous mode)" },
          { label: "Communications", value: "STANAG 4586, tactical radio, SATCOM" },
          { label: "Classification", value: "NATO RESTRICTED / ITAR Controlled" },
          { label: "MTBF", value: ">8,000 hours" },
        ]}
      />

      <CTASection
        title="Deploy Anywhere"
        subtitle="Aegis Tactical is combat-proven in expeditionary environments. Schedule an evaluation for your forward operating base protection requirements."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Platforms"
        secondaryHref="/products"
      />
    </>
  );
}
