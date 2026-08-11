import { type ReactNode, type ButtonHTMLAttributes } from "react";

/* ============================================================
   Button Component
   Variants: primary (gradient), secondary (glass), ghost
   Sizes: default, xs
   ============================================================ */

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "xs";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-purple via-magenta via-[72%] to-terra text-white shadow-sh",
  secondary:
    "bg-glass-bg-strong border border-hair text-slate hover:bg-hover hover:border-slate-light/40",
  ghost:
    "text-slate-light hover:bg-sunk hover:text-ink",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "px-[15px] py-[8px] text-[13.5px]",
  xs: "px-[10px] py-[5px] text-[12.5px]",
};

export function Button({
  variant = "secondary",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-[7px] rounded-[7px] font-semibold whitespace-nowrap transition-all duration-150 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
