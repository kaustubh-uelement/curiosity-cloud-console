import { SUBS } from "@/lib/data";
import { KpiCard } from "@/components/ui/KpiCard";
import { Card, CardHeader, CardHint } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DataTable, THead, TH, TD, TBody } from "@/components/ui/DataTable";
import { Status } from "@/components/ui/StatusBadge";

/* ============================================================
   Apps View (Subscriptions)
   KPI cards + subscriptions table.
   ============================================================ */

export function Apps() {
  const total = SUBS.reduce((a, b) => a + b.cost, 0);
  return (
    <div className="flex flex-col gap-[14px]">
      <div className="grid grid-cols-3 gap-[14px] max-[1180px]:grid-cols-1">
        <KpiCard label="Active subscriptions" value={SUBS.length} detail="1 more available" />
        <KpiCard label="Monthly cost" value={`$${total.toLocaleString()}`} detail="Billed on the 1st" />
        <KpiCard label="Identity seats" value="42 / 50" detail="8 remaining" />
      </div>
      <Card>
        <CardHeader>
          <div>
            <h3 className="text-[14.5px] font-bold">Subscriptions</h3>
            <p className="text-[12.5px] text-slate-light mt-0.5">Managed software your team signs into — nothing to deploy or patch</p>
          </div>
          <Button size="xs">Browse catalog</Button>
        </CardHeader>
        <DataTable>
          <THead>
            <tr><TH>Application</TH><TH>Plan</TH><TH>Seats</TH><TH>Renews</TH><TH>Monthly</TH><TH>Status</TH><TH style={{ width: 100 }} /></tr>
          </THead>
          <TBody>
            {SUBS.map((s) => (
              <tr key={s.name}>
                <TD>
                  <span className="font-semibold text-magenta cursor-pointer hover:underline">{s.name}</span>
                  <span className="inline-flex items-center px-2 py-[2px] rounded-[5px] text-[11px] font-bold tracking-[0.03em] bg-purple-l text-purple ml-[6px]">
                    SaaS
                  </span>
                </TD>
                <TD className="text-slate-light">{s.plan}</TD>
                <TD className="font-mono text-[12.5px]">{s.seats}</TD>
                <TD className="text-slate-light text-[12.5px]">{s.renew}</TD>
                <TD className="font-mono font-semibold">${s.cost}</TD>
                <TD><Status s={s.st} map={{ ok: "Active", wn: "Renews soon" }} /></TD>
                <TD><Button size="xs">Configure</Button></TD>
              </tr>
            ))}
          </TBody>
        </DataTable>
        <CardHint><b>Backup &amp; Recovery</b> renews in a week on Standard. Your restore-drill history suggests Business tier would meet your current RPO target.</CardHint>
      </Card>
    </div>
  );
}
