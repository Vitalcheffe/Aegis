import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quality & Compliance — Aegis Defense Systems",
  description: "Aegis quality management system, ISO certifications, and compliance standards for defense-grade counter-UAS systems.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
