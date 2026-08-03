"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Plane,
  Factory,
  ShieldAlert,
  Building2,
  Ship,
  UserCheck,
  ChevronRight,
  Download,
  Clock,
  Radar,
  RefreshCw,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SectionHero, Callout, CTASection } from "@/components/sections";

/* ════════════════════════════════════════════════════════════════
   TYPES
   ════════════════════════════════════════════════════════════════ */

type ScenarioKey =
  | "fob"
  | "airport"
  | "critical-infra"
  | "border"
  | "urban"
  | "naval"
  | "vip";

type ThreatLevel = "low" | "medium" | "high" | "extreme";
type BudgetTier = "essential" | "standard" | "premium";
type UptimeReq = "99" | "99.5" | "99.9";
type IntegrationNeed = "none" | "legacy" | "nato" | "jadc2";

interface ProductRec {
  name: string;
  qty: number;
  role: string;
  powerKw: number;
  sensorNodes: number;
}

interface DeploymentResult {
  products: ProductRec[];
  totalNodes: number;
  timeline: string;
  operators: number;
  totalPowerKw: number;
  sensorPositions: { x: number; y: number; r: number; label: string }[];
  areaShape: "rect" | "circle" | "line";
  areaW: number;
  areaH: number;
}

/* ════════════════════════════════════════════════════════════════
   SCENARIO DEFINITIONS
   ════════════════════════════════════════════════════════════════ */

const SCENARIOS: Record<
  ScenarioKey,
  {
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  }
> = {
  fob: {
    label: "Forward Operating Base",
    description: "5km × 5km perimeter",
    icon: MapPin,
  },
  airport: {
    label: "Airport",
    description: "15km radius protection zone",
    icon: Plane,
  },
  "critical-infra": {
    label: "Critical Infrastructure",
    description: "10km × 10km facility",
    icon: Factory,
  },
  border: {
    label: "Border Segment",
    description: "50km linear",
    icon: ShieldAlert,
  },
  urban: {
    label: "Urban Area",
    description: "20km × 20km city center",
    icon: Building2,
  },
  naval: {
    label: "Naval Vessel",
    description: "360° maritime",
    icon: Ship,
  },
  vip: {
    label: "VIP Event",
    description: "3km mobile perimeter",
    icon: UserCheck,
  },
};

const THREAT_LEVELS: Record<ThreatLevel, { label: string; factor: number }> = {
  low: { label: "Low", factor: 0.7 },
  medium: { label: "Medium", factor: 1.0 },
  high: { label: "High", factor: 1.4 },
  extreme: { label: "Extreme", factor: 1.8 },
};

const BUDGET_TIERS: Record<BudgetTier, { label: string; factor: number }> = {
  essential: { label: "Essential", factor: 0.7 },
  standard: { label: "Standard", factor: 1.0 },
  premium: { label: "Premium", factor: 1.4 },
};

const UPTIME_REQS: Record<UptimeReq, { label: string; redundancy: number }> = {
  "99": { label: "99%", redundancy: 1.0 },
  "99.5": { label: "99.5%", redundancy: 1.15 },
  "99.9": { label: "99.9%", redundancy: 1.3 },
};

const INTEGRATION_NEEDS: Record<IntegrationNeed, { label: string; extra: string }> = {
  none: { label: "None", extra: "" },
  legacy: { label: "Legacy C2", extra: " +1× Aegis Integrator" },
  nato: { label: "NATO STANAG", extra: " +1× Aegis Integrator (NATO)" },
  jadc2: { label: "Full JADC2", extra: " +1× Aegis Integrator (JADC2)" },
};

/* ════════════════════════════════════════════════════════════════
   DEPLOYMENT RECOMMENDATION ENGINE
   ════════════════════════════════════════════════════════════════ */

