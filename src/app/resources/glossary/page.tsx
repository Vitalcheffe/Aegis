"use client";

import { useState, useMemo } from "react";
import {
  SectionHero,
  CTASection,
  TextSection,
  ScrollReveal,
} from "@/components/sections";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const glossaryTerms = [
  {
    term: "Acoustic Sensor",
    definition:
      "A sensor that detects and localizes unmanned aerial systems by analyzing the acoustic signature of propeller motors and rotors. Aegis acoustic arrays use beamforming algorithms to triangulate drone positions from propeller noise, providing a passive detection capability that operates independently of electromagnetic spectrum access.",
  },
  {
    term: "ASTERIX",
    definition:
      "All Purpose STructured EUROCONTROL Surveillance Information Exchange — the standard protocol for exchanging surveillance data between air traffic management systems. Aegis Integrator provides bidirectional ASTERIX translation to share C-UAS track data with existing ATM infrastructure.",
  },
  {
    term: "Behavioral Analysis",
    definition:
      "The AI-driven assessment of drone flight patterns to determine intent — distinguishing between recreational, commercial, surveillance, and hostile flight profiles. The Aegis AI Layer uses transformer models trained on 12 million flight sequences to classify behavioral intent in under 20 milliseconds.",
  },
  {
    term: "C-UAS",
    definition:
      "Counter-Unmanned Aerial System — the defense discipline focused on detecting, identifying, tracking, and neutralizing unauthorized or hostile unmanned aerial vehicles. The term encompasses the complete engagement cycle from initial detection through threat neutralization and post-engagement assessment.",
  },
  {
    term: "CUI",
    definition:
      "Controlled Unclassified Information — information that requires safeguarding or dissemination controls pursuant to federal law, regulations, or government-wide policies, but does not meet the classification requirements of Executive Order 13526. Aegis systems handle CUI in compliance with NIST SP 800-171 requirements.",
  },
  {
    term: "Cognitive EW",
    definition:
      "Electronic warfare systems that use machine learning to adapt jamming and spoofing parameters in real time based on observed target behavior. Aegis cognitive EW technology automatically selects optimal jamming waveforms, power levels, and frequency assignments to maximize disruption while minimizing collateral electromagnetic effects.",
  },
  {
    term: "Common Operating Picture (COP)",
    definition:
      "A unified, real-time display of all detected and tracked objects within the Aegis coverage area, showing position, classification, intent assessment, and engagement status. The COP is shared across all operator stations and networked Aegis Command platforms for coordinated defense operations.",
  },
  {
    term: "DCS",
    definition:
      "Defense Communications System — the composite of all defense communication facilities and systems operated or controlled by the U.S. Department of Defense. Aegis systems interface with DCS infrastructure through STANAG-compliant protocols and encrypted tactical data links.",
  },
  {
    term: "Direction Finding (DF)",
    definition:
      "The process of determining the bearing of an RF emitter using an array of spatially distributed antennas. Aegis DF arrays use correlative interferometry to achieve bearing accuracy better than 2° RMS across the 20 MHz to 6 GHz frequency range, enabling precise geolocation of drone control signals.",
  },
  {
    term: "Directed Energy Weapon (DEW)",
    definition:
      "A weapon system that uses concentrated electromagnetic energy — including high-energy lasers and high-power microwaves — to neutralize targets. The Aegis 2025 architecture includes a 50 kW HEL for precision neutralization and an HPM system for area denial against swarm attacks.",
  },
  {
    term: "EAR",
    definition:
      "Export Administration Regulations — U.S. Department of Commerce regulations that control the export of dual-use items not covered by ITAR. Certain Aegis subsystems and technologies may be subject to EAR licensing requirements for international transfer, depending on the specific component and destination country.",
  },
  {
    term: "Electronic Attack (EA)",
    definition:
      "The offensive component of electronic warfare that uses electromagnetic energy to degrade, disrupt, or destroy adversary capabilities. In the C-UAS context, EA includes jamming of drone control links, GPS spoofing, and electromagnetic pulse generation to disable onboard electronics.",
  },
  {
    term: "Electronic Warfare (EW)",
    definition:
      "Military operations involving the electromagnetic spectrum — including electronic attack, electronic protection, and electronic warfare support. In counter-UAS, EW is the primary non-kinetic neutralization mechanism, providing graduated response options from signal disruption through platform disablement.",
  },
  {
    term: "EO/IR",
    definition:
      "Electro-Optical / Infrared — camera sensors that provide visual and thermal imaging for drone detection and identification. Aegis EO/IR payloads combine daylight cameras with cooled mid-wave infrared sensors for 24/7 visual identification capability, achieving classification accuracy exceeding 95% against known drone types.",
  },
  {
    term: "FIPS 140-2",
    definition:
      "Federal Information Processing Standard 140-2 — the U.S. government standard for cryptographic module security. Aegis uses FIPS 140-2 validated modules for all encryption operations, including inter-component communication, data storage, and secure boot chain verification.",
  },
  {
    term: "FMS",
    definition:
      "Foreign Military Sales — the U.S. government program through which approved defense articles and services are transferred to friendly foreign governments. Aegis international sales to allied nations are typically processed through the FMS program, with the Defense Security Cooperation Agency managing the government-to-government agreements.",
  },
  {
    term: "FPV",
    definition:
      "First-Person View — a drone operation mode where the operator receives a live video feed from an onboard camera, enabling precision maneuvering and targeting. FPV drones have emerged as a significant threat category, particularly in loitering munition and kamikaze attack configurations, and require specific classification models within the Aegis AI Layer.",
  },
  {
    term: "Frequency Hopping Spread Spectrum (FHSS)",
    definition:
      "A signal transmission technique where the carrier frequency rapidly hops across a wide band of frequencies according to a pseudo-random sequence. Some modern drone control links use FHSS to evade detection and jamming. Aegis cognitive RF subsystems detect and track FHSS signals by monitoring wide instantaneous bandwidth up to 2 GHz.",
  },
  {
    term: "GPS Spoofing",
    definition:
      "The transmission of counterfeit GPS signals to manipulate a drone's navigation system, redirecting it to a designated safe zone or forcing it to land. Aegis GPS spoofing transmitters generate geographically consistent spoofed signals that override the drone's legitimate GPS receiver, achieving redirection within 1-3 seconds.",
  },
  {
    term: "Graduated Response",
    definition:
      "A force escalation framework that applies proportionate countermeasures based on the assessed threat level — from non-kinetic soft-kill (jamming, spoofing) through kinetic hard-kill to directed energy engagement. Aegis graduated response ensures compliance with rules of engagement while maintaining effective threat neutralization.",
  },
  {
    term: "Hard-Kill",
    definition:
      "The physical destruction of an unmanned aerial system through kinetic means — including interceptor drones, net capture systems, and projectile weapons. Aegis hard-kill options are reserved for high-threat engagements where non-kinetic measures are insufficient or inappropriate given the assessed threat level.",
  },
  {
    term: "HEL",
    definition:
      "High-Energy Laser — a directed energy weapon that uses a concentrated beam of light to damage or destroy targets through thermal effects. The Aegis 50 kW HEL provides sub-second neutralization of drones at ranges up to 3 km, with an effectively unlimited magazine constrained only by electrical power supply.",
  },
  {
    term: "HPM",
    definition:
      "High-Power Microwave — a directed energy weapon that emits short-duration, high-intensity electromagnetic pulses to disable electronic components. Aegis HPM provides area denial capability against swarm attacks, neutralizing multiple drones simultaneously within a defined radius without requiring individual targeting.",
  },
  {
    term: "IMM-UKF",
    definition:
      "Iterated Multi-Model Unscented Kalman Filter — the mathematical framework used by the Aegis Fusion Layer to correlate observations from multiple sensor modalities into unified, high-confidence tracks. The IMM-UKF handles maneuvering targets, sensor handoffs, and conflicting observations with sub-meter positional accuracy.",
  },
  {
    term: "ITAR",
    definition:
      "International Traffic in Arms Regulations — U.S. government regulations administered by the Department of State that control the export and import of defense-related articles and services. All Aegis products are ITAR-controlled and require appropriate export authorization for international deployment.",
  },
  {
    term: "JADC2",
    definition:
      "Joint All-Domain Command and Control — the U.S. Department of Defense concept for connecting sensors from all military services into a single network to enable faster, more informed decision-making. Aegis Integrator supports JADC2 data exchange standards, enabling C-UAS sensor data to feed into the joint all-domain operating picture.",
  },
  {
    term: "Jamming",
    definition:
      "The deliberate transmission of electromagnetic energy to disrupt or deny an adversary's use of the electromagnetic spectrum. Aegis precision jamming targets specific drone communication frequencies and protocols, disrupting control links without affecting friendly communications or civilian infrastructure.",
  },
  {
    term: "Kill Chain",
    definition:
      "The complete sequence of events in a counter-UAS engagement: detect → classify → track → decide → engage → assess. The Aegis Architecture closes this chain in under 20 milliseconds for the decision loop, making it the fastest integrated C-UAS system in production.",
  },
  {
    term: "Kinetic Interdiction",
    definition:
      "The physical neutralization of a drone threat through force — including interceptor drones, net capture systems, projectile weapons, and collision-based engagement. Kinetic interdiction is the highest escalation level in the Aegis graduated response framework, reserved for confirmed hostile threats that cannot be neutralized by non-kinetic means.",
  },
  {
    term: "Link 16",
    definition:
      "NATO standardized tactical data link that provides secure, jam-resistant exchange of real-time tactical data between military platforms. Aegis Integrator supports Link 16 message formatting for integration with allied air defense networks and joint force C2 systems.",
  },
  {
    term: "Loitering Munition",
    definition:
      "An unmanned aerial vehicle that circles or loiters over a target area for an extended period before engaging, combining reconnaissance and strike capabilities in a single platform. Loitering munitions represent one of the most challenging C-UAS threats due to their small radar cross section, low flight altitude, and autonomous terminal guidance. Aegis classification models specifically identify loitering munition flight profiles and prioritize them for immediate engagement.",
  },
  {
    term: "MIL-STD-810",
    definition:
      "U.S. Department of Defense test method standard for environmental engineering considerations and laboratory tests, covering conditions including temperature extremes, humidity, shock, vibration, altitude, and salt fog. All Aegis hardware is qualified to MIL-STD-810H environmental requirements, ensuring reliable operation from Arctic to desert environments.",
  },
  {
    term: "Modbus",
    definition:
      "A serial communication protocol widely used in industrial automation for connecting electronic devices. Aegis Integrator supports Modbus TCP/IP for integration with existing facility management and industrial control systems at critical infrastructure sites, enabling C-UAS status to be monitored alongside building security and environmental systems.",
  },
  {
    term: "MOSA",
    definition:
      "Modular Open Systems Architecture — a design approach that uses well-defined interfaces and standard protocols to enable rapid integration of new components without modifying the core platform. Aegis MOSA compliance enables third-party sensor and effector integration through standard adapter modules.",
  },
  {
    term: "Neural Processing Unit (NPU)",
    definition:
      "A purpose-built AI inference accelerator designed by Aegis that delivers 175 TOPS of classification throughput while consuming less than 400 watts. The NPU uses a heterogeneous computing architecture with dedicated tensor cores, programmable vector units, and deterministic real-time scheduling.",
  },
  {
    term: "ONVIF",
    definition:
      "Open Network Video Interface Forum — the global standard for IP-based video surveillance products. Aegis Integrator supports ONVIF profiles for seamless integration with existing CCTV and security camera infrastructure, enabling these cameras to serve as supplementary EO/IR sensors for the C-UAS system.",
  },
  {
    term: "Phased Array Radar",
    definition:
      "A radar system that uses an array of antenna elements with electronically controlled phase shifts to steer the beam without mechanical movement. Aegis S-Band phased array radar provides simultaneous detection and tracking of 500+ targets with 360° coverage and beam steering in microseconds.",
  },
  {
    term: "Radar Cross Section (RCS)",
    definition:
      "A measure of how detectable an object is by radar, expressed as the area of a theoretical perfect reflector that would return the same signal strength. Small drones have RCS values as low as 0.001 m², compared to 1-5 m² for a fighter aircraft. Aegis radar achieves detection thresholds 40 dB below legacy air defense systems specifically to detect these low-RCS targets.",
  },
  {
    term: "RF Fingerprinting",
    definition:
      "The technique of identifying a specific drone model — and in some cases an individual unit — by analyzing the unique characteristics of its RF emissions, including carrier frequency stability, modulation quality, spectral regrowth, and transient response. Aegis maintains a library of 12 million+ RF fingerprints for drone identification.",
  },
  {
    term: "RF Jamming",
    definition:
      "The transmission of electromagnetic energy on the frequencies used by drone control links and navigation systems to disrupt communication between the operator and the platform. Aegis precision RF jamming targets specific drone communication protocols while avoiding interference with friendly communications, emergency services, and civilian infrastructure.",
  },
  {
    term: "RF Sensing",
    definition:
      "The detection and analysis of radio frequency emissions from drone communication links, navigation systems, and onboard electronics. Aegis passive RF sensing covers 20 MHz to 6 GHz with direction-finding accuracy better than 2° RMS, detecting drones before they become airborne by identifying controller-to-drone link activity.",
  },
  {
    term: "RPAS",
    definition:
      "Remotely Piloted Aircraft System — the ICAO-preferred term for unmanned aerial systems, encompassing the remotely piloted aircraft, the remote pilot station, the command and control link, and any other elements required for flight operations. The term is commonly used in civilian and regulatory contexts; Aegis documentation uses RPAS when referring to ICAO and EASA regulatory frameworks.",
  },
  {
    term: "SCIF",
    definition:
      "Sensitive Compartmented Information Facility — an accredited area, room, or installation where classified information can be stored, discussed, or processed with protection against electronic and physical surveillance. Aegis deployment planning and system design documentation are typically handled within SCIF environments due to the classified nature of operational requirements.",
  },
  {
    term: "Sensor Fusion",
    definition:
      "The process of combining observations from multiple sensor types — radar, RF, EO/IR, acoustic — into a unified, coherent operational picture that is more accurate and reliable than any single sensor modality alone. Aegis sensor fusion achieves 98.9% classification accuracy versus 78.3% for radar-only approaches.",
  },
  {
    term: "SINCGARS",
    definition:
      "Single Channel Ground and Airborne Radio System — the standard tactical radio system used by U.S. and allied military forces. Aegis Integrator supports SINCGARS interface for voice and data communication with tactical units operating Aegis systems in the field.",
  },
  {
    term: "Soft-Kill",
    definition:
      "Non-kinetic neutralization of a drone threat using electromagnetic means — jamming, spoofing, or electromagnetic pulse — without physically destroying the platform. Soft-kill is the preferred first response in the Aegis graduated response framework, minimizing collateral effects and preserving evidence for forensic analysis.",
  },
  {
    term: "STANAG 4586",
    definition:
      "NATO Standardization Agreement defining standard interfaces for UAV control systems, enabling interoperability between different nations' UAV platforms and control stations. Aegis supports STANAG 4586 interfaces for sensor data exchange with allied C-UAS and air defense networks.",
  },
  {
    term: "STANAG 4671",
    definition:
      "NATO Standardization Agreement defining the airworthiness requirements for UAV systems operating in military airspace. Aegis Tactical is the first man-portable C-UAS system certified under STANAG 4671, validating interoperability with allied C2 networks and compliance with rules-of-engagement frameworks.",
  },
  {
    term: "STANAG 4676",
    definition:
      "NATO Standardization Agreement defining the data exchange format for C-UAS command and control information. Aegis Command uses STANAG 4676 for track data sharing, engagement coordination, and rules of enforcement synchronization across distributed defense networks.",
  },
  {
    term: "Swarm",
    definition:
      "A coordinated group of unmanned aerial systems operating together under shared command to achieve a common objective — typically overwhelming a defense system through sheer numbers. Swarms may include command nodes, reconnaissance platforms, and strike elements, and represent the most challenging C-UAS threat scenario. The Aegis Swarm Resolution Algorithm uses graph neural networks to decompose swarms into individual tracks with prioritized engagement assignments.",
  },
  {
    term: "TOPS",
    definition:
      "Tera Operations Per Second — a measure of AI inference performance, specifically the number of trillion operations a processor can execute per second. The Aegis Neural Processing Unit delivers 175 TOPS of classification throughput, enabling real-time threat classification across all sensor modalities with deterministic latency guarantees.",
  },
  {
    term: "Track Custody",
    definition:
      "The sustained monitoring of a detected object from initial acquisition through engagement and assessment. Aegis maintains firm track custody on detected threats even when individual sensors are degraded or denied, through the Fusion Layer's ability to hand off tracking between sensor modalities seamlessly.",
  },
  {
    term: "UAS",
    definition:
      "Unmanned Aerial System — the complete system comprising the unmanned aerial vehicle, ground control station, communication links, and support equipment. The term UAS is preferred over drone in professional and regulatory contexts, as it encompasses the full operational system rather than just the airborne platform.",
  },
  {
    term: "UAV",
    definition:
      "Unmanned Aerial Vehicle — the airborne component of an unmanned aerial system, also commonly referred to as a drone. UAVs range from hand-launched micro-drones weighing less than 250 grams to medium-altitude long-endurance platforms with wingspans exceeding 20 meters. Aegis detects and classifies all UAV categories across the full size and performance spectrum.",
  },
  {
    term: "Zero-Trust Architecture",
    definition:
      "A security model where every component — hardware, software, and network — authenticates and authorizes every interaction, regardless of whether it originates inside or outside the network perimeter. Aegis zero-trust architecture provides Common Criteria EAL4+ certified protection against cyber threats, with unique cryptographic identities for every system component and encrypted inter-component communication with perfect forward secrecy.",
  },
];

