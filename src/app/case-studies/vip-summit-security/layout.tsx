import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VIP Summit Security",
  description:
    "How Aegis Shield deployed a multi-layered counter-UAS umbrella across 25 km² with zero security incidents during a 72-hour G7 Summit.",
};

export default function VIPSummitSecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
