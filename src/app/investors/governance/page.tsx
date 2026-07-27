"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, animate as fmAnimate } from "framer-motion";
import { ScrollReveal } from "@/components/sections/scroll-reveal";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Shield,
  Scale,
  Award,
  FileCheck,
  Lock,
  ChevronRight,
} from "lucide-react";

/* ──────────────────────────────────────────────
   ANIMATED COUNTER
   ────────────────────────────────────────────── */

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
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
      setDisplay(Math.floor(v));
    });
    return unsubscribe;
  }, [motionVal]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const boardMembers = [
  {
    name: "Dr. Elena Vasquez",
    role: "Chief Executive Officer",
    bio: "Founder and CEO of Aegis Defense Systems. Previously VP of Advanced Programs at Raytheon Intelligence & Space, where she led the development of next-generation ISR systems. PhD in Electrical Engineering from MIT. Serves on the Defense Science Board and the National Security Technology Advisory Council. 22 years of defense technology leadership.",
  },
  {
    name: "General (Ret.) David Morrison",
    role: "Chairman of the Board",
    bio: "Former Commander, U.S. Army Cyber Command and Second Army. 34 years of military service culminating in responsibility for all Army cyber operations and network defense. Currently serves on the boards of two NYSE-listed defense companies. Chaired the Pentagon's AI Ethics Advisory Committee. TS/SCI cleared.",
  },
  {
    name: "Catherine Smith",
    role: "Audit Committee Chair",
    bio: "Former CFO of Raytheon Intelligence & Space and senior finance executive at United Technologies. 28 years in defense industry financial leadership, including oversight of $8B P&L and 15 M&A transactions. CPA and CFA charterholder. Serves on the audit committees of three public company boards.",
  },
  {
    name: "Dr. James Chen",
    role: "Independent Director",
    bio: "Founding partner of Horizon Defense Ventures, the leading venture firm focused on defense and national security technology. Previously co-founder of Palantir Technologies, where he led the deployment of Gotham to 18 intelligence agencies. PhD in Computer Science from Stanford. Board observer at Anduril and Shield AI.",
  },
  {
    name: "Sarah Al-Rashid",
    role: "Independent Director",
    bio: "Former Under Secretary of Defense for Acquisition and Sustainment, overseeing $400B annual procurement budget. Currently Senior Fellow at the Center for Strategic and International Studies and advisor to three sovereign wealth funds on defense technology investments. JD from Yale Law School.",
  },
  {
    name: "Marcus Webb",
    role: "Security Committee Chair",
    bio: "Former Deputy Director of the National Security Agency (NSA) and Commander of U.S. Cyber Command's Joint Task Force. 30 years of intelligence community service with deep expertise in signals intelligence, cyber operations, and classified program protection. Currently principal at a strategic advisory firm serving defense technology companies.",
  },
];

