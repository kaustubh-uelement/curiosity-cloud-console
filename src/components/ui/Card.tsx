import { type ReactNode } from "react";

/* ============================================================
   Card Component
   Glassmorphic card with header, body, and hint sub-components.
   Uses DESIGN_SYSTEM.md section 5 glass elevation model.
   ============================================================ */

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-glass-bg backdrop-blur-[24px] backdrop-saturate-[180%] border border-glass-line rounded-[16px] shadow-glass ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div
      className={`px-[18px] py-[15px] border-b border-hair flex justify-between items-center gap-[14px] flex-wrap ${className}`}
    >
      {children}
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={`p-[18px] ${className}`}>{children}</div>;
}

interface CardHintProps {
  children: ReactNode;
  className?: string;
}

export function CardHint({ children, className = "" }: CardHintProps) {
  return (
    <div
      className={`text-[12.5px] text-slate-light leading-relaxed px-[18px] py-[12px] bg-sunk border-t border-hair rounded-b-[16px] [&_b]:text-slate [&_b]:font-bold ${className}`}
    >
      {children}
    </div>
  );
}
