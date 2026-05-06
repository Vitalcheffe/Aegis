"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  SectionHero,
  ScrollReveal,
  CTASection,
} from "@/components/sections";

type Category = "All" | "Technology" | "Threat Analysis" | "Operations" | "Industry" | "Regulations";

interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  readTime: string;
  date: string;
}

const categories: Category[] = [
  "All",
  "Technology",
  "Threat Analysis",
  "Operations",
  "Industry",
  "Regulations",
];

const articles: BlogArticle[] = [
  {
    slug: "counter-uas-landscape-2026",
    title: "Counter-UAS Landscape 2026: A Comprehensive Market Analysis",
    excerpt:
      "The global counter-UAS market has undergone a dramatic transformation. This strategic overview examines market dynamics, technology trends, and the evolving threat landscape shaping defense priorities.",
    category: "Industry",
    readTime: "12 min",
    date: "Jan 2026",
  },
  {
    slug: "ai-drone-detection",
    title: "AI-Driven Drone Detection: How Neural Networks Process 12 Million Signal Signatures",
    excerpt:
      "Machine learning and deep neural networks are transforming the speed and accuracy of UAS detection, enabling real-time classification of threats that traditional systems cannot distinguish.",
    category: "Technology",
    readTime: "10 min",
    date: "Feb 2026",
  },
  {
    slug: "airport-security-drones",
    title: "Airport Security in the Drone Age: Protecting 45 Million Passengers",
    excerpt:
      "Drone incursions at airports have caused hundreds of flight cancellations. This article examines the operational challenges and integrated solutions protecting critical airspace.",
    category: "Operations",
    readTime: "8 min",
    date: "Mar 2026",
  },
  {
    slug: "autonomous-drone-defense",
    title: "Autonomous Drone Defense: The Ethics and Engineering of AI-Engaged Response",
    excerpt:
      "As drone threats outpace human reaction times, autonomous counter-UAS systems are moving from concept to deployment. We analyze the technology, ethics, and operational requirements.",
    category: "Technology",
    readTime: "15 min",
    date: "Feb 2026",
  },
  {
    slug: "c-uas-kill-chain",
    title: "The Counter-UAS Kill Chain: From Detection to Neutralization in 20ms",
    excerpt:
      "Effective counter-UAS operations depend on a seamless kill chain from detect to neutralize. We break down each phase and the technologies enabling end-to-end execution.",
    category: "Technology",
    readTime: "11 min",
    date: "Jan 2026",
  },
  {
    slug: "counter-uas-regulations",
    title: "Counter-UAS Regulations: Navigating the Global Compliance Landscape",
    excerpt:
      "Counter-UAS deployments must navigate a complex web of legal authorities, spectrum regulations, and airspace rules. This guide covers the regulatory landscape across major jurisdictions.",
    category: "Regulations",
    readTime: "9 min",
    date: "Mar 2026",
  },
  {
    slug: "critical-infrastructure-protection",
    title: "Critical Infrastructure Protection: Lessons from 200+ Deployments",
    excerpt:
      "Power plants, data centers, and government facilities face escalating drone threats. This article surveys the vulnerability landscape and presents layered defense architectures.",
    category: "Operations",
    readTime: "10 min",
    date: "Dec 2025",
  },
  {
    slug: "drone-swarm-threats",
    title: "Drone Swarm Threats: Evolution, Tactics, and Counter-Strategies",
    excerpt:
      "Coordinated drone swarms represent the most complex threat in the counter-UAS domain. This analysis covers swarm tactics, emergence patterns, and multi-layered defense strategies.",
    category: "Threat Analysis",
    readTime: "14 min",
    date: "Feb 2026",
  },
  {
    slug: "edge-computing-defense",
    title: "Edge Computing in Defense: Processing 175 TOPS at the Tactical Edge",
    excerpt:
      "Deploying AI inference and sensor processing at the tactical edge eliminates cloud dependency and reduces kill-chain latency. This article explores edge architectures for forward-deployed systems.",
    category: "Technology",
    readTime: "8 min",
    date: "Jan 2026",
  },
  {
    slug: "electronic-warfare-evolution",
    title: "Electronic Warfare Evolution: RF Sensing in Contested Environments",
    excerpt:
      "Electronic warfare has become the primary soft-kill mechanism against hostile drones. We trace the evolution of EW techniques and their role in modern counter-UAS operations.",
    category: "Technology",
    readTime: "12 min",
    date: "Nov 2025",
  },
  {
    slug: "military-counter-uas-programs",
    title: "Military Counter-UAS Programs: A Global Overview of Defense Investments",
    excerpt:
      "From the U.S. REPLICATOR initiative to Israel's Iron Beam, military counter-UAS programs are reshaping defense procurement across twelve nations and their strategic implications.",
    category: "Industry",
    readTime: "13 min",
    date: "Mar 2026",
  },
  {
    slug: "nato-interoperability",
    title: "NATO Interoperability: Building Allied Counter-UAS Capabilities",
    excerpt:
      "Allied counter-UAS operations demand seamless interoperability. This article analyzes NATO STANAG developments, coalition integration challenges, and the path toward unified allied defense.",
    category: "Operations",
    readTime: "10 min",
    date: "Jan 2026",
  },
  {
    slug: "rf-sensing-technology",
    title: "RF Sensing Technology: Direction-Finding and Signal Classification",
    excerpt:
      "Radio frequency sensing remains the most reliable method for detecting drone communications and telemetry signals. This article examines the latest advances in passive RF detection.",
    category: "Technology",
    readTime: "11 min",
    date: "Oct 2025",
  },
  {
    slug: "sensor-fusion-architecture",
    title: "Sensor Fusion Architecture: Correlating Radar, RF, EO/IR, and Acoustic Data",
    excerpt:
      "No single sensor modality can provide comprehensive drone detection. We examine how multi-sensor fusion architectures combine radar, RF, EO/IR, and acoustic data for continuous threat awareness.",
    category: "Technology",
    readTime: "14 min",
    date: "Dec 2025",
  },
  {
    slug: "urban-air-mobility-security",
    title: "Urban Air Mobility Security: Preparing for the eVTOL Revolution",
    excerpt:
      "The coming wave of urban air mobility vehicles will transform city skies — and create unprecedented security challenges. We examine the frameworks needed to secure dense, low-altitude urban airspace.",
    category: "Industry",
    readTime: "9 min",
    date: "Mar 2026",
  },
];

