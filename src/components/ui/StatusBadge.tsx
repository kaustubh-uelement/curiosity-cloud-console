/* ============================================================
   StatusBadge Component
   Renders a colored dot + label for ok/warn/bad/off states.
   ============================================================ */

type StatusType = "ok" | "wn" | "bd" | "of";

interface StatusBadgeProps {
  status: StatusType;
  label: string;
}

const statusColors: Record<StatusType, { text: string; dot: string }> = {
  ok: { text: "text-ok", dot: "bg-ok" },
  wn: { text: "text-warn", dot: "bg-warn" },
  bd: { text: "text-bad", dot: "bg-bad" },
  of: { text: "text-slate-light", dot: "bg-slate-light" },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const colors = statusColors[status] ?? statusColors.of;
  return (
    <span
      className={`inline-flex items-center gap-[6px] text-[12.5px] font-semibold whitespace-nowrap ${colors.text}`}
    >
      <span className={`w-[7px] h-[7px] rounded-full shrink-0 ${colors.dot}`} />
      {label}
    </span>
  );
}

/* Status helper — maps status codes to labels and renders StatusBadge */
interface StatusProps {
  s: string;
  map: Record<string, string>;
}

export function Status({ s, map }: StatusProps) {
  return <StatusBadge status={s as StatusType} label={map[s] ?? s} />;
}
