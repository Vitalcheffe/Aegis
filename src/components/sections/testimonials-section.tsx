"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Aegis gave us something we never had before — absolute confidence in our airspace awareness. Within the first week of deployment, the system identified 23 drone incursions that our legacy air defense had completely missed. The kill chain closure time is remarkable.",
    author: "Col. Richard Harper",
    role: "Director of Force Protection",
    organization: "U.S. Central Command",
  },
  {
    quote:
      "We evaluated five counter-UAS platforms before selecting Aegis. The differentiation was clear: no other system could match the detection range, classification accuracy, and — critically — the integration flexibility that Aegis Command provides. It seamlessly connected to our existing C2 infrastructure.",
    author: "Air Vice-Marshal Sarah Thornton",
    role: "Head of Air Capability",
    organization: "UK Ministry of Defence",
  },
  {
    quote:
      "Protecting 45 million passengers per year requires a security solution that never sleeps. Aegis SkyWatch has operated continuously for 18 months with zero unplanned downtime. The false alarm rate is less than 0.02% — a figure that our previous system could only dream of.",
    author: "Heinrich Müller",
    role: "Chief Security Officer",
    organization: "Frankfurt Airport Authority",
  },
  {
    quote:
      "In the littoral environment, you face threats from sea, air, and land simultaneously. Aegis Naval variant is the only system we've tested that can manage that complexity without overwhelming the operator. The autonomous threat prioritization alone saved us three full-time watchstanding positions.",
    author: "Captain James Nakamura",
    role: "Commanding Officer, USS Arlington (LPD-24)",
    organization: "United States Navy",
  },
  {
    quote:
      "Our critical infrastructure spans 14,000 kilometers of pipeline and 230 facilities. Aegis Shield gave us the ability to create integrated detection zones across our entire network, with centralized command and autonomous response protocols. It transformed our security posture.",
    author: "Abdulaziz Al-Rashid",
    role: "VP Security Operations",
    organization: "Saudi Aramco",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrent((prev) => {
        const next = prev + newDirection;
        if (next < 0) return testimonials.length - 1;
        if (next >= testimonials.length) return 0;
        return next;
      });
    },
    []
  );

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 60 : -60,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    <section className="py-28 md:py-44 bg-black border-t border-[#222222]">
      <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section heading */}
        <div className="mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#767676] block mb-4">
            Trusted By
          </span>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
            What Our Partners Say
          </h2>
        </div>

        {/* Testimonial content */}
        <div className="relative min-h-[280px] md:min-h-[320px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.3, ease: "easeInOut" },
              }}
              className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12"
            >
              {/* Vertical line decoration */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                className="hidden md:block w-px h-48 bg-white/30 origin-top flex-shrink-0"
              />

              {/* Mobile: horizontal line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                className="md:hidden h-px w-16 bg-white/30 origin-left"
              />

              {/* Quote + attribution */}
              <div className="flex-1">
                <motion.blockquote
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    ease: "easeOut",
                  }}
                  className="text-[clamp(1.25rem,2.5vw,1.75rem)] italic font-light leading-relaxed text-white"
                >
                  &ldquo;{t.quote}&rdquo;
                </motion.blockquote>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                  className="mt-8 md:mt-10"
                >
                  <div className="h-px w-10 bg-[#333] mb-6" />
                  <div className="text-white text-sm font-medium tracking-wide">
                    {t.author}
                  </div>
                  <div className="text-[#767676] text-xs mt-1 tracking-wide">
                    {t.role}
                  </div>
                  <div className="text-[#767676] text-[10px] uppercase tracking-[0.15em] mt-1">
                    {t.organization}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation: arrows + dots */}
        <div className="mt-12 md:mt-16 flex items-center justify-between">
          {/* Arrow navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 flex items-center justify-center border border-[#222222] text-[#767676] hover:text-white hover:border-white/30 transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 flex items-center justify-center border border-[#222222] text-[#767676] hover:text-white hover:border-white/30 transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className="transition-all duration-300"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-[#333] hover:bg-[#555]"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
