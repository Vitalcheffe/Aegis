import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maritime Security",
  description: "Counter-UAS protection for ports, offshore assets, and strategic waterways.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
