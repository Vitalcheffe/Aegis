import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news, press releases, and events from Aegis Defense Systems.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
