"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About Aegis", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "History", href: "/about/history" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/about/partners" },
      { label: "Global Presence", href: "/about/global-presence" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Aegis Core", href: "/products/aegis-core" },
      { label: "Aegis Tactical", href: "/products/aegis-tactical" },
      { label: "Aegis Mobile", href: "/products/aegis-mobile" },
      { label: "Aegis Shield", href: "/products/aegis-shield" },
      { label: "Aegis SkyWatch", href: "/products/aegis-skywatch" },
      { label: "Aegis Command", href: "/products/aegis-command" },
      { label: "Aegis Sentinel", href: "/products/aegis-sentinel" },
      { label: "Aegis Integrator", href: "/products/aegis-integrator" },
      { label: "Compare Products", href: "/products/compare" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Military", href: "/solutions/military" },
      { label: "Airports", href: "/solutions/airports" },
      { label: "Critical Infrastructure", href: "/solutions/critical-infrastructure" },
      { label: "Border Security", href: "/solutions/border-security" },
      { label: "VIP Protection", href: "/solutions/vip-protection" },
      { label: "Maritime", href: "/solutions/maritime" },
      { label: "Urban Security", href: "/solutions/urban-security" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "White Papers", href: "/resources/white-papers" },
      { label: "Datasheets", href: "/resources/datasheets" },
      { label: "Videos", href: "/resources/videos" },
      { label: "Webinars", href: "/resources/webinars" },
      { label: "FAQ", href: "/resources/faq" },
      { label: "Glossary", href: "/resources/glossary" },
      { label: "Threat Database", href: "/threat-database" },
      { label: "Security Advisories", href: "/security-advisories" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Documentation", href: "/support/documentation" },
      { label: "Training", href: "/support/training" },
      { label: "Customer Portal", href: "/support/customer-portal" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
];

function MobileFooterColumn({
  column,
  isOpen,
  onToggle,
}: {
  column: (typeof footerColumns)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#222]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-[11px] uppercase tracking-[0.15em] font-medium text-white">
          {column.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-[#767676]" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <ul className="pb-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#767676] hover:text-white text-[13px] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Footer() {
  const [openColumn, setOpenColumn] = useState<string | null>(null);

  return (
    <>
      {/* Dual CTA Section */}
      <section className="border-t border-[#222]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Link
            href="/request-demo"
            className="group flex flex-col justify-center p-12 md:p-16 lg:p-24 bg-black hover:bg-[#0a0a0a] transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#767676] mb-5">
              Get Started
            </span>
            <span className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.04em] leading-[1.1] text-white group-hover:text-white/90 transition-colors">
              Request a Demo
            </span>
            <span className="mt-4 text-[#767676] text-sm group-hover:text-[#b9b9b9] transition-colors">
              Schedule a classified briefing with our defense team →
            </span>
          </Link>
          <Link
            href="/capabilities"
            className="group flex flex-col justify-center p-12 md:p-16 lg:p-24 bg-[#0a0a0a] border-l border-[#222] hover:bg-[#111111] transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#767676] mb-5">
              Learn More
            </span>
            <span className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.04em] leading-[1.1] text-white group-hover:text-white/90 transition-colors">
              Explore Capabilities
            </span>
            <span className="mt-4 text-[#767676] text-sm group-hover:text-[#b9b9b9] transition-colors">
              Discover our multi-layered defense architecture →
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#222] mt-auto">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          {/* Top: Logo + Tagline */}
          <div className="mb-14 md:mb-20">
            <Link
              href="/"
              className="text-white font-bold text-lg tracking-[0.3em] uppercase"
            >
              AEGIS
            </Link>
            <p className="mt-4 text-[#767676] text-sm leading-relaxed max-w-[340px]">
              Advanced counter-UAS defense systems protecting critical assets
              and infrastructure across 12 nations worldwide.
            </p>
          </div>

          {/* Desktop: 5-column grid */}
          <div className="hidden md:grid md:grid-cols-5 gap-10 lg:gap-14">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium text-white mb-6">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[#767676] hover:text-white text-[13px] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile: Accordion */}
          <div className="md:hidden">
            {footerColumns.map((col) => (
              <MobileFooterColumn
                key={col.title}
                column={col}
                isOpen={openColumn === col.title}
                onToggle={() =>
                  setOpenColumn(openColumn === col.title ? null : col.title)
                }
              />
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#222]">
          <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Left: Logo + Copyright */}
              <div className="flex items-center gap-4">
                <span className="text-white font-bold text-[13px] tracking-[0.25em] uppercase">
                  AEGIS
                </span>
                <span className="hidden md:inline text-[#333]">|</span>
                <span className="text-[#767676] text-xs">
                  &copy; 2026 Aegis Defense Systems. All rights reserved.
                </span>
              </div>

              {/* Right: Legal Links */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Link
                  href="/legal/privacy"
                  className="text-[#767676] hover:text-white text-xs transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-[#333]">|</span>
                <Link
                  href="/legal/terms"
                  className="text-[#767676] hover:text-white text-xs transition-colors"
                >
                  Terms of Service
                </Link>
                <span className="text-[#333]">|</span>
                <Link
                  href="/legal/itar"
                  className="text-[#767676] hover:text-white text-xs transition-colors"
                >
                  ITAR Notice
                </Link>
                <span className="text-[#333]">|</span>
                <Link
                  href="/legal/export-control"
                  className="text-[#767676] hover:text-white text-xs transition-colors"
                >
                  Export Control
                </Link>
                <span className="text-[#333]">|</span>
                <Link
                  href="/legal/compliance"
                  className="text-[#767676] hover:text-white text-xs transition-colors"
                >
                  Compliance
                </Link>
              </div>
            </div>

            {/* ITAR Notice */}
            <div className="mt-6 pt-6 border-t border-[#222]">
              <p className="text-[#444] text-[11px] leading-relaxed max-w-4xl">
                This product is subject to U.S. export controls under the
                International Traffic in Arms Regulations (ITAR). Unauthorized
                export or re-export is prohibited.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
