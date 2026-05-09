interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ badge, title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {badge && (
        <span className="inline-block uppercase text-[#888888] border border-[#222222] px-3 py-1 text-xs tracking-wider mb-6">
          {badge}
        </span>
      )}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 text-lg text-[#888888] max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
