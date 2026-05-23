import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aegis Core",
  description: "Flagship counter-UAS platform with 500+ simultaneous targets, 50Hz update rate, 20ms classification. The world's most capable C-UAS system.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
