"use client";

import {
  SectionHero,
  Callout,
  CardGrid,
  CTASection,
} from "@/components/sections";

export default function NewsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/news-hero.jpg"
        label="Aegis Defense Systems"
        title="News"
        subtitle="Latest from Aegis"
        gradient="from-black via-black/80 to-black/50"
        align="center"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Stay informed on the latest developments in counter-UAS technology,
        strategic partnerships, and operational milestones from Aegis Defense
        Systems.
      </Callout>

      {/* ── NEWS CARDS ── */}
      <CardGrid
        label="Latest Updates"
        title="Recent News"
        cards={[
          {
            title: "Aegis Core v3.0 Deployed Across NATO Eastern Flank",
            description:
              "The latest iteration of our flagship command-and-control platform is now operational across all NATO Forward Presence battlegroups in the Baltic states and Poland. Version 3.0 introduces real-time multi-domain sensor fusion, autonomous swarm discrimination, and a hardened communications backbone resistant to EW jamming — delivering a 40% improvement in kill-chain latency over the previous generation.",
            image: "/images/pages/c2-operations.jpg",
            href: "/news/press-releases",
            tag: "Press Release",
          },
          {
            title: "Directed Energy Integration Achieves Operational Milestone",
            description:
              "Aegis has successfully completed live-fire integration testing of a 50 kW directed energy weapon with our Aegis Shield platform at the White Sands Missile Range. The system demonstrated consistent hard-kill neutralization of Group 1 and Group 2 UAVs at ranges exceeding 1.2 km, marking the first operational pairing of a C-UAS command system with a high-energy laser in a field environment.",
            image: "/images/pages/neutralization-ew.jpg",
            href: "/news/press-releases",
            tag: "Technology",
          },
          {
            title: "Aegis Expands to 12th Nation with Pacific Theater Contract",
            description:
              "The Republic of Korea has selected Aegis Shield to protect critical military installations along the DMZ and key naval assets at Jinhae and Busan. The $180M contract includes 24 fixed-site installations, mobile convoy protection units, and a five-year sustainment agreement — representing our largest single-nation deployment in the Indo-Pacific region.",
            image: "/images/pages/mobile-tactical.jpg",
            href: "/news/press-releases",
            tag: "Business",
          },
          {
            title: "Counter-UAS Summit 2025: Aegis Keynote Address",
            description:
              "CEO Dr. Elena Vasquez delivered the opening keynote at the 2025 Counter-UAS Summit in Washington, D.C., outlining the emerging threat landscape of AI-coordinated drone swarms and presenting Aegis's vision for autonomous, multi-domain defense architecture. The address was attended by over 2,400 defense professionals from 38 nations.",
            image: "/images/pages/c2-operations.jpg",
            href: "/news/events",
            tag: "Events",
          },
          {
            title: "AI-Driven Swarm Detection Sets New Benchmark",
            description:
              "Aegis Research Labs has published results from the largest counter-swarm detection trial ever conducted, tracking and classifying 200+ simultaneous hostile UAVs with 99.4% accuracy and a mean classification time of 18 milliseconds. The new transformer-based architecture processes RF, radar, and EO/IR inputs in parallel, enabling real-time threat prioritization at unprecedented scale.",
            image: "/images/pages/classification-ai.jpg",
            href: "/news/press-releases",
            tag: "Research",
          },
          {
            title: "Strategic Partnership with Naval Defense Consortium",
            description:
              "Aegis has entered a strategic partnership with the Combined Naval Defense Consortium, integrating our Aegis Command platform with allied naval C2 systems across 8 navies. The agreement provides standardized C-UAS interoperability, shared threat libraries, and joint training protocols — ensuring coordinated defense against maritime drone threats from the Gulf of Aden to the South China Sea.",
            image: "/images/pages/naval-warship.jpg",
            href: "/news/press-releases",
            tag: "Partnerships",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Stay Connected"
        subtitle="Subscribe to receive the latest press releases, event invitations, and technology updates from Aegis Defense Systems."
        primaryCta="Contact Us"
        primaryHref="/request-demo"
        secondaryCta="View Press Releases"
        secondaryHref="/news/press-releases"
      />
    </>
  );
}
