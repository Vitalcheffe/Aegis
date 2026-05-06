import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Air Force Base Defense",
  description:
    "How Aegis Shield achieved 100% intercept rate and zero flightline disruptions across 14 months of continuous operation protecting forward deployed air assets.",
};

export default function AirForceBaseDefenseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
