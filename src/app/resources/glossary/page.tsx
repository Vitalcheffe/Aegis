"use client";

import {
  SectionHero,
  CTASection,
  TextSection,
  ScrollReveal,
} from "@/components/sections";

const glossaryTerms = [
  {
    term: "Acoustic Sensor",
    definition:
      "A sensor that detects and localizes unmanned aerial systems by analyzing the acoustic signature of propeller motors and rotors. Aegis acoustic arrays use beamforming algorithms to triangulate drone positions from propeller noise, providing a passive detection capability that operates independently of electromagnetic spectrum access.",
  },
  {
    term: "ASTRIX",
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
    term: "Frequency Hopping Spread Spectrum (FHSS)",
    definition:
      "A signal transmission technique where the carrier frequency rapidly hops across a wide band of frequencies according to a pseudo-random sequence. Some modern drone control links use FHSS to evade detection and jamming. Aegis cognitive RF subsystems detect and track FHSS signals by monitoring wide instantaneous bandwidth.",
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
    term: "High-Energy Laser (HEL)",
    definition:
      "A directed energy weapon that uses a concentrated beam of light to damage or destroy targets through thermal effects. The Aegis 50 kW HEL provides sub-second neutralization of drones at ranges up to 3 km, with an effectively unlimited magazine constrained only by electrical power supply.",
  },
  {
    term: "High-Power Microwave (HPM)",
    definition:
      "A directed energy weapon that emits short-duration, high-intensity electromagnetic pulses to disable electronic components. Aegis HPM provides area denial capability against swarm attacks, neutralizing multiple drones simultaneously within a defined radius without requiring individual targeting.",
  },
  {
    term: "IMM-UKF",
    definition:
      "Iterated Multi-Model Unscented Kalman Filter — the mathematical framework used by the Aegis Fusion Layer to correlate observations from multiple sensor modalities into unified, high-confidence tracks. The IMM-UKF handles maneuvering targets, sensor handoffs, and conflicting observations with sub-meter positional accuracy.",
  },
  {
    term: "ITAR",
    definition:
      "International Traffic in Arms Regulations — U.S. government regulations that control the export and import of defense-related articles and services. All Aegis products are ITAR-controlled and require appropriate export authorization for international deployment.",
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
    term: "Phased Array Radar",
    definition:
      "A radar system that uses an array of antenna elements with electronically controlled phase shifts to steer the beam without mechanical movement. Aegis S-Band phased array radar provides simultaneous detection and tracking of 500+ targets with 360° coverage and beam steering in microseconds.",
  },
  {
    term: "RF Fingerprinting",
    definition:
      "The technique of identifying a specific drone model — and in some cases an individual unit — by analyzing the unique characteristics of its RF emissions, including carrier frequency stability, modulation quality, spectral regrowth, and transient response. Aegis maintains a library of 12 million+ RF fingerprints for drone identification.",
  },
  {
    term: "Sensor Fusion",
    definition:
      "The process of combining observations from multiple sensor types — radar, RF, EO/IR, acoustic — into a unified, coherent operational picture that is more accurate and reliable than any single sensor modality alone. Aegis sensor fusion achieves 98.9% classification accuracy versus 78.3% for radar-only approaches.",
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
    term: "STANAG 4676",
    definition:
      "NATO Standardization Agreement defining the data exchange format for C-UAS command and control information. Aegis Command uses STANAG 4676 for track data sharing, engagement coordination, and rules of enforcement synchronization across distributed defense networks.",
  },
  {
    term: "Swarm Detection",
    definition:
      "The capability to identify coordinated multi-platform drone attacks characterized by correlated trajectories, synchronized timing, and coordinated communication patterns. The Aegis AI Layer uses graph neural networks to model inter-drone relationships within a swarm, identifying command nodes and strike elements.",
  },
  {
    term: "Track Custody",
    definition:
      "The sustained monitoring of a detected object from initial acquisition through engagement and assessment. Aegis maintains firm track custody on detected threats even when individual sensors are degraded or denied, through the Fusion Layer's ability to hand off tracking between sensor modalities seamlessly.",
  },
  {
    term: "Zero-Trust Architecture",
    definition:
      "A security model where every component — hardware, software, and network — authenticates and authorizes every interaction, regardless of whether it originates inside or outside the network perimeter. Aegis zero-trust architecture provides Common Criteria EAL4+ certified protection against cyber threats.",
  },
];

export default function GlossaryPage() {
  const grouped = glossaryTerms.reduce(
    (acc, item) => {
      const letter = item.term[0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(item);
      return acc;
    },
    {} as Record<string, typeof glossaryTerms>
  );

  const letters = Object.keys(grouped).sort();

  return (
    <>
      <SectionHero
        image="/images/resources/faq.jpg"
        label="Resources"
        title="Counter-UAS Glossary"
        subtitle="Definitions for 30+ specialized terms in counter-UAS technology, radar engineering, electronic warfare, and defense procurement."
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="Reference Guide">
        <p>
          The counter-UAS domain draws on expertise from radar engineering, signal intelligence, electronic warfare, artificial intelligence, and military operations — each discipline contributing its own specialized terminology. This glossary provides clear, authoritative definitions for the terms you will encounter when evaluating, deploying, and operating Aegis defense systems. Each definition is written by our engineering team and reflects the specific meaning of the term within the counter-UAS context, which may differ from its usage in other domains.
        </p>
        <p>
          Terms are organized alphabetically for quick reference. Where a term has a specific Aegis implementation or capability associated with it, the definition includes the relevant performance specification or product reference. For more detailed technical information on any term, consult the related white paper or technology page linked from our resources library.
        </p>
      </TextSection>

      {/* Letter Navigation */}
      <section className="py-12 bg-black border-y border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {letters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-10 h-10 flex items-center justify-center border border-white/10 text-white text-sm font-medium hover:bg-white hover:text-black transition-colors"
                >
                  {letter}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Glossary Sections */}
      {letters.map((letter) => (
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
