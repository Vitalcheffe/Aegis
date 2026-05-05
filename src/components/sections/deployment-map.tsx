"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Shield, Plane, Lock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// ──────────────────────────────────────────────
// Deployment location data
// ──────────────────────────────────────────────
interface DeploymentLocation {
  id: string;
  name: string;
  region: string;
  systems: string;
  type: string;
  status: "Active" | "Planned";
  isHQ?: boolean;
  x: number;
  y: number;
}

const locations: DeploymentLocation[] = [
  {
    id: "washington-dc",
    name: "Washington DC",
    region: "USA",
    systems: "50+",
    type: "Military + Government",
    status: "Active",
    isHQ: true,
    x: 286,
    y: 152,
  },
  {
    id: "norfolk",
    name: "Norfolk",
    region: "USA",
    systems: "12",
    type: "Naval",
    status: "Active",
    x: 290,
    y: 158,
  },
  {
    id: "san-diego",
    name: "San Diego",
    region: "USA",
    systems: "8",
    type: "Naval + Border",
    status: "Active",
    x: 174,
    y: 169,
  },
  {
    id: "fort-bliss",
    name: "Fort Bliss",
    region: "USA",
    systems: "15",
    type: "Military",
    status: "Active",
    x: 204,
    y: 172,
  },
  {
    id: "london",
    name: "London",
    region: "UK",
    systems: "20+",
    type: "Military + Airport",
    status: "Active",
    isHQ: true,
    x: 478,
    y: 112,
  },
  {
    id: "berlin",
    name: "Berlin",
    region: "Germany",
    systems: "10",
    type: "Military",
    status: "Active",
    x: 510,
    y: 108,
  },
  {
    id: "abu-dhabi",
    name: "Abu Dhabi",
    region: "UAE",
    systems: "18",
    type: "Critical Infrastructure",
    status: "Active",
    isHQ: true,
    x: 622,
    y: 192,
  },
  {
    id: "tel-aviv",
    name: "Tel Aviv",
    region: "Israel",
    systems: "12",
    type: "Military",
    status: "Active",
    x: 575,
    y: 172,
  },
  {
    id: "singapore",
    name: "Singapore",
    region: "Singapore",
    systems: "10",
    type: "Airport + Maritime",
    status: "Active",
    isHQ: true,
    x: 758,
    y: 258,
  },
  {
    id: "tokyo",
    name: "Tokyo",
    region: "Japan",
    systems: "8",
    type: "Military",
    status: "Active",
    x: 858,
    y: 158,
  },
  {
    id: "sydney",
    name: "Sydney",
    region: "Australia",
    systems: "6",
    type: "Border + Airport",
    status: "Active",
    x: 890,
    y: 352,
  },
  {
    id: "riyadh",
    name: "Riyadh",
    region: "Saudi Arabia",
    systems: "15",
    type: "Critical Infrastructure",
    status: "Active",
    x: 607,
    y: 192,
  },
  {
    id: "paris",
    name: "Paris",
    region: "France",
    systems: "5",
    type: "Airport",
    status: "Planned",
    x: 483,
    y: 118,
  },
  {
    id: "warsaw",
    name: "Warsaw",
    region: "Poland",
    systems: "8",
    type: "Military",
    status: "Active",
    x: 530,
    y: 108,
  },
  {
    id: "seoul",
    name: "Seoul",
    region: "South Korea",
    systems: "12",
    type: "Military + Border",
    status: "Active",
    x: 828,
    y: 153,
  },
];

