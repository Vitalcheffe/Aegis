import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urban Smart City Integration",
  description:
    "How Aegis Command integrated with a metropolitan smart infrastructure platform to provide real-time urban airspace management for 4 million residents.",
};

export default function UrbanSmartCityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
