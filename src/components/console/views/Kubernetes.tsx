import { Icon, P } from "@/lib/icons";
import { CLUSTERS } from "@/lib/data";
import { Card, CardHeader, CardHint } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DataTable, THead, TH, TD, TBody } from "@/components/ui/DataTable";
import { Status } from "@/components/ui/StatusBadge";

/* ============================================================
   Kubernetes View
   Clusters table.
   ============================================================ */

export function Kubernetes() {
  return (
    <Card>
      <CardHeader>
        <div>
          <h3 className="text-[14.5px] font-bold">Kubernetes clusters</h3>
          <p className="text-[12.5px] text-slate-light mt-0.5">Managed control plane with autoscaling node pools</p>
        </div>
        <Button variant="primary" size="xs"><Icon d={P.plus} s={14} /> Create cluster</Button>
      </CardHeader>
      <DataTable>
        <THead>
          <tr><TH>Cluster</TH><TH>Version</TH><TH>Region</TH><TH>Nodes</TH><TH>Pods</TH><TH>CPU</TH><TH>Status</TH><TH style={{ width: 90 }} /></tr>
        </THead>
        <TBody>
          {CLUSTERS.map((c) => (
            <tr key={c.id}>
              <TD><span className="font-semibold font-mono text-[13px] text-magenta cursor-pointer hover:underline">{c.id}</span></TD>
              <TD className="font-mono text-[12.5px] text-slate-light">{c.ver}</TD>
              <TD className="text-slate-light">{c.region}</TD>
              <TD className="font-mono">{c.nodes}</TD>
              <TD className="font-mono">{c.pods}</TD>
              <TD>
                <span className="inline-block w-[64px] h-[6px] rounded-full bg-sunk overflow-hidden align-middle">
                  <i className={`block h-full rounded-full ${c.cpu > 85 ? "bg-warn" : "bg-accent"}`} style={{ width: `${c.cpu}%` }} />
                </span>
                <span className="font-mono text-[12px] ml-[6px]">{c.cpu}%</span>
              </TD>
              <TD><Status s={c.st} map={{ ok: "Healthy", wn: "Under pressure" }} /></TD>
              <TD><Button size="xs">Connect</Button></TD>
            </tr>
          ))}
        </TBody>
      </DataTable>
      <CardHint><b>k8s-ml</b> is two minor versions behind and running hot. The control plane upgrade is zero-downtime; node pools roll one at a time.</CardHint>
    </Card>
  );
}
