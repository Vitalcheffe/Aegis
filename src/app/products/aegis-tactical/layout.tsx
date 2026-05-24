import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aegis Tactical",
  description: "Mobile counter-UAS platform with 200+ simultaneous targets, 25Hz update rate. Rapid deployment for tactical operations.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
