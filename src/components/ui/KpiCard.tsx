import { type ReactNode } from "react";
import { Card } from "./Card";

/* ============================================================
   KPI Card Component
   Displays a key metric with label, value, and detail line.
   ============================================================ */

interface KpiCardProps {
  label: string;
  value: ReactNode;
  detail: ReactNode;
}

export function KpiCard({ label, value, detail }: KpiCardProps) {
  return (
    <Card className="px-[18px] py-[16px]">
      <div className="text-[12.5px] text-slate-light font-semibold flex items-center gap-[6px]">
        {label}
      </div>
      <div className="text-[26px] font-bold text-ink mt-[9px] leading-none tracking-tight">
        {value}
      </div>
      <div className="text-[12.5px] text-slate-light mt-[7px]">{detail}</div>
    </Card>
  );
}
