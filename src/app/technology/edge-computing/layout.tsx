import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edge Computing",
  description: "Processing at the tactical edge — how Aegis delivers 175 TOPS of AI inference in a ruggedized, deployable package.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
