import { type ReactNode } from "react";

/* ============================================================
   PageHeader Component
   Title + subtitle + optional action buttons area.
   ============================================================ */

interface PageHeaderProps {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="px-[26px] py-[10px] pb-[18px] flex justify-between items-end gap-[18px] flex-wrap max-[900px]:px-4">
      <div>
        <h1 className="text-[23px] font-bold font-heading">{title}</h1>
        <p className="text-[13.5px] text-slate-light mt-1 max-w-[640px] leading-relaxed">
          {subtitle}
        </p>
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
