"use client";

import {
  SectionHero,
  TextSection,
  FeatureList,
  CTASection,
  AnimatedLine,
  StatsSection,
} from "@/components/sections";

export default function CustomerPortalPage() {
  return (
    <>
      {/* ── HERO ── */}
      <SectionHero
        image="/images/support/customer-portal.jpg"
        label="Customer Portal"
        title="Your Command Center"
        subtitle="The Aegis Customer Portal provides 24/7 access to support tickets, firmware updates, knowledge base articles, system health monitoring, and direct communication with your dedicated Aegis support team."
        cta="Request Portal Access"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── OVERVIEW ── */}
      <TextSection label="Overview" title="One Portal. Every Resource.">
        <p>
          The Aegis Customer Portal consolidates every interaction between your organization and Aegis support into a single, secure, purpose-built platform. Manage support tickets, download firmware updates, search the knowledge base, monitor system health, access training resources, and collaborate with the Aegis community — all from one authenticated interface.
        </p>
        <p>
          The portal is built on a zero-trust security architecture hosted on AWS GovCloud with FedRAMP Moderate authorization. Every access request is authenticated, authorized, and encrypted. The portal supports SAML 2.0 and OpenID Connect for enterprise identity provider integration, enabling single sign-on with DoD CAC, PKI, and allied national credential systems.
        </p>
      </TextSection>

      {/* ── PORTAL STATS ── */}
      <StatsSection
        label="Portal Metrics"
        stats={[
          { value: "24/7", label: "Availability" },
          { value: "99.95%", label: "Uptime SLA" },
          { value: "<30s", label: "Ticket Routing" },
          { value: "5,000+", label: "Knowledge Articles" },
        ]}
      />

      {/* ── PORTAL FEATURES ── */}
      <FeatureList
        label="Features"
        title="Portal Capabilities"
        items={[
          {
            title: "Ticket Management",
            tag: "Support",
            description:
              "Create, track, and manage support tickets with automatic classification by issue type and severity. Priority 1 tickets trigger automatic escalation to the on-call engineering team with notification to your account manager within 15 minutes. Real-time status updates, integrated messaging with the assigned engineer, and indefinite ticket history retention for complete audit trails.",
          },
          {
            title: "Software Downloads",
            tag: "Updates",
            description:
              "Centralized firmware and software update management filtered by your deployed system configurations. Download updates directly or schedule automatic deployment through the OTA management console. The system validates package integrity, verifies compatibility, and creates automatic rollback points before installation. Critical security patches are highlighted for immediate deployment.",
          },
          {
            title: "Knowledge Base",
            tag: "Self-Service",
            description:
              "Search and browse over 5,000 articles covering operational procedures, troubleshooting guides, frequently asked questions, best practices, and how-to tutorials. Full-text search returns relevant results in under 200 milliseconds. Each article is tagged with applicable software versions and last-verified dates, ensuring information is current and accurate.",
          },
          {
            title: "System Health Dashboard",
            tag: "Monitoring",
            description:
              "Monitor real-time health and performance of all deployed Aegis systems from a single dashboard. View system status, sensor availability, processing load, network connectivity, and storage capacity for every Aegis node in your fleet. Configurable alerts notify you when parameters exceed thresholds, enabling proactive maintenance before issues impact operations.",
          },
          {
            title: "Training Resources",
            tag: "Learning",
            description:
              "Access training materials, course schedules, and certification status for your team. Includes self-study packages for operators preparing for formal training or maintaining proficiency between recertification cycles. Training completion records and qualification certificates are maintained within the portal for audit and compliance purposes.",
          },
          {
            title: "Community Forum",
            tag: "Collaboration",
            description:
              "Connect with Aegis operators and system administrators worldwide in a moderated, secure community forum. Share deployment best practices, discuss operational tactics, and learn from the experiences of other organizations running Aegis systems. Aegis engineering and support staff actively participate, providing authoritative answers to technical questions.",
          },
        ]}
      />

      {/* ── ACCESS REQUIREMENTS ── */}
      <section className="py-20 md:py-32 bg-black border-t border-white/10">
        <div className="max-w-[56rem] mx-auto px-6 md:px-12 lg:px-20">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
            Access
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white mb-8">
            Access Requirements
          </h2>
          <div className="space-y-6">
            <div className="border border-white/10 bg-[#0a0a0a] p-6 flex items-start gap-5">
              <div className="w-8 h-8 flex items-center justify-center border border-white/20 text-white text-sm font-bold shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Active Support Contract</h3>
                <p className="text-[#b9b9b9] text-sm leading-relaxed">
                  Portal access is included with every Aegis system purchase through an active Essential, Enhanced, or Premium Support contract. Your organization&apos;s designated administrator receives onboarding credentials upon system delivery.
                </p>
              </div>
            </div>
            <div className="border border-white/10 bg-[#0a0a0a] p-6 flex items-start gap-5">
              <div className="w-8 h-8 flex items-center justify-center border border-white/20 text-white text-sm font-bold shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Verified Credentials</h3>
                <p className="text-[#b9b9b9] text-sm leading-relaxed">
                  All users must authenticate through your organization&apos;s identity provider using SAML 2.0 or OpenID Connect. Multi-factor authentication is required. DoD CAC, PKI, and allied national credential systems are supported.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Your Mission. Your Portal."
        subtitle="The Aegis Customer Portal puts everything you need to manage, maintain, and optimize your counter-UAS systems in one secure, always-available platform."
        primaryCta="Request Portal Access"
        primaryHref="/request-demo"
        secondaryCta="Contact Support"
        secondaryHref="/request-demo"
      />
    </>
  );
}
