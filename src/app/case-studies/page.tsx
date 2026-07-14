"use client";

import {
  SectionHero,
  AnimatedStatsSection,
  CaseStudyCard,
  CTASection,
  ScrollReveal,
} from "@/components/sections";

const militaryStudies = [
  {
    image: "/images/case-studies/air-base.jpg",
    tag: "Military",
    title: "Protecting Forward Deployed Air Assets: Aegis Shield at Al Dhafra",
    excerpt:
      "When repeated drone incursions threatened operations at one of the largest air bases in the CENTCOM AOR, Aegis Shield delivered 360° perimeter defense that neutralized every threat before it reached the flightline.",
    href: "/case-studies/air-force-base-defense",
  },
  {
    image: "/images/case-studies/naval-task-force.jpg",
    tag: "Military",
    title: "Aegis Mobile: Counter-UAS for Maritime Task Forces",
    excerpt:
      "A naval task force operating in contested waters faced coordinated drone swarm attacks from shore-based adversaries. Aegis Mobile provided mobile, ship-compatible counter-UAS that protected the fleet across 3,200 nautical miles of operations.",
    href: "/case-studies/naval-task-force",
  },
  {
    image: "/images/case-studies/fob-defense.jpg",
    tag: "Military",
    title: "FOB Defense: Aegis Tactical Under Fire in Active Combat Zone",
    excerpt:
      "A forward operating base in a high-threat region faced daily drone surveillance and attack. Aegis Tactical provided rapid-deploy counter-UAS that protected 2,400 personnel under sustained adversarial drone operations.",
    href: "/case-studies/forward-operating-base",
  },
];

const infrastructureStudies = [
  {
    image: "/images/case-studies/airport-protection.jpg",
    tag: "Infrastructure",
    title: "Securing Major European Airport Against Drone Incursions",
    excerpt:
      "One of Europe's busiest airports experienced over 200 drone sightings in a single year, causing runway closures and affecting 40,000+ passengers. Aegis Shield restored airspace security with zero further disruptions.",
    href: "/case-studies/international-airport-protection",
  },
  {
    image: "/images/case-studies/power-grid.jpg",
    tag: "Infrastructure",
    title: "Defending Critical Energy Infrastructure in the Nordics",
    excerpt:
      "A nation's primary power grid substations faced systematic drone reconnaissance from hostile state actors. Aegis Core deployed across 14 critical nodes, achieving complete airspace awareness and zero unauthorized penetrations.",
    href: "/case-studies/critical-infrastructure-power-grid",
  },
  {
    image: "/images/case-studies/port-security.jpg",
    tag: "Infrastructure",
    title: "Port Security: Aegis Shield for Strategic Maritime Assets",
    excerpt:
      "A strategic commercial port handling 12 million TEU annually faced drone-based smuggling and espionage threats. Aegis Shield provided layered protection across the entire port complex without disrupting cargo operations.",
    href: "/case-studies/maritime-port-security",
  },
];

const civilianStudies = [
  {
    image: "/images/case-studies/border-mission.jpg",
    tag: "Civilian",
    title: "Border Surveillance and Drone Interdiction: Southern Command",
    excerpt:
      "Cartel-operated drones crossed the southern border with contraband and surveillance payloads over 1,500 times in six months. Aegis Command integrated with CBP systems to achieve a 99.8% interdiction rate across 450 km of border.",
    href: "/case-studies/border-security-mission",
  },
  {
    image: "/images/case-studies/vip-summit.jpg",
    tag: "Civilian",
    title: "G7 Summit: Full-Spectrum Counter-Drone Protection",
    excerpt:
      "The G7 Summit required absolute airspace security for seven heads of state and 3,000 delegates. Aegis deployed a multi-layered counter-UAS umbrella across 25 km² with zero security incidents during the 72-hour event.",
    href: "/case-studies/vip-summit-security",
  },
  {
    image: "/images/case-studies/correctional.jpg",
    tag: "Civilian",
    title: "Contraband Interdiction: Counter-UAS at Federal Correctional Facilities",
    excerpt:
      "Federal prisons reported a 400% increase in drone-delivered contraband over two years. Aegis Sentinel deployed across eight facilities, achieving a 97% interdiction rate and eliminating drone deliveries within 90 days.",
    href: "/case-studies/correctional-facility",
  },
  {
    image: "/images/case-studies/smart-city.jpg",
    tag: "Civilian",
    title: "Smart City Integration: Counter-UAS for Urban Airspace Management",
    excerpt:
      "A metropolitan area of 4 million residents faced an explosion of unauthorized drone flights threatening public safety and critical venues. Aegis Command integrated with the city's smart infrastructure to provide real-time urban airspace management.",
    href: "/case-studies/urban-smart-city",
  },
];

export default function CaseStudiesPage() {
  return (
    <main>
      <SectionHero
        image="/images/case-studies/air-base.jpg"
        label="Case Studies"
        title="Proven in the Field"
        subtitle="Real deployments. Real results. Explore how Aegis Defense Systems has protected military bases, critical infrastructure, and civilian populations across the globe."
      />

      <AnimatedStatsSection
        label="By the Numbers"
        stats={[
          { value: 47, label: "Deployments", suffix: "+" },
          { value: 12, label: "Nations" },
          { value: 99.97, label: "Intercept Rate", suffix: "%" },
          { value: 0, label: "Collateral Incidents" },
        ]}
      />

      {/* Military */}
      <section className="py-28 md:py-44 bg-black">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <div className="mb-16 md:mb-24">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                Military
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
                Forward Deployed Operations
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {militaryStudies.map((study) => (
              <CaseStudyCard
                key={study.href}
                image={study.image}
                tag={study.tag}
                title={study.title}
                excerpt={study.excerpt}
                href={study.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-28 md:py-44 bg-[#0a0a0a]">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <div className="mb-16 md:mb-24">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                Infrastructure
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
                Critical Asset Protection
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructureStudies.map((study) => (
              <CaseStudyCard
                key={study.href}
                image={study.image}
                tag={study.tag}
                title={study.title}
                excerpt={study.excerpt}
                href={study.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Civilian */}
      <section className="py-28 md:py-44 bg-black">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <div className="mb-16 md:mb-24">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                Civilian
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
                Public Safety &amp; Security
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {civilianStudies.map((study) => (
              <CaseStudyCard
                key={study.href}
                image={study.image}
                tag={study.tag}
                title={study.title}
                excerpt={study.excerpt}
                href={study.href}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Request a Classified Briefing"
        subtitle="Our deployments speak for themselves. Contact us for detailed operational outcomes and system specifications relevant to your mission."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Our Technology"
        secondaryHref="/technology"
      />
    </main>
  );
}
