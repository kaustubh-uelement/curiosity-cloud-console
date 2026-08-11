/* ============================================================
   Chip Component
   Filter chip with active/inactive state.
   ============================================================ */

interface ChipProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Chip({ active = false, onClick, children }: ChipProps) {
  return (
    <button
      className={`inline-flex items-center gap-[6px] px-[11px] py-[5px] border rounded-full text-[12.5px] font-semibold transition-colors ${
        active
          ? "bg-accent-l border-magenta/30 text-magenta"
          : "border-hair text-slate-light hover:border-slate-light/40 hover:text-slate"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
