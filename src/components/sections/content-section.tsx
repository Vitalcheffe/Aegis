import Image from "next/image";

interface ContentSectionProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  reverse?: boolean;
  className?: string;
}

export function ContentSection({
  image,
  imageAlt,
  title,
  description,
  reverse = false,
  className = "",
}: ContentSectionProps) {
  return (
    <section className={`py-20 md:py-28 border-t border-[#222222] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${
            reverse ? "md:[direction:rtl]" : ""
          }`}
        >
          <div className="relative aspect-[4/3] overflow-hidden md:[direction:ltr]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
          <div className={reverse ? "md:[direction:ltr]" : ""}>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{title}</h3>
            <p className="text-[#888888] text-lg leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
