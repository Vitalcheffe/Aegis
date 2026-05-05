import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className = "" }: FeatureCardProps) {
  return (
    <div className={`border border-[#222222] p-6 hover:bg-[#0A0A0A] transition-colors ${className}`}>
      <Icon className="text-white mb-4" size={28} strokeWidth={1.5} />
      <h3 className="text-white text-lg font-medium mb-2">{title}</h3>
      <p className="text-[#888888] text-sm leading-relaxed">{description}</p>
    </div>
  );
}
