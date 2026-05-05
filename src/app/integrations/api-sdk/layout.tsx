import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API & SDK — Aegis Defense Systems",
  description: "Developer resources for Aegis integration. RESTful APIs, SDKs, and developer tools for counter-UAS system integration.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
