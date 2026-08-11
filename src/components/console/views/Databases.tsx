import { Icon, P } from "@/lib/icons";
import { DBS } from "@/lib/data";
import { Card, CardHeader, CardHint } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DataTable, THead, TH, TD, TBody } from "@/components/ui/DataTable";
import { Status } from "@/components/ui/StatusBadge";

/* ============================================================
   Databases View
   Data stores table.
   ============================================================ */

export function Databases() {
  return (
    <Card>
      <CardHeader>
        <div>
          <h3 className="text-[14.5px] font-bold">Data stores</h3>
          <p className="text-[12.5px] text-slate-light mt-0.5">Managed PostgreSQL and Redis with automated backups</p>
        </div>
        <Button variant="primary" size="xs"><Icon d={P.plus} s={14} /> Create data store</Button>
      </CardHeader>
      <DataTable>
        <THead>
          <tr><TH>Name</TH><TH>Engine</TH><TH>Plan</TH><TH>Size</TH><TH>Connections</TH><TH>Status</TH><TH style={{ width: 90 }} /></tr>
        </THead>
        <TBody>
          {DBS.map((d) => (
            <tr key={d.id}>
              <TD><span className="font-semibold font-mono text-[13px] text-magenta cursor-pointer hover:underline">{d.id}</span></TD>
              <TD className="font-semibold text-ink">{d.eng}</TD>
              <TD className="text-slate-light text-[12.5px]">{d.plan}</TD>
              <TD className="font-mono">{d.size}</TD>
              <TD className="font-mono text-[12.5px]">{d.conn}</TD>
              <TD><Status s={d.st} map={{ ok: "Available", wn: "Needs attention" }} /></TD>
              <TD><Button size="xs">Manage</Button></TD>
            </tr>
          ))}
        </TBody>
      </DataTable>
      <CardHint><b>pg-legacy-billing</b> runs PostgreSQL 14, which leaves standard support in November 2026. Plan a major-version upgrade.</CardHint>
    </Card>
  );
}
