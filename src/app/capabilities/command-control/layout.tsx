import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Command & Control",
  description: "Unified command and control with common operational picture, automated workflows, and multi-echelon coordination.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
