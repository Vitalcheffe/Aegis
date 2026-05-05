import Link from "next/link";

const footerColumns = [
  {
    title: "Capabilities",
    links: [
      { label: "Detection", href: "/capabilities/detection" },
      { label: "Tracking", href: "/capabilities/tracking" },
      { label: "Classification", href: "/capabilities/classification" },
      { label: "Neutralization", href: "/capabilities/neutralization" },
      { label: "Command & Control", href: "/capabilities/command-control" },
      { label: "Integration", href: "/capabilities/integration" },
    ],
  },
  {
    title: "Platforms",
    links: [
      { label: "Aegis Core", href: "/products/aegis-core" },
      { label: "Aegis Tactical", href: "/products/aegis-tactical" },
      { label: "Aegis Mobile", href: "/products/aegis-mobile" },
      { label: "Aegis Shield", href: "/products/aegis-shield" },
      { label: "Aegis SkyWatch", href: "/products/aegis-skywatch" },
      { label: "Aegis Command", href: "/products/aegis-command" },
      { label: "Aegis Sentinel", href: "/products/aegis-sentinel" },
      { label: "Aegis Integrator", href: "/products/aegis-integrator" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Military", href: "/solutions/military" },
      { label: "Airports", href: "/solutions/airports" },
      { label: "Critical Infrastructure", href: "/solutions/critical-infrastructure" },
      { label: "Border Security", href: "/solutions/border-security" },
      { label: "VIP Protection", href: "/solutions/vip-protection" },
      { label: "Maritime", href: "/solutions/maritime" },
      { label: "Urban Security", href: "/solutions/urban-security" },
      { label: "Prisons", href: "/solutions/prisons" },
    ],
  },
  {
    title: "Technology",
    links: [
      { label: "RF Sensing", href: "/technology/rf-sensing" },
      { label: "AI & Machine Learning", href: "/technology/ai-ml" },
      { label: "Radar Systems", href: "/technology/radar" },
      { label: "Electronic Warfare", href: "/technology/electronic-warfare" },
      { label: "Sensor Fusion", href: "/technology/sensor-fusion" },
      { label: "Edge Computing", href: "/technology/edge-computing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "White Papers", href: "/resources/white-papers" },
      { label: "Datasheets", href: "/resources/datasheets" },
      { label: "Videos", href: "/resources/videos" },
      { label: "Webinars", href: "/resources/webinars" },
      { label: "FAQ", href: "/resources/faq" },
      { label: "Glossary", href: "/resources/glossary" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Aegis", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "History", href: "/about/history" },
      { label: "R&D", href: "/about/research-development" },
      { label: "Facilities", href: "/about/facilities" },
      { label: "Values", href: "/about/values" },
      { label: "Quality", href: "/about/quality" },
      { label: "Partners", href: "/about/partners" },
      { label: "Integrations", href: "/integrations" },
      { label: "Support", href: "/support" },
      { label: "Careers", href: "/careers" },
      { label: "Investors", href: "/investors" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "ITAR Compliance", href: "/legal/itar" },
      { label: "Export Control", href: "/legal/export-control" },
      { label: "Compliance", href: "/legal/compliance" },
    ],
  },
];

export function Footer() {
  return (
    <>
      {/* Dual CTA Section */}
      <section className="border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Link
            href="/request-demo"
            className="group flex flex-col justify-center p-12 md:p-16 lg:p-24 bg-black hover:bg-[#0a0a0a] transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-5">
              Get Started
            </span>
            <span className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.04em] leading-[1.1] text-white group-hover:text-white/90 transition-colors">
              Request a Demo
            </span>
            <span className="mt-4 text-[#767676] text-sm group-hover:text-[#b9b9b9] transition-colors">
              Schedule a classified briefing with our defense team →
            </span>
          </Link>
          <Link
            href="/capabilities"
            className="group flex flex-col justify-center p-12 md:p-16 lg:p-24 bg-[#0a0a0a] border-l border-white/10 hover:bg-[#111111] transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-5">
              Learn More
            </span>
            <span className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.04em] leading-[1.1] text-white group-hover:text-white/90 transition-colors">
              Explore Capabilities
            </span>
            <span className="mt-4 text-[#767676] text-sm group-hover:text-[#b9b9b9] transition-colors">
              Discover our multi-layered defense architecture →
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/10 mt-auto">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <div className="grid grid-cols-2 md:grid-cols-8 gap-10 md:gap-8">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <Link
                href="/"
                className="text-white font-bold text-lg tracking-[0.3em] uppercase"
              >
                AEGIS
              </Link>
              <p className="mt-4 text-[#767676] text-sm leading-relaxed max-w-[280px]">
                Advanced counter-UAS defense systems protecting critical assets
                and infrastructure across 12 nations worldwide.
              </p>
              <div className="mt-6 text-[9px] uppercase tracking-[0.2em] text-[#444]">
                NATO Classified — ITAR Controlled
              </div>
            </div>

            {/* Link Columns */}
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[10px] uppercase tracking-[0.1em] font-medium text-white/30 mb-5">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[#767676] hover:text-white text-[13px] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-20 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="text-[#444] text-xs">
                &copy; {new Date().getFullYear()} Aegis Defense Systems, Inc. All rights
                reserved.
              </div>
            </div>
            <div className="mt-4 text-[#333] text-[11px] leading-relaxed max-w-3xl">
              This product is controlled under the International Traffic in Arms
              Regulations (ITAR) and may not be exported, transferred, or
              disclosed to foreign persons without prior authorization from the
              U.S. Department of State. Unauthorized use, reproduction, or
              distribution is strictly prohibited.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
