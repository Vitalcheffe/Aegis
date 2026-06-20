import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Military Solutions",
  description: "Battlefield-proven counter-UAS defense for forward operating bases, naval vessels, convoys, special operations, and air defense.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
