import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capabilities",
  description: "Full-spectrum counter-UAS capabilities: detection, tracking, classification, neutralization, command & control, and multi-system integration.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
