"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SectionHero,
  Callout,
  CTASection,
} from "@/components/sections";
import { ScrollReveal as ScrollRevealComponent } from "@/components/sections/scroll-reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/* ────────────────────────────────────────────────────────────────
   NEWS DATA
   ──────────────────────────────────────────────────────────────── */

type Category =
  | "All"
  | "Press Release"
  | "Event"
  | "Blog"
  | "Threat Intel";

type FilterTab = Category | "Events";

const filterTabs: FilterTab[] = [
  "All",
  "Press Release",
  "Events",
  "Blog",
  "Threat Intel",
];

interface NewsItem {
  date: string;
  category: Category;
  title: string;
  excerpt: string;
  href: string;
}

const newsItems: NewsItem[] = [
  {
    date: "Mar 2026",
    category: "Press Release",
    title: "$240M CENTCOM Contract Awarded",
    excerpt:
      "Aegis Defense Systems has been awarded a $240M contract by U.S. Central Command for deployment of Aegis Shield systems across forward operating bases in the Middle East theater.",
    href: "/news/press-releases",
  },
  {
    date: "Mar 2026",
    category: "Threat Intel",
    title: "Shahed-136 Low-Observable Variant Detected",
    excerpt:
      "Aegis threat intelligence has identified a new low-observable variant of the Shahed-136 UAV with reduced RCS and modified RF signatures. Updated threat libraries deployed to all operational systems.",
    href: "/threat-database",
  },
  {
    date: "Feb 2026",
    category: "Blog",
    title: "AI-Driven Drone Detection Breakthrough",
    excerpt:
      "Our research team details the new transformer-based detection architecture achieving 99.4% classification accuracy across 200+ simultaneous threats with 18ms mean latency.",
    href: "/technology/ai-ml",
  },
  {
    date: "Feb 2026",
    category: "Press Release",
    title: "Directed Energy Integration Milestone",
    excerpt:
      "Successful live-fire integration of 50 kW directed energy weapon with Aegis Shield at White Sands Missile Range — first operational pairing of C-UAS command with high-energy laser.",
    href: "/news/press-releases",
  },
  {
    date: "Jan 2026",
    category: "Press Release",
    title: "NATO Selects Aegis Integrator",
    excerpt:
      "NATO has selected Aegis Integrator as the standard C-UAS interoperability platform for allied forces, enabling seamless cross-domain command and control across 32 member nations.",
    href: "/news/press-releases",
  },
  {
    date: "Jan 2026",
    category: "Blog",
    title: "Swarm Defense: Algorithm Explained",
    excerpt:
      "A deep technical dive into Aegis's autonomous swarm discrimination algorithm — how we classify, prioritize, and neutralize coordinated multi-drone attacks in real time.",
    href: "/technology/ai-ml",
  },
  {
    date: "Dec 2025",
    category: "Press Release",
    title: "Abu Dhabi Regional HQ Opens",
    excerpt:
      "Aegis inaugurates its Middle East and North Africa regional headquarters in Abu Dhabi, establishing dedicated logistics, training, and R&D capabilities for GCC partners.",
    href: "/news/press-releases",
  },
  {
    date: "Nov 2025",
    category: "Event",
    title: "Aegis at DSEI 2025 — Live Demo",
    excerpt:
      "Visit Aegis at Stand H4-200 at DSEI London for live demonstrations of Aegis Core v3.0 and directed energy integration. CEO keynote on main stage September 16.",
    href: "/news/events",
  },
  {
    date: "Nov 2025",
    category: "Press Release",
    title: "SkyWatch Airborne Intercept at RIMPAC",
    excerpt:
      "Aegis SkyWatch achieves first operational airborne drone intercept during RIMPAC 2025 exercises, neutralizing a simulated swarm attack from a maritime patrol aircraft platform.",
    href: "/news/press-releases",
  },
  {
    date: "Oct 2025",
    category: "Press Release",
    title: "Record $1.2B FY2025 Revenue",
    excerpt:
      "Aegis reports record revenue of $1.2B for fiscal year 2025, representing 42% year-over-year growth driven by expansion across 12 sovereign customers and directed energy upsells.",
    href: "/news/press-releases",
  },
  {
    date: "Sep 2025",
    category: "Press Release",
    title: "UK MoD £180M Airport Contract",
    excerpt:
      "The UK Ministry of Defence awards Aegis a £180M contract to deploy SkyWatch systems across 8 major airports and critical national infrastructure sites in the United Kingdom.",
    href: "/news/press-releases",
  },
  {
    date: "Aug 2025",
    category: "Press Release",
    title: "Certified Partner Program Launch",
    excerpt:
      "Aegis launches the Certified Partner Program, enabling qualified defense integrators to deploy, maintain, and service Aegis platforms worldwide with standardized training and certification.",
    href: "/news/press-releases",
  },
];

/* ────────────────────────────────────────────────────────────────
   CATEGORY BADGE
   ──────────────────────────────────────────────────────────────── */

function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className="text-[9px] uppercase tracking-[0.15em] text-white/50 border border-white/10 px-3 py-1 inline-block">
      {category}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────
   NEWS LIST with FILTER
   ──────────────────────────────────────────────────────────────── */

function NewsList() {
  const [active, setActive] = useState<FilterTab>("All");

  const filtered =
    active === "All"
      ? newsItems
      : newsItems.filter((item) => {
          if (active === "Events") return item.category === "Event";
          return item.category === active;
        });

  return (
    <section className="py-28 md:py-44 bg-black">
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
        <ScrollRevealComponent>
          <div className="mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Latest Updates
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              Recent News
            </h2>
          </div>
        </ScrollRevealComponent>

        {/* ── FILTER TABS ── */}
        <ScrollRevealComponent>
          <div className="flex flex-wrap gap-2 mb-16 border-b border-white/10 pb-6">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`text-[11px] uppercase tracking-[0.15em] px-5 py-2.5 border transition-all duration-200 ${
                  active === tab
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white/50 border-white/10 hover:text-white hover:border-white/30"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </ScrollRevealComponent>

        {/* ── NEWS ITEMS ── */}
        <div className="space-y-0">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.4,
                  delay: i * 40,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <Link
                  href={item.href}
                  className="block border-t border-white/10 group hover:bg-white/[0.02] transition-colors"
                >
                  <div className="py-8 md:py-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8 px-2 md:px-4 -mx-2 md:-mx-4">
                    {/* Left: date + category */}
                    <div className="md:w-48 flex-shrink-0 flex md:flex-col items-center md:items-start gap-3 md:gap-2">
                      <span className="text-[11px] uppercase tracking-[0.15em] text-white/30">
                        {item.date}
                      </span>
                      <CategoryBadge category={item.category} />
                    </div>

                    {/* Center: title + excerpt */}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-white/90 transition-colors tracking-[-0.01em] leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[#767676] text-sm md:text-base leading-relaxed mt-3 line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>

                    {/* Right: read more */}
                    <div className="flex-shrink-0 flex items-center md:pt-2">
                      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
                        Read More
                        <ArrowRight size={12} strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════ */

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

      {/* ── NEWS LIST WITH FILTER ── */}
      <NewsList />

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
