import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation — Aegis Defense Systems",
  description: "Technical documentation, operator manuals, integration guides, and API references for Aegis counter-UAS systems.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
