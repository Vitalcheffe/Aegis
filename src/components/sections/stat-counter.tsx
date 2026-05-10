interface StatCounterProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCounter({ value, label, className = "" }: StatCounterProps) {
  return (
    <div className={className}>
      <div className="text-4xl md:text-5xl font-bold text-white">{value}</div>
      <div className="text-[#888888] text-sm uppercase tracking-wider mt-2">{label}</div>
    </div>
  );
}
