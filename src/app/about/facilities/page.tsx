"use client";

import {
  SectionHero,
  SplitSection,
  StatsSection,
  FAQSection,
  CTASection,
  AnimatedLine,
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

      {/* ── FACILITY STATS ── */}
      <StatsSection
        label="Global Footprint"
        stats={[
          { value: "4", label: "Facility Locations" },
          { value: "270K+", label: "Square Feet Total" },
          { value: "800+", label: "Employees Worldwide" },
          { value: "TS/SCI", label: "Highest Clearance" },
          { value: "24/7", label: "Operations Center" },
        ]}
      />

      {/* ── 1. ARLINGTON HEADQUARTERS ── */}
      <SplitSection
        image="/images/pages/dc-capitol.jpg"
        label="Headquarters"
        title="Arlington Headquarters"
        description="Aegis headquarters in Arlington, Virginia — just minutes from the Pentagon and Capitol Hill — serves as the nerve center of our global operations. The 85,000 square foot SCIF-accredited facility is cleared to Top Secret/SCI, enabling us to handle the most sensitive customer requirements and classified program work. The building houses executive leadership, program management for all U.S. government contracts, core R&D laboratories, and our 24/7 global support operations center — a continuously staffed facility where trained operators monitor deployed Aegis systems worldwide, coordinate rapid response to technical issues, and provide real-time threat intelligence updates to customers. Our proximity to the U.S. defense establishment ensures that Aegis leadership maintains constant awareness of evolving requirements and policy directions that shape our product roadmap and investment decisions. The Arlington campus also includes a dedicated customer briefing center with secure video teleconferencing, a product demonstration suite, and the primary manufacturing line for Aegis Core and Aegis Shield systems."
        cta="Schedule a Visit"
        ctaHref="/request-demo"
        stats={[
          { value: "85K", label: "Square Feet" },
          { value: "TS/SCI", label: "Facility Clearance" },
          { value: "450", label: "Personnel" },
        ]}
      />

      {/* ── 2. AEGIS ADVANCED ENGINEERING CENTER ── */}
      <SplitSection
        image="/images/pages/defense-antenna.jpg"
        label="Engineering"
        title="Aegis Advanced Engineering Center"
        description="Located in Sterling, Virginia, the Aegis Advanced Engineering Center is our primary test and evaluation facility — a 120,000 square foot complex purpose-built for the rigorous development and validation of counter-UAS hardware and software. The center houses a dedicated radar test range capable of simulating operational detection scenarios against live and simulated UAS targets at ranges up to 15 kilometers. The RF anechoic chamber — one of the largest in the Mid-Atlantic region — enables controlled electromagnetic testing of sensor arrays, antenna systems, and electronic warfare modules in a precisely calibrated environment free from external interference. The directed energy test bay supports integration and validation of high-power microwave and laser-based neutralization systems under controlled conditions. Environmental test chambers subject Aegis hardware to the full spectrum of MIL-STD-810 conditions — including extreme temperature cycling (−51°C to +71°C), altitude simulation up to 40,000 feet, humidity, salt fog, sand and dust, vibration, and shock — ensuring that every system can survive and perform in the harshest operational environments."
        cta="Learn About Our Testing"
        ctaHref="/about/quality"
        reverse
        stats={[
          { value: "120K", label: "Square Feet" },
          { value: "15km", label: "Radar Test Range" },
          { value: "MIL-STD-810", label: "Environmental Testing" },
        ]}
      />

      {/* ── 3. LONDON OFFICE ── */}
      <SplitSection
        image="/images/pages/london-skyline.jpg"
        label="EMEA"
        title="London Office"
        description="Our London office serves as the EMEA regional headquarters, leading business development, customer support, and compliance for all European and NATO customers. The 25,000 square foot facility in London's West End houses the NATO liaison team — a dedicated group responsible for ensuring Aegis systems meet all STANAG interoperability requirements and can be seamlessly integrated into allied command and control architectures. The London team includes regional sales engineers, a NATO compliance group, and an advanced engineering unit focused on European-specific integration requirements, including STANAG 4671 certification testing and European frequency coordination. The facility includes secure briefing rooms and a demonstration suite where European customers can evaluate Aegis capabilities in a controlled environment. The London office also manages our relationships with the UK Ministry of Defence, German Bundeswehr, French DGA, and other European defense ministries — providing the local presence and cultural understanding that are essential for successful international defense partnerships."
        cta="Contact EMEA Office"
        ctaHref="/contact"
        stats={[
          { value: "25K", label: "Square Feet" },
          { value: "NATO", label: "Liaison Team" },
          { value: "65", label: "Personnel" },
        ]}
      />

      {/* ── 4. AEGIS INNOVATION LAB ── */}
      <SplitSection
        image="/images/pages/singapore-marina.jpg"
        label="Research"
        title="Aegis Innovation Lab"
        description="The Aegis Innovation Lab in Tel Aviv is our primary AI/ML research and signal processing R&D center — a 40,000 square foot facility that leverages Israel's world-leading defense technology ecosystem and unmatched operational experience with counter-UAS systems. The lab employs research engineers drawn from elite Israeli defense technology units — including Talpiot, Unit 8200, and the Technion — and maintains close partnerships with Israeli defense companies, academic institutions, and the Israeli Ministry of Defense. The Innovation Lab focuses on three core research areas: next-generation AI and machine learning algorithms for real-time threat classification and autonomous engagement authorization; advanced signal processing techniques for RF detection, direction finding, and emitter characterization in dense electromagnetic environments; and startup partnerships — a structured program that provides Aegis with early access to emerging Israeli defense technologies through equity investments and technology collaboration agreements. Research output from Tel Aviv has contributed to 8 of our 32 patents and has directly enhanced the RF detection and EW capabilities of the Aegis platform."
        cta="Explore Our R&D"
        ctaHref="/about/research-development"
        reverse
        stats={[
          { value: "40K", label: "Square Feet" },
          { value: "8", label: "Patents Contributed" },
          { value: "35", label: "Research Engineers" },
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
              "Yes. Aegis welcomes customer visits to all of our facilities. Arlington headquarters tours include the R&D laboratory, manufacturing floor, and 24/7 operations center. The Sterling Engineering Center offers guided tours of the radar test range, anechoic chamber, and environmental test facilities. International office visits can be arranged through your regional Aegis representative. All visits require advance scheduling and, for classified facilities, appropriate security clearance verification. We recommend scheduling visits at least two weeks in advance.",
          },
          {
            question: "Does Aegis plan to open additional offices?",
            answer:
              "Yes. Aegis is actively evaluating expansion into additional locations based on customer demand and regional threat environments. Current plans include a dedicated office in Tokyo, Japan to serve the growing Japanese defense market, and a regional support center in Canberra, Australia to support Australian Defence Force requirements. We are also evaluating a Pacific test range facility in partnership with allied governments.",
          },
          {
            question: "How does Aegis ensure consistent quality across global facilities?",
            answer:
              "All Aegis facilities operate under the same ISO 9001:2015 quality management system, with standardized processes, procedures, and quality metrics. Manufacturing is centralized at our Arlington production facility to maintain the highest quality standards. Engineering follows a unified development process with shared code repositories, automated testing pipelines, and mandatory peer review. Regional teams follow the same training curriculum and are certified to the same standards as headquarters personnel.",
          },
          {
            question: "Are Aegis facilities secure enough for classified work?",
            answer:
              "Our Arlington headquarters includes a certified SCIF (Sensitive Compartmented Information Facility) cleared to Top Secret/SCI, enabling classified program work and customer engagements at the highest security levels. The Sterling Engineering Center also maintains TS/SCI facility clearance for classified test and evaluation programs. International offices are equipped with secure facilities appropriate to their regional requirements. All facilities comply with NIST SP 800-53 security controls.",
          },
          {
            question: "What testing capabilities are available at the Sterling Engineering Center?",
            answer:
              "The Sterling center offers a comprehensive suite of test capabilities: a 15km radar test range for live detection and tracking exercises, a large RF anechoic chamber for controlled electromagnetic testing, a directed energy test bay for HPM and laser integration, and environmental test chambers covering all 29 categories of MIL-STD-810H — including extreme temperature, altitude, humidity, salt fog, sand/dust, vibration, and shock. These facilities are available for customer-directed testing and witnessed acceptance events.",
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
