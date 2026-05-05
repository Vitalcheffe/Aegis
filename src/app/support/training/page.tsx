"use client";

import {
  SectionHero,
  TextSection,
  SplitSection,
  CardGrid,
  FeatureList,
  FAQSection,
  CTASection,
  AnimatedLine,
  StatsSection,
} from "@/components/sections";

export default function TrainingPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/support/training.jpg"
        label="Training"
        title="Training Programs"
        subtitle="From basic operator qualification to advanced threat analysis and system administration — Aegis training produces confident, capable professionals who can leverage the full power of the Aegis platform under operational stress."
        cta="Enroll in Training"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── OVERVIEW ── */}
      <TextSection label="Overview" title="Train Like You Fight">
        <p>
          The most sophisticated counter-UAS system in the world is only as effective as the operator behind the console. That is why Aegis invests more in training than any other counter-UAS vendor — because we have seen firsthand how operator proficiency directly determines mission outcomes. Our training programs are developed and delivered by former military operators and defense engineers who bring real-world counter-UAS experience to every course, ensuring that training content reflects the actual threats, environments, and operational constraints that your team will face.
        </p>
        <p>
          Aegis training goes beyond button-pushing. Our curriculum emphasizes threat understanding, tactical decision-making, and adaptive problem-solving — the skills that separate effective operators from trained users. Every course includes immersive scenario-based exercises that simulate real engagement conditions, including degraded communications, multi-axis attacks, and rules-of-engagement constraints. These scenarios are derived from actual operational events, ensuring that the training experience is as close to real-world employment as possible without the associated risks.
        </p>
        <p>
          We offer training at our dedicated facilities in Arlington, Virginia and Farnborough, United Kingdom, as well as at customer sites worldwide. All courses are available in English, with select programs offered in French, German, Japanese, and Arabic. Custom training programs can be developed to address customer-specific operational requirements, threat profiles, and rules of engagement.
        </p>
      </TextSection>

      {/* ── TRAINING STATS ── */}
      <StatsSection
        label="Training Impact"
        stats={[
          { value: "500+", label: "Operators Trained" },
          { value: "12", label: "Nations Served" },
          { value: "98%", label: "Pass Rate" },
          { value: "40+", label: "Course Offerings" },
          { value: "24", label: "Instructors" },
        ]}
      />

      {/* ── COURSE TYPES ── */}
      <FeatureList
        label="Course Catalog"
        title="Training Programs"
        items={[
          {
            title: "Operator Basic Course",
            description:
              "The Operator Basic Course is the foundational training program for all Aegis system operators. This five-day intensive course covers system architecture and components, sensor operations and management, track interpretation and situational awareness, basic classification and threat assessment, engagement procedures and rules of employment, and basic troubleshooting and fault isolation. Students complete a minimum of 12 scenario-based exercises culminating in a live-fire demonstration with real UAS targets. Upon successful completion, operators receive Aegis Operator Qualification, which is required for unsupervised operation of any Aegis system. The course is offered monthly at our Arlington and Farnborough training centers.",
            tag: "5 Days",
          },
          {
            title: "Operator Advanced Course",
            description:
              "The Operator Advanced Course builds on basic qualification with sophisticated operational skills including multi-sensor fusion management, swarm engagement tactics, degraded mode operations, joint force coordination, and advanced rules-of-engagement interpretation. The three-day course uses our high-fidelity Aegis Tactical Simulator, which can simulate complex multi-threat scenarios that would be impossible or impractical to replicate with live UAS. Advanced operators learn to manage system performance under stress, adapt to unexpected threat behaviors, and coordinate counter-UAS operations with adjacent units and higher headquarters. Prerequisite: Operator Basic Course qualification.",
            tag: "3 Days",
          },
          {
            title: "Threat Analyst Course",
            description:
              "The Threat Analyst Course trains intelligence professionals to leverage Aegis sensor data and classification outputs for threat analysis and reporting. The five-day course covers Aegis data export and analysis tools, UAS threat taxonomy and classification methodology, RF signature analysis and correlation, flight pattern analysis and behavioral profiling, threat reporting formats and intelligence products, and predictive threat modeling using Aegis AI analytics. Threat analysts learn to transform raw Aegis sensor data into actionable intelligence that informs operational planning and force protection decisions. The course includes hands-on exercises with real (sanitized) threat data from Aegis operational archives.",
            tag: "5 Days",
          },
          {
            title: "System Administrator Course",
            description:
              "The System Administrator Course trains IT and communications professionals to install, configure, maintain, and troubleshoot Aegis hardware and software. The ten-day course covers hardware installation and commissioning, network configuration and cybersecurity hardening, user account management and access control, sensor integration and adapter configuration, software update procedures and rollback management, system health monitoring and performance optimization, and disaster recovery and backup procedures. System administrators learn to perform all first-line and second-line maintenance tasks, reducing dependence on Aegis field engineering support for routine operations.",
            tag: "10 Days",
          },
          {
            title: "Train-the-Trainer Course",
            description:
              "The Train-the-Trainer Course qualifies customer personnel to deliver Aegis Operator Basic Course instruction to their own organizations. The five-day course covers adult learning principles and instructional design, Aegis training curriculum and lesson plans, simulator operation and scenario development, assessment and evaluation methods, and training program administration. Graduates receive certified instructor status and ongoing access to updated training materials, scenario libraries, and instructor support channels. This course enables large organizations to scale their Aegis training capacity without proportional increases in vendor-provided training.",
            tag: "5 Days",
          },
          {
            title: "Executive Awareness Briefing",
            description:
              "The Executive Awareness Briefing is a one-day program designed for senior military and civilian leaders who need to understand Aegis capabilities, limitations, and employment considerations without the technical depth of operator training. The briefing covers the counter-UAS threat landscape, Aegis system capabilities and performance, rules of engagement and legal considerations, force structure and staffing requirements, and cost of ownership and lifecycle planning. The briefing includes a live demonstration of Aegis capabilities and a question-and-answer session with Aegis operational leadership.",
            tag: "1 Day",
          },
        ]}
      />

      {/* ── TRAINING FACILITY ── */}
      <SplitSection
        image="/images/pages/lab-research.jpg"
        label="Facilities"
        title="State-of-the-Art Training Centers"
        description="Aegis operates dedicated training centers at our headquarters in Arlington, Virginia and at our European office in Farnborough, United Kingdom. Each facility features multiple classrooms equipped with Aegis operator workstations, a high-fidelity tactical simulator suite capable of reproducing complex multi-threat scenarios, a live-fire range for UAS engagement demonstrations, and secure briefing rooms for classified course content. Our training centers also house the Aegis Threat Library, a curated collection of over 800 UAS threat profiles with associated RF signatures, flight characteristics, and neutralization parameters — the most comprehensive counter-UAS reference database in the industry. Students have access to the library throughout their course, building the threat knowledge that is essential for effective operational employment."
        cta="Schedule a Visit"
        ctaHref="/request-demo"
        stats={[
          { value: "2", label: "Training Centers" },
          { value: "800+", label: "Threat Profiles" },
        ]}
      />

      {/* ── CERTIFICATION CARDS ── */}
      <CardGrid
        label="Certifications"
        title="Qualification & Certification"
        cards={[
          {
            title: "Aegis Operator Qualification",
            description:
              "Awarded upon successful completion of the Operator Basic Course, this qualification certifies that the holder is proficient in all standard Aegis operator tasks and is authorized for unsupervised operation of Aegis systems. Qualification is valid for two years and requires requalification through the Operator Recertification Course, which covers new capabilities introduced since initial qualification and validates continued proficiency through scenario-based assessments.",
            tag: "Operators",
          },
          {
            title: "Aegis Advanced Operator",
            description:
              "Awarded upon successful completion of the Operator Advanced Course, this certification recognizes proficiency in complex operational scenarios including swarm engagement, degraded mode operations, and joint force coordination. Advanced Operator status is a prerequisite for team leader and shift supervisor positions in Aegis operations centers. The certification demonstrates the ability to manage high-tempo, multi-threat environments with minimal supervision.",
            tag: "Advanced",
          },
          {
            title: "Aegis System Administrator",
            description:
              "Awarded upon successful completion of the System Administrator Course, this certification authorizes the holder to perform all first-line and second-line maintenance tasks on Aegis hardware and software. Certified administrators can install and commission new systems, manage user accounts and access controls, configure sensor integrations, and perform software updates and system recovery procedures. The certification is valid for three years with continuing education requirements.",
            tag: "Administrators",
          },
          {
            title: "Aegis Certified Instructor",
            description:
              "Awarded upon successful completion of the Train-the-Trainer Course, this certification authorizes the holder to deliver Aegis Operator Basic Course instruction within their organization. Certified instructors receive ongoing access to updated training materials, new scenario packages, and direct support from the Aegis training development team. Instructor certification requires annual recertification through a virtual review of instructional delivery and curriculum knowledge.",
            tag: "Instructors",
          },
        ]}
      />

      {/* ── FAQ ── */}
      <FAQSection
        label="Training FAQ"
        title="Frequently Asked Questions"
        items={[
          {
            question: "What are the prerequisites for Aegis training courses?",
            answer:
              "The Operator Basic Course has no prerequisites beyond a valid security clearance appropriate to the customer's deployment environment. Advanced courses require completion of prerequisite courses as specified in the course catalog. All students must complete a pre-course self-study module (approximately 4 hours) that covers basic Aegis architecture and terminology. Students who have not completed the pre-course module may be denied admission to the course.",
          },
          {
            question: "Can training be conducted at our facility instead of Aegis training centers?",
            answer:
              "Yes. Aegis offers mobile training teams that can deliver all courses at customer facilities worldwide. Mobile training requires a suitable classroom environment with network connectivity, projector, and sufficient space for operator workstations. For live-fire demonstrations, a suitable outdoor range with appropriate airspace clearances is required. Our training logistics team will work with your facility managers to ensure that all requirements are met before the training team arrives.",
          },
          {
            question: "How often do operators need to recertify?",
            answer:
              "Aegis Operator Qualification is valid for two years. Recertification requires completion of a two-day Operator Recertification Course that covers new capabilities, validates continued proficiency through scenario-based assessments, and addresses any procedural changes since initial qualification. Operators who do not recertify within the validity period must complete the full Operator Basic Course to regain qualification.",
          },
          {
            question: "Are training courses available in languages other than English?",
            answer:
              "Select Aegis training courses are available in French, German, Japanese, and Arabic. Translated courses are delivered by native-speaking instructors who are also qualified Aegis operators. For languages not currently supported, we offer simultaneous interpretation services at an additional cost. We are continuously expanding our multilingual training capacity based on customer demand.",
          },
          {
            question: "What is the instructor-to-student ratio for training courses?",
            answer:
              "Aegis maintains a maximum 1:6 instructor-to-student ratio for all operator courses and a 1:4 ratio for simulator-based practical exercises. This ensures that every student receives adequate individual attention and hands-on time with the system. For the System Administrator Course, the ratio is 1:4 for hands-on lab exercises. These ratios are based on military training best practices and have been validated through nine years of training delivery.",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Invest in Operator Excellence"
        subtitle="The best technology demands the best operators. Aegis training programs produce professionals who are confident under pressure, proficient across all system capabilities, and ready for whatever the threat environment delivers."
        primaryCta="Enroll in Training"
        primaryHref="/request-demo"
        secondaryCta="Contact Training Team"
        secondaryHref="/request-demo"
      />
    </>
  );
}
