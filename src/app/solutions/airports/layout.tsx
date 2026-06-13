import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airport Security",
  description: "ATC-integrated counter-UAS for airports. 99.97% uptime with zero disruption to civilian air traffic.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
