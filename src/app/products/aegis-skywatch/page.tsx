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

export default function AegisSkyWatchPage() {
  return (
    <>
      <ProductHero
        image="/images/pages/aegis-skywatch-hero.jpg"
        label="Air Surveillance"
        title="Aegis SkyWatch"
        subtitle="Long-range persistent air surveillance extending the counter-UAS defensive perimeter to 50 km — strategic air sovereignty for nations and critical national infrastructure."
        specs={[
          { value: "50km+", label: "Detection Range" },
          { value: "24/7", label: "Persistent Coverage" },
          { value: "300+", label: "Targets Tracked" },
          { value: "Multi", label: "Domain Awareness" },
        ]}
      />

      <Callout>
        The threat doesn't stop at twelve kilometers. Aegis SkyWatch extends the
        defensive perimeter to fifty kilometers and beyond — providing the
        strategic air picture that enables proactive defense, not reactive
        response.
      </Callout>

      <SplitSection
        image="/images/pages/skywatch-aerial.jpg"
        label="Long-Range Detection"
        title="See Further. React Sooner."
        description="Aegis SkyWatch deploys elevated sensor arrays — mast-mounted, aerostat-borne, or tower-integrated — that extend the UAS detection horizon far beyond ground-level limitations. The primary surveillance radar provides 3D track data on targets with RCS as low as 0.005m² at 50 km range, enabling detection of small quadcopters and nano-UAS well before they enter the engagement zone of shorter-range systems. The secondary AESA radar supplements coverage in the lower altitude band where terrain masking degrades primary radar performance. Electro-optical and infrared cameras on stabilized platforms provide visual confirmation and classification at extended ranges, while the RF surveillance suite detects and geolocates drone command links and telemetry transmissions at distances exceeding 70 km. This layered sensor architecture ensures no approach vector goes unmonitored."
        stats={[
          { value: "50km", label: "Radar Detection" },
          { value: "70km", label: "RF Detection" },
          { value: "0.005m²", label: "Min RCS" },
        ]}
      />

      <SplitSection
        image="/images/pages/skywatch-earth.jpg"
        label="Persistent Coverage"
        title="Unblinking Watch"
        description="Aegis SkyWatch is engineered for continuous, unattended operation across months of persistent deployment. The system architecture eliminates single points of failure — dual-redundant processing chains, hot-swappable sensor modules, and automated fault detection ensure the surveillance picture is never interrupted. The operational concept supports 24/7 autonomous surveillance with human-in-the-loop oversight for threat confirmation and engagement authorization. Automated health monitoring predicts component degradation before failure occurs, triggering maintenance alerts with 72-hour advance notice. The system has demonstrated 99.97% operational availability across 18 months of continuous deployed operation — providing the persistent air picture that strategic defense demands."
        reverse
        stats={[
          { value: "99.97%", label: "Availability" },
          { value: "24/7", label: "Autonomous Ops" },
          { value: "72hr", label: "Predictive Maintenance" },
        ]}
      />

      <SplitSection
        image="/images/pages/skywatch-monitor.jpg"
        label="Multi-Domain Awareness"
        title="Beyond the Air Picture"
        description="Aegis SkyWatch integrates air surveillance data with ground and maritime domain awareness to provide a comprehensive multi-domain operational picture. The system correlates UAS tracks with ground movement patterns to identify launch and recovery sites, enabling offensive counter-UAS operations against adversary drone infrastructure. Maritime surface tracks from coastal radar installations are fused with low-altitude UAS detections to identify seaborne drone launch platforms. The integrated intelligence picture feeds directly into Aegis Command for battle management, and through Aegis Integrator to third-party C2 systems and coalition networks. SkyWatch also supports civil air traffic integration — Mode S/ADS-B receivers correlate commercial and general aviation tracks with the UAS surveillance picture, enabling immediate discrimination between legitimate air traffic and hostile drones."
        stats={[
          { value: "3", label: "Domains Covered" },
          { value: "ADS-B", label: "Civil Integration" },
          { value: "STANAG", label: "Coalition Ready" },
        ]}
      />

      <ImageBreak image="/images/pages/skywatch-earth.jpg" height="50vh" />

      <StatsSection
        label="SkyWatch Performance"
        stats={[
          { value: "50km+", label: "Detection Range" },
          { value: "300+", label: "Targets Tracked" },
          { value: "99.97%", label: "Availability" },
          { value: "24/7", label: "Persistent Ops" },
          { value: "3", label: "Domains" },
        ]}
      />

      <SpecTable
        label="Technical Specifications"
        title="Aegis SkyWatch Specifications"
        specs={[
          { category: "Performance" },
          { label: "Detection Range (Primary Radar)", value: "50+ km (0.005 m² RCS target)" },
          { label: "Detection Range (RF)", value: "70+ km (command link)" },
          { label: "Tracking Capacity", value: "300+ concurrent targets" },
          { label: "Classification Accuracy", value: "98.1% (multi-modal)" },
          { label: "Kill Chain Closure", value: "<80 ms" },
          { label: "Update Rate", value: "12 Hz (primary), 25 Hz (secondary)" },
          { label: "Min RCS Detection", value: "0.005 m²" },
          { label: "Coverage", value: "360° azimuth, -5° to +85° elevation" },
          { label: "Operational Availability", value: "99.97%" },
          { category: "Sensors" },
          { label: "AI Processing", value: "200 TOPS" },
          { label: "Primary Radar", value: "3D surveillance, L-band" },
          { label: "Secondary Radar", value: "AESA, lower altitude band" },
          { label: "RF Sensing Range", value: "70 MHz – 18 GHz" },
          { label: "Sensor Modalities", value: "Primary Radar, AESA, EO/IR, RF, ADS-B" },
          { label: "Domain Integration", value: "Air, Ground, Maritime" },
          { category: "Physical" },
          { label: "Power Consumption", value: "28 kW (operational), 8 kW (standby)" },
          { label: "Weight", value: "6,500 kg (ground configuration)" },
          { label: "Deployment Options", value: "Mast (30m), aerostat, tower, vehicle" },
          { label: "Setup Time", value: "8 hours (full operational)" },
          { label: "Crew Requirement", value: "3 operators (1 in autonomous mode)" },
          { category: "Environmental" },
          { label: "Operating Temperature", value: "-40°C to +55°C" },
          { label: "MIL-STD Compliance", value: "810H, 461G" },
          { label: "Wind Survival", value: "Up to 180 km/h" },
          { label: "Persistent Operation", value: "24/7 (18+ months demonstrated)" },
          { label: "MTBF", value: ">10,000 hours" },
          { category: "Connectivity" },
          { label: "Network Interfaces", value: "STANAG 4586, Link 16, SATCOM, fiber" },
          { label: "Civil Air Integration", value: "Mode S, ADS-B, NOTAM correlation" },
          { label: "Interoperability", value: "JADC2, NATO C2, coalition networks" },
          { label: "Classification", value: "NATO SECRET / ITAR Controlled" },
        ]}
      />

      <CTASection
        title="Extend Your Perimeter"
        subtitle="Aegis SkyWatch provides the strategic air picture that enables proactive defense. Evaluate long-range persistent surveillance for your national security requirements."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Platforms"
        secondaryHref="/products"
      />
    </>
  );
}
