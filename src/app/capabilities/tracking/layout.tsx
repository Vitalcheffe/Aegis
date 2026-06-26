import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tracking",
  description: "IMM-UKF tracking algorithms maintaining 500+ simultaneous tracks at 50Hz update rate. Swarm-capable with autonomous track association.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
