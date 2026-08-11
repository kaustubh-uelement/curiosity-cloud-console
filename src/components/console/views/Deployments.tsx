import { Icon, P } from "@/lib/icons";
import { DEPLOYS } from "@/lib/data";
import { Card, CardHeader, CardHint } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DataTable, THead, TH, TD, TBody } from "@/components/ui/DataTable";
import { Status } from "@/components/ui/StatusBadge";

/* ============================================================
   Deployments View
   Full deployments table with rollback/view-logs actions.
   ============================================================ */

export function Deployments() {
  return (
    <Card>
      <CardHeader>
        <div>
          <h3 className="text-[14.5px] font-bold">Deployments</h3>
          <p className="text-[12.5px] text-slate-light mt-0.5">Application rollouts across every environment</p>
        </div>
        <Button variant="primary" size="xs"><Icon d={P.plus} s={14} /> New deployment</Button>
      </CardHeader>
      <DataTable>
        <THead>
          <tr><TH>Application</TH><TH>Environment</TH><TH>Version</TH><TH>Replicas</TH><TH>Status</TH><TH>Deployed</TH><TH>By</TH><TH style={{ width: 100 }} /></tr>
        </THead>
        <TBody>
          {DEPLOYS.map((d, i) => (
            <tr key={i}>
              <TD><span className="font-semibold text-magenta cursor-pointer hover:underline">{d.app}</span></TD>
              <TD>
                <span className="inline-flex items-center px-2 py-[2px] rounded-[5px] text-[11px] font-bold tracking-[0.03em] bg-sunk text-slate-light">
                  {d.env}
                </span>
              </TD>
              <TD className="font-mono text-[12.5px]">{d.ver}</TD>
              <TD className="font-mono text-[12.5px]" style={{ color: d.reps[0] === "0" ? "var(--bad)" : undefined }}>{d.reps}</TD>
              <TD><Status s={d.st} map={{ ok: "Healthy", wn: "Degraded", bd: "Failed" }} /></TD>
              <TD className="text-slate-light text-[12.5px]">{d.when}</TD>
              <TD className="text-slate-light text-[12.5px]">{d.by}</TD>
              <TD><Button size="xs">{d.st === "bd" ? "View logs" : "Roll back"}</Button></TD>
            </tr>
          ))}
        </TBody>
      </DataTable>
      <CardHint>Rolling back restores the previous image and configuration. It does not revert database migrations — check the migration history first.</CardHint>
    </Card>
  );
}
