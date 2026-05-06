import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maritime Port Security",
  description:
    "How Aegis Shield provided layered protection across a major commercial port handling 12 million TEU annually without disrupting cargo operations.",
};

export default function MaritimePortSecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
