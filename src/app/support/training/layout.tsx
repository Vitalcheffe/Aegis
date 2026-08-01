import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training Programs — Aegis Defense Systems",
  description: "Comprehensive training programs for Aegis counter-UAS operators, maintainers, and system administrators.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
