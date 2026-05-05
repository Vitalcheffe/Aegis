"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Radar,
  Radio,
  CloudRain,
  CloudFog,
  Building2,
  Sun,
  Crosshair,
  Target,
  Zap,
  ChevronDown,
} from "lucide-react";
import { SectionHero, Callout, CTASection, ScrollReveal } from "@/components/sections";

/* ════════════════════════════════════════════════════════════════
   CONSTANTS & CONFIGURATION
   ════════════════════════════════════════════════════════════════ */

const RADAR_TYPES = {
  "aegis-core": { label: "Aegis Core Radar", power: 50000, powerLabel: "50 kW" },
  "aegis-skywatch": { label: "Aegis SkyWatch Radar", power: 100000, powerLabel: "100 kW" },
  "aegis-shield": { label: "Aegis Shield Multi-Spectral", power: 200000, powerLabel: "200 kW" },
} as const;

type RadarTypeKey = keyof typeof RADAR_TYPES;

const FREQUENCY_BANDS = {
  "x-band": { label: "X-Band 8–12 GHz", gainDb: 35, freqHz: 10e9, wavelength: 0.03 },
  "ku-band": { label: "Ku-Band 12–18 GHz", gainDb: 38, freqHz: 15e9, wavelength: 0.02 },
  "s-band": { label: "S-Band 2–4 GHz", gainDb: 30, freqHz: 3e9, wavelength: 0.1 },
} as const;

type FreqBandKey = keyof typeof FREQUENCY_BANDS;

const ENVIRONMENTS = {
  clear: { label: "Clear", lossFactor: 1.0, icon: Sun },
  rain: { label: "Rain", lossFactor: 2.0, icon: CloudRain },
  fog: { label: "Fog", lossFactor: 3.0, icon: CloudFog },
  urban: { label: "Urban Clutter", lossFactor: 5.0, icon: Building2 },
} as const;

type EnvKey = keyof typeof ENVIRONMENTS;

const RCS_LABELS: Record<string, string> = {
  "0.001": "Small Drone",
  "0.005": "Mini UAV",
  "0.01": "Commercial Drone",
  "0.05": "Military UAV",
  "0.1": "Small Aircraft",
  "0.5": "Helicopter",
  "1.0": "Large Aircraft",
};

function getRcsLabel(val: number): string {
  const keys = Object.keys(RCS_LABELS).map(Number).sort((a, b) => a - b);
  let closest = keys[0];
  for (const k of keys) {
    if (Math.abs(k - val) < Math.abs(closest - val)) closest = k;
  }
  return RCS_LABELS[String(closest)] || "";
}

const P_MIN = 1e-13; // minimum detectable signal in watts
const FOUR_PI_CUBED = Math.pow(4 * Math.PI, 3);

/* ════════════════════════════════════════════════════════════════
   RADAR EQUATION CALCULATION
   ════════════════════════════════════════════════════════════════ */

function calculateRange(
  powerW: number,
  gainDb: number,
  wavelengthM: number,
  rcsM2: number,
  lossFactor: number
): number {
  const G = Math.pow(10, gainDb / 10);
  const lambda = wavelengthM;
  const sigma = rcsM2;
  const L = lossFactor;

  const numerator = powerW * G * G * lambda * lambda * sigma;
  const denominator = FOUR_PI_CUBED * P_MIN * L;

  return Math.pow(numerator / denominator, 1 / 4);
}

/* ════════════════════════════════════════════════════════════════
   LINE-OF-SIGHT CALCULATION
   ════════════════════════════════════════════════════════════════ */

function calculateLOS(antennaHeightM: number, targetAltitudeM: number): number {
  // Simplified radar horizon: R_los ≈ 4.12 * (√h1 + √h2) km
  return 4.12 * (Math.sqrt(antennaHeightM) + Math.sqrt(targetAltitudeM));
}

