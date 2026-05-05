import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aegis Mobile",
  description: "Man-packable counter-UAS system with RF direction finding. 50+ targets, individual soldier protection.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
