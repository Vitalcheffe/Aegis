import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aegis Integrator",
  description: "Multi-system integration platform with API-first architecture, multi-vendor support, and legacy system compatibility.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
