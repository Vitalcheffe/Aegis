"use client";

import { motion } from "framer-motion";
import {
  SectionHero,
  Callout,
  QuoteSection,
  CTASection,
} from "@/components/sections";
import { ScrollReveal as ScrollRevealComponent } from "@/components/sections/scroll-reveal";
import {
  Heart,
  Brain,
  DollarSign,
  GraduationCap,
  Users,
  Lightbulb,
  Clock,
  Home,
  Palmtree,
  MapPin,
  Building2,
} from "lucide-react";
import Link from "next/link";

/* ────────────────────────────────────────────────────────────────
   EMPLOYEE TESTIMONIALS
   ──────────────────────────────────────────────────────────────── */

const testimonials = [
  {
    quote:
      "As a radar engineer, I've worked at three defense primes before Aegis, and the difference is night and day. Here, I ship algorithms to operational systems in weeks, not years. The feedback loop from deployed systems back to our research team means every model I train is tested against real-world threats within a single sprint cycle. That's unheard of in this industry.",
    author: "Dr. Sarah Kim",
    role: "Senior Radar Engineer",
  },
  {
    quote:
      "Deploying to operational sites in the Middle East and Pacific gave me a perspective you simply can't get from a lab. Aegis sent me to three forward operating bases in my first year to install and calibrate systems alongside the operators who use them. That experience shaped every product decision I've made since — because I've seen the stakes with my own eyes.",
    author: "Capt. Mike Rodriguez (Ret.)",
    role: "Field Service Lead",
  },
  {
    quote:
      "The pace of innovation at Aegis is genuinely exhilarating. I published two papers on transformer-based drone classification that went from research to deployed capability in under six months. The company invests heavily in R&D and gives researchers the autonomy to pursue high-impact problems without bureaucratic overhead. It's the best environment I've encountered for applied AI work.",
    author: "Jessica Wang",
    role: "AI/ML Researcher",
  },
  {
    quote:
      "Building tech that matters is what drew me to Aegis, and the culture is what keeps me here. The engineering team operates with a level of rigor and mission focus that I've never experienced at a conventional tech company. Every line of code I write has a direct line to someone's safety — and that creates a kind of shared purpose that makes the hard days worth it.",
    author: "David Okafor",
    role: "Software Engineer",
  },
];

