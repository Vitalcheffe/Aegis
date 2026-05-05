import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Presence — Aegis Defense Systems",
  description:
    "Aegis systems deployed across 12 nations with 240+ installations. Interactive global deployment map showing military, airport, critical infrastructure, and border security installations worldwide.",
};

export default function GlobalPresenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
