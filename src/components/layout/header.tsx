"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// ──────────────────────────────────────────────
// Navigation data
// ──────────────────────────────────────────────
interface SubItem {
  label: string;
  href: string;
  description?: string;
}

interface NavGroup {
  label: string;
  href: string;
  items: SubItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Capabilities",
    href: "/capabilities",
    items: [
      { label: "Detection", href: "/capabilities/detection", description: "Multi-sensor threat detection" },
      { label: "Tracking", href: "/capabilities/tracking", description: "Real-time target tracking" },
      { label: "Classification", href: "/capabilities/classification", description: "AI-powered threat classification" },
      { label: "Neutralization", href: "/capabilities/neutralization", description: "Active counter-measure deployment" },
      { label: "Command & Control", href: "/capabilities/command-control", description: "Unified C2 operations" },
      { label: "Integration", href: "/capabilities/integration", description: "Seamless system integration" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    items: [
      { label: "Aegis Core", href: "/products/aegis-core", description: "Enterprise defense platform" },
      { label: "Aegis Tactical", href: "/products/aegis-tactical", description: "Field-deployable unit" },
      { label: "Aegis Mobile", href: "/products/aegis-mobile", description: "Vehicle-mounted system" },
      { label: "Aegis Shield", href: "/products/aegis-shield", description: "Perimeter protection array" },
      { label: "Aegis SkyWatch", href: "/products/aegis-skywatch", description: "Aerial surveillance suite" },
      { label: "Aegis Command", href: "/products/aegis-command", description: "Operations center solution" },
      { label: "Aegis Sentinel", href: "/products/aegis-sentinel", description: "Autonomous monitoring node" },
      { label: "Aegis Integrator", href: "/products/aegis-integrator", description: "Third-party system bridge" },
      { label: "Compare Platforms", href: "/products/compare", description: "Side-by-side comparison tool" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    items: [
      { label: "Military", href: "/solutions/military", description: "Defense force operations" },
      { label: "Airports", href: "/solutions/airports", description: "Aviation security systems" },
      { label: "Critical Infrastructure", href: "/solutions/critical-infrastructure", description: "Asset protection services" },
      { label: "Border Security", href: "/solutions/border-security", description: "Perimeter surveillance" },
      { label: "VIP Protection", href: "/solutions/vip-protection", description: "Executive security details" },
      { label: "Prisons", href: "/solutions/prisons", description: "Correctional facility systems" },
      { label: "Urban Security", href: "/solutions/urban-security", description: "Smart city defense grids" },
      { label: "Maritime", href: "/solutions/maritime", description: "Naval & port security" },
    ],
  },
  {
    label: "Technology",
    href: "/technology",
    items: [
      { label: "RF Sensing", href: "/technology/rf-sensing", description: "Radio frequency detection" },
      { label: "AI & Machine Learning", href: "/technology/ai-ml", description: "Neural network classification" },
      { label: "Radar Systems", href: "/technology/radar", description: "Multi-band radar detection" },
      { label: "Electronic Warfare", href: "/technology/electronic-warfare", description: "Jamming & spoofing" },
      { label: "Sensor Fusion", href: "/technology/sensor-fusion", description: "Multi-modal integration" },
      { label: "Edge Computing", href: "/technology/edge-computing", description: "Tactical edge processing" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    items: [
      { label: "White Papers", href: "/resources/white-papers", description: "Technical research" },
      { label: "Datasheets", href: "/resources/datasheets", description: "Product specifications" },
      { label: "Videos", href: "/resources/videos", description: "Product demos & footage" },
      { label: "Webinars", href: "/resources/webinars", description: "Live & on-demand events" },
      { label: "FAQ", href: "/resources/faq", description: "Frequently asked questions" },
      { label: "Glossary", href: "/resources/glossary", description: "Counter-UAS terminology" },
      { label: "Selection Guide", href: "/resources/selection-guide", description: "Find your solution" },
      { label: "Case Studies", href: "/case-studies", description: "Real-world deployments" },
      { label: "Blog", href: "/blog", description: "Industry insights & analysis" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    items: [
      { label: "About Aegis", href: "/about", description: "Our mission & vision" },
      { label: "Leadership", href: "/about/leadership", description: "Executive team" },
      { label: "History", href: "/about/history", description: "Our journey" },
      { label: "R&D", href: "/about/research-development", description: "Research & development" },
      { label: "Facilities", href: "/about/facilities", description: "Global offices & labs" },
      { label: "Global Presence", href: "/about/global-presence", description: "Interactive deployment map" },
      { label: "Values", href: "/about/values", description: "Our principles" },
      { label: "Quality & Compliance", href: "/about/quality", description: "Certifications & standards" },
      { label: "Partners", href: "/partners", description: "Certified partner program" },
      { label: "Certifications", href: "/about/certifications", description: "Compliance overview" },
      { label: "Integrations", href: "/integrations", description: "Technology partnerships" },
      { label: "Support", href: "/support", description: "Training & documentation" },
      { label: "News", href: "/news", description: "Press & media" },
      { label: "Careers", href: "/careers", description: "Join the team" },
      { label: "Investors", href: "/investors", description: "Financial information" },
      { label: "Contact", href: "/contact", description: "Get in touch" },
    ],
  },
];

// ──────────────────────────────────────────────
// Desktop Dropdown Component
// ──────────────────────────────────────────────
function DesktopDropdown({
  group,
  isOpen,
  onEnter,
  onLeave,
}: {
  group: NavGroup;
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Trigger */}
      <Link
        href={group.href}
        className="flex items-center gap-1 text-white text-[11px] uppercase tracking-[0.15em] hover:opacity-80 transition-opacity py-4"
      >
        {group.label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="bg-[#0a0a0a] border-t border-[#222] min-w-[280px] shadow-2xl shadow-black/40">
          <div className="py-2">
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col px-6 py-3 text-[14px] text-[#b9b9b9] hover:text-white hover:bg-white/[0.04] transition-colors duration-150"
              >
                <span className="font-normal">{item.label}</span>
                {item.description && (
                  <span className="text-[11px] text-[#666] mt-0.5 leading-tight">
                    {item.description}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Header Component
// ──────────────────────────────────────────────
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Scroll listener ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Lock body scroll when mobile menu open ──
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ── Close dropdown on outside click ──
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-dropdown-area]")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Close mobile menu on route change (resize) ──
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Hover handlers with debounce to prevent flicker ──
  const handleDropdownEnter = useCallback((label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 100);
  }, []);

  // ── Determine if a dropdown is active ──
  const isDropdownActive = openDropdown !== null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[600] transition-all duration-300 ${
        scrolled && !isDropdownActive ? "py-3" : "py-5"
      } ${
        isDropdownActive
          ? "bg-[#0a0a0a]/95 backdrop-blur-md"
          : "mix-blend-difference"
      }`}
      data-dropdown-area
    >
      {/* ── Top bar ── */}
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-white font-bold text-lg tracking-[0.3em] uppercase select-none"
        >
          AEGIS
        </Link>

        {/* ── Desktop Navigation ── */}
        <nav className="hidden lg:flex items-center gap-8">
          {navGroups.map((group) => (
            <DesktopDropdown
              key={group.label}
              group={group}
              isOpen={openDropdown === group.label}
              onEnter={() => handleDropdownEnter(group.label)}
              onLeave={handleDropdownLeave}
            />
          ))}

          {/* CTA Button */}
          <Link
            href="/request-demo"
            className="ml-4 bg-white text-black text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-2.5 hover:bg-white/90 transition-colors duration-200"
          >
            Request Demo
          </Link>
        </nav>

        {/* ── Mobile Toggle ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile Menu — Full-screen overlay ── */}
      <div
        className={`lg:hidden fixed inset-0 top-0 z-[599] bg-[#0a0a0a] flex flex-col transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <Link
            href="/"
            className="text-white font-bold text-lg tracking-[0.3em] uppercase select-none"
            onClick={() => setMobileOpen(false)}
          >
            AEGIS
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white p-2 -mr-2"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Accordion nav */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 pt-4 pb-8">
          <Accordion type="single" collapsible className="w-full">
            {navGroups.map((group) => (
              <AccordionItem
                key={group.label}
                value={group.label}
                className="border-white/10"
              >
                <AccordionTrigger className="text-white text-[11px] uppercase tracking-[0.15em] hover:no-underline hover:text-white/80 py-5">
                  {group.label}
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <div className="space-y-0.5">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex flex-col py-3 px-4 text-[14px] text-[#b9b9b9] hover:text-white hover:bg-white/[0.04] transition-colors duration-150 rounded"
                      >
                        <span>{item.label}</span>
                        {item.description && (
                          <span className="text-[11px] text-[#666] mt-0.5 leading-tight">
                            {item.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Request Demo CTA */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <Link
              href="/request-demo"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-white text-black text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-3.5 hover:bg-white/90 transition-colors duration-200"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
