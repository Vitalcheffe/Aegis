import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electronic Warfare",
  description: "Jamming, spoofing, and electronic attack capabilities — how Aegis EW systems neutralize UAS threats non-kinetically.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
