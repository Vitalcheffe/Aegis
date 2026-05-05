import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company",
  description: "Aegis Defense Systems — 800+ employees, 12 nations, $2.4B valuation. Building the future of counter-UAS defense.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
