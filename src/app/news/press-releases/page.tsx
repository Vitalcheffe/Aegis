"use client";

import {
  SectionHero,
  FeatureList,
  CTASection,
} from "@/components/sections";

export default function PressReleasesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/press-hero.jpg"
        label="News"
        title="Press Releases"
        subtitle="Official Announcements"
        gradient="from-black via-black/80 to-black/50"
        align="center"
      />

      {/* ── PRESS RELEASES ── */}
      <FeatureList
        label="Official Statements"
        title="Press Releases"
        items={[
          {
            title: "Aegis Core v3.0 Achieves Full Operational Capability Across NATO Eastern Flank",
            description:
              "February 28, 2025 — Aegis Defense Systems announces that Aegis Core v3.0 has reached Full Operational Capability (FOC) across all NATO Forward Presence battlegroups in Estonia, Latvia, Lithuania, and Poland. The deployment, completed three months ahead of schedule, delivers autonomous multi-domain sensor fusion, hardened EW-resistant communications, and a 40% reduction in kill-chain latency. The platform now protects over 12,000 allied personnel and 350+ critical assets across the theater.",
            tag: "February 2025",
            href: "/news",
          },
          {
            title: "Directed Energy Weapon Integration Passes Live-Fire Milestone at White Sands",
            description:
              "February 12, 2025 — Aegis confirms successful live-fire integration of a 50 kW high-energy laser with the Aegis Shield platform. During 47 engagement sequences over a three-week test campaign at White Sands Missile Range, the system achieved a 94% hard-kill rate against Group 1 and Group 2 UAVs at ranges exceeding 1.2 km. This marks the first time a C-UAS command system has autonomously cued and fired a directed energy weapon in an operational field environment.",
            tag: "February 2025",
            href: "/news",
          },
          {
            title: "Republic of Korea Selects Aegis Shield for DMZ and Naval Installation Protection",
            description:
              "January 20, 2025 — The Republic of Korea Ministry of National Defense has awarded Aegis Defense Systems a $180M contract for the deployment of Aegis Shield across 24 fixed-site installations along the Demilitarized Zone and at key naval facilities in Jinhae and Busan. The contract includes mobile convoy protection units, a centralized command node, and a five-year sustainment and training package. This represents Aegis's 12th nation and largest Indo-Pacific deployment to date.",
            tag: "January 2025",
            href: "/news",
          },
          {
            title: "Aegis Research Labs Publishes Landmark Counter-Swarm Detection Results",
            description:
              "January 8, 2025 — Aegis Research Labs has published the results of the largest counter-swarm detection trial ever conducted. The transformer-based AI architecture tracked and classified 200+ simultaneous hostile UAVs with 99.4% accuracy and a mean classification time of 18 milliseconds. The paper, published in the Journal of Defense AI, details a novel parallel processing approach that fuses RF, radar, and EO/IR inputs, enabling real-time threat prioritization at unprecedented scale.",
            tag: "January 2025",
            href: "/news",
          },
          {
            title: "Strategic Partnership with Combined Naval Defense Consortium Signed",
            description:
              "December 15, 2024 — Aegis Defense Systems has signed a multi-year strategic partnership agreement with the Combined Naval Defense Consortium, integrating Aegis Command with allied naval C2 systems across 8 navies. The agreement provides standardized C-UAS interoperability, shared threat intelligence libraries, joint training protocols, and a common operating picture for maritime drone defense from the Gulf of Aden to the South China Sea.",
            tag: "December 2024",
            href: "/news",
          },
          {
            title: "Aegis Mobile Selected for UK Ministry of Defence Convoy Protection Program",
            description:
              "November 28, 2024 — The UK Ministry of Defence has selected Aegis Mobile for its Future Convoy Protection programme, awarding an initial £45M contract for 60 vehicle-mounted systems. The deployment will protect British Army logistics convoys operating in contested environments, with integration into the UK's SkyNet communications infrastructure and MoD's Athena battle management system.",
            tag: "November 2024",
            href: "/news",
          },
          {
            title: "Aegis Completes Series D Funding Round at $2.4B Valuation",
            description:
              "October 30, 2024 — Aegis Defense Systems has closed a $340M Series D funding round at a $2.4B post-money valuation, led by General Catalyst with participation from existing investors including Anduril Industries, Palantir Technologies, and the Qatar Investment Authority. The capital will accelerate directed energy integration, expand the Pacific theater footprint, and double the engineering workforce by Q3 2025.",
            tag: "October 2024",
            href: "/news",
          },
          {
            title: "Aegis Tactical Receives NATO STANAG 4671 Certification",
            description:
              "September 18, 2024 — Aegis Tactical has been certified under NATO STANAG 4671 (Counter-Unmanned Aerial Systems), becoming the first man-portable C-UAS system to achieve this designation. The certification validates interoperability with allied C2 networks, compliance with rules-of-engagement frameworks, and performance across 14 environmental test conditions including Arctic, desert, and maritime operations.",
            tag: "September 2024",
            href: "/news",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Media Inquiries"
        subtitle="For press and media inquiries, contact our communications team for official statements, executive interviews, and product demonstrations."
        primaryCta="Contact Communications"
        primaryHref="/request-demo"
        secondaryCta="View All News"
        secondaryHref="/news"
      />
    </>
  );
}
