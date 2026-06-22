import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convoy Protection",
  description: "Mobile counter-UAS defense for military convoys. On-the-move protection with route clearance capabilities.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
