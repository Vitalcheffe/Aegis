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

export default function AIMLPage() {
  return (
    <>
      <SectionHero
        image="/images/technology/ai-ml.jpg"
        label="Technology"
        title="AI & Machine Learning"
        subtitle="Neural networks for real-time threat classification — how Aegis identifies, prioritizes, and responds to UAS threats in under 20 milliseconds."
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="Intelligence at the Speed of Threat">
        <p>
          Artificial intelligence is the cognitive core of the Aegis Architecture — the layer that transforms raw sensor data into actionable threat intelligence faster than any human operator could process. The Aegis AI Layer classifies every detected contact by type, intent, and payload in under 20 milliseconds, a speed that makes the difference between neutralizing a threat and suffering its consequences. This performance is achieved through a purpose-built inference engine running on our custom Neural Processing Unit, which executes 175 trillion operations per second while consuming less than 400 watts of power — a power efficiency that enables deployment in the constrained environments of tactical vehicles and forward operating bases.
        </p>
        <p>
          The Aegis AI is not a single monolithic model but a carefully orchestrated ensemble of specialized neural networks, each optimized for a distinct aspect of the counter-UAS mission. Convolutional neural networks process RF signal spectrograms to identify drone communication protocols. Transformer models analyze behavioral time series to assess flight intent. Graph neural networks model the relationships between multiple drones to detect and characterize swarm behavior. The outputs of these specialized models are combined through a meta-classifier that produces the final threat assessment, including classification confidence, behavioral intent, and recommended response level. This ensemble approach delivers both the speed required for real-time operation and the robustness needed to handle novel and adversarial threats.
        </p>
      </TextSection>

      <SplitSection
        image="/images/technology/ai-ml.jpg"
        label="Classification Pipeline"
        title="Multi-Modal Threat Assessment"
        description="The Aegis classification pipeline processes data from every sensor modality simultaneously, fusing radar track characteristics, RF signal features, EO/IR imagery, and acoustic signatures into a unified threat assessment. The radar features include RCS measurements, velocity profiles, altitude patterns, and maneuver characteristics that distinguish fixed-wing UAVs from rotary-wing platforms. RF features include carrier frequency, modulation type, protocol identity, burst timing, and spectral fingerprint. EO/IR features include visual shape, propeller count, payload identification, and thermal signature. Acoustic features include propeller RPM, blade count, and motor acoustic signature. The meta-classifier combines these modalities with learned attention weights that automatically emphasize the most discriminative features for each threat category, achieving 98.9% overall classification accuracy — significantly outperforming any single-modality approach."
        stats={[
          { value: "98.9%", label: "Classification Accuracy" },
          { value: "20 ms", label: "Classification Time" },
        ]}
      />

      <SplitSection
        image="/images/technology/ai-ml.jpg"
        label="Behavioral Analysis"
        title="Intent Assessment"
        description="Classification identifies what a drone is; intent assessment determines what it is doing — and what it plans to do next. The Aegis behavioral analysis engine uses transformer models trained on 12 million flight trajectories to classify operational intent in real time. The system distinguishes between 14 behavioral categories: recreational flying, commercial survey, agricultural spraying, infrastructure inspection, perimeter reconnaissance, approach profiling, weapons delivery trajectory, swarm coordination, relay communication, GPS-denied navigation, low-observable approach, hover-and-stare surveillance, evasion maneuver, and attack profile. For each detected contact, the intent engine produces a probability distribution across these categories, updating continuously as new observations arrive. When the probability of hostile intent exceeds the configured threshold, the Decision Layer automatically escalates the response level and alerts the operator."
        reverse
        stats={[
          { value: "14", label: "Intent Categories" },
          { value: "12M+", label: "Training Trajectories" },
        ]}
      />

      <TextSection label="Continuous Learning" title="Adapting to Emerging Threats">
        <p>
          The drone threat landscape evolves continuously as new platforms enter the market, existing platforms are modified for hostile use, and adversarial operators develop new tactics. The Aegis AI is designed to keep pace through a three-layer continuous learning framework. At the global layer, our research team trains new classification models using data aggregated across the entire deployed fleet — when any Aegis sensor encounters a previously unknown signal or behavior, the observation is securely transmitted to our AI research center, where it is incorporated into the next model update. These updates are cryptographically signed and distributed to the global fleet within 72 hours through our secure over-the-air pipeline, with 12 model updates delivered in 2024 alone.
        </p>
        <p>
          At the local layer, each Aegis system performs online adaptation to its specific operational environment. The local model fine-tunes global classification weights based on the specific RF environment, terrain characteristics, and threat profile of its deployment site, reducing false alarm rates by up to 40% compared to the out-of-box configuration. At the edge layer, the system implements novelty detection that flags any observation that falls outside the distribution of known threat categories, triggering a capture workflow that records the full sensor data for analysis. This three-layer approach ensures that Aegis AI capability improves continuously without requiring manual model retraining or redeployment.
        </p>
      </TextSection>

      <StatsSection
        label="AI Performance"
        stats={[
          { value: "175 TOPS", label: "Inference Throughput" },
          { value: "12M+", label: "Known Signatures" },
          { value: "98.9%", label: "Classification Accuracy" },
          { value: "20 ms", label: "Classification Time" },
          { value: "72 hrs", label: "Global Update Cycle" },
        ]}
      />

      <QuoteSection
        quote="We don't just classify drones — we understand them. Our AI doesn't see a radar return and guess; it sees a radar return, an RF signature, a thermal image, and an acoustic profile, and from those four perspectives it constructs a threat assessment that is more accurate than any human analyst could produce in an hour — and it does it in 20 milliseconds."
        author="Markus Weber"
        role="Vice President of AI Engineering, Aegis Defense Systems"
      />

      <SpecTable
        label="AI & ML Specifications"
        title="Technical Specifications"
        specs={[
          { label: "AI Inference Performance", value: "175 TOPS" },
          { label: "Classification Latency", value: "<20 ms (guaranteed)" },
          { label: "Classification Accuracy", value: "98.9% (overall)" },
          { label: "Intent Assessment Accuracy", value: "96.7%" },
          { label: "Swarm Detection Accuracy", value: "99.2%" },
          { label: "Known Signal Signatures", value: "12 million+" },
          { label: "Behavioral Categories", value: "14 intent types" },
          { label: "Training Dataset", value: "12M+ flight trajectories" },
          { label: "Model Architecture", value: "CNN + Transformer + GNN ensemble" },
          { label: "Quantization", value: "INT8 (0.2% accuracy loss vs FP32)" },
          { label: "NPU Power Consumption", value: "<400 W" },
          { label: "Model Update Cycle", value: "72 hours (global fleet)" },
          { label: "Local Adaptation", value: "Continuous online learning" },
          { label: "Novelty Detection", value: "Statistical outlier + autoencoder" },
          { label: "Adversarial Robustness", value: "PGD-20 certified (ε = 0.03)" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "How does the Aegis AI handle drones it has never seen before?",
            answer:
              "The Aegis AI uses a multi-layered approach to handle novel threats. First, the novelty detection layer uses statistical outlier analysis and autoencoder reconstruction error to flag any observation that falls outside the distribution of known threat categories. When a novel signal or behavior is detected, the system captures the full sensor data — including raw IQ waveforms, radar range-Doppler maps, EO/IR imagery, and acoustic recordings — and transmits it securely to our AI research center for analysis. Second, the ensemble classification approach means that even if one specialized model fails to classify a threat, the other models in the ensemble often provide partial information that enables a useful response. Third, the behavioral intent engine assesses threat level based on flight dynamics rather than identity — a drone flying an attack profile is treated as hostile regardless of whether its specific model is in the signature library. In 2024, the Aegis fleet detected and correctly assessed 47 novel drone variants that were not in the existing signature library.",
          },
          {
            question: "Is the Aegis AI vulnerable to adversarial attacks?",
            answer:
              "We take adversarial robustness seriously and have implemented multiple defenses against deliberate attempts to deceive our classification models. All models are trained using Projected Gradient Descent (PGD) adversarial training with a perturbation budget of ε = 0.03, which provides certified robustness against common adversarial attack methods. The ensemble architecture provides inherent robustness because an adversary would need to simultaneously fool multiple specialized models — each processing different data modalities — to evade classification. The meta-classifier includes an anomaly detection threshold that flags any classification with unusually low confidence across the ensemble, triggering enhanced scrutiny. We also conduct regular red-team exercises where our own security team attempts to evade the classification system, with findings incorporated into the next model update cycle.",
          },
          {
            question: "How are AI models updated in the field?",
            answer:
              "AI model updates are delivered through our secure over-the-air (SOTA) pipeline using a dual-channel verification protocol. Every update must be cryptographically signed by both our development key and our operations key — a single compromised key is insufficient to authorize an update. The SOTA pipeline includes integrity verification at every stage: the update package is verified against its signature upon receipt, again upon extraction, and a third time before loading into the NPU. Automatic rollback capability reverts to the previous model if any anomaly is detected during the loading process. Updates are applied seamlessly during idle periods without requiring system restart, and the transition from the old model to the new model occurs atomically — there is never a period where no model is loaded. In 2024, we delivered 12 model updates to the global fleet with zero failed deployments.",
          },
          {
            question: "What is the Neural Processing Unit and why is it custom?",
            answer:
              "The Aegis Neural Processing Unit (NPU) is a purpose-built AI inference accelerator designed in-house because no commercially available processor met our specific requirements for the counter-UAS mission. Our requirements were: 175 TOPS of inference throughput, less than 400 watts of power consumption, deterministic latency guarantees under all processing loads, operation from -40°C to +55°C, and resistance to 30G shock loads. No GPU, TPU, or inference accelerator on the market could simultaneously satisfy all five requirements. The NPU uses a heterogeneous computing architecture with dedicated tensor processing cores for the matrix operations that dominate neural network inference, programmable vector units for signal preprocessing, and a real-time scheduling engine that guarantees each inference completes within the 20-millisecond deadline regardless of concurrent system activity.",
          },
        ]}
      />

      <CTASection
        title="See the AI in Action"
        subtitle="Request a technical briefing to see how Aegis AI classifies and prioritizes threats against your specific drone inventory and operational scenarios."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Products"
        secondaryHref="/products"
      />
    </>
  );
}