/* ════════════════════════════════════════════════════════════════
   PROBABILITY CHART DATA
   ════════════════════════════════════════════════════════════════ */

function generateProbabilityData(maxRangeKm: number) {
  const points = 50;
  const data: { range: number; probability: number }[] = [];
  for (let i = 0; i <= points; i++) {
    const rangeKm = (maxRangeKm * 1.4 * i) / points;
    const ratio = rangeKm / maxRangeKm;
    // Sigmoid-like probability curve
    let probability: number;
    if (ratio <= 0.5) {
      probability = 100 - ratio * 10; // ~95-100% at close range
    } else if (ratio <= 1.0) {
      probability = 100 - 50 * Math.pow((ratio - 0.5) / 0.5, 1.5); // Drops to 50% at max
    } else {
      probability = Math.max(0, 50 * Math.pow(1 - (ratio - 1.0) / 0.4, 2)); // Drops to 0%
    }
    data.push({
      range: Math.round(rangeKm * 100) / 100,
      probability: Math.round(probability * 10) / 10,
    });
  }
  return data;
}

/* ════════════════════════════════════════════════════════════════
   ANIMATED NUMBER COMPONENT
   ════════════════════════════════════════════════════════════════ */

function AnimatedNumber({ value, decimals = 1 }: { value: number; decimals?: number }) {
  return (
    <motion.span
      key={value.toFixed(decimals)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="inline-block"
    >
      {value.toFixed(decimals)}
    </motion.span>
  );
}

/* ════════════════════════════════════════════════════════════════
   CUSTOM SLIDER (B&W styled)
   ════════════════════════════════════════════════════════════════ */

function CustomSlider({
  value,
  min,
  max,
  step,
  onChange,
  formatLabel,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  formatLabel?: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="relative h-1.5 bg-[#333] rounded-full cursor-pointer">
        <div
          className="absolute top-0 left-0 h-full bg-white rounded-full"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-[10px] uppercase tracking-wider text-[#767676]">
        <span>{formatLabel ? formatLabel(min) : min}</span>
        <span>{formatLabel ? formatLabel(max) : max}</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   CUSTOM SELECT (B&W styled)
   ════════════════════════════════════════════════════════════════ */

function CustomSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { key: T; label: string; icon?: React.ReactNode }[];
  onChange: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.key === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border border-[#333] bg-[#111] px-4 py-3 text-sm text-white hover:border-[#555] transition-colors"
      >
        <span className="flex items-center gap-3">
          {selected?.icon}
          {selected?.label}
        </span>
        <ChevronDown
          className={`size-4 text-[#767676] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 border border-[#333] bg-[#111] overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt.key}
                onClick={() => {
                  onChange(opt.key);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-[#222] transition-colors ${
                  opt.key === value ? "text-white bg-[#1a1a1a]" : "text-[#b9b9b9]"
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   RANGE RESULT CARD
   ════════════════════════════════════════════════════════════════ */

function RangeResult({
  label,
  value,
  unit,
  icon: Icon,
  description,
}: {
  label: string;
  value: number;
  unit: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  description: string;
}) {
  return (
    <motion.div
      layout
      className="border border-[#222] bg-[#0a0a0a] p-5 md:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5 text-[#767676]">
          <Icon className="size-5" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mb-1">
            {label}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
              <AnimatedNumber value={value} />
            </span>
            <span className="text-sm text-[#767676]">{unit}</span>
          </div>
          <div className="text-[11px] text-[#555] mt-1">{description}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   CHART TOOLTIP
   ════════════════════════════════════════════════════════════════ */

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111] border border-[#333] px-3 py-2 text-xs">
      <div className="text-[#767676]">Range: {label?.toFixed(1)} km</div>
      <div className="text-white font-medium">
        P<sub>d</sub>: {payload[0].value.toFixed(1)}%
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════ */

export default function RangeCalculatorPage() {
  // ── State ──
  const [radarType, setRadarType] = useState<RadarTypeKey>("aegis-core");
  const [rcs, setRcs] = useState(0.01);
  const [freqBand, setFreqBand] = useState<FreqBandKey>("x-band");
  const [env, setEnv] = useState<EnvKey>("clear");
  const [antennaHeight, setAntennaHeight] = useState(15);
  const [targetAltitude, setTargetAltitude] = useState(100);

  // ── Derived values ──
  const radar = RADAR_TYPES[radarType];
  const freq = FREQUENCY_BANDS[freqBand];
  const environment = ENVIRONMENTS[env];

  const rawRangeKm = useMemo(
    () =>
      calculateRange(radar.power, freq.gainDb, freq.wavelength, rcs, environment.lossFactor) /
      1000,
    [radar.power, freq.gainDb, freq.wavelength, rcs, environment.lossFactor]
  );

  const losKm = useMemo(
    () => calculateLOS(antennaHeight, targetAltitude),
    [antennaHeight, targetAltitude]
  );

  // Effective range is limited by line-of-sight
  const maxRangeKm = Math.min(rawRangeKm, losKm);
  const trackingRange = maxRangeKm * 0.8;
  const classificationRange = maxRangeKm * 0.6;
  const neutralizationRange = maxRangeKm * 0.4;

  const chartData = useMemo(() => generateProbabilityData(maxRangeKm), [maxRangeKm]);

  // ── Formula display values ──
  const G_linear = Math.pow(10, freq.gainDb / 10);
  const lambda = freq.wavelength;

  const radarTypeOptions = useMemo(
    () =>
      (Object.entries(RADAR_TYPES) as [RadarTypeKey, (typeof RADAR_TYPES)[RadarTypeKey]][]).map(
        ([key, val]) => ({
          key,
          label: val.label,
          icon: <Radar className="size-4" strokeWidth={1.5} />,
        })
      ),
    []
  );

  const freqBandOptions = useMemo(
    () =>
      (Object.entries(FREQUENCY_BANDS) as [FreqBandKey, (typeof FREQUENCY_BANDS)[FreqBandKey]][]).map(
        ([key, val]) => ({
          key,
          label: val.label,
          icon: <Radio className="size-4" strokeWidth={1.5} />,
        })
      ),
    []
  );

  const envOptions = useMemo(
    () =>
      (Object.entries(ENVIRONMENTS) as [EnvKey, (typeof ENVIRONMENTS)[EnvKey]][]).map(
        ([key, val]) => {
          const IconComp = val.icon;
          return {
            key,
            label: val.label,
            icon: <IconComp className="size-4" strokeWidth={1.5} />,
          };
        }
      ),
    []
  );

  const rcsLabel = getRcsLabel(rcs);

  return (
    <>
      {/* ── Hero ── */}
      <SectionHero
        image="/images/pages/radar-scope.jpg"
        label="Interactive Tool"
        title="Radar Range Calculator"
        subtitle="Compute detection envelopes from first principles. Powered by the radar equation — no marketing ranges, just physics."
      />

      {/* ── Calculator ── */}
      <section className="py-20 md:py-32 bg-black">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 lg:gap-16">
            {/* ── LEFT: Inputs ── */}
            <div className="space-y-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-6">
                  Configuration
                </span>
              </div>

              {/* Radar Type */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#767676] mb-2">
                  Radar Type
                </label>
                <CustomSelect
                  value={radarType}
                  options={radarTypeOptions}
                  onChange={setRadarType}
                />
                <div className="mt-2 text-[10px] text-[#555]">
                  Transmit Power: {radar.powerLabel}
                </div>
              </div>

              {/* Target RCS */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#767676] mb-2">
                  Target RCS (Radar Cross Section)
                </label>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-2xl font-bold text-white tracking-[-0.02em]">
                    {rcs}
                  </span>
                  <span className="text-sm text-[#767676]">m²</span>
                  {rcsLabel && (
                    <span className="text-[10px] uppercase tracking-wider text-[#555] border border-[#333] px-2 py-0.5 ml-2">
                      {rcsLabel}
                    </span>
                  )}
                </div>
                <CustomSlider
                  value={rcs}
                  min={0.001}
                  max={1.0}
                  step={0.001}
                  onChange={setRcs}
                  formatLabel={(v) => `${v} m²`}
                />
              </div>

              {/* Frequency Band */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#767676] mb-2">
                  Frequency Band
                </label>
                <CustomSelect
                  value={freqBand}
                  options={freqBandOptions}
                  onChange={setFreqBand}
                />
                <div className="mt-2 text-[10px] text-[#555]">
                  Antenna Gain: {freq.gainDb} dBi · Wavelength: {lambda} m
                </div>
              </div>

              {/* Environment */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#767676] mb-2">
                  Environment
                </label>
                <CustomSelect
                  value={env}
                  options={envOptions}
                  onChange={setEnv}
                />
                <div className="mt-2 text-[10px] text-[#555]">
                  Loss Factor: {environment.lossFactor}×
                </div>
              </div>

              {/* Antenna Height */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#767676] mb-2">
                  Antenna Height
                </label>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-2xl font-bold text-white tracking-[-0.02em]">
                    {antennaHeight}
                  </span>
                  <span className="text-sm text-[#767676]">m</span>
                </div>
                <CustomSlider
                  value={antennaHeight}
                  min={5}
                  max={50}
                  step={1}
                  onChange={setAntennaHeight}
                  formatLabel={(v) => `${v} m`}
                />
              </div>

              {/* Target Altitude */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#767676] mb-2">
                  Target Altitude
                </label>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-2xl font-bold text-white tracking-[-0.02em]">
                    {targetAltitude}
                  </span>
                  <span className="text-sm text-[#767676]">m</span>
                </div>
                <CustomSlider
                  value={targetAltitude}
                  min={10}
                  max={500}
                  step={5}
                  onChange={setTargetAltitude}
                  formatLabel={(v) => `${v} m`}
                />
              </div>
            </div>

            {/* ── RIGHT: Results ── */}
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-6">
                  Computed Ranges
                </span>
              </div>

              {/* Max Detection Range - hero metric */}
              <div className="border border-white/20 bg-[#0a0a0a] p-6 md:p-8">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#767676] mb-2">
                  Maximum Detection Range
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.04em]">
                    <AnimatedNumber value={maxRangeKm} decimals={1} />
                  </span>
                  <span className="text-xl text-[#767676]">km</span>
                </div>
                {rawRangeKm > losKm && (
                  <div className="mt-3 text-[10px] uppercase tracking-wider text-[#767676] border border-[#333] px-3 py-1.5 inline-block">
                    Limited by line-of-sight ({losKm.toFixed(1)} km) — raw radar range:{" "}
                    {rawRangeKm.toFixed(1)} km
                  </div>
                )}
              </div>

              {/* Range breakdown grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <RangeResult
                  label="Tracking Range"
                  value={trackingRange}
                  unit="km"
                  icon={Crosshair}
                  description="~80% of detection range"
                />
                <RangeResult
                  label="Classification Range"
                  value={classificationRange}
                  unit="km"
                  icon={Target}
                  description="~60% of detection range"
                />
                <RangeResult
                  label="Neutralization Range"
                  value={neutralizationRange}
                  unit="km"
                  icon={Zap}
                  description="~40% of detection range"
                />
              </div>

              {/* Line of Sight info */}
              <div className="border border-[#222] bg-[#0a0a0a] p-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676]">
                    Radar Horizon (LOS)
                  </div>
                  <div className="text-sm text-[#b9b9b9] mt-0.5">
                    Antenna {antennaHeight}m · Target {targetAltitude}m
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-white">{losKm.toFixed(1)}</span>
                  <span className="text-sm text-[#767676] ml-1">km</span>
                </div>
              </div>

              {/* Probability Chart */}
              <div className="border border-[#222] bg-[#0a0a0a] p-4 md:p-6">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mb-4">
                  Detection Probability vs Range
                </div>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <defs>
                        <linearGradient id="probGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#222"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="range"
                        tick={{ fill: "#767676", fontSize: 10 }}
                        axisLine={{ stroke: "#333" }}
                        tickLine={{ stroke: "#333" }}
                        label={{
                          value: "Range (km)",
                          position: "insideBottomRight",
                          offset: -5,
                          fill: "#767676",
                          fontSize: 10,
                        }}
                      />
                      <YAxis
                        tick={{ fill: "#767676", fontSize: 10 }}
                        axisLine={{ stroke: "#333" }}
                        tickLine={{ stroke: "#333" }}
                        domain={[0, 100]}
                        label={{
                          value: "Pd (%)",
                          angle: -90,
                          position: "insideTopLeft",
                          offset: 10,
                          fill: "#767676",
                          fontSize: 10,
                        }}
                      />
                      <Tooltip content={<ChartTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="probability"
                        stroke="#ffffff"
                        strokeWidth={2}
                        fill="url(#probGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Radar Equation Display */}
              <div className="border border-[#222] bg-[#0a0a0a] p-6 md:p-8">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mb-4">
                  Radar Equation — Substituted Values
                </div>
                <div className="font-mono text-sm md:text-base text-white/80 mb-6 leading-relaxed overflow-x-auto">
                  R<sub>max</sub> = (P<sub>t</sub> · G² · λ² · σ / (4π)³ ·
                  P<sub>min</sub> · L)<sup>1/4</sup>
                </div>
                <div className="h-px bg-[#222] mb-6" />
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#767676]">P<sub>t</sub> (Transmit Power)</span>
                    <span className="text-white font-mono">{radar.power.toLocaleString()} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#767676]">G (Antenna Gain)</span>
                    <span className="text-white font-mono">
                      {freq.gainDb} dB ({G_linear.toExponential(2)})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#767676]">λ (Wavelength)</span>
                    <span className="text-white font-mono">{lambda} m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#767676]">σ (Target RCS)</span>
                    <span className="text-white font-mono">{rcs} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#767676]">P<sub>min</sub> (Min. Signal)</span>
                    <span className="text-white font-mono">{P_MIN.toExponential(1)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#767676]">L (Loss Factor)</span>
                    <span className="text-white font-mono">{environment.lossFactor}×</span>
                  </div>
                </div>
                <div className="h-px bg-[#222] my-6" />
                <div className="font-mono text-xs text-[#767676] leading-relaxed break-all">
                  R<sub>max</sub> = ({radar.power.toLocaleString()} × ({G_linear.toExponential(2)})²
                  × {lambda}² × {rcs} / {FOUR_PI_CUBED.toExponential(2)} ×{" "}
                  {P_MIN.toExponential(1)} × {environment.lossFactor})<sup>1/4</sup>
                </div>
                <div className="mt-3 font-mono text-sm text-white">
                  R<sub>max</sub> = <strong>{rawRangeKm.toFixed(2)} km</strong>
                  {rawRangeKm > losKm && (
                    <span className="text-[#767676]">
                      {" "}
                      → {maxRangeKm.toFixed(2)} km (LOS-limited)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Methodology Callout ── */}
      <Callout>
        Every range on this page is derived from the Friis radar equation with
        environmental loss factors. No inflated specs — just validated
        propagation physics.
      </Callout>

      {/* ── CTA ── */}
      <CTASection
        title="Validate With Live Data"
        subtitle="This calculator uses simplified models. Request a live demonstration to see Aegis perform against your actual threat profiles and operational environment."
        primaryCta="Request a Demo"
        primaryHref="/request-demo"
        secondaryCta="Explore Technology"
        secondaryHref="/technology/radar"
      />
    </>
  );
}
