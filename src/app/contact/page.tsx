"use client";

import { useState, FormEvent } from "react";
import {
  SectionHero,
  Callout,
  SplitSection,
  CTASection,
  ScrollReveal,
  AnimatedLine,
} from "@/components/sections";

interface FieldError {
  field: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setFieldErrors([]);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          setFieldErrors(data.errors);
          setErrorMessage(data.message || "Validation failed");
        } else {
          setErrorMessage(data.message || "Something went wrong. Please try again.");
        }
        return;
      }

      setSubmitted(true);
    } catch {
      setErrorMessage(
        "Unable to connect to the server. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear field-specific error when user edits the field
    setFieldErrors((prev) => prev.filter((err) => err.field !== e.target.name));
  };

  const getFieldError = (fieldName: string): string | null => {
    return fieldErrors.find((err) => err.field === fieldName)?.message ?? null;
  };

  return (
    <>
      <SectionHero
        image="/images/pages/contact-hero.jpg"
        label="Connect"
        title="Contact"
        subtitle="Get in Touch"
      />

      <Callout>
        Whether you represent a government agency, military organization, or
        critical infrastructure operator — our team is ready to discuss your
        counter-UAS defense requirements.
      </Callout>

      <AnimatedLine />

      {/* Contact Form Section */}
      <section className="py-28 md:py-44 bg-black">
        <div className="max-w-[56rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Reach Out
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white mb-12">
              Send Us a Message
            </h2>
          </ScrollReveal>

          {submitted ? (
            <ScrollReveal>
              <div className="border border-white/20 p-12 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Message Received
                </h3>
                <p className="text-[#b9b9b9] text-lg leading-relaxed">
                  Thank you for contacting Aegis Defense Systems. Our team will
                  review your inquiry and respond within 24-48 business hours.
                  For urgent matters, please call our headquarters directly.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Server error banner */}
                {errorMessage && (
                  <div className="border border-white/30 bg-white/5 px-6 py-4">
                    <p className="text-white text-sm">{errorMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[10px] uppercase tracking-[0.15em] text-white/50 mb-3"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-transparent border border-[#222] text-white px-4 py-3 text-sm focus:border-white/50 focus:outline-none transition-colors placeholder:text-white/20 disabled:opacity-50"
                      placeholder="Your full name"
                    />
                    {getFieldError("name") && (
                      <p className="text-white/60 text-xs mt-2">{getFieldError("name")}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[10px] uppercase tracking-[0.15em] text-white/50 mb-3"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-transparent border border-[#222] text-white px-4 py-3 text-sm focus:border-white/50 focus:outline-none transition-colors placeholder:text-white/20 disabled:opacity-50"
                      placeholder="your@email.com"
                    />
                    {getFieldError("email") && (
                      <p className="text-white/60 text-xs mt-2">{getFieldError("email")}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-[10px] uppercase tracking-[0.15em] text-white/50 mb-3"
                    >
                      Organization
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-transparent border border-[#222] text-white px-4 py-3 text-sm focus:border-white/50 focus:outline-none transition-colors placeholder:text-white/20 disabled:opacity-50"
                      placeholder="Your organization"
                    />
                    {getFieldError("organization") && (
                      <p className="text-white/60 text-xs mt-2">{getFieldError("organization")}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-[10px] uppercase tracking-[0.15em] text-white/50 mb-3"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-black border border-[#222] text-white px-4 py-3 text-sm focus:border-white/50 focus:outline-none transition-colors appearance-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      <option value="general">General Inquiry</option>
                      <option value="products">Product Information</option>
                      <option value="demo">Request a Demo</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="compliance">Compliance / Legal</option>
                      <option value="media">Media / Press</option>
                      <option value="careers">Careers</option>
                    </select>
                    {getFieldError("subject") && (
                      <p className="text-white/60 text-xs mt-2">{getFieldError("subject")}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] uppercase tracking-[0.15em] text-white/50 mb-3"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border border-[#222] text-white px-4 py-3 text-sm focus:border-white/50 focus:outline-none transition-colors placeholder:text-white/20 resize-none disabled:opacity-50"
                    placeholder="Describe your inquiry or requirements. Please do not include classified information in this form."
                  />
                  {getFieldError("message") && (
                    <p className="text-white/60 text-xs mt-2">{getFieldError("message")}</p>
                  )}
                </div>

                <div className="pt-4">
                  <p className="text-[#767676] text-xs leading-relaxed mb-6">
                    By submitting this form, you acknowledge that your information
                    will be handled in accordance with our{" "}
                    <a
                      href="/legal/privacy"
                      className="text-white/70 underline hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </a>
                    . Do not include classified or ITAR-controlled information in
                    this form.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-white text-black px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#e0e0e0] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Message"}
                  </button>
                </div>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>

      <AnimatedLine />

      {/* Office Locations */}
      <SplitSection
        image="/images/pages/dc-capitol.jpg"
        label="Global Presence"
        title="Washington DC Headquarters"
        description="Our primary headquarters and operations center, located in the heart of the national security corridor. The Washington DC office houses our executive leadership, program management, trade compliance, and government relations teams. This facility maintains SCIF accreditation for processing classified information up to the Top Secret level."
        reverse={false}
        stats={[
          { value: "200+", label: "DC-Based Personnel" },
          { value: "TS/SCI", label: "Facility Clearance" },
          { value: "24/7", label: "Operations Center" },
        ]}
      />

      <SplitSection
        image="/images/pages/london-skyline.jpg"
        label="EMEA Region"
        title="London Office"
        description="Our European, Middle East, and Africa regional headquarters in London supports NATO member states, Five Eyes partners, and allied nations across the EMEA region. The London team provides localized support for system deployments, training, and maintenance, as well as coordination with UK Ministry of Defence and allied defense procurement agencies."
        reverse={true}
        stats={[
          { value: "50+", label: "EMEA Personnel" },
          { value: "NATO", label: "Partner Alignment" },
          { value: "15+", label: "EMEA Deployments" },
        ]}
      />

      <SplitSection
        image="/images/pages/abu-dhabi-skyline.jpg"
        label="Middle East"
        title="Abu Dhabi Office"
        description="Our Abu Dhabi office serves as the regional hub for the Gulf Cooperation Council (GCC) nations and broader Middle East region. This office supports Foreign Military Sales cases, direct commercial sales, and system deployments for critical infrastructure protection across the region. The team coordinates closely with UAE armed forces and regional defense partners."
        reverse={false}
        stats={[
          { value: "30+", label: "Regional Personnel" },
          { value: "GCC", label: "Regional Focus" },
          { value: "10+", label: "Active Programs" },
        ]}
      />

      <SplitSection
        image="/images/pages/singapore-marina.jpg"
        label="Asia Pacific"
        title="Singapore Office"
        description="Our Asia-Pacific regional office in Singapore supports defense partnerships across the Indo-Pacific theater. The Singapore team works with allied and partner nations to address the growing UAS threat in the region, supporting both government and critical infrastructure protection programs throughout Southeast Asia and Oceania."
        reverse={true}
        stats={[
          { value: "25+", label: "APAC Personnel" },
          { value: "INDO-PAC", label: "Theater Coverage" },
          { value: "8+", label: "Regional Programs" },
        ]}
      />

      <CTASection
        title="Ready to Connect?"
        subtitle="Schedule a consultation with our defense solutions team to discuss your counter-UAS requirements."
        primaryCta="Request a Demo"
        primaryHref="/request-demo"
        secondaryCta="Explore Solutions"
        secondaryHref="/solutions"
      />
    </>
  );
}
