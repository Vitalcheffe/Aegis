"use client";

import {
  SectionHero,
  BlogCard,
  AnimatedStatsSection,
  CTASection,
  ScrollReveal,
} from "@/components/sections";

const articles = {
  technology: [
    {
      image: "/images/blog/ai-detection.jpg",
      tag: "Technology",
      title: "How AI is Revolutionizing Drone Detection",
      excerpt:
        "Machine learning and deep neural networks are transforming the speed and accuracy of UAS detection, enabling real-time classification of threats that traditional systems cannot distinguish from benign traffic.",
      date: "Jan 15, 2026",
      href: "/blog/ai-drone-detection",
    },
    {
      image: "/images/blog/rf-technology.jpg",
      tag: "Technology",
      title: "RF Sensing Technology: The First Line of Defense",
      excerpt:
        "Radio frequency sensing remains the most reliable method for detecting drone communications and telemetry signals. This article examines the latest advances in passive RF detection, signal fingerprinting, and protocol analysis for counter-UAS operations.",
      date: "Feb 3, 2026",
      href: "/blog/rf-sensing-technology",
    },
    {
      image: "/images/blog/sensor-fusion.jpg",
      tag: "Technology",
      title: "Sensor Fusion Architecture: Building the Complete Picture",
      excerpt:
        "No single sensor modality can provide comprehensive drone detection. We examine how multi-sensor fusion architectures combine radar, RF, EO/IR, and acoustic data to deliver continuous, high-confidence threat awareness.",
      date: "Mar 12, 2026",
      href: "/blog/sensor-fusion-architecture",
    },
    {
      image: "/images/blog/autonomous-defense.jpg",
      tag: "Technology",
      title: "Autonomous Defense Systems: The Future of Counter-UAS",
      excerpt:
        "As drone threats outpace human reaction times, autonomous counter-UAS systems are moving from concept to deployment. We analyze the technology, ethics, and operational requirements of machine-speed defense.",
      date: "Apr 8, 2026",
      href: "/blog/autonomous-drone-defense",
    },
    {
      image: "/images/blog/edge-computing.jpg",
      tag: "Technology",
      title: "Edge Computing in Defense: Processing at the Tactical Edge",
      excerpt:
        "Deploying AI inference and sensor processing at the tactical edge eliminates cloud dependency and reduces kill-chain latency. This article explores edge architectures for forward-deployed counter-UAS systems.",
      date: "May 22, 2026",
      href: "/blog/edge-computing-defense",
    },
  ],
  operations: [
    {
      image: "/images/blog/swarm-threats.jpg",
      tag: "Operations",
      title: "Countering the Swarm: Next-Generation Drone Threats",
      excerpt:
        "Coordinated drone swarms represent the most complex threat in the counter-UAS domain. This analysis covers swarm tactics, emergence patterns, and the multi-layered defense strategies required to neutralize massed UAV attacks.",
      date: "Jan 28, 2026",
      href: "/blog/drone-swarm-threats",
    },
    {
      image: "/images/blog/electronic-warfare.jpg",
      tag: "Operations",
      title: "The Evolution of Electronic Warfare in Counter-UAS",
      excerpt:
        "Electronic warfare has become the primary soft-kill mechanism against hostile drones. From wideband jamming to precision spoofing, we trace the evolution of EW techniques and their role in modern counter-UAS operations.",
      date: "Feb 18, 2026",
      href: "/blog/electronic-warfare-evolution",
    },
    {
      image: "/images/blog/military-programs.jpg",
      tag: "Operations",
      title: "Inside Military Counter-UAS Programs Worldwide",
      excerpt:
        "From the U.S. REPLICATOR initiative to Israel's Iron Beam, military counter-UAS programs are reshaping defense procurement. This survey examines the most significant programs across twelve nations and their strategic implications.",
      date: "Feb 25, 2026",
      href: "/blog/military-counter-uas-programs",
    },
    {
      image: "/images/blog/circuit-board.jpg",
      tag: "Operations",
      title: "Understanding the Counter-UAS Kill Chain",
      excerpt:
        "Effective counter-UAS operations depend on a seamless kill chain from detect to neutralize. We break down each phase — detect, track, classify, decide, defeat — and the technologies enabling end-to-end execution.",
      date: "Jun 10, 2026",
      href: "/blog/c-uas-kill-chain",
    },
  ],
  industry: [
    {
      image: "/images/blog/airport-security.jpg",
      tag: "Industry",
      title: "Airport Security in the Age of Drones",
      excerpt:
        "Drone incursions at airports have caused hundreds of flight cancellations and millions in economic losses. This article examines the operational challenges and integrated solutions protecting critical airspace.",
      date: "Mar 5, 2026",
      href: "/blog/airport-security-drones",
    },
    {
      image: "/images/blog/infrastructure-protection.jpg",
      tag: "Industry",
      title: "Critical Infrastructure Protection Against Drone Threats",
      excerpt:
        "Power plants, data centers, and government facilities face escalating drone threats. This article surveys the vulnerability landscape and presents layered defense architectures for critical infrastructure operators.",
      date: "Mar 20, 2026",
      href: "/blog/critical-infrastructure-protection",
    },
    {
      image: "/images/blog/urban-security.jpg",
      tag: "Industry",
      title: "Urban Air Mobility Security Challenges",
      excerpt:
        "The coming wave of urban air mobility vehicles will transform city skies — and create unprecedented security challenges. We examine the frameworks needed to secure dense, low-altitude urban airspace.",
      date: "May 14, 2026",
      href: "/blog/urban-air-mobility-security",
    },
  ],
  policy: [
    {
      image: "/images/blog/counter-uas-landscape.jpg",
      tag: "Policy",
      title: "The Counter-UAS Landscape in 2026: A Strategic Overview",
      excerpt:
        "The global counter-UAS market has undergone a dramatic transformation. This strategic overview examines market dynamics, technology trends, geopolitical drivers, and the evolving threat landscape shaping defense priorities.",
      date: "Jan 5, 2026",
      href: "/blog/counter-uas-landscape-2026",
    },
    {
      image: "/images/blog/nato-interoperability.jpg",
      tag: "Policy",
      title: "NATO Interoperability Standards for Counter-UAS Systems",
      excerpt:
        "Allied counter-UAS operations demand seamless interoperability. This article analyzes NATO STANAG developments, coalition integration challenges, and the path toward a unified allied defense architecture.",
      date: "Apr 22, 2026",
      href: "/blog/nato-interoperability",
    },
    {
      image: "/images/blog/regulations.jpg",
      tag: "Policy",
      title: "Navigating Counter-UAS Regulations and Legal Frameworks",
      excerpt:
        "Counter-UAS deployments must navigate a complex web of legal authorities, spectrum regulations, and airspace rules. This guide covers the regulatory landscape across major jurisdictions and emerging legal frameworks.",
      date: "May 5, 2026",
      href: "/blog/counter-uas-regulations",
    },
  ],
};

const categoryLabels: Record<string, string> = {
  technology: "Technology",
  operations: "Operations",
  industry: "Industry",
  policy: "Policy",
};

export default function BlogPage() {
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

      <AnimatedStatsSection
        label="By the Numbers"
        stats={[
          { value: 150, label: "Articles Published", suffix: "+" },
          { value: 14, label: "Categories" },
          { value: 12, label: "Nations Covered" },
          { value: 50, label: "Monthly Readers", suffix: "K+" },
        ]}
      />

      {Object.entries(articles).map(([category, items]) => (
        <section key={category} className="py-20 md:py-32 bg-black">
          <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
            <ScrollReveal>
              <div className="mb-16">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                  {categoryLabels[category]}
                </span>
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white">
                  {categoryLabels[category]}
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((article) => (
                <BlogCard key={article.href} {...article} />
              ))}
            </div>
          </div>
        </section>
      ))}

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
