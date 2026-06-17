import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Critical Infrastructure",
  description: "Counter-UAS protection for power plants, data centers, and government facilities. SCADA integration.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
