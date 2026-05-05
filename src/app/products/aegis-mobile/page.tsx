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

export default function AegisMobilePage() {
  return (
    <>
      <ProductHero
        image="/images/pages/aegis-mobile-hero.jpg"
        label="Man-Packable"
        title="Aegis Mobile"
        subtitle="Individual soldier counter-UAS protection — precision RF direction-finding and jamming in a man-packable system operational in under 5 minutes."
        specs={[
          { value: "50+", label: "Targets Tracked" },
          { value: "RF DF", label: "Direction Finding" },
          { value: "5min", label: "Setup Time" },
          { value: "4km", label: "Detection Range" },
        ]}
      />

      <Callout>
        Every soldier deserves protection from the skies. Aegis Mobile puts
        counter-UAS capability in the hands of the individual warfighter — no
        vehicle, no base infrastructure, no compromise.
      </Callout>

      <SplitSection
        image="/images/pages/aegis-mobile-portable.jpg"
        label="Portability"
        title="One Soldier. One System."
        description="Aegis Mobile is the culmination of three generations of miniaturization engineering. The entire system — directional antenna array, RF processing unit, battery pack, and operator interface — weighs 12.4 kg and packs into a standard military assault frame. The carbon-fiber mast deploys to 2.1 meters in under 90 seconds, elevating the antenna array above the operator for optimal signal reception. The system is designed to be carried on foot for up to 25 km alongside standard combat load. No external power, no vehicle required, no compromise on capability. When the patrol stops, Aegis Mobile is operational before the perimeter is set."
        stats={[
          { value: "12.4kg", label: "Total Weight" },
          { value: "90sec", label: "Mast Deploy" },
          { value: "25km", label: "March Load" },
        ]}
      />

      <SplitSection
        image="/images/pages/mobile-field.jpg"
        label="RF Detection"
        title="Precision Direction Finding"
        description="At the core of Aegis Mobile is a 6-element phased array antenna that provides precision RF direction finding across the full UAS communication spectrum — 400 MHz to 6 GHz. The system detects and locates drone command links, video downlinks, and autopilot telemetry with bearing accuracy of ±3° at 4 km range. When a threat is detected, the integrated wideband jammer disrupts the command link and GPS reception simultaneously, forcing the drone to enter failsafe mode. The adaptive jamming algorithm minimizes spectral footprint to avoid disrupting friendly communications, targeting only the specific frequency bands used by the identified threat. For swarm scenarios, the system can cycle jamming across multiple threat frequencies at 100ms intervals."
        reverse
        stats={[
          { value: "±3°", label: "Bearing Accuracy" },
          { value: "400M–6G", label: "Frequency Range" },
          { value: "100ms", label: "Swarm Cycling" },
        ]}
      />

      <SplitSection
        image="/images/pages/mobile-tactical.jpg"
        label="Field Operations"
        title="Built for the Pointy End"
        description="Aegis Mobile was designed with direct input from infantry and special operations forces across eight nations. Every component has been tested to MIL-STD-810H standards — salt fog, sand and dust, rain, humidity, altitude, and thermal shock. The operator interface uses a ruggedized 5-inch daylight-readable display with glove-compatible touch input. Threat alerts are delivered through haptic feedback on the operator's wrist and through the standard tactical headset. When networked with other Aegis Mobile units or an Aegis Tactical platform, multiple soldier-carried systems triangulate threat positions to provide range estimation in addition to bearing — transforming a patrol into a distributed sensor network."
        stats={[
          { value: "810H", label: "MIL-STD Rating" },
          { value: "6hr", label: "Battery Life" },
          { value: "Multi", label: "Unit Triangulation" },
        ]}
      />

      <ImageBreak image="/images/pages/mobile-tactical.jpg" height="50vh" />

      <StatsSection
        label="Mobile Performance"
        stats={[
          { value: "50+", label: "Targets Tracked" },
          { value: "4km", label: "Detection Range" },
          { value: "12.4kg", label: "System Weight" },
          { value: "6hr", label: "Battery Endurance" },
          { value: "5min", label: "Setup Time" },
        ]}
      />

      <SpecTable
        label="Technical Specifications"
        title="Aegis Mobile — Full Specification"
        specs={[
          { label: "Detection Range", value: "4 km (RF command link)" },
          { label: "Tracking Capacity", value: "50+ simultaneous targets" },
          { label: "Direction Finding Accuracy", value: "±3° bearing at 4 km" },
          { label: "Frequency Range", value: "400 MHz – 6 GHz" },
          { label: "Jamming Output", value: "20W per band (4 concurrent bands)" },
          { label: "Jamming Modes", value: "Targeted, sweep, barrage, adaptive" },
          { label: "Classification Accuracy", value: "95.2% (RF signature only)" },
          { label: "Classification Latency", value: "<200 ms" },
          { label: "Setup Time", value: "5 minutes (full operational)" },
          { label: "System Weight", value: "12.4 kg (complete with battery)" },
          { label: "Mast Height", value: "2.1 m (carbon fiber, 90 sec deploy)" },
          { label: "Battery Endurance", value: "6 hours (continuous operation)" },
          { label: "Battery Type", value: "BB-2590/U (standard military)" },
          { label: "Operating Temperature", value: "-32°C to +49°C" },
          { label: "Environmental Rating", value: "MIL-STD-810H, IP67" },
          { label: "Display", value: "5-inch daylight-readable, glove-compatible" },
          { label: "Alert Delivery", value: "Haptic + tactical headset + visual" },
          { label: "Networking", value: "MANET radio, ATAK integration" },
          { label: "Classification", value: "NATO RESTRICTED / ITAR Controlled" },
          { label: "MTBF", value: ">5,000 hours" },
        ]}
      />

      <CTASection
        title="Protect Every Soldier"
        subtitle="Aegis Mobile is fielded with infantry and special operations units across 6 nations. Evaluate man-packable counter-UAS for your dismounted operations."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Platforms"
        secondaryHref="/products"
      />
    </>
  );
}
