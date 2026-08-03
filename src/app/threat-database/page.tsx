"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Shield,
  Radar,
  Radio,
  Eye,
  Ear,
  ChevronRight,
  Crosshair,
  Activity,
  Globe,
  Clock,
  Plane,
  AlertTriangle,
  Zap,
  Weight,
  Ruler,
  Gauge,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
type Category = "Commercial" | "Military" | "Modified" | "DIY/Custom";
type ThreatLevel = "Critical" | "High" | "Medium" | "Low";

interface DroneThreat {
  id: number;
  name: string;
  manufacturer: string;
  category: Category;
  threatLevel: ThreatLevel;
  range: string;
  speed: string;
  payload: string;
  weight: string;
  detectionDifficulty: number;
  description: string;
  threatAssessment: string[];
  responseProtocol: string[];
  detectionConfidence: {
    radar: number;
    rf: number;
    eoir: number;
    acoustic: number;
  };
  lastUpdated: string;
}

// ──────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────
const droneThreats: DroneThreat[] = [
  {
    id: 1,
    name: "DJI Matrice 350 RTK",
    manufacturer: "DJI",
    category: "Commercial",
    threatLevel: "Medium",
    range: "20km",
    speed: "82 km/h",
    payload: "2.7kg",
    weight: "6.3kg",
    detectionDifficulty: 2,
    description:
      "Widely used commercial platform with RTK positioning. Increasingly modified for surveillance in conflict zones. Standard RF detection effective.",
    threatAssessment: [
      "The DJI Matrice 350 RTK represents the most prevalent commercial drone platform in the mid-weight category. Its RTK (Real-Time Kinematic) positioning system provides centimeter-level accuracy, making it a precision surveillance tool when deployed by adversarial actors. The platform's widespread availability and robust SDK have enabled extensive modification ecosystems in conflict zones.",
      "While the stock configuration poses a moderate threat, documented field modifications include encrypted control links, autonomous waypoint navigation with GPS-denied fallback, and payload bay adaptations for signal relay equipment. The platform's 2.7kg payload capacity is sufficient for advanced ISR packages including multi-spectral sensors.",
      "Standard RF detection remains effective against unmodified units due to the platform's active control link transmissions. However, modified units with encrypted burst communications require advanced signal analysis for reliable identification. Aegis multi-spectral detection achieves 94% classification confidence on this platform type.",
    ],
    responseProtocol: [
      "Deploy RF monitoring for standard DJI protocol signatures",
      "Initiate jamming on 2.4GHz and 5.8GHz bands for unmodified units",
      "For encrypted variants, activate multi-spectral correlation tracking",
      "Engage Aegis Core automated classification for threat verification",
      "If hostile intent confirmed, activate directional jamming with GPS spoofing fallback",
    ],
    detectionConfidence: { radar: 85, rf: 92, eoir: 78, acoustic: 65 },
    lastUpdated: "2026-03-15",
  },
  {
    id: 2,
    name: "DJI Mavic 3 Enterprise",
    manufacturer: "DJI",
    category: "Commercial",
    threatLevel: "Medium",
    range: "15km",
    speed: "75 km/h",
    payload: "0.95kg",
    weight: "0.9kg",
    detectionDifficulty: 3,
    description:
      "Compact commercial drone with thermal imaging. Difficult to detect visually. Commonly used for unauthorized infrastructure surveillance.",
    threatAssessment: [
      "The DJI Mavic 3 Enterprise is a compact, highly portable commercial drone that has become a tool of choice for unauthorized surveillance operations. Its integrated thermal imaging capability enables effective night operations and through-foliage observation, making it particularly concerning for critical infrastructure protection.",
      "The platform's small form factor (0.9kg) and quiet operation make visual and acoustic detection challenging, especially in urban environments with ambient noise. The 15km operational range and 0.95kg payload capacity are sufficient for high-resolution ISR missions against infrastructure targets.",
      "Detection relies heavily on RF signature analysis during active flight operations. When operating in stealth mode with reduced emissions, multi-spectral sensor fusion becomes critical. Aegis EO/IR systems achieve reliable detection at 1.2km under standard conditions, reduced to 600m in cluttered environments.",
    ],
    responseProtocol: [
      "Prioritize RF scanning for DJI protocol emissions in protected zones",
      "Deploy EO/IR sensors with automated small-target detection algorithms",
      "Activate acoustic array for low-altitude approach warning",
      "Engage Aegis Tactical unit for rapid response in urban environments",
      "Standard jamming effective — initiate on positive classification",
    ],
    detectionConfidence: { radar: 55, rf: 88, eoir: 72, acoustic: 48 },
    lastUpdated: "2026-02-28",
  },
  {
    id: 3,
    name: "Shahed-136",
    manufacturer: "Iran (Shahed Aviation)",
    category: "Military",
    threatLevel: "Critical",
    range: "2500km",
    speed: "185 km/h",
    payload: "50kg",
    weight: "200kg",
    detectionDifficulty: 4,
    description:
      "Iranian-made loitering munition used extensively in active conflict zones. GPS-denied navigation capability. Low radar cross-section. Swarm deployment documented.",
    threatAssessment: [
      "The Shahed-136 represents one of the most significant asymmetric threats in modern conflict. This Iranian-designed loitering munition has been deployed in massive swarm attacks against critical infrastructure, demonstrating the viability of low-cost, high-volume strike tactics against conventional air defense systems. Its 2500km range enables deep-penetration strikes from launch points well behind enemy lines.",
      "The platform's low radar cross-section (estimated 0.01-0.05 m²), combined with its low-altitude flight profile, makes conventional radar detection extremely challenging. The GPS-denied navigation capability, reportedly using inertial measurement units with terrain correlation, eliminates the effectiveness of GPS jamming as a standalone countermeasure.",
      "Documented swarm attacks involving 20+ simultaneous Shahed-136 deployments have overwhelmed conventional air defense architectures. The unit cost of approximately $20,000-50,000 makes attrition-based defense economically unsustainable. Effective countermeasures require layered, multi-spectral detection with automated engagement protocols. Aegis Shield arrays have demonstrated 97% neutralization rates in simulated swarm scenarios.",
    ],
    responseProtocol: [
      "Deploy Aegis Shield perimeter array for long-range detection",
      "Activate multi-spectral fusion for low-RCS target classification",
      "Initiate automated swarm tracking and prioritization algorithms",
      "Coordinate with kinetic air defense for high-value target engagement",
      "Deploy electronic warfare package — GPS spoofing combined with command link disruption",
      "For swarm scenarios, activate Aegis Command multi-system coordination protocol",
    ],
    detectionConfidence: { radar: 45, rf: 30, eoir: 68, acoustic: 82 },
    lastUpdated: "2026-04-01",
  },
  {
    id: 4,
    name: "Skydio X10",
    manufacturer: "Skydio",
    category: "Commercial",
    threatLevel: "High",
    range: "10km",
    speed: "70 km/h",
    payload: "1.5kg",
    weight: "3.2kg",
    detectionDifficulty: 4,
    description:
      "Autonomous AI-powered drone with obstacle avoidance. Can operate without GPS. Difficult to jam. Increasingly used by military and security forces.",
    threatAssessment: [
      "The Skydio X10 represents a paradigm shift in commercial drone capabilities due to its advanced autonomous flight system. The platform's AI-powered navigation enables GPS-free operation in complex environments, including indoor spaces, dense urban areas, and GPS-denied theaters. This autonomous capability fundamentally undermines the effectiveness of GPS-based jamming countermeasures.",
      "Military and security force adoption is accelerating across NATO and allied nations, creating dual-use concerns. While deployed for legitimate ISR operations, the same capabilities can be leveraged for unauthorized surveillance or attack planning. The platform's 1.5kg payload capacity accommodates advanced sensor packages and potential delivery mechanisms.",
      "The X10's autonomous operation mode eliminates the need for a persistent control link, making RF detection and jamming significantly less effective. Aegis sensor fusion combining radar, EO/IR, and acoustic detection achieves the highest confidence classification for this platform type. Electronic warfare response requires targeting the platform's onboard processing rather than relying on command link disruption.",
    ],
    responseProtocol: [
      "RF-only detection insufficient — activate multi-spectral sensor fusion",
      "Deploy EO/IR tracking for GPS-denied autonomous flight detection",
      "For autonomous variants, jamming must target navigation sensors directly",
      "Engage Aegis Core AI classification for autonomous drone pattern recognition",
      "Coordinate directional EW targeting at onboard sensor frequencies",
      "Activate Aegis Sentinel autonomous monitoring for persistent coverage",
    ],
    detectionConfidence: { radar: 62, rf: 45, eoir: 85, acoustic: 55 },
    lastUpdated: "2026-03-22",
  },
  {
    id: 5,
    name: "Rustom-II",
    manufacturer: "DRDO (India)",
    category: "Military",
    threatLevel: "High",
    range: "1000km",
    speed: "225 km/h",
    payload: "350kg",
    weight: "1800kg",
    detectionDifficulty: 1,
    description:
      "Medium-altitude long-endurance UAV. Used for ISR and strike missions. Conventional radar detection effective at range.",
    threatAssessment: [
      "The Rustom-II is a medium-altitude long-endurance (MALE) UAV developed by India's Defence Research and Development Organisation. With a 1800kg maximum takeoff weight and 350kg payload capacity, it operates in a similar class to the MQ-1 Predator and represents a conventional military UAV threat. Its operational ceiling and endurance make it suitable for sustained ISR and strike missions.",
      "While the platform itself is not designed for stealth, its military-grade systems include encrypted communications and electronic counter-countermeasures. The 1000km operational range enables cross-border ISR missions and deep-strike capability when armed. Its conventional radar signature (estimated 1-5 m²) makes detection relatively straightforward for modern air defense radar systems.",
      "The primary challenge is not detection but classification and response decision-making. The Rustom-II operates in contested airspace where friendly, neutral, and hostile MALE UAVs may share similar radar signatures. Aegis classification AI distinguishes platform types with 91% accuracy using multi-spectral signature analysis.",
    ],
    responseProtocol: [
      "Standard air defense radar provides reliable detection at 150km+",
      "Activate Aegis classification AI for friendly/hostile determination",
      "Coordinate with air defense C2 for engagement authorization",
      "Deploy standard EW package for command link disruption",
      "For armed variants, prioritize kinetic engagement per ROE",
      "Aegis Command integration enables automated threat handoff to air defense",
    ],
    detectionConfidence: { radar: 96, rf: 82, eoir: 88, acoustic: 42 },
    lastUpdated: "2026-01-18",
  },
  {
    id: 6,
    name: "Modified DJI Agras T40",
    manufacturer: "DJI (Modified)",
    category: "Modified",
    threatLevel: "Critical",
    range: "5km",
    speed: "55 km/h",
    payload: "50kg",
    weight: "11.6kg",
    detectionDifficulty: 3,
    description:
      "Agricultural spray drone increasingly modified for chemical/biological agent dispersal. Documented modifications include encrypted control links and autonomous waypoint navigation. High payload capacity makes it a critical threat.",
    threatAssessment: [
      "The DJI Agras T40 represents a critical escalation in the modified commercial drone threat landscape. Originally designed for agricultural spraying with a 50kg payload capacity and 70kg tank, this platform's chemical dispersal capabilities have been repurposed for weaponized deployment. Intelligence reports confirm documented modifications for chemical and biological agent dispersal in multiple active conflict zones.",
      "The platform's 50kg payload capacity far exceeds typical commercial drones, enabling delivery of significant quantities of chemical agents or conventional explosives. Modified units have been documented with encrypted control links that bypass standard DJI protocol detection, autonomous waypoint navigation systems, and enhanced spray systems optimized for aerosol dissemination rather than agricultural application.",
      "The combination of high payload capacity, documented modification patterns, and the difficulty of distinguishing agricultural from weaponized units makes this platform a priority threat. Aegis multi-spectral detection focuses on flight pattern analysis and spray system thermal signatures to identify hostile configurations. The agricultural modification ecosystem provides deniability for state and non-state actors alike.",
    ],
    responseProtocol: [
      "Deploy Aegis Shield with chemical/biological detection modules",
      "Activate flight pattern analysis AI for agricultural vs. hostile classification",
      "Monitor spray system thermal signatures for non-standard operation",
      "For confirmed hostile units, initiate immediate jamming and spoofing",
      "Coordinate with CBRN response teams for agent identification",
      "Aegis Command automated alert to national CBRN response network",
    ],
    detectionConfidence: { radar: 72, rf: 65, eoir: 58, acoustic: 52 },
    lastUpdated: "2026-04-10",
  },
  {
    id: 7,
    name: "FPV Racing Drone (Custom)",
    manufacturer: "Various (Custom Build)",
    category: "DIY/Custom",
    threatLevel: "High",
    range: "2km",
    speed: "160 km/h",
    payload: "0.5kg",
    weight: "0.8kg",
    detectionDifficulty: 5,
    description:
      "Commercially available FPV components assembled into high-speed attack platforms. Documented use for grenade delivery in active conflict. Extremely difficult to detect due to small size and low altitude. Response time critical.",
    threatAssessment: [
      "Custom-built FPV racing drones represent the most challenging detection and neutralization problem in the current threat landscape. Assembled from commercially available components, these platforms exploit the accessibility of high-performance FPV racing technology to create low-cost, high-speed attack drones. Documented use in active conflict zones includes precision grenade delivery against armored vehicles and fortified positions.",
      "The extreme speed (up to 160 km/h in dive attacks), small radar cross-section (<0.001 m²), and low-altitude flight profile make these platforms nearly invisible to conventional radar systems. Their minimal RF signature during dive attacks — when the pilot may rely on pre-programmed terminal guidance — further reduces detection opportunities. The 0.5kg payload is sufficient for modified grenades and IEDs.",
      "Response time is the critical factor. From detection to impact, defenders may have less than 10 seconds in terminal attack scenarios. This necessitates automated detection and response systems. Aegis Sentinel autonomous monitoring nodes with integrated EW provide the fastest response capability, achieving sub-3-second detection-to-jam cycles. Human-in-the-loop systems cannot reliably respond within the required timeframe.",
    ],
    responseProtocol: [
      "Deploy Aegis Sentinel autonomous monitoring for persistent detection",
      "Activate acoustic array for high-speed approach warning (primary sensor)",
      "Enable automated jam-on-detect protocol for FPV frequency bands",
      "No time for classification — automated response required",
      "Coordinate Aegis Tactical rapid-deployment EW for force protection",
      "Post-engagement: deploy counter-reconnaissance to locate operator",
    ],
    detectionConfidence: { radar: 12, rf: 38, eoir: 35, acoustic: 72 },
    lastUpdated: "2026-03-30",
  },
  {
    id: 8,
    name: "Bayraktar TB2",
    manufacturer: "Baykar (Turkey)",
    category: "Military",
    threatLevel: "Critical",
    range: "300km",
    speed: "220 km/h",
    payload: "150kg",
    weight: "650kg",
    detectionDifficulty: 2,
    description:
      "Turkish-made armed UAV with proven combat record across multiple theaters. Carries MAM-L and MAM-C smart munitions. Conventional air defense can engage, but low-cost makes swarm tactics viable.",
    threatAssessment: [
      "The Bayraktar TB2 has established itself as one of the most consequential military UAVs of the current era, with a proven combat record across Libya, Syria, Nagorno-Karabakh, and Ukraine. Its combat effectiveness against conventional armor and air defense systems has fundamentally altered the cost-exchange ratio in favor of UAV-armed forces. The platform carries MAM-L (22kg) and MAM-C (6.5kg) smart munitions with semi-active laser and IR guidance.",
      "While the TB2 is detectable by conventional air defense radar (RCS ~1 m²) and vulnerable to modern SAM systems, its operational impact derives from economic and tactical factors. At approximately $5M per unit, the TB2 is inexpensive relative to the air defense assets required to counter it. Documented swarm tactics involving 4-6 TB2s coordinating strikes have demonstrated the ability to saturate conventional air defense response capacity.",
      "The TB2's satellite communications capability enables beyond-line-of-sight operation, reducing operator vulnerability. However, its reliance on line-of-sight data links for weapons guidance creates an exploitable EW vulnerability. Aegis electronic warfare systems can disrupt the weapons guidance link, degrading strike accuracy by an estimated 80% even without neutralizing the platform itself.",
    ],
    responseProtocol: [
      "Deploy Aegis Shield for long-range detection and tracking",
      "Activate multi-spectral classification for TB2 identification",
      "Prioritize weapons guidance link disruption via directional EW",
      "Coordinate with air defense C2 for engagement authorization",
      "Monitor for swarm coordination signatures across multiple contacts",
      "Aegis Command integration for multi-system engagement coordination",
    ],
    detectionConfidence: { radar: 92, rf: 78, eoir: 90, acoustic: 38 },
    lastUpdated: "2026-02-14",
  },
  {
    id: 9,
    name: "Houthi Loitering Munition (Modified)",
    manufacturer: "Various (Modified)",
    category: "Modified",
    threatLevel: "Critical",
    range: "1500km",
    speed: "200 km/h",
    payload: "18kg",
    weight: "75kg",
    detectionDifficulty: 4,
    description:
      "Documented modifications of commercial and surplus military platforms into one-way attack drones. Varied designs make RF fingerprinting unreliable. Swarm tactics observed in Red Sea theater.",
    threatAssessment: [
      "Houthi-modified loitering munitions represent an evolving and heterogeneous threat class that defies standard classification approaches. These platforms are constructed from a variable mix of commercial drone components, surplus military hardware, and locally fabricated parts, resulting in designs that change frequently and lack consistent RF or radar signatures. Intelligence indicates Iranian technical support in design and component supply.",
      "The 1500km range enables strikes across the Red Sea and into the Arabian Peninsula from launch points in Yemen. Swarm tactics involving 10-20 simultaneous launches have been observed, with varied approach vectors and timing designed to saturate naval air defense systems. The 18kg warhead is sufficient to cause significant damage to commercial shipping and military vessels, as demonstrated in multiple attacks.",
      "The fundamental challenge is the inability to establish reliable RF fingerprints for these platforms. Each production batch may use different communication hardware, frequencies, and protocols. This requires detection systems that can adapt to novel signatures in real-time. Aegis AI-driven signal analysis has demonstrated the ability to classify previously unseen loitering munition types with 76% confidence using behavioral pattern analysis.",
    ],
    responseProtocol: [
      "Deploy Aegis Shield with adaptive signal analysis for novel RF signatures",
      "Activate behavioral pattern recognition AI for unknown threat classification",
      "Prioritize swarm detection and trajectory analysis for intercept planning",
      "Coordinate with naval air defense for multi-layer engagement",
      "Enable Aegis Command real-time threat sharing across fleet elements",
      "Post-engagement: collect debris for technical intelligence on construction patterns",
    ],
    detectionConfidence: { radar: 52, rf: 38, eoir: 62, acoustic: 70 },
    lastUpdated: "2026-04-08",
  },
  {
    id: 10,
    name: "Autel EVO II Pro",
    manufacturer: "Autel Robotics",
    category: "Commercial",
    threatLevel: "Low",
    range: "9km",
    speed: "72 km/h",
    payload: "0.8kg",
    weight: "1.1kg",
    detectionDifficulty: 2,
    description:
      "Common commercial photography drone. Occasionally used for unauthorized surveillance. Standard detection and jamming highly effective. Low threat when unmodified.",
    threatAssessment: [
      "The Autel EVO II Pro is a widely available commercial photography drone that poses a low baseline threat to protected assets. Its primary concern stems from unauthorized surveillance of critical infrastructure, VIP movements, or military installations. The platform's 0.8kg payload capacity limits its offensive potential to ISR operations and minor payload delivery.",
      "Standard DJI and Autel protocol detection is highly effective against unmodified units. The EVO II Pro's active control link emissions are easily identified by modern RF scanning systems. Jamming effectiveness is rated as high, with standard commercial-band disruption achieving reliable neutralization. The platform lacks autonomous capabilities that would complicate detection or response.",
      "While the baseline threat is low, operators should maintain awareness of potential modifications. Documented field modifications for the Autel platform family include extended battery systems, encrypted communication modules, and payload bay adaptations. However, these modifications are less common and less sophisticated than those seen on DJI platforms. Routine Aegis monitoring provides adequate coverage for this threat class.",
    ],
    responseProtocol: [
      "Standard RF monitoring provides reliable detection",
      "Conventional jamming on 2.4GHz and 5.8GHz bands highly effective",
      "No specialized response required for unmodified units",
      "Aegis Core standard operating procedure sufficient",
      "Log encounter for threat database pattern analysis",
    ],
    detectionConfidence: { radar: 62, rf: 95, eoir: 70, acoustic: 55 },
    lastUpdated: "2026-03-01",
  },
  {
    id: 11,
    name: "Cargo Drone (Custom Build)",
    manufacturer: "Various (Custom Build)",
    category: "DIY/Custom",
    threatLevel: "High",
    range: "15km",
    speed: "65 km/h",
    payload: "25kg",
    weight: "35kg",
    detectionDifficulty: 2,
    description:
      "Large custom-built multirotor designed for payload delivery. Documented use for weapons resupply to forward positions. Radar-detectable at range due to size. RF jamming effective for neutralization.",
    threatAssessment: [
      "Custom-built cargo drones represent a growing threat in active military theaters, particularly for weapons and supplies resupply to forward positions that are difficult to reach by ground. These large multirotor platforms, typically 35-50kg with 20-30kg payload capacity, are constructed from commercially available heavy-lift components and open-source flight controllers. Documented use in Eastern European and Middle Eastern conflicts demonstrates operational viability.",
      "The 25kg payload capacity enables delivery of significant quantities of ammunition, medical supplies, communication equipment, or explosive devices. While slow (65 km/h) and detectable by radar due to their size, their low cost and expendable nature makes them attractive for high-risk resupply missions where manned logistics would face prohibitive casualties.",
      "RF jamming is highly effective against these platforms due to their reliance on active control links for stable flight. Unlike smaller FPV drones, cargo multirotors cannot easily transition to autonomous flight when control links are disrupted. However, operators should be aware that some advanced builds incorporate GPS waypoint return-to-home fallbacks that may continue the delivery mission even under jamming.",
    ],
    responseProtocol: [
      "Radar detection reliable due to platform size — standard Aegis Shield coverage",
      "RF jamming highly effective for flight disruption",
      "Monitor for GPS waypoint navigation fallback behavior",
      "If autonomous fallback detected, deploy GPS spoofing to redirect",
      "Aegis Tactical rapid-deployment unit for forward position protection",
      "Post-neutralization: recover for technical intelligence on build patterns",
    ],
    detectionConfidence: { radar: 88, rf: 82, eoir: 75, acoustic: 68 },
    lastUpdated: "2026-02-20",
  },
  {
    id: 12,
    name: "Lockheed Martin Stalker VXE",
    manufacturer: "Lockheed Martin",
    category: "Military",
    threatLevel: "High",
    range: "100km+",
    speed: "80 km/h",
    payload: "2.3kg",
    weight: "6.3kg",
    detectionDifficulty: 4,
    description:
      "Military-grade hand-launched SUAS with fuel cell endurance exceeding 8 hours. Silent electric propulsion. Low observable design. Requires advanced multi-spectral detection for reliable tracking.",
    threatAssessment: [
      "The Lockheed Martin Stalker VXE is a military-grade small unmanned aircraft system (SUAS) designed for extended endurance ISR missions. Its fuel cell propulsion system provides over 8 hours of continuous flight time — a capability unmatched by battery-powered platforms in its weight class. The silent electric propulsion system eliminates acoustic detection as a viable countermeasure.",
      "The platform's low-observable design minimizes both radar and visual signatures. Operating at altitudes between 30-500m AGL, the Stalker VXE can maintain persistent surveillance over targets for extended periods without detection. Its 100km+ operational range, combined with encrypted satellite communications, enables deep-penetration ISR missions with minimal operator exposure.",
      "Reliable detection requires advanced multi-spectral sensor fusion combining radar, RF signal analysis, EO/IR, and acoustic arrays. No single sensor modality provides sufficient confidence for consistent detection. Aegis multi-spectral fusion achieves 78% detection confidence against Stalker-class SUAS, the highest in the industry. Response protocols must account for the platform's autonomous loitering capability and encrypted communications.",
    ],
    responseProtocol: [
      "Deploy full Aegis multi-spectral sensor fusion — no single sensor sufficient",
      "Activate advanced radar processing for low-RCS target detection",
      "Enable RF signal analysis for encrypted communication pattern identification",
      "Deploy EO/IR sensors with persistent stare capability for loiter detection",
      "For confirmed threats, coordinate military EW response for encrypted link disruption",
      "Aegis Command integration required for multi-system tracking handoff",
    ],
    detectionConfidence: { radar: 38, rf: 42, eoir: 72, acoustic: 15 },
    lastUpdated: "2026-03-18",
  },
];