const committees = [
  {
    name: "Audit Committee",
    chair: "Catherine Smith",
    members: ["Dr. James Chen", "Sarah Al-Rashid"],
    icon: FileCheck,
    description:
      "Oversees financial reporting integrity, internal controls, risk management, and independent auditor engagement. Reviews quarterly and annual financial statements before Board approval. Manages the external auditor relationship and approves all non-audit services. Meets quarterly with additional sessions as needed.",
    responsibilities: [
      "Review and approve quarterly and annual financial statements",
      "Oversee internal audit function and enterprise risk management",
      "Manage independent auditor selection, retention, and compensation",
      "Review whistleblower reports and compliance investigations",
      "Monitor cybersecurity risk posture and incident response readiness",
    ],
  },
  {
    name: "Compensation Committee",
    chair: "Dr. James Chen",
    members: ["Catherine Smith", "General (Ret.) David Morrison"],
    icon: Award,
    description:
      "Ensures executive compensation aligns with long-term shareholder value, mission performance, and talent retention. Conducts annual benchmarking against comparable defense technology companies and approves all equity grants. Reviews CEO performance and sets compensation annually.",
    responsibilities: [
      "Set executive compensation philosophy and structure",
      "Benchmark total compensation against defense technology peers",
      "Approve all equity grants and incentive plan design",
      "Review CEO performance and determine annual compensation",
      "Oversee employee benefit and retirement plan governance",
    ],
  },
  {
    name: "Nominating & Governance Committee",
    chair: "Sarah Al-Rashid",
    members: ["General (Ret.) David Morrison", "Dr. James Chen"],
    icon: Users,
    description:
      "Manages Board composition, independence standards, director nomination, and succession planning. Conducts annual Board self-evaluation and oversees corporate governance policies including the Code of Ethics, conflict-of-interest procedures, and shareholder communication protocols.",
    responsibilities: [
      "Identify and evaluate potential Board candidates",
      "Assess director independence and conflicts of interest annually",
      "Conduct Board self-evaluation and skill gap analysis",
      "Manage CEO succession planning process",
      "Review and update corporate governance policies annually",
    ],
  },
  {
    name: "Security Committee",
    chair: "Marcus Webb",
    members: ["General (Ret.) David Morrison", "Dr. Elena Vasquez"],
    icon: Shield,
    description:
      "Unique to Aegis, the Security Committee oversees classified program protection, insider threat mitigation, and compliance with national security agreements. Chaired by the former Deputy Director of the NSA, this committee ensures Aegis meets the stringent security requirements demanded by our defense and intelligence customers.",
    responsibilities: [
      "Oversee classified program protection and FOCI mitigation",
      "Review insider threat program effectiveness quarterly",
      "Monitor compliance with National Industrial Security Program (NISP)",
      "Approve security clearance sponsorship and foreign national access",
      "Review cybersecurity incident reports and remediation plans",
    ],
  },
];

const governancePrinciples = [
  {
    title: "Board Independence",
    description:
      "A majority of our Board members are independent directors with no material relationship with the company. Independent directors chair all standing committees except Security, ensuring objective oversight of financial reporting, executive compensation, and governance matters.",
    icon: Scale,
  },
  {
    title: "Ethical Conduct",
    description:
      "The Aegis Code of Ethics establishes non-negotiable standards for every employee, contractor, and board member. Rooted in the principle that our work directly impacts national security, the code mandates zero tolerance for corruption, truth in all representations, and mandatory reporting of ethical violations through anonymous channels.",
    icon: FileCheck,
  },
  {
    title: "Shareholder Transparency",
    description:
      "We maintain a comprehensive shareholders' agreement providing quarterly financial statements, annual budgets, and board materials to all qualified investors. Annual valuation by an independent third-party firm ensures fair and transparent pricing. All shareholder communications are distributed through our secure investor portal.",
    icon: Users,
  },
  {
    title: "Risk Oversight",
    description:
      "Enterprise risk management spans six domains: operational, cybersecurity, regulatory, market, financial, and reputational risk. The Chief Risk Officer reports directly to the Audit Committee with quarterly assessments. Key risk indicators are monitored in real-time through our internal governance dashboard.",
    icon: Shield,
  },
  {
    title: "Executive Accountability",
    description:
      "Executive compensation is designed to align leadership incentives with long-term company performance and mission outcomes. Four-year equity vesting with one-year cliff ensures retention through critical growth phases. Mission performance modifiers adjust compensation based on operational outcomes including system availability and deployment success.",
    icon: Award,
  },
  {
    title: "National Security Commitment",
    description:
      "As a company entrusted with classified programs and critical defense contracts, Aegis maintains the highest standards of national security compliance. Our Security Committee oversees FOCI mitigation, insider threat programs, and compliance with the National Industrial Security Program. All employees with access to classified information undergo continuous evaluation.",
    icon: Lock,
  },
];

/* ──────────────────────────────────────────────
   BOARD MEMBER CARD
   ────────────────────────────────────────────── */

