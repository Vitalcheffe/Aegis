"use client";

import { ScrollReveal } from "./index";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function FAQSection({
  label,
  title,
  items,
}: {
  label?: string;
  title?: string;
  items: { question: string; answer: string }[];
}) {
  return (
    <section className="py-28 md:py-44 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-[56rem] mx-auto px-6 md:px-12 lg:px-20">
        {(label || title) && (
          <ScrollReveal>
            <div className="mb-16">
              {label && (
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                  {label}
                </span>
              )}
              {title && (
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white">
                  {title}
                </h2>
              )}
            </div>
          </ScrollReveal>
        )}
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-white/10"
            >
              <AccordionTrigger className="text-white text-left text-base md:text-lg hover:no-underline hover:text-white/90 py-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#b9b9b9] text-sm md:text-base leading-relaxed pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
