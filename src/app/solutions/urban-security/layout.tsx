import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urban Security",
  description: "Smart city counter-UAS defense with urban drone detection and public event security.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
