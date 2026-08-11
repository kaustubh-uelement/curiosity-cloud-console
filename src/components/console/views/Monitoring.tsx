import { KpiCard } from "@/components/ui/KpiCard";
import { Card, CardHeader, CardBody, CardHint } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DataTable, THead, TH, TD, TBody } from "@/components/ui/DataTable";
import { Status } from "@/components/ui/StatusBadge";

/* ============================================================
   Monitoring View
   KPI cards + alerts table + telemetry volume.
   ============================================================ */

const ALERTS = [
  ["Deployment has no healthy replicas", "batch-etl", "bd", "Critical", "22h"],
  ["Node memory above 85%", "ci-worker-04", "wn", "Warning", "3h"],
  ["Dead-letter queue growing", "orders-events-dlq", "wn", "Warning", "1h"],
] as const;

export function Monitoring() {
  return (
    <div className="flex flex-col gap-[14px]">
      <div className="grid grid-cols-4 gap-[14px] max-[1180px]:grid-cols-2 max-[600px]:grid-cols-1">
        <KpiCard label="Availability" value="99.97%" detail="SLO 99.95% · 30-day" />
        <KpiCard label="p99 latency" value="84 ms" detail="Public API endpoints" />
        <KpiCard
          label="Error rate"
          value="0.42%"
          detail={<><span className="text-bad font-bold">↑</span> from 0.18% yesterday</>}
        />
        <KpiCard label="Open alerts" value="3" detail="1 critical · 2 warning" />
      </div>
      <div className="grid grid-cols-[1.4fr_1fr] gap-[14px] max-[1180px]:grid-cols-1">
        <Card>
          <CardHeader>
            <div>
              <h3 className="text-[14.5px] font-bold">Active alerts</h3>
              <p className="text-[12.5px] text-slate-light mt-0.5">Ordered by severity</p>
            </div>
            <Button size="xs">Alert rules</Button>
          </CardHeader>
          <DataTable>
            <THead>
              <tr><TH>Alert</TH><TH>Resource</TH><TH>Severity</TH><TH>Age</TH><TH style={{ width: 90 }} /></tr>
            </THead>
            <TBody>
              {ALERTS.map(([a, r, s, l, age]) => (
                <tr key={a}>
                  <TD className="font-semibold text-ink">{a}</TD>
                  <TD className="font-mono text-[12.5px]">{r}</TD>
                  <TD><Status s={s} map={{ bd: l, wn: l }} /></TD>
                  <TD className="text-slate-light text-[12.5px]">{age}</TD>
                  <TD><Button size="xs">Silence</Button></TD>
                </tr>
              ))}
            </TBody>
          </DataTable>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <h3 className="text-[14.5px] font-bold">Telemetry volume</h3>
              <p className="text-[12.5px] text-slate-light mt-0.5">Ingested this month</p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="[&>div]:flex [&>div]:justify-between [&>div]:items-center [&>div]:gap-3 [&>div]:py-[10px] [&>div]:border-b [&>div]:border-hair [&>div:last-child]:border-b-0 [&>div]:text-[13.5px]">
              <div><span className="text-slate-light">Metrics series</span><b className="font-mono text-ink font-semibold">2.4 M</b></div>
              <div><span className="text-slate-light">Log volume</span><b className="font-mono text-ink font-semibold">1.9 TB</b></div>
              <div><span className="text-slate-light">Traces sampled</span><b className="font-mono text-ink font-semibold">184 M</b></div>
              <div><span className="text-slate-light">Retention</span><b className="font-mono text-ink font-semibold">30 days</b></div>
            </div>
          </CardBody>
          <CardHint>Log ingestion drives most of your Observability cost. Sampling debug logs in staging would cut roughly 300 GB a month.</CardHint>
        </Card>
      </div>
    </div>
  );
}
