import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aegis Command",
  description: "Battle management and C2 system with kill chain automation, multi-domain coordination, and resource optimization.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
