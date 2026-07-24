"use client";

import {
  SectionHero,
  Callout,
  Timeline,
  SplitSection,
  QuoteSection,
  CTASection,
  ImageBreak,
  AnimatedLine,
} from "@/components/sections";

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/about-hero.jpg"
        label="About"
        title="The Story of Aegis"
        subtitle="From a garage in Northern Virginia to the most deployed counter-UAS platform in the free world — a decade of relentless engineering, operational feedback, and an unwavering commitment to keeping the skies safe."
        cta="Our Leadership"
        ctaHref="/about/leadership"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        In 2016, three defense engineers sat in a warehouse outside Washington,
        D.C., watching a consumer drone carry a two-kilogram payload across a
        restricted military installation — completely undetected by
        billion-dollar air defense systems. They realized that the age of
        unmanned aerial threats had arrived, and the world was utterly
        unprepared.
      </Callout>

      <AnimatedLine />

      {/* ── TIMELINE ── */}
      <Timeline
        label="Our Journey"
        title="From Vision to Deployment"
        events={[
          {
            year: "2016",
            title: "Founded in Arlington, Virginia",
            description:
              "Dr. Marcus Chen, Sarah Mitchell, and Col. James Harper (Ret.) establish Aegis Defense Systems with $2.5M in seed funding. The founding team identifies a critical gap in existing air defense architectures: no system was designed from the ground up to detect, classify, and neutralize small unmanned aerial systems operating at low altitude and low speed in cluttered environments.",
          },
          {
            year: "2017",
            title: "First Defense Contract Awarded",
            description:
              "Aegis secures its first contract with the U.S. Department of Defense — a $12M program to develop a prototype counter-UAS system for forward operating base protection. The contract validates the team's thesis that integrated, multi-spectral sensor fusion is the only viable approach to the drone threat problem. Development begins on the Aegis Core platform.",
          },
          {
            year: "2018",
            title: "Aegis Core v1.0 Deployed",
            description:
              "The first production Aegis Core system is deployed to a classified location in the U.S. Central Command area of responsibility. Within 72 hours of activation, the system detects and classifies 14 previously unobserved drone incursions — demonstrating the critical gap that existing air defenses had failed to address. Operational feedback from warfighters drives the v1.1 and v1.2 rapid iteration cycles.",
          },
          {
            year: "2019",
            title: "NATO STANAG 4671 Certification",
            description:
              "Aegis becomes the first counter-UAS platform to receive NATO STANAG 4671 certification for Counter-Unmanned Aerial Systems. The certification opens the door to allied nation procurement and establishes Aegis as the de facto standard for interoperable counter-UAS defense. Five NATO member nations begin evaluation programs.",
          },
          {
            year: "2020",
            title: "100th System Deployed Globally",
            description:
              "Despite the global pandemic, Aegis reaches its 100th deployed system milestone — spanning military installations, embassies, airports, and critical infrastructure sites across three continents. The company pivots to remote installation and virtual training, completing 47 deployments during COVID-19 restrictions and proving the system's ease of deployment and minimal on-site requirements.",
          },
          {
            year: "2021",
            title: "Naval Variant Launched",
            description:
              "Aegis launches its naval variant, purpose-engineered for shipboard deployment with stabilized sensor platforms, salt-spray-hardened enclosures, and integration with existing combat management systems. The Royal Navy and U.S. Navy both conduct successful sea trials. The naval variant extends Aegis coverage to maritime choke points, littoral environments, and carrier strike groups.",
          },
          {
            year: "2022",
            title: "$1B Annual Revenue Milestone",
            description:
              "Aegis surpasses $1 billion in annual revenue, driven by escalating global demand for counter-UAS capabilities following high-profile drone incidents at airports, military bases, and critical infrastructure sites. The company expands to 800+ employees across offices in Arlington, London, Tel Aviv, and Singapore. Series D funding round values the company at $2.4 billion.",
          },
          {
            year: "2023",
            title: "12-Nation Deployment Achievement",
            description:
              "Aegis systems are now operational across 12 allied nations, with the company establishing in-country support and training centers in the United Kingdom, Germany, Japan, Australia, and the United Arab Emirates. The Aegis Integrator platform is adopted as the preferred middleware for multi-national counter-UAS interoperability, enabling seamless data sharing between allied forces in joint operations.",
          },
          {
            year: "2024",
            title: "AI-Driven v3.0 Architecture",
            description:
              "Aegis unveils its third-generation architecture, built around a custom AI inference engine capable of processing 12 million signal signatures and classifying threats in under 20 milliseconds. The v3.0 platform introduces autonomous engagement authorization, swarm behavior detection, and predictive threat modeling — reducing operator workload by 80% while increasing neutralization success rates to 99.4%.",
          },
          {
            year: "2025",
            title: "Directed Energy Integration",
            description:
              "Aegis completes integration of directed energy weapons — including high-energy laser and high-power microwave effectors — into the graduated response framework. The directed energy capability provides the first truly unlimited-munition counter-UAS solution, eliminating the logistical constraints of kinetic interceptors. Field demonstrations show sub-second engagement of Group 1 and Group 2 UAS at ranges exceeding 1.5 kilometers.",
          },
        ]}
      />

      {/* ── IMAGE BREAK ── */}
      <ImageBreak
        image="/images/pages/about-origin.jpg"
        height="55vh"
        overlay="bg-black/50"
      />

      {/* ── OUR APPROACH ── */}
      <SplitSection
        image="/images/pages/about-engineering.jpg"
        label="Our Approach"
        title="Engineering-First. Operator-Centered."
        description="Our approach to building defense technology is fundamentally different from the legacy defense industry. We start with the operator — the soldier at the forward operating base, the security officer at the airport, the naval commander on the bridge — and design backwards from their operational reality. This means systems that work in electromagnetic-contested environments, that degrade gracefully rather than fail catastrophically, and that require minimal training to operate under stress. We deploy our engineers to operational sites alongside our customers. Every feature in the Aegis platform was requested, tested, and validated by the men and women who use it daily. Our rapid iteration cycles — measured in weeks, not years — ensure that the system evolves at the pace of the threat, not the pace of the procurement cycle. We believe that the best defense technology is the technology that actually gets used, and we engineer every aspect of Aegis to make it the most intuitive, most reliable, and most effective counter-UAS platform in the world."
        cta="Explore Our Technology"
        ctaHref="/technology"
        stats={[
          { value: "2 wk", label: "Iteration Cycle" },
          { value: "80%", label: "Workload Reduction" },
        ]}
      />

      {/* ── QUOTE ── */}
      <QuoteSection
        quote="When we started Aegis, people told us that counter-UAS was a niche problem — that drones would never be a serious military threat. Nine years later, every major military in the world is racing to deploy counter-drone capabilities, and Aegis is the platform they trust. We didn't predict the future. We listened to the operators who were already living in it."
        author="Dr. Marcus Chen"
        role="CEO & Co-Founder, Aegis Defense Systems"
      />

      {/* ── CTA ── */}
      <CTASection
        title="The Story Continues"
        subtitle="From a warehouse in Virginia to twelve nations and counting — the Aegis mission is just getting started."
        primaryCta="Join Our Team"
        primaryHref="/careers"
        secondaryCta="Request a Briefing"
        secondaryHref="/request-demo"
      />
    </>
  );
}
