import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications",
  description: "NATO STANAG, ITAR, ISO 27001, MIL-STD-810, Common Criteria EAL4+, FIPS 140-2, and FedRAMP certified.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