function BoardMemberCard({
  member,
  index,
}: {
  member: (typeof boardMembers)[0];
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 80}>
      <div className="border border-white/10 bg-[#0a0a0a] p-6 md:p-8 h-full flex flex-col group hover:border-white/20 transition-colors duration-300">
        {/* Name and role */}
        <h3 className="text-xl font-bold text-white leading-tight">
          {member.name}
        </h3>
        <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 mt-2 mb-4">
          {member.role}
        </div>
        <Separator className="bg-white/5 mb-4" />
        <p className="text-[#767676] text-sm leading-relaxed flex-1">
          {member.bio}
        </p>
      </div>
    </ScrollReveal>
  );
}

/* ──────────────────────────────────────────────
   COMMITTEE CARD
   ────────────────────────────────────────────── */

function CommitteeCard({
  committee,
  index,
}: {
  committee: (typeof committees)[0];
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 100}>
      <div className="border border-white/10 bg-[#0a0a0a] p-6 md:p-8 h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0 bg-black">
            <committee.icon className="w-5 h-5 text-white/30" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{committee.name}</h3>
            <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mt-1">
              Chair: {committee.chair}
            </div>
          </div>
        </div>

        <p className="text-[#767676] text-sm leading-relaxed mb-4">
          {committee.description}
        </p>

        <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-3">
          Members
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {committee.members.map((m) => (
            <span
              key={m}
              className="text-[10px] uppercase tracking-[0.1em] text-white/50 border border-white/10 px-3 py-1"
            >
              {m}
            </span>
          ))}
        </div>

        <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-3">
          Key Responsibilities
        </div>
        <ul className="space-y-2">
          {committee.responsibilities.map((r, i) => (
            <li
              key={i}
              className="text-[#767676] text-sm leading-relaxed flex items-start gap-2"
            >
              <span className="text-white/20 mt-1 shrink-0">—</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}

/* ──────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────── */

export default function InvestorsGovernancePage() {
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
            Governance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 text-[#b9b9b9] text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl"
          >
            Committed to the highest standards of accountability, transparency,
            and ethical conduct.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-4"
          >
            <div>
              <div className="text-3xl font-bold text-white">
                <AnimatedCounter value={6} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-1">
                Board Members
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                <AnimatedCounter value={4} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-1">
                Standing Committees
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                <AnimatedCounter value={3} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-1">
                Independent Directors
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CALLOUT ── */}
      <section className="py-20 md:py-28 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-[56rem] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <ScrollReveal>
            <p className="text-[clamp(1.25rem,3vw,2.5rem)] font-bold tracking-[-0.03em] leading-[1.2] text-white">
              Corporate governance at Aegis is not a compliance exercise — it is
              a strategic imperative. The trust placed in us by defense
              ministries, intelligence agencies, and investors demands the
              highest standards of accountability, transparency, and ethical
              conduct at every level of the organization.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── BOARD OF DIRECTORS ── */}
      <section className="py-20 md:py-28 bg-black border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Leadership
            </span>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white mb-4">
              Board of Directors
            </h2>
            <p className="text-[#767676] text-lg max-w-3xl leading-relaxed mb-12">
              Aegis is governed by a six-member Board of Directors combining
              deep defense sector expertise, technology leadership, and financial
              acumen. The Board includes three independent directors, two retired
              general officers, and our CEO.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {boardMembers.map((member, i) => (
              <BoardMemberCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMITTEES ── */}
      <section className="py-20 md:py-28 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Oversight Structure
            </span>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white mb-4">
              Board Committees
            </h2>
            <p className="text-[#767676] text-lg max-w-3xl leading-relaxed mb-12">
              Four standing committees ensure rigorous oversight across financial
              reporting, executive compensation, board composition, and — unique
              to Aegis — national security compliance. Each committee operates
              under a written charter reviewed annually.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {committees.map((committee, i) => (
              <CommitteeCard
                key={committee.name}
                committee={committee}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── GOVERNANCE PRINCIPLES ── */}
      <section className="py-20 md:py-28 bg-black border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Foundation
            </span>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white mb-4">
              Corporate Governance Principles
            </h2>
            <p className="text-[#767676] text-lg max-w-3xl leading-relaxed mb-12">
              These principles define how Aegis is governed — not as a
              compliance checkbox, but as a strategic commitment to the
              organizations and nations that depend on our technology.
            </p>
          </ScrollReveal>

          <div className="space-y-0">
            {governancePrinciples.map((principle, i) => (
              <ScrollReveal key={principle.title} delay={i * 60}>
                <div className="border-t border-white/10 py-10 md:py-14 flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12 group">
                  <div className="md:w-1/3 flex items-start gap-4">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0 bg-[#0a0a0a]">
                      <principle.icon className="w-5 h-5 text-white/30" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-[-0.02em] text-white leading-tight">
                      {principle.title}
                    </h3>
                  </div>
                  <div className="md:flex-1 md:pt-3">
                    <p className="text-[#b9b9b9] text-sm md:text-base leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* ── ADDITIONAL GOVERNANCE TOPICS ── */}
      <section className="py-20 md:py-28 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Additional Resources
            </span>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white mb-12">
              Governance Documents
            </h2>
          </ScrollReveal>

          <div className="space-y-0">
            {[
              {
                title: "Code of Ethics & Business Conduct",
                description:
                  "Non-negotiable standards for every employee, contractor, and board member. Mandates zero tolerance for corruption, truth in all representations, and mandatory reporting of ethical violations through anonymous channels. Reviewed and reaffirmed by every employee annually.",
              },
              {
                title: "Shareholder Rights Agreement",
                description:
                  "Comprehensive agreement protecting investor rights while preserving operational agility. Includes pro-rata participation rights, quarterly information rights, drag-along and tag-along provisions, protective provisions for material decisions, and annual independent valuation.",
              },
              {
                title: "Executive Compensation Policy",
                description:
                  "Compensation structure comprising base salary at 50th percentile, annual cash bonus tied to revenue growth and customer satisfaction, four-year equity vesting with one-year cliff, and mission performance modifiers. Total CEO compensation for FY2025: $5.8M, with 70% in equity.",
              },
              {
                title: "Enterprise Risk Management Framework",
                description:
                  "Structured approach across six risk domains: operational, cybersecurity, regulatory, market, financial, and reputational. Real-time governance dashboard with key risk indicators and escalation protocols. Annual stress testing simulates extreme scenarios.",
              },
              {
                title: "Insider Trading & Blackout Policy",
                description:
                  "Strict insider trading prohibitions aligned with SEC Rule 10b5-1. Quarterly blackout periods preceding earnings announcements. Pre-clearance required for all trades by officers, directors, and designated insiders. Mandatory holding periods for equity awards.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 60}>
                <div className="border-t border-white/10 py-8 md:py-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12 group">
                  <div className="md:flex-1">
                    <h3 className="text-lg md:text-xl font-bold tracking-[-0.02em] text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div className="md:flex-1 md:pt-1">
                    <p className="text-[#767676] text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-4 text-[10px] uppercase tracking-[0.15em] text-white/50 group-hover:text-white transition-colors cursor-pointer">
                      Request Document
                      <ChevronRight className="w-3 h-3" />
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
      <section className="py-28 md:py-44 bg-black border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <ScrollReveal>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              Request Governance Documents
            </h2>
            <p className="mt-6 text-[#767676] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Access detailed board charters, committee reports, and compliance
              certifications through our secure investor portal.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-black px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#e0e0e0] transition-all duration-300"
              >
                Access Investor Portal
              </Link>
              <Link
                href="/investors/financial-reports"
                className="border border-white/30 text-white px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300"
              >
                Financial Reports
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
