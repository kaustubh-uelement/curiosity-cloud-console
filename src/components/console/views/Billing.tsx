import { SPEND } from "@/lib/data";
import { KpiCard } from "@/components/ui/KpiCard";
import { Card, CardHeader, CardBody, CardHint } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DataTable, THead, TH, TD, TBody } from "@/components/ui/DataTable";
import { Status } from "@/components/ui/StatusBadge";

/* ============================================================
   Billing View
   KPI cards + spend breakdown + invoices table.
   ============================================================ */

const INVOICES = [
  ["Aug 2026", 11840, 6215, 1750, "wn"],
  ["Jul 2026", 48210, 24980, 7562, "ok"],
  ["Jun 2026", 44160, 22140, 7562, "ok"],
  ["May 2026", 41902, 20880, 6980, "ok"],
] as const;

export function Billing() {
  const total = SPEND.iaas + SPEND.paas + SPEND.saas;
  const pct = (v: number) => ((v / total) * 100).toFixed(1);

  return (
    <div className="flex flex-col gap-[14px]">
      <div className="grid grid-cols-4 gap-[14px] max-[1180px]:grid-cols-2 max-[600px]:grid-cols-1">
        <KpiCard label="Month to date" value={`$${total.toLocaleString()}`} detail="1–7 August 2026" />
        <KpiCard
          label="Projected close"
          value={`$${(total * 4.4).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          detail="18% under cap"
        />
        <KpiCard label="Monthly cap" value="$105,000" detail="Alerts at 80%" />
        <KpiCard label="Committed discount" value="−22%" detail="On reserved compute" />
      </div>

      <Card>
        <CardHeader>
          <div>
            <h3 className="text-[14.5px] font-bold">Spend by service layer</h3>
            <p className="text-[12.5px] text-slate-light mt-0.5">Where the money goes across IaaS, PaaS and SaaS</p>
          </div>
          <Button size="xs">Export CSV</Button>
        </CardHeader>
        <CardBody>
          {/* Split bar */}
          <div className="flex h-[12px] rounded-full overflow-hidden mb-[14px]">
            <div className="bg-cyan" style={{ width: `${pct(SPEND.iaas)}%` }} />
            <div className="bg-terra" style={{ width: `${pct(SPEND.paas)}%` }} />
            <div className="bg-purple" style={{ width: `${pct(SPEND.saas)}%` }} />
          </div>
          <div className="[&>div]:flex [&>div]:justify-between [&>div]:items-center [&>div]:gap-3 [&>div]:py-[10px] [&>div]:border-b [&>div]:border-hair [&>div:last-child]:border-b-0 [&>div]:text-[13.5px]">
            <div>
              <span className="text-slate-light">
                <span className="inline-flex items-center px-2 py-[2px] rounded-[5px] text-[11px] font-bold tracking-[0.03em] bg-cyan-l text-amber">IaaS</span> Compute, storage, network
              </span>
              <b className="font-mono text-ink font-semibold">${SPEND.iaas.toLocaleString()} · {pct(SPEND.iaas)}%</b>
            </div>
            <div>
              <span className="text-slate-light">
                <span className="inline-flex items-center px-2 py-[2px] rounded-[5px] text-[11px] font-bold tracking-[0.03em] bg-accent-l text-magenta">PaaS</span> Clusters, data stores, pipelines
              </span>
              <b className="font-mono text-ink font-semibold">${SPEND.paas.toLocaleString()} · {pct(SPEND.paas)}%</b>
            </div>
            <div>
              <span className="text-slate-light">
                <span className="inline-flex items-center px-2 py-[2px] rounded-[5px] text-[11px] font-bold tracking-[0.03em] bg-purple-l text-purple">SaaS</span> Subscribed software
              </span>
              <b className="font-mono text-ink font-semibold">${SPEND.saas.toLocaleString()} · {pct(SPEND.saas)}%</b>
            </div>
          </div>
        </CardBody>
        <CardHint>Platform charges already include the infrastructure they consume. A managed Postgres instance bills once, here — its nodes and volumes are not billed separately.</CardHint>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <h3 className="text-[14.5px] font-bold">Invoices</h3>
            <p className="text-[12.5px] text-slate-light mt-0.5">Download any period as PDF or CSV</p>
          </div>
        </CardHeader>
        <DataTable>
          <THead>
            <tr><TH>Period</TH><TH>IaaS</TH><TH>PaaS</TH><TH>SaaS</TH><TH>Total</TH><TH>Status</TH><TH style={{ width: 100 }} /></tr>
          </THead>
          <TBody>
            {INVOICES.map(([p, a, b, c, st]) => (
              <tr key={p}>
                <TD className="font-semibold text-ink">{p}</TD>
                <TD className="font-mono text-[12.5px]">${(a as number).toLocaleString()}</TD>
                <TD className="font-mono text-[12.5px]">${(b as number).toLocaleString()}</TD>
                <TD className="font-mono text-[12.5px]">${(c as number).toLocaleString()}</TD>
                <TD className="font-mono font-bold">${((a as number) + (b as number) + (c as number)).toLocaleString()}</TD>
                <TD><Status s={st as string} map={{ ok: "Paid", wn: "Open" }} /></TD>
                <TD><Button size="xs">Download</Button></TD>
              </tr>
            ))}
          </TBody>
        </DataTable>
      </Card>
    </div>
  );
}