const ALL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return glossaryTerms;
    const q = searchQuery.toLowerCase().trim();
    return glossaryTerms.filter(
      (item) =>
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const grouped = useMemo(() => {
    return filteredTerms.reduce(
      (acc, item) => {
        const letter = item.term[0].toUpperCase();
        if (!acc[letter]) acc[letter] = [];
        acc[letter].push(item);
        return acc;
      },
      {} as Record<string, typeof glossaryTerms>
    );
  }, [filteredTerms]);

  const activeLetters = useMemo(() => {
    return new Set(Object.keys(grouped));
  }, [grouped]);

  const scrollToLetter = (letter: string) => {
    const el = document.getElementById(`letter-${letter}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <SectionHero
        image="/images/resources/faq.jpg"
        label="Resources"
        title="Counter-UAS Glossary"
        subtitle="Definitions for 40+ specialized terms in counter-UAS technology, radar engineering, electronic warfare, and defense procurement."
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="Reference Guide">
        <p>
          The counter-UAS domain draws on expertise from radar engineering, signal intelligence, electronic warfare, artificial intelligence, and military operations — each discipline contributing its own specialized terminology. This glossary provides clear, authoritative definitions for the terms you will encounter when evaluating, deploying, and operating Aegis defense systems. Each definition is written by our engineering team and reflects the specific meaning of the term within the counter-UAS context, which may differ from its usage in other domains.
        </p>
        <p>
          Terms are organized alphabetically for quick reference. Use the letter navigation to jump to a specific section, or the search field to filter by term or keyword. Where a term has a specific Aegis implementation or capability associated with it, the definition includes the relevant performance specification or product reference. For more detailed technical information on any term, consult the related white paper or technology page linked from our resources library.
        </p>
      </TextSection>

      {/* Search + Letter Navigation */}
      <section className="py-12 bg-black border-y border-white/10 sticky top-0 z-30">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          {/* Search Input */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
              <input
                type="text"
                placeholder="Search terms and definitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111] border border-[#222] text-white pl-10 pr-4 py-3 text-sm placeholder:text-[#767676] focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>
          {/* Letter Nav */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {ALL_LETTERS.map((letter) => {
                const isActive = activeLetters.has(letter);
                return (
                  <button
                    key={letter}
                    onClick={() => isActive && scrollToLetter(letter)}
                    disabled={!isActive}
                    className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-sm font-medium transition-colors ${
                      isActive
                        ? "border border-[#222] text-white hover:bg-white hover:text-black cursor-pointer"
                        : "border border-white/5 text-white/20 cursor-default"
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Glossary Sections */}
      <AnimatePresence mode="wait">
        {Object.keys(grouped).length === 0 ? (
          <motion.section
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-28 bg-black"
          >
            <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20 text-center">
              <p className="text-[#767676] text-lg">
                No terms found matching &ldquo;{searchQuery}&rdquo;
              </p>
            </div>
          </motion.section>
        ) : (
          <motion.div key="results">
            {Object.keys(grouped)
              .sort()
              .map((letter) => (
                <section
                  key={letter}
                  id={`letter-${letter}`}
                  className="py-20 md:py-28 bg-black border-t border-white/10"
                >
                  <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
                    <ScrollReveal>
                      <div className="mb-12">
                        <span className="text-[clamp(3rem,8vw,6rem)] font-bold text-white/10 leading-none">
                          {letter}
                        </span>
                      </div>
                    </ScrollReveal>
                    <div className="space-y-0">
                      {grouped[letter].map((item, i) => (
                        <ScrollReveal key={item.term} delay={i * 40}>
                          <div className="border-t border-white/10 py-8 md:py-10 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-12">
                            <h3 className="text-lg font-bold text-white tracking-tight">
                              {item.term}
                            </h3>
                            <p className="text-[#b9b9b9] text-base leading-relaxed">
                              {item.definition}
                            </p>
                          </div>
                        </ScrollReveal>
                      ))}
                      <div className="border-t border-white/10" />
                    </div>
                  </div>
                </section>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection
        title="Need More Information?"
        subtitle="Our engineering team is available for technical consultations on any term or concept covered in this glossary — and many that are not."
        primaryCta="Contact Engineering"
        primaryHref="/request-demo"
        secondaryCta="Explore Technology"
        secondaryHref="/technology"
      />
    </>
  );
}