// ──────────────────────────────────────────────
// Simplified continent SVG paths
// Using equirectangular-like projection on 1000×500 viewBox
// ──────────────────────────────────────────────
const continentPaths = [
  // North America
  {
    id: "north-america",
    d: "M 80,55 L 95,50 115,48 135,52 155,48 175,50 195,52 215,55 225,60 240,65 255,68 265,72 270,78 275,85 280,90 285,95 288,102 290,108 288,115 282,120 278,125 275,130 270,135 268,140 270,145 275,150 280,155 282,160 278,165 270,168 260,172 250,175 242,178 235,182 228,188 222,195 218,200 215,205 210,208 200,210 190,212 182,215 175,218 168,222 162,228 158,235 155,240 152,245 148,242 142,238 135,232 128,228 122,225 118,222 115,218 112,212 108,205 105,198 102,190 100,185 98,180 95,175 92,170 88,165 85,158 82,150 80,142 78,135 76,128 75,120 74,112 76,105 78,98 80,90 82,82 84,75 85,68 82,62 80,55 Z",
  },
  // Greenland
  {
    id: "greenland",
    d: "M 320,38 L 340,32 360,30 375,35 385,42 388,52 385,62 378,70 368,75 355,72 342,65 332,58 325,50 320,42 Z",
  },
  // South America
  {
    id: "south-america",
    d: "M 240,250 L 255,245 270,248 285,252 298,258 308,265 315,275 318,285 320,295 318,305 315,315 310,325 305,335 298,345 290,355 280,365 272,375 265,385 258,395 252,402 248,408 245,412 240,408 235,400 230,390 225,380 222,370 220,360 218,350 220,340 225,330 228,320 230,310 232,300 235,290 238,280 240,270 240,260 240,250 Z",
  },
  // Europe
  {
    id: "europe",
    d: "M 445,60 L 455,55 468,58 478,62 488,58 498,55 510,58 520,62 530,60 540,65 548,70 555,78 558,85 555,92 548,98 542,105 538,112 535,118 530,122 522,125 515,128 508,132 500,135 492,138 485,140 478,138 470,135 465,130 460,125 455,118 450,112 448,105 445,98 442,90 440,82 442,75 445,68 445,60 Z",
  },
  // British Isles
  {
    id: "british-isles",
    d: "M 440,85 L 448,78 455,80 458,88 455,95 448,98 442,95 440,88 Z M 435,92 L 438,88 442,90 440,96 436,96 Z",
  },
  // Scandinavia
  {
    id: "scandinavia",
    d: "M 480,28 L 488,22 498,25 508,30 515,38 520,48 522,58 518,68 512,75 505,72 498,65 492,58 488,50 485,42 482,35 480,28 Z",
  },
  // Africa
  {
    id: "africa",
    d: "M 460,175 L 475,170 490,172 505,175 518,178 530,182 542,188 552,195 560,205 565,215 568,225 570,238 572,250 570,262 568,275 562,288 555,300 548,312 540,322 532,332 525,340 518,348 510,355 502,358 495,355 488,350 480,342 475,332 470,320 465,308 462,295 460,282 458,268 456,255 455,242 456,228 458,215 460,200 460,188 460,175 Z",
  },
  // Middle East / Arabian Peninsula
  {
    id: "middle-east",
    d: "M 555,155 L 568,150 580,155 592,162 602,170 612,178 618,188 620,198 615,208 608,215 598,218 588,215 578,210 570,205 562,198 558,190 555,180 554,170 555,155 Z",
  },
  // Asia (main body)
  {
    id: "asia",
    d: "M 555,55 L 575,50 598,48 620,50 645,52 668,48 690,45 712,48 735,52 758,55 778,60 798,58 818,62 838,68 855,78 868,88 878,98 882,110 878,120 870,128 860,135 848,140 835,145 822,150 810,155 798,158 788,162 778,168 768,175 758,182 750,190 742,198 735,208 728,218 722,228 718,240 715,250 712,242 708,232 702,222 695,212 688,205 680,198 672,195 662,198 652,205 642,212 632,218 622,222 615,218 608,212 600,208 592,205 585,200 578,195 572,188 568,180 565,172 562,162 560,152 558,142 558,132 560,122 562,112 565,102 568,92 570,82 568,72 562,65 558,58 555,55 Z",
  },
  // India
  {
    id: "india",
    d: "M 652,195 L 662,190 672,195 680,205 685,218 688,232 685,245 680,258 672,268 662,275 652,278 645,272 640,262 638,250 640,238 642,225 645,212 650,200 652,195 Z",
  },
  // Southeast Asia / Indonesia
  {
    id: "southeast-asia",
    d: "M 735,215 L 745,210 755,215 762,222 768,232 772,245 768,255 760,260 750,258 742,252 738,242 735,232 735,222 735,215 Z M 780,252 L 790,248 800,252 805,260 800,268 790,270 782,265 780,258 Z M 810,258 L 822,255 832,260 835,268 830,275 820,275 812,270 810,262 Z",
  },
  // Japan
  {
    id: "japan",
    d: "M 858,120 L 865,115 872,118 875,128 872,138 868,148 862,155 858,148 855,138 855,128 858,120 Z",
  },
  // Australia
  {
    id: "australia",
    d: "M 830,310 L 848,305 868,308 888,312 905,318 918,328 925,340 922,355 915,368 905,378 892,385 878,388 862,385 848,378 838,368 830,355 825,342 822,328 825,318 830,310 Z",
  },
  // New Zealand
  {
    id: "new-zealand",
    d: "M 938,370 L 942,365 946,370 945,380 940,385 936,380 938,370 Z",
  },
];