function generateRecommendation(
  scenario: ScenarioKey,
  threat: ThreatLevel,
  budget: BudgetTier,
  uptime: UptimeReq,
  integration: IntegrationNeed
): DeploymentResult {
  const tf = THREAT_LEVELS[threat].factor;
  const bf = BUDGET_TIERS[budget].factor;
  const rf = UPTIME_REQS[uptime].redundancy;

  // Base configuration per scenario
  let products: ProductRec[] = [];
  let baseTimeline = "";
  let baseOperators = 0;
  let areaShape: "rect" | "circle" | "line" = "rect";
  let areaW = 0;
  let areaH = 0;
  let sensorPositions: { x: number; y: number; r: number; label: string }[] = [];

  switch (scenario) {
    case "fob": {
      areaShape = "rect";
      areaW = 500;
      areaH = 500;
      const coreQty = Math.ceil(1 * rf);
      const tacticalQty = Math.ceil(2 * tf * rf * bf);
      const shieldQty = Math.ceil(4 * tf * bf);
      const cmdQty = 1;
      products = [
        { name: "Aegis Core", qty: coreQty, role: "Primary detection", powerKw: 0.8, sensorNodes: coreQty * 2 },
        { name: "Aegis Tactical", qty: tacticalQty, role: "Redundant coverage", powerKw: 0.5, sensorNodes: tacticalQty },
        { name: "Aegis Shield", qty: shieldQty, role: "Perimeter patrol", powerKw: 0.3, sensorNodes: shieldQty },
        { name: "Aegis Command", qty: cmdQty, role: "C2", powerKw: 0.6, sensorNodes: 0 },
      ];
      baseTimeline = "72 hours";
      baseOperators = 8;
      // Sensor positions for FOB
      sensorPositions = [
        { x: 250, y: 250, r: 180, label: "CORE-1" },
        { x: 100, y: 100, r: 130, label: "TAC-1" },
        { x: 400, y: 100, r: 130, label: "TAC-2" },
        { x: 50, y: 250, r: 100, label: "SHD-1" },
        { x: 250, y: 50, r: 100, label: "SHD-2" },
        { x: 450, y: 250, r: 100, label: "SHD-3" },
        { x: 250, y: 450, r: 100, label: "SHD-4" },
        { x: 250, y: 250, r: 40, label: "CMD" },
      ];
      if (rf > 1.1) {
        sensorPositions.push({ x: 250, y: 350, r: 130, label: "TAC-3" });
      }
      if (tf > 1.2) {
        sensorPositions.push({ x: 100, y: 400, r: 100, label: "SHD-5" });
        sensorPositions.push({ x: 400, y: 400, r: 100, label: "SHD-6" });
      }
      break;
    }
    case "airport": {
      areaShape = "circle";
      areaW = 500;
      areaH = 500;
      const skyQty = Math.ceil(1 * bf);
      const coreQty = Math.ceil(2 * rf);
      const sentinelQty = Math.ceil(4 * tf * bf);
      const cmdQty = 1;
      products = [
        { name: "Aegis SkyWatch", qty: skyQty, role: "Airborne overlay", powerKw: 1.2, sensorNodes: skyQty * 2 },
        { name: "Aegis Core", qty: coreQty, role: "Dual redundant", powerKw: 0.8, sensorNodes: coreQty * 2 },
        { name: "Aegis Sentinel", qty: sentinelQty, role: "Perimeter", powerKw: 0.4, sensorNodes: sentinelQty },
        { name: "Aegis Command", qty: cmdQty, role: "C2", powerKw: 0.6, sensorNodes: 0 },
      ];
      baseTimeline = "2 weeks";
      baseOperators = 12;
      sensorPositions = [
        { x: 250, y: 200, r: 200, label: "CORE-1" },
        { x: 250, y: 300, r: 200, label: "CORE-2" },
        { x: 100, y: 120, r: 120, label: "SEN-1" },
        { x: 400, y: 120, r: 120, label: "SEN-2" },
        { x: 100, y: 380, r: 120, label: "SEN-3" },
        { x: 400, y: 380, r: 120, label: "SEN-4" },
        { x: 250, y: 100, r: 80, label: "SKY-1" },
        { x: 250, y: 250, r: 40, label: "CMD" },
      ];
      if (tf > 1.2) {
        sensorPositions.push({ x: 250, y: 430, r: 120, label: "SEN-5" });
        sensorPositions.push({ x: 50, y: 250, r: 120, label: "SEN-6" });
      }
      break;
    }
    case "critical-infra": {
      areaShape = "rect";
      areaW = 500;
      areaH = 500;
      const coreQty = Math.ceil(2 * rf);
      const sentinelQty = Math.ceil(4 * tf * bf);
      const shieldQty = Math.ceil(2 * tf);
      const cmdQty = 1;
      products = [
        { name: "Aegis Core", qty: coreQty, role: "Primary detection", powerKw: 0.8, sensorNodes: coreQty * 2 },
        { name: "Aegis Sentinel", qty: sentinelQty, role: "Perimeter", powerKw: 0.4, sensorNodes: sentinelQty },
        { name: "Aegis Shield", qty: shieldQty, role: "Mobile response", powerKw: 0.3, sensorNodes: shieldQty },
        { name: "Aegis Command", qty: cmdQty, role: "C2", powerKw: 0.6, sensorNodes: 0 },
      ];
      baseTimeline = "1 week";
      baseOperators = 10;
      sensorPositions = [
        { x: 250, y: 200, r: 180, label: "CORE-1" },
        { x: 250, y: 350, r: 180, label: "CORE-2" },
        { x: 80, y: 80, r: 120, label: "SEN-1" },
        { x: 420, y: 80, r: 120, label: "SEN-2" },
        { x: 80, y: 420, r: 120, label: "SEN-3" },
        { x: 420, y: 420, r: 120, label: "SEN-4" },
        { x: 150, y: 250, r: 90, label: "SHD-1" },
        { x: 350, y: 250, r: 90, label: "SHD-2" },
        { x: 250, y: 250, r: 40, label: "CMD" },
      ];
      break;
    }
    case "border": {
      areaShape = "line";
      areaW = 500;
      areaH = 100;
      const sentinelQty = Math.ceil(6 * tf * bf);
      const tacticalQty = Math.ceil(2 * rf);
      const coreQty = Math.ceil(2 * rf);
      const cmdQty = 1;
      products = [
        { name: "Aegis Sentinel", qty: sentinelQty, role: "Line coverage", powerKw: 0.4, sensorNodes: sentinelQty },
        { name: "Aegis Tactical", qty: tacticalQty, role: "Rapid response", powerKw: 0.5, sensorNodes: tacticalQty },
        { name: "Aegis Core", qty: coreQty, role: "Sector hubs", powerKw: 0.8, sensorNodes: coreQty * 2 },
        { name: "Aegis Command", qty: cmdQty, role: "C2", powerKw: 0.6, sensorNodes: 0 },
      ];
      baseTimeline = "3 weeks";
      baseOperators = 16;
      sensorPositions = [
        { x: 50, y: 50, r: 70, label: "SEN-1" },
        { x: 130, y: 50, r: 70, label: "SEN-2" },
        { x: 210, y: 50, r: 70, label: "SEN-3" },
        { x: 290, y: 50, r: 70, label: "SEN-4" },
        { x: 370, y: 50, r: 70, label: "SEN-5" },
        { x: 450, y: 50, r: 70, label: "SEN-6" },
        { x: 130, y: 50, r: 40, label: "TAC-1" },
        { x: 370, y: 50, r: 40, label: "TAC-2" },
        { x: 130, y: 50, r: 20, label: "CORE-1" },
        { x: 370, y: 50, r: 20, label: "CORE-2" },
        { x: 250, y: 50, r: 15, label: "CMD" },
      ];
      if (tf > 1.2) {
        sensorPositions.push({ x: 90, y: 50, r: 70, label: "SEN-7" });
        sensorPositions.push({ x: 250, y: 50, r: 70, label: "SEN-8" });
        sensorPositions.push({ x: 410, y: 50, r: 70, label: "SEN-9" });
      }
      break;
    }
    case "urban": {
      areaShape = "rect";
      areaW = 500;
      areaH = 500;
      const coreQty = Math.ceil(3 * rf);
      const tacticalQty = Math.ceil(4 * tf * bf);
      const sentinelQty = Math.ceil(6 * tf * bf);
      const cmdQty = 1;
      products = [
        { name: "Aegis Core", qty: coreQty, role: "Sector coverage", powerKw: 0.8, sensorNodes: coreQty * 2 },
        { name: "Aegis Tactical", qty: tacticalQty, role: "Mobile units", powerKw: 0.5, sensorNodes: tacticalQty },
        { name: "Aegis Sentinel", qty: sentinelQty, role: "Fixed perimeter", powerKw: 0.4, sensorNodes: sentinelQty },
        { name: "Aegis Command", qty: cmdQty, role: "C2", powerKw: 0.6, sensorNodes: 0 },
      ];
      baseTimeline = "2 weeks";
      baseOperators = 14;
      sensorPositions = [
        { x: 170, y: 170, r: 140, label: "CORE-1" },
        { x: 330, y: 170, r: 140, label: "CORE-2" },
        { x: 250, y: 330, r: 140, label: "CORE-3" },
        { x: 80, y: 80, r: 90, label: "SEN-1" },
        { x: 250, y: 60, r: 90, label: "SEN-2" },
        { x: 420, y: 80, r: 90, label: "SEN-3" },
        { x: 60, y: 250, r: 90, label: "SEN-4" },
        { x: 440, y: 250, r: 90, label: "SEN-5" },
        { x: 80, y: 420, r: 90, label: "SEN-6" },
        { x: 420, y: 420, r: 90, label: "SEN-7" },
        { x: 170, y: 280, r: 70, label: "TAC-1" },
        { x: 330, y: 280, r: 70, label: "TAC-2" },
        { x: 250, y: 420, r: 70, label: "TAC-3" },
        { x: 250, y: 170, r: 70, label: "TAC-4" },
        { x: 250, y: 250, r: 30, label: "CMD" },
      ];
      break;
    }
    case "naval": {
      areaShape = "circle";
      areaW = 500;
      areaH = 500;
      const coreQty = Math.ceil(1 * rf);
      const skyQty = Math.ceil(1 * bf);
      const shieldQty = Math.ceil(2 * tf * rf);
      const sentinelQty = Math.ceil(2 * tf);
      const cmdQty = 1;
      products = [
        { name: "Aegis Core", qty: coreQty, role: "Primary detection", powerKw: 0.8, sensorNodes: coreQty * 2 },
        { name: "Aegis SkyWatch", qty: skyQty, role: "Extended range", powerKw: 1.2, sensorNodes: skyQty * 2 },
        { name: "Aegis Shield", qty: shieldQty, role: "Close defense", powerKw: 0.3, sensorNodes: shieldQty },
        { name: "Aegis Sentinel", qty: sentinelQty, role: "Perimeter", powerKw: 0.4, sensorNodes: sentinelQty },
        { name: "Aegis Command", qty: cmdQty, role: "C2", powerKw: 0.6, sensorNodes: 0 },
      ];
      baseTimeline = "48 hours";
      baseOperators = 6;
      sensorPositions = [
        { x: 250, y: 250, r: 200, label: "CORE-1" },
        { x: 250, y: 130, r: 100, label: "SKY-1" },
        { x: 140, y: 250, r: 100, label: "SHD-1" },
        { x: 360, y: 250, r: 100, label: "SHD-2" },
        { x: 180, y: 140, r: 90, label: "SEN-1" },
        { x: 320, y: 360, r: 90, label: "SEN-2" },
        { x: 250, y: 250, r: 35, label: "CMD" },
      ];
      break;
    }
    case "vip": {
      areaShape = "circle";
      areaW = 500;
      areaH = 500;
      const tacticalQty = Math.ceil(2 * tf * rf);
      const shieldQty = Math.ceil(2 * tf * bf);
      const sentinelQty = Math.ceil(3 * tf * bf);
      const cmdQty = 1;
      products = [
        { name: "Aegis Tactical", qty: tacticalQty, role: "Mobile escort", powerKw: 0.5, sensorNodes: tacticalQty },
        { name: "Aegis Shield", qty: shieldQty, role: "Inner ring", powerKw: 0.3, sensorNodes: shieldQty },
        { name: "Aegis Sentinel", qty: sentinelQty, role: "Outer ring", powerKw: 0.4, sensorNodes: sentinelQty },
        { name: "Aegis Command", qty: cmdQty, role: "C2", powerKw: 0.6, sensorNodes: 0 },
      ];
      baseTimeline = "24 hours";
      baseOperators = 4;
      sensorPositions = [
        { x: 250, y: 250, r: 60, label: "SHD-1" },
        { x: 250, y: 180, r: 60, label: "SHD-2" },
        { x: 200, y: 330, r: 60, label: "TAC-1" },
        { x: 300, y: 330, r: 60, label: "TAC-2" },
        { x: 120, y: 180, r: 100, label: "SEN-1" },
        { x: 380, y: 180, r: 100, label: "SEN-2" },
        { x: 250, y: 420, r: 100, label: "SEN-3" },
        { x: 250, y: 250, r: 25, label: "CMD" },
      ];
      break;
    }
  }

  // Apply integration needs
  if (integration !== "none") {
    products.push({
      name: "Aegis Integrator",
      qty: 1,
      role: integration === "jadc2" ? "JADC2 integration" : integration === "nato" ? "NATO STANAG" : "Legacy C2 bridge",
      powerKw: 0.4,
      sensorNodes: 0,
    });
  }

  // Calculate totals
  const totalNodes = products.reduce((sum, p) => sum + p.sensorNodes, 0);
  const totalPowerKw = products.reduce((sum, p) => sum + p.qty * p.powerKw, 0);

  // Adjust timeline and operators based on factors
  const timeMultiplier = tf * (1 / bf) * (rf > 1.1 ? 1.2 : 1.0);
  const operatorMultiplier = tf * rf;

  // Format timeline with multiplier context
  let timeline = baseTimeline;
  if (timeMultiplier > 1.3) {
    timeline = baseTimeline + "+ (extended for threat level)";
  }

  const operators = Math.ceil(baseOperators * operatorMultiplier);

  return {
    products,
    totalNodes,
    timeline,
    operators,
    totalPowerKw: Math.round(totalPowerKw * 10) / 10,
    sensorPositions,
    areaShape,
    areaW,
    areaH,
  };
}

