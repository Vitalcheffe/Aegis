import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Aegis",
  description: "The story of Aegis Defense Systems — from founding in 2016 to global deployment across 12 nations.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
