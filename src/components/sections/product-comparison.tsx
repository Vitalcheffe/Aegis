"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  GitCompare,
  Shield,
  Radar,
  Target,
  Crosshair,
  Zap,
  Weight,
  Battery,
  Award,
  Network,
  DollarSign,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// ──────────────────────────────────────────────
// Product Data
// ──────────────────────────────────────────────

interface ProductSpec {
  name: string;
  slug: string;
  tagline: string;
  detectionRange: string;
  detectionRangeKm: number | null;
  trackingCapacity: string;
  trackingCapacityNum: number | null;
  classificationAccuracy: string;
  classificationAccuracyNum: number | null;
  neutralizationMethods: string;
  deploymentTime: string;
  operatingWeight: string;
  powerRequirements: string;
  powerRequirementsKW: number | null;
  milStdRating: string;
  network: string;
  priceRange: string;
}

const products: ProductSpec[] = [
  {
    name: "Aegis Core",
    slug: "aegis-core",
    tagline: "Enterprise defense platform",
    detectionRange: "5 km",
    detectionRangeKm: 5,
    trackingCapacity: "200 targets",
    trackingCapacityNum: 200,
    classificationAccuracy: "99.4%",
    classificationAccuracyNum: 99.4,
    neutralizationMethods: "RF Jamming",
    deploymentTime: "4 hrs",
    operatingWeight: "850 kg",
    powerRequirements: "2.4 kW",
    powerRequirementsKW: 2.4,
    milStdRating: "810H",
    network: "JADC2",
    priceRange: "Contact",
  },
  {
    name: "Aegis Tactical",
    slug: "aegis-tactical",
    tagline: "Field-deployable unit",
    detectionRange: "12 km",
    detectionRangeKm: 12,
    trackingCapacity: "100 targets",
    trackingCapacityNum: 100,
    classificationAccuracy: "98.7%",
    classificationAccuracyNum: 98.7,
    neutralizationMethods: "Kinetic",
    deploymentTime: "30 min",
    operatingWeight: "120 kg",
    powerRequirements: "800W",
    powerRequirementsKW: 0.8,
    milStdRating: "810G",
    network: "Tactical Radio",
    priceRange: "Contact",
  },
  {
    name: "Aegis Mobile",
    slug: "aegis-mobile",
    tagline: "Vehicle-mounted system",
    detectionRange: "8 km",
    detectionRangeKm: 8,
    trackingCapacity: "150 targets",
    trackingCapacityNum: 150,
    classificationAccuracy: "99.1%",
    classificationAccuracyNum: 99.1,
    neutralizationMethods: "RF Jamming",
    deploymentTime: "15 min",
    operatingWeight: "45 kg",
    powerRequirements: "300W",
    powerRequirementsKW: 0.3,
    milStdRating: "810H",
    network: "4G/LTE",
    priceRange: "Contact",
  },
  {
    name: "Aegis Shield",
    slug: "aegis-shield",
    tagline: "Perimeter protection array",
    detectionRange: "15 km",
    detectionRangeKm: 15,
    trackingCapacity: "300 targets",
    trackingCapacityNum: 300,
    classificationAccuracy: "99.8%",
    classificationAccuracyNum: 99.8,
    neutralizationMethods: "DEW+RF",
    deploymentTime: "8 hrs",
    operatingWeight: "2,200 kg",
    powerRequirements: "8 kW",
    powerRequirementsKW: 8,
    milStdRating: "810H",
    network: "JADC2+SATCOM",
    priceRange: "Contact",
  },
  {
    name: "Aegis SkyWatch",
    slug: "aegis-skywatch",
    tagline: "Aerial surveillance suite",
    detectionRange: "25 km",
    detectionRangeKm: 25,
    trackingCapacity: "500 targets",
    trackingCapacityNum: 500,
    classificationAccuracy: "99.6%",
    classificationAccuracyNum: 99.6,
    neutralizationMethods: "RF Jamming",
    deploymentTime: "12 hrs",
    operatingWeight: "1,500 kg",
    powerRequirements: "5 kW",
    powerRequirementsKW: 5,
    milStdRating: "810H",
    network: "SATCOM",
    priceRange: "Contact",
  },
  {
    name: "Aegis Command",
    slug: "aegis-command",
    tagline: "Operations center solution",
    detectionRange: "10 km",
    detectionRangeKm: 10,
    trackingCapacity: "250 targets",
    trackingCapacityNum: 250,
    classificationAccuracy: "99.4%",
    classificationAccuracyNum: 99.4,
    neutralizationMethods: "RF Jamming",
    deploymentTime: "6 hrs",
    operatingWeight: "600 kg",
    powerRequirements: "1.5 kW",
    powerRequirementsKW: 1.5,
    milStdRating: "810G",
    network: "JADC2",
    priceRange: "Contact",
  },
  {
    name: "Aegis Sentinel",
    slug: "aegis-sentinel",
    tagline: "Autonomous monitoring node",
    detectionRange: "3 km",
    detectionRangeKm: 3,
    trackingCapacity: "50 targets",
    trackingCapacityNum: 50,
    classificationAccuracy: "97.2%",
    classificationAccuracyNum: 97.2,
    neutralizationMethods: "RF Jamming",
    deploymentTime: "10 min",
    operatingWeight: "8 kg",
    powerRequirements: "150W",
    powerRequirementsKW: 0.15,
    milStdRating: "810H",
    network: "Mesh",
    priceRange: "Contact",
  },
  {
    name: "Aegis Integrator",
    slug: "aegis-integrator",
    tagline: "Third-party system bridge",
    detectionRange: "N/A",
    detectionRangeKm: null,
    trackingCapacity: "Unlimited",
    trackingCapacityNum: null,
    classificationAccuracy: "N/A",
    classificationAccuracyNum: null,
    neutralizationMethods: "N/A — Software",
    deploymentTime: "2 hrs",
    operatingWeight: "Cloud-based",
    powerRequirements: "N/A",
    powerRequirementsKW: null,
    milStdRating: "N/A",
    network: "API",
    priceRange: "Contact",
  },
];

