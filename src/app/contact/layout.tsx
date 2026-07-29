import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Aegis Defense Systems — offices in Washington DC, London, Abu Dhabi, and Singapore.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
