"use client";

import {
  SectionHero,
  TextSection,
  CardGrid,
  FeatureList,
  SplitSection,
  FAQSection,
  CTASection,
  AnimatedLine,
  StatsSection,
} from "@/components/sections";

export default function FacilitiesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/corporate-office.jpg"
        label="Global Presence"
        title="Global Facilities"
        subtitle="From our headquarters in Arlington to our regional offices on four continents, Aegis facilities are strategically positioned to serve our customers where they operate — with local expertise, rapid response, and deep understanding of regional threat environments."
        cta="Visit Our Headquarters"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── OVERVIEW ── */}
      <TextSection label="Overview" title="Where We Work">
        <p>
          Aegis Defense Systems operates a global network of offices, research laboratories, manufacturing facilities, and training centers designed to provide responsive support to our customers wherever they are deployed. Our facility strategy is driven by a simple principle: we should be close enough to our customers to understand their operational environment and respond quickly to their needs, while maintaining the centralized engineering and manufacturing excellence that ensures every Aegis system meets our exacting quality standards.
        </p>
        <p>
          Each facility serves a strategic purpose within our global operations. Our Arlington headquarters houses executive leadership, core engineering, and the primary R&D laboratory. Our London office leads European and NATO business development and compliance. Our Tel Aviv research center leverages Israel's world-class defense technology ecosystem for advanced signal processing and EW research. Our Singapore office serves as the hub for Asia-Pacific operations, with particular focus on naval and maritime counter-UAS solutions. And our Abu Dhabi office supports our growing presence in the Middle East, where counter-UAS demand continues to accelerate.
        </p>
        <p>
          Beyond our own facilities, Aegis maintains forward-deployed engineering teams at customer sites worldwide, embedded in operational units where they provide real-time technical support and gather the operational feedback that drives product improvement. These embedded teams represent our deepest commitment to customer success — when you buy an Aegis system, you are not just buying a product, you are gaining a partner who will be there for the long haul.
        </p>
      </TextSection>

      {/* ── FACILITY STATS ── */}
      <StatsSection
        label="Global Footprint"
        stats={[
          { value: "5", label: "Office Locations" },
          { value: "3", label: "Research Labs" },
          { value: "2", label: "Manufacturing Sites" },
          { value: "2", label: "Training Centers" },
          { value: "800+", label: "Employees Worldwide" },
        ]}
      />

      {/* ── HEADQUARTERS ── */}
      <SplitSection
        image="/images/pages/dc-capitol.jpg"
        label="Headquarters"
        title="Arlington, Virginia"
        description="Aegis headquarters in Arlington, Virginia — just minutes from the Pentagon and Capitol Hill — serves as the nerve center of our global operations. The 120,000 square foot facility houses executive leadership, systems engineering, software development, the primary R&D laboratory, program management, and our 24/7 global support operations center. The Arlington campus includes a secure facility cleared to Top Secret/SCI, enabling us to handle the most sensitive customer requirements and classified program work. Our proximity to the U.S. defense establishment ensures that Aegis leadership maintains constant awareness of evolving requirements and policy directions that shape our product roadmap and investment decisions."
        cta="Schedule a Visit"
        ctaHref="/request-demo"
        stats={[
          { value: "120K", label: "Square Feet" },
          { value: "450", label: "Employees" },
        ]}
      />

      {/* ── FACILITY LOCATIONS ── */}
      <CardGrid
        label="Locations"
        title="Our Global Offices"
        cards={[
          {
            title: "Arlington, Virginia — Headquarters",
            description:
              "Our global headquarters and primary engineering center. The Arlington campus houses executive leadership, core systems engineering, software development, the primary R&D laboratory with anechoic chamber and directed energy test range, program management for all U.S. government contracts, and the 24/7 global support operations center. The facility is cleared to Top Secret/SCI and includes a SCIF for classified customer engagements. Arlington also hosts our primary manufacturing line for Aegis Core and Aegis Shield systems, with a production capacity of 200 systems per year.",
            image: "/images/pages/dc-capitol.jpg",
            tag: "Headquarters",
          },
          {
            title: "London, United Kingdom",
            description:
              "Our European headquarters in London's West End leads business development, customer support, and compliance for all European and NATO customers. The London team includes regional sales engineers, a dedicated NATO compliance group, and a small advanced engineering team focused on European-specific integration requirements. The London office also manages our relationships with UK Ministry of Defence, German Bundeswehr, and other European defense ministries. The facility includes secure briefing rooms and a demonstration suite where European customers can evaluate Aegis capabilities in a controlled environment.",
            image: "/images/pages/london-skyline.jpg",
            tag: "Europe",
          },
          {
            title: "Tel Aviv, Israel",
            description:
              "Our Tel Aviv Advanced Research Center focuses on signal processing, electronic warfare, and RF sensing research, leveraging Israel's world-leading defense technology ecosystem. The center employs 25 research engineers drawn from elite Israeli defense technology units and maintains close relationships with Israeli defense companies and academic institutions. The Tel Aviv center also operates our Middle East field test facility, which provides access to operational environments and threat profiles unique to the region. Research output from Tel Aviv has contributed to 8 of our 32 patents and has directly enhanced the RF detection and EW capabilities of the Aegis platform.",
            image: "/images/pages/defense-antenna.jpg",
            tag: "Research",
          },
          {
            title: "Singapore",
            description:
              "Our Singapore office serves as the hub for Asia-Pacific operations, with particular focus on naval and maritime counter-UAS solutions. The Singapore team includes regional sales and support engineers, a naval systems integration group, and a small manufacturing cell that produces Asia-specific system configurations. Singapore's strategic location provides rapid response capability for customers across the Indo-Pacific theater, with same-day engineering support available for customers in Japan, Australia, South Korea, and Southeast Asian nations. The office also coordinates our participation in regional defense exhibitions and exercises.",
            image: "/images/pages/singapore-marina.jpg",
            tag: "Asia-Pacific",
          },
          {
            title: "Abu Dhabi, United Arab Emirates",
            description:
              "Our Abu Dhabi office supports our growing presence in the Middle East, where counter-UAS demand continues to accelerate driven by the region's unique threat environment. The Abu Dhabi team provides sales, customer support, and training services for customers across the Gulf Cooperation Council nations and the broader Middle East. The office includes a regional training center that delivers Aegis operator and system administrator courses, reducing the travel burden for Middle Eastern customers who previously traveled to Arlington or Farnborough for training. The facility also hosts a permanent demonstration system for customer evaluations and regional defense exhibitions.",
            image: "/images/pages/abu-dhabi-skyline.jpg",
            tag: "Middle East",
          },
        ]}
      />

      {/* ── MANUFACTURING ── */}
      <FeatureList
        label="Manufacturing"
        title="Production & Quality Assurance"
        items={[
          {
            title: "Arlington Production Line",
            description:
              "Our primary manufacturing facility in Arlington produces Aegis Core, Aegis Shield, and Aegis Command systems with a combined capacity of 200 systems per year. The production line operates under ISO 9001:2015 quality management and AS9100D aerospace quality standards, with full traceability from component procurement through final acceptance testing. Every system undergoes a 72-hour burn-in test, a full environmental stress screening, and a comprehensive functional acceptance test before shipment. Production is organized in a lean manufacturing cell layout that enables rapid reconfiguration for different product variants and maintains an average production cycle time of 28 days from order to shipment.",
            tag: "Primary",
          },
          {
            title: "Farnborough Integration Center",
            description:
              "Our Farnborough, UK facility serves as the European integration and test center, where Aegis systems destined for European and NATO customers undergo final configuration, integration testing with European-specific sensor and C2 systems, and STANAG compliance validation before deployment. The integration center includes a NATO-standard network test bed, a multi-sensor integration suite, and a dedicated space for STANAG 4671 certification testing. European-configured systems are manufactured in Arlington and shipped to Farnborough for regional customization and acceptance, ensuring that every system meets both Aegis quality standards and European customer requirements.",
            tag: "Europe",
          },
        ]}
      />

      {/* ── TRAINING CENTERS ── */}
      <SplitSection
        image="/images/support/training.jpg"
        label="Training"
        title="Dedicated Training Centers"
        description="Aegis operates dedicated training centers at our Arlington headquarters and our Farnborough, UK facility. Each center features multiple classrooms with Aegis operator workstations, a high-fidelity tactical simulator suite, and secure briefing rooms for classified course content. The Arlington training center includes a live-fire range for UAS engagement demonstrations — one of the few facilities in the United States authorized for counter-UAS live-fire training with real drone targets. Both centers offer the full Aegis training curriculum, from basic operator qualification through advanced threat analysis and system administration. Combined, the two centers train over 300 operators annually, with capacity to scale during surge periods."
        cta="Explore Training Programs"
        ctaHref="/support/training"
        reverse
        stats={[
          { value: "300+", label: "Operators Trained Annually" },
          { value: "2", label: "Training Centers" },
        ]}
      />

      {/* ── FAQ ── */}
      <FAQSection
        label="Facilities FAQ"
        title="Frequently Asked Questions"
        items={[
          {
            question: "Can customers visit Aegis facilities?",
            answer:
              "Yes. Aegis welcomes customer visits to all of our facilities. Arlington headquarters tours include the R&D laboratory, manufacturing floor, and training center. International office visits can be arranged through your regional Aegis representative. All visits require advance scheduling and, for classified facilities, appropriate security clearance verification. We recommend scheduling visits at least two weeks in advance to ensure availability of the appropriate personnel and facilities.",
          },
          {
            question: "Does Aegis plan to open additional offices?",
            answer:
              "Yes. Aegis is actively evaluating expansion into additional locations based on customer demand and regional threat environments. Current plans include a dedicated office in Tokyo, Japan to serve the growing Japanese defense market, and a regional support center in Canberra, Australia to support Australian Defence Force requirements. Expansion timelines are driven by customer commitments and regional regulatory requirements.",
          },
          {
            question: "How does Aegis ensure consistent quality across global facilities?",
            answer:
              "All Aegis facilities operate under the same ISO 9001:2015 quality management system, with standardized processes, procedures, and quality metrics. Manufacturing is centralized at our Arlington production facility to maintain the highest quality standards. Engineering follows a unified development process with shared code repositories, automated testing pipelines, and mandatory peer review. Regional teams follow the same training curriculum and are certified to the same standards as headquarters personnel.",
          },
          {
            question: "Are Aegis facilities secure enough for classified work?",
            answer:
              "Our Arlington headquarters includes a certified SCIF (Sensitive Compartmented Information Facility) cleared to Top Secret/SCI, enabling classified program work and customer engagements at the highest security levels. International offices are equipped with secure facilities appropriate to their regional requirements and customer base. All facilities comply with NIST SP 800-53 security controls and are subject to regular security assessments by independent auditors.",
          },
          {
            question: "How does Aegis handle logistics and shipping from global facilities?",
            answer:
              "Aegis maintains strategic spare parts inventories at distribution centers in the United States, United Kingdom, United Arab Emirates, and Singapore, ensuring that replacement components are available for rapid shipment worldwide. Our logistics team provides end-to-end supply chain management including customs clearance, ITAR compliance verification, and proactive inventory replenishment. Standard parts shipments are delivered within 72 hours for most locations; critical components can be expedited within 24 hours under Enhanced and Premium Support agreements.",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Global Reach. Local Presence."
        subtitle="No matter where your operations are, Aegis has the people, facilities, and logistics infrastructure to support your mission. Contact us to learn how our global presence can serve your operational requirements."
        primaryCta="Contact Regional Office"
        primaryHref="/request-demo"
        secondaryCta="Schedule a Visit"
        secondaryHref="/request-demo"
      />
    </>
  );
}
