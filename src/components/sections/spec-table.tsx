interface SpecRow {
  key: string;
  value: string;
}

interface SpecTableProps {
  specs: SpecRow[];
  className?: string;
}

export function SpecTable({ specs, className = "" }: SpecTableProps) {
  return (
    <div className={className}>
      {specs.map((spec, i) => (
        <div
          key={i}
          className="flex justify-between items-center py-3 border-b border-[#222222] last:border-b-0"
        >
          <span className="text-[#888888] text-sm uppercase tracking-wider">{spec.key}</span>
          <span className="text-white text-sm font-medium">{spec.value}</span>
        </div>
      ))}
    </div>
  );
}
