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

export default function SensorFusionPage() {
  return (
    <>
      <SectionHero
        image="/images/technology/sensor-fusion.jpg"
        label="Technology"
        title="Sensor Fusion"
        subtitle="Multi-modal data integration — how Aegis fuses radar, RF, EO/IR, and acoustic observations into a single operational picture that is more accurate than any sensor alone."
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="The Power of Combined Sensing">
        <p>
          No single sensor modality can provide complete, reliable counter-UAS detection across all operational conditions. Radar excels at range and all-weather performance but struggles with micro-drones and clutter discrimination. RF sensing provides protocol identification and passive operation but cannot detect autonomous drones with no RF emissions. EO/IR cameras deliver visual confirmation and payload identification but are limited by weather, lighting, and range. Acoustic sensors provide passive detection in electromagnetically denied environments but have short effective range and are susceptible to ambient noise. Sensor fusion is the discipline of combining observations from these complementary modalities into a unified operational picture that overcomes the limitations of each individual sensor type, producing tracks that are more accurate, more reliable, and more complete than any single sensor could achieve alone.
        </p>
        <p>
          The Aegis Fusion Layer processes over 2 million data points per second from all connected sensor modalities, correlating observations into unified high-confidence tracks using an Iterated Multi-Model Unscented Kalman Filter (IMM-UKF). This mathematical framework handles the fundamental challenges of multi-sensor fusion: observations from different sensors arrive at different rates and with different latencies; each sensor measures different aspects of the target with different accuracies; and sensors may disagree about the same target's position due to measurement noise or systematic biases. The IMM-UKF resolves these challenges through probabilistic weighting that automatically favors the most accurate and timely observations for each track parameter, while maintaining a consistent estimate even when individual sensors are degraded or denied.
        </p>
      </TextSection>

      <SplitSection
        image="/images/technology/sensor-fusion.jpg"
        label="Fusion Architecture"
        title="IMM-UKF Framework"
        description="The Iterated Multi-Model Unscented Kalman Filter is the mathematical foundation of the Aegis Fusion Layer. The IMM framework maintains multiple simultaneous motion models — constant velocity, constant acceleration, coordinated turn, and hover — each representing a different hypothesis about the target's current flight mode. The filter computes the probability of each model given the current observations, and the final state estimate is a weighted combination of all model outputs. The UKF component handles the nonlinearities inherent in multi-sensor fusion — different sensors measure position in different coordinate frames (radar in spherical, RF in bearing-only, EO/IR in pixel coordinates) and the transformation between these frames involves trigonometric functions that would cause a linear Kalman filter to diverge. The UKF uses a deterministic sampling technique (sigma points) to propagate the state distribution through these nonlinear transformations without requiring analytical Jacobians, achieving sub-meter positional accuracy across all engagement geometries."
        stats={[
          { value: "2M+", label: "Data Points/Sec" },
          { value: "<1 m", label: "Positional Accuracy" },
        ]}
      />

      <SplitSection
        image="/images/technology/sensor-fusion.jpg"
        label="Track Management"
        title="Lifecycle & Deconfliction"
        description="The Fusion Layer manages the complete lifecycle of every track from initiation through maintenance to termination. Track initiation requires observations from at least two sensor modalities within a correlated time and position window, reducing false track initiation rate by 99.7% compared to single-sensor initiation. Track maintenance continuously updates each track's state estimate as new observations arrive, automatically adjusting the weighting of each sensor modality based on current measurement quality — if RF sensing reports low confidence due to interference, the filter automatically increases radar and EO/IR weights to compensate. Track deconfliction resolves situations where two or more tracks refer to the same physical target, merging redundant tracks based on position, velocity, and classification consistency. Track termination removes tracks that have not been updated by any sensor for a configurable timeout period, typically 30 seconds, while maintaining the track in a dormant state that can be reactivated if the target reappears."
        reverse
        stats={[
          { value: "99.7%", label: "False Track Reduction" },
          { value: "4", label: "Motion Models" },
        ]}
      />

      <TextSection label="Sensor Management" title="Dynamic Resource Allocation">
        <p>
          The Aegis Fusion Layer does not passively accept whatever observations the sensors provide — it actively manages sensor resources to maximize detection and tracking performance against the most threatening contacts. The sensor management algorithm continuously evaluates the information value of each possible sensor action — pointing an EO/IR camera at a specific azimuth, adjusting the radar waveform parameters, prioritizing an RF scan pattern — and selects the action that maximizes the expected reduction in track uncertainty for the highest-priority targets. This dynamic resource allocation is particularly valuable when the threat density exceeds the capacity of any single sensor, ensuring that limited sensor resources are directed where they provide the greatest operational benefit.
        </p>
        <p>
          The sensor management algorithm also implements cross-cueing, where one sensor's observation triggers another sensor to investigate a specific area. When the RF subsystem detects a drone control signal but cannot determine altitude, the sensor manager automatically tasks the radar to scan the corresponding azimuth at the reported bearing, rapidly acquiring the target in three-dimensional space. When the radar detects a contact with ambiguous classification, the sensor manager slews the EO/IR camera to the target's position for visual identification. These cross-cueing sequences execute automatically in under 500 milliseconds, providing the speed required to close the kill chain within the 20-millisecond decision budget when combined with the AI classification pipeline.
        </p>
      </TextSection>

      <StatsSection
        label="Fusion Performance"
        stats={[
          { value: "98.9%", label: "Classification Accuracy" },
          { value: "<1 m", label: "Positional Accuracy" },
          { value: "2M+", label: "Data Points/Sec" },
          { value: "500+", label: "Fused Tracks" },
          { value: "<500 ms", label: "Cross-Cue Time" },
        ]}
      />

      <QuoteSection
        quote="Radar says there's something at bearing 045, range 12 km, altitude 200 meters. RF says there's a DJI OcuSync signal at bearing 043 with 98% protocol confidence. EO/IR says it's a quadcopter with a suspended payload. None of these observations alone is sufficient to authorize engagement. Together, they are unambiguous — and that is the power of fusion."
        author="Dr. Michael Torres"
        role="Director of Sensor Fusion, Aegis Defense Systems"
      />

      <SpecTable
        label="Sensor Fusion Specifications"
        title="Technical Specifications"
        specs={[
          { label: "Fusion Algorithm", value: "Iterated Multi-Model UKF (IMM-UKF)" },
          { label: "Motion Models", value: "4 (CV, CA, CT, Hover)" },
          { label: "Data Processing Rate", value: "2M+ data points/sec" },
          { label: "Positional Accuracy (Fused)", value: "<1 m" },
          { label: "Velocity Accuracy (Fused)", value: "<0.3 m/s" },
          { label: "Classification Accuracy (Fused)", value: "98.9%" },
          { label: "False Track Initiation Reduction", value: "99.7% vs single-sensor" },
          { label: "Max Concurrent Fused Tracks", value: "500+" },
          { label: "Cross-Cue Latency", value: "<500 ms" },
          { label: "Track Initiation Requirement", value: "2+ sensor modalities" },
          { label: "Track Dormancy Timeout", value: "30 seconds (configurable)" },
          { label: "Sensor Modalities", value: "Radar / RF / EO-IR / Acoustic" },
          { label: "Coordinate Frame", value: "WGS-84 (global), Local ENU" },
          { label: "Time Synchronization", value: "GPS-disciplined PPS (<1 μs)" },
          { label: "Latency (Observation to Track Update)", value: "<4 ms" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "What happens when one sensor is jammed or degraded?",
            answer:
              "The Aegis Fusion Layer is designed for graceful degradation — as sensors are lost, the system automatically compensates by increasing the weighting of surviving sensor modalities. If the RF subsystem is jammed, the fusion algorithm increases radar and EO/IR weights to maintain tracking performance, with a modest reduction in classification accuracy (from 98.9% to approximately 94.7% using radar and EO/IR alone). If radar is denied, RF and EO/IR maintain tracking with reduced positional accuracy (from sub-meter to approximately 5 meters) but classification accuracy remains high because RF protocol identification and EO/IR visual classification are powerful discriminators. If EO/IR is unavailable due to weather or darkness, radar and RF continue to provide effective coverage. The system monitors each sensor's health and measurement quality in real time, automatically adjusting fusion weights and alerting the operator when sensor degradation exceeds configurable thresholds.",
          },
          {
            question: "How does the system handle conflicting sensor observations?",
            answer:
              "Conflicting observations — where different sensors report different positions for what appears to be the same target — are resolved through the probabilistic framework of the IMM-UKF. Each observation is assigned a measurement covariance matrix that represents its uncertainty, derived from the sensor's known performance characteristics and the current environmental conditions. The fusion algorithm weights each observation inversely proportional to its uncertainty — more accurate observations contribute more to the state estimate than less accurate ones. When observations are fundamentally inconsistent (e.g., radar reports a target at 10 km while RF reports a signal at 2 km on the same bearing), the track association logic may determine that the observations belong to different targets and initiate separate tracks. The deconfliction algorithm continuously evaluates whether tracks should be split or merged based on the consistency of their associated observations.",
          },
          {
            question: "What is cross-cueing and how fast does it work?",
            answer:
              "Cross-cueing is the automated process where one sensor's observation triggers another sensor to investigate a specific area of interest. For example, when the RF subsystem detects a drone control signal at a specific bearing but cannot determine range or altitude, the sensor manager automatically tasks the radar to scan that bearing, acquiring the target in three-dimensional space within 500 milliseconds. Similarly, when the radar detects a contact with ambiguous classification, the sensor manager slews the EO/IR camera to the target's computed position for visual identification. Cross-cueing sequences execute automatically without operator intervention, and the resulting observations are fused into the existing track within one processing cycle. This tight coupling between sensors through the fusion layer is what enables the Aegis Architecture to maintain comprehensive situational awareness despite the individual limitations of each sensor modality.",
          },
          {
            question: "How is time synchronized across distributed sensors?",
            answer:
              "Accurate time synchronization is critical for sensor fusion — if radar and RF observations are timestamped with different clock references, the fusion algorithm will compute incorrect track positions. Every Aegis sensor node includes a GPS-disciplined oscillator that maintains time accuracy better than 1 microsecond relative to UTC. The GPS PPS (pulse-per-second) signal continuously corrects the local oscillator, and when GPS is unavailable — such as in GPS-denied environments — the disciplined oscillator maintains time accuracy within 10 microseconds for up to 24 hours using its internal crystal. For networked deployments, the Aegis Command platform distributes a network time reference using IEEE 1588 Precision Time Protocol (PTP), achieving sub-microsecond synchronization across all connected sensor nodes. All observations are timestamped with GPS time at the point of measurement, ensuring that the fusion algorithm can correctly correlate observations regardless of network latency or processing delays.",
          },
        ]}
      />

      <CTASection
        title="Experience Fused Sensing"
        subtitle="Request a technical briefing to see how multi-modal sensor fusion improves detection and classification performance against your specific threat scenarios."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Technology"
        secondaryHref="/technology"
      />
    </>
  );
}
