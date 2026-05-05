import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aegis Shield",
  description: "Passive defense counter-UAS system with 360° coverage and zero electromagnetic emissions. Stealth operation.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
