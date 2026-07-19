import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Border Security Mission",
  description:
    "How Aegis Command integrated with CBP systems to achieve 99.8% interdiction across 450 km of the southern border, preventing over 1,500 drone crossings.",
};

export default function BorderSecurityMissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
