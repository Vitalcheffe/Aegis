import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Correctional Facility Contraband Interdiction",
  description:
    "How Aegis Sentinel deployed across eight federal prisons to achieve a 97% interdiction rate and eliminate drone-delivered contraband within 90 days.",
};

export default function CorrectionalFacilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
