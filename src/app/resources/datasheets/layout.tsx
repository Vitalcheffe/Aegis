import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Datasheets",
  description: "Technical datasheets for all Aegis counter-UAS defense products — specifications, performance, and integration details.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
