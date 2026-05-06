import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naval Task Force Protection",
  description:
    "How Aegis Mobile protected a naval task force across 3,200 nautical miles of contested waters against coordinated drone swarm attacks.",
};

export default function NavalTaskForceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
