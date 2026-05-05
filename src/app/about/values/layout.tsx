import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Values — Aegis Defense Systems",
  description: "The core values and principles that guide Aegis Defense Systems in building the world's most trusted counter-UAS technology.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
