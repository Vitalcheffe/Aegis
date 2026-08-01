import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "White Papers",
  description: "In-depth technical white papers on counter-UAS defense technology, strategy, and Aegis system architecture.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