/* ════════════════════════════════════════════════════════════════
   COVERAGE VISUALIZATION SVG
   ════════════════════════════════════════════════════════════════ */

function CoverageMap({ result }: { result: DeploymentResult }) {
  const svgW = 560;
  const svgH = result.areaShape === "line" ? 200 : 560;
  const padX = 30;
  const padY = 30;
  const innerW = svgW - padX * 2;
  const innerH = svgH - padY * 2;
  const scaleX = innerW / result.areaW;
  const scaleY = innerH / result.areaH;

  // Deduplicate labels for cleaner display
  const uniquePositions = result.sensorPositions.filter(
    (p, i, arr) => arr.findIndex((q) => q.label === p.label) === i
  );

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full max-w-[560px] mx-auto"
      style={{ background: "#0a0a0a" }}
    >
      {/* Grid lines */}
      {Array.from({ length: 11 }).map((_, i) => (
        <line
          key={`gv${i}`}
          x1={padX + (innerW * i) / 10}
          y1={padY}
          x2={padX + (innerW * i) / 10}
          y2={padY + innerH}
          stroke="#1a1a1a"
          strokeWidth={0.5}
        />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <line
          key={`gh${i}`}
          x1={padX}
          y1={padY + (innerH * i) / 10}
          x2={padX + innerW}
          y2={padY + (innerH * i) / 10}
          stroke="#1a1a1a"
          strokeWidth={0.5}
        />
      ))}

      {/* Area shape */}
      {result.areaShape === "rect" && (
        <rect
          x={padX}
          y={padY}
          width={innerW}
          height={innerH}
          fill="#161616"
          stroke="#333"
          strokeWidth={1}
        />
      )}
      {result.areaShape === "circle" && (
        <ellipse
          cx={svgW / 2}
          cy={svgH / 2}
          rx={innerW / 2}
          ry={innerH / 2}
          fill="#161616"
          stroke="#333"
          strokeWidth={1}
        />
      )}
      {result.areaShape === "line" && (
        <rect
          x={padX}
          y={padY + innerH * 0.3}
          width={innerW}
          height={innerH * 0.4}
          fill="#161616"
          stroke="#333"
          strokeWidth={1}
          rx={4}
        />
      )}

      {/* Sensor coverage circles */}
      {uniquePositions.map((pos, i) => {
        const cx = padX + pos.x * scaleX;
        const cy = padY + pos.y * scaleY;
        const r = pos.r * Math.min(scaleX, scaleY);
        const isCmd = pos.label === "CMD";

        return (
          <g key={i}>
            {/* Coverage area */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="white"
              fillOpacity={isCmd ? 0.15 : 0.06}
              stroke={isCmd ? "white" : "rgba(255,255,255,0.3)"}
              strokeWidth={isCmd ? 1.5 : 0.5}
              strokeDasharray={isCmd ? "4 2" : "none"}
            />
            {/* Sensor dot */}
            <circle
              cx={cx}
              cy={cy}
              r={isCmd ? 6 : 4}
              fill={isCmd ? "white" : "#999"}
              stroke={isCmd ? "white" : "rgba(255,255,255,0.5)"}
              strokeWidth={1}
            />
            {/* Label */}
            <text
              x={cx}
              y={cy - (isCmd ? 14 : 10)}
              textAnchor="middle"
              fill="#767676"
              fontSize={9}
              fontFamily="monospace"
              letterSpacing="0.05em"
            >
              {pos.label}
            </text>
          </g>
        );
      })}

      {/* Scale indicator */}
      <text x={padX} y={svgH - 8} fill="#555" fontSize={9} fontFamily="monospace">
        TOPO VIEW — SENSOR PLACEMENT
      </text>
    </svg>
  );
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
   PARAMETER OPTION BUTTON
   ════════════════════════════════════════════════════════════════ */

function ParamOption<T extends string>({
  value,
  selected,
  onClick,
  label,
  sublabel,
}: {
  value: T;
  selected: boolean;
  onClick: (v: T) => void;
  label: string;
  sublabel?: string;
}) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`flex-1 min-w-[80px] border px-3 py-3 text-center transition-all duration-200 ${
        selected
          ? "border-white bg-white/[0.08] text-white"
          : "border-[#333] bg-[#111] text-[#767676] hover:border-[#555] hover:text-[#b9b9b9]"
      }`}
    >
      <div className="text-sm font-medium">{label}</div>
      {sublabel && (
        <div className="text-[9px] uppercase tracking-wider mt-0.5 opacity-60">
          {sublabel}
        </div>
      )}
    </button>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════ */

