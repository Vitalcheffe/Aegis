import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aegisco.vercel.app";

  const routes = [
    // Home
    "",
    // About
    "/about",
    "/about/leadership",
    "/about/history",
    "/about/partners",
    "/about/certifications",
    "/about/facilities",
    "/about/research-development",
    "/about/values",
    "/about/quality",
    "/about/global-presence",
    // Capabilities
    "/capabilities",
    "/capabilities/detection",
    "/capabilities/tracking",
    "/capabilities/classification",
    "/capabilities/neutralization",
    "/capabilities/command-control",
    "/capabilities/integration",
    // Products
    "/products",
    "/products/aegis-core",
    "/products/aegis-tactical",
    "/products/aegis-mobile",
    "/products/aegis-shield",
    "/products/aegis-skywatch",
    "/products/aegis-command",
    "/products/aegis-sentinel",
    "/products/aegis-integrator",
    "/products/compare",
    // Solutions
    "/solutions",
    "/solutions/military",
    "/solutions/military/forward-operating-bases",
    "/solutions/military/naval",
    "/solutions/military/convoys",
    "/solutions/military/special-operations",
    "/solutions/military/air-defense",
    "/solutions/airports",
    "/solutions/critical-infrastructure",
    "/solutions/border-security",
    "/solutions/vip-protection",
    "/solutions/prisons",
    "/solutions/urban-security",
    "/solutions/maritime",
    // Technology
    "/technology",
    "/technology/rf-sensing",
    "/technology/ai-ml",
    "/technology/radar",
    "/technology/electronic-warfare",
    "/technology/sensor-fusion",
    "/technology/edge-computing",
    // Integrations
    "/integrations",
    "/integrations/compatibility",
    "/integrations/technology-partners",
    "/integrations/api-sdk",
    // Resources
    "/resources",
    "/resources/webinars",
    "/resources/faq",
    "/resources/glossary",
    "/resources/selection-guide",
    "/resources/brochures",
    "/resources/datasheets",
    "/resources/videos",
    "/resources/white-papers",
    // Blog
    "/blog",
    // Case Studies
    "/case-studies",
    "/case-studies/forward-operating-base",
    "/case-studies/air-force-base-defense",
    "/case-studies/naval-task-force",
    "/case-studies/vip-summit-security",
    "/case-studies/maritime-port-security",
    "/case-studies/urban-smart-city",
    "/case-studies/border-security-mission",
    "/case-studies/international-airport-protection",
    "/case-studies/critical-infrastructure-power-grid",
    "/case-studies/correctional-facility",
    // Support
    "/support",
    "/support/documentation",
    "/support/customer-portal",
    "/support/training",
    // Partners
    "/partners",
    // Tools
    "/tools",
    "/tools/range-calculator",
    "/tools/deployment-planner",
    // Intelligence
    "/threat-database",
    "/security-advisories",
    // News
    "/news",
    "/news/press-releases",
    "/news/events",
    // Careers
    "/careers",
    "/careers/openings",
    "/careers/culture",
    // Investors
    "/investors",
    "/investors/financial-reports",
    "/investors/governance",
    // Other
    "/contact",
    "/request-demo",
    "/demos",
    // Legal
    "/legal/privacy",
    "/legal/terms",
    "/legal/itar",
    "/legal/compliance",
    "/legal/export-control",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly" as const,
    priority: route === "" ? 1 : route.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
