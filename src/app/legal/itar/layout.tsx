import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ITAR Compliance",
  description: "ITAR compliance information for Aegis Defense Systems products. International Traffic in Arms Regulations.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
