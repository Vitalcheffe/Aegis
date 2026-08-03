import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radar Range Calculator",
  description:
    "Interactive radar detection range calculator powered by the radar equation. Configure radar type, target RCS, frequency band, and environment to compute maximum detection, tracking, classification, and neutralization ranges.",
};

export default function RangeCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
