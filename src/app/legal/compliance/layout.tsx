import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance",
  description: "Regulatory compliance framework: export control, classification, licensing, and auditing.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