// ──────────────────────────────────────────────
// Comparison row definition
// ──────────────────────────────────────────────

interface ComparisonRow {
  label: string;
  icon: React.ReactNode;
  getValue: (p: ProductSpec) => string;
  getBarPercent: (p: ProductSpec) => number | null;
  maxLabel?: string;
}

const comparisonRows: ComparisonRow[] = [
  {
    label: "Detection Range",
    icon: <Radar className="w-4 h-4" />,
    getValue: (p) => p.detectionRange,
    getBarPercent: (p) => (p.detectionRangeKm ? (p.detectionRangeKm / 25) * 100 : null),
    maxLabel: "25 km",
  },
  {
    label: "Tracking Capacity",
    icon: <Target className="w-4 h-4" />,
    getValue: (p) => p.trackingCapacity,
    getBarPercent: (p) => (p.trackingCapacityNum ? (p.trackingCapacityNum / 500) * 100 : null),
    maxLabel: "500 targets",
  },
  {
    label: "Classification Accuracy",
    icon: <Crosshair className="w-4 h-4" />,
    getValue: (p) => p.classificationAccuracy,
    getBarPercent: (p) =>
      p.classificationAccuracyNum ? ((p.classificationAccuracyNum - 96) / 4) * 100 : null,
    maxLabel: "100%",
  },
  {
    label: "Neutralization Methods",
    icon: <Zap className="w-4 h-4" />,
    getValue: (p) => p.neutralizationMethods,
    getBarPercent: () => null,
  },
  {
    label: "Deployment Time",
    icon: <Shield className="w-4 h-4" />,
    getValue: (p) => p.deploymentTime,
    getBarPercent: () => null,
  },
  {
    label: "Operating Weight",
    icon: <Weight className="w-4 h-4" />,
    getValue: (p) => p.operatingWeight,
    getBarPercent: () => null,
  },
  {
    label: "Power Requirements",
    icon: <Battery className="w-4 h-4" />,
    getValue: (p) => p.powerRequirements,
    getBarPercent: (p) => (p.powerRequirementsKW ? (p.powerRequirementsKW / 8) * 100 : null),
    maxLabel: "8 kW",
  },
  {
    label: "MIL-STD Rating",
    icon: <Award className="w-4 h-4" />,
    getValue: (p) => (p.milStdRating !== "N/A" ? `MIL-STD-${p.milStdRating}` : "N/A"),
    getBarPercent: () => null,
  },
  {
    label: "Network",
    icon: <Network className="w-4 h-4" />,
    getValue: (p) => p.network,
    getBarPercent: () => null,
  },
  {
    label: "Price Range",
    icon: <DollarSign className="w-4 h-4" />,
    getValue: (p) => p.priceRange,
    getBarPercent: () => null,
  },
];

// ──────────────────────────────────────────────
// Bar indicator component
// ──────────────────────────────────────────────

function ComparisonBar({ percent }: { percent: number }) {
  return (
    <div className="w-full h-1.5 bg-[#222] mt-2 overflow-hidden">
      <motion.div
        className="h-full bg-white"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(percent, 100)}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}

// ──────────────────────────────────────────────
// Product Comparison Component
// ──────────────────────────────────────────────

