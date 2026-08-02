import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Compatibility — Aegis Defense Systems",
  description: "Aegis compatibility with NATO C2, Link 16, STANAG 4586, and existing defense system architectures.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
