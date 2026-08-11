"use client";

import { Icon, P } from "@/lib/icons";

/* ============================================================
   SearchInput Component
   Search bar with icon and optional keyboard shortcut badge.
   ============================================================ */

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  shortcut?: string;
  className?: string;
}

export function SearchInput({
  placeholder = "Search…",
  value,
  onChange,
  shortcut,
  className = "",
}: SearchInputProps) {
  return (
    <div
      className={`flex items-center gap-[8px] px-[12px] py-[6px] bg-sunk border border-transparent rounded-[7px] text-slate-light transition-colors focus-within:bg-glass-bg-strong focus-within:border-accent min-w-[220px] ${className}`}
    >
      <Icon d={P.srch} s={15} />
      <input
        className="flex-1 border-none bg-transparent outline-none text-ink min-w-0 placeholder:text-slate-light"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {shortcut && (
        <span className="font-mono text-[10.5px] px-[6px] py-[2px] bg-glass-bg-strong border border-hair rounded text-slate-light">
          {shortcut}
        </span>
      )}
    </div>
  );
}
