import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & Services",
  description: "Aegis support services, training programs, technical documentation, and customer portal for counter-UAS defense systems.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
