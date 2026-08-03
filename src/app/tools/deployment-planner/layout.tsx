import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deployment Planner",
  description:
    "Plan optimal sensor placement and coverage zones for your operational environment. Select scenarios, configure parameters, and visualize Aegis deployment recommendations.",
};

export default function DeploymentPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
