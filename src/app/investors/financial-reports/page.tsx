"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, animate as fmAnimate } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ScrollReveal } from "@/components/sections/scroll-reveal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  PieChart,
  FileText,
  ArrowUpRight,
} from "lucide-react";

/* ──────────────────────────────────────────────
   ANIMATED COUNTER
   ────────────────────────────────────────────── */

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const controls = fmAnimate(motionVal, value, {
            duration: 2,
            ease: [0.25, 0.1, 0.25, 1],
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [motionVal, value]);

  useEffect(() => {
    const unsubscribe = motionVal.on("change", (v) => {
      setDisplay(v);
    });
    return unsubscribe;
  }, [motionVal]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toLocaleString()}
      {suffix}
    </span>
  );
}

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const revenueData = [
  { year: "FY2021", revenue: 380 },
  { year: "FY2022", revenue: 520 },
  { year: "FY2023", revenue: 720 },
  { year: "FY2024", revenue: 840 },
  { year: "FY2025", revenue: 1200 },
];

const segments = [
  { name: "Military", percent: 45 },
  { name: "Critical Infrastructure", percent: 25 },
  { name: "Airports", percent: 18 },
  { name: "Border Security", percent: 8 },
  { name: "Other", percent: 4 },
];

const quarterlyEarnings = [
  {
    quarter: "Q1 FY2025",
    revenue: "$268M",
    grossProfit: "$228M",
    grossMargin: "85.1%",
    ebitda: "$94M",
    ebitdaMargin: "35.1%",
    netIncome: "$42M",
  },
  {
    quarter: "Q2 FY2025",
    revenue: "$295M",
    grossProfit: "$251M",
    grossMargin: "85.1%",
    ebitda: "$103M",
    ebitdaMargin: "34.9%",
    netIncome: "$48M",
  },
  {
    quarter: "Q3 FY2025",
    revenue: "$312M",
    grossProfit: "$265M",
    grossMargin: "84.9%",
    ebitda: "$109M",
    ebitdaMargin: "34.9%",
    netIncome: "$51M",
  },
  {
    quarter: "Q4 FY2025",
    revenue: "$325M",
    grossProfit: "$276M",
    grossMargin: "84.9%",
    ebitda: "$114M",
    ebitdaMargin: "35.1%",
    netIncome: "$55M",
  },
];

const keyMetrics = [
  {
    label: "Revenue (FY2025)",
    value: 1.2,
    prefix: "$",
    suffix: "B",
    decimals: 1,
    icon: DollarSign,
  },
  {
    label: "Valuation",
    value: 2.4,
    prefix: "$",
    suffix: "B",
    decimals: 1,
    icon: TrendingUp,
  },
  {
    label: "YoY Growth",
    value: 42,
    prefix: "",
    suffix: "%",
    decimals: 0,
    icon: ArrowUpRight,
  },
  {
    label: "Gross Margin",
    value: 85,
    prefix: "",
    suffix: "%",
    decimals: 0,
    icon: BarChart3,
  },
  {
    label: "EBITDA Margin",
    value: 35,
    prefix: "",
    suffix: "%",
    decimals: 0,
    icon: PieChart,
  },
];

