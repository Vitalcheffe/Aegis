"use client";

import {
  SectionHero,
  Callout,
  SplitSection,
  SpecTable,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function DetectionPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/detection-hero.jpg"
        label="Detection"
        title="See Everything. Miss Nothing."
        subtitle="Multi-spectral sensor fusion provides 360° coverage across radar, RF, electro-optical, infrared, and acoustic domains — ensuring no threat enters your airspace undetected."
        cta="Request Briefing"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="left"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Aegis deploys four complementary detection modalities — S-Band radar,
        RF direction finding, EO/IR sensors, and acoustic arrays — fusing their
        outputs in real-time to produce a single, authoritative air picture with
        98.9% probability of detection and fewer than one false alarm per day.
      </Callout>

      <AnimatedLine />

      {/* ── S-BAND RADAR ── */}
      <SplitSection
        image="/images/pages/detection-radar.jpg"
        label="Sensor Modality 01"
        title="S-Band Radar"
        description="The primary detection sensor. Aegis S-Band radar delivers 360° azimuth coverage with electronically steered beams, detecting micro-drones with 0.01 m² RCS at 15 km and fixed-wing UAVs with 0.1 m² RCS at 35 km. Advanced clutter suppression algorithms filter birds, weather, and ground returns — reducing false alarms by 95% compared to legacy systems. Simultaneous multi-beam operation enables detection of low, slow, and small threats in complex terrain including urban canyons and mountainous regions."
        cta="Explore Tracking"
        ctaHref="/capabilities/tracking"
        stats={[
          { value: "35 km", label: "Fixed-Wing Range" },
          { value: "0.01 m²", label: "Min RCS" },
        ]}
      />

      {/* ── RF DIRECTION FINDING ── */}
      <SplitSection
        image="/images/pages/detection-rf.jpg"
        label="Sensor Modality 02"
        title="RF Direction Finding"
        description="Passive RF sensors detect, locate, and classify drone command-and-control links up to 25 km away — before the aircraft enters radar range. Multi-channel digital receivers scan the full 300 MHz to 6 GHz spectrum, identifying over 200 commercial and military drone protocols including encrypted and frequency-hopping links. Angle-of-arrival triangulation from distributed nodes provides emitter geolocation with CEP under 50 meters, enabling proactive threat warning and pre-emptive classification based on signal fingerprinting."
        cta="Explore Classification"
        ctaHref="/capabilities/classification"
        reverse
        stats={[
          { value: "25 km", label: "RF Detection Range" },
          { value: "200+", label: "Protocols Identified" },
        ]}
      />

      {/* ── EO/IR SENSORS ── */}
      <SplitSection
        image="/images/pages/detection-eoir.jpg"
        label="Sensor Modality 03"
        title="EO/IR Sensors"
        description="High-resolution electro-optical and infrared cameras provide visual confirmation and forensic-grade imagery for threat identification and evidentiary documentation. Dual-band sensors operate across visible and mid-wave infrared spectra, maintaining target acquisition in daylight, darkness, fog, and smoke. Automated slew-to-cue from radar and RF detection enables visual lock within 1.2 seconds of initial sensor alert. Continuous optical tracking supplements radar during ECM scenarios and provides the visual feed necessary for rules-of-engagement compliance verification."
        cta="Explore Neutralization"
        ctaHref="/capabilities/neutralization"
        stats={[
          { value: "1.2 s", label: "Slew-to-Cue" },
          { value: "Dual-Band", label: "Visible + MWIR" },
        ]}
      />

      {/* ── ACOUSTIC ARRAYS ── */}
      <SplitSection
        image="/images/pages/detection-acoustic.jpg"
        label="Sensor Modality 04"
        title="Acoustic Arrays"
        description="Distributed microphone arrays detect and classify drone acoustic signatures at ranges up to 5 km, providing a critical last-line detection layer that operates independently of electromagnetic spectrum availability. Deep acoustic fingerprinting models trained on 4 million flight hours distinguish drone motor harmonics from background noise — including urban environments, highways, and industrial facilities. Acoustic detection is immune to RF jamming and radar cross-section reduction, making it the only sensor modality effective against stealth-configured UAVs."
        cta="Explore All Capabilities"
        ctaHref="/capabilities"
        reverse
        stats={[
          { value: "5 km", label: "Acoustic Range" },
          { value: "4M+", label: "Training Hours" },
        ]}
      />

      {/* ── SPEC TABLE ── */}
      <SpecTable
        label="Technical Specifications"
        title="Detection Performance"
        specs={[
          { label: "Radar Band", value: "S-Band (2–4 GHz)" },
          { label: "Azimuth Coverage", value: "360°" },
          { label: "Elevation Coverage", value: "−5° to +85°" },
          { label: "Micro-Drone Detection (0.01 m²)", value: "15 km" },
          { label: "Fixed-Wing Detection (0.1 m²)", value: "35 km" },
          { label: "RF Detection Range", value: "25 km" },
          { label: "RF Spectrum Coverage", value: "300 MHz – 6 GHz" },
          { label: "Protocols Identified", value: "200+" },
          { label: "EO/IR Slew-to-Cue", value: "<1.2 s" },
          { label: "Acoustic Detection Range", value: "5 km" },
          { label: "Probability of Detection", value: "98.9%" },
          { label: "False Alarm Rate", value: "<1 per day" },
          { label: "Sensor Fusion Latency", value: "<50 ms" },
          { label: "Simultaneous Targets", value: "500+" },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Detect Before They Arrive"
        subtitle="See how Aegis multi-spectral detection provides the earliest possible warning — giving operators the time and confidence to act decisively."
        primaryCta="Request Briefing"
        primaryHref="/request-demo"
        secondaryCta="Next: Tracking"
        secondaryHref="/capabilities/tracking"
      />
    </>
  );
}
