"use client";

import { motion } from "framer-motion";
import {
  SectionHero,
  Callout,
  CTASection,
  AnimatedLine,
} from "@/components/sections";
import { ScrollReveal, StaggerChild } from "@/components/sections/scroll-reveal";

/* ── Executive Data ── */

interface Executive {
  name: string;
  role: string;
  initials: string;
  bio: string;
}

const ceo: Executive = {
  name: "Dr. Marcus Chen",
  role: "CEO & Co-Founder",
  initials: "MC",
  bio: "Former DARPA program manager for autonomous systems. PhD in Electrical Engineering from MIT. 20+ years in defense technology. Led the development of the first AI-driven counter-UAS classification engine. Previously founded two defense tech startups acquired by major primes. At DARPA, Dr. Chen oversaw $400M in counter-UAS research programs and authored the agency's seminal white paper on integrated air defense against unmanned systems. His doctoral research on multi-spectral sensor fusion laid the theoretical groundwork for the Aegis detection architecture. Prior to DARPA, he spent eight years at Raytheon, leading the development of the AN/TPQ-53 radar system. He has been recognized with the Secretary of Defense Medal for Outstanding Public Service and was named to the Defense News 40 Under 40 list. Dr. Chen founded Aegis Defense Systems in 2016 with a singular vision: to build the world's most intelligent counter-UAS platform — one that would detect, classify, and neutralize aerial threats faster and more reliably than any system that came before it.",
};

const executives: Executive[] = [
  {
    name: "Sarah Mitchell",
    role: "President & Co-Founder",
    initials: "SM",
    bio: "Former Deputy Assistant Secretary of Defense for Emerging Capabilities. 15 years at the Pentagon shaping counter-UAS policy and procurement. Led the Joint Counter-UAS Office's technology assessment program. Georgetown and War College graduate. Mitchell served as the principal civilian advisor on counter-UAS strategy to two Secretaries of Defense, authored the Department's first Counter-UAS Implementation Plan, and established the technology assessment framework that now governs all U.S. military counter-drone acquisitions. Her deep understanding of the defense procurement landscape — from RDT&E budgets to FMS channels — ensures that Aegis capabilities are aligned with the most urgent operational requirements and positioned for rapid adoption across the joint force.",
  },
  {
    name: "Col. James Harper (Ret.)",
    role: "Chief Strategy Officer & Co-Founder",
    initials: "JH",
    bio: "28-year U.S. Army career specializing in air defense artillery. Former commander of the 10th Army Air and Missile Defense Command. Led counter-UAS operations during Operation Inherent Resolve. West Point graduate. Colonel Harper's operational experience includes command of Patriot missile batteries in Southwest Asia, where he was responsible for integrated air and missile defense of coalition forces. His final assignment was as Director of Counter-UAS Operations at U.S. Central Command, coordinating counter-drone efforts across 21 countries and overseeing the deployment of over 40 counter-UAS systems. He holds a Master of Strategic Studies from the U.S. Army War College. At Aegis, he ensures that every system meets the operational demands of warfighters in the field and shapes the company's long-term strategic direction.",
  },
  {
    name: "Dr. Elena Vasquez",
    role: "Chief Technology Officer",
    initials: "EV",
    bio: "Former lead researcher at MIT Lincoln Laboratory. PhD in Signal Processing from Stanford. Pioneered the Iterated Multi-Model Unscented Kalman Filter approach used in Aegis sensor fusion. 47 published papers. Holds 8 patents in multi-spectral detection and real-time threat classification. Before joining Aegis, Dr. Vasquez led the Signal Processing and Adaptive Sensing group at Lincoln Laboratory, where her work on multi-hypothesis tracking for dense UAS environments was transitioned to four major defense programs. Her research on adaptive waveform design for cognitive radar directly informs the Aegis Core's ability to dynamically optimize detection parameters in real time. She oversees all technical development at Aegis, from the Aegis Core architecture to the AI-driven v3.0 platform and directed energy integration.",
  },
  {
    name: "Michael Torres",
    role: "Chief Revenue Officer",
    initials: "MT",
    bio: "18 years in defense sales and business development. Previously VP of International Sales at Raytheon. Closed $2B+ in defense contracts across 30+ nations. Expert in FMS and DCS procurement channels. Fluent in English, Arabic, and French. Torres built and led Raytheon's Middle East and North Africa sales organization, growing regional revenue from $200M to $800M over four years. His expertise spans the full spectrum of defense procurement — from direct commercial sales and Foreign Military Sales to teaming agreements and offset programs. He has personally negotiated defense contracts with ministries of defense in Saudi Arabia, the UAE, Qatar, Egypt, and Jordan, and maintains active relationships with procurement officials across NATO and the Five Eyes alliance.",
  },
  {
    name: "Catherine Smith",
    role: "Chief Financial Officer",
    initials: "CS",
    bio: "Former VP Finance at Northrop Grumman. 20 years in defense industry finance. Led Aegis through Series A-D funding rounds totaling $800M. CPA, MBA from Wharton. Manages $2.4B valuation and path to IPO. Smith oversaw financial planning and analysis for Northrop Grumman's Mission Systems division, a $4B business unit, before joining Aegis. She has deep experience in defense industry cost accounting, government contract financing, and the unique working capital dynamics of long-cycle defense programs. Her disciplined approach to capital allocation has enabled Aegis to sustain 28% R&D investment while maintaining profitable growth — a balance that few defense startups achieve. She is currently preparing the company for a planned IPO on the NYSE.",
  },
];

