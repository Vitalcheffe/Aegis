"use client";

import {
  SectionHero,
  TextSection,
  FeatureList,
  SplitSection,
  FAQSection,
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
        cta="Access Portal"
        ctaHref="/request-demo"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      <AnimatedLine />

      {/* ── OVERVIEW ── */}
      <TextSection label="Overview" title="One Portal. Every Resource.">
        <p>
          Managing a deployed counter-UAS system involves constant coordination between operators, maintainers, system administrators, and vendor support. Before the Aegis Customer Portal, this coordination happened through fragmented channels — emails for support tickets, separate portals for firmware downloads, shared drives for documentation, and phone calls for urgent issues. The result was inconsistent, inefficient, and difficult to audit. The Aegis Customer Portal consolidates all of these functions into a single, secure, purpose-built platform that serves as the central hub for every interaction between your organization and Aegis support.
        </p>
        <p>
          The portal is designed around three core principles: visibility, responsiveness, and security. Visibility means that you can see the real-time status of every support ticket, every firmware update, and every system in your fleet from a single dashboard. Responsiveness means that support requests are automatically routed to the most qualified available engineer, with escalation paths that ensure no issue goes unaddressed. Security means that every interaction occurs over encrypted channels, every user is authenticated through your organization's identity provider, and every action is logged and auditable.
        </p>
        <p>
          The Customer Portal is hosted on AWS GovCloud with FedRAMP Moderate authorization and is accessible from both Unclassified and Secret networks through our cross-domain solution. Mobile-responsive design ensures full functionality from any device, including the ruggedized tablets commonly used in tactical operations centers. The portal is available 24/7 with 99.95% uptime SLA and is fully operational during planned maintenance windows through our blue-green deployment architecture.
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
            title: "Support Ticket Management",
            description:
              "Create, track, and manage support tickets through a full-featured ticket management system. Each ticket is automatically classified by issue type and severity, assigned a priority level, and routed to the most qualified available support engineer. Real-time status updates keep you informed of progress, and integrated messaging enables direct communication with the assigned engineer without leaving the portal. Ticket history is retained indefinitely, providing a complete audit trail of all support interactions. Priority 1 tickets trigger automatic escalation to the on-call engineering team and notification to your account manager within 15 minutes of creation.",
            tag: "Support",
          },
          {
            title: "Firmware & Software Updates",
            description:
              "Access the latest firmware and software updates for all your Aegis systems through the portal's centralized update management interface. The update catalog shows available updates filtered by your deployed system configurations, with clear descriptions of new features, resolved issues, and compatibility notes. Download updates directly or schedule automatic deployment through the portal's OTA management console. The update system validates package integrity, verifies compatibility with your system configuration, and creates automatic rollback points before installation. Critical security patches are highlighted and recommended for immediate deployment.",
            tag: "Updates",
          },
          {
            title: "Knowledge Base",
            description:
              "Search and browse over 5,000 knowledge base articles covering operational procedures, troubleshooting guides, frequently asked questions, best practices, and how-to tutorials. Articles are organized by topic, product, and role, with full-text search that returns relevant results in under 200 milliseconds. Each article is tagged with applicable software versions and last-verified dates, ensuring that the information you find is current and accurate. Knowledge base articles are continuously updated based on support ticket trends — if multiple customers encounter the same issue, a knowledge base article is created to help others resolve it independently.",
            tag: "Knowledge",
          },
          {
            title: "System Health Dashboard",
            description:
              "Monitor the real-time health and performance of all your deployed Aegis systems from a single dashboard. The health dashboard displays system status, sensor availability, processing load, network connectivity, and storage capacity for every Aegis node in your fleet. Configurable alerts notify you when any parameter exceeds defined thresholds, enabling proactive maintenance before issues impact operations. The dashboard also provides historical performance data and trend analysis, helping you plan for capacity upgrades and anticipate maintenance requirements before they become urgent.",
            tag: "Monitoring",
          },
          {
            title: "Operational Advisories",
            description:
              "Receive timely operational advisories about new UAS threats, emerging tactics, and recommended countermeasures directly through the portal. Advisories are issued by the Aegis Threat Intelligence team and are based on real-time analysis of threat data from the global Aegis fleet. Each advisory includes a threat description, affected regions, recommended system configuration changes, and updated classification model packages when applicable. Critical advisories trigger push notifications to registered operators and system administrators, ensuring that time-sensitive threat information reaches the people who need it immediately.",
            tag: "Advisories",
          },
          {
            title: "Account Management",
            description:
              "Manage your Aegis account, user access, and organizational settings through the portal's account management interface. Add and remove users, assign roles and permissions, configure multi-factor authentication, and manage API credentials — all from a self-service interface that eliminates the need to contact support for routine administrative tasks. Role-based access control ensures that each user sees only the information and functions appropriate to their authorization level, from read-only operator access to full administrative privileges.",
            tag: "Administration",
          },
        ]}
      />

      {/* ── PORTAL SECURITY ── */}
      <SplitSection
        image="/images/pages/cyber-operations.jpg"
        label="Security"
        title="Enterprise-Grade Security"
        description="The Customer Portal is built on a zero-trust security architecture that assumes no user, device, or network can be inherently trusted. Every access request is authenticated, authorized, and encrypted — regardless of origin. The portal supports SAML 2.0 and OpenID Connect for enterprise identity provider integration, enabling single sign-on with DoD CAC, PKI, and allied national credential systems. All data in transit is encrypted using TLS 1.3 with FIPS 140-2 validated cryptographic modules, and all data at rest is encrypted using AES-256 with customer-managed encryption keys available for Enhanced and Premium Support customers. Session management includes configurable timeout policies, concurrent session limits, and automatic session termination upon privilege elevation. Every portal action is logged in an immutable audit trail that is retained for seven years and is available for export to your SIEM system via our audit API."
        cta="Request Portal Access"
        ctaHref="/request-demo"
        stats={[
          { value: "FIPS", label: "140-2 Encrypted" },
          { value: "7yr", label: "Audit Retention" },
        ]}
      />

      {/* ── FAQ ── */}
      <FAQSection
        label="Portal FAQ"
        title="Customer Portal Questions"
        items={[
          {
            question: "How do I get access to the Customer Portal?",
            answer:
              "Portal access is included with every Aegis system purchase. Your organization's designated administrator will receive portal onboarding credentials upon system delivery. Additional users can be added by your administrator through the portal's account management interface. If you are a new customer and have not received your credentials, contact your Aegis account representative or email portal@aegisdefense.com.",
          },
          {
            question: "Can I access the portal from classified networks?",
            answer:
              "Yes. The Customer Portal is accessible from Unclassified and Secret networks through our cross-domain solution. Access from Top Secret networks requires a dedicated portal instance, which can be provisioned upon request. The portal is also accessible from commercial internet connections using multi-factor authentication with CAC or PKI credentials.",
          },
          {
            question: "What identity providers are supported for single sign-on?",
            answer:
              "The portal supports SAML 2.0 and OpenID Connect identity providers, enabling integration with DoD CAC, PKI, and allied national credential systems. We also support Okta, Azure AD, and other commercial identity providers for organizations that use them. Custom SAML integration with proprietary identity systems can be arranged through our professional services team.",
          },
          {
            question: "How are firmware updates validated before deployment?",
            answer:
              "All firmware updates undergo a three-stage validation process before release through the portal. First, automated testing in our CI/CD pipeline validates basic functionality across all supported hardware variants. Second, integration testing in our validation lab confirms compatibility with all certified sensor and C2 integrations. Third, field validation with selected early-adopter customers verifies operational performance in real-world conditions. Only updates that pass all three stages are released through the portal.",
          },
          {
            question: "Can I manage multiple Aegis deployments from one portal account?",
            answer:
              "Yes. The portal supports multi-deployment management from a single organizational account. You can group systems by geographic region, organizational unit, or operational role, and apply configuration policies at the group level. System health monitoring, update management, and support ticket tracking are all available across your entire fleet from a unified dashboard, regardless of deployment location.",
          },
        ]}
      />

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
