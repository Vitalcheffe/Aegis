"use client";

import { useState } from "react";
import {
  SectionHero,
  CTASection,
  ScrollReveal,
} from "@/components/sections";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface PressRelease {
  id: string;
  title: string;
  date: string;
  dateSort: string;
  body: string[];
}

const pressReleases: PressRelease[] = [
  {
    id: "pr-2026-03",
    title:
      "Aegis Defense Systems Announces $240M Contract with U.S. Central Command",
    date: "March 4, 2026",
    dateSort: "2026-03",
    body: [
      "Aegis Defense Systems today announced a $240 million contract with U.S. Central Command (CENTCOM) for the deployment of Aegis Core and Aegis Tactical systems across CENTCOM's area of responsibility. The contract represents the largest single C-UAS procurement in CENTCOM history and reflects the growing urgency of counter-drone operations in the region, where adversary drone activity has increased 340% year-over-year.",
      "The contract includes 18 Aegis Core fixed-site installations protecting forward operating bases, command nodes, and critical logistics hubs, along with 40 Aegis Tactical man-portable systems for expeditionary and mobile force protection. All systems will be delivered with Aegis Integrator middleware for seamless connectivity with CENTCOM's existing command and control infrastructure, including the Tactical Air Control Party Close Air Support System and the Theater Battle Management Core System.",
      "Deployment will commence in Q2 2026 and is expected to reach Full Operational Capability by Q4 2026. The contract includes a five-year sustainment package, operator and maintainer training for 200 CENTCOM personnel, and access to the Aegis secure over-the-air update pipeline for continuous threat library updates. This procurement brings the total number of Aegis systems deployed across U.S. Combatant Commands to over 120.",
      "“This contract underscores the operational imperative for integrated counter-UAS capability in contested environments,” said Dr. Elena Vasquez, CEO of Aegis Defense Systems. “CENTCOM's area of responsibility presents the most complex and volatile drone threat landscape in the world, and Aegis was purpose-built for exactly this mission.”",
    ],
  },
  {
    id: "pr-2026-02",
    title: "Aegis Completes Directed Energy Integration Milestone",
    date: "February 18, 2026",
    dateSort: "2026-02",
    body: [
      "Aegis Defense Systems has successfully completed the final integration milestone for its directed energy counter-UAS capability, demonstrating autonomous engagement of drone targets using both the 50 kW High-Energy Laser (HEL) and the High-Power Microwave (HPM) system in a fully integrated Aegis Architecture. The milestone was achieved during a three-week test campaign at the U.S. Army's White Sands Missile Range in January 2026.",
      "During 72 engagement sequences against Group 1 and Group 2 UAVs, the integrated system achieved a 96% neutralization rate using HEL for precision single-target engagement and HPM for area denial against swarm formations. Notably, the Aegis AI Layer autonomously selected the optimal directed energy effector for each engagement based on target geometry, swarm density, and rules of engagement — the first demonstrated autonomous effector selection between laser and microwave systems in a C-UAS context.",
      "The directed energy capability provides Aegis operators with an effectively unlimited magazine, constrained only by electrical power supply rather than physical munitions inventory. This is a decisive advantage in sustained engagements where kinetic interceptors would be rapidly depleted. The HEL system achieved sub-second neutralization at ranges up to 3.2 km, exceeding the 3 km specification requirement. The HPM system neutralized all drones within a 200-meter radius in swarm scenarios involving up to 30 simultaneous platforms.",
      "Production deliveries of directed energy-integrated Aegis Shield systems will begin in Q3 2026. Current Aegis Core and Tactical systems are pre-wired for directed energy retrofit, enabling field units to upgrade without replacing the base platform. Retrofit kits will be available through the standard Aegis sustainment program.",
    ],
  },
  {
    id: "pr-2026-01",
    title:
      "NATO Selects Aegis Integrator for Alliance-Wide C-UAS Interoperability Program",
    date: "January 22, 2026",
    dateSort: "2026-01",
    body: [
      "The NATO Support and Procurement Agency (NSPA) has selected Aegis Integrator as the backbone middleware platform for the Alliance's new C-UAS Interoperability Program, a multi-year initiative to establish standardized counter-drone data exchange and coordinated engagement capability across all 32 NATO member nations. The contract is valued at €85 million over five years.",
      "The program addresses a critical operational gap: while individual NATO members have deployed a variety of C-UAS systems, these systems cannot currently share track data, coordinate engagements, or synchronize rules of engagement across national boundaries. Aegis Integrator will provide the translation and routing layer that enables any NATO C-UAS system — regardless of manufacturer or national origin — to exchange standardized track data and engagement status through STANAG 4676 and STANAG 4586 protocols.",
      "Phase 1 of the program, scheduled for completion by Q4 2026, will deploy Aegis Integrator nodes at 12 NATO command locations and integrate the first tranche of national C-UAS systems from the United States, United Kingdom, Germany, France, and the Netherlands. Phase 2 will extend integration to all member nations and incorporate Link 16 tactical data link connectivity for joint force operations. The program also establishes a shared threat intelligence library, enabling new drone signatures observed by any member's C-UAS system to be distributed across the alliance within 24 hours.",
      "“NATO's selection of Aegis Integrator validates our commitment to open architecture and interoperability as fundamental design principles, not afterthoughts,” said Marcus Webb, President of Aegis Defense Systems International. “A drone threat at the alliance's border is a threat to every member. Aegis Integrator ensures that every member can see it, track it, and respond to it — together.”",
    ],
  },
  {
    id: "pr-2025-12",
    title: "Aegis Defense Systems Opens Abu Dhabi Regional Headquarters",
    date: "December 10, 2025",
    dateSort: "2025-12",
    body: [
      "Aegis Defense Systems today inaugurated its Abu Dhabi Regional Headquarters, establishing a permanent presence in the United Arab Emirates to serve the rapidly growing demand for counter-UAS capability across the Middle East, North Africa, and South Asia. The facility includes a systems integration center, a customer training academy, and an operations support center providing 24/7 technical assistance to regional customers.",
      "The Middle East represents Aegis's fastest-growing market, with regional revenue increasing 180% year-over-year. The Abu Dhabi headquarters will support existing deployments across six Gulf Cooperation Council nations and enable closer collaboration with regional defense organizations on C-UAS requirements specific to the threat environment of the region, which includes sophisticated Iranian-designed loitering munitions, commercial drone modifications, and emerging swarm capabilities.",
      "The facility's training academy will offer the full Aegis operator and systems administrator curriculum in both English and Arabic, with the first courses scheduled to begin in February 2026. The academy will be capable of training up to 400 students annually, reducing the dependency on stateside training and accelerating regional customer self-sufficiency. The systems integration center enables on-site configuration, testing, and validation of Aegis systems prior to deployment, reducing lead times for regional orders by approximately 40%.",
      "The Abu Dhabi office is Aegis's third regional headquarters, joining existing facilities in London (established 2023) and Tokyo (established 2024). The company plans to open a fourth regional headquarters in Warsaw in Q2 2026 to support the growing Eastern European market.",
    ],
  },
  {
    id: "pr-2025-11",
    title:
      "Aegis SkyWatch Achieves First Airborne Counter-UAS Intercept During RIMPAC 2025",
    date: "November 15, 2025",
    dateSort: "2025-11",
    body: [
      "During the Rim of the Pacific Exercise (RIMPAC) 2025, the Aegis SkyWatch airborne counter-UAS platform achieved the first successful airborne intercept of a hostile drone by a fixed-wing C-UAS platform, marking a transformative milestone in the counter-drone mission. The intercept occurred during a live-fire exercise on July 18, 2025, when the SkyWatch platform detected, classified, and engaged a simulated hostile UAV at 12,000 feet MSL using an onboard RF jamming payload.",
      "Aegis SkyWatch is a modified Group 4 UAV equipped with a compact Aegis sensor suite including an S-Band radar, passive RF direction-finding array, and EO/IR ball turret. The platform loiters at altitude, extending the C-UAS detection envelope far beyond the radar horizon of ground-based systems and providing early warning and engagement capability against low-altitude drone threats approaching from over water or mountainous terrain. During the RIMPAC exercise, SkyWatch extended the Aegis detection range from 35 km to over 120 km for sea-skimming drone threats.",
      "The SkyWatch platform integrates fully with ground-based Aegis Core and Aegis Tactical systems through the Aegis Integrator middleware, creating a multi-tiered defense architecture where the airborne platform provides wide-area surveillance and early engagement while ground systems provide close-in protection and graduated response. During RIMPAC, SkyWatch detected and classified 47 drone contacts across 12 exercise scenarios, passing 100% of track data to ground stations with sub-50-millisecond latency through the STANAG 4676 data link.",
      "“Airborne C-UAS is the next evolution of the counter-drone mission,” said Dr. Elena Vasquez, CEO of Aegis Defense Systems. “Ground-based systems will always be limited by terrain and the radar horizon. SkyWatch removes that limitation, giving commanders the same over-the-hill capability for drone threats that airborne early warning provides for aircraft.” Flight testing and operational evaluation of the SkyWatch platform will continue through 2026, with initial operational capability planned for Q1 2027.",
    ],
  },
  {
    id: "pr-2025-10",
    title: "Aegis Defense Systems Reports Record FY2025 Revenue of $1.2 Billion",
    date: "October 28, 2025",
    dateSort: "2025-10",
    body: [
      "Aegis Defense Systems today reported record revenue of $1.2 billion for fiscal year 2025, representing a 67% increase from the prior year and marking the company's fourth consecutive year of revenue growth exceeding 50%. The results were driven by strong demand across all product lines and geographic regions, with particular growth in the Asia-Pacific and Middle Eastern markets.",
      "Aegis Core remained the company's largest revenue contributor at $540 million, reflecting new fixed-site deployments across NATO's Eastern Flank and U.S. Indo-Pacific Command. Aegis Tactical generated $280 million in revenue, driven by rapid adoption by expeditionary and mobile force protection units worldwide. The Aegis Shield man-portable system contributed $180 million, with significant orders from the UK Ministry of Defence, the Australian Defence Force, and multiple Gulf state customers. Services and sustainment revenue reached $200 million, reflecting the growing installed base and customer demand for continuous capability updates.",
      "The company's backlog at fiscal year-end stood at $3.4 billion, a 92% increase year-over-year, providing multi-year revenue visibility. International orders represented 58% of new bookings, reflecting the global nature of the drone threat and Aegis's expanding international presence. Research and development spending increased to $192 million (16% of revenue), with major investments in directed energy integration, counter-swarm algorithms, and the SkyWatch airborne C-UAS platform.",
      "“FY2025 was a watershed year for Aegis and for the counter-UAS market,” said Dr. Elena Vasquez, CEO. “The drone threat has moved from emerging to urgent, and defense organizations worldwide are making C-UAS a top procurement priority. Our record results reflect both the scale of this demand and the trust that our customers place in Aegis technology to protect their people and assets.” The company expects continued growth in FY2026, projecting revenue between $1.6 billion and $1.8 billion.",
    ],
  },
  {
    id: "pr-2025-09",
    title:
      "UK Ministry of Defence Awards Aegis £180M Contract for Airport Protection Programme",
    date: "September 16, 2025",
    dateSort: "2025-09",
    body: [
      "The UK Ministry of Defence has awarded Aegis Defense Systems a £180 million contract for the deployment of Aegis Core and Aegis Shield systems across 14 designated UK airports under the new Airport Protection Programme. The programme, announced by the Secretary of State for Defence in July 2025, addresses the growing drone threat to civil aviation operations, which has caused over 2,400 flight disruptions at UK airports in the past 18 months.",
      "Under the contract, Aegis will deploy a multi-layered defense architecture at each airport consisting of an Aegis Core fixed-site system providing 360° surveillance out to 35 km, supplemented by Aegis Shield rapid-deployment systems for perimeter and terminal protection. All systems will be integrated with National Air Traffic Services (NATS) infrastructure through the Aegis Integrator ASTERIX connector, ensuring that C-UAS track data is available to air traffic controllers in real time alongside conventional radar returns.",
      "The deployment includes built-in FAA and EASA coordination protocols that automatically deconflict jamming operations with air traffic control frequencies and navigation aids, ensuring zero impact on legitimate aviation operations. The graduated response framework prioritizes non-kinetic neutralization — RF jamming and GPS spoofing — in the airport environment, with kinetic options available only under explicit military authorization. All operations will be conducted under the legal authority of the UK Air Traffic Management and Unmanned Aircraft Act 2024.",
      "Installation will begin at Heathrow, Gatwick, and Stansted in Q1 2026, with the remaining 11 airports completed by Q3 2026. The contract includes a five-year sustainment package and training for 168 RAF and civilian operator personnel. This represents the largest civil aviation C-UAS deployment in European history and establishes a model that several other European nations are expected to follow.",
    ],
  },
  {
    id: "pr-2025-08",
    title: "Aegis Launches Certified Partner Program with 12 Founding Partners",
    date: "August 5, 2025",
    dateSort: "2025-08",
    body: [
      "Aegis Defense Systems today launched the Aegis Certified Partner Program, an initiative to expand the ecosystem of integrated sensor, effector, and command-and-control solutions available to Aegis customers worldwide. The program launches with 12 founding partners spanning sensor manufacturers, effector providers, systems integrators, and defense communication specialists.",
      "The Certified Partner Program builds on Aegis's Modular Open Systems Architecture (MOSA), which defines standard interfaces for third-party integration. Partners gain access to the Aegis Integration Development Kit (IDK), containing API specifications, data format documentation, test harnesses, and certification test suites that enable their products to be validated for plug-and-play integration with any Aegis system. Certified integrations carry the “Aegis Ready” designation, guaranteeing that the partner product has been tested and validated for performance, reliability, and security compliance.",
      "The 12 founding partners include three sensor manufacturers integrating new radar and EO/IR products, two effector providers adding kinetic interceptor and net-capture capabilities, four systems integrators offering Aegis deployment and sustainment services in their respective regions, and three defense communication specialists extending Aegis Integrator connectivity to additional C2 platforms. Together, the founding partners represent capabilities in 28 countries across five continents.",
      "“No single company can address every aspect of the counter-UAS mission,” said Marcus Webb, President of Aegis Defense Systems International. “The Certified Partner Program enables us to deliver best-of-breed solutions to our customers while maintaining the integrated performance and reliability that defines the Aegis Architecture.” Applications for the next partner cohort, which will be selected in Q1 2026, are now being accepted through the Aegis Partner Portal.",
    ],
  },
];

