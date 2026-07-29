import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certified Partner Program",
  description:
    "Join the Aegis Certified Partner Program — the world's most comprehensive counter-UAS partner ecosystem. Technology, Solution, and Research partnerships for defense innovators.",
  openGraph: {
    title: "Certified Partner Program | Aegis Defense Systems",
    description:
      "Build the future of counter-UAS defense with Aegis. Join our certified partner ecosystem spanning technology, solutions, and research.",
  },
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
