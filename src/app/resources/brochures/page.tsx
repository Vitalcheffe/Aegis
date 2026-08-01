"use client";

import {
  SectionHero,
  CTASection,
  TextSection,
} from "@/components/sections";

/* ─── Brochure data ─── */
interface Brochure {
  title: string;
  pages: number;
  description: string;
}

const brochures: Brochure[] = [
  {
    title: "Aegis Product Portfolio Overview",
    pages: 24,
    description:
      "Complete product line overview with specifications. Covers all eight Aegis platforms — Core, Tactical, Mobile, Shield, SkyWatch, Command, Sentinel, and Integrator — with key performance metrics, deployment scenarios, and ordering information. Includes a comparison matrix and recommended configurations for each operational environment.",
  },
  {
    title: "Aegis Core Data Sheet",
    pages: 8,
    description:
      "Detailed Aegis Core specifications and capabilities. Covers detection range, track capacity, AI inference performance, graduated response framework, network interfaces, environmental qualifications, and power requirements. Includes engagement timeline diagrams and a competitive comparison across 14 key metrics.",
  },
  {
    title: "Airport Protection Solution Brief",
    pages: 12,
    description:
      "End-to-end airport C-UAS solution. Covers the Aegis Sentinel and Core configuration optimized for airport environments, ATC integration procedures, FAA and EASA regulatory compliance, graduated response protocols that neutralize threats without grounding aircraft, and 24-month operational data from three international airports showing 100% detection rate with zero unnecessary disruptions.",
  },
  {
    title: "Military Counter-UAS Capabilities",
    pages: 16,
    description:
      "Defense-focused capability overview. Covers all Aegis military deployment configurations — forward operating bases, convoy protection, naval vessel defense, and special operations. Includes STANAG interoperability details, rules of engagement management, and operational references from 14 countries. Designed for military procurement officers and defense planners.",
  },
  {
    title: "Partner Integration Guide",
    pages: 20,
    description:
      "Technical integration overview for partners. Covers the Aegis API ecosystem, SDK capabilities, STANAG interface specifications, sensor adapter framework, and the Aegis Integrator middleware platform. Includes architecture diagrams, sample integration workflows, and the partner certification process. Essential reading for technology partners and customer engineering teams.",
  },
  {
    title: "Corporate Overview 2026",
    pages: 32,
    description:
      "Company overview, financials, and roadmap. Covers Aegis Defense Systems history, leadership team, global operations, financial performance, research and development investments, compliance certifications, and the 2026–2028 product and technology roadmap. Includes customer references, deployment statistics, and a summary of strategic partnerships across the defense industry.",
  },
];

/* ─── Brochure Card Component ─── */
function BrochureCard({ brochure, index }: { brochure: Brochure; index: number }) {
  return (
    <div className="border border-white/10 bg-[#0a0a0a] p-6 flex flex-col h-full hover:border-white/20 transition-colors">
      {/* Number + page count */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-mono">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1">
          {brochure.pages} Pages · PDF
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 leading-snug">
        {brochure.title}
      </h3>

      {/* Description */}
      <p className="text-[#b9b9b9] text-sm leading-relaxed flex-1 mb-5">
        {brochure.description}
      </p>

      {/* CTA */}
      <a
        href="/request-demo"
        className="inline-block text-[11px] uppercase tracking-[0.15em] text-white border border-white/30 px-5 py-2.5 hover:bg-white hover:text-black transition-all duration-300 text-center"
      >
        Request Download
      </a>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════ */

export default function BrochuresPage() {
  return (
    <>
      <SectionHero
        image="/images/resources/datasheets.jpg"
        label="Resources"
        title="Download Brochures"
        subtitle="Company and product overviews designed for executive review and stakeholder distribution — available as downloadable PDF documents."
        cta="Request Full Package"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="Printed & Digital Materials">
        <p>
          Aegis brochures provide concise, visually rich overviews of our counter-UAS portfolio for executive review, stakeholder distribution, and procurement committee presentations. Each brochure distills the essential capability, performance, and deployment information into a format designed for decision-makers who need to understand what Aegis can do without wading through technical datasheets.
        </p>
        <p>
          All brochures are available in PDF format and can be customized with your organization&apos;s branding for internal distribution through our partner program. Brochures are updated quarterly to reflect the latest product specifications, deployment references, and compliance certifications.
        </p>
      </TextSection>

      {/* ── Brochure Grid ── */}
      <section className="py-20 md:py-32 bg-black border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Downloads
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              Available Brochures
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brochures.map((brochure, i) => (
              <BrochureCard key={brochure.title} brochure={brochure} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Need Custom Materials?"
        subtitle="Our marketing team can produce custom-branded brochures, solution briefs, and presentation materials for your organization's internal review and approval processes."
        primaryCta="Request Custom Package"
        primaryHref="/request-demo"
        secondaryCta="Contact Sales"
        secondaryHref="/contact"
      />
    </>
  );
}
