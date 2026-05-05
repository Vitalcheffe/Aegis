"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollReveal, CTASection } from "@/components/sections";
import { Shield, AlertTriangle, Globe, Bug, ChevronRight, Mail, Lock } from "lucide-react";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
type Severity = "Critical" | "High" | "Medium" | "Low";
type Category = "Threat Intel" | "Vulnerability" | "Geopolitical";
type FilterTab = "All" | "Critical" | "Threat Intel" | "Vulnerability" | "Geopolitical";

interface Advisory {
  id: number;
  date: string;
  severity: Severity;
  category: Category;
  title: string;
  summary: string;
}

// ──────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────
const advisories: Advisory[] = [
  {
    id: 1,
    date: "2026-03-01",
    severity: "Critical",
    category: "Threat Intel",
    title: "Shahed-136 Variant with Low-Observable Coating Detected in Eastern European Theater",
    summary:
      "Intelligence reports confirm a new variant of the Shahed-136 loitering munition featuring radar-absorbent coating, reducing effective detection range by approximately 40%. Aegis radar signature library updated to v4.7.2.",
  },
  {
    id: 2,
    date: "2026-02-25",
    severity: "High",
    category: "Vulnerability",
    title: "DJI Firmware 4.21.03 Enables Encrypted Control Link Bypass",
    summary:
      "New DJI firmware update introduces AES-256 encrypted control channels that evade legacy RF detectors. Aegis RF sensing module updated to classify encrypted DJI protocols. Operators advised to update to Aegis Core v3.2.1.",
  },
  {
    id: 3,
    date: "2026-02-20",
    severity: "Critical",
    category: "Threat Intel",
    title: "Mass Drone Swarm Attack on Black Sea Shipping: 47 Platforms Intercepted",
    summary:
      "Coordinated multi-axis swarm attack using mixed commercial and military platforms. Aegis Command system managed successful neutralization of all 47 threats. Full after-action report available to cleared personnel.",
  },
  {
    id: 4,
    date: "2026-02-15",
    severity: "Medium",
    category: "Geopolitical",
    title: "EU Counter-UAS Regulation Framework Published",
    summary:
      "The European Union has published its harmonized regulatory framework for civilian counter-UAS operations, effective January 2027. Aegis compliance team has prepared an analysis of operational implications for EU-based deployments.",
  },
  {
    id: 5,
    date: "2026-02-10",
    severity: "High",
    category: "Vulnerability",
    title: "GPS Spoofing Attack Against Counter-UAS Systems in Middle East",
    summary:
      "Adversarial GPS spoofing targeting Aegis geolocation subsystems detected at three deployment sites. Aegis resilient navigation module (PRN-200) provides independent positioning. Sites without PRN-200 should contact support for immediate upgrade.",
  },
  {
    id: 6,
    date: "2026-02-05",
    severity: "Medium",
    category: "Threat Intel",
    title: "Commercial FPV Drone Grenade-Drop Incidents Increase 340% in Q4 2025",
    summary:
      "Statistical analysis of documented FPV drone attacks in active conflict zones shows dramatic increase in frequency and sophistication. Updated threat model published to Aegis Command subscribers.",
  },
  {
    id: 7,
    date: "2026-01-28",
    severity: "High",
    category: "Geopolitical",
    title: "NATO Joint Air Power Competence Centre Publishes C-UAS Doctrine Update",
    summary:
      "NATO JAPCC releases Allied Joint Publication for Counter-UAS Operations (AJP-3.8.7). Aegis systems fully compliant with new doctrine. Training materials updated.",
  },
  {
    id: 8,
    date: "2026-01-20",
    severity: "Critical",
    category: "Threat Intel",
    title: "Modified Agricultural Drone Used for Chemical Agent Dispersal — First Confirmed Incident",
    summary:
      "First confirmed use of a modified crop-spraying drone for chemical agent delivery in an active conflict zone. Aegis chemical sensor integration module detects aerosol dispersal patterns. Advisory includes updated response protocols.",
  },
  {
    id: 9,
    date: "2026-01-15",
    severity: "Low",
    category: "Vulnerability",
    title: "Aegis Command v3.1.7 Security Patch Available",
    summary:
      "Routine security patch addressing three low-severity vulnerabilities identified in Aegis Command web interface. No active exploitation detected. All customers advised to update during next maintenance window.",
  },
  {
    id: 10,
    date: "2026-01-10",
    severity: "Medium",
    category: "Geopolitical",
    title: "Five Nations Announce Joint C-UAS Procurement Program",
    summary:
      "Australia, Japan, South Korea, UK, and US announce collaborative procurement under AUKUS Pillar II framework. Aegis Integrator platform designated as preferred middleware for multi-national interoperability.",
  },
];

// ──────────────────────────────────────────────
// Severity helpers
// ──────────────────────────────────────────────
function severityStyles(severity: Severity) {
  switch (severity) {
    case "Critical":
      return {
        dot: "bg-white",
        label: "text-white font-bold",
        border: "border-l-white",
      };
    case "High":
      return {
        dot: "bg-white/70",
        label: "text-white/90 font-semibold",
        border: "border-l-white/70",
      };
    case "Medium":
      return {
        dot: "bg-[#767676]",
        label: "text-[#b9b9b9] font-medium",
        border: "border-l-[#767676]",
      };
    case "Low":
      return {
        dot: "bg-[#555]",
        label: "text-[#767676]",
        border: "border-l-[#555]",
      };
  }
}

