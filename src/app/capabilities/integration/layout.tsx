import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integration",
  description: "Multi-system integration with STANAG, JADC2, ATAK compatibility, and API-first architecture. Connect any sensor, any effector.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
