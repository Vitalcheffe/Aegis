import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Library",
  description: "Product demonstrations, operational footage, and expert interviews — see Aegis counter-UAS systems in action.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
