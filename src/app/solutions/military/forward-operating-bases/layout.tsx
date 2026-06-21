import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forward Operating Bases",
  description: "360° counter-UAS protection for forward operating bases. Perimeter defense with integrated sensor coverage.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
