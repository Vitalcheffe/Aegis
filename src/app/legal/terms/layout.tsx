import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Aegis Defense Systems products and services.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
