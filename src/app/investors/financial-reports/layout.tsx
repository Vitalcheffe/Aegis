import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Reports",
  description: "Annual reports, quarterly earnings, and SEC filings from Aegis Defense Systems.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
