"use client";

import { Icon, P } from "@/lib/icons";
import { DEPLOYS, SPEND, SPARK } from "@/lib/data";
import { KpiCard } from "@/components/ui/KpiCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DataTable, THead, TH, TD, TBody } from "@/components/ui/DataTable";
import { Status } from "@/components/ui/StatusBadge";

/* ============================================================
   Home View
   Dashboard overview with KPIs, deployments table, spend card.
   ============================================================ */

interface HomeProps {
  go: (view: string) => void;
}

export function Home({ go }: HomeProps) {
  const total = SPEND.iaas + SPEND.paas + SPEND.saas;
  const pct = (v: number) => ((v / total) * 100).toFixed(1);

  return (
    <div className="flex flex-col gap-[14px]">
      {/* Critical alert */}
      <div className="flex gap-[11px] p-[13px] px-[15px] rounded-[9px] text-[13px] leading-relaxed items-start bg-bad-l text-[#991B1B] border border-[#FECACA]">
        <Icon d={P.warn} s={18} />
        <div>
          <b className="font-bold">batch-etl has no healthy replicas.</b> The
          production deployment has been failing for 22 hours. Check the
          pipeline logs before the next scheduled window.
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-4 gap-[14px] max-[1180px]:grid-cols-2 max-[600px]:grid-cols-1">
        <KpiCard
          label="Monthly run rate"
          value={`$${total.toLocaleString()}`}
          detail={
            <>
              <span className="text-ok font-bold">↑ 6.2%</span> vs last month
            </>
          }
        />
        <KpiCard
          label="Running instances"
          value="5"
          detail="1 stopped · 142 vCPU allocated"
        />
        <KpiCard
          label="Managed services"
          value="7"
          detail="3 clusters · 4 data stores"
        />
        <KpiCard label="Open alerts" value="3" detail="1 critical · 2 warning" />
      </div>

      {/* Two-col: deployments + spend */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-[14px] max-[1180px]:grid-cols-1">
        {/* Recent deployments */}
        <Card>
          <CardHeader>
            <div>
              <h3 className="text-[14.5px] font-bold">Recent deployments</h3>
              <p className="text-[12.5px] text-slate-light mt-0.5">
                Last 24 hours, all environments
              </p>
            </div>
            <Button size="xs" onClick={() => go("deployments")}>
              View all
            </Button>
          </CardHeader>
          <DataTable>
            <THead>
              <tr>
                <TH>Application</TH>
                <TH>Environment</TH>
                <TH>Version</TH>
                <TH>Replicas</TH>
                <TH>Status</TH>
                <TH>Deployed</TH>
              </tr>
            </THead>
            <TBody>
              {DEPLOYS.map((d, i) => (
                <tr key={i}>
                  <TD>
                    <span className="font-semibold text-magenta cursor-pointer hover:underline">
                      {d.app}
                    </span>
                  </TD>
                  <TD>
                    <span className="inline-flex items-center px-2 py-[2px] rounded-[5px] text-[11px] font-bold tracking-[0.03em] bg-sunk text-slate-light">
                      {d.env}
                    </span>
                  </TD>
                  <TD className="font-mono text-[12.5px]">{d.ver}</TD>
                  <TD
                    className="font-mono text-[12.5px]"
                    style={{
                      color:
                        d.reps[0] === "0" ? "var(--bad)" : undefined,
                    }}
                  >
                    {d.reps}
                  </TD>
                  <TD>
                    <Status
                      s={d.st}
                      map={{ ok: "Healthy", wn: "Degraded", bd: "Failed" }}
                    />
                  </TD>
                  <TD className="text-slate-light text-[12.5px]">{d.when}</TD>
                </tr>
              ))}
            </TBody>
          </DataTable>
        </Card>

        {/* Spend card */}
        <Card>
          <CardHeader>
            <div>
              <h3 className="text-[14.5px] font-bold">Spend</h3>
              <p className="text-[12.5px] text-slate-light mt-0.5">
                Month to date
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="text-[30px] font-bold text-ink tracking-tight">
              ${total.toLocaleString()}
            </div>

            {/* Spark chart */}
            <div className="flex items-end gap-[2px] h-[46px] my-[14px]">
              {SPARK.map((v, i) => (
                <i
                  key={i}
                  className={`flex-1 rounded-t-[2px] min-w-0 ${
                    i > 11 ? "bg-accent" : "bg-magenta/25"
                  }`}
                  style={{ height: `${v}%` }}
                />
              ))}
            </div>

            {/* Split bar */}
            <div className="flex h-[9px] rounded-full overflow-hidden mb-[14px]">
              <div
                className="bg-cyan"
                style={{ width: `${pct(SPEND.iaas)}%` }}
              />
              <div
                className="bg-terra"
                style={{ width: `${pct(SPEND.paas)}%` }}
              />
              <div
                className="bg-purple"
                style={{ width: `${pct(SPEND.saas)}%` }}
              />
            </div>

            {/* Breakdown rows */}
            <div className="[&>div]:flex [&>div]:justify-between [&>div]:items-center [&>div]:gap-3 [&>div]:py-[10px] [&>div]:border-b [&>div]:border-hair [&>div:last-child]:border-b-0 [&>div]:text-[13.5px]">
              <div>
                <span className="text-slate-light">
                  <span className="inline-flex items-center px-2 py-[2px] rounded-[5px] text-[11px] font-bold tracking-[0.03em] bg-cyan-l text-amber">
                    IaaS
                  </span>{" "}
                  Infrastructure
                </span>
                <b className="font-mono text-ink font-semibold">
                  ${SPEND.iaas.toLocaleString()}
                </b>
              </div>
              <div>
                <span className="text-slate-light">
                  <span className="inline-flex items-center px-2 py-[2px] rounded-[5px] text-[11px] font-bold tracking-[0.03em] bg-accent-l text-magenta">
                    PaaS
                  </span>{" "}
                  Platform
                </span>
                <b className="font-mono text-ink font-semibold">
                  ${SPEND.paas.toLocaleString()}
                </b>
              </div>
              <div>
                <span className="text-slate-light">
                  <span className="inline-flex items-center px-2 py-[2px] rounded-[5px] text-[11px] font-bold tracking-[0.03em] bg-purple-l text-purple">
                    SaaS
                  </span>{" "}
                  Applications
                </span>
                <b className="font-mono text-ink font-semibold">
                  ${SPEND.saas.toLocaleString()}
                </b>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
