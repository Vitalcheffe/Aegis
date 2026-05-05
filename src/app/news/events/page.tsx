"use client";

import {
  SectionHero,
  FeatureList,
  CTASection,
} from "@/components/sections";

export default function EventsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/events-hero.jpg"
        label="News"
        title="Events"
        subtitle="See Aegis in Action"
        gradient="from-black via-black/80 to-black/50"
        align="center"
      />

      {/* ── UPCOMING EVENTS ── */}
      <FeatureList
        label="Upcoming"
        title="Events & Appearances"
        items={[
          {
            title: "DSEI 2025 — London",
            description:
              "September 15–18, 2025 | ExCeL London — Aegis returns to Defence and Security Equipment International with live demonstrations of Aegis Core v3.0 and directed energy integration. Visit Stand H4-200 for hands-on command interface trials and schedule a private briefing with our operational team. CEO Dr. Elena Vasquez will present on the main stage September 16 at 14:00 GMT.",
            tag: "September 2025",
            href: "/request-demo",
          },
          {
            title: "AUSA Annual Meeting — Washington, D.C.",
            description:
              "October 13–15, 2025 | Walter E. Washington Convention Center — The Association of the United States Army's premier event. Aegis will showcase Aegis Mobile convoy protection, Aegis Tactical dismounted operations, and a new classified capability briefing for U.S. Department of Defense stakeholders. Book a dedicated demo slot through your Aegis account representative.",
            tag: "October 2025",
            href: "/request-demo",
          },
          {
            title: "Euronaval — Paris",
            description:
              "October 27–31, 2025 | Paris Le Bourget — The world's leading naval defense exhibition. Aegis Command will be demonstrated in a live multi-ship C-UAS scenario, simulating coordinated defense of a carrier strike group against a 50-drone swarm attack. Naval program directors from 12 allied nations will participate in the demonstration.",
            tag: "October 2025",
            href: "/request-demo",
          },
          {
            title: "Counter-UAS Summit 2026 — Tel Aviv",
            description:
              "January 19–22, 2026 | Tel Aviv Convention Center — Following the record-setting 2025 summit, Aegis will host the 2026 edition in Tel Aviv, the global epicenter of C-UAS innovation. The event will feature live-fire demonstrations at Palmachim Airbase, technical workshops on AI-driven swarm detection, and an international policy forum on C-UAS rules of engagement.",
            tag: "January 2026",
            href: "/request-demo",
          },
          {
            title: "IDEX — Abu Dhabi",
            description:
              "February 16–20, 2026 | Abu Dhabi National Exhibition Centre — The International Defence Exhibition and Conference is the Middle East's largest defense event. Aegis will present its full product suite with emphasis on desert-optimized configurations, Arabic-language command interfaces, and GCC-specific compliance frameworks. Schedule a meeting with our Middle East team.",
            tag: "February 2026",
            href: "/request-demo",
          },
          {
            title: "Aegis Technology Day — San Francisco",
            description:
              "March 12, 2026 | Aegis Headquarters — An exclusive, invite-only event for strategic partners, investors, and select customers. Technology Day features deep-dive briefings on our 2026 roadmap, hands-on labs with next-generation prototypes, and a classified threat briefing from our intelligence division. Attendance is limited to 200 guests.",
            tag: "March 2026",
            href: "/request-demo",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Meet Us at an Event"
        subtitle="Schedule a private demonstration or meeting at any upcoming event. Our team will coordinate logistics and clearances for classified briefings."
        primaryCta="Request a Meeting"
        primaryHref="/request-demo"
        secondaryCta="View Press Releases"
        secondaryHref="/news/press-releases"
      />
    </>
  );
}
