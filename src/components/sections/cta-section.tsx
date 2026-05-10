import Link from "next/link";

interface CtaSectionProps {
  heading: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

export function CtaSection({
  heading,
  description,
  buttonText = "Request a Demo",
  buttonHref = "/request-demo",
  className = "",
}: CtaSectionProps) {
  return (
    <section className={`py-20 md:py-28 border-t border-[#222222] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">{heading}</h2>
        {description && (
          <p className="mt-6 text-lg text-[#888888] max-w-2xl mx-auto">{description}</p>
        )}
        <Link
          href={buttonHref}
          className="inline-block bg-white text-black px-8 py-4 text-sm font-medium hover:bg-[#e0e0e0] transition-colors mt-10"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
