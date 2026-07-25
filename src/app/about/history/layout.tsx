import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History",
  description: "From vision to global deployment — the Aegis Defense Systems journey from 2016 to present.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
