"use client";

import {
  SectionHero,
  Callout,
  SplitSection,
  QuoteSection,
  CTASection,
} from "@/components/sections";

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

      {/* ── VALUES SPLIT ── */}
      <SplitSection
        image="/images/pages/careers-team.jpg"
        label="Our Values"
        title="Principles That Guide Us"
        description="Our values are not aspirational — they are operational. Mission First means every product decision, engineering trade-off, and customer interaction is measured against one standard: does it make our operators safer and more effective? Radical Transparency means no silos, no hidden agendas, and open access to information across teams — because in defense, information asymmetry kills. Relentless Excellence means we don't ship anything that hasn't been tested beyond the breaking point, because our customers operate beyond the breaking point every day. And Shared Ownership means every employee, from intern to C-suite, has equity in the company and a voice in our direction."
        cta="View Open Positions"
        ctaHref="/careers/openings"
        stats={[
          { value: "4", label: "Core Values" },
          { value: "100%", label: "Employee Equity" },
          { value: "0", label: "Internal Silos" },
        ]}
      />

      {/* ── VETERAN SUPPORT SPLIT ── */}
      <SplitSection
        image="/images/pages/fob-military.jpg"
        label="Veteran Community"
        title="Those Who Served Lead the Way"
        description="Forty percent of Aegis employees are military veterans — and that's not by accident. We actively recruit from the services because no one understands the operational reality of counter-UAS defense better than those who have faced drone threats in the field. Our Veteran Transition Program provides dedicated onboarding, skill credentialing that translates military expertise into civilian career growth, and a peer mentorship network that connects new veteran hires with those who have successfully navigated the transition. We sponsor security clearances, honor military leave obligations, and maintain relationships with veteran service organizations worldwide. At Aegis, your service is not just respected — it's the foundation of our competitive advantage."
        reverse
        stats={[
          { value: "40%", label: "Veteran Employees" },
          { value: "15+", label: "Countries Represented" },
          { value: "98%", label: "Veteran Retention" },
        ]}
      />

      {/* ── EMPLOYEE QUOTE ── */}
      <QuoteSection
        quote="I spent twelve years operating air defense systems in the Army, and I've never seen a company that values that experience the way Aegis does. On my first day, my team lead asked me to redesign the operator interface based on what I wished I'd had in Kandahar. That's not a consulting gig — that's giving someone a seat at the table and meaning it. Three years later, I'm leading the operator experience team for our entire product suite, and every feature we ship still starts with the same question: would this have helped me downrange?"
        author="Major Sarah Chen (Ret.)"
        role="Director of Operator Experience — Former U.S. Army Air Defense Artillery"
      />

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