// ──────────────────────────────────────────────
// Helper: Threat Level Styling
// ──────────────────────────────────────────────
function getThreatLevelStyle(level: ThreatLevel) {
  switch (level) {
    case "Critical":
      return {
        border: "border-2 border-white",
        badge: "bg-white text-black border-white",
        label: "CRITICAL",
      };
    case "High":
      return {
        border: "border border-[#767676]",
        badge: "bg-transparent text-white border-[#767676]",
        label: "HIGH",
      };
    case "Medium":
      return {
        border: "border border-[#333]",
        badge: "bg-transparent text-[#b9b9b9] border-[#333]",
        label: "MEDIUM",
      };
    case "Low":
      return {
        border: "border border-[#222]",
        badge: "bg-transparent text-[#767676] border-[#222]",
        label: "LOW",
      };
  }
}

function getCategoryBadgeStyle(category: Category) {
  switch (category) {
    case "Commercial":
      return "bg-transparent text-[#b9b9b9] border-[#333]";
    case "Military":
      return "bg-white text-black border-white";
    case "Modified":
      return "bg-[#333] text-white border-[#555]";
    case "DIY/Custom":
      return "bg-transparent text-[#767676] border-[#444]";
  }
}

// ──────────────────────────────────────────────
// Detection Difficulty Dots
// ──────────────────────────────────────────────
function DetectionDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < level ? "bg-white" : "bg-[#333]"
          }`}
        />
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────
// Detection Confidence Bar
// ──────────────────────────────────────────────
function ConfidenceBar({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5 text-[#767676]" />
          <span className="text-xs text-[#767676] uppercase tracking-wider">
            {label}
          </span>
        </div>
        <span className="text-xs text-white font-mono">{value}%</span>
      </div>
      <div className="h-1 bg-[#222] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Section Hero
// ──────────────────────────────────────────────
function SectionHero() {
  return (
    <section className="relative pt-32 pb-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-[90rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-white" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#767676]">
              Intelligence Database
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Drone Threat
            <br />
            Intelligence
          </h1>
          <p className="text-base md:text-lg text-[#767676] max-w-2xl leading-relaxed">
            Real-time threat data from 240+ deployed Aegis systems worldwide.
            The most comprehensive open-source counter-UAS intelligence database
            in the defense industry.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Stats Bar
// ──────────────────────────────────────────────
function StatsBar() {
  const stats = [
    {
      value: "2,847",
      label: "Threats Tracked",
      icon: Crosshair,
    },
    {
      value: "147",
      label: "Drone Models Cataloged",
      icon: Plane,
    },
    {
      value: "12",
      label: "Nations Reporting",
      icon: Globe,
    },
    {
      value: "Real-time",
      label: "Updated",
      icon: Activity,
    },
  ];

  return (
    <section className="px-6 md:px-12 lg:px-20 pb-12">
      <div className="max-w-[90rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 border border-[#222]"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-6 md:p-8 ${
                i < stats.length - 1 ? "border-r border-[#222]" : ""
              } ${i >= 2 ? "border-t border-[#222] md:border-t-0" : ""}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <stat.icon className="w-4 h-4 text-[#767676]" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#767676]">
                  {stat.label}
                </span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white font-mono">
                {stat.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Threat Card
// ──────────────────────────────────────────────
function ThreatCard({
  threat,
  onViewDetails,
}: {
  threat: DroneThreat;
  onViewDetails: (t: DroneThreat) => void;
}) {
  const levelStyle = getThreatLevelStyle(threat.threatLevel);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`bg-[#0a0a0a] ${levelStyle.border} p-6 flex flex-col h-full`}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base font-semibold text-white leading-tight">
            {threat.name}
          </h3>
          <Badge
            variant="outline"
            className={`text-[9px] uppercase tracking-wider shrink-0 ${levelStyle.badge}`}
          >
            {levelStyle.label}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`text-[9px] uppercase tracking-wider ${getCategoryBadgeStyle(threat.category)}`}
          >
            {threat.category}
          </Badge>
          <span className="text-[11px] text-[#767676]">
            {threat.manufacturer}
          </span>
        </div>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-2 gap-3 mb-4 py-4 border-y border-[#222]">
        <div className="flex items-center gap-2">
          <Ruler className="w-3.5 h-3.5 text-[#767676]" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#767676]">
              Range
            </div>
            <div className="text-sm text-white font-mono">{threat.range}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Gauge className="w-3.5 h-3.5 text-[#767676]" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#767676]">
              Speed
            </div>
            <div className="text-sm text-white font-mono">{threat.speed}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#767676]" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#767676]">
              Payload
            </div>
            <div className="text-sm text-white font-mono">
              {threat.payload}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Weight className="w-3.5 h-3.5 text-[#767676]" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#767676]">
              Weight
            </div>
            <div className="text-sm text-white font-mono">{threat.weight}</div>
          </div>
        </div>
      </div>

      {/* Detection Difficulty */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-wider text-[#767676]">
          Detection Difficulty
        </span>
        <DetectionDots level={threat.detectionDifficulty} />
      </div>

      {/* Description */}
      <p className="text-sm text-[#b9b9b9] leading-relaxed mb-6 flex-1">
        {threat.description}
      </p>

      {/* View Details Button */}
      <Button
        variant="outline"
        onClick={() => onViewDetails(threat)}
        className="w-full bg-transparent border-[#333] text-white hover:bg-white hover:text-black transition-colors duration-200 text-[11px] uppercase tracking-wider"
      >
        View Details
        <ChevronRight className="w-3.5 h-3.5 ml-1" />
      </Button>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Detail Modal
// ──────────────────────────────────────────────
function DetailModal({
  threat,
  open,
  onClose,
}: {
  threat: DroneThreat | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!threat) return null;

  const levelStyle = getThreatLevelStyle(threat.threatLevel);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0a0a0a] border-[#222] text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-xl font-bold text-white">
                {threat.name}
              </DialogTitle>
              <DialogDescription className="text-[#767676] mt-1">
                {threat.manufacturer} — {threat.category}
              </DialogDescription>
            </div>
            <Badge
              variant="outline"
              className={`text-[10px] uppercase tracking-wider shrink-0 ${levelStyle.badge}`}
            >
              {levelStyle.label} THREAT
            </Badge>
          </div>
        </DialogHeader>

        <Separator className="bg-[#222]" />

        {/* Full Specifications Table */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#767676] mb-3">
            Specifications
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#222] border border-[#222]">
            {[
              { label: "Range", value: threat.range, icon: Ruler },
              { label: "Speed", value: threat.speed, icon: Gauge },
              { label: "Payload", value: threat.payload, icon: Zap },
              { label: "Weight", value: threat.weight, icon: Weight },
            ].map((spec) => (
              <div
                key={spec.label}
                className="bg-[#0a0a0a] p-4 flex items-center gap-2"
              >
                <spec.icon className="w-4 h-4 text-[#767676]" />
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-[#767676]">
                    {spec.label}
                  </div>
                  <div className="text-sm text-white font-mono">
                    {spec.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Assessment */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#767676] mb-3">
            Threat Assessment
          </h4>
          <div className="space-y-3">
            {threat.threatAssessment.map((paragraph, i) => (
              <p
                key={i}
                className="text-sm text-[#b9b9b9] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Recommended Response Protocol */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#767676] mb-3">
            Recommended Aegis Response Protocol
          </h4>
          <div className="border border-[#222]">
            {threat.responseProtocol.map((step, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 px-4 py-3 ${
                  i < threat.responseProtocol.length - 1
                    ? "border-b border-[#222]"
                    : ""
                }`}
              >
                <span className="text-[11px] text-[#767676] font-mono shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-[#b9b9b9]">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detection Confidence by Sensor Type */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#767676] mb-4">
            Detection Confidence by Sensor
          </h4>
          <div className="space-y-3">
            <ConfidenceBar
              label="Radar"
              value={threat.detectionConfidence.radar}
              icon={Radar}
            />
            <ConfidenceBar
              label="RF Signal"
              value={threat.detectionConfidence.rf}
              icon={Radio}
            />
            <ConfidenceBar
              label="EO/IR"
              value={threat.detectionConfidence.eoir}
              icon={Eye}
            />
            <ConfidenceBar
              label="Acoustic"
              value={threat.detectionConfidence.acoustic}
              icon={Ear}
            />
          </div>
        </div>

        <Separator className="bg-[#222]" />

        {/* Last Updated */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#767676]" />
            <span className="text-[11px] text-[#767676] uppercase tracking-wider">
              Last Updated
            </span>
          </div>
          <span className="text-sm text-white font-mono">
            {threat.lastUpdated}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ──────────────────────────────────────────────
// CTA Section
// ──────────────────────────────────────────────
function CTASection() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24">
      <div className="max-w-[90rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-[#222] p-12 md:p-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Access Full Intelligence
          </h2>
          <p className="text-[#767676] max-w-xl mx-auto mb-8 leading-relaxed">
            Request access to the complete Aegis threat intelligence platform
            with real-time updates, detailed analytics, and integration with
            your existing defense systems.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center gap-2 bg-white text-black text-[11px] uppercase tracking-[0.15em] font-semibold px-8 py-3.5 hover:bg-white/90 transition-colors duration-200"
          >
            Request Access
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────
export default function ThreatDatabasePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [threatLevelFilter, setThreatLevelFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [selectedThreat, setSelectedThreat] = useState<DroneThreat | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (threat: DroneThreat) => {
    setSelectedThreat(threat);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedThreat(null), 200);
  };

  const filteredThreats = useMemo(() => {
    let result = [...droneThreats];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.manufacturer.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.threatLevel.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((t) => t.category === categoryFilter);
    }

    // Threat level filter
    if (threatLevelFilter !== "all") {
      result = result.filter((t) => t.threatLevel === threatLevelFilter);
    }

    // Sort
    const threatLevelOrder: Record<ThreatLevel, number> = {
      Critical: 0,
      High: 1,
      Medium: 2,
      Low: 3,
    };

    switch (sortBy) {
      case "threat-level":
        result.sort(
          (a, b) =>
            threatLevelOrder[a.threatLevel] - threatLevelOrder[b.threatLevel]
        );
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "date":
        result.sort(
          (a, b) =>
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
        );
        break;
    }

    return result;
  }, [searchQuery, categoryFilter, threatLevelFilter, sortBy]);

  return (
    <div className="bg-black min-h-screen">
      <SectionHero />
      <StatsBar />

      {/* Search & Filter Bar */}
      <section className="px-6 md:px-12 lg:px-20 pb-8">
        <div className="max-w-[90rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border border-[#222] p-4 md:p-6"
          >
            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
              <Input
                placeholder="Search by drone model, manufacturer, or threat type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#0a0a0a] border-[#333] text-white placeholder:text-[#555] pl-10 h-11 focus-visible:border-[#767676] focus-visible:ring-0"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#767676] shrink-0">
                  Category:
                </span>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="bg-[#0a0a0a] border-[#333] text-white h-8 text-xs w-[140px] focus:ring-0 focus-visible:border-[#767676]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0a] border-[#333]">
                    <SelectItem
                      value="all"
                      className="text-white focus:bg-[#222] focus:text-white"
                    >
                      All
                    </SelectItem>
                    <SelectItem
                      value="Commercial"
                      className="text-white focus:bg-[#222] focus:text-white"
                    >
                      Commercial
                    </SelectItem>
                    <SelectItem
                      value="Military"
                      className="text-white focus:bg-[#222] focus:text-white"
                    >
                      Military
                    </SelectItem>
                    <SelectItem
                      value="Modified"
                      className="text-white focus:bg-[#222] focus:text-white"
                    >
                      Modified
                    </SelectItem>
                    <SelectItem
                      value="DIY/Custom"
                      className="text-white focus:bg-[#222] focus:text-white"
                    >
                      DIY/Custom
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#767676] shrink-0">
                  Threat Level:
                </span>
                <Select
                  value={threatLevelFilter}
                  onValueChange={setThreatLevelFilter}
                >
                  <SelectTrigger className="bg-[#0a0a0a] border-[#333] text-white h-8 text-xs w-[130px] focus:ring-0 focus-visible:border-[#767676]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0a] border-[#333]">
                    <SelectItem
                      value="all"
                      className="text-white focus:bg-[#222] focus:text-white"
                    >
                      All
                    </SelectItem>
                    <SelectItem
                      value="Critical"
                      className="text-white focus:bg-[#222] focus:text-white"
                    >
                      Critical
                    </SelectItem>
                    <SelectItem
                      value="High"
                      className="text-white focus:bg-[#222] focus:text-white"
                    >
                      High
                    </SelectItem>
                    <SelectItem
                      value="Medium"
                      className="text-white focus:bg-[#222] focus:text-white"
                    >
                      Medium
                    </SelectItem>
                    <SelectItem
                      value="Low"
                      className="text-white focus:bg-[#222] focus:text-white"
                    >
                      Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#767676] shrink-0">
                  Sort:
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#333] text-white h-8 text-xs w-[130px] focus:ring-0 focus-visible:border-[#767676]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0a] border-[#333]">
                    <SelectItem
                      value="name"
                      className="text-white focus:bg-[#222] focus:text-white"
                    >
                      Name
                    </SelectItem>
                    <SelectItem
                      value="threat-level"
                      className="text-white focus:bg-[#222] focus:text-white"
                    >
                      Threat Level
                    </SelectItem>
                    <SelectItem
                      value="date"
                      className="text-white focus:bg-[#222] focus:text-white"
                    >
                      Date
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results count */}
              <div className="ml-auto">
                <span className="text-[11px] text-[#767676]">
                  {filteredThreats.length} result
                  {filteredThreats.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Threat Cards Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-[90rem] mx-auto">
          {filteredThreats.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-[#222] p-16 text-center"
            >
              <AlertTriangle className="w-8 h-8 text-[#767676] mx-auto mb-4" />
              <p className="text-white text-lg mb-2">No threats found</p>
              <p className="text-[#767676] text-sm">
                Adjust your search or filter criteria to find threat entries.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredThreats.map((threat) => (
                  <ThreatCard
                    key={threat.id}
                    threat={threat}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <CTASection />

      {/* Detail Modal */}
      <DetailModal
        threat={selectedThreat}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
