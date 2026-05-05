import Image from "next/image";

interface CapabilityHeroProps {
  image: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function CapabilityHero({ image, title, subtitle, className = "" }: CapabilityHeroProps) {
  return (
    <section className={`relative h-[60vh] md:h-[70vh] flex items-end ${className}`}>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 w-full">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg md:text-xl text-[#888888] max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
