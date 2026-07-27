import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Relations",
  description: "Aegis Defense Systems investor relations — $2.4B valuation, 180% YoY revenue growth, 12-nation deployment.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
