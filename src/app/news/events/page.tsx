"use client";

import { motion } from "framer-motion";
import {
  SectionHero,
  CTASection,
} from "@/components/sections";
import { ScrollReveal as ScrollRevealComponent } from "@/components/sections/scroll-reveal";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

/* ────────────────────────────────────────────────────────────────
   EVENT DATA
   ──────────────────────────────────────────────────────────────── */

interface EventItem {
  title: string;
  location: string;
  date: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

const upcomingEvents: EventItem[] = [
  {
    title: "Eurosatory 2026",
    location: "Paris, France",
    date: "June 2026",
    description:
      "Visit Aegis at Stand D-750 for live demonstrations of Aegis Core v3.0, directed energy integration, and the new Aegis Mobile convoy protection platform. Schedule a private briefing with our operational team to discuss force protection requirements for your theater of operations.",
    ctaLabel: "Register",
    ctaHref: "/request-demo",
  },
  {
    title: "DSEI 2026",
    location: "London, United Kingdom",
    date: "September 2026",
    description:
      "Aegis returns to Defence and Security Equipment International with a keynote address from CEO Dr. Elena Vasquez on the future of autonomous counter-UAS defense. Product showcase includes the Aegis Integrator NATO interoperability platform and next-generation swarm defense algorithms.",
    ctaLabel: "Register",
    ctaHref: "/request-demo",
  },
  {
    title: "AUSA Annual Meeting",
    location: "Washington, D.C.",
    date: "October 2026",
    description:
      "The Association of the United States Army's premier event. Aegis will host a Counter-UAS Technology Summit featuring live demonstrations, classified capability briefings for U.S. DoD stakeholders, and panel discussions on multi-domain drone defense with senior military leaders.",
    ctaLabel: "Register",
    ctaHref: "/request-demo",
  },
];

const pastEvents: EventItem[] = [
  {
    title: "DSEI 2025",
    location: "London, United Kingdom",
    date: "September 2025",
    description:
      "CEO Dr. Elena Vasquez delivered the opening keynote to 2,400+ defense professionals from 38 nations. Eight nation defense ministers visited the Aegis stand for hands-on demonstrations. Aegis Core v3.0 was debuted with live C2 interface trials and directed energy integration showcase.",
    ctaLabel: "View Recap",
    ctaHref: "/news/press-releases",
  },
  {
    title: "RIMPAC 2025",
    location: "Hawaii, United States",
    date: "July 2025",
    description:
      "Aegis SkyWatch achieved the first-ever operational airborne drone intercept during the world's largest maritime exercise. The system neutralized a simulated 30-drone swarm attack from a maritime patrol aircraft platform, demonstrating autonomous threat prioritization at ranges exceeding 12 km.",
    ctaLabel: "View Recap",
    ctaHref: "/news/press-releases",
  },
  {
    title: "IDEF 2025",
    location: "Istanbul, Turkey",
    date: "May 2025",
    description:
      "Aegis Shield man-portable counter-UAS system was demonstrated in a live-fire scenario at the IDEF exhibition. The 12 kg dismounted unit achieved 100% neutralization rate against Group 1 UAVs, drawing significant interest from 14 nation delegations. Three new procurement partnerships were initiated.",
    ctaLabel: "View Recap",
    ctaHref: "/news/press-releases",
  },
  {
    title: "NATO Tech Summit",
    location: "Brussels, Belgium",
    date: "March 2025",
    description:
      "Aegis showcased its STANAG 4671 certification compliance and the Aegis Integrator platform to NATO procurement officials from 28 member nations. The demonstration included live cross-domain C2 interoperability between U.S., UK, and German defense systems — a first for the alliance.",
    ctaLabel: "View Recap",
    ctaHref: "/news/press-releases",
  },
];

/* ────────────────────────────────────────────────────────────────
   EVENT CARD
   ──────────────────────────────────────────────────────────────── */

function EventCard({
  event,
  index,
  type,
}: {
  event: EventItem;
  index: number;
  type: "upcoming" | "past";
}) {
  const isUpcoming = type === "upcoming";

  return (
    <ScrollRevealComponent delay={index * 80}>
      <div className="relative flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
        {/* Timeline connector */}
        <div className="hidden md:flex flex-col items-center flex-shrink-0 w-[120px]">
          <div className="w-3 h-3 border-2 border-white/30 bg-black flex-shrink-0" />
          {index < (isUpcoming ? upcomingEvents.length : pastEvents.length) - 1 && (
            <div className="w-px flex-1 bg-white/10 min-h-[60px]" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 border border-white/10 p-6 md:p-8 hover:border-white/20 transition-colors bg-[#0a0a0a]">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-white/40">
              <Calendar size={12} strokeWidth={1.5} />
              {event.date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-white/40">
              <MapPin size={12} strokeWidth={1.5} />
              {event.location}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-[-0.01em] mb-3">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-[#b9b9b9] text-sm md:text-base leading-relaxed mb-6">
            {event.description}
          </p>

          {/* CTA */}
          <Link
            href={event.ctaHref}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white border-b border-white/30 pb-1 hover:border-white transition-colors"
          >
            {event.ctaLabel}
            <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </ScrollRevealComponent>
  );
}

/* ────────────────────────────────────────────────────────────────
   EVENTS SECTION
   ──────────────────────────────────────────────────────────────── */

function EventsSection({
  label,
  title,
  events,
  type,
}: {
  label: string;
  title: string;
  events: EventItem[];
  type: "upcoming" | "past";
}) {
  return (
    <section
      className={`py-28 md:py-44 ${
        type === "past" ? "bg-[#0a0a0a] border-t border-white/10" : "bg-black"
      }`}
    >
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
        <ScrollRevealComponent>
          <div className="mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              {label}
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              {title}
            </h2>
          </div>
        </ScrollRevealComponent>

        <div className="space-y-8">
          {events.map((event, i) => (
            <EventCard key={event.title} event={event} index={i} type={type} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════ */

export default function EventsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/events-hero.jpg"
        label="News"
        title="Events"
        subtitle="See Aegis in Action"
        gradient="from-black via-black/80 to-black/50"
        align="center"
      />

      {/* ── UPCOMING EVENTS ── */}
      <EventsSection
        label="Upcoming"
        title="Events & Appearances"
        events={upcomingEvents}
        type="upcoming"
      />

      {/* ── PAST EVENTS ── */}
      <EventsSection
        label="Past Events"
        title="Recaps & Highlights"
        events={pastEvents}
        type="past"
      />

      {/* ── CTA ── */}
      <CTASection
        title="Meet Us at an Event"
        subtitle="Schedule a private demonstration or meeting at any upcoming event. Our team will coordinate logistics and clearances for classified briefings."
        primaryCta="Request a Meeting"
        primaryHref="/request-demo"
        secondaryCta="View Press Releases"
        secondaryHref="/news/press-releases"
      />
    </>
  );
}
