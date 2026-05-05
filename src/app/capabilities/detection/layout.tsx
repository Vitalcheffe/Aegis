import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detection",
  description: "Multi-spectral UAS detection with S-band radar, RF direction finding, EO/IR sensors, and acoustic arrays. 12km detection range, 360° coverage.",
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