// ──────────────────────────────────────────────
// Type icon renderer (avoids creating component during render)
// ──────────────────────────────────────────────
function TypeIcon({ type, className }: { type: string; className?: string }) {
  if (type.includes("Military")) return <Shield className={className} />;
  if (type.includes("Airport") || type.includes("Maritime"))
    return <Plane className={className} />;
  if (type.includes("Critical Infrastructure") || type.includes("Border"))
    return <Lock className={className} />;
  return <Building2 className={className} />;
}

// ──────────────────────────────────────────────
// Deployment Dot (single location marker)
// ──────────────────────────────────────────────
function DeploymentDot({
  location,
  isHovered,
  onHover,
  onLeave,
}: {
  location: DeploymentLocation;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <g
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="cursor-pointer"
    >
      {/* Pulse ring on hover */}
      {isHovered && (
        <motion.circle
          cx={location.x}
          cy={location.y}
          r={12}
          fill="none"
          stroke="#ffffff"
          strokeWidth={1}
          initial={{ opacity: 0.6, r: 4 }}
          animate={{ opacity: 0, r: 20 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      {/* Outer ring for HQ */}
      {location.isHQ && (
        <motion.circle
          cx={location.x}
          cy={location.y}
          r={8}
          fill="none"
          stroke="#b9b9b9"
          strokeWidth={1}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: isHovered ? 0.8 : 0.4 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {/* Main dot */}
      <motion.circle
        cx={location.x}
        cy={location.y}
        r={location.isHQ ? 4.5 : 3}
        fill={location.status === "Planned" ? "#767676" : "#ffffff"}
        stroke={location.status === "Planned" ? "#555555" : "none"}
        strokeWidth={location.status === "Planned" ? 0.5 : 0}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: Math.random() * 0.3 }}
        whileHover={{ scale: 1.6 }}
      />
    </g>
  );
}

// ──────────────────────────────────────────────
// Tooltip
// ──────────────────────────────────────────────
function MapTooltip({
  location,
  position,
}: {
  location: DeploymentLocation;
  position: { x: number; y: number };
}) {
  // Offset tooltip to avoid going off-screen
  const tooltipX = position.x > 750 ? position.x - 210 : position.x + 16;
  const tooltipY = position.y > 350 ? position.y - 140 : position.y + 16;

  return (
    <motion.g
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <foreignObject x={tooltipX} y={tooltipY} width={200} height={130}>
        <div className="bg-[#111111] border border-[#222222] p-4 text-left font-[Inter,system-ui,sans-serif]">
          <div className="flex items-center gap-2 mb-2">
            <TypeIcon type={location.type} className="w-3.5 h-3.5 text-[#767676]" />
            <span className="text-[9px] uppercase tracking-[0.15em] text-[#767676]">
              {location.type}
            </span>
          </div>
          <div className="text-white text-sm font-semibold leading-tight">
            {location.name}
          </div>
          <div className="text-[#767676] text-[11px] mt-0.5">{location.region}</div>
          <div className="mt-3 pt-3 border-t border-[#222222] flex items-center justify-between">
            <div>
              <span className="text-white text-lg font-bold">
                {location.systems}
              </span>
              <span className="text-[#767676] text-[10px] uppercase tracking-wider ml-1.5">
                systems
              </span>
            </div>
            <span
              className={`text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 border ${
                location.status === "Active"
                  ? "text-[#b9b9b9] border-[#333333]"
                  : "text-[#767676] border-[#333333]"
              }`}
            >
              {location.status}
            </span>
          </div>
          {location.isHQ && (
            <div className="mt-2 text-[9px] uppercase tracking-[0.15em] text-[#b9b9b9]">
              Regional HQ
            </div>
          )}
        </div>
      </foreignObject>
    </motion.g>
  );
}

// ──────────────────────────────────────────────
// Connection lines between HQs and regional offices
// ──────────────────────────────────────────────
function ConnectionLines() {
  const hqLocations = locations.filter((l) => l.isHQ);
  const dcHQ = locations.find((l) => l.id === "washington-dc")!;

  const lines = hqLocations
    .filter((l) => l.id !== "washington-dc")
    .map((hq) => ({
      x1: dcHQ.x,
      y1: dcHQ.y,
      x2: hq.x,
      y2: hq.y,
    }));

  return (
    <g opacity={0.15}>
      {lines.map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#ffffff"
          strokeWidth={0.5}
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.15 }}
          transition={{ duration: 2, delay: 0.5 + i * 0.3 }}
        />
      ))}
    </g>
  );
}

