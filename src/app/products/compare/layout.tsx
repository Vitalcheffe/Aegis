import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Products | Aegis Defense Systems",
  description:
    "Side-by-side comparison of all Aegis counter-UAS platforms. Compare detection range, tracking capacity, classification accuracy, and more across the full product family.",
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
