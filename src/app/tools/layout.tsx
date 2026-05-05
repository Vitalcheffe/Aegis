import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Tools",
  description:
    "Aegis Defense Systems interactive tools: radar range calculator, product comparison, threat identifier, and deployment planner.",
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
