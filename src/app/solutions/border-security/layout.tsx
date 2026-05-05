import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Border Security",
  description: "Long-range corridor surveillance, coastal zone monitoring, and frontier defense with persistent 24/7 coverage.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
