import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Portal — Aegis Defense Systems",
  description: "Access support tickets, firmware updates, knowledge base, and account management for Aegis counter-UAS systems.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
