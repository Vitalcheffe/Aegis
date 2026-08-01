import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webinars & Events",
  description: "Live and on-demand webinars covering counter-UAS technology, deployment strategies, and regulatory compliance.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
