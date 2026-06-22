import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Operations",
  description: "Silent, precise counter-UAS systems for special operations. Man-packable, stealth-capable platforms.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
