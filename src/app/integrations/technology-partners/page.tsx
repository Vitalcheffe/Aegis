"use client";

import {
  SectionHero,
  TextSection,
  CardGrid,
  FeatureList,
  FAQSection,
  CTASection,
  AnimatedLine,
} from "@/components/sections";

export default function TechnologyPartnersPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/partners-hero.jpg"
        label="Technology Partners"
        title="Built on the Best"
        subtitle="Aegis technology partners represent the world's leading defense electronics, sensor, and software companies. Together, we deliver integrated counter-UAS capabilities that no single vendor could achieve alone."
        cta="Become a Partner"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── OVERVIEW ── */}
      <TextSection label="Overview" title="The Power of Partnership">
        <p>
          The counter-UAS challenge spans every domain of defense technology — from radar signal processing and electro-optical imaging to electronic warfare and command-and-control networking. No single company possesses world-class capabilities across all of these disciplines simultaneously. That is why Aegis has built the most comprehensive technology partnership ecosystem in the counter-UAS industry, spanning 35+ companies across four continents and covering every layer of the detect-track-classify-neutralize kill chain.
        </p>
        <p>
          Our technology partnerships are not marketing arrangements. Each partnership involves dedicated engineering teams from both organizations working together on joint development, integration testing, and field validation. We maintain shared labs, conduct regular interoperability exercises, and co-invest in next-generation capabilities that neither company could develop independently. The result is a portfolio of pre-certified integrations that work reliably from day one — no custom middleware, no integration surprises, no deployment delays.
        </p>
        <p>
          When you deploy an Aegis system, you are not just getting our technology. You are getting the collective capability of the world's most advanced defense electronics ecosystem, purpose-integrated and validated to work together as a single, cohesive counter-UAS platform. That is the Aegis advantage, and it is only possible through deep, sustained technology partnership.
        </p>
      </TextSection>

      {/* ── RADAR VENDORS ── */}
      <CardGrid
        label="Radar Vendors"
        title="Radar & Surveillance Partners"
        cards={[
          {
            title: "Thales Ground Master",
            description:
              "Thales Ground Master family of surveillance radars provides long-range air surveillance with exceptional low-RCS detection performance. Aegis integrates with the GM200 and GM400 variants through the Thales AESA data interface, enabling seamless fusion of Thales radar tracks into the Aegis common operational picture. Joint development has produced enhanced clutter rejection algorithms optimized for urban counter-UAS scenarios, reducing false alarm rates by 60% in complex terrain. The partnership spans 8 allied nations operating Aegis alongside Thales radar systems.",
            image: "/images/pages/radar-installation.jpg",
            tag: "Radar",
          },
          {
            title: "Lockheed Martin AN/TPQ-53",
            description:
              "The AN/TPQ-53 counterfire target acquisition radar provides medium-range surveillance and fire source detection capabilities. Aegis integration with the TPQ-53 extends the radar's utility beyond counterfire into the counter-UAS mission, leveraging its advanced signal processing and high update rates to detect and track small unmanned aircraft. The joint integration was validated during U.S. Army Network Integration Evaluation exercises and is now deployed at multiple forward operating bases in CENTCOM's area of responsibility.",
            image: "/images/pages/airdefense-radar.jpg",
            tag: "Radar",
          },
          {
            title: "Israel Aerospace Industries ELTA",
            description:
              "IAI ELTA's EL/M-2084 multi-mission radar provides air surveillance, artillery locating, and counter-UAS detection in a single sensor package. Aegis integrates with the ELTA sensor suite through the IAI standard data link protocol, enabling dual-use radar coverage that serves both air defense and counter-UAS missions simultaneously. The partnership includes joint development of drone-specific waveform libraries and enhanced micro-Doppler classification algorithms for rotary-wing UAS identification.",
            image: "/images/pages/radar-scope.jpg",
            tag: "Radar",
          },
          {
            title: "Saab Giraffe AMB",
            description:
              "Saab's Giraffe Agile Multi-Beam radar provides medium-range 3D surveillance with simultaneous air and surface target tracking. Aegis integration with the Giraffe AMB leverages Saab's unique multi-beam architecture to achieve high track update rates on maneuvering UAS targets, enabling earlier classification and faster engagement decisions. The partnership includes co-development of enhanced drone detection modes optimized for the Giraffe platform's signal processing capabilities.",
            image: "/images/pages/detection-radar.jpg",
            tag: "Radar",
          },
        ]}
      />

      {/* ── EO/IR MANUFACTURERS ── */}
      <CardGrid
        label="EO/IR"
        title="Electro-Optical & Infrared Partners"
        cards={[
          {
            title: "FLIR (Teledyne FLIR)",
            description:
              "Teledyne FLIR provides stabilized electro-optical and infrared imaging systems for Aegis visual confirmation and persistent tracking. Integration with the FLIR Ranger series enables automatic slew-to-cue from Aegis sensor fusion tracks, AI-assisted visual classification of UAS types, and high-resolution imagery recording for rules-of-engagement documentation. The FLIR integration supports both cooled and uncooled IR sensors, providing 24/7 visual coverage across all weather and lighting conditions.",
            image: "/images/pages/detection-eoir.jpg",
            tag: "EO/IR",
          },
          {
            title: "Rafael Spike EO",
            description:
              "Rafael Advanced Defense Systems provides electro-optical payloads originally developed for the Spike missile family, repurposed for counter-UAS surveillance and visual tracking. The Spike EO integration delivers exceptional long-range imaging performance with continuous zoom, automatic target tracking, and multi-spectral imaging across visible, near-IR, and mid-wave IR bands. Aegis operators can initiate visual confirmation sequences directly from the track display with a single click.",
            image: "/images/pages/surveillance-cam.jpg",
            tag: "EO/IR",
          },
          {
            title: "Hensoldt ZEFFIR",
            description:
              "Hensoldt's ZEFFIR thermal imaging system provides passive infrared detection and tracking of UAS at ranges exceeding 5 kilometers. The ZEFFIR integration adds a passive detection layer to the Aegis sensor fusion architecture, enabling counter-UAS operations in electromagnetic silence where active radar emissions may be restricted or contested. The partnership includes joint development of passive triangulation algorithms that enable 3D track generation from multiple ZEFFIR sensors without any active emission.",
            image: "/images/pages/detection-sensor.jpg",
            tag: "EO/IR",
          },
        ]}
      />

      {/* ── EW PROVIDERS ── */}
      <FeatureList
        label="Electronic Warfare"
        title="EW & Non-Kinetic Effector Partners"
        items={[
          {
            title: "Dedrone by Axon",
            description:
              "Dedrone by Axon provides RF-based drone detection and classification through their proprietary RF sensor network and signature database. Aegis integrates with Dedrone sensors to add an RF detection layer to the multi-spectral fusion architecture, enabling detection of UAS before takeoff through controller emission monitoring. The partnership extends to coordinated RF jamming through the Dedrone Defender module, enabling graduated non-kinetic response within the Aegis engagement framework. Joint deployments across 6 countries have demonstrated a combined detection probability exceeding 99.2% for commercially available drone types.",
            tag: "RF Detection",
          },
          {
            title: "Raytheon Excalibur EW",
            description:
              "Raytheon's Excalibur electronic warfare system provides high-power directed RF jamming capable of disrupting UAS command links, navigation systems, and payload control channels at ranges exceeding 10 kilometers. Aegis integration with Excalibur EW enables automated target handoff from Aegis track data to Excalibur beam steering, achieving sub-second engagement timelines for non-kinetic neutralization. The partnership includes joint development of adaptive jamming waveforms that defeat frequency-hopping and encrypted UAS communication protocols.",
            tag: "High-Power EW",
          },
          {
            title: "Blighter Surveillance Systems",
            description:
              "Blighter provides the A400 Series air security radar and the Auds counter-UAS system, which combines radar detection with EO/IR tracking and RF inhibition in an integrated package. Aegis integrates with the full Auds system as both a sensor source and an effector, enabling the Auds RF inhibitor to be managed within the Aegis graduated response framework. The partnership allows customers with existing Auds deployments to upgrade to full Aegis fusion and C2 capability without replacing their Blighter hardware investment.",
            tag: "Integrated C-UAS",
          },
        ]}
      />

      {/* ── C2 PLATFORMS ── */}
      <CardGrid
        label="Command & Control"
        title="C2 Platform Integration Partners"
        cards={[
          {
            title: "Northrop Grumman JADC2",
            description:
              "Aegis integrates with Northrop Grumman's Joint All-Domain Command and Control architecture, providing counter-UAS track data and engagement status to the joint force common operational picture. The integration enables Aegis sensor data to be consumed by any JADC2-connected platform, from tactical operations centers to airborne battle management systems, extending counter-UAS situational awareness across the entire joint force.",
            image: "/images/pages/c2-operations.jpg",
            tag: "JADC2",
          },
          {
            title: "Raytheon BMD C2",
            description:
              "Raytheon's Ballistic Missile Defense Command and Control system provides the strategic-level battle management framework for integrated air and missile defense. Aegis feeds classified counter-UAS track data into the BMD C2 architecture, ensuring that drone threats are visible to commanders operating at the theater and strategic levels. The integration was validated during joint U.S.-allied exercises in the Pacific and European theaters.",
            image: "/images/pages/command-operations.jpg",
            tag: "BMD",
          },
          {
            title: "Lockheed Martin Aegis Combat System",
            description:
              "The Lockheed Martin Aegis Combat System is the world's most widely deployed naval combat system. Aegis Defense Systems' counter-UAS capability integrates directly with the Aegis Combat System through a co-developed data bridge, providing naval commanders with a unified air picture that includes both conventional air and missile threats and small UAS detections. The integration extends the Aegis Combat System's protective umbrella into the low-altitude, low-RCS regime where traditional naval radars have limited performance.",
            image: "/images/pages/naval-warship.jpg",
            tag: "Naval",
          },
        ]}
      />

      {/* ── FAQ ── */}
      <FAQSection
        label="Partnership Questions"
        title="Technology Partner FAQ"
        items={[
          {
            question: "How does my company become an Aegis technology partner?",
            answer:
              "Technology partnerships begin with a technical evaluation of interoperability between your product and the Aegis platform. Our integration team will conduct a feasibility assessment, define an integration scope, and establish a joint development plan. Typical partnerships involve a 3-6 month integration phase followed by validation testing and certification. Contact our partnership team through the request form to initiate the process.",
          },
          {
            question: "What are the technical requirements for integration?",
            answer:
              "Aegis accepts sensor data via standard IP-based network protocols, serial interfaces, and tactical data links. We provide a detailed Integration Specification Document (ISD) that describes data formats, timing requirements, and interface protocols. For C2 integrations, we support STANAG 4586, Link 16, and custom message formats through our adapter framework. All integrations must pass our interoperability validation suite before certification.",
          },
          {
            question: "Do technology partners receive Aegis SDK access?",
            answer:
              "Yes. All certified technology partners receive full access to the Aegis SDK, including client libraries, API documentation, integration test tools, and a dedicated partner support channel. Partners also receive early access to pre-release Aegis software versions for integration testing and validation before general availability.",
          },
          {
            question: "How are joint integrations maintained over time?",
            answer:
              "Aegis maintains a partner integration testing lab where certified integrations are regression-tested against every new Aegis software release. Partners receive pre-release builds 90 days before general availability, ensuring that any compatibility issues are identified and resolved before customer deployment. Our partner engineering team provides ongoing technical support and conducts annual integration reviews.",
          },
          {
            question: "Can partners co-develop new capabilities with Aegis?",
            answer:
              "Absolutely. Many of our most innovative capabilities emerged from joint development with technology partners. We maintain co-development agreements with 12 partners, covering areas such as AI-based sensor processing, novel effector integration, and next-generation networking protocols. Co-development projects are governed by joint IP agreements and typically produce capabilities that benefit both partner and Aegis customers.",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Join the Ecosystem"
        subtitle="Whether you build radars, cameras, jammers, or command systems — Aegis offers partnership models that amplify your technology's reach and impact."
        primaryCta="Apply for Partnership"
        primaryHref="/request-demo"
        secondaryCta="Explore Compatibility"
        secondaryHref="/integrations/compatibility"
      />
    </>
  );
}
