/* ============================================================
   Breadcrumb Component
   Simple breadcrumb: project name › section crumb
   ============================================================ */

interface BreadcrumbProps {
  crumb: string;
}

export function Breadcrumb({ crumb }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-[7px] text-[12.5px] text-slate-light px-[26px] pt-4 max-[900px]:px-4">
      curiositycloud-prod <span>›</span> <b className="text-ink font-semibold">{crumb}</b>
    </div>
  );
}
