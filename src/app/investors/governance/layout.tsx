import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Governance",
  description: "Board of directors, committee structure, code of ethics, and risk management at Aegis Defense Systems.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