function PressReleaseCard({ release }: { release: PressRelease }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border-t border-white/10 group">
        <CollapsibleTrigger className="w-full text-left py-10 md:py-14 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12 hover:bg-white/[0.02] transition-colors px-2 md:px-4 -mx-2 md:-mx-4">
          <div className="md:flex-1">
            <h3 className="text-[clamp(1.4rem,3vw,2.2rem)] font-bold tracking-[-0.03em] text-white leading-[1.1] pr-8">
              {release.title}
            </h3>
          </div>
          <div className="flex items-center gap-4 md:pt-2 shrink-0">
            <span className="inline-block text-[9px] uppercase tracking-[0.15em] text-white/50 border border-white/10 px-3 py-1">
              {release.date}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-white/40" />
            </motion.div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="px-2 md:px-4 pb-10 md:pb-14 md:pl-8 max-w-3xl">
                  <div className="space-y-5">
                    {release.body.map((paragraph, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.08,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="text-[#b9b9b9] text-base leading-relaxed"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                      Press Release · {release.id.toUpperCase()}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export default function PressReleasesPage() {
  return (
    <>
      <SectionHero
        image="/images/pages/press-hero.jpg"
        label="News"
        title="Press Releases"
        subtitle="Official announcements from Aegis Defense Systems — contracts, milestones, partnerships, and corporate developments."
        gradient="from-black via-black/80 to-black/50"
        align="center"
      />

      {/* Press Releases List */}
      <section className="py-28 md:py-44 bg-black">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <div className="mb-16 md:mb-24">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                Official Statements
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
                Press Releases
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-0">
            {pressReleases.map((release, i) => (
              <ScrollReveal key={release.id} delay={i * 60}>
                <PressReleaseCard release={release} />
              </ScrollReveal>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      <CTASection
        title="Media Inquiries"
        subtitle="For press and media inquiries, contact our communications team for official statements, executive interviews, and product demonstrations."
        primaryCta="Contact Communications"
        primaryHref="/request-demo"
        secondaryCta="View All News"
        secondaryHref="/news"
      />
    </>
  );
}
