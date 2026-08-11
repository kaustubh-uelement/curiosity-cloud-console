import { type ReactNode } from "react";

/* ============================================================
   DataTable Component
   Styled table wrapper matching the original table pattern.
   ============================================================ */

interface DataTableProps {
  children: ReactNode;
  className?: string;
}

export function DataTable({ children, className = "" }: DataTableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return <thead>{children}</thead>;
}

export function TH({
  children,
  className = "",
  style,
}: {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <th
      className={`text-left text-[11.5px] font-bold text-slate-light px-[14px] py-[10px] bg-sunk border-b border-hair whitespace-nowrap ${className}`}
      style={style}
    >
      {children}
    </th>
  );
}

export function TD({
  children,
  className = "",
  style,
}: {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <td
      className={`px-[14px] py-[12px] border-b border-hair text-[13.5px] align-middle last:[tr:last-child_&]:border-b-0 ${className}`}
      style={style}
    >
      {children}
    </td>
  );
}

export function TBody({ children }: { children: ReactNode }) {
  return (
    <tbody className="[&_tr:hover]:bg-hover [&_tr:last-child_td]:border-b-0">
      {children}
    </tbody>
  );
}
