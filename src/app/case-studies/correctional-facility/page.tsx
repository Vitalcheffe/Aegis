"use client";

import {
  SectionHero,
  TextSection,
  SplitSection,
  StatsSection,
  SpecTable,
  CTASection,
  QuoteSection,
  FAQSection,
} from "@/components/sections";

export default function CorrectionalFacilityPage() {
  return (
    <>
      <SectionHero
        image="/images/case-studies/correctional.jpg"
        label="Case Study"
        title="Contraband Interdiction at Federal Correctional Facilities"
        subtitle="How Aegis Sentinel deployed across eight federal prisons to achieve a 97% interdiction rate and eliminate drone deliveries within 90 days"
      />

      <StatsSection
        label="Mission Results"
        stats={[
          { value: "8", label: "Facilities Protected" },
          { value: "97%", label: "Interdiction Rate" },
          { value: "400%", label: "Prior Increase in Drops" },
          { value: "90 days", label: "To Zero Deliveries" },
        ]}
      />

      <TextSection label="Background" title="The Challenge">
        <p>
          The Federal Bureau of Prisons faced a crisis as drone-delivered contraband surged 400% over two years, transforming the security dynamics of its correctional facilities. Inmates with outside connections coordinated drone deliveries of cellular phones, SIM cards, narcotics including fentanyl, tobacco, weapons, and escape tools directly into prison yards and housing units. The deliveries were remarkably precise — drones hovered outside cell windows and dropped packages through ventilation grates, or released payloads over recreation yards during the brief windows when inmates were outside. The BOP documented 312 confirmed drone delivery attempts across its medium and high-security facilities in a single fiscal year, but estimated the actual number was three to four times higher based on the volume of contraband recovered from inmates that could not be attributed to traditional smuggling methods.
        </p>
        <p>
          The consequences were severe and accelerating. Cellular phones enabled inmates to continue coordinating criminal enterprises from inside prison walls, including drug trafficking, witness intimidation, and fraud operations. Fentanyl deliveries resulted in multiple overdose incidents requiring emergency medical response. Makeshift weapons delivered by drone were used in inmate-on-inmate assaults and against correctional officers. The BOP's existing countermeasures — netting over recreation yards, increased perimeter patrols, and cell phone detection systems — were inadequate against drones that could deliver payloads from altitude with precision, bypassing ground-level security entirely. The agency identified eight facilities with the highest drone activity and initiated an emergency procurement for a counter-UAS solution that could operate reliably in the prison environment without requiring significant infrastructure modifications or additional staffing.
        </p>
      </TextSection>

      <SplitSection
        image="/images/pages/prison-facility.jpg"
        label="Solution"
        title="Aegis Sentinel Prison Defense"
        description="Aegis Defense Systems deployed Aegis Sentinel — an autonomous counter-UAS platform specifically designed for facility protection — across all eight identified correctional facilities. Each installation comprised a compact phased-array radar unit mounted on an existing guard tower or building, providing 360° detection coverage out to 5 km, which fully encompassed the typical launch distances used by drone operators. The radar fed into an Aegis Core sensor fusion node that integrated EO/IR cameras for visual verification and RF direction-finding for operator geolocation. The neutralization layer employed precision RF denial that targeted only the drone's command frequencies, causing the drone to either land in place or return to its operator — ensuring that contraband payloads never reached inmates. All eight installations were monitored remotely from the BOP's central operations center via Aegis Command, enabling 24/7 automated protection without requiring additional on-site technical staff."
        stats={[
          { value: "5 km", label: "Detection Range" },
          { value: "360°", label: "Coverage" },
          { value: "24/7", label: "Autonomous Operation" },
        ]}
      />

      <TextSection label="Operations" title="Mission Execution">
        <p>
          All eight Aegis Sentinel installations reached operational capability within 90 days of contract award. The standardized deployment package enabled parallel installation at multiple facilities, with each site requiring approximately five days for hardware installation, system calibration, and operator training. The immediate impact was dramatic: during the first week of operation, the system detected 47 drone delivery attempts across the eight facilities — more than the BOP had documented in the entire previous quarter. The discrepancy confirmed that the vast majority of drone deliveries had been occurring undetected. Each detected drone was neutralized by RF denial, causing it to land or return to its operator. In 38 of the 47 cases, law enforcement was dispatched to the drone's landing location based on Aegis RF triangulation, resulting in the apprehension of 31 operators and the recovery of contraband including 89 cellular phones, 2.4 kg of narcotics, and multiple weapons.
        </p>
        <p>
          Within 90 days of full operational capability, drone delivery attempts dropped to near zero at all eight facilities. The interdiction rate — defined as preventing contraband from reaching inmates — was 97%, with the 3% representing rare cases where drones dropped payloads from extreme altitude before RF denial could take effect. The system's deterrence effect was even more significant than its active interdiction capability: once drone operators learned that facilities were protected by Aegis Sentinel, delivery attempts declined by 85% within the first three months as the risk-reward calculus shifted decisively against aerial smuggling. The few operators who continued attempting deliveries were systematically identified and apprehended by law enforcement using Aegis-generated geolocation data. The BOP reported a 73% reduction in contraband incidents overall at the eight protected facilities, as drone deliveries had been the primary conduit for the most dangerous contraband categories.
        </p>
      </TextSection>

      <QuoteSection
        quote="We went from finding phones and drugs in cells every day with no idea how they got there, to watching drones drop out of the sky and police picking up the operators. Within three months, the deliveries just stopped. The word got out on the street — don't fly drones at federal prisons."
        author="Warden Thomas R. Mitchell"
        role="Federal Bureau of Prisons, Medium Security Facility"
      />

      <SpecTable
        label="Deployment Details"
        title="System Configuration"
        specs={[
          { label: "Products Deployed", value: "Aegis Sentinel (8 units), Aegis Core (8), Command" },
          { label: "Coverage Area", value: "8 facilities, 5 km radius each" },
          { label: "Threats Neutralized", value: "47 in first week, 340+ over 12 months" },
          { label: "Operational Hours", value: "8,760 per facility (24/7/365)" },
          { label: "Mission Duration", value: "Ongoing since deployment" },
          { label: "Interdiction Rate", value: "97% (contraband prevented from reaching inmates)" },
          { label: "Neutralization Method", value: "RF denial (100% — precision, no collateral)" },
          { label: "Operator Apprehensions", value: "31 in first week, 140+ over 12 months" },
          { label: "Contraband Recovered", value: "89 phones, 2.4 kg narcotics, multiple weapons (first week)" },
          { label: "Deployment Timeline", value: "90 days for all 8 facilities" },
        ]}
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "How does Aegis Sentinel handle drones that drop payloads from high altitude before RF denial can engage?",
            answer:
              "The Aegis Sentinel system is designed to detect and engage drones as early as possible in their approach to the facility. With 5 km detection range and a mean time-to-engage of under 3 seconds, the system typically neutralizes drones well before they reach drop altitude. For the rare cases where drones approach from extreme altitude — above 200 meters — the system's rapid RF denial causes the drone to lose control before it can accurately release its payload. In the deployment, the 3% of cases where contraband reached the ground involved high-altitude drops that landed outside the facility perimeter due to the drone's loss of control. No contraband reached inmates in these cases.",
          },
          {
            question: "Does the system require dedicated staff to operate at each facility?",
            answer:
              "No. Aegis Sentinel is designed for fully autonomous operation. The system detects, classifies, and neutralizes drone threats without human intervention, operating under pre-configured rules of engagement approved by the facility warden. All eight installations are monitored remotely from the BOP's central operations center via Aegis Command, with automated alerts sent to facility security staff and local law enforcement when a drone is detected. The system requires only routine maintenance — quarterly inspections and firmware updates — performed by Aegis field service technicians. No additional BOP staffing was required for the deployment.",
          },
          {
            question: "What happens to contraband when a drone is forced to land by RF denial?",
            answer:
              "When RF denial forces a drone to land or return to its operator, the contraband remains with the drone. In 81% of cases, the drone lands at or near its launch point, where law enforcement can apprehend the operator and recover the contraband. In 19% of cases, the drone lands in the vicinity of the prison — typically outside the perimeter fence — where the Aegis Command system provides precise landing coordinates to facility security staff for recovery. In no case did contraband reach inmates after the drone was neutralized by RF denial.",
          },
          {
            question: "Can Aegis Sentinel be integrated with existing prison security systems?",
            answer:
              "Yes. Aegis Sentinel integrates with common prison security infrastructure including CCTV systems, perimeter intrusion detection, and the BOP's centralized command and control platform. When a drone is detected, the system can automatically cue PTZ cameras to the threat location and generate alerts on the facility's security management system. The integration requires only network connectivity and standard API configuration — no modifications to existing security systems are needed.",
          },
          {
            question: "How does the system avoid false positives that could trigger unnecessary security responses?",
            answer:
              "Aegis Sentinel's multi-modal sensor fusion ensures high-confidence classification before any response is initiated. The system cross-references radar returns with EO/IR imagery and RF emission analysis to confirm that a detected contact is a drone and not a bird, aircraft, or other non-threat object. Over the deployment, the system recorded zero false positive engagements — every neutralization action was directed at a confirmed drone. Alert thresholds are configurable per facility, allowing wardens to set the sensitivity level appropriate to their threat environment.",
          },
        ]}
      />

      <CTASection
        title="Stop Drone Delivered Contraband"
        subtitle="Aegis Sentinel is proven to eliminate drone deliveries within 90 days. Protect your correctional facility with autonomous counter-UAS technology."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="View All Case Studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
