"use client";

import {
  SectionHero,
  Callout,
  TeamGrid,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

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

      {/* ── TEAM GRID ── */}
      <TeamGrid
        label="Executive Team"
        title="The Leaders Behind Aegis"
        members={[
          {
            name: "Dr. Marcus Chen",
            role: "CEO & Co-Founder",
            bio: "Dr. Marcus Chen founded Aegis Defense Systems in 2016 after a distinguished career at the Defense Advanced Research Projects Agency (DARPA), where he served as a program manager in the Strategic Technology Office. At DARPA, he oversaw $400M in counter-UAS research programs and authored the agency's seminal white paper on integrated air defense against unmanned systems. He holds a Ph.D. in Electrical Engineering from MIT, where his doctoral research on multi-spectral sensor fusion laid the theoretical groundwork for the Aegis detection architecture. Prior to DARPA, Dr. Chen spent eight years at Raytheon, leading the development of the AN/TPQ-53 radar system. He has been recognized with the Secretary of Defense Medal for Outstanding Public Service and was named to the Defense News 40 Under 40 list.",
            image: "/images/pages/leadership-ceo.jpg",
          },
          {
            name: "Sarah Mitchell",
            role: "Chief Technology Officer",
            bio: "Sarah Mitchell brings two decades of defense engineering leadership to her role as CTO. Before joining Aegis, she served as Chief Engineer for Counter-UAS Programs at Lockheed Martin, where she led the technical development of the ICARUS counter-drone system and oversaw a team of 300 engineers across six states. Her expertise spans radar systems engineering, signal processing, and real-time embedded systems. Mitchell holds 7 patents in multi-target tracking and sensor fusion algorithms. She earned her M.S. in Aerospace Engineering from Georgia Tech and completed the MIT Sloan Executive Program in Technology Leadership. At Aegis, she is responsible for the entire technical roadmap — from the Aegis Core architecture to the AI-driven v3.0 platform and the directed energy integration program.",
            image: "/images/pages/leadership-cto.jpg",
          },
          {
            name: "Col. James Harper (Ret.)",
            role: "Chief Operating Officer",
            bio: "Colonel James Harper retired from the United States Army after 25 years of distinguished service in air defense artillery. His final assignment was as Director of Counter-UAS Operations at U.S. Central Command, where he was responsible for coordinating counter-drone efforts across 21 countries and overseeing the deployment of over 40 counter-UAS systems. He holds a Master of Strategic Studies from the U.S. Army War College and is a graduate of the Air Defense Artillery Officer Basic and Advanced Courses. His combat deployments include Operation Iraqi Freedom and Operation Inherent Resolve, where he experienced firsthand the devastating impact of drone threats on forward operating bases. At Aegis, he ensures that every system we build meets the operational demands of warfighters in the field.",
            image: "/images/pages/leadership-coo.jpg",
          },
          {
            name: "Dr. Elena Vasquez",
            role: "Chief Scientist",
            bio: "Dr. Elena Vasquez is a pioneer in the application of artificial intelligence and machine learning to defense systems. She holds a Ph.D. in Computer Science from MIT, where her doctoral research on real-time threat classification using deep neural networks achieved breakthrough accuracy rates that were subsequently adopted by multiple defense programs. Before joining Aegis, she led the AI Research Division at the Johns Hopkins Applied Physics Laboratory, where she developed autonomous threat detection algorithms for the U.S. Navy's Aegis Combat System. She has published over 60 peer-reviewed papers on machine learning, computer vision, and autonomous decision-making, and she holds 4 patents in real-time signal classification. At Aegis, she leads the development of the 20-millisecond classification engine and the autonomous engagement authorization framework.",
            image: "/images/pages/leadership-science.jpg",
          },
          {
            name: "David Park",
            role: "Chief Financial Officer",
            bio: "David Park brings a unique combination of defense industry experience and Silicon Valley financial acumen to his role as CFO. Prior to joining Aegis, he served as Vice President of Finance at Palantir Technologies, where he played a key role in the company's direct listing and helped scale revenue from $500M to $1.5B over three years. Before Palantir, he held senior finance roles at Northrop Grumman and Booz Allen Hamilton. Park holds an MBA from the Stanford Graduate School of Business and a B.S. in Economics from the Wharton School. He is a Certified Public Accountant and a CFA charterholder. At Aegis, he manages the company's financial strategy, investor relations, and the capital allocation framework that supports our aggressive R&D investment — currently running at 28% of revenue.",
            image: "/images/pages/leadership-cfo.jpg",
          },
          {
            name: "Lt. Gen. Maria Torres (Ret.)",
            role: "Board Director",
            bio: "Lieutenant General Maria Torres retired from the United States Air Force after 32 years of service, culminating in her role as Commander of NATO Allied Air Command and Deputy Commander of U.S. Air Forces in Europe and Africa. In that capacity, she was responsible for the air defense of 28 NATO member nations and oversaw the integration of counter-UAS capabilities across the alliance. She holds a Master of National Security Strategy from the National War College and has completed senior executive programs at Harvard Kennedy School and the NATO Defense College. Her operational experience includes command of air defense sectors during Operations Enduring Freedom and Odyssey Dawn. General Torres serves as Chair of the Aegis Advisory Board and provides strategic guidance on international partnerships, NATO interoperability, and allied force integration.",
            image: "/images/pages/leadership-board.jpg",
          },
        ]}
      />

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
