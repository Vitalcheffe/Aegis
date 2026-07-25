"use client";

import {
  SectionHero,
  Callout,
  Timeline,
  ImageBreak,
  QuoteSection,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function HistoryPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/history-hero.jpg"
        label="History"
        title="From Vision to Global Deployment"
        subtitle="The complete chronicle of Aegis Defense Systems — from a three-person startup with a radical idea to the most trusted counter-UAS platform in the free world. Every milestone earned, every challenge overcome, every system deployed in service of a single mission: keeping the skies safe."
        cta="Meet the Founders"
        ctaHref="/about/leadership"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        History is not a timeline of dates and events — it is the story of
        people who refused to accept the world as they found it. The history of
        Aegis is the story of engineers who built what governments said was
        impossible, operators who trusted an unproven system in combat zones,
        and allies who bet their national security on a company that had not yet
        turned a profit.
      </Callout>

      <AnimatedLine />

      {/* ── DETAILED TIMELINE ── */}
      <Timeline
        label="The Aegis Chronicle"
        title="A Decade of Firsts"
        events={[
          {
            year: "2016",
            title: "The Warehouse on Wilson Boulevard",
            description:
              "Dr. Marcus Chen, Sarah Mitchell, and Col. James Harper (Ret.) lease a 3,000-square-foot warehouse in Arlington, Virginia, and incorporate Aegis Defense Systems. The founding team contributes $500,000 in personal savings and secures a $2M seed round from defense-focused venture capital firm Shield Capital. Their thesis is simple but controversial: existing air defense systems, designed for missiles and aircraft, are fundamentally incapable of detecting and neutralizing small, low-flying, low-speed drones. The team begins building the first multi-spectral sensor fusion prototype, combining S-Band radar with RF direction finding — an approach that legacy defense contractors dismiss as overengineered.",
          },
          {
            year: "2017",
            title: "The DARPA Validation and First Contract",
            description:
              "Aegis's prototype demonstrates 94% detection rate against Group 1 UAS in DARPA's Collaborative Operations in Denied Environment (CODE) exercise — outperforming three established defense contractors. The demonstration catches the attention of the Office of the Secretary of Defense, which awards Aegis a $12M rapid prototyping contract under the Section 804 middle-tier acquisition authority. The contract requires fieldable capability within 18 months. Aegis hires its first 30 engineers, many recruited from DARPA, MIT Lincoln Lab, and the Johns Hopkins Applied Physics Laboratory.",
          },
          {
            year: "2018",
            title: "Aegis Core v1.0 — Born in Combat",
            description:
              "Aegis Core v1.0 is deployed to a forward operating base in the U.S. Central Command area of responsibility. Within the first 72 hours of operation, the system detects 14 drone incursions that had been completely invisible to existing air defense radars. The most significant detection occurs on the third night: a hostile surveillance drone operating at 200 feet AGL, approaching the base perimeter at 35 knots. Aegis detects, classifies, and generates a neutralization recommendation in 1.8 seconds — a speed that operational commanders describe as transformational. The warfighter feedback from this deployment shapes every subsequent design decision.",
          },
          {
            year: "2019",
            title: "NATO Certification — The Gold Standard",
            description:
              "After 14 months of rigorous testing at the NATO Counter-UAS Technical Interoperability Exercise in The Hague, Aegis Core becomes the first counter-UAS platform to receive STANAG 4671 certification. The certification process tests every aspect of the system: detection range, classification accuracy, false alarm rates, electromagnetic compatibility, cybersecurity posture, and interoperability with allied command networks. Aegis achieves certification on the first attempt — a feat that NATO evaluation officials describe as unprecedented. Five NATO member nations immediately initiate procurement programs.",
          },
          {
            year: "2020",
            title: "The Pandemic Deployment — 100 Systems and Counting",
            description:
              "The COVID-19 pandemic forces a radical rethinking of how defense systems are deployed and maintained. Aegis develops a remote installation protocol that allows systems to be stood up with a single on-site technician guided by remote engineering support. During the pandemic year, Aegis completes 47 deployments — more than the previous three years combined — and reaches the 100th system milestone. The company also donates six Aegis Sentinel monitoring nodes to hospitals and vaccination sites facing drone surveillance threats, earning recognition from the U.S. Department of Health and Human Services.",
          },
          {
            year: "2021",
            title: "To the Seas — Naval Variant Commissioned",
            description:
              "Aegis launches its naval variant, engineered from the keel up for shipboard operations. The system features a stabilized sensor head rated to Sea State 6, salt-spray-hardened enclosures meeting MIL-STD-810H environmental standards, and direct integration with the Aegis Combat System (coincidentally sharing the name but not the lineage) via the Naval Tactical Grid. The Royal Navy conducts the first sea trial aboard HMS Defender in the Persian Gulf, successfully detecting and classifying drone threats while the ship was underway at 22 knots. The U.S. Navy follows with successful trials aboard an Arleigh Burke-class destroyer.",
          },
          {
            year: "2022",
            title: "The Billion-Dollar Year",
            description:
              "Aegis surpasses $1 billion in annual revenue, driven by a confluence of factors: the proliferation of drone threats in Ukraine, high-profile drone incidents at Dubai and London airports, and the U.S. Department of Defense's establishment of a dedicated Counter-UAS Program of Record. The company completes a $400M Series D funding round at a $2.4 billion valuation, led by General Catalyst with participation from In-Q-Tel and the sovereign wealth funds of two allied nations. Headcount grows to 800+ employees across four international offices. The Aegis Command enterprise platform launches, enabling centralized management of distributed counter-UAS installations.",
          },
          {
            year: "2023",
            title: "Twelve Nations, One Shield",
            description:
              "Aegis achieves deployment across 12 allied nations, with operational systems protecting military bases, airports, government facilities, and critical infrastructure on five continents. The company establishes in-country support centers in the United Kingdom, Germany, Japan, Australia, and the United Arab Emirates, each staffed with local engineers and trainers. The Aegis Integrator middleware platform is adopted by NATO as the preferred interoperability standard for multi-national counter-UAS operations, enabling real-time threat data sharing between U.S., UK, German, and French forces during a joint exercise in the Baltic Sea.",
          },
          {
            year: "2024",
            title: "The AI Revolution — v3.0 Architecture",
            description:
              "Aegis unveils its third-generation architecture, representing the most significant technical leap in the company's history. The v3.0 platform is built around a custom AI inference engine — the Aegis Neural Processing Unit — capable of classifying threats from 12 million known signal signatures in under 20 milliseconds. The architecture introduces three breakthrough capabilities: autonomous engagement authorization under configurable rules of engagement, real-time swarm behavior detection and geometric analysis, and predictive threat modeling that anticipates adversary drone tactics based on historical engagement data. Operator workload drops by 80% while neutralization success rates rise to 99.4%.",
          },
          {
            year: "2025",
            title: "Directed Energy — The Infinite Magazine",
            description:
              "Aegis completes the integration of directed energy weapons into its graduated response framework, fielding both a 50-kilowatt high-energy laser for precision engagement and a high-power microwave system for area denial against swarm attacks. The directed energy capability eliminates the fundamental constraint of every previous counter-UAS system: finite ammunition. A laser-armed Aegis platform can engage an unlimited number of targets, constrained only by electrical power — a game-changer for sustained defense of fixed sites and naval vessels. Field demonstrations at White Sands Missile Range show sub-second engagement of Group 1 and Group 2 UAS at ranges exceeding 1.5 kilometers, with a per-engagement cost of less than one dollar.",
          },
        ]}
      />

      {/* ── IMAGE BREAK ── */}
      <ImageBreak
        image="/images/pages/about-engineering.jpg"
        height="55vh"
        overlay="bg-black/40"
      />

      {/* ── QUOTE ── */}
      <QuoteSection
        quote="People ask me when I knew Aegis would succeed. I knew on the third night of our first deployment, when a 26-year-old specialist — not a PhD, not a general — used our system to detect a drone that every other sensor on that base had missed. She didn't need a manual. She didn't need a support team. She just needed a system that worked. That's when I knew we had built something that would change the world."
        author="Col. James Harper (Ret.)"
        role="COO & Co-Founder, Aegis Defense Systems"
      />

      {/* ── CTA ── */}
      <CTASection
        title="The Next Chapter Starts Now"
        subtitle="A decade of innovation. 240+ systems deployed. Twelve allied nations. And we are just getting started."
        primaryCta="Join the Mission"
        primaryHref="/careers"
        secondaryCta="Request a Briefing"
        secondaryHref="/request-demo"
      />
    </>
  );
}
