import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naval Counter-UAS",
  description: "Maritime counter-UAS defense for naval vessels. Shipboard protection against drone swarms at sea.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
