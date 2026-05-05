import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prison Security",
  description: "Counter-UAS systems stopping drone-delivered contraband. Perimeter security for correctional facilities.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
