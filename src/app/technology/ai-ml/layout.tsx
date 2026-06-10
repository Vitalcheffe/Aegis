import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Machine Learning",
  description: "Neural networks, deep learning, and AI-driven threat classification — how Aegis identifies and prioritizes UAS threats in milliseconds.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
