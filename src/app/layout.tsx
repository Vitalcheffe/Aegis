import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aegis — Counter-UAS Defense Systems",
    template: "%s | Aegis Defense Systems",
  },
  description:
    "Advanced multi-spectral counter-UAS defense system. Detection, tracking, classification, and neutralization of unmanned aerial threats in 20 milliseconds.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
  },
  metadataBase: new URL("https://aegisco.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aegisco.vercel.app",
    siteName: "Aegis Defense Systems",
    title: "Aegis — Counter-UAS Defense Systems",
    description:
      "Advanced multi-spectral counter-UAS defense system. Detection, tracking, classification, and neutralization of unmanned aerial threats in 20 milliseconds.",
    images: [
      {
        url: "/images/pages/homepage-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Aegis Counter-UAS Defense System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aegis — Counter-UAS Defense Systems",
    description:
      "Advanced multi-spectral counter-UAS defense system protecting critical assets across 12 nations.",
    images: ["/images/pages/homepage-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-black text-white min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
