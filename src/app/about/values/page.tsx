"use client";

import {
  SectionHero,
  TextSection,
  FeatureList,
  SplitSection,
  FAQSection,
  CTASection,
  AnimatedLine,
  Callout,
} from "@/components/sections";

export default function ValuesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/pages/company-mission.jpg"
        label="Our Values"
        title="What We Stand For"
        subtitle="Six core values guide every decision we make at Aegis — from the code we write to the customers we serve. These are not aspirational platitudes. They are operational principles that have been tested under fire and proven in the field."
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── OVERVIEW ── */}
      <TextSection label="Overview" title="Values That Drive Mission Success">
        <p>
          In the defense industry, values are often treated as marketing copy — words on a wall that bear little relationship to how a company actually behaves when contracts are on the line, schedules are slipping, and difficult trade-offs must be made. At Aegis, we reject that approach entirely. Our values are the decision-making framework that every Aegis employee — from the CEO to the newest engineer — uses when facing the hard choices that define our company and shape the safety of the people who depend on our systems.
        </p>
        <p>
          These six values were not developed in a corporate offsite or derived from a consulting framework. They emerged organically from our founding team's experiences as defense engineers and military operators who had seen firsthand what happens when defense companies prioritize profit over performance, convenience over rigor, and schedule over safety. Each value represents a lesson learned the hard way — through programs that failed because corners were cut, systems that broke because complexity was hidden, and operators who were let down because their voices were not heard.
        </p>
        <p>
          We hold ourselves accountable to these values through concrete mechanisms, not just good intentions. Every product decision is reviewed against our values criteria. Every customer interaction is evaluated in quarterly satisfaction surveys that explicitly measure value alignment. And every employee's performance assessment includes an evaluation of how well they embodied Aegis values in their daily work. Values are not what you say when it is easy. Values are what you do when it is hard. Here are ours.
        </p>
      </TextSection>

      {/* ── CALLOUT ── */}
      <Callout>
        We build systems that protect lives. That responsibility demands more
        than technical excellence — it demands moral clarity, operational
        discipline, and an unwavering commitment to doing the right thing,
        especially when the right thing is the hardest thing to do.
      </Callout>

      {/* ── VALUES ── */}
      <FeatureList
        label="Core Values"
        title="The Six Pillars"
        items={[
          {
            title: "Mission First",
            description:
              "Every decision at Aegis starts with a single question: does this make our customers more effective at their mission? If the answer is no, we do not do it — regardless of the revenue opportunity, competitive pressure, or internal preference. Mission First means that we build features based on operational need, not market trends. It means that we invest in capabilities that save lives, even when the business case is uncertain. It means that we field systems that work reliably in the worst conditions, not just in the controlled environment of a demonstration. Mission First is why our operators trust us with their safety — because they know that every product decision was made with their mission in mind, not our quarterly earnings.",
            tag: "Principle 01",
          },
          {
            title: "Radical Transparency",
            description:
              "Defense customers deserve to know exactly what they are buying, exactly how it performs, and exactly what its limitations are. Aegis practices radical transparency in every customer interaction. We publish our system performance specifications with full measurement conditions and confidence intervals, not cherry-picked best-case numbers. We disclose known limitations and constraints alongside capabilities, because an operator who knows what a system cannot do is safer than one who assumes it can do everything. When we make mistakes — and we do — we acknowledge them promptly, correct them quickly, and share the lessons learned with our entire customer base. Radical transparency builds trust, and trust is the foundation of every long-term customer relationship we have.",
            tag: "Principle 02",
          },
          {
            title: "Engineering Excellence",
            description:
              "The systems we build protect military installations, airports, and critical infrastructure from aerial threats. Lives depend on our technology working correctly, every time, without exception. This responsibility demands engineering excellence that goes far beyond industry norms. Every line of code is peer-reviewed. Every hardware component is tested beyond its rated specifications. Every system undergoes comprehensive acceptance testing before shipment. We invest 15% of revenue in R&D — three times the defense industry average — because engineering excellence is not a cost center; it is the product. Our engineers are not just employees; they are craftsmen who take personal pride in the quality and reliability of their work, and we give them the time, tools, and environment they need to do their best work.",
            tag: "Principle 03",
          },
          {
            title: "Operator Obsession",
            description:
              "We deploy our engineers to operational sites alongside our customers because the best product decisions are made by people who have seen the problem firsthand. Operator Obsession means that every user interface is designed for the 0300 shift, when the operator is exhausted and the threat is real — not for the trade show floor under perfect conditions. It means that our 24/7 support team is staffed by former military operators who understand that a system issue at 0200 is not an inconvenience; it is a potential gap in force protection. It means that we measure our success not by features shipped but by operational outcomes achieved — because the best technology in the world is worthless if the operator cannot use it effectively under stress.",
            tag: "Principle 04",
          },
          {
            title: "Integrity Without Compromise",
            description:
              "In the defense industry, integrity is not a nice-to-have — it is a legal and moral imperative. Aegis operates under some of the most stringent regulatory frameworks in the world, including ITAR, the Foreign Corrupt Practices Act, and the defense procurement integrity regulations of 12 allied nations. We comply with all of them, fully and without exception, not because compliance is legally required but because integrity is who we are. We do not cut corners on export controls to win a deal. We do not misrepresent system capabilities to close a sale. We do not accept business practices that we would be embarrassed to see published on the front page of a newspaper. Integrity Without Compromise means that our word is our bond, our commitments are kept, and our behavior would withstand the scrutiny of the most demanding audit.",
            tag: "Principle 05",
          },
          {
            title: "Continuous Evolution",
            description:
              "The threat does not stand still, and neither do we. Continuous Evolution is our commitment to constant improvement — of our products, our processes, and ourselves. We release software updates quarterly, not annually, because the threat landscape changes faster than traditional defense procurement cycles can accommodate. We conduct retrospectives after every project, every deployment, and every customer interaction, because the only way to get better is to be honest about what needs improvement. We invest in our people through continuous learning programs, rotational assignments, and conference participation, because the best engineers are the ones who never stop growing. Continuous Evolution is not about chasing the latest technology trend — it is about ensuring that Aegis capabilities are always equal to or ahead of the threats they are designed to counter.",
            tag: "Principle 06",
          },
        ]}
      />

      {/* ── VALUES IN PRACTICE ── */}
      <SplitSection
        image="/images/pages/team-collaboration.jpg"
        label="In Practice"
        title="Values in Action"
        description="Our values are not abstract concepts — they produce concrete, measurable outcomes. Mission First drives our 15% R&D investment rate and our policy of never charging for critical security patches. Radical Transparency means that every Aegis customer receives a Known Limitations document alongside their system delivery — a practice that no other counter-UAS vendor has adopted. Engineering Excellence is reflected in our 0.3% field failure rate, which is 10 times better than the defense industry average. Operator Obsession is why we maintain a 98.5% customer satisfaction rating and a 95% contract renewal rate. Integrity Without Compromise has resulted in zero compliance violations across nine years of international operations. And Continuous Evolution is demonstrated by our 2-week software iteration cycle and our track record of transitioning research to operational capability in 6 months."
        cta="See Our Standards"
        ctaHref="/about/quality"
        stats={[
          { value: "0.3%", label: "Field Failure Rate" },
          { value: "95%", label: "Contract Renewal" },
        ]}
      />

      {/* ── FAQ ── */}
      <FAQSection
        label="Values FAQ"
        title="Frequently Asked Questions"
        items={[
          {
            question: "How do you ensure values are actually followed, not just stated?",
            answer:
              "Every Aegis employee's annual performance review includes a values assessment that carries equal weight to technical performance. Product decisions are reviewed against our values criteria at every stage gate. Customer satisfaction surveys explicitly measure value alignment. And our ethics hotline — which is available to employees, customers, and partners — enables anonymous reporting of any situation where values may have been compromised. Reports are investigated by our independent ethics committee with full transparency to the board of directors.",
          },
          {
            question: "What happens when values conflict with business interests?",
            answer:
              "Values always win. We have walked away from deals that required us to misrepresent capabilities, declined to pursue markets where compliance with local practices would compromise our integrity standards, and delayed product releases when quality was not yet where it needed to be — even when the revenue impact was significant. In every case, the short-term cost was outweighed by the long-term trust we built with customers who saw us make the hard choice.",
          },
          {
            question: "How were these specific values chosen?",
            answer:
              "Our values emerged from the founding team's experiences in defense engineering and military operations. Each value represents a lesson learned from observing what goes wrong when that value is absent — programs that failed because mission was subordinated to politics, systems that broke because transparency was sacrificed for marketing advantage, operators who were endangered because engineering rigor was compromised for schedule. The values are our antidote to the failures we have witnessed.",
          },
          {
            question: "Do values influence hiring decisions at Aegis?",
            answer:
              "Absolutely. Technical skill is necessary but not sufficient to work at Aegis. Every candidate goes through a values-based interview conducted by a cross-functional panel that evaluates alignment with our six core values. We have declined technically outstanding candidates who did not demonstrate commitment to our values, because we believe that a team united by shared principles will always outperform a collection of talented individuals who lack common purpose.",
          },
          {
            question: "How do customers experience Aegis values in practice?",
            answer:
              "Customers experience our values in tangible ways: transparent performance reporting that includes limitations alongside capabilities, support engineers who answer the phone at 0300 because the operator's mission does not wait for business hours, software updates that are driven by operational need rather than marketing schedules, and the confidence that comes from knowing their vendor will tell them the truth — even when the truth is uncomfortable.",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTASection
        title="Values Are Not Negotiable"
        subtitle="At Aegis, our values are the non-negotiable foundation of everything we build and every relationship we maintain. They are the reason our customers trust us with their safety."
        primaryCta="Join Our Team"
        primaryHref="/careers"
        secondaryCta="Learn About Quality"
        secondaryHref="/about/quality"
      />
    </>
  );
}
