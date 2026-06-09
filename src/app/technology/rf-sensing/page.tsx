"use client";

import {
  SectionHero,
  TextSection,
  SplitSection,
  StatsSection,
  SpecTable,
  CTASection,
  QuoteSection,
  ImageBreak,
  FAQSection,
  FeatureList,
} from "@/components/sections";

export default function RFSensingPage() {
  return (
    <>
      <SectionHero
        image="/images/technology/rf-sensing.jpg"
        label="Technology"
        title="RF Sensing Technology"
        subtitle="Passive radio frequency detection and signal intelligence — the silent sentinel that detects drone threats before they enter your airspace."
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="The Foundation of Passive Detection">
        <p>
          Radio frequency sensing is the cornerstone of the Aegis counter-UAS architecture — a passive detection capability that identifies drone threats by intercepting and analyzing the electromagnetic signals they emit. Unlike active radar, which reveals its presence by transmitting energy, RF sensing is entirely passive: it listens without transmitting, making it invisible to adversary electronic warfare support measures and completely safe for operation in environments where electromagnetic emissions are restricted, such as near airports and hospitals. The Aegis RF sensing subsystem operates continuously across a 20 MHz to 6 GHz frequency range, detecting the control signals, telemetry links, video downlinks, and navigation transmissions that every drone must emit to operate.
        </p>
        <p>
          The power of RF sensing lies not just in detection but in identification. While radar can tell you that something is flying, RF sensing can tell you what it is, who made it, what frequency it operates on, and — in many cases — what it is doing. The Aegis RF fingerprinting library contains over 12 million known signal signatures, enabling automatic identification of specific drone models and, in some cases, individual units based on the unique electromagnetic characteristics of their transmitters. This identification capability is critical for the graduated response framework: knowing whether a detected signal belongs to a recreational toy drone or a military-grade surveillance platform determines the appropriate countermeasure.
        </p>
      </TextSection>

      <SplitSection
        image="/images/technology/rf-sensing.jpg"
        label="Direction Finding"
        title="Precision Geolocation"
        description="The Aegis RF direction-finding array uses correlative interferometry to determine the bearing of detected emitters with accuracy better than 2° RMS across the full 20 MHz to 6 GHz operational bandwidth. The array consists of 16 spatially distributed antenna elements mounted on a calibrated baseline, each simultaneously sampling the incoming signal waveform. The correlative interferometry algorithm compares the phase relationships between all element pairs, constructing a correlation function whose peak identifies the signal's angle of arrival. By combining bearing measurements from two or more geographically separated DF stations, the system computes a 3D position fix through triangulation, achieving geolocation accuracy better than 50 meters at 10 km range. This precision geolocation enables both threat tracking and the forensic evidence collection required for legal proceedings and incident investigation."
        stats={[
          { value: "2° RMS", label: "Bearing Accuracy" },
          { value: "50 m", label: "Geolocation at 10 km" },
        ]}
      />

      <SplitSection
        image="/images/technology/rf-sensing.jpg"
        label="Signal Intelligence"
        title="Protocol Analysis & Classification"
        description="Beyond simple detection and geolocation, the Aegis RF subsystem performs deep protocol analysis on every intercepted signal. The signal processing pipeline demodulates, decodes, and classifies drone communication protocols in real time, identifying the specific link layer (IEEE 802.11, proprietary OFDM, LoRa, FSK), the control protocol (MAVLink, DJI Lightbridge, OcuSync, custom military links), and the operational mode (command, telemetry, video, firmware update). This protocol-level intelligence feeds directly into the AI classification engine, which uses the combination of RF fingerprint, protocol identity, and behavioral pattern to achieve 99.7% classification accuracy against the known signature library. For signals that do not match any known signature, the system flags them as unknown and initiates a capture-and-analysis workflow that records the full IQ waveform for offline analysis by our research team."
        reverse
        stats={[
          { value: "99.7%", label: "Protocol ID Accuracy" },
          { value: "8,400+", label: "Known Protocols" },
        ]}
      />

      <TextSection label="Advanced Capabilities" title="Defeating Evasion Techniques">
        <p>
          Modern drone operators increasingly employ signal evasion techniques designed to defeat RF-based detection. Frequency-hopping spread spectrum (FHSS) rapidly switches the carrier frequency across hundreds of channels per second, preventing narrowband receivers from locking onto the signal. Encrypted control links obscure the protocol content, preventing classification by payload analysis. Low-probability-of-intercept (LPI) waveforms reduce transmitter power to the minimum required for link closure, pushing the signal below the noise floor of conventional receivers. The Aegis RF subsystem is engineered to counter each of these techniques through a combination of wide instantaneous bandwidth, cognitive spectrum monitoring, and AI-driven signal extraction.
        </p>
        <p>
          The cognitive RF engine monitors 2 GHz of instantaneous bandwidth simultaneously, capturing the entire hop sequence of FHSS signals without needing to predict or track the hopping pattern. For encrypted links, the system classifies based on metadata features — signal bandwidth, modulation type, burst timing, spectral shape — that encryption cannot conceal. For LPI waveforms, advanced signal processing techniques including matched filtering, cyclostationary analysis, and compressive sensing extract signals that are 15 dB below the noise floor. These capabilities are continuously improved through our secure over-the-air update pipeline, with 12 RF processing updates delivered to the deployed fleet in 2024 alone.
        </p>
      </TextSection>

      <StatsSection
        label="RF Sensing Performance"
        stats={[
          { value: "50+ km", label: "Detection Range" },
          { value: "20 MHz–6 GHz", label: "Frequency Coverage" },
          { value: "2 GHz", label: "Instantaneous BW" },
          { value: "12M+", label: "Known Signatures" },
          { value: "99.7%", label: "Classification Accuracy" },
        ]}
      />

      <QuoteSection
        quote="The RF array doesn't just detect drones — it reads their intent. When our system identifies a DJI Matrice 300 transmitting on OcuSync 3.0 at 2.4 GHz with a video downlink active and a flight controller broadcasting MAVLink heartbeat packets, we know the operator's model, their communication protocol, and that they're streaming live video. That intelligence determines our response."
        author="Dr. Sarah Chen"
        role="Director of RF Engineering, Aegis Defense Systems"
      />

      <SpecTable
        label="RF Sensing Specifications"
        title="Technical Specifications"
        specs={[
          { label: "Frequency Range", value: "20 MHz – 6 GHz" },
          { label: "Instantaneous Bandwidth", value: "2 GHz" },
          { label: "Bearing Accuracy (DF)", value: "<2° RMS" },
          { label: "Geolocation Accuracy (10 km)", value: "<50 m" },
          { label: "Detection Range (Control Signals)", value: "50+ km" },
          { label: "Detection Range (Video Downlink)", value: "35+ km" },
          { label: "Detection Range (Telemetry)", value: "40+ km" },
          { label: "Known Signal Signatures", value: "12 million+" },
          { label: "Protocol Identification Accuracy", value: "99.7%" },
          { label: "FHSS Detection", value: "Up to 1,000 hops/sec" },
          { label: "LPI Signal Sensitivity", value: "-15 dB below noise floor" },
          { label: "Antenna Elements (DF Array)", value: "16 elements" },
          { label: "Processing Latency", value: "<5 ms" },
          { label: "Power Consumption (RF Subsystem)", value: "<120 W" },
          { label: "Operating Temperature", value: "-40°C to +55°C" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "Can RF sensing detect autonomous drones with no control link?",
            answer:
              "Autonomous drones that navigate using pre-programmed waypoints without a live control link present a different detection challenge. While these platforms do not emit active control signals, they typically still transmit telemetry data, GPS timing references, and often video downlinks. The Aegis RF subsystem detects these ancillary emissions. For fully autonomous platforms with no RF emissions whatsoever, the Aegis Architecture relies on its other sensor modalities — radar, EO/IR, and acoustic — to detect and classify the threat. The multi-modal sensor fusion approach ensures that no single point of failure in the detection chain can leave a gap in coverage.",
          },
          {
            question: "How does RF sensing handle Wi-Fi interference in urban environments?",
            answer:
              "Urban environments are saturated with Wi-Fi, Bluetooth, cellular, and other RF emissions that create significant interference for drone signal detection. The Aegis RF subsystem uses several techniques to maintain detection performance in these conditions. First, cognitive spectrum monitoring identifies and masks known interference sources, reducing the effective noise floor. Second, the signal processing pipeline applies adaptive filtering that suppresses broadband interference while preserving narrowband drone signals. Third, the AI classification engine is trained on urban RF environments and can distinguish drone control signals from Wi-Fi traffic with 98.2% accuracy based on protocol timing, burst structure, and spectral characteristics. In the most congested environments, the Fusion Layer automatically increases the weighting of radar and EO/IR observations to compensate for any RF detection degradation.",
          },
          {
            question: "What is RF fingerprinting and how accurate is it?",
            answer:
              "RF fingerprinting identifies a specific transmitter — and by extension, the drone it's installed in — by analyzing the unique imperfections in its RF hardware. Every transmitter has subtle manufacturing variations in its oscillator stability, power amplifier linearity, filter bandwidth, and phase noise characteristics that create a distinct RF fingerprint, much like a human fingerprint. The Aegis RF fingerprinting system extracts 47 features from each detected signal and compares them against our 12-million-signature library using a siamese neural network architecture. Against known signatures, identification accuracy exceeds 99.7% at the model level and 94.2% at the individual unit level. Against unknown signals, the system provides a confidence score and similarity ranking to the closest known signatures.",
          },
          {
            question: "Can the RF array be detected by adversary EW systems?",
            answer:
              "No. The Aegis RF direction-finding array is entirely passive — it receives signals without transmitting any energy. There is no radar pulse, no interrogation signal, no beacon emission of any kind. Adversary electronic warfare support measures (ESM) cannot detect the Aegis RF array because there is nothing to detect. This passive nature makes RF sensing ideal for covert surveillance, forward operating base protection where revealing sensor positions is undesirable, and any scenario where electromagnetic silence must be maintained. The only time the Aegis system transmits is during active jamming or spoofing operations, which are deliberate countermeasures authorized through the rules of engagement framework.",
          },
        ]}
      />

      <CTASection
        title="Explore RF Sensing in Depth"
        subtitle="Schedule a technical briefing with our RF engineering team to discuss detection performance against your specific threat scenarios and operational environment."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Products"
        secondaryHref="/products"
      />
    </>
  );
}