/* ──────────────────────────────────────────────
   CUSTOM TOOLTIP
   ────────────────────────────────────────────── */

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const formatted = val >= 1000 ? `$${(val / 1000).toFixed(1)}B` : `$${val}M`;
  return (
    <div className="bg-[#222] border border-white/10 px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">
        {label}
      </p>
      <p className="text-white font-bold text-lg">{formatted}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SEGMENT BAR
   ────────────────────────────────────────────── */

function SegmentBar() {
  return (
    <div>
      {/* Stacked bar */}
      <div className="flex h-3 w-full overflow-hidden mb-6">
        {segments.map((seg) => (
          <div
            key={seg.name}
            className="bg-white/80"
            style={{ width: `${seg.percent}%` }}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {segments.map((seg) => (
          <div key={seg.name} className="flex items-center gap-3">
            <div className="w-3 h-3 bg-white/80 shrink-0" />
            <div>
              <div className="text-white text-sm font-medium">
                {seg.percent}%
              </div>
              <div className="text-[10px] uppercase tracking-[0.1em] text-[#767676]">
                {seg.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────── */

export default function FinancialReportsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a]" />
        <div className="relative z-10 max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20 w-full py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/50 mb-6 border border-white/10 px-4 py-1.5">
              Investors
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white max-w-5xl"
          >
            Financial Reports
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 text-[#b9b9b9] text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl"
          >
            Transparency and accountability. Access our financial data,
            earnings reports, and key performance indicators.
          </motion.p>
        </div>
      </section>

      {/* ── KEY METRICS ── */}
      <section className="py-20 md:py-28 bg-black border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              FY2025 Performance
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white mb-12">
              Key Financial Metrics
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
            {keyMetrics.map((metric, i) => (
              <ScrollReveal key={metric.label} delay={i * 80}>
                <div className="border border-white/10 p-6 bg-[#0a0a0a]">
                  <metric.icon className="w-5 h-5 text-white/20 mb-4" />
                  <div className="text-[clamp(2rem,4vw,3rem)] font-bold text-white tracking-[-0.02em] leading-none">
                    <AnimatedCounter
                      value={metric.value}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                    />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-3">
                    {metric.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVENUE GROWTH CHART ── */}
      <section className="py-20 md:py-28 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Five-Year Trend
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white mb-12">
              Revenue Growth
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="border border-white/10 bg-black p-6 md:p-8">
              <div className="h-[350px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="year"
                      tick={{ fill: "#767676", fontSize: 11, fontWeight: 500 }}
                      axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#767676", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v: number) => v >= 1000 ? `$${(v / 1000).toFixed(1)}B` : `$${v}M`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Bar dataKey="revenue" radius={[2, 2, 0, 0]} maxBarSize={80}>
                      {revenueData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === revenueData.length - 1 ? "#ffffff" : "rgba(255,255,255,0.4)"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-8">
                <div>
                  <div className="text-sm font-medium text-white">FY2025 Revenue</div>
                  <div className="text-2xl font-bold text-white">$1.2B</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">5-Year CAGR</div>
                  <div className="text-2xl font-bold text-white">33.2%</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">YoY Growth</div>
                  <div className="text-2xl font-bold text-white">42.9%</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── REVENUE BY SEGMENT ── */}
      <section className="py-20 md:py-28 bg-black border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              FY2025 Breakdown
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white mb-12">
              Revenue by Segment
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="border border-white/10 bg-[#0a0a0a] p-6 md:p-8">
              <SegmentBar />
              <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
                {segments.slice(0, 3).map((seg) => (
                  <div key={seg.name} className="flex items-start gap-4">
                    <div className="text-3xl font-bold text-white/20 leading-none">
                      {seg.percent}%
                    </div>
                    <div>
                      <div className="text-white font-medium">{seg.name}</div>
                      <div className="text-[#767676] text-sm mt-1">
                        {seg.name === "Military" && "$540M — Defense ministries, armed forces, and intelligence agencies worldwide"}
                        {seg.name === "Critical Infrastructure" && "$300M — Power plants, government facilities, and national landmarks"}
                        {seg.name === "Airports" && "$216M — International airports and aviation security programs"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── QUARTERLY EARNINGS TABLE ── */}
      <section className="py-20 md:py-28 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              FY2025 Quarterly Performance
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white mb-12">
              Quarterly Earnings
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="border border-white/10 bg-black overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/50 text-[10px] uppercase tracking-[0.15em] font-medium">
                      Quarter
                    </TableHead>
                    <TableHead className="text-white/50 text-[10px] uppercase tracking-[0.15em] font-medium text-right">
                      Revenue
                    </TableHead>
                    <TableHead className="text-white/50 text-[10px] uppercase tracking-[0.15em] font-medium text-right hidden md:table-cell">
                      Gross Profit
                    </TableHead>
                    <TableHead className="text-white/50 text-[10px] uppercase tracking-[0.15em] font-medium text-right">
                      Gross Margin
                    </TableHead>
                    <TableHead className="text-white/50 text-[10px] uppercase tracking-[0.15em] font-medium text-right hidden sm:table-cell">
                      EBITDA
                    </TableHead>
                    <TableHead className="text-white/50 text-[10px] uppercase tracking-[0.15em] font-medium text-right hidden lg:table-cell">
                      EBITDA Margin
                    </TableHead>
                    <TableHead className="text-white/50 text-[10px] uppercase tracking-[0.15em] font-medium text-right">
                      Net Income
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quarterlyEarnings.map((q) => (
                    <TableRow
                      key={q.quarter}
                      className="border-white/5 hover:bg-white/[0.02]"
                    >
                      <TableCell className="text-white font-medium text-sm">
                        {q.quarter}
                      </TableCell>
                      <TableCell className="text-white text-sm text-right">
                        {q.revenue}
                      </TableCell>
                      <TableCell className="text-[#b9b9b9] text-sm text-right hidden md:table-cell">
                        {q.grossProfit}
                      </TableCell>
                      <TableCell className="text-white text-sm text-right font-medium">
                        {q.grossMargin}
                      </TableCell>
                      <TableCell className="text-[#b9b9b9] text-sm text-right hidden sm:table-cell">
                        {q.ebitda}
                      </TableCell>
                      <TableCell className="text-white text-sm text-right hidden lg:table-cell">
                        {q.ebitdaMargin}
                      </TableCell>
                      <TableCell className="text-white text-sm text-right font-medium">
                        {q.netIncome}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Totals row */}
                  <TableRow className="border-t border-white/10 hover:bg-transparent">
                    <TableCell className="text-white font-bold text-sm">
                      FY2025 Total
                    </TableCell>
                    <TableCell className="text-white font-bold text-sm text-right">
                      $1.2B
                    </TableCell>
                    <TableCell className="text-white font-bold text-sm text-right hidden md:table-cell">
                      $1.02B
                    </TableCell>
                    <TableCell className="text-white font-bold text-sm text-right">
                      85.0%
                    </TableCell>
                    <TableCell className="text-white font-bold text-sm text-right hidden sm:table-cell">
                      $420M
                    </TableCell>
                    <TableCell className="text-white font-bold text-sm text-right hidden lg:table-cell">
                      35.0%
                    </TableCell>
                    <TableCell className="text-white font-bold text-sm text-right">
                      $196M
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── REPORTS & FILINGS ── */}
      <section className="py-20 md:py-28 bg-black border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Documents
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white mb-12">
              Reports & Filings
            </h2>
          </ScrollReveal>

          <div className="space-y-0">
            {[
              {
                title: "Annual Report 2025",
                tag: "FY 2025",
                description:
                  "Comprehensive review of fiscal year 2025 performance, including $1.2B revenue, 42% YoY growth, 4 new sovereign customer acquisitions, and the successful deployment of Aegis Core v4.0 across NATO. Audited financial statements, management discussion and analysis, and CEO letter to shareholders.",
              },
              {
                title: "Q4 2025 Earnings Report",
                tag: "Q4 2025",
                description:
                  "Fourth quarter revenue of $325M, representing 42% year-over-year growth. Key highlights include the $220M UK MoD framework agreement, the Aegis Mobile operational debut, and adjusted EBITDA margin of 35.1%. Cash and equivalents of $680M provide substantial runway for continued growth.",
              },
              {
                title: "Q3 2025 Earnings Report",
                tag: "Q3 2025",
                description:
                  "Third quarter revenue of $312M, up 38% year-over-year, driven by the Japanese Ministry of Defense expansion contract and new critical infrastructure programs in the Gulf. Gross margins improved to 84.9%, with annual recurring revenue reaching $780M.",
              },
              {
                title: "Q2 2025 Earnings Report",
                tag: "Q2 2025",
                description:
                  "Second quarter revenue of $295M, up 45% year-over-year, marking the strongest quarterly growth in company history. New customer wins included the Australian Defence Force and the German Bundeswehr C-UAS framework. R&D investment of $92M funded next-generation directed energy integration.",
              },
              {
                title: "Q1 2025 Earnings Report",
                tag: "Q1 2025",
                description:
                  "First quarter revenue of $268M, establishing the growth trajectory for FY2025. Key contract wins included the UAE Armed Forces expansion and the Republic of Korea multi-site deployment. Gross margins reached 85.1%, with software licensing growing to 62% of total revenue.",
              },
              {
                title: "SEC Filings & Regulatory",
                tag: "Regulatory",
                description:
                  "All required filings with the U.S. Securities and Exchange Commission, including Form D and Regulation D supplemental filings. As a privately held company, Aegis files under applicable exemptions and provides voluntary quarterly disclosures to investors.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 60}>
                <div className="border-t border-white/10 py-8 md:py-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12 group">
                  <div className="md:flex-1">
                    <h3 className="text-lg md:text-2xl font-bold tracking-[-0.02em] text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div className="md:flex-1 md:pt-1">
                    <span className="inline-block text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1 mb-3">
                      {item.tag}
                    </span>
                    <p className="text-[#767676] text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-4 text-[10px] uppercase tracking-[0.15em] text-white/50 group-hover:text-white transition-colors">
                      <FileText className="w-3 h-3" />
                      Download PDF
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 md:py-44 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <ScrollReveal>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              Investor Inquiries
            </h2>
            <p className="mt-6 text-[#767676] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              For access to detailed financial data, board presentations, or to
              schedule a meeting with our CFO, contact our investor relations
              team.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-black px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#e0e0e0] transition-all duration-300"
              >
                Contact IR Team
              </Link>
              <Link
                href="/investors"
                className="border border-white/30 text-white px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300"
              >
                Back to Investors
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
