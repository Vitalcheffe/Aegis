import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology",
  description: "The Aegis 5-layer defense architecture: Sensor, Fusion, AI, Decision, Action. Technical deep-dive.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
