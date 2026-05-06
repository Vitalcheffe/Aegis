"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  SectionHero,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

/* ════════════════════════════════════════════════════════════════
   QUESTION DEFINITIONS
   ════════════════════════════════════════════════════════════════ */

type QuestionKey = "scenario" | "threat" | "environment" | "budget" | "c2";

interface Option {
  key: string;
  label: string;
}

interface Question {
  key: QuestionKey;
  title: string;
  subtitle: string;
  options: Option[];
}

const questions: Question[] = [
  {
    key: "scenario",
    title: "What is your deployment scenario?",
    subtitle: "Select the operational context that best describes your intended deployment.",
    options: [
      { key: "fixed", label: "Fixed Site" },
      { key: "mobile", label: "Mobile" },
      { key: "airborne", label: "Airborne" },
      { key: "manportable", label: "Man-Portable" },
      { key: "software", label: "Software Only" },
    ],
  },
  {
    key: "threat",
    title: "What is your primary threat?",
    subtitle: "Identify the dominant threat type you need to counter.",
    options: [
      { key: "small_commercial", label: "Small Commercial Drones" },
      { key: "military_uav", label: "Military UAVs" },
      { key: "swarm", label: "Swarm Attacks" },
      { key: "modified_commercial", label: "Modified Commercial" },
      { key: "all", label: "All of the Above" },
    ],
  },
  {
    key: "environment",
    title: "What is your operating environment?",
    subtitle: "Choose the primary environment where the system will operate.",
    options: [
      { key: "urban", label: "Urban" },
      { key: "rural", label: "Rural" },
      { key: "maritime", label: "Maritime" },
      { key: "desert", label: "Desert" },
      { key: "arctic", label: "Arctic" },
    ],
  },
  {
    key: "budget",
    title: "What is your budget tier?",
    subtitle: "Indicate your investment range for the counter-UAS capability.",
    options: [
      { key: "essential", label: "Essential" },
      { key: "standard", label: "Standard" },
      { key: "premium", label: "Premium" },
    ],
  },
  {
    key: "c2",
    title: "Do you need C2 integration?",
    subtitle: "Select your command and control integration requirement.",
    options: [
      { key: "standalone", label: "Standalone" },
      { key: "legacy_c2", label: "Legacy C2" },
      { key: "nato", label: "NATO" },
      { key: "jadc2", label: "Full JADC2" },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════
   PRODUCT RECOMMENDATIONS ENGINE
   ════════════════════════════════════════════════════════════════ */

interface Product {
  name: string;
  href: string;
  tagline: string;
  reason: string;
  specs: { label: string; value: string }[];
}

function computeRecommendations(
  answers: Record<QuestionKey, string>
): Product[] {
  const { scenario, threat, environment, budget, c2 } = answers;
  const products: Product[] = [];

  // Scenario-based primary recommendation
  if (scenario === "fixed") {
    products.push({
      name: "Aegis Core",
      href: "/products/aegis-core",
      tagline: "Flagship Fixed-Site Platform",
      reason:
        "Your fixed-site deployment with permanent infrastructure is the ideal fit for Aegis Core. It delivers the longest detection range (35 km radar), highest track capacity (500+ concurrent), and full graduated response capability in a rack-mountable chassis designed for continuous 24/7 operation.",
      specs: [
        { label: "Radar Detection", value: "35 km" },
        { label: "AI Inference", value: "175 TOPS" },
        { label: "Track Capacity", value: "500+" },
        { label: "Power", value: "800W" },
      ],
    });
  } else if (scenario === "mobile") {
    products.push({
      name: "Aegis Mobile",
      href: "/products/aegis-mobile",
      tagline: "Vehicle-Integrated On-the-Move Protection",
      reason:
        "Your mobile deployment requirement is best served by Aegis Mobile. It provides counter-UAS protection while the vehicle is in motion at speeds up to 80 km/h, with automotive-grade vibration isolation and 15 km radar detection — purpose-built for convoy and motorcade security.",
      specs: [
        { label: "Radar Detection", value: "15 km" },
        { label: "AI Inference", value: "85 TOPS" },
        { label: "Track Capacity", value: "150" },
        { label: "Max Speed", value: "80 km/h" },
      ],
    });
  } else if (scenario === "airborne") {
    products.push({
      name: "Aegis SkyWatch",
      href: "/products/aegis-skywatch",
      tagline: "Airborne C-UAS Payload",
      reason:
        "Your airborne deployment is ideally served by Aegis SkyWatch. This 4.5 kg pod mounts on Group 3/4 UAVs, extending the detection horizon by elevating the sensor array above terrain and ground clutter, with data links to Aegis Command for networked kill chain execution.",
      specs: [
        { label: "Detection Range", value: "12 km" },
        { label: "AI Inference", value: "45 TOPS" },
        { label: "Pod Weight", value: "4.5 kg" },
        { label: "RF Sensing", value: "25 km" },
      ],
    });
  } else if (scenario === "manportable") {
    products.push({
      name: "Aegis Shield",
      href: "/products/aegis-shield",
      tagline: "Man-Portable Counter-UAS",
      reason:
        "Your man-portable requirement points directly to Aegis Shield. At 12 kg in a backpack form factor with 6-hour battery life, it provides 8 km detection and a 60° directional jamming cone effective to 3 km — organic C-UAS capability embedded at the squad level without vehicle support.",
      specs: [
        { label: "Detection Range", value: "8 km" },
        { label: "AI Inference", value: "22 TOPS" },
        { label: "Weight", value: "12 kg" },
        { label: "Battery Life", value: "6 hours" },
      ],
    });
  } else {
    // Software only
    products.push({
      name: "Aegis Command",
      href: "/products/aegis-command",
      tagline: "Enterprise C2 Platform",
      reason:
        "Your software-only requirement is best served by Aegis Command. It provides enterprise C2 for managing up to 64 Aegis sensor nodes across a distributed defense network, with real-time common operating picture, AI-driven resource allocation, and hierarchical rules of engagement management.",
      specs: [
        { label: "Node Capacity", value: "64" },
        { label: "Network Span", value: "500+ km" },
        { label: "COP Update", value: "<1 sec" },
        { label: "STANAG", value: "4676" },
      ],
    });
  }

  // Threat-based secondary recommendation
  if (threat === "swarm" || threat === "all") {
    products.push({
      name: "Aegis Core",
      href: "/products/aegis-core",
      tagline: "Swarm Defense Leader",
      reason:
        "Your threat profile includes swarm attacks, which demand the highest processing capability and track capacity. Aegis Core with 175 TOPS of AI inference and the Swarm Resolution Algorithm is specifically engineered to handle coordinated multi-platform attacks simultaneously.",
      specs: [
        { label: "AI Inference", value: "175 TOPS" },
        { label: "Track Capacity", value: "500+" },
        { label: "Swarm Algorithm", value: "Included" },
        { label: "Kill Chain", value: "<20 ms" },
      ],
    });
  } else if (threat === "military_uav" || threat === "modified_commercial") {
    products.push({
      name: "Aegis Tactical",
      href: "/products/aegis-tactical",
      tagline: "Expeditionary High-Performance",
      reason:
        "Military and modified commercial UAVs require high-performance classification in potentially austere environments. Aegis Tactical delivers 85 TOPS of AI inference with 200 concurrent tracks in a rapidly deployable transit-case form factor.",
      specs: [
        { label: "Radar Detection", value: "20 km" },
        { label: "AI Inference", value: "85 TOPS" },
        { label: "Track Capacity", value: "200" },
        { label: "Deploy Time", value: "<30 min" },
      ],
    });
  }

  // Environment-based add-on
  if (environment === "urban") {
    products.push({
      name: "Aegis Sentinel",
      href: "/products/aegis-sentinel",
      tagline: "Autonomous Perimeter Surveillance",
      reason:
        "Urban environments present unique RF clutter challenges. Aegis Sentinel provides 24/7 autonomous perimeter surveillance with automated health reporting and tamper detection, purpose-built for airports, government facilities, and critical infrastructure in complex urban RF environments.",
      specs: [
        { label: "Detection Range", value: "10 km" },
        { label: "Enclosure", value: "IP67" },
        { label: "Temp Range", value: "-40 to +65°C" },
        { label: "Battery Backup", value: "48 hours" },
      ],
    });
  }

  // C2 integration add-on
  if (c2 === "nato" || c2 === "jadc2" || c2 === "legacy_c2") {
    products.push({
      name: "Aegis Integrator",
      href: "/products/aegis-integrator",
      tagline: "System Integration Middleware",
      reason:
        `Your ${c2 === "jadc2" ? "Full JADC2" : c2 === "nato" ? "NATO" : "Legacy C2"} integration requirement calls for Aegis Integrator. It provides bidirectional protocol translation for STANAG 4586, STANAG 4676, ASTERIX, Link 16, and proprietary vendor formats, enabling seamless incorporation into your existing defense architecture.`,
      specs: [
        { label: "Protocols", value: "6+" },
        { label: "Latency", value: "<5 ms" },
        { label: "STANAG 4676", value: "Native" },
        { label: "Link 16", value: "Gateway" },
      ],
    });
  }

  // Deduplicate by product name
  const seen = new Set<string>();
  return products.filter((p) => {
    if (seen.has(p.name)) return false;
    seen.add(p.name);
    return true;
  });
}

/* ════════════════════════════════════════════════════════════════
   ANIMATED COMPONENTS
   ════════════════════════════════════════════════════════════════ */

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="w-full h-px bg-[#333] mb-12">
      <div
        className="h-full bg-white transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function OptionButton({
  option,
  selected,
  onClick,
}: {
  option: Option;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left border p-4 md:p-5 transition-all duration-300 ${
        selected
          ? "border-white bg-white/10 text-white"
          : "border-white/10 text-[#b9b9b9] hover:border-white/30 hover:bg-white/[0.03]"
      }`}
    >
      <span className="text-sm md:text-base font-medium">{option.label}</span>
    </button>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border border-white/10 bg-[#0a0a0a] p-6 md:p-8">
      <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1 inline-block mb-4">
        Recommended
      </span>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
        {product.name}
      </h3>
      <p className="text-[11px] uppercase tracking-[0.12em] text-[#767676] mb-5">
        {product.tagline}
      </p>
      <p className="text-[#b9b9b9] text-sm leading-relaxed mb-6">
        {product.reason}
      </p>

      {/* Spec row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {product.specs.map((spec) => (
          <div key={spec.label}>
            <div className="text-lg font-bold text-white">{spec.value}</div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-[#767676] mt-0.5">
              {spec.label}
            </div>
          </div>
        ))}
      </div>

      <Link
        href={product.href}
        className="inline-block text-[10px] uppercase tracking-[0.15em] text-white border-b border-white/30 pb-1 hover:border-white transition-colors"
      >
        Explore {product.name} →
      </Link>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════ */

export default function SelectionGuidePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<QuestionKey, string>>({
    scenario: "",
    threat: "",
    environment: "",
    budget: "",
    c2: "",
  });
  const [showResults, setShowResults] = useState(false);

  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep];
  const allAnswered = Object.values(answers).every((v) => v !== "");

  const recommendations = useMemo(
    () => (allAnswered ? computeRecommendations(answers) : []),
    [answers, allAnswered]
  );

  function handleSelect(key: QuestionKey, value: string) {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    // Auto-advance after a brief delay
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowResults(true);
      }
    }, 350);
  }

  function handleBack() {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleReset() {
    setCurrentStep(0);
    setAnswers({ scenario: "", threat: "", environment: "", budget: "", c2: "" });
    setShowResults(false);
  }

  return (
    <>
      <SectionHero
        image="/images/resources/datasheets.jpg"
        label="Resources"
        title="Solution Selection Guide"
        subtitle="Match the right Aegis counter-UAS system to your operational environment, threat profile, and budget — with clear decision criteria for every deployment scenario."
        cta="Start the Guide"
        ctaHref="#selection-guide"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── Interactive Guide ── */}
      <section id="selection-guide" className="py-20 md:py-32 bg-black">
        <div className="max-w-[56rem] mx-auto px-6 md:px-12 lg:px-20">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Progress */}
                <ProgressBar current={currentStep} total={totalSteps} />

                {/* Step indicator */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Question {currentStep + 1} of {totalSteps}
                  </span>
                  {currentStep > 0 && (
                    <button
                      onClick={handleBack}
                      className="text-[10px] uppercase tracking-[0.15em] text-[#767676] hover:text-white transition-colors"
                    >
                      ← Back
                    </button>
                  )}
                </div>

                {/* Question */}
                <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white mb-3">
                  {currentQuestion.title}
                </h2>
                <p className="text-[#767676] text-sm md:text-base mb-10">
                  {currentQuestion.subtitle}
                </p>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQuestion.options.map((option) => (
                    <OptionButton
                      key={option.key}
                      option={option}
                      selected={answers[currentQuestion.key] === option.key}
                      onClick={() => handleSelect(currentQuestion.key, option.key)}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Results Header */}
                <div className="mb-12">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                    Your Recommendations
                  </span>
                  <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white mb-4">
                    Recommended Solutions
                  </h2>
                  <p className="text-[#767676] text-base leading-relaxed max-w-xl">
                    Based on your answers, we recommend the following Aegis products for your operational requirements.
                  </p>
                </div>

                {/* Summary of answers */}
                <div className="border border-white/10 bg-[#0a0a0a] p-6 mb-10">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-4">
                    Your Profile
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {questions.map((q) => {
                      const selectedOption = q.options.find(
                        (o) => o.key === answers[q.key]
                      );
                      return (
                        <div key={q.key}>
                          <div className="text-[10px] uppercase tracking-[0.12em] text-[#767676] mb-1">
                            {q.title.replace("What is your ", "").replace("Do you need ", "").replace("?", "")}
                          </div>
                          <div className="text-white text-sm font-medium">
                            {selectedOption?.label ?? "—"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Product Cards */}
                <div className="space-y-6">
                  {recommendations.map((product, i) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: i * 150,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>

                {/* Comparison Summary */}
                {recommendations.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-10"
                  >
                    <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-4">
                      Comparison Summary
                    </div>
                    <div className="border border-white/10 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10 bg-[#0a0a0a]">
                            <th className="text-left px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-[#767676] font-medium">
                              Product
                            </th>
                            <th className="text-left px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-[#767676] font-medium">
                              Role
                            </th>
                            <th className="text-left px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-[#767676] font-medium">
                              Detection
                            </th>
                            <th className="text-left px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-[#767676] font-medium">
                              AI
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {recommendations.map((p) => (
                            <tr key={p.name} className="border-b border-white/5">
                              <td className="px-4 py-3 text-white font-medium">
                                {p.name}
                              </td>
                              <td className="px-4 py-3 text-[#b9b9b9]">
                                {p.tagline}
                              </td>
                              <td className="px-4 py-3 text-[#b9b9b9]">
                                {p.specs.find((s) =>
                                  s.label.toLowerCase().includes("detection") ||
                                  s.label.toLowerCase().includes("radar")
                                )?.value ?? "—"}
                              </td>
                              <td className="px-4 py-3 text-[#b9b9b9]">
                                {p.specs.find((s) =>
                                  s.label.toLowerCase().includes("ai") ||
                                  s.label.toLowerCase().includes("inference")
                                )?.value ?? "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleReset}
                    className="border border-white/30 text-white px-8 py-3 text-[11px] uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Start Over
                  </button>
                  <Link
                    href="/request-demo"
                    className="bg-white text-black px-8 py-3 text-[11px] uppercase tracking-[0.15em] hover:bg-[#e0e0e0] transition-all duration-300 text-center"
                  >
                    Request a Consultation
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Not Sure Which System?"
        subtitle="Our solutions engineering team will assess your operational environment, threat profile, and requirements — and recommend the optimal Aegis configuration with a detailed justification and cost estimate."
        primaryCta="Request Assessment"
        primaryHref="/request-demo"
        secondaryCta="View All Products"
        secondaryHref="/products"
      />
    </>
  );
}
