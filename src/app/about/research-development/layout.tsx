import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research & Development — Aegis Defense Systems",
  description: "Aegis R&D capabilities, innovation labs, and next-generation counter-UAS technology development.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
