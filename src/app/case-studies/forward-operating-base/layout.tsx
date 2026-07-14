import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forward Operating Base Defense",
  description:
    "How Aegis Tactical provided rapid-deploy counter-UAS protection for 2,400 personnel under sustained adversarial drone operations at a forward operating base.",
};

export default function ForwardOperatingBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
