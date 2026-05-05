import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Led by defense veterans: former DARPA, Lockheed Martin, US Army, and NATO leadership.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
