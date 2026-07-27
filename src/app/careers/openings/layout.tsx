import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Openings",
  description: "Open positions at Aegis Defense Systems: engineering, research, operations, product, and security.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
