import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sensor Fusion",
  description: "Multi-modal data integration — how Aegis fuses radar, RF, EO/IR, and acoustic data into a single operational picture.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
