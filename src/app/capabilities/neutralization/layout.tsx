import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neutralization",
  description: "Graduated response from RF jamming to directed energy. Five effector modalities with human-in-the-loop authorization.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
