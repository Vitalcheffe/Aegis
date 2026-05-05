"use client";

import {
  SectionHero,
  Callout,
  FeatureList,
  CardGrid,
  CTASection,
  ImageBreak,
  AnimatedLine,
} from "@/components/sections";

export default function PartnersPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/partners-hero.jpg"
        label="Partners"
        title="Stronger Together"
        subtitle="No single company can defend the world's airspace alone. Aegis builds deep, enduring partnerships with allied militaries, defense agencies, technology leaders, and research institutions — because the threat is global, and the response must be too."
        cta="Become a Partner"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        The counter-UAS challenge is not a problem that any one nation, any one
        company, or any one technology can solve alone. It demands an ecosystem
        — a network of partners who bring complementary capabilities, shared
        intelligence, and unified commitment to the mission of keeping the
        skies safe. At Aegis, partnership is not a business development
        strategy. It is a core architectural principle.
      </Callout>

      <AnimatedLine />

      {/* ── PARTNER CATEGORIES ── */}
      <FeatureList
        label="Partner Ecosystem"
        title="Five Pillars of Partnership"
        items={[
          {
            title: "Government & Military",
            description:
              "Aegis maintains active partnerships with defense ministries and armed forces across 12 allied nations. These relationships go far beyond procurement — we embed our engineers with operational units, participate in joint exercises, and maintain 24/7 support channels that connect our engineering teams directly to warfighters in the field. Our government partners provide the operational feedback that drives every major product decision, ensuring that Aegis systems evolve at the pace of the threat rather than the pace of the procurement cycle. We hold active contracts with the U.S. Department of Defense, UK Ministry of Defence, German Bundeswehr, Japan Ministry of Defense, and the armed forces of seven additional allied nations.",
            tag: "Sovereign",
          },
          {
            title: "Defense Contractors",
            description:
              "We partner with the world's leading defense primes to integrate Aegis capabilities into broader defense architectures. Our partnership with Lockheed Martin enables Aegis-to-Aegis Combat System data exchange aboard naval vessels. Our collaboration with Raytheon provides seamless integration with Patriot and NASAMS air defense systems. And our work with Northrop Grumman connects Aegis to the Joint All-Domain Command and Control (JADC2) architecture. These partnerships ensure that Aegis is not an isolated system but a force multiplier within the existing and future defense ecosystem.",
            tag: "Integration",
          },
          {
            title: "Technology Partners",
            description:
              "Aegis leverages best-in-class technology from leading commercial companies to deliver superior performance. NVIDIA provides the GPU compute infrastructure for our AI inference engine. Dell Technologies delivers ruggedized edge computing platforms rated for deployed environments. And Amazon Web Services powers our cloud-based Aegis Command enterprise platform with AWS GovCloud and AWS Secret Regions. These technology partnerships ensure that Aegis benefits from the pace of commercial innovation while meeting the security and reliability requirements of defense operations.",
            tag: "Innovation",
          },
          {
            title: "Research Institutions",
            description:
              "We maintain deep research partnerships with the world's leading academic and government research institutions. The MIT Lincoln Laboratory collaborates with Aegis on next-generation radar signal processing algorithms. The Johns Hopkins Applied Physics Laboratory co-develops our autonomous decision-making frameworks. And the NATO Science and Technology Organization works with Aegis on interoperability standards that will define allied counter-UAS operations for the next decade. These partnerships ensure that Aegis remains at the frontier of scientific advancement, turning laboratory breakthroughs into fielded capabilities within months, not years.",
            tag: "Research",
          },
          {
            title: "International Alliances",
            description:
              "Aegis is a proud contributor to international defense alliances and cooperative frameworks. We are an active participant in the NATO Counter-UAS Working Group, the Five Eyes Intelligence Alliance's drone threat sharing program, and the European Defence Fund's counter-drone research initiative. Our Aegis Integrator platform serves as the middleware backbone for multi-national counter-UAS operations, enabling real-time threat data sharing and coordinated engagement across national boundaries. In an era of globalized drone threats, international cooperation is not optional — it is essential, and Aegis is engineered to enable it.",
            tag: "Alliance",
          },
        ]}
      />

      {/* ── IMAGE BREAK ── */}
      <ImageBreak
        image="/images/pages/shield-array.jpg"
        height="55vh"
        overlay="bg-black/50"
      />

      {/* ── PARTNER CARDS ── */}
      <CardGrid
        label="Featured Partnerships"
        title="Collaborative Excellence"
        cards={[
          {
            title: "U.S. Department of Defense",
            description:
              "Our foundational partnership. Aegis holds multiple contracts across the U.S. Army, Navy, Air Force, and Marine Corps, protecting forward operating bases, naval vessels, and critical installations worldwide. The DoD's operational feedback has shaped every major product iteration since v1.0, and our rapid fielding capability has made Aegis the go-to counter-UAS solution for urgent operational needs.",
            image: "/images/pages/fob-military.jpg",
            tag: "Government",
          },
          {
            title: "NATO Allied Command",
            description:
              "As the first STANAG 4671-certified counter-UAS platform, Aegis serves as the backbone of NATO's integrated counter-drone architecture. Our systems participate in annual NATO exercises and provide real-time threat data to the Alliance's common operating picture, enabling coordinated multi-national defense against drone threats across the European theater.",
            image: "/images/pages/c2-operations.jpg",
            tag: "Alliance",
          },
          {
            title: "Lockheed Martin",
            description:
              "Our partnership with Lockheed Martin enables seamless integration between Aegis counter-UAS capabilities and the broader air defense ecosystem. Joint development of the Aegis-to-Aegis Combat System data bridge allows our counter-UAS tracks to feed directly into shipboard combat management systems, providing naval commanders with a unified air picture that includes the drone threat layer.",
            image: "/images/pages/airdefense-patriot.jpg",
            tag: "Defense Contractor",
          },
          {
            title: "NVIDIA",
            description:
              "NVIDIA's GPU computing platforms power the Aegis Neural Processing Unit — the custom AI inference engine at the heart of our v3.0 architecture. Our partnership ensures that Aegis benefits from NVIDIA's relentless pace of hardware innovation, with each new GPU generation delivering measurable improvements in classification speed and accuracy that we pass directly to our customers through software updates.",
            image: "/images/pages/tech-circuit.jpg",
            tag: "Technology",
          },
          {
            title: "MIT Lincoln Laboratory",
            description:
              "Our longest-standing research partnership. MIT Lincoln Laboratory collaborates with Aegis on next-generation radar signal processing, multi-spectral sensor fusion algorithms, and novel detection techniques for low-observable UAS. The partnership has produced 8 joint patents and 14 peer-reviewed publications, and it ensures that Aegis detection capabilities remain at the absolute frontier of what is physically possible.",
            image: "/images/pages/about-engineering.jpg",
            tag: "Research",
          },
          {
            title: "UK Ministry of Defence",
            description:
              "The United Kingdom was one of the first allied nations to deploy Aegis, and the partnership has deepened significantly over the years. Aegis systems protect Royal Navy vessels, British Army forward operating bases, and critical national infrastructure across the UK. The MoD's rigorous testing and evaluation process has made Aegis systems more resilient, and their operational feedback has directly shaped our naval and urban defense capabilities.",
            image: "/images/pages/london-skyline.jpg",
            tag: "Government",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Become a Partner"
        subtitle="Whether you represent a government agency, a defense contractor, a technology company, or a research institution, Aegis offers partnership models tailored to your capabilities and mission objectives."
        primaryCta="Contact Our Partnership Team"
        primaryHref="/request-demo"
        secondaryCta="Explore Our Technology"
        secondaryHref="/technology"
      />
    </>
  );
}
