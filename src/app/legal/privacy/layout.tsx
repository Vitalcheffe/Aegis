import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Aegis Defense Systems privacy policy — data collection, usage, sharing, and your rights.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
