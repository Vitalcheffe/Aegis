import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "White papers, datasheets, videos, webinars, and more — everything you need to evaluate Aegis counter-UAS defense systems.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
