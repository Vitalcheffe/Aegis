import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Demos",
  description: "Interactive counter-UAS demonstrations including radar PPI display, sensor fusion, and tracking simulation.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
