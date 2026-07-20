import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Critical Infrastructure Power Grid Defense",
  description:
    "How Aegis Core deployed across 14 critical substations to eliminate hostile state-actor drone reconnaissance and protect a Nordic nation's power grid.",
};

export default function CriticalInfrastructurePowerGridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