export default function DeploymentPlannerPage() {
  const [scenario, setScenario] = useState<ScenarioKey | null>(null);
  const [threat, setThreat] = useState<ThreatLevel>("medium");
  const [budget, setBudget] = useState<BudgetTier>("standard");
  const [uptime, setUptime] = useState<UptimeReq>("99.9");
  const [integration, setIntegration] = useState<IntegrationNeed>("none");
  const [showResult, setShowResult] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const result = useMemo(() => {
    if (!scenario) return null;
    return generateRecommendation(scenario, threat, budget, uptime, integration);
  }, [scenario, threat, budget, uptime, integration]);

  const handleGenerate = () => {
    if (scenario) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setShowResult(false);
  };

  const summaryText = useMemo(() => {
    if (!result || !scenario) return "";
    const sc = SCENARIOS[scenario];
    let text = `AEGIS DEFENSE SYSTEMS — DEPLOYMENT PLANNER SUMMARY\n`;
    text += `${"═".repeat(52)}\n\n`;
    text += `SCENARIO: ${sc.label} (${sc.description})\n`;
    text += `THREAT DENSITY: ${THREAT_LEVELS[threat].label}\n`;
    text += `BUDGET TIER: ${BUDGET_TIERS[budget].label}\n`;
    text += `REQUIRED UPTIME: ${UPTIME_REQS[uptime].label}\n`;
    text += `INTEGRATION: ${INTEGRATION_NEEDS[integration].label}\n\n`;
    text += `RECOMMENDED DEPLOYMENT:\n`;
    text += `${"─".repeat(36)}\n`;
    result.products.forEach((p) => {
      text += `  ${p.qty}× ${p.name} — ${p.role}\n`;
    });
    text += `\nSUMMARY METRICS:\n`;
    text += `${"─".repeat(36)}\n`;
    text += `  Total Sensor Nodes:  ${result.totalNodes}\n`;
    text += `  Deployment Timeline:  ${result.timeline}\n`;
    text += `  Required Personnel:  ${result.operators} operators\n`;
    text += `  Power Requirements:  ${result.totalPowerKw} kW\n\n`;
    text += `Generated by Aegis Deployment Planner\n`;
    text += `${new Date().toISOString().split("T")[0]}`;
    return text;
  }, [result, scenario, threat, budget, uptime, integration]);

  return (
    <>
      {/* ── Hero ── */}
      <SectionHero
        image="/images/pages/radar-scope.jpg"
        label="Interactive Tool"
        title="Deployment Planner"
        subtitle="Configure your operational scenario and receive optimized Aegis deployment recommendations — sensor placement, coverage visualization, and resource requirements."
      />

      {/* ── Planner ── */}
      <section className="py-20 md:py-32 bg-black">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-8 lg:gap-16">
            {/* ── LEFT: Configuration ── */}
            <div className="space-y-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-6">
                  Configuration
                </span>
              </div>

              {/* Scenario Selection */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#767676] mb-3">
                  Operational Scenario
                </label>
                <div className="space-y-2">
                  {(Object.entries(SCENARIOS) as [ScenarioKey, (typeof SCENARIOS)[ScenarioKey]][]).map(
                    ([key, val]) => {
                      const Icon = val.icon;
                      const isSelected = scenario === key;
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setScenario(key);
                            setShowResult(false);
                          }}
                          className={`w-full flex items-center gap-4 border px-4 py-3 text-left transition-all duration-200 ${
                            isSelected
                              ? "border-white bg-white/[0.06] text-white"
                              : "border-[#333] bg-[#0a0a0a] text-[#767676] hover:border-[#555] hover:text-[#b9b9b9]"
                          }`}
                        >
                          <Icon className="size-5 shrink-0" strokeWidth={1.5} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">{val.label}</div>
                            <div className="text-[10px] uppercase tracking-wider opacity-60 mt-0.5">
                              {val.description}
                            </div>
                          </div>
                          <div
                            className={`shrink-0 w-4 h-4 border-2 flex items-center justify-center transition-colors ${
                              isSelected ? "border-white" : "border-[#555]"
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 bg-white" />}
                          </div>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Threat Density */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#767676] mb-3">
                  Threat Density
                </label>
                <div className="flex gap-2">
                  {(Object.entries(THREAT_LEVELS) as [ThreatLevel, (typeof THREAT_LEVELS)[ThreatLevel]][]).map(
                    ([key, val]) => (
                      <ParamOption
                        key={key}
                        value={key}
                        selected={threat === key}
                        onClick={(v) => {
                          setThreat(v);
                          setShowResult(false);
                        }}
                        label={val.label}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Budget Tier */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#767676] mb-3">
                  Budget Tier
                </label>
                <div className="flex gap-2">
                  {(Object.entries(BUDGET_TIERS) as [BudgetTier, (typeof BUDGET_TIERS)[BudgetTier]][]).map(
                    ([key, val]) => (
                      <ParamOption
                        key={key}
                        value={key}
                        selected={budget === key}
                        onClick={(v) => {
                          setBudget(v);
                          setShowResult(false);
                        }}
                        label={val.label}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Required Uptime */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#767676] mb-3">
                  Required Uptime
                </label>
                <div className="flex gap-2">
                  {(Object.entries(UPTIME_REQS) as [UptimeReq, (typeof UPTIME_REQS)[UptimeReq]][]).map(
                    ([key, val]) => (
                      <ParamOption
                        key={key}
                        value={key}
                        selected={uptime === key}
                        onClick={(v) => {
                          setUptime(v);
                          setShowResult(false);
                        }}
                        label={val.label}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Integration Needs */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#767676] mb-3">
                  Integration Needs
                </label>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(INTEGRATION_NEEDS) as [IntegrationNeed, (typeof INTEGRATION_NEEDS)[IntegrationNeed]][]).map(
                    ([key, val]) => (
                      <ParamOption
                        key={key}
                        value={key}
                        selected={integration === key}
                        onClick={(v) => {
                          setIntegration(v);
                          setShowResult(false);
                        }}
                        label={val.label}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!scenario}
                className={`w-full flex items-center justify-center gap-3 py-4 text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 ${
                  scenario
                    ? "bg-white text-black hover:bg-[#e0e0e0]"
                    : "bg-[#222] text-[#555] cursor-not-allowed"
                }`}
              >
                Generate Deployment Plan
                <ChevronRight className="size-4" strokeWidth={2} />
              </button>
            </div>

            {/* ── RIGHT: Results ── */}
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-6">
                  Deployment Recommendation
                </span>
              </div>

              <AnimatePresence mode="wait">
                {!showResult || !result ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border border-[#222] bg-[#0a0a0a] p-12 md:p-16 text-center"
                  >
                    <div className="text-[#333] mb-4">
                      <Radar className="size-12 mx-auto" strokeWidth={1} />
                    </div>
                    <p className="text-[#767676] text-sm">
                      Select an operational scenario and configure parameters,
                      then generate your deployment plan.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    {/* Scenario badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="border border-white/20 bg-[#0a0a0a] p-6 md:p-8"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        {(() => {
                          const Icon = SCENARIOS[scenario!].icon;
                          return <Icon className="size-5 text-[#767676]" strokeWidth={1.5} />;
                        })()}
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#767676]">
                          Selected Scenario
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
                        {SCENARIOS[scenario!].label}
                      </h3>
                      <p className="text-[#767676] text-sm mt-1">
                        {SCENARIOS[scenario!].description} · {THREAT_LEVELS[threat].label} threat ·{" "}
                        {BUDGET_TIERS[budget].label} budget · {UPTIME_REQS[uptime].label} uptime ·{" "}
                        {INTEGRATION_NEEDS[integration].label} integration
                      </p>
                    </motion.div>

                    {/* Products list */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="border border-[#222] bg-[#0a0a0a] overflow-hidden"
                    >
                      <div className="px-5 md:px-6 py-4 border-b border-[#222]">
                        <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676]">
                          Recommended Aegis Products
                        </div>
                      </div>
                      <div className="divide-y divide-[#222]">
                        {result.products.map((product, i) => (
                          <motion.div
                            key={product.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.08 }}
                            className="flex items-center justify-between px-5 md:px-6 py-4"
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-lg font-bold text-white min-w-[48px]">
                                {product.qty}×
                              </span>
                              <div>
                                <div className="text-sm font-medium text-white">
                                  {product.name}
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-[#555] mt-0.5">
                                  {product.role}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-[#767676]">
                                {product.powerKw * product.qty} kW
                              </div>
                              {product.sensorNodes > 0 && (
                                <div className="text-[10px] text-[#555]">
                                  {product.sensorNodes} nodes
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Summary metrics grid */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                    >
                      <div className="border border-[#222] bg-[#0a0a0a] p-4 md:p-5">
                        <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mb-2">
                          Total Nodes
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
                            <AnimatedNumber value={result.totalNodes} decimals={0} />
                          </span>
                          <span className="text-xs text-[#767676]">sensors</span>
                        </div>
                      </div>
                      <div className="border border-[#222] bg-[#0a0a0a] p-4 md:p-5">
                        <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mb-2">
                          Deployment
                        </div>
                        <div className="flex items-baseline gap-1">
                          <Clock className="size-4 text-[#555] mt-0.5" strokeWidth={1.5} />
                          <span className="text-sm md:text-base font-bold text-white ml-1">
                            {result.timeline}
                          </span>
                        </div>
                      </div>
                      <div className="border border-[#222] bg-[#0a0a0a] p-4 md:p-5">
                        <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mb-2">
                          Personnel
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
                            <AnimatedNumber value={result.operators} decimals={0} />
                          </span>
                          <span className="text-xs text-[#767676]">operators</span>
                        </div>
                      </div>
                      <div className="border border-[#222] bg-[#0a0a0a] p-4 md:p-5">
                        <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mb-2">
                          Power
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
                            <AnimatedNumber value={result.totalPowerKw} decimals={1} />
                          </span>
                          <span className="text-xs text-[#767676]">kW</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Coverage Visualization */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="border border-[#222] bg-[#0a0a0a] p-4 md:p-6"
                    >
                      <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mb-4">
                        Coverage Visualization — Top-Down Sensor Placement
                      </div>
                      <CoverageMap result={result} />
                      <div className="flex items-center gap-6 mt-4 text-[10px] uppercase tracking-wider text-[#555]">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-white/30 border border-white/40" />
                          Sensor coverage area
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-white border border-white" />
                          Command node
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#999] border border-white/50" />
                          Sensor position
                        </div>
                      </div>
                    </motion.div>

                    {/* Action buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <button
                        onClick={() => setSummaryOpen(true)}
                        className="flex-1 flex items-center justify-center gap-3 border border-white/30 text-white px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300"
                      >
                        <Download className="size-4" strokeWidth={1.5} />
                        Download Summary
                      </button>
                      <button
                        onClick={handleReset}
                        className="flex items-center justify-center gap-3 border border-[#333] text-[#767676] px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:border-[#555] hover:text-[#b9b9b9] transition-all duration-300"
                      >
                        <RefreshCw className="size-4" strokeWidth={1.5} />
                        Reconfigure
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Methodology Callout ── */}
      <Callout>
        Every deployment recommendation is derived from validated coverage models
        and operational doctrine. Sensor placement optimized for zero blind spots.
      </Callout>

      {/* ── CTA ── */}
      <CTASection
        title="Validate With Live Assessment"
        subtitle="This planner provides baseline recommendations. Request a live demonstration to validate sensor placement against your actual terrain and threat environment."
        primaryCta="Request a Demo"
        primaryHref="/request-demo"
        secondaryCta="Explore Technology"
        secondaryHref="/technology"
      />

      {/* ── Summary Dialog ── */}
      <Dialog open={summaryOpen} onOpenChange={setSummaryOpen}>
        <DialogContent className="bg-[#111] border-[#333] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-sm uppercase tracking-[0.15em]">
              Deployment Summary
            </DialogTitle>
            <DialogDescription className="text-[#767676] text-xs">
              Generated deployment plan summary
            </DialogDescription>
          </DialogHeader>
          <pre className="bg-[#0a0a0a] border border-[#222] p-4 text-xs text-[#b9b9b9] font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[60vh] overflow-y-auto">
            {summaryText}
          </pre>
          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={() => setSummaryOpen(false)}
              className="border border-[#333] text-[#767676] px-6 py-2.5 text-xs uppercase tracking-[0.15em] hover:border-[#555] hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
