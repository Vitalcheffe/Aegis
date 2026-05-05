import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press Releases",
  description: "Official press releases and announcements from Aegis Defense Systems.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
