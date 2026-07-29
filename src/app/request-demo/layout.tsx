import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Demo",
  description: "Schedule a classified briefing with the Aegis Defense Systems team. See our counter-UAS platforms in action.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
