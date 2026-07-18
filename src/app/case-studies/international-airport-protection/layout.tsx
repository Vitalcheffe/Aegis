import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "International Airport Protection",
  description:
    "How Aegis Shield eliminated runway disruptions and restored passenger confidence at one of Europe's busiest aviation hubs handling 75 million passengers annually.",
};

export default function InternationalAirportProtectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
