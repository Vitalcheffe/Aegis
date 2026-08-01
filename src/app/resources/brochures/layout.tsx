import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Brochures",
  description: "Company and product brochures for Aegis Defense Systems — download PDF overviews of our counter-UAS portfolio.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
