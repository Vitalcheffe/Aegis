"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Cpu,
  Shield,
  FlaskConical,
  ArrowRight,
  Check,
  Globe,
  Lock,
  Radio,
  Layers,
  Zap,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ════════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  },
};

function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════════ */
const partnerTiers = [
  {
    title: "Technology Partner",
    icon: Cpu,
    description:
      "Companies that integrate their sensors, effectors, or C2 systems with Aegis Command.",
    benefits: ["API Access", "SDK", "Co-Marketing", "Joint Integration Support"],
    tag: "INTEGRATE",
  },
  {
    title: "Solution Partner",
    icon: Shield,
    description:
      "Defense contractors and systems integrators who deploy Aegis as part of broader defense programs.",
    benefits: ["Training Certification", "Priority Support", "Pipeline Sharing", "Proposal Support"],
    tag: "DEPLOY",
  },
  {
    title: "Research Partner",
    icon: FlaskConical,
    description:
      "Universities and research institutions advancing counter-UAS science.",
    benefits: ["Research Data Sharing", "Joint Publications", "Test Facility Access", "Funding Opportunities"],
    tag: "DISCOVER",
  },
];

const currentPartners = {
  "Technology Partners": [
    { name: "Thales", description: "Multi-spectrum sensor systems" },
    { name: "BAE Systems", description: "Electronic warfare platforms" },
    { name: "L3Harris", description: "Tactical communications" },
    { name: "Rheinmetall", description: "Kinetic effectors & C-UAS" },
  ],
  "Solution Partners": [
    { name: "Lockheed Martin", description: "Integrated defense systems" },
    { name: "Northrop Grumman", description: "C4ISR & missile defense" },
    { name: "Raytheon", description: "Air & missile defense" },
    { name: "General Dynamics", description: "Combat systems & C2" },
  ],
  "Research Partners": [
    { name: "MIT Lincoln Laboratory", description: "Advanced radar & signal processing" },
    { name: "DARPA", description: "Next-gen counter-UAS R&D" },
    { name: "NATO STO", description: "Allied interoperability standards" },
    { name: "Fraunhofer Institute", description: "Sensor fusion & AI research" },
  ],
};

const integrationBenefits = [
  {
    icon: Layers,
    title: "Open API Architecture",
    description: "RESTful and gRPC APIs with full OpenAPI documentation for seamless third-party integration.",
  },
  {
    icon: Shield,
    title: "STANAG 4671 Compliance",
    description: "Full compliance with NATO STANAG 4671 — the standard for UAS interoperability across allied forces.",
  },
  {
    icon: Globe,
    title: "JADC2 Interoperability",
    description: "Native integration with the Joint All-Domain Command and Control architecture for multi-domain operations.",
  },
  {
    icon: Radio,
    title: "Multi-Vendor Sensor Fusion",
    description: "Fuse data from any vendor's sensors into a single coherent operating picture in real time.",
  },
  {
    icon: Lock,
    title: "NATO Classified Network Ready",
    description: "Certified for operation on NATO classified networks up to COSMIC TOP SECRET level.",
  },
  {
    icon: Zap,
    title: "Real-Time Data Sharing",
    description: "Sub-second threat data distribution across partner systems with configurable data policies.",
  },
];

