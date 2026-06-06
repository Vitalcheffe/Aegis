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

export default function RadarPage() {
  return (
    <>
      <SectionHero
        image="/images/technology/radar-tech.jpg"
        label="Technology"
        title="Radar Systems"
        subtitle="Multi-band phased array radar engineered for the counter-UAS mission — detecting small, low-flying, low-speed targets that legacy air defense radars cannot see."
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="Purpose-Built for the C-UAS Mission">
        <p>
          Radar is the primary active sensor in the Aegis Architecture, providing all-weather, day-night detection and tracking of unmanned aerial systems at ranges that no other sensor modality can match. However, counter-UAS radar is fundamentally different from traditional air defense radar. Legacy systems were designed to detect fast-moving, high-altitude targets like aircraft and missiles — objects with large radar cross-sections (RCS) and velocities that create strong Doppler returns against a stationary background. Drones are the opposite: they are small (RCS as low as 0.001 m² for micro-drones), slow (often below 15 m/s, indistinguishable from bird speeds), and fly at low altitudes where ground clutter dominates. The Aegis radar was engineered from the ground up to solve this detection problem.
        </p>
        <p>
          The Aegis S-Band phased array radar achieves detection ranges up to 35 km against fixed-wing UAVs and 15 km against micro-drones through a combination of high transmit power, advanced waveform design, and sophisticated signal processing. The phased array antenna steers its beam electronically in microseconds — there are no mechanical rotating components — enabling simultaneous tracking of 500+ targets across the full 360° azimuth coverage. The radar operates in the 2.3 to 2.5 GHz S-Band, which provides an optimal balance between detection range (lower frequencies propagate further), resolution (higher frequencies provide finer range and Doppler resolution), and antenna size (S-Band enables a deployable aperture). The waveform parameters — pulse repetition frequency, pulse width, and chirp bandwidth — are adaptively selected based on the operational mode and the characteristics of the targets being tracked.
        </p>
      </TextSection>

      <SplitSection
        image="/images/technology/radar-tech.jpg"
        label="Phased Array"
        title="Electronic Beam Steering"
        description="The Aegis phased array antenna consists of 4,096 individual radiating elements, each with an independently controlled phase shifter that enables electronic beam steering without any mechanical movement. The array can steer the beam to any azimuth and elevation angle within the coverage envelope in under 10 microseconds — more than 10,000 times faster than a mechanically scanned antenna. This speed enables a time-division multiplexing strategy where the radar rapidly switches between surveillance mode (broad beam, moderate update rate) and tracking mode (narrow beam, high update rate) on a pulse-by-pulse basis. During surveillance, the radar scans the full 360° azimuth and -5° to +45° elevation sector every 2 seconds. When a target is detected, the radar interleaves dedicated tracking pulses that update the target's position every 200 milliseconds, maintaining firm track custody even during aggressive maneuvers."
        stats={[
          { value: "4,096", label: "Array Elements" },
          { value: "10 μs", label: "Beam Steering Time" },
        ]}
      />

      <SplitSection
        image="/images/technology/radar-tech.jpg"
        label="Waveform Design"
        title="Adaptive Transmission"
        description="The Aegis radar employs linear frequency modulated (LFM) chirp waveforms with adaptive parameters that are optimized for the counter-UAS detection mission. During surveillance, the radar transmits long-duration, high-duty-cycle chirps with 20 MHz bandwidth that provide 7.5-meter range resolution — sufficient to resolve individual drone platforms in a swarm formation. During tracking, the bandwidth increases to 80 MHz, providing 1.875-meter range resolution that enables precise positional tracking and supports classification through micro-Doppler analysis. The pulse repetition frequency (PRF) is adaptively selected to eliminate range-Doppler ambiguities: medium PRF (8-16 kHz) is used for close-range surveillance to resolve both range and velocity, while high PRF (20-40 kHz) is used for long-range tracking to provide unambiguous velocity measurement. The waveform scheduler ensures that the total transmitted power never exceeds regulatory limits while maximizing detection probability against the current threat environment."
        reverse
        stats={[
          { value: "80 MHz", label: "Max Bandwidth" },
          { value: "1.875 m", label: "Track Resolution" },
        ]}
      />

      <TextSection label="Signal Processing" title="Extracting Drones from Clutter">
        <p>
          The fundamental challenge of counter-UAS radar is not detection range but clutter rejection. At the low altitudes where drones operate, the radar receives returns from buildings, trees, terrain, weather, birds, and vehicle traffic that can be millions of times stronger than the drone echo. The Aegis signal processing chain applies a sequence of filtering stages designed to suppress clutter while preserving the weak drone returns. Space-time adaptive processing (STAP) cancels ground clutter by exploiting the difference in Doppler shift between stationary clutter and moving targets. Constant false alarm rate (CFAR) detection maintains a consistent detection threshold that adapts to the local clutter level, preventing overload from clutter residues while maintaining sensitivity to small targets. Doppler processing with 256-point FFT provides velocity resolution better than 0.5 m/s, separating slow-moving drones from stationary clutter.
        </p>
        <p>
          Micro-Doppler analysis is the key differentiator that enables Aegis radar to not only detect drones but classify them. A drone's rotating propellers create a characteristic micro-Doppler signature — a periodic modulation of the radar return caused by the blades' rotational motion superimposed on the platform's bulk motion. The Aegis signal processing chain extracts this micro-Doppler signature and uses it to distinguish between fixed-wing UAVs (no micro-Doppler), single-rotor helicopters (one modulation frequency), and multi-rotor drones (multiple modulation frequencies corresponding to multiple rotors). The micro-Doppler signature also reveals the propeller RPM and blade count, which are additional features for the AI classification engine. This capability is particularly valuable for identifying drones that have been modified to reduce their visual or RF signature — the radar micro-Doppler signature cannot be suppressed without fundamentally changing the platform's propulsion system.
        </p>
      </TextSection>

      <StatsSection
        label="Radar Performance"
        stats={[
          { value: "35 km", label: "Fixed-Wing Detection" },
          { value: "25 km", label: "Multi-Rotor Detection" },
          { value: "15 km", label: "Micro-Drone Detection" },
          { value: "500+", label: "Concurrent Tracks" },
          { value: "0.5 m/s", label: "Velocity Resolution" },
        ]}
      />

      <QuoteSection
        quote="Legacy air defense radar looks for needles in haystacks — big, fast needles that stand out from the hay. Counter-UAS radar looks for tiny, slow needles that look exactly like the hay. That's why we had to reinvent every layer of the radar signal processing chain, from waveform design to clutter suppression to target extraction. The result is a radar that sees what others cannot."
        author="Dr. Katherine Moreau"
        role="Director of Radar Engineering, Aegis Defense Systems"
      />

      <SpecTable
        label="Radar Specifications"
        title="Technical Specifications"
        specs={[
          { label: "Operating Band", value: "S-Band (2.3 – 2.5 GHz)" },
          { label: "Array Elements", value: "4,096" },
          { label: "Beam Steering Time", value: "<10 μs" },
          { label: "Azimuth Coverage", value: "360°" },
          { label: "Elevation Coverage", value: "-5° to +45°" },
          { label: "Surveillance Update Rate", value: "2 seconds (full scan)" },
          { label: "Tracking Update Rate", value: "200 ms per target" },
          { label: "Concurrent Track Capacity", value: "500+" },
          { label: "Detection Range (Fixed-Wing UAV, 0.1 m² RCS)", value: "35 km" },
          { label: "Detection Range (Multi-Rotor, 0.01 m² RCS)", value: "25 km" },
          { label: "Detection Range (Micro-Drone, 0.001 m² RCS)", value: "15 km" },
          { label: "Range Resolution (Surveillance)", value: "7.5 m" },
          { label: "Range Resolution (Tracking)", value: "1.875 m" },
          { label: "Velocity Resolution", value: "<0.5 m/s" },
          { label: "Micro-Doppler Analysis", value: "Propeller RPM and blade count" },
          { label: "Transmit Power", value: "200 W average / 10 kW peak" },
          { label: "Power Consumption (Radar Subsystem)", value: "<500 W" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "How does the Aegis radar handle bird discrimination?",
            answer:
              "Birds are the most persistent source of false alarms for counter-UAS radar, as their RCS and velocity can closely match those of small drones. The Aegis radar discriminates birds from drones through three complementary mechanisms. First, micro-Doppler analysis: birds produce a distinctive flapping signature that differs from the rotor modulation of drones — the frequency, amplitude, and temporal pattern of the micro-Doppler modulation are fundamentally different. Second, flight dynamics: birds exhibit erratic, biology-driven trajectory changes that differ from the mechanically consistent flight patterns of drones. The AI classification engine is trained on over 200,000 bird flight tracks and 500,000 drone flight tracks, achieving 99.1% discrimination accuracy between the two categories. Third, the Fusion Layer cross-references radar observations with RF sensing data — a radar return with no corresponding RF emission is more likely to be a bird, while a return with a correlated drone control signal is confirmed as a threat.",
          },
          {
            question: "Can the radar operate in bad weather?",
            answer:
              "Yes. The Aegis S-Band radar is specifically selected for its weather resilience. S-Band frequencies (2.3-2.5 GHz) experience significantly less atmospheric attenuation than X-Band or Ku-Band radar in rain, fog, and snow. In moderate rainfall (4 mm/hr), the detection range reduction is less than 5%. In heavy rainfall (16 mm/hr), detection range reduces by approximately 15%, which still provides over 29 km detection against fixed-wing UAVs. The radar also includes a weather clutter map that automatically identifies and filters precipitation returns, preventing them from generating false target detections. The adaptive waveform scheduler compensates for weather-induced signal loss by increasing transmit power within regulatory limits and extending integration time. All-weather capability is a key advantage of radar over EO/IR sensors, which are severely degraded by cloud, fog, and precipitation.",
          },
          {
            question: "Does the radar interfere with other systems?",
            answer:
              "The Aegis radar operates in the internationally allocated radiolocation band (2.3-2.5 GHz) with full spectrum management coordination. The system includes an automatic spectrum compliance module that ensures all transmissions remain within authorized power levels and frequency boundaries for the deployment location. When operating near airports, the radar coordinates with the local spectrum management authority to prevent interference with air traffic control radar and communication systems. The phased array's beam steering precision confines transmitted energy to the intended direction, minimizing sidelobe radiation that could affect other systems. In NATO deployments, the radar operates under STANAG frequency allocation agreements that prevent mutual interference with allied radar systems. Aegis Integrator provides additional deconfliction by coordinating radar operations with existing site electronics.",
          },
          {
            question: "What is the difference between surveillance and tracking modes?",
            answer:
              "Surveillance mode is the radar's wide-area search function — it scans the full 360° azimuth and -5° to +45° elevation sector every 2 seconds, detecting new targets and updating existing track positions with moderate accuracy. The beam is relatively wide (3-5°) and the update rate is sufficient for situational awareness but not for precision tracking. When a target is detected and confirmed, the radar transitions to tracking mode for that specific target, interleaving narrow-beam, high-bandwidth tracking pulses between surveillance scans. Tracking mode provides position updates every 200 milliseconds with range resolution of 1.875 meters and velocity resolution below 0.5 m/s. The radar can maintain tracking mode on 500+ targets simultaneously while continuing the surveillance scan, thanks to the phased array's ability to time-division multiplex between modes on a pulse-by-pulse basis.",
          },
        ]}
      />

      <CTASection
        title="Explore Radar Performance"
        subtitle="Request a technical briefing with our radar engineering team to evaluate detection performance against your specific target set and operational environment."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Products"
        secondaryHref="/products"
      />
    </>
  );
}
