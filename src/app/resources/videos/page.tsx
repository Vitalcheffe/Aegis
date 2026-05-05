"use client";

import {
  SectionHero,
  CardGrid,
  CTASection,
  TextSection,
} from "@/components/sections";

export default function VideosPage() {
  return (
    <>
      <SectionHero
        image="/images/resources/videos.jpg"
        label="Resources"
        title="Video Library"
        subtitle="Product demonstrations, operational footage, and expert interviews — see Aegis counter-UAS systems in action across military, infrastructure, and urban environments."
        cta="Watch Now"
        ctaHref="#featured"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <TextSection label="Overview" title="See the System in Action">
        <p>
          The Aegis video library provides direct visual evidence of our counter-UAS technology performing under real-world conditions. Every video in this collection was captured during live demonstrations, operational deployments, or controlled test events — never simulated or rendered. We believe that seeing is believing, and that defense professionals deserve transparent, unedited evidence of system performance rather than marketing presentations. Our video documentation policy requires that all published footage include the test conditions, target specifications, sensor configuration, and any environmental factors that may have influenced performance outcomes.
        </p>
        <p>
          The library is organized into four categories: Product Demonstrations that walk through system capability and user interface, Operational Footage that documents real-world threat engagements and graduated response sequences, Technical Deep Dives that explain the science behind our detection, classification, and neutralization technologies, and Expert Interviews that feature our engineering leadership and field operations teams discussing the strategic and tactical dimensions of the counter-UAS mission. New content is published monthly, and registered users receive notification when new videos become available.
        </p>
      </TextSection>

      <CardGrid
        label="Product Demonstrations"
        title="System Walkthroughs"
        cards={[
          {
            title: "Aegis Core: Complete System Demonstration",
            description:
              "A 22-minute comprehensive walkthrough of the Aegis Core fixed-site counter-UAS platform, covering initial deployment and calibration, sensor array configuration, the operator interface for real-time threat monitoring, and live engagement of three target types — a DJI Matrice 300 RTK at 12 km, a custom fixed-wing UAV at 28 km, and a micro-drone swarm of 8 platforms at 5 km. Includes demonstration of the graduated response protocol from RF jamming through GPS spoofing to kinetic interdiction recommendation.",
            tag: "22 min",
          },
          {
            title: "Aegis Shield: Dismounted Operations Demo",
            description:
              "Field demonstration of the Aegis Shield man-portable system operated by a two-person infantry team during a dismounted patrol exercise. The video shows rapid deployment from backpack to operational in under 4 minutes, detection and classification of an approaching quadcopter at 6 km, operator hand-off from detection to engagement mode, and the 60° directional RF jammer neutralizing the target at 2.5 km range. Includes footage from both the operator perspective and an external camera capturing the drone response to the jamming signal.",
            tag: "15 min",
          },
        ]}
      />

      <CardGrid
        label="Operational Footage"
        title="Live Engagements"
        cards={[
          {
            title: "Swarm Engagement: NATO Live Fire Exercise",
            description:
              "Classified NATO exercise footage showing Aegis Command coordinating the simultaneous engagement of a 25-drone heterogenous swarm attack. The video documents the complete kill chain from first radar contact through final neutralization across 12 seconds of autonomous operation. Watch the AI Layer decompose the swarm into individual threat tracks, the Decision Layer assign graduated responses based on each platform's assessed role, and the Action Layer execute jamming, spoofing, and kinetic recommendations simultaneously across multiple engagement vectors.",
            tag: "18 min",
          },
          {
            title: "Airport Perimeter Breach: Real-World Incident",
            description:
              "Authentic footage from an Aegis Sentinel installation at a major international airport capturing an unauthorized drone intrusion into the approach corridor. The video shows automatic detection at 14 km, classification as a modified commercial platform carrying an unidentified payload, graduated response initiation with RF jamming at 8 km, and GPS spoofing redirect to a safe landing zone at 5 km. Airport operations continued uninterrupted throughout the 47-second engagement. All personally identifiable information has been redacted per airport security protocols.",
            tag: "8 min",
          },
          {
            title: "Convoy Protection: On-the-Move Engagement",
            description:
              "Dashboard and external camera footage from an Aegis Mobile installation protecting a military convoy during a training exercise in desert terrain. The video shows detection of a surveillance drone orbiting the convoy at 10 km range, classification as a reconnaissance platform, and the decision to execute RF jamming rather than kinetic interdiction to preserve operational security. The entire engagement occurs while the convoy maintains 60 km/h road speed, demonstrating the mobile platform's capability to detect, classify, and respond while on the move.",
            tag: "12 min",
          },
          {
            title: "Maritime Approach: Harbor Defense Exercise",
            description:
              "Coastal defense exercise footage showing Aegis Core detecting and engaging multiple drone threats approaching a naval harbor from seaward. The video demonstrates the unique challenges of maritime C-UAS — sea clutter rejection, atmospheric ducting effects on radar propagation, and the need for extended engagement ranges to protect vessels in the approach channel. Three simultaneous tracks are maintained and neutralized using graduated response, with the harbor remaining fully operational throughout the engagement window.",
            tag: "14 min",
          },
        ]}
      />

      <CardGrid
        label="Expert Interviews"
        title="From the Engineering Team"
        cards={[
          {
            title: "The Science of RF Sensing: Interview with Dr. Sarah Chen",
            description:
              "Dr. Sarah Chen, Aegis Director of RF Engineering, explains the fundamental physics of passive radio frequency detection for counter-UAS applications. The interview covers direction-finding antenna array design, signal processing techniques for extracting drone control signals from background RF noise, and the challenge of detecting frequency-hopping and encrypted control links. Dr. Chen also previews the next-generation Aegis RF array, which extends detection range to 75 km and adds cognitive radio capabilities for adaptive spectrum monitoring.",
            tag: "25 min",
          },
          {
            title: "AI at the Edge: How We Achieve 20ms Classification",
            description:
              "Markus Weber, VP of AI Engineering, walks through the architecture of the Aegis Neural Processing Unit and the optimization techniques that enable sub-20-millisecond threat classification on a 400-watt power budget. The interview covers model architecture selection, quantization strategies for deploying transformer and graph neural networks on embedded hardware, and the continuous learning pipeline that updates fielded models with new threat signatures within 72 hours of first observation worldwide.",
            tag: "20 min",
          },
        ]}
      />

      <CTASection
        title="Request a Live Demonstration"
        subtitle="See Aegis technology perform against your specific threat scenarios in a live, in-person demonstration at one of our test ranges or at your facility."
        primaryCta="Schedule a Demo"
        primaryHref="/request-demo"
        secondaryCta="Contact Sales"
        secondaryHref="/contact"
      />
    </>
  );
}