function BlogArticleCard({ article, index }: { article: BlogArticle; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link
        href={`/blog/${article.slug}`}
        className="group block border border-[#222] hover:border-[#444] bg-[#0a0a0a] transition-all duration-300 h-full"
      >
        <div className="p-6 md:p-8 flex flex-col h-full">
          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/50 border border-[#222] px-3 py-1">
              {article.category}
            </span>
            <span className="text-[10px] text-[#767676] uppercase tracking-[0.1em]">
              {article.date}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors leading-tight">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[#767676] text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
            {article.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#222]">
            <span className="text-[10px] uppercase tracking-[0.15em] text-white border-b border-white/30 pb-0.5 group-hover:border-white transition-colors">
              Read Article
            </span>
            <span className="text-[11px] text-[#555]">{article.readTime}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <>
      <SectionHero
        image="/images/blog/counter-uas-landscape.jpg"
        label="Aegis Defense Systems"
        title="Blog"
        subtitle="Analysis, insights, and intelligence on the evolving counter-UAS landscape"
        gradient="from-black via-black/80 to-black/50"
        align="center"
      />

      {/* Category Filters + Grid */}
      <section className="py-20 md:py-32 bg-black">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          {/* Category Filter Bar */}
          <ScrollReveal>
            <div className="mb-16">
              <div className="flex flex-wrap gap-2 md:gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[10px] md:text-[11px] uppercase tracking-[0.15em] px-5 py-2.5 border transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-[#767676] border-[#222] hover:border-[#555] hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Article Count */}
              <div className="mt-6 text-[11px] text-[#555] uppercase tracking-[0.1em]">
                {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
                {activeCategory !== "All" && (
                  <span>
                    {" "}
                    in <span className="text-[#767676]">{activeCategory}</span>
                  </span>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Blog Cards Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article, i) => (
                <BlogArticleCard
                  key={article.slug}
                  article={article}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <p className="text-[#767676] text-sm">
                No articles found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <CTASection
        title="Stay Informed"
        subtitle="Subscribe to receive the latest counter-UAS analysis, technology updates, and strategic insights from Aegis Defense Systems."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Capabilities"
        secondaryHref="/capabilities"
      />
    </>
  );
}
