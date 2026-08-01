"use client";

import {
  SectionHero,
  CTASection,
  TextSection,
  StatsSection,
} from "@/components/sections";

/* ─── Webinar data type ─── */
interface Webinar {
  title: string;
  speaker: string;
  date: string;
  duration: string;
  description: string;
}

const webinars: Webinar[] = [
  {
    title: "The Future of Counter-UAS: 2026 Threat Landscape",
    speaker: "Dr. Marcus Chen",
    date: "March 2026",
    duration: "45 min",
    description:
      "Our annual threat landscape analysis examining the evolution of commercial and military drone capabilities projected for 2026 and beyond. Dr. Chen presents findings from the Aegis Threat Intelligence division, covering AI-autonomous navigation systems, swarm coordination protocols, and counter-C-UAS evasion techniques observed in recent conflicts. The session includes updated threat projections and recommended Aegis configuration changes for emerging threat vectors.",
  },
  {
    title: "Sensor Fusion Deep Dive: How Aegis Achieves 99.4% Classification",
    speaker: "Dr. Elena Vasquez",
    date: "February 2026",
    duration: "60 min",
    description:
      "A technical examination of the multi-modal sensor fusion pipeline that powers Aegis classification accuracy. Dr. Vasquez explains the Iterated Multi-Model Unscented Kalman Filter at the core of the Fusion Layer, demonstrating how combining radar, RF, EO/IR, and acoustic observations produces classification results that exceed any single sensor modality. Includes live performance comparison data and a walkthrough of the confidence scoring algorithm.",
  },
  {
    title: "Deploying Aegis at Airports: Lessons from 24 Months of Operation",
    speaker: "Michael Torres",
    date: "January 2026",
    duration: "45 min",
    description:
      "Field operations manager Michael Torres shares operational data and lessons learned from continuous Aegis deployment at three international airports over 24 months. Covers false alarm management in complex RF environments, coordination with air traffic control, regulatory compliance across jurisdictions, and the graduated response protocol that has neutralized over 40 confirmed drone incursions without a single unnecessary flight disruption.",
  },
  {
    title: "NATO Interoperability: STANAG 4671 in Practice",
    speaker: "Col. James Harper",
    date: "December 2025",
    duration: "30 min",
    description:
      "Colonel James Harper (Ret.), VP of NATO Programs, presents a practical guide to achieving STANAG 4671 interoperability with Aegis systems. The session covers the message catalogue, track data exchange procedures, system-to-system handover protocols, and results from the most recent NATO interoperability exercise where Aegis demonstrated seamless integration with four allied C2 platforms simultaneously.",
  },
  {
    title: "Directed Energy Counter-UAS: Capabilities and Timeline",
    speaker: "Dr. Elena Vasquez",
    date: "November 2025",
    duration: "45 min",
    description:
      "Dr. Vasquez presents the current state and projected timeline for directed energy counter-UAS capabilities integrated with the Aegis platform. Covers high-power microwave systems, laser weapon integration, and the engineering challenges of combining kinetic and non-kinetic effectors in a unified engagement framework. Includes performance data from Aegis-directed energy integration testing and a technology readiness assessment for operational deployment.",
  },
  {
    title: "Swarm Defense: Aegis Swarm Resolution Algorithm Explained",
    speaker: "Dr. Elena Vasquez",
    date: "October 2025",
    duration: "60 min",
    description:
      "A deep technical session on the Aegis Swarm Resolution Algorithm — the AI-driven system that enables simultaneous engagement of coordinated multi-platform drone attacks. Dr. Vasquez explains the threat clustering engine, priority assignment logic, effector allocation optimization, and the real-time adaptation mechanisms that allow the algorithm to respond to swarm behavior changes mid-engagement. Includes a replay of a 30-platform simulated swarm attack with algorithm decision analysis.",
  },
];

/* ─── Webinar Card Component ─── */
function WebinarCard({ webinar, index }: { webinar: Webinar; index: number }) {
  return (
    <div className="border-t border-white/10 py-10 md:py-14 group">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
        {/* Left: Title + Meta */}
        <div className="md:flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-mono">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1">
              {webinar.duration}
            </span>
          </div>
          <h3 className="text-[clamp(1.3rem,3vw,2.2rem)] font-bold tracking-[-0.02em] text-white leading-snug">
            {webinar.title}
          </h3>
          <div className="mt-3 text-[11px] uppercase tracking-[0.12em] text-[#767676] flex items-center gap-3">
            <span>{webinar.speaker}</span>
            <span className="text-white/20">·</span>
            <span>{webinar.date}</span>
          </div>
        </div>

        {/* Right: Description + CTA */}
        <div className="md:flex-1 md:pt-8">
          <p className="text-[#b9b9b9] text-sm md:text-base leading-relaxed mb-6">
            {webinar.description}
          </p>
          <a
            href="/request-demo"
            className="inline-block text-[10px] uppercase tracking-[0.15em] text-white border border-white/30 px-5 py-2.5 hover:bg-white hover:text-black transition-all duration-300"
          >
            Register for Recording
          </a>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════ */

export default function WebinarsPage() {
  return (
    <>
      <SectionHero
        image="/images/resources/webinars.jpg"
        label="Resources"
        title="Webinars & Events"
        subtitle="Live and on-demand presentations covering emerging threats, technology deep dives, deployment best practices, and regulatory compliance — with interactive Q&A from our engineering and operations teams."
        cta="Register for Next Event"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="Learn from the Experts">
        <p>
          Aegis webinars bring the expertise of our engineering leadership and field operations teams directly to your desk. Each session is designed for defense professionals, system integrators, and procurement decision-makers who need authoritative, detailed information about counter-UAS technology and operations without the time and expense of travel.
        </p>
        <p>
          All sessions are recorded and made available in our on-demand library within 48 hours of the live event. Access to recordings requires registration — there is no cost for qualified defense professionals.
        </p>
      </TextSection>

      <StatsSection
        label="Program Overview"
        stats={[
          { value: "6", label: "Recent Sessions" },
          { value: "24+", label: "On-Demand Recordings" },
          { value: "3,200+", label: "Attendees YTD" },
          { value: "94%", label: "Satisfaction Rating" },
        ]}
      />

      {/* ── Webinar List ── */}
      <section className="py-20 md:py-32 bg-black">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Recordings
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              Recent Webinars
            </h2>
          </div>

          <div>
            {webinars.map((webinar, i) => (
              <WebinarCard key={webinar.title} webinar={webinar} index={i} />
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Stay Informed"
        subtitle="Register for our webinar mailing list and receive invitations to upcoming sessions plus early access to on-demand recordings."
        primaryCta="Register for Updates"
        primaryHref="/request-demo"
        secondaryCta="View All Events"
        secondaryHref="/news/events"
      />
    </>
  );
}
