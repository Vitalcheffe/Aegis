"use client";

import { useState, FormEvent } from "react";
import {
  SectionHero,
  Callout,
  CTASection,
  ScrollReveal,
  AnimatedLine,
} from "@/components/sections";

interface FieldError {
  field: string;
  message: string;
}

export default function RequestDemoPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    jobTitle: "",
    country: "",
    classificationLevel: "",
    interestArea: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setFieldErrors([]);

    try {
      const res = await fetch("/api/demo-request", {
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

      setReferenceId(data.referenceId);
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
        image="/images/pages/request-demo.jpg"
        label="Experience"
        title="Request a Demo"
        subtitle="See Aegis in Action"
      />

      <Callout>
        Schedule a classified briefing with our defense solutions team to
        experience the full capabilities of the Aegis counter-UAS platform in a
        controlled operational environment.
      </Callout>

      <AnimatedLine />

      {/* Demo Request Form */}
      <section className="py-28 md:py-44 bg-black">
        <div className="max-w-[56rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Schedule a Briefing
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white mb-4">
              Demo Request Form
            </h2>
            <p className="text-[#767676] text-base leading-relaxed mb-12">
              Complete the form below to request a demonstration of Aegis
              counter-UAS capabilities. All submissions are reviewed by our
              security team and processed in accordance with ITAR and applicable
              export control regulations.
            </p>
          </ScrollReveal>

          {submitted ? (
            <ScrollReveal>
              <div className="border border-white/20 p-12 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Demo Request Submitted
                </h3>
                <p className="text-[#b9b9b9] text-lg leading-relaxed">
                  Thank you for your interest in Aegis Defense Systems. Your demo
                  request has been received and will be reviewed by our team. A
                  representative will contact you within 2-3 business days to
                  discuss scheduling and access requirements.
                </p>
                {referenceId && (
                  <p className="text-[#767676] text-sm mt-6">
                    Reference ID: {referenceId}
                  </p>
                )}
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
                      htmlFor="fullName"
                      className="block text-[10px] uppercase tracking-[0.15em] text-white/50 mb-3"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-transparent border border-[#222] text-white px-4 py-3 text-sm focus:border-white/50 focus:outline-none transition-colors placeholder:text-white/20 disabled:opacity-50"
                      placeholder="Your full name"
                    />
                    {getFieldError("fullName") && (
                      <p className="text-white/60 text-xs mt-2">{getFieldError("fullName")}</p>
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
                      Organization *
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-transparent border border-[#222] text-white px-4 py-3 text-sm focus:border-white/50 focus:outline-none transition-colors placeholder:text-white/20 disabled:opacity-50"
                      placeholder="Government agency or organization"
                    />
                    {getFieldError("organization") && (
                      <p className="text-white/60 text-xs mt-2">{getFieldError("organization")}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="jobTitle"
                      className="block text-[10px] uppercase tracking-[0.15em] text-white/50 mb-3"
                    >
                      Job Title *
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      required
                      value={formData.jobTitle}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-transparent border border-[#222] text-white px-4 py-3 text-sm focus:border-white/50 focus:outline-none transition-colors placeholder:text-white/20 disabled:opacity-50"
                      placeholder="Your position or title"
                    />
                    {getFieldError("jobTitle") && (
                      <p className="text-white/60 text-xs mt-2">{getFieldError("jobTitle")}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-[10px] uppercase tracking-[0.15em] text-white/50 mb-3"
                    >
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-transparent border border-[#222] text-white px-4 py-3 text-sm focus:border-white/50 focus:outline-none transition-colors placeholder:text-white/20 disabled:opacity-50"
                      placeholder="Country of citizenship"
                    />
                    {getFieldError("country") && (
                      <p className="text-white/60 text-xs mt-2">{getFieldError("country")}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="classificationLevel"
                      className="block text-[10px] uppercase tracking-[0.15em] text-white/50 mb-3"
                    >
                      Classification Level *
                    </label>
                    <select
                      id="classificationLevel"
                      name="classificationLevel"
                      required
                      value={formData.classificationLevel}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-black border border-[#222] text-white px-4 py-3 text-sm focus:border-white/50 focus:outline-none transition-colors appearance-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="" disabled>
                        Select clearance level
                      </option>
                      <option value="unclassified">Unclassified</option>
                      <option value="cui">CUI (Controlled Unclassified Information)</option>
                      <option value="secret">Secret</option>
                      <option value="top-secret">Top Secret</option>
                    </select>
                    {getFieldError("classificationLevel") && (
                      <p className="text-white/60 text-xs mt-2">{getFieldError("classificationLevel")}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="interestArea"
                    className="block text-[10px] uppercase tracking-[0.15em] text-white/50 mb-3"
                  >
                    Interest Area *
                  </label>
                  <select
                    id="interestArea"
                    name="interestArea"
                    required
                    value={formData.interestArea}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full md:w-1/2 bg-black border border-[#222] text-white px-4 py-3 text-sm focus:border-white/50 focus:outline-none transition-colors appearance-none cursor-pointer disabled:opacity-50"
                  >
                    <option value="" disabled>
                      Select your area of interest
                    </option>
                    <option value="products">Products</option>
                    <option value="solutions">Solutions</option>
                    <option value="integration">Integration</option>
                    <option value="partnership">Partnership</option>
                  </select>
                  {getFieldError("interestArea") && (
                    <p className="text-white/60 text-xs mt-2">{getFieldError("interestArea")}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] uppercase tracking-[0.15em] text-white/50 mb-3"
                  >
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border border-[#222] text-white px-4 py-3 text-sm focus:border-white/50 focus:outline-none transition-colors placeholder:text-white/20 resize-none disabled:opacity-50"
                    placeholder="Describe your operational requirements, specific threats of concern, or any additional context. Do not include classified information."
                  />
                  {getFieldError("message") && (
                    <p className="text-white/60 text-xs mt-2">{getFieldError("message")}</p>
                  )}
                </div>

                <div className="pt-4">
                  <p className="text-[#767676] text-xs leading-relaxed mb-6">
                    By submitting this form, you confirm that the information
                    provided is accurate and that you are authorized to receive
                    information about Aegis defense products and services. All
                    inquiries are subject to ITAR and EAR verification. Do not
                    include classified or export-controlled information in this
                    form. Your data is handled in accordance with our{" "}
                    <a
                      href="/legal/privacy"
                      className="text-white/70 underline hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-white text-black px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#e0e0e0] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Demo Request"}
                  </button>
                </div>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>

      <CTASection
        title="Prefer a Direct Conversation?"
        subtitle="Contact our headquarters to speak with a defense solutions specialist immediately."
        primaryCta="Contact Us"
        primaryHref="/contact"
        secondaryCta="View Live Demos"
        secondaryHref="/demos"
      />
    </>
  );
}
