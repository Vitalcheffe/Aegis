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

export default function AegisCommandPage() {
  return (
    <>
      <ProductHero
        image="/images/pages/aegis-command-hero.jpg"
        label="Battle Management"
        title="Aegis Command"
        subtitle="Unified C2 system for coordinating multi-platform counter-UAS operations — integrating kill chain automation, multi-domain coordination, and real-time situational awareness."
        specs={[
          { value: "Unified", label: "C2 Architecture" },
          { value: "Full", label: "Kill Chain Automation" },
          { value: "Multi", label: "Domain Coordination" },
          { value: "1000+", label: "Managed Tracks" },
        ]}
      />

      <Callout>
        In the counter-UAS fight, seconds decide outcomes. Aegis Command
        compresses the kill chain from detection to neutralization into an
        automated decision cycle — giving commanders the speed to defeat threats
        that outpace human reaction time.
      </Callout>

      <SplitSection
        image="/images/pages/aegis-command-battle.jpg"
        label="Battle Management"
        title="One Picture. One Command."
        description="Aegis Command provides a unified operational picture by aggregating track data, threat assessments, and effector status from every sensor and platform in the Aegis family — and from third-party systems through Aegis Integrator. The common operating picture displays all air contacts, classified threats, protected zones, engagement zones, and effector coverage in a single geospatial interface that scales from strategic national view down to tactical operator level. Commanders exercise authority through role-based rules of engagement that govern automated engagement authorizations — from fully autonomous detect-to-neutralize cycles for pre-authorized threat classes to human-in-the-loop authorization for high-value or ambiguous targets. The battle management engine prioritizes threats by mission impact, selects optimal effectors, deconflicts engagements across platforms, and manages resource allocation across the defensive array."
        stats={[
          { value: "1,000+", label: "Managed Tracks" },
          { value: "<2s", label: "Kill Chain Cycle" },
          { value: "Role", label: "Based ROE" },
        ]}
      />

      <SplitSection
        image="/images/pages/command-dashboard.jpg"
        label="Kill Chain Automation"
        title="From Detect to Neutralize in Seconds"
        description="The kill chain automation engine is the operational core of Aegis Command. It implements a configurable decision framework that automates the detect-track-classify-assess-engage cycle according to mission-specific rules of engagement. When a threat is classified, the automation engine assesses it against the ROE matrix — evaluating target type, threat priority, proximity to protected assets, and collateral risk — to determine the appropriate response. For pre-authorized threat categories (e.g., confirmed hostile UAVs within the weapons engagement zone), the system autonomously selects and assigns the optimal effector, executes the engagement, and reports the result. For ambiguous or high-collateral-risk scenarios, the system presents the commander with a threat assessment package and recommended action, awaiting authorization before engagement. The entire automated cycle completes in under 2 seconds — compared to the 15-30 second human-only decision cycle that adversaries exploit."
        reverse
        stats={[
          { value: "<2s", label: "Automated Cycle" },
          { value: "15-30s", label: "Human-Only Baseline" },
          { value: "0", label: "Successful Penetrations" },
        ]}
      />

      <SplitSection
        image="/images/pages/command-operations.jpg"
        label="Multi-Domain Coordination"
        title="Air, Ground, Sea, Cyber — Unified"
        description="Modern UAS threats operate across domain boundaries — launched from land or sea, communicating via satellite links, and coordinated through cyber-enabled command networks. Aegis Command coordinates counter-UAS operations across all relevant domains through its multi-domain integration framework. Air domain sensors provide the primary detection and tracking picture. Ground domain assets — Aegis Mobile units, ground-based radars, MANPADS teams — contribute local sensor data and constitute the inner layer of the defensive array. Maritime domain integration brings ship-based radar and effector data for coastal and littoral operations. Cyber domain intelligence feeds provide advance warning of UAS operations through signals intelligence and network exploitation products. This multi-domain coordination ensures that no threat escapes the defensive net by crossing jurisdictional or domain boundaries."
        stats={[
          { value: "4", label: "Domains Integrated" },
          { value: "STANAG", label: "Compliant" },
          { value: "Coalition", label: "Ready" },
        ]}
      />

      <ImageBreak image="/images/pages/command-decision.jpg" height="50vh" />

      <StatsSection
        label="Command Performance"
        stats={[
          { value: "1,000+", label: "Managed Tracks" },
          { value: "<2s", label: "Kill Chain" },
          { value: "4", label: "Domains" },
          { value: "24", label: "Concurrent Engagements" },
          { value: "99.9%", label: "System Availability" },
        ]}
      />

      <SpecTable
        label="Technical Specifications"
        title="Aegis Command Specifications"
        specs={[
          { category: "Performance" },
          { label: "Track Management", value: "1,000+ concurrent tracks" },
          { label: "Kill Chain Cycle (Automated)", value: "<2 seconds" },
          { label: "Kill Chain Cycle (Human-Auth)", value: "<8 seconds" },
          { label: "Concurrent Engagements", value: "Up to 24 managed" },
          { label: "System Availability", value: "99.9%" },
          { label: "COP Latency", value: "<50 ms (track-to-display)" },
          { label: "Domain Coverage", value: "Air, Ground, Maritime, Cyber" },
          { category: "Sensors" },
          { label: "AI Processing", value: "300 TOPS (server cluster)" },
          { label: "Threat Library", value: "2,800+ UAS models, 47 countries" },
          { label: "Platform Integration", value: "All Aegis platforms + third-party" },
          { label: "ROE Engine", value: "Configurable, role-based, automated" },
          { label: "Cyber Integration", value: "SIGINT feeds, network Intel, I&W" },
          { category: "Physical" },
          { label: "Power Consumption", value: "12 kW (server), 200W per workstation" },
          { label: "Operator Workstations", value: "1–16 concurrent operators" },
          { label: "Architecture", value: "Client-server, distributed, redundant" },
          { label: "Deployment", value: "Fixed site, mobile shelter, cloud-hosted" },
          { label: "COP Display", value: "Geospatial, multi-resolution, multi-level" },
          { category: "Environmental" },
          { label: "Operating Temperature", value: "-20°C to +50°C (sheltered)" },
          { label: "MIL-STD Compliance", value: "810H (shelter), 461G (EMI)" },
          { label: "Recording & Replay", value: "Full mission recording, after-action review" },
          { label: "MTBF", value: ">20,000 hours (server cluster)" },
          { category: "Connectivity" },
          { label: "Network Interfaces", value: "Fiber, SATCOM, tactical radio, VPN" },
          { label: "Interoperability", value: "STANAG 4586, Link 16, NATO C2, JADC2" },
          { label: "Security", value: "MLS, cross-domain solution, Type 1 encryption" },
          { label: "Classification", value: "NATO SECRET / ITAR Controlled" },
        ]}
      />

      <CTASection
        title="Command the Kill Chain"
        subtitle="Aegis Command transforms multi-platform counter-UAS operations into a unified, automated, and decisive defensive system. Evaluate C2 integration for your force."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore All Platforms"
        secondaryHref="/products"
      />
    </>
  );
}
