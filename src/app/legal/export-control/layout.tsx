import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Export Control",
  description: "Export control regulations, ECCN classifications, and end-user monitoring for Aegis Defense Systems products.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
