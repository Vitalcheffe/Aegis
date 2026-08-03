import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Advisories",
  description:
    "Real-time threat intelligence, vulnerability disclosures, and geopolitical analysis from Aegis Defense Systems deployments worldwide.",
  openGraph: {
    title: "Security Advisories | Aegis Defense Systems",
    description:
      "Real-time threat intelligence, vulnerability disclosures, and geopolitical analysis from Aegis Defense Systems deployments worldwide.",
  },
};

export default function SecurityAdvisoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
