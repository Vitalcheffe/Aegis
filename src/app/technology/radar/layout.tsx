import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radar Systems",
  description: "Multi-band phased array radar for drone detection — Aegis radar technology, waveforms, and performance specifications.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
