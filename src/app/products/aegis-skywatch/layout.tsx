import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aegis SkyWatch",
  description: "Long-range air surveillance and persistent counter-UAS coverage. Multi-domain awareness for strategic assets.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
