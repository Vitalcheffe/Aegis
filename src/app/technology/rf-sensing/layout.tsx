import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RF Sensing Technology",
  description: "Deep dive into Aegis radio frequency detection and signal intelligence — the foundation of passive counter-UAS surveillance.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
