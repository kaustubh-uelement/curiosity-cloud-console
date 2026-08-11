import { Icon, P } from "@/lib/icons";
import { KpiCard } from "@/components/ui/KpiCard";
import { Card, CardHeader, CardHint } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DataTable, THead, TH, TD, TBody } from "@/components/ui/DataTable";
import { Status } from "@/components/ui/StatusBadge";

/* ============================================================
   Storage View
   KPI cards + volumes table.
   ============================================================ */

const VOLUMES = [
  ["vol-prod-data-01", "NVMe SSD", "2 TB", "ci-prod-api-01", "Pune-1", "ok"],
  ["vol-prod-data-02", "NVMe SSD", "2 TB", "ci-prod-api-02", "Pune-1", "ok"],
  ["vol-train-scratch", "NVMe SSD", "4 TB", "gpu-train-01", "Mumbai-2", "ok"],
  ["vol-orphan-legacy", "SSD", "620 GB", "—", "Pune-1", "wn"],
] as const;

export function Storage() {
  return (
    <div className="flex flex-col gap-[14px]">
      <div className="grid grid-cols-4 gap-[14px] max-[1180px]:grid-cols-2 max-[600px]:grid-cols-1">
        <KpiCard label="Block attached" value="8.4 TB" detail="34 volumes" />
        <KpiCard label="Block unattached" value="620 GB" detail="4 volumes, still billing" />
        <KpiCard label="Object storage" value="41.2 TB" detail="11 buckets" />
        <KpiCard label="Snapshots" value="146" detail="Retained 30 days" />
      </div>
      <Card>
        <CardHeader>
          <div>
            <h3 className="text-[14.5px] font-bold">Volumes</h3>
            <p className="text-[12.5px] text-slate-light mt-0.5">
              Block storage attached to your instances
            </p>
          </div>
          <Button variant="primary" size="xs">
            <Icon d={P.plus} s={14} /> Create volume
          </Button>
        </CardHeader>
        <DataTable>
          <THead>
            <tr><TH>Volume</TH><TH>Type</TH><TH>Size</TH><TH>Attached to</TH><TH>Region</TH><TH>Status</TH><TH>Monthly</TH></tr>
          </THead>
          <TBody>
            {VOLUMES.map(([id, t, s, a, r, st]) => (
              <tr key={id}>
                <TD><span className="font-semibold font-mono text-[13px] text-magenta cursor-pointer hover:underline">{id}</span></TD>
                <TD>{t}</TD>
                <TD className="font-mono">{s}</TD>
                <TD className="font-mono text-[12.5px]" style={{ color: a === "—" ? "var(--slate-light)" : undefined }}>{a}</TD>
                <TD className="text-slate-light">{r}</TD>
                <TD><Status s={st} map={{ ok: "In use", wn: "Unattached" }} /></TD>
                <TD className="font-mono">${(parseFloat(s as string) * ((s as string).includes("TB") ? 1024 : 1) * 0.025).toFixed(2)}</TD>
              </tr>
            ))}
          </TBody>
        </DataTable>
        <CardHint>
          <b>vol-orphan-legacy</b> is not attached to anything and still bills at the full rate. Snapshot and delete it to save $15.50 a month.
        </CardHint>
      </Card>
    </div>
  );
}