/* ════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function PartnersPage() {
  return (
    <div className="bg-black text-white font-[var(--font-inter)]">
      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span
              variants={staggerItem}
              className="inline-block text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#767676] mb-8 border border-[#222222] px-4 py-1.5"
            >
              Certified Partner Program
            </motion.span>
            <motion.h1
              variants={staggerItem}
              className="text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white max-w-5xl mx-auto"
            >
              Partner Ecosystem
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="mt-8 text-[#b9b9b9] text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto"
            >
              Building the world&apos;s most comprehensive counter-UAS partner
              network. Because no single technology can defend the skies alone.
            </motion.p>
            <motion.div
              variants={staggerItem}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="inline-block bg-white text-black px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#e0e0e0] transition-all duration-300"
              >
                Become a Partner
              </Link>
              <Link
                href="/integrations"
                className="inline-block border border-[#222222] text-white px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:border-white/40 hover:bg-white/[0.04] transition-all duration-300"
              >
                View Integrations
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#767676] text-[10px] uppercase tracking-[0.3em] animate-bounce"
        >
          Scroll ↓
        </motion.div>
      </section>

      {/* ── SECTION 2: CALLOUT ── */}
      <section className="py-28 md:py-44 bg-black border-t border-[#222222]">
        <div className="max-w-[72rem] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <SectionReveal>
            <motion.p
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-[clamp(1.5rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[1.15] text-white"
            >
              No single company can defend the world&apos;s airspace alone. The
              counter-UAS challenge demands an ecosystem — a network of
              partners who bring complementary capabilities, shared intelligence,
              and unified commitment to keeping the skies safe.
            </motion.p>
          </SectionReveal>
        </div>
      </section>

      {/* ── SECTION 3: PARTNER TIERS ── */}
      <section className="py-28 md:py-44 bg-black border-t border-[#222222]">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <SectionReveal>
            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#767676] block mb-4">
                Partner Tiers
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white max-w-3xl">
                Three Paths to Partnership
              </h2>
              <p className="mt-6 text-[#767676] text-lg max-w-2xl">
                Every partner brings unique strengths. Our tiered program ensures
                the right level of access, support, and collaboration for your
                organization.
              </p>
            </motion.div>
          </SectionReveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-0"
          >
            {partnerTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.title}
                  variants={staggerItem}
                  className="border border-[#222222] p-8 md:p-10 group hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 border border-[#222222] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#767676]" />
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.15em] text-[#767676] border border-[#222222] px-3 py-1">
                      {tier.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em] mb-4">
                    {tier.title}
                  </h3>
                  <p className="text-[#b9b9b9] text-base leading-relaxed mb-8">
                    {tier.description}
                  </p>
                  <div className="border-t border-[#222222] pt-8">
                    <span className="text-[9px] uppercase tracking-[0.15em] text-[#767676] block mb-4">
                      Benefits
                    </span>
                    <ul className="space-y-3">
                      {tier.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-3 text-sm text-white">
                          <Check className="w-4 h-4 text-[#767676] flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: CURRENT PARTNERS GRID ── */}
      <section className="py-28 md:py-44 bg-[#0a0a0a] border-t border-[#222222]">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <SectionReveal>
            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#767676] block mb-4">
                Current Partners
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
                Trusted by the Best
              </h2>
            </motion.div>
          </SectionReveal>

          <div className="mt-16 md:mt-24 space-y-16 md:space-y-24">
            {Object.entries(currentPartners).map(([category, partners], catIdx) => (
              <SectionReveal key={category}>
                <motion.div
                  variants={fadeUp}
                  custom={0}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#767676]">
                      {category}
                    </span>
                    <div className="flex-1 h-px bg-[#222222]" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
                    {partners.map((partner, pIdx) => (
                      <motion.div
                        key={partner.name}
                        variants={fadeUp}
                        custom={pIdx * 0.08}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        className="border border-[#222222] p-6 md:p-8 group hover:bg-white/[0.02] transition-colors duration-300"
                      >
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                          {partner.name}
                        </h4>
                        <p className="text-[#767676] text-sm leading-relaxed">
                          {partner.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: INTEGRATION BENEFITS ── */}
      <section className="py-28 md:py-44 bg-black border-t border-[#222222]">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <SectionReveal>
            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#767676] block mb-4">
                Integration Architecture
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white max-w-3xl">
                Built for Interoperability
              </h2>
              <p className="mt-6 text-[#767676] text-lg max-w-2xl">
                Aegis Command is engineered from the ground up for seamless
                integration with partner systems, allied networks, and existing
                defense infrastructure.
              </p>
            </motion.div>
          </SectionReveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
          >
            {integrationBenefits.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className="border border-[#222222] p-8 md:p-10 group hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <div className="w-10 h-10 border border-[#222222] flex items-center justify-center mb-6">
                    <Icon className="w-4 h-4 text-[#767676]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#767676] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 6: CTA ── */}
      <section className="py-28 md:py-44 bg-black border-t border-[#222222]">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.span
              variants={staggerItem}
              className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#767676] mb-8 border border-[#222222] px-4 py-1.5"
            >
              Get Started
            </motion.span>
            <motion.h2
              variants={staggerItem}
              className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white"
            >
              Become a Partner
            </motion.h2>
            <motion.p
              variants={staggerItem}
              className="mt-6 text-[#767676] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Whether you build sensors, integrate defense systems, or push the
              boundaries of counter-UAS research — there&apos;s a place for you
              in the Aegis ecosystem.
            </motion.p>
            <motion.div
              variants={staggerItem}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#e0e0e0] transition-all duration-300"
              >
                Contact Partnership Team
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/technology"
                className="inline-block border border-[#222222] text-white px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:border-white/40 hover:bg-white/[0.04] transition-all duration-300"
              >
                Explore Our Technology
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
