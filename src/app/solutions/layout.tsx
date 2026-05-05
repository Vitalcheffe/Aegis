import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Counter-UAS solutions for military, airports, critical infrastructure, border security, VIP protection, and maritime operations.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
