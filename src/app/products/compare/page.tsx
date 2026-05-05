"use client";

import { SectionHero, CTASection } from "@/components/sections";
import { ProductComparison } from "@/components/sections/product-comparison";

export default function ComparePage() {
  return (
    <>
      <SectionHero
        image="/images/pages/products-hero.jpg"
        label="Product Comparison"
        title="Compare Platforms"
        subtitle="Side-by-side specification analysis of the Aegis counter-UAS platform family. Select the platforms that match your mission requirements."
        cta="Start Comparing"
        ctaHref="#comparison"
      />

      <div id="comparison">
        <ProductComparison />
      </div>

      <CTASection
        title="Need Guidance?"
        subtitle="Our defense consultants can help identify the optimal platform configuration for your operational requirements."
        primaryCta="Request a Briefing"
        primaryHref="/request-demo"
        secondaryCta="View All Platforms"
        secondaryHref="/products"
      />
    </>
  );
}
