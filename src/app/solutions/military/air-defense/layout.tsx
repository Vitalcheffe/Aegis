import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Air Defense",
  description: "Layered airspace protection with integrated air defense systems. Low-altitude threat engagement.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
