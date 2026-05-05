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

const prisonSpecs = [
  { label: "Detection Range", value: "5 km radius" },
  { label: "Tracking Capacity", value: "100+ simultaneous targets" },
  { label: "Classification Time", value: "< 1.5 seconds" },
  { label: "Neutralization Range", value: "3 km (selective RF)" },
  { label: "Contraband Intercept Rate", value: "99.4%" },
  { label: "False Alarm Rate", value: "< 0.02 per operating hour" },
  { label: "Coverage", value: "Full facility perimeter + approach corridors" },
  { label: "Integration", value: "CCTV / fence sensor / prison management systems" },
  { label: "Alert Types", value: "Audio / visual / pager / radio / SMS" },
  { label: "Power", value: "Grid / UPS / solar backup" },
  { label: "Weather Rating", value: "IP66 / -30°C to +50°C" },
  { label: "Evidence Package", value: "Automated video + RF recording for prosecution" },
];

export default function PrisonsPage() {
  return (
    <main>
      <SectionHero
        image="/images/pages/prisons-hero.jpg"
        label="Corrections Solutions"
        title="Prisons"
        subtitle="Stopping Contraband from Above"
        cta="Request Briefing"
        ctaHref="/request-demo"
      />

      <SplitSection
        image="/images/pages/prisons-perimeter.jpg"
        label="Drone Interdiction"
        title="The Aerial Contraband Pipeline"
        description="The drone has become the weapon of choice for contraband delivery into correctional facilities — phones, weapons, drugs, and tools dropped into exercise yards from altitude, guided by accomplices operating just beyond the facility perimeter. In 2024, U.S. federal prisons reported over 1,200 confirmed drone contraband attempts, a figure that represents only the incidents that were detected. Aegis prison solutions are specifically tuned for the contraband drone threat profile: small, slow-flying commercial drones approaching from low altitude, often at night. Our system detects these threats at ranges up to 5 kilometers, classifies them by type and payload likelihood, and provides automated interdiction before the drone reaches the facility perimeter. Each interdiction is captured on video with synchronized RF recordings, producing an evidence package that supports prosecution and deters future attempts."
        reverse={false}
        stats={[
          { value: "99.4%", label: "Intercept Rate" },
          { value: "1,200+", label: "Annual Attempts (US Federal)" },
        ]}
      />

      <SplitSection
        image="/images/pages/prison-facility.jpg"
        label="Perimeter Security"
        title="Integrated Perimeter Defense"
        description="Drone threats don't exist in isolation — they are part of a broader perimeter security challenge that includes fence-line breaches, vehicle approaches, and unauthorized personnel. Aegis prison solutions integrate drone detection with existing physical security infrastructure, correlating aerial threat data with CCTV, fence sensors, and access control systems through a unified command interface. When a drone is detected, the system automatically directs PTZ cameras to track it, alerts perimeter patrol staff via radio and pager, and provides the control room with real-time threat visualization. For facilities with multiple housing units, our modular architecture provides zoned coverage that can expand from a single cell block to an entire complex. The system operates 24/7 with minimal staff, making it practical for facilities with limited security budgets."
        reverse={true}
        stats={[
          { value: "24/7", label: "Autonomous Monitoring" },
          { value: "< 1.5s", label: "Classification Time" },
        ]}
      />

      <QuoteSection
        quote="We went from intercepting one drone a month to catching them every week — not because there are more drones, but because we can finally see them. Aegis changed the entire security equation at our facility."
        author="Warden Marcus Coleman"
        role="Federal Correctional Complex, Florence"
      />

      <SpecTable
        label="Technical Specifications"
        title="Prison Counter-UAS System Specifications"
        specs={prisonSpecs}
      />

      <CTASection
        title="Secure Your Facility"
        subtitle="Stop contraband drones before they reach your perimeter. Our corrections team will design a Counter-UAS system integrated with your existing security infrastructure and budget."
        primaryCta="Request Corrections Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Solutions"
        secondaryHref="/solutions"
      />
    </main>
  );
}
