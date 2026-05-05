import { notFound } from "next/navigation";
import type { ComponentType } from "react";

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

const articles: Record<string, ComponentType> = {
  "counter-uas-landscape-2026": CounterUASLandscape2026,
  "ai-drone-detection": AIDroneDetection,
  "rf-sensing-technology": RFSensingTechnology,
  "drone-swarm-threats": DroneSwarmThreats,
  "electronic-warfare-evolution": ElectronicWarfareEvolution,
  "airport-security-drones": AirportSecurityDrones,
  "military-counter-uas-programs": MilitaryCounterUASPrograms,
  "sensor-fusion-architecture": SensorFusionArchitecture,
  "critical-infrastructure-protection": CriticalInfrastructureProtection,
  "autonomous-drone-defense": AutonomousDroneDefense,
  "nato-interoperability": NATOInteroperability,
  "counter-uas-regulations": CounterUASRegulations,
  "edge-computing-defense": EdgeComputingDefense,
  "urban-air-mobility-security": UrbanAirMobilitySecurity,
  "c-uas-kill-chain": CUASKillChain,
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
  const Article = articles[slug];
  if (!Article) notFound();
  return <Article />;
}
