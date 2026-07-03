import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert analysis, threat intelligence, and technology deep dives from the Aegis Defense Systems research team. Covering counter-UAS, sensor fusion, AI classification, and defense policy.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
