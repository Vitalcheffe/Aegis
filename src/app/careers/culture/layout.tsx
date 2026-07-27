import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Culture",
  description: "Mission-driven, people-first culture at Aegis Defense Systems. Veteran support and professional growth.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
