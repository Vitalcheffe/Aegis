import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aegis Sentinel",
  description: "Autonomous AI-driven counter-UAS sentry with self-directed engagement and persistent 24/7 vigilance.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