// ──────────────────────────────────────────────
// Mobile List View
// ──────────────────────────────────────────────
function MobileDeploymentList() {
  return (
    <div className="space-y-0">
      {locations.map((location, i) => (
        <motion.div
          key={location.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="border-t border-[#222222] py-4 px-1"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="mt-0.5 p-1.5 border border-[#222222] shrink-0">
                <TypeIcon type={location.type} className="w-3.5 h-3.5 text-[#767676]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-semibold">
                    {location.name}
                  </span>
                  {location.isHQ && (
                    <span className="text-[8px] uppercase tracking-[0.15em] text-[#b9b9b9] border border-[#333333] px-1.5 py-0.5">
                      HQ
                    </span>
                  )}
                </div>
                <div className="text-[#767676] text-xs mt-0.5">
                  {location.region} · {location.type}
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-white text-sm font-bold">
                {location.systems}
              </div>
              <div
                className={`text-[9px] uppercase tracking-wider ${
                  location.status === "Active"
                    ? "text-[#b9b9b9]"
                    : "text-[#767676]"
                }`}
              >
                {location.status}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      <div className="border-t border-[#222222]" />
    </div>
  );
}

// ──────────────────────────────────────────────
// Main DeploymentMap component
// ──────────────────────────────────────────────
export function DeploymentMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleHover = useCallback((id: string) => setHoveredId(id), []);
  const handleLeave = useCallback(() => setHoveredId(null), []);

  const hoveredLocation = locations.find((l) => l.id === hoveredId) ?? null;

  if (isMobile) {
    return <MobileDeploymentList />;
  }

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-auto"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        {/* Background */}
        <rect width="1000" height="500" fill="#000000" />

        {/* Grid lines (subtle) */}
        <g opacity={0.06} stroke="#ffffff" strokeWidth={0.5}>
          {/* Latitude lines */}
          {[83, 166, 250, 333, 416].map((y) => (
            <line key={`lat-${y}`} x1={0} y1={y} x2={1000} y2={y} />
          ))}
          {/* Longitude lines */}
          {[167, 333, 500, 667, 833].map((x) => (
            <line key={`lon-${x}`} x1={x} y1={0} x2={x} y2={500} />
          ))}
        </g>

        {/* Continent outlines */}
        <g>
          {continentPaths.map((continent) => (
            <motion.path
              key={continent.id}
              d={continent.d}
              fill="#222222"
              stroke="#333333"
              strokeWidth={0.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          ))}
        </g>

        {/* Connection lines between HQ offices */}
        <ConnectionLines />

        {/* Deployment dots */}
        <g>
          {locations.map((location) => (
            <DeploymentDot
              key={location.id}
              location={location}
              isHovered={hoveredId === location.id}
              onHover={() => handleHover(location.id)}
              onLeave={handleLeave}
            />
          ))}
        </g>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredLocation && (
            <MapTooltip
              location={hoveredLocation}
              position={{ x: hoveredLocation.x, y: hoveredLocation.y }}
            />
          )}
        </AnimatePresence>

        {/* Legend */}
        <g transform="translate(30, 440)">
          <circle cx={0} cy={0} r={3} fill="#ffffff" />
          <text x={10} y={4} fill="#767676" fontSize={9} fontFamily="Inter, system-ui, sans-serif">
            Active Deployment
          </text>
          <circle cx={130} cy={0} r={3} fill="#767676" stroke="#555555" strokeWidth={0.5} />
          <text x={140} y={4} fill="#767676" fontSize={9} fontFamily="Inter, system-ui, sans-serif">
            Planned
          </text>
          <circle cx={210} cy={0} r={5.5} fill="none" stroke="#b9b9b9" strokeWidth={1} />
          <circle cx={210} cy={0} r={3} fill="#ffffff" />
          <text x={222} y={4} fill="#767676" fontSize={9} fontFamily="Inter, system-ui, sans-serif">
            Regional HQ
          </text>
        </g>
      </svg>
    </div>
  );
}
