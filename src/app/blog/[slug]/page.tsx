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
  title: string;
  description: string;
};

const articles: Record<string, ArticleMeta> = {
  "counter-uas-landscape-2026": {
    component: CounterUASLandscape2026,
    category: "Industry",
    date: "Jan 2026",
    readTime: "12 min",
    title: "Counter-UAS Landscape 2026: A Comprehensive Market Analysis",
    description:
      "The global counter-UAS market has undergone a dramatic transformation. This strategic overview examines market dynamics, technology trends, and the evolving threat landscape shaping defense priorities.",
  },
  "ai-drone-detection": {
    component: AIDroneDetection,
    category: "Technology",
    date: "Feb 2026",
    readTime: "10 min",
    title: "AI-Driven Drone Detection: How Neural Networks Process 12 Million Signal Signatures",
    description:
      "Machine learning and deep neural networks are transforming the speed and accuracy of UAS detection, enabling real-time classification of threats that traditional systems cannot distinguish.",
  },
  "rf-sensing-technology": {
    component: RFSensingTechnology,
    category: "Technology",
    date: "Oct 2025",
    readTime: "11 min",
    title: "RF Sensing Technology: Direction-Finding and Signal Classification",
    description:
      "Radio frequency sensing remains the most reliable method for detecting drone communications and telemetry signals. This article examines the latest advances in passive RF detection.",
  },
  "drone-swarm-threats": {
    component: DroneSwarmThreats,
    category: "Threat Analysis",
    date: "Feb 2026",
    readTime: "14 min",
    title: "Drone Swarm Threats: Evolution, Tactics, and Counter-Strategies",
    description:
      "Coordinated drone swarms represent the most complex threat in the counter-UAS domain. This analysis covers swarm tactics, emergence patterns, and multi-layered defense strategies.",
  },
  "electronic-warfare-evolution": {
    component: ElectronicWarfareEvolution,
    category: "Technology",
    date: "Nov 2025",
    readTime: "12 min",
    title: "Electronic Warfare Evolution: RF Sensing in Contested Environments",
    description:
      "Electronic warfare has become the primary soft-kill mechanism against hostile drones. We trace the evolution of EW techniques and their role in modern counter-UAS operations.",
  },
  "airport-security-drones": {
    component: AirportSecurityDrones,
    category: "Operations",
    date: "Mar 2026",
    readTime: "8 min",
    title: "Airport Security in the Drone Age: Protecting 45 Million Passengers",
    description:
      "Drone incursions at airports have caused hundreds of flight cancellations. This article examines the operational challenges and integrated solutions protecting critical airspace.",
  },
  "military-counter-uas-programs": {
    component: MilitaryCounterUASPrograms,
    category: "Industry",
    date: "Mar 2026",
    readTime: "13 min",
    title: "Military Counter-UAS Programs: A Global Overview of Defense Investments",
    description:
      "From the U.S. REPLICATOR initiative to Israel's Iron Beam, military counter-UAS programs are reshaping defense procurement across twelve nations and their strategic implications.",
  },
  "sensor-fusion-architecture": {
    component: SensorFusionArchitecture,
    category: "Technology",
    date: "Dec 2025",
    readTime: "14 min",
    title: "Sensor Fusion Architecture: Correlating Radar, RF, EO/IR, and Acoustic Data",
    description:
      "No single sensor modality can provide comprehensive drone detection. We examine how multi-sensor fusion architectures combine radar, RF, EO/IR, and acoustic data for continuous threat awareness.",
  },
  "critical-infrastructure-protection": {
    component: CriticalInfrastructureProtection,
    category: "Operations",
    date: "Dec 2025",
    readTime: "10 min",
    title: "Critical Infrastructure Protection: Lessons from 200+ Deployments",
    description:
      "Power plants, data centers, and government facilities face escalating drone threats. This article surveys the vulnerability landscape and presents layered defense architectures.",
  },
  "autonomous-drone-defense": {
    component: AutonomousDroneDefense,
    category: "Technology",
    date: "Feb 2026",
    readTime: "15 min",
    title: "Autonomous Drone Defense: The Ethics and Engineering of AI-Engaged Response",
    description:
      "As drone threats outpace human reaction times, autonomous counter-UAS systems are moving from concept to deployment. We analyze the technology, ethics, and operational requirements.",
  },
  "nato-interoperability": {
    component: NATOInteroperability,
    category: "Operations",
    date: "Jan 2026",
    readTime: "10 min",
    title: "NATO Interoperability: Building Allied Counter-UAS Capabilities",
    description:
      "Allied counter-UAS operations demand seamless interoperability. This article analyzes NATO STANAG developments, coalition integration challenges, and the path toward unified allied defense.",
  },
  "counter-uas-regulations": {
    component: CounterUASRegulations,
    category: "Regulations",
    date: "Mar 2026",
    readTime: "9 min",
    title: "Counter-UAS Regulations: Navigating the Global Compliance Landscape",
    description:
      "Counter-UAS deployments must navigate a complex web of legal authorities, spectrum regulations, and airspace rules. This guide covers the regulatory landscape across major jurisdictions.",
  },
  "edge-computing-defense": {
    component: EdgeComputingDefense,
    category: "Technology",
    date: "Jan 2026",
    readTime: "8 min",
    title: "Edge Computing in Defense: Processing 175 TOPS at the Tactical Edge",
    description:
      "Deploying AI inference and sensor processing at the tactical edge eliminates cloud dependency and reduces kill-chain latency. This article explores edge architectures for forward-deployed systems.",
  },
  "urban-air-mobility-security": {
    component: UrbanAirMobilitySecurity,
    category: "Industry",
    date: "Mar 2026",
    readTime: "9 min",
    title: "Urban Air Mobility Security: Preparing for the eVTOL Revolution",
    description:
      "The coming wave of urban air mobility vehicles will transform city skies — and create unprecedented security challenges. We examine the frameworks needed to secure dense, low-altitude urban airspace.",
  },
  "c-uas-kill-chain": {
    component: CUASKillChain,
    category: "Technology",
    date: "Jan 2026",
    readTime: "11 min",
    title: "The Counter-UAS Kill Chain: From Detection to Neutralization in 20ms",
    description:
      "Effective counter-UAS operations depend on a seamless kill chain from detect to neutralize. We break down each phase and the technologies enabling end-to-end execution.",
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
  };
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
