import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import CounterUASLandscape2026 from "@/components/blog/articles/counter-uas-landscape-2026";
import AIDroneDetection from "@/components/blog/articles/ai-drone-detection";
import RFSensingTechnology from "@/components/blog/articles/rf-sensing-technology";
import DroneSwarmThreats from "@/components/blog/articles/drone-swarm-threats";
import ElectronicWarfareEvolution from "@/components/blog/articles/electronic-warfare-evolution";
import AirportSecurityDrones from "@/components/blog/articles/airport-security-drones";
import MilitaryCounterUASPrograms from "@/components/blog/articles/military-counter-uas-programs";
import SensorFusionArchitecture from "@/components/blog/articles/sensor-fusion-architecture";
import CriticalInfrastructureProtection from "@/components/blog/articles/critical-infrastructure-protection";
import AutonomousDroneDefense from "@/components/blog/articles/autonomous-drone-defense";
import NATOInteroperability from "@/components/blog/articles/nato-interoperability";
import CounterUASRegulations from "@/components/blog/articles/counter-uas-regulations";
import EdgeComputingDefense from "@/components/blog/articles/edge-computing-defense";
import UrbanAirMobilitySecurity from "@/components/blog/articles/urban-air-mobility-security";
import CUASKillChain from "@/components/blog/articles/c-uas-kill-chain";

type ArticleMeta = {
  component: ComponentType;
  category: string;
  date: string;
  readTime: string;
};

const articles: Record<string, ArticleMeta> = {
  "counter-uas-landscape-2026": {
    component: CounterUASLandscape2026,
    category: "Industry",
    date: "Jan 2026",
    readTime: "12 min",
  },
  "ai-drone-detection": {
    component: AIDroneDetection,
    category: "Technology",
    date: "Feb 2026",
    readTime: "10 min",
  },
  "rf-sensing-technology": {
    component: RFSensingTechnology,
    category: "Technology",
    date: "Oct 2025",
    readTime: "11 min",
  },
  "drone-swarm-threats": {
    component: DroneSwarmThreats,
    category: "Threat Analysis",
    date: "Feb 2026",
    readTime: "14 min",
  },
  "electronic-warfare-evolution": {
    component: ElectronicWarfareEvolution,
    category: "Technology",
    date: "Nov 2025",
    readTime: "12 min",
  },
  "airport-security-drones": {
    component: AirportSecurityDrones,
    category: "Operations",
    date: "Mar 2026",
    readTime: "8 min",
  },
  "military-counter-uas-programs": {
    component: MilitaryCounterUASPrograms,
    category: "Industry",
    date: "Mar 2026",
    readTime: "13 min",
  },
  "sensor-fusion-architecture": {
    component: SensorFusionArchitecture,
    category: "Technology",
    date: "Dec 2025",
    readTime: "14 min",
  },
  "critical-infrastructure-protection": {
    component: CriticalInfrastructureProtection,
    category: "Operations",
    date: "Dec 2025",
    readTime: "10 min",
  },
  "autonomous-drone-defense": {
    component: AutonomousDroneDefense,
    category: "Technology",
    date: "Feb 2026",
    readTime: "15 min",
  },
  "nato-interoperability": {
    component: NATOInteroperability,
    category: "Operations",
    date: "Jan 2026",
    readTime: "10 min",
  },
  "counter-uas-regulations": {
    component: CounterUASRegulations,
    category: "Regulations",
    date: "Mar 2026",
    readTime: "9 min",
  },
  "edge-computing-defense": {
    component: EdgeComputingDefense,
    category: "Technology",
    date: "Jan 2026",
    readTime: "8 min",
  },
  "urban-air-mobility-security": {
    component: UrbanAirMobilitySecurity,
    category: "Industry",
    date: "Mar 2026",
    readTime: "9 min",
  },
  "c-uas-kill-chain": {
    component: CUASKillChain,
    category: "Technology",
    date: "Jan 2026",
    readTime: "11 min",
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articleMeta = articles[slug];
  if (!articleMeta) notFound();

  const ArticleComponent = articleMeta.component;

  return (
    <>
      {/* Article Navigation Bar */}
      <div className="bg-[#0a0a0a] border-b border-[#222]">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-[#767676] hover:text-white text-[11px] uppercase tracking-[0.15em] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-[#222] px-3 py-1">
              {articleMeta.category}
            </span>
            <span className="text-[10px] text-[#555] uppercase tracking-[0.1em]">
              {articleMeta.date}
            </span>
            <span className="text-[10px] text-[#555] hidden sm:inline">
              {articleMeta.readTime} read
            </span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <ArticleComponent />
    </>
  );
}
