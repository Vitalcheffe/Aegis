import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solution Selection Guide",
  description: "Interactive guide to choosing the right Aegis counter-UAS solution for your operational environment and threat profile.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
