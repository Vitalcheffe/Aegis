import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Aegis Defense Systems — 800+ employees, 40% veterans, 98% retention rate.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