// ──────────────────────────────────────────────
// Category helpers
// ──────────────────────────────────────────────
function categoryIcon(category: Category) {
  switch (category) {
    case "Threat Intel":
      return <Shield className="w-3 h-3" />;
    case "Vulnerability":
      return <Bug className="w-3 h-3" />;
    case "Geopolitical":
      return <Globe className="w-3 h-3" />;
  }
}

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────
export default function SecurityAdvisoriesPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredAdvisories = advisories.filter((a) => {
    if (activeTab === "All") return true;
    if (activeTab === "Critical") return a.severity === "Critical";
    return a.category === activeTab;
  });

  const tabs: { label: FilterTab; count: number }[] = [
    { label: "All", count: advisories.length },
    { label: "Critical", count: advisories.filter((a) => a.severity === "Critical").length },
    { label: "Threat Intel", count: advisories.filter((a) => a.category === "Threat Intel").length },
    { label: "Vulnerability", count: advisories.filter((a) => a.category === "Vulnerability").length },
    { label: "Geopolitical", count: advisories.filter((a) => a.category === "Geopolitical").length },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════
         SECTION HERO
         ═══════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center bg-black overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 60px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-32 w-full">
          <ScrollReveal>
            <span className="inline-block text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/50 mb-6 border border-white/10 px-4 py-1.5">
              Intelligence Feed
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white max-w-5xl">
              Security Advisories
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="mt-8 text-[#767676] text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl">
              Real-time threat intelligence, vulnerability disclosures, and geopolitical
              analysis from Aegis deployments worldwide.
            </p>
          </ScrollReveal>

          {/* Summary stats */}
          <ScrollReveal delay={300}>
            <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">3</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-1">
                  Critical Active
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">10</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-1">
                  Advisories (Q1 2026)
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">v4.7.2</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-1">
                  Latest Signature Lib.
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         FILTER TABS + ADVISORY FEED
         ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-black border-t border-[#222]">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          {/* Filter tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-16 md:mb-20">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`flex items-center gap-2 px-4 md:px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] transition-all duration-200 border ${
                    activeTab === tab.label
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-[#767676] border-[#222] hover:text-white hover:border-[#555]"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`text-[9px] tracking-wider ${
                      activeTab === tab.label ? "text-black/50" : "text-[#555]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Advisory Feed */}
          <div className="space-y-0">
            {filteredAdvisories.map((advisory, i) => {
              const styles = severityStyles(advisory.severity);
              return (
                <ScrollReveal key={advisory.id} delay={i * 50}>
                  <article
                    className={`border-l-2 ${styles.border} border-t border-t-[#222] pl-6 md:pl-10 py-8 md:py-10 group hover:bg-white/[0.02] transition-colors -ml-6 md:-ml-10 pr-2 md:pr-4`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
                      <div className="flex-1 min-w-0">
                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-3">
                          {/* Date */}
                          <time className="text-[11px] tracking-[0.1em] text-[#767676] font-mono">
                            {advisory.date}
                          </time>

                          {/* Category badge */}
                          <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.15em] text-[#767676] border border-[#333] px-2.5 py-1">
                            {categoryIcon(advisory.category)}
                            {advisory.category}
                          </span>

                          {/* Severity indicator */}
                          <span className="inline-flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                            <span className={`text-[10px] uppercase tracking-[0.15em] ${styles.label}`}>
                              {advisory.severity}
                            </span>
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-snug mb-3 group-hover:text-white/90 transition-colors">
                          {advisory.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-[#767676] text-sm md:text-base leading-relaxed line-clamp-3">
                          {advisory.summary}
                        </p>
                      </div>

                      {/* Read link */}
                      <div className="flex-shrink-0 md:pt-8">
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-white/50 group-hover:text-white border-b border-white/20 group-hover:border-white/50 pb-0.5 transition-colors">
                          Read Full Advisory
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}

            {filteredAdvisories.length === 0 && (
              <div className="py-20 text-center">
                <AlertTriangle className="w-8 h-8 text-[#555] mx-auto mb-4" />
                <p className="text-[#767676] text-sm uppercase tracking-[0.15em]">
                  No advisories match the selected filter
                </p>
              </div>
            )}

            {/* Bottom border */}
            <div className="border-l-2 border-l-[#333] border-t border-t-[#222] h-4 -ml-6 md:-ml-10" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         SUBSCRIBE SECTION
         ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-[#0a0a0a] border-t border-[#222]">
        <div className="max-w-[56rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <div className="text-center">
              <Mail className="w-8 h-8 text-[#767676] mx-auto mb-6" />
              <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-white mb-4">
                Subscribe to Advisory Alerts
              </h2>
              <p className="text-[#767676] text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
                Receive immediate notifications for critical and high-severity advisories
                directly from Aegis threat intelligence.
              </p>

              {subscribed ? (
                <div className="inline-flex items-center gap-2 border border-white/20 px-6 py-4 text-white text-sm">
                  <span className="w-2 h-2 bg-white rounded-full" />
                  Subscription confirmed. Verify your email to activate alerts.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.trim()) {
                      setSubscribed(true);
                    }
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-black border border-[#333] text-white px-5 py-3.5 text-sm placeholder:text-[#555] focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black px-8 py-3.5 text-[11px] uppercase tracking-[0.15em] font-semibold hover:bg-[#e0e0e0] transition-colors flex-shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}

              <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#555]">
                <Lock className="w-3 h-3" />
                Advisory alerts are available to verified defense and government personnel only
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         CTA SECTION
         ═══════════════════════════════════════════ */}
      <CTASection
        title="Need Direct Threat Intelligence?"
        subtitle="Contact our defense team for classified briefings, tailored threat assessments, and deployment-specific advisory support."
        primaryCta="Contact Us"
        primaryHref="/contact"
        secondaryCta="Request Demo"
        secondaryHref="/request-demo"
      />
    </>
  );
}
