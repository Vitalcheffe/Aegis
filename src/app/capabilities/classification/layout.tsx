import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classification",
  description: "98.9% accuracy AI-driven threat classification across 200+ drone signatures. Machine learning identification in under 20ms.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
