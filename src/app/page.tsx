"use client";

import {
  SectionHero,
  Callout,
  StatsSection,
  FeatureList,
  ImageBreak,
  SplitSection,
  SpecTable,
  CTASection,
  QuoteSection,
  ScrollReveal,
  AnimatedLine,
  KillChainDiagram,
} from "@/components/sections";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/homepage-hero.jpg"
        label="Aegis Defense Systems"
        title="The Future of Counter-UAS Defense"
        subtitle="Multi-spectral detection, AI-driven classification, and precision neutralization — a single integrated platform that closes the kill chain in under 20 milliseconds."
        cta="Request Demo"
        ctaHref="/request-demo"
        gradient="from-black via-black/80 to-black/50"
        align="center"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Our software detects, classifies, and neutralizes unmanned aerial threats
        in real-time — protecting critical infrastructure, military assets, and
        civilian populations worldwide.
      </Callout>

      {/* ── STATS ── */}
      <StatsSection
        label="By the Numbers"
        stats={[
          { value: "12", label: "Nations" },
          { value: "240+", label: "Systems Deployed" },
          { value: "500+", label: "Threats Neutralized" },
          { value: "1M+", label: "Operational Hours" },
          { value: "98.9%", label: "Detection Accuracy" },
        ]}
      />

      {/* ── INTERACTIVE KILL CHAIN ── */}
      <KillChainDiagram />

      {/* ── IMAGE BREAK ── */}
      <ImageBreak
        image="/images/pages/homepage-callout.jpg"
        height="60vh"
        overlay="bg-black/50"
      />

      {/* ── SOLUTIONS: MILITARY ── */}
      <SplitSection
        image="/images/pages/military-hero.jpg"
        label="Solutions"
        title="Military & Defense"
        description="Forward operating bases, convoy protection, and naval deployments demand a counter-UAS solution that operates in contested electromagnetic environments. Aegis provides hardened, NATO-interoperable systems with STANAG 4671 compliance, automatic threat prioritization, and seamless integration with existing C2 infrastructure including ATAK and JADC2."
        cta="Explore Military Solutions"
        ctaHref="/solutions/military"
        stats={[
          { value: "35 km", label: "Detection Range" },
          { value: "<2 s", label: "Engagement Time" },
        ]}
      />

      {/* ── SOLUTIONS: CRITICAL INFRASTRUCTURE ── */}
      <SplitSection
        image="/images/pages/infrastructure-hero.jpg"
        label="Solutions"
        title="Critical Infrastructure"
        description="Power plants, data centers, and government facilities face persistent drone surveillance and attack risks. Aegis provides persistent 24/7 surveillance with automated alert escalation, geofenced exclusion zones, and graduated response that scales from warning to neutralization — all while maintaining compliance with civilian airspace regulations and minimizing collateral interference."
        cta="Explore Infrastructure Solutions"
        ctaHref="/solutions/critical-infrastructure"
        reverse
        stats={[
          { value: "24/7", label: "Persistent Watch" },
          { value: "0", label: "False Positives per Day" },
        ]}
      />

      {/* ── IMAGE BREAK ── */}
      <ImageBreak
        image="/images/pages/airdefense-hero.jpg"
        height="50vh"
        overlay="bg-black/40"
      />

      {/* ── SOLUTIONS: AIRPORTS ── */}
      <SplitSection
        image="/images/pages/airports-hero.jpg"
        label="Solutions"
        title="Airport Security"
        description="Drone incursions at airports have caused thousands of flight cancellations and millions in economic damage. Aegis delivers spectrum-safe detection and non-kinetic neutralization that protects runways and terminals without interfering with ATC communications, navigation aids, or passenger Wi-Fi systems. Fully compliant with ICAO and FAA requirements."
        cta="Explore Airport Solutions"
        ctaHref="/solutions/airports"
        stats={[
          { value: "0", label: "ATC Interference" },
          { value: "99.7%", label: "Uptime SLA" },
        ]}
      />

      {/* ── SOLUTIONS: BORDER SECURITY ── */}
      <SplitSection
        image="/images/pages/border-hero.jpg"
        label="Solutions"
        title="Border Security"
        description="Cartels and smugglers increasingly use drones for surveillance, payload delivery, and tunnel mapping. Aegis deploys along extended border perimeters with distributed sensor networks, long-range RF detection, and coordinated multi-node neutralization that covers hundreds of kilometers of terrain with centralized command visibility."
        cta="Explore Border Solutions"
        ctaHref="/solutions/border-security"
        reverse
        stats={[
          { value: "200+ km", label: "Perimeter Coverage" },
          { value: "12+", label: "Sensor Nodes" },
        ]}
      />

      {/* ── IMAGE BREAK ── */}
      <ImageBreak
        image="/images/pages/maritime-hero.jpg"
        height="55vh"
        overlay="bg-black/50"
      />

      {/* ── PRODUCTS PREVIEW ── */}
      <FeatureList
        label="Product Suite"
        title="Eight Platforms. One Mission."
        items={[
          {
            title: "Aegis Core",
            description:
              "The foundational command-and-control platform. Fuses all sensor feeds, orchestrates the kill chain, and provides the common operating picture for decision-makers at every echelon.",
            href: "/products/aegis-core",
            tag: "C2 Platform",
          },
          {
            title: "Aegis Tactical",
            description:
              "Man-portable counter-UAS system for dismounted operations. Lightweight, rapid-deployable, and fully autonomous — designed for the tactical edge where connectivity is limited.",
            href: "/products/aegis-tactical",
            tag: "Man-Packable",
          },
          {
            title: "Aegis Mobile",
            description:
              "Vehicle-mounted system for convoy protection and mobile command. Integrates with existing vehicle power and communications, providing on-the-move detection and neutralization.",
            href: "/products/aegis-mobile",
            tag: "Vehicle-Mounted",
          },
          {
            title: "Aegis Shield",
            description:
              "Fixed-site persistent defense system for installations and critical infrastructure. Multi-layered sensor array with automated graduated response and 99.97% operational availability.",
            href: "/products/aegis-shield",
            tag: "Fixed-Site",
          },
          {
            title: "Aegis SkyWatch",
            description:
              "Airborne counter-UAS payload for UAV-on-UAV engagement. Extends the detection and neutralization envelope beyond line-of-sight, enabling over-the-hill and urban canyon operations.",
            href: "/products/aegis-skywatch",
            tag: "Airborne",
          },
          {
            title: "Aegis Command",
            description:
              "Enterprise-level multi-site management. Provides centralized oversight of distributed Aegis installations with unified threat correlation, resource allocation, and strategic reporting.",
            href: "/products/aegis-command",
            tag: "Enterprise",
          },
          {
            title: "Aegis Sentinel",
            description:
              "Autonomous AI-powered monitoring node. Operates independently for up to 72 hours, providing early warning and sensor data relay in austere or contested environments.",
            href: "/products/aegis-sentinel",
            tag: "Autonomous",
          },
          {
            title: "Aegis Integrator",
            description:
              "Middleware platform that connects Aegis to third-party sensors, effectors, and command networks. Supports STANAG, JADC2, ATAK, and custom API integrations with zero-latency data bridging.",
            href: "/products/aegis-integrator",
            tag: "Integration",
          },
        ]}
      />

      {/* ── QUOTE ── */}
      <QuoteSection
        quote="Aegis transformed our counter-UAS posture overnight. What previously required four separate systems and twelve operators now runs on a single platform with three. The speed from detection to neutralization is unlike anything we've deployed — and we've tested them all."
        author="Lieutenant General Marcus Hartley"
        role="NATO Joint Force Command — Chief of Air and Missile Defense"
      />

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── CTA ── */}
      <CTASection
        title="Ready to Defend Your Airspace?"
        subtitle="Schedule a classified briefing with our defense team and discover how Aegis can protect your most critical assets."
        primaryCta="Request Demo"
        primaryHref="/request-demo"
        secondaryCta="Explore Capabilities"
        secondaryHref="/capabilities"
      />
    </>
  );
}
