import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming defense exhibitions, trade shows, and Aegis demonstration events.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
