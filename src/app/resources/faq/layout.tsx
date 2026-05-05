import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Comprehensive FAQ covering Aegis counter-UAS technology, deployment, compliance, and integration questions.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
