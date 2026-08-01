import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Counter-UAS Glossary",
  description: "Alphabetical glossary of defense, radar, electronic warfare, and counter-UAS terminology.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
