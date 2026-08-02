import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology Partners — Aegis Defense Systems",
  description: "Aegis technology partners including radar vendors, EO/IR manufacturers, EW providers, and C2 platform integrations.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
