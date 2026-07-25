import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Facilities — Aegis Defense Systems",
  description: "Aegis global offices, research labs, manufacturing facilities, and training centers across four continents.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
