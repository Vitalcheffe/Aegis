import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Eight counter-UAS platforms built for every mission: Aegis Core, Tactical, Mobile, Shield, SkyWatch, Command, Sentinel, and Integrator.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
