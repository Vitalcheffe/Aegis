import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners",
  description: "Strategic partnerships with government, defense contractors, technology companies, and research institutions.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
