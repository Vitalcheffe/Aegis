import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VIP Protection",
  description: "Discreet, comprehensive counter-UAS protection for VIPs, executives, and high-profile events.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
