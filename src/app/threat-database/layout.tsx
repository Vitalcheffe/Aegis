import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drone Threat Intelligence Database",
  description:
    "Real-time threat data from 240+ deployed Aegis systems worldwide. The most comprehensive open-source counter-UAS intelligence database in the defense industry.",
  openGraph: {
    title: "Drone Threat Intelligence Database | Aegis Defense Systems",
    description:
      "Real-time threat data from 240+ deployed Aegis systems worldwide. The most comprehensive open-source counter-UAS intelligence database in the defense industry.",
  },
};

export default function ThreatDatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
