import { Icon, P } from "@/lib/icons";
import { KpiCard } from "@/components/ui/KpiCard";
import { Card, CardHeader, CardHint } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DataTable, THead, TH, TD, TBody } from "@/components/ui/DataTable";
import { Status } from "@/components/ui/StatusBadge";

/* ============================================================
   Networking View
   KPI cards + VPCs table.
   ============================================================ */

const VPCS = [
  ["vpc-prod", "10.0.0.0/16", "Pune-1", 4, 18, "ok"],
  ["vpc-staging", "10.1.0.0/16", "Pune-1", 3, 5, "ok"],
  ["vpc-ml", "10.2.0.0/16", "Mumbai-2", 2, 4, "ok"],
  ["vpc-sandbox", "10.3.0.0/16", "Pune-1", 2, 0, "of"],
] as const;

export function Networking() {
  return (
    <div className="flex flex-col gap-[14px]">
      <div className="grid grid-cols-4 gap-[14px] max-[1180px]:grid-cols-2 max-[600px]:grid-cols-1">
        <KpiCard label="VPCs" value="4" detail="Across 2 regions" />
        <KpiCard label="Subnets" value="11" detail="7 private · 4 public" />
        <KpiCard label="Load balancers" value="5" detail="3 L7 · 2 L4" />
        <KpiCard label="Egress this month" value="2.9 TB" detail="1 TB included" />
      </div>
      <Card>
        <CardHeader>
          <div>
            <h3 className="text-[14.5px] font-bold">Virtual private clouds</h3>
            <p className="text-[12.5px] text-slate-light mt-0.5">Network isolation boundaries</p>
          </div>
          <Button variant="primary" size="xs"><Icon d={P.plus} s={14} /> Create VPC</Button>
        </CardHeader>
        <DataTable>
          <THead>
            <tr><TH>Name</TH><TH>CIDR</TH><TH>Region</TH><TH>Subnets</TH><TH>Resources</TH><TH>Status</TH></tr>
          </THead>
          <TBody>
            {VPCS.map(([n, c, r, s, res, st]) => (
              <tr key={n}>
                <TD><span className="font-semibold font-mono text-[13px] text-magenta cursor-pointer hover:underline">{n}</span></TD>
                <TD className="font-mono text-[12.5px]">{c}</TD>
                <TD className="text-slate-light">{r}</TD>
                <TD className="font-mono">{s}</TD>
                <TD className="font-mono">{res}</TD>
                <TD><Status s={st as string} map={{ ok: "Active", of: "Empty" }} /></TD>
              </tr>
            ))}
          </TBody>
        </DataTable>
        <CardHint><b>vpc-sandbox</b> has no resources in it. Deleting unused VPCs keeps your route tables readable.</CardHint>
      </Card>
    </div>
  );
}
