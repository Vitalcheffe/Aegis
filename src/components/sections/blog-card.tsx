"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "./index";

export function BlogCard({
  image,
  tag,
  title,
  excerpt,
  date,
  href,
}: {
  image: string;
  tag?: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
}) {
  return (
    <ScrollReveal>
      <Link href={href} className="group block border border-white/10 hover:border-white/20 transition-colors bg-[#0a0a0a]">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            {tag && (
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/50 border border-white/10 px-3 py-1">
                {tag}
              </span>
            )}
            <span className="text-[10px] text-[#767676] uppercase tracking-[0.1em]">{date}</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors leading-tight">
            {title}
          </h3>
          <p className="text-[#767676] text-sm leading-relaxed line-clamp-3">
            {excerpt}
          </p>
          <span className="inline-block mt-4 text-[10px] uppercase tracking-[0.15em] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
            Read More →
          </span>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export function CaseStudyCard({
  image,
  tag,
  title,
  excerpt,
  href,
}: {
  image: string;
  tag?: string;
  title: string;
  excerpt: string;
  href: string;
}) {
  return (
    <ScrollReveal>
      <Link href={href} className="group block border border-white/10 hover:border-white/20 transition-colors bg-[#0a0a0a]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-6 md:p-8">
          {tag && (
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/50 border border-white/10 px-3 py-1 mb-4 inline-block">
              {tag}
            </span>
          )}
          <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors leading-tight">
            {title}
          </h3>
          <p className="text-[#767676] text-sm leading-relaxed">
            {excerpt}
          </p>
          <span className="inline-block mt-4 text-[10px] uppercase tracking-[0.15em] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
            Read Case Study →
          </span>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export function ResourceCard({
  tag,
  title,
  description,
  href,
  cta = "Download",
}: {
  tag?: string;
  title: string;
  description: string;
  href: string;
  cta?: string;
}) {
  return (
    <ScrollReveal>
      <Link href={href} className="group block border border-white/10 hover:border-white/20 transition-colors bg-[#0a0a0a] p-6 md:p-8">
        {tag && (
          <span className="text-[9px] uppercase tracking-[0.15em] text-white/50 border border-white/10 px-3 py-1 mb-4 inline-block">
            {tag}
          </span>
        )}
        <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
          {title}
        </h3>
        <p className="text-[#767676] text-sm leading-relaxed mb-4">
          {description}
        </p>
        <span className="text-[10px] uppercase tracking-[0.15em] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
          {cta} →
        </span>
      </Link>
    </ScrollReveal>
  );
}