/* ── Initials Avatar ── */
function InitialsAvatar({
  initials,
  size = "default",
}: {
  initials: string;
  size?: "default" | "large";
}) {
  const sizeClasses =
    size === "large"
      ? "w-32 h-32 md:w-40 md:h-40 text-3xl md:text-4xl"
      : "w-20 h-20 md:w-24 md:h-24 text-lg md:text-xl";

  return (
    <div
      className={`${sizeClasses} border border-[#333] bg-[#111] flex items-center justify-center font-bold text-white/70 tracking-[0.05em] shrink-0`}
    >
      {initials}
    </div>
  );
}

/* ── CEO Featured Card ── */
function CEOCard({ executive }: { executive: Executive }) {
  return (
    <ScrollReveal>
      <motion.div
        className="group border border-[#222] bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors duration-300"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-8 md:p-12">
          <InitialsAvatar initials={executive.initials} size="large" />
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1 mb-5">
              Chief Executive Officer
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
              {executive.name}
            </h3>
            <div className="text-[11px] uppercase tracking-[0.15em] text-white/50 mt-2 mb-6">
              {executive.role}
            </div>
            <p className="text-[#b9b9b9] text-base md:text-lg leading-relaxed">
              {executive.bio}
            </p>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

/* ── Executive Card ── */
function ExecutiveCard({ executive }: { executive: Executive }) {
  return (
    <StaggerChild>
      <motion.div
        className="group border border-[#222] bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors duration-300 h-full"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 md:p-8">
          <InitialsAvatar initials={executive.initials} />
          <h3 className="text-xl md:text-2xl font-bold text-white mt-5 tracking-[-0.02em]">
            {executive.name}
          </h3>
          <div className="text-[10px] uppercase tracking-[0.15em] text-white/50 mt-1.5 mb-5">
            {executive.role}
          </div>
          <p className="text-[#b9b9b9] text-sm leading-relaxed">
            {executive.bio}
          </p>
        </div>
      </motion.div>
    </StaggerChild>
  );
}

/* ── Page ── */
export default function LeadershipPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/leadership-hero.jpg"
        label="Leadership"
        title="Led by Defense Veterans"
        subtitle="Aegis is led by a team of defense industry veterans, military officers, and technology pioneers who have spent their careers on the front lines of national security — and who understand that the best defense technology is built by people who have had to use it themselves."
        cta="Our History"
        ctaHref="/about/history"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        Our leadership team brings together over 200 years of combined
        experience across defense research, military operations, artificial
        intelligence, and enterprise technology. Every executive has held
        operational responsibility — not just advisory roles — and every
        decision they make is informed by firsthand knowledge of what happens
        when defense systems fail and what it takes to ensure they never do.
      </Callout>

      <AnimatedLine />

      {/* ── EXECUTIVE TEAM ── */}
      <section className="py-28 md:py-44 bg-black">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <div className="mb-16 md:mb-24">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                Executive Team
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
                The Leaders Behind Aegis
              </h2>
            </div>
          </ScrollReveal>

          {/* ── CEO Featured ── */}
          <CEOCard executive={ceo} />

          {/* ── Remaining Executives: 3-column grid ── */}
          <ScrollReveal staggerChildren={100} className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executives.map((exec) => (
              <ExecutiveCard key={exec.name} executive={exec} />
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── COMBINED EXPERIENCE STATS ── */}
      <section className="py-20 md:py-28 bg-black border-y border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal staggerChildren={80} className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <StaggerChild>
              <div className="text-center">
                <div className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.02em]">
                  200+
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-2">
                  Years Combined Experience
                </div>
              </div>
            </StaggerChild>
            <StaggerChild>
              <div className="text-center">
                <div className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.02em]">
                  55
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-2">
                  Patents Held
                </div>
              </div>
            </StaggerChild>
            <StaggerChild>
              <div className="text-center">
                <div className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.02em]">
                  $2B+
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-2">
                  Contracts Closed
                </div>
              </div>
            </StaggerChild>
            <StaggerChild>
              <div className="text-center">
                <div className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.02em]">
                  3
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-2">
                  Co-Founders
                </div>
              </div>
            </StaggerChild>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Build the Future With Us"
        subtitle="Aegis is always looking for exceptional talent — engineers, operators, and strategists who want to work on the hardest problems in defense technology."
        primaryCta="View Open Positions"
        primaryHref="/careers"
        secondaryCta="Request a Briefing"
        secondaryHref="/request-demo"
      />
    </>
  );
}