export function ProductComparison() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  const toggleProduct = (slug: string) => {
    setSelectedSlugs((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= 4) return prev;
      return [...prev, slug];
    });
  };

  const selectedProducts = useMemo(
    () => products.filter((p) => selectedSlugs.includes(p.slug)),
    [selectedSlugs]
  );

  const canSelectMore = selectedSlugs.length < 4;

  return (
    <div className="bg-black">
      {/* ── Product Selection Grid ── */}
      <section className="py-20 md:py-28 border-b border-[#222]">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#767676] block mb-4">
              Product Selection
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white">
              Select platforms to compare
            </h2>
            <p className="mt-3 text-[#767676] text-sm md:text-base">
              Choose 2–4 platforms for a side-by-side comparison.
              {selectedSlugs.length > 0 && (
                <span className="text-white ml-2">
                  {selectedSlugs.length} of 4 selected
                </span>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => {
              const isSelected = selectedSlugs.includes(product.slug);
              const isDisabled = !isSelected && !canSelectMore;

              return (
                <motion.button
                  key={product.slug}
                  onClick={() => !isDisabled && toggleProduct(product.slug)}
                  disabled={isDisabled}
                  className={`relative text-left p-6 border transition-all duration-200 ${
                    isSelected
                      ? "border-white bg-white/[0.06]"
                      : isDisabled
                        ? "border-[#222] bg-[#0a0a0a] opacity-40 cursor-not-allowed"
                        : "border-[#222] bg-[#0a0a0a] hover:border-[#555] hover:bg-white/[0.02] cursor-pointer"
                  }`}
                  whileTap={isSelected ? { scale: 0.98 } : undefined}
                >
                  {/* Checkbox indicator */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                        isSelected ? "bg-white border-white" : "border-[#555]"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />}
                    </div>
                  </div>

                  <div className="pr-8">
                    <h3 className="text-white font-bold text-lg tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-[#767676] text-xs mt-1">{product.tagline}</p>
                  </div>

                  {/* Quick spec preview */}
                  <div className="mt-4 pt-4 border-t border-[#222] space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#767676]">Range</span>
                      <span className="text-[#b9b9b9]">{product.detectionRange}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#767676]">Targets</span>
                      <span className="text-[#b9b9b9]">{product.trackingCapacity}</span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Clear selection button */}
          <AnimatePresence>
            {selectedSlugs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mt-6 flex items-center gap-4"
              >
                <button
                  onClick={() => setSelectedSlugs([])}
                  className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-[#767676] hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear selection
                </button>
                <Separator orientation="vertical" className="h-4 bg-[#333]" />
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#555]">
                  {selectedSlugs.length < 2
                    ? "Select at least 1 more platform"
                    : `Comparing ${selectedSlugs.length} platforms`}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <AnimatePresence mode="wait">
            {selectedProducts.length === 0 ? (
              /* ── Empty State ── */
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-20 h-20 border border-[#222] flex items-center justify-center mb-8">
                  <GitCompare className="w-8 h-8 text-[#555]" />
                </div>
                <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-4">
                  No platforms selected
                </h3>
                <p className="text-[#767676] text-base max-w-md leading-relaxed">
                  Select 2–4 platforms from above to see a detailed side-by-side
                  comparison of specifications and capabilities.
                </p>
                <div className="mt-8 flex items-center gap-6 text-xs text-[#555]">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-[#555]" />
                    Unselected
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-white" />
                    Selected
                  </span>
                </div>
              </motion.div>
            ) : selectedProducts.length === 1 ? (
              /* ── Single product preview ── */
              <motion.div
                key="single"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-12">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#767676] block mb-4">
                    Quick Preview
                  </span>
                  <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white">
                    {selectedProducts[0].name}
                  </h2>
                  <p className="mt-2 text-[#767676] text-sm">
                    Add another platform to enable side-by-side comparison.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
                  {comparisonRows.map((row, i) => (
                    <motion.div
                      key={row.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className="flex justify-between items-baseline border-b border-[#222] py-5"
                    >
                      <span className="text-[#767676] text-sm flex items-center gap-2">
                        {row.icon}
                        {row.label}
                      </span>
                      <span className="text-white font-medium text-sm md:text-base">
                        {row.getValue(selectedProducts[0])}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* ── Full Comparison Table ── */
              <motion.div
                key="comparison"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-12">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#767676] block mb-4">
                    Side-by-Side Comparison
                  </span>
                  <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white">
                    Platform Comparison
                  </h2>
                </div>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#222]">
                        <th className="text-left py-5 pr-6 text-[10px] uppercase tracking-[0.2em] text-[#767676] font-normal w-[200px]">
                          Specification
                        </th>
                        {selectedProducts.map((p) => (
                          <th
                            key={p.slug}
                            className="text-left py-5 px-4 text-white font-bold text-sm tracking-tight"
                          >
                            {p.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row, i) => (
                        <motion.tr
                          key={row.label}
                          className="border-b border-[#222]"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                          <td className="py-5 pr-6">
                            <span className="text-[#767676] text-sm flex items-center gap-2">
                              {row.icon}
                              {row.label}
                            </span>
                            {row.maxLabel && (
                              <span className="text-[10px] text-[#555] block mt-0.5 ml-6">
                                max: {row.maxLabel}
                              </span>
                            )}
                          </td>
                          {selectedProducts.map((p) => {
                            const barPercent = row.getBarPercent(p);
                            return (
                              <td key={p.slug} className="py-5 px-4">
                                <span className="text-white text-sm font-medium">
                                  {row.getValue(p)}
                                </span>
                                {barPercent !== null && (
                                  <ComparisonBar percent={barPercent} />
                                )}
                              </td>
                            );
                          })}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile stacked layout */}
                <div className="md:hidden space-y-8">
                  {comparisonRows.map((row, i) => (
                    <motion.div
                      key={row.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[#767676]">{row.icon}</span>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-[#767676]">
                          {row.label}
                        </span>
                        {row.maxLabel && (
                          <span className="text-[9px] text-[#555] ml-auto">
                            max: {row.maxLabel}
                          </span>
                        )}
                      </div>
                      <div className="space-y-3">
                        {selectedProducts.map((p) => {
                          const barPercent = row.getBarPercent(p);
                          return (
                            <div
                              key={p.slug}
                              className="flex items-center gap-3 bg-[#0a0a0a] border border-[#222] p-4"
                            >
                              <span className="text-white text-xs font-bold w-24 shrink-0">
                                {p.name.replace("Aegis ", "")}
                              </span>
                              <div className="flex-1">
                                <span className="text-white text-sm">
                                  {row.getValue(p)}
                                </span>
                                {barPercent !== null && (
                                  <ComparisonBar percent={barPercent} />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Best-in-class indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="mt-12 pt-8 border-t border-[#222]"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#767676] block mb-4">
                    Best in Class
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(() => {
                      const withRange = selectedProducts.filter(
                        (p) => p.detectionRangeKm !== null
                      );
                      const longest = withRange.length > 0
                        ? withRange.reduce((a, b) =>
                            (a.detectionRangeKm ?? 0) > (b.detectionRangeKm ?? 0) ? a : b
                          )
                        : null;

                      const withTracking = selectedProducts.filter(
                        (p) => p.trackingCapacityNum !== null
                      );
                      const mostTargets = withTracking.length > 0
                        ? withTracking.reduce((a, b) =>
                            (a.trackingCapacityNum ?? 0) > (b.trackingCapacityNum ?? 0) ? a : b
                          )
                        : null;

                      const withAccuracy = selectedProducts.filter(
                        (p) => p.classificationAccuracyNum !== null
                      );
                      const mostAccurate = withAccuracy.length > 0
                        ? withAccuracy.reduce((a, b) =>
                            (a.classificationAccuracyNum ?? 0) > (b.classificationAccuracyNum ?? 0) ? a : b
                          )
                        : null;

                      return (
                        <>
                          {longest && (
                            <div className="border border-[#222] p-5">
                              <span className="text-[10px] uppercase tracking-[0.15em] text-[#767676] block mb-2">
                                Longest Detection Range
                              </span>
                              <span className="text-white font-bold text-lg">
                                {longest.name}
                              </span>
                              <span className="text-[#b9b9b9] text-sm block mt-1">
                                {longest.detectionRange}
                              </span>
                            </div>
                          )}
                          {mostTargets && (
                            <div className="border border-[#222] p-5">
                              <span className="text-[10px] uppercase tracking-[0.15em] text-[#767676] block mb-2">
                                Most Tracking Capacity
                              </span>
                              <span className="text-white font-bold text-lg">
                                {mostTargets.name}
                              </span>
                              <span className="text-[#b9b9b9] text-sm block mt-1">
                                {mostTargets.trackingCapacity}
                              </span>
                            </div>
                          )}
                          {mostAccurate && (
                            <div className="border border-[#222] p-5">
                              <span className="text-[10px] uppercase tracking-[0.15em] text-[#767676] block mb-2">
                                Highest Accuracy
                              </span>
                              <span className="text-white font-bold text-lg">
                                {mostAccurate.name}
                              </span>
                              <span className="text-[#b9b9b9] text-sm block mt-1">
                                {mostAccurate.classificationAccuracy}
                              </span>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
