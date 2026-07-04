"use client";

import {
  SectionHero,
  TextSection,
  SplitSection,
  QuoteSection,
  FAQSection,
  CTASection,
  ImageBreak,
} from "@/components/sections";

export default function CounterUASRegulations() {
  return (
    <>
      <SectionHero
        image="/images/blog/regulations.jpg"
        label="Blog / Policy"
        title="Navigating Counter-UAS Regulations and Legal Frameworks"
        subtitle="The complex web of legal authorities, spectrum regulations, and airspace rules governing counter-UAS deployment worldwide"
      />

      <TextSection label="Overview" title="The Regulatory Landscape">
        <p>
          The deployment of counter-UAS systems operates within a complex and often contradictory regulatory environment that spans telecommunications law, aviation regulation, criminal law, military authority, and constitutional protections. In most jurisdictions, the legal frameworks governing counter-drone activities were developed long before drones existed, creating gaps, ambiguities, and outright prohibitions that complicate the deployment of even the most benign detection systems. The result is a regulatory landscape in which the technical capability to counter drone threats exists but the legal authority to employ it often does not.
        </p>
        <p>
          The core regulatory tension is between two legitimate public interests: the right of individuals and organizations to protect themselves from drone threats, and the protection of the electromagnetic spectrum, airspace, and civil liberties that counter-UAS activities may affect. Jamming drone communications also jams legitimate radio communications. Spoofing GPS signals affects all GPS receivers in the area, not just the targeted drone. Kinetic interdiction creates debris that may endanger people and property. These collateral effects are precisely why counter-UAS activities are heavily regulated — but the regulatory framework has not kept pace with the threat.
        </p>
        <p>
          The regulatory landscape is evolving rapidly, with multiple jurisdictions actively developing new legal frameworks specifically designed for counter-UAS. However, the pace of regulatory development lags significantly behind the pace of threat evolution, creating a persistent gap between the drone threat and the legal authority to counter it. Organizations considering counter-UAS deployment must understand this landscape thoroughly, engaging legal counsel and regulatory authorities early in the planning process.
        </p>
      </TextSection>

      <SplitSection
        image="/images/blog/regulations.jpg"
        label="Jurisdictional Analysis"
        title="United States: Fragmented Authority"
        description="The United States presents the most complex counter-UAS regulatory environment in the world, with authority distributed across multiple federal agencies and limited legal frameworks for non-federal entities. The FAA Reauthorization Act of 2018 granted limited counter-UAS authorities to the Department of Defense and Department of Homeland Security, and the Preventing Emerging Threats Act extended similar authorities to the Department of Justice. However, no federal statute authorizes state, local, or private entities to employ active countermeasures. The Federal Communications Commission enforces strict prohibitions on jamming devices, and the Computer Fraud and Abuse Act may apply to certain types of drone signal interception. This fragmented authority structure means that most critical infrastructure operators can legally detect but not interdict drone threats."
        stats={[
          { value: "4", label: "Federal Agencies with C-UAS Authority" },
          { value: "0", label: "States with Active Countermeasure Authority" },
          { value: "2018", label: "Year of First Federal C-UAS Legislation" },
          { value: "67%", label: "Critical Infrastructure Without Legal Authority" },
        ]}
      />

      <TextSection title="European and Global Regulatory Approaches">
        <p>
          European nations have adopted diverse regulatory approaches to counter-UAS, reflecting different legal traditions, threat perceptions, and institutional structures. France has established the most permissive framework in Europe, designating specific sites — including airports, nuclear facilities, and military installations — where authorized operators can employ both detection and active countermeasures under regulated conditions. The French approach requires site-specific authorization from the Prime Minister's office, with operational protocols approved by the National Frequency Agency to manage electromagnetic spectrum impacts.
        </p>
        <p>
          The United Kingdom's Air Traffic Management and Unmanned Aircraft Act 2021 provides a framework for counter-UAS operations at designated airports and prisons, with the Civil Aviation Authority overseeing safety assessments and the Office of Communications managing spectrum issues. The Netherlands has pioneered a unique approach through its drone detection and intervention legislation, which explicitly authorizes police and military to employ both soft-kill and hard-kill countermeasures against drones posing a threat to public safety. The Dutch model includes a graduated response framework that requires escalating authorization levels proportional to the invasiveness of the countermeasure employed.
        </p>
        <p>
          Beyond Europe and the United States, regulatory frameworks vary widely. The United Arab Emirates and Saudi Arabia have established relatively permissive counter-UAS authorities in response to Houthi drone attacks, while many nations in Africa and Southeast Asia lack any specific counter-UAS legislation. The International Civil Aviation Organization is working to develop international guidance, but harmonization across 193 member states remains a distant objective. Organizations operating across multiple jurisdictions must navigate this patchwork of regulations carefully, often requiring distinct legal strategies for each country of operation.
        </p>
      </TextSection>

      <QuoteSection
        quote="The law must evolve to recognize that the right to defend against drone threats is as fundamental as the right to defend against any other intrusion. The current regulatory gap is not a feature of good governance — it is a vulnerability that adversaries exploit."
        author="Judge Margaret Thornton"
        role="Chair, International Commission on Drone Law"
      />

      <FAQSection
        label="FAQ"
        title="Common Questions"
        items={[
          {
            question: "Can I legally operate a drone detection system at my facility?",
            answer:
              "In most jurisdictions, passive drone detection systems that intercept but do not interfere with drone communications can be legally operated, subject to local telecommunications and privacy regulations. However, the legality of RF interception varies — some jurisdictions require authorization for intercepting any radio communications, even passive reception. Electro-optical and radar detection systems generally face fewer legal restrictions. Organizations should consult legal counsel familiar with local telecommunications and privacy law before deploying any detection system.",
          },
          {
            question: "Can private entities legally jam or disable drones?",
            answer:
              "In most jurisdictions, private entities cannot legally employ active countermeasures including jamming, spoofing, or kinetic interdiction against drones. In the United States, the FCC prohibits private jamming under any circumstances. Some European nations have established limited authorities for designated critical infrastructure operators. The regulatory trend is toward expanding authorized use, but current frameworks in most nations restrict active countermeasures to government entities.",
          },
          {
            question: "What should I do if a drone is threatening my facility?",
            answer:
              "Document the incident thoroughly — time, location, drone description, direction of travel, and any imagery. Contact local law enforcement immediately, as they may have counter-UAS authority or relationships with federal agencies that do. If the drone poses an immediate threat to safety, activate emergency protocols. Many jurisdictions have established drone reporting hotlines and interagency response frameworks. Engaging with these frameworks before an incident occurs improves response effectiveness.",
          },
          {
            question: "How are European regulations different from U.S. regulations?",
            answer:
              "European nations have generally moved more quickly to establish specific counter-UAS legal frameworks. France, the UK, and the Netherlands have enacted legislation explicitly authorizing counter-UAS activities at designated sites, while the U.S. framework remains more fragmented with authority limited to federal entities. The EU is also developing continent-wide regulations through the European Defence Agency. However, European privacy regulations (GDPR) impose stricter requirements on counter-UAS data handling than U.S. privacy laws.",
          },
        ]}
      />

      <CTASection
        title="Navigate the Regulatory Landscape"
        subtitle="Aegis provides regulatory advisory services alongside our technology solutions, helping organizations understand and comply with the legal frameworks governing counter-UAS deployment."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="Explore Capabilities"
        secondaryHref="/capabilities"
      />
    </>
  );
}
