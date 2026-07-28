import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company",
  description: "Aegis Defense Systems — Building the future of counter-UAS defense.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