function EmployeeTestimonials() {
  return (
    <section className="py-28 md:py-44 bg-black">
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
        <ScrollRevealComponent>
          <div className="mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Voices
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              What Our Team Says
            </h2>
          </div>
        </ScrollRevealComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <ScrollRevealComponent key={t.author} delay={i * 80}>
              <div className="border border-white/10 p-8 md:p-10 bg-[#0a0a0a] hover:border-white/20 transition-colors">
                <div className="text-white/10 text-5xl leading-none font-serif select-none mb-2">
                  &ldquo;
                </div>
                <blockquote className="text-[#b9b9b9] text-base leading-relaxed mb-6">
                  {t.quote}
                </blockquote>
                <div className="h-px w-10 bg-white/10 mb-4" />
                <div className="text-white text-sm font-medium">
                  {t.author}
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-1">
                  {t.role}
                </div>
              </div>
            </ScrollRevealComponent>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   BENEFITS & PERKS — 3x3 grid
   ──────────────────────────────────────────────────────────────── */

const benefits = [
  {
    icon: Heart,
    title: "Medical, Dental & Vision",
    description:
      "Comprehensive coverage for you and your family with top-tier providers. Zero-deductible medical plan available.",
    category: "Health",
  },
  {
    icon: Brain,
    title: "Mental Health Support",
    description:
      "Unlimited therapy sessions, executive coaching, and a dedicated wellness program. Because mission-first requires you-first.",
    category: "Health",
  },
  {
    icon: DollarSign,
    title: "401(k) Match 6%",
    description:
      "We match up to 6% of your salary with immediate vesting. Plan for the future while building technology that protects it.",
    category: "Health",
  },
  {
    icon: GraduationCap,
    title: "Education Reimbursement",
    description:
      "Up to $15,000 annually for graduate programs, certifications, and professional development courses at accredited institutions.",
    category: "Growth",
  },
  {
    icon: Users,
    title: "Conference Budget",
    description:
      "Annual $5,000 budget for attending industry conferences, workshops, and technical summits. Present your work on the global stage.",
    category: "Growth",
  },
  {
    icon: Lightbulb,
    title: "Patent Bonuses",
    description:
      "$10,000 bonus for each filed patent. We celebrate innovation and ensure you're rewarded for intellectual property contributions.",
    category: "Growth",
  },
  {
    icon: Clock,
    title: "Flexible PTO",
    description:
      "No accrual caps, no guilt trips. Take the time you need to recharge. We trust you to manage your schedule responsibly.",
    category: "Balance",
  },
  {
    icon: Home,
    title: "Remote-Friendly",
    description:
      "Hybrid and full-remote options available for most roles. State-of-the-art home office setup provided including hardware and furniture.",
    category: "Balance",
  },
  {
    icon: Palmtree,
    title: "Sabbatical Program",
    description:
      "4-week paid sabbatical after every 4 years of service. Pursue personal projects, travel, or simply decompress — we've got you covered.",
    category: "Balance",
  },
];

function BenefitsSection() {
  const categories = ["Health", "Growth", "Balance"];

  return (
    <section className="py-28 md:py-44 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
        <ScrollRevealComponent>
          <div className="mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Benefits & Perks
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              Invested in You
            </h2>
          </div>
        </ScrollRevealComponent>

        {categories.map((category) => (
          <div key={category} className="mb-12 last:mb-0">
            <ScrollRevealComponent>
              <div className="border-b border-[#333] bg-[#0a0a0a] pb-3 mb-6">
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium">
                  {category}
                </span>
              </div>
            </ScrollRevealComponent>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits
                .filter((b) => b.category === category)
                .map((benefit, i) => (
                  <ScrollRevealComponent
                    key={benefit.title}
                    delay={i * 60}
                  >
                    <div className="border border-white/10 p-6 md:p-8 hover:border-white/20 transition-colors bg-black">
                      <benefit.icon
                        className="text-white/30 mb-4"
                        size={24}
                        strokeWidth={1.5}
                      />
                      <h3 className="text-lg font-bold text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-[#767676] text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </ScrollRevealComponent>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   DEI SECTION
   ──────────────────────────────────────────────────────────────── */

function DEISection() {
  return (
    <section className="py-28 md:py-44 bg-black border-t border-white/10">
      <div className="max-w-[56rem] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <ScrollRevealComponent>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
            Diversity, Equity & Inclusion
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white mb-8">
            Different Perspectives, Shared Mission
          </h2>
          <p className="text-[#b9b9b9] text-lg md:text-xl leading-relaxed mb-6">
            At Aegis, diversity is not a metric — it is a strategic advantage.
            The threats we counter are global, and the solutions we build must
            reflect the breadth of human experience and perspective. We actively
            recruit from communities historically underrepresented in defense
            technology, maintain partnerships with organizations including the
            National Society of Black Engineers, Society of Women Engineers, and
            Out in Tech, and have established blind resume screening for all
            engineering roles.
          </p>
          <p className="text-[#b9b9b9] text-lg md:text-xl leading-relaxed">
            Our Employee Resource Groups — Aegis Women in Defense, Veterans
            Alliance, Black Excellence in Engineering, and Pride in Security —
            provide community, mentorship, and direct input into company policy.
            Every quarter, ERG leaders present to the executive team on
            initiatives that shape hiring, retention, and culture. At Aegis,
            inclusion is not aspirational. It is operational.
          </p>
        </ScrollRevealComponent>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   OFFICE LIFE
   ──────────────────────────────────────────────────────────────── */

const offices = [
  {
    city: "Arlington",
    region: "Virginia, USA",
    description:
      "Global headquarters in the heart of the U.S. defense corridor. Walking distance from the Pentagon and Capitol Hill, our 85,000 sq ft campus houses executive leadership, core engineering, and the Aegis Operations Center — a 24/7 live threat monitoring facility.",
    icon: Building2,
  },
  {
    city: "London",
    region: "United Kingdom",
    description:
      "European headquarters in Westminster, steps from the UK Ministry of Defence. The London office leads NATO interoperability programs, European procurement, and maintains a dedicated training facility with live simulation capabilities for allied defense forces.",
    icon: Building2,
  },
  {
    city: "Tel Aviv",
    region: "Israel",
    description:
      "R&D center in the global epicenter of counter-UAS innovation. The Tel Aviv team leads AI/ML research, sensor fusion development, and maintains close collaboration with the Israeli defense technology ecosystem. Home to our Advanced Threat Simulation Lab.",
    icon: Building2,
  },
  {
    city: "Singapore",
    region: "Asia-Pacific",
    description:
      "Indo-Pacific regional headquarters in the One North district. The Singapore office manages procurement and deployment across ASEAN nations, South Korea, Japan, and Australia — the fastest-growing C-UAS market outside of NATO.",
    icon: Building2,
  },
];

function OfficeLife() {
  return (
    <section className="py-28 md:py-44 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
        <ScrollRevealComponent>
          <div className="mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Global Offices
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              Where We Work
            </h2>
          </div>
        </ScrollRevealComponent>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offices.map((office, i) => (
            <ScrollRevealComponent key={office.city} delay={i * 80}>
              <div className="border border-white/10 p-8 md:p-10 hover:border-white/20 transition-colors bg-black">
                <div className="flex items-start gap-4 mb-4">
                  <MapPin
                    className="text-white/30 flex-shrink-0 mt-1"
                    size={20}
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-[-0.01em]">
                      {office.city}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                      {office.region}
                    </span>
                  </div>
                </div>
                <p className="text-[#b9b9b9] text-sm md:text-base leading-relaxed">
                  {office.description}
                </p>
              </div>
            </ScrollRevealComponent>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════ */

export default function CareersCulturePage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/careers-culture.jpg"
        label="Careers"
        title="Culture"
        subtitle="Mission-Driven. People-First."
        gradient="from-black via-black/80 to-black/50"
        align="center"
      />

      {/* ── CALLOUT ── */}
      <Callout>
        At Aegis, culture isn't a poster on the wall — it's the operating
        system behind every decision we make. We hire people who believe
        that defending the world from emerging aerial threats is the most
        important work they can do, and then we give them the trust,
        resources, and community to do it exceptionally well.
      </Callout>

      {/* ── EMPLOYEE TESTIMONIALS ── */}
      <EmployeeTestimonials />

      {/* ── BENEFITS & PERKS ── */}
      <BenefitsSection />

      {/* ── DEI SECTION ── */}
      <DEISection />

      {/* ── OFFICE LIFE ── */}
      <OfficeLife />

      {/* ── CTA ── */}
      <CTASection
        title="Join the Mission"
        subtitle="Whether you're a veteran transitioning to the private sector or a technologist looking for work that matters, Aegis has a place for you."
        primaryCta="View Open Positions"
        primaryHref="/careers/openings"
        secondaryCta="Back to Careers"
        secondaryHref="/careers"
      />
    </>
  );
}
