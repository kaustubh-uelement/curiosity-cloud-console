import { Icon, P } from "@/lib/icons";
import { Card, CardHeader, CardBody, CardHint } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DataTable, THead, TH, TD, TBody } from "@/components/ui/DataTable";
import { Status } from "@/components/ui/StatusBadge";

/* ============================================================
   Access View
   Team & roles table + API keys + security settings.
   ============================================================ */

const TEAM = [
  ["priya.n@curiositycloud.ai", "Owner", "All resources", "now"],
  ["d.mehta@curiositycloud.ai", "Platform admin", "All resources", "12m ago"],
  ["a.rao@curiositycloud.ai", "Developer", "orders, storefront", "2h ago"],
  ["s.iyer@curiositycloud.ai", "Developer", "recs-engine", "5h ago"],
  ["billing@curiositycloud.ai", "Billing viewer", "Billing only", "3d ago"],
] as const;

export function Access() {
  return (
    <div className="grid grid-cols-[1.4fr_1fr] gap-[14px] max-[1180px]:grid-cols-1">
      {/* Team table */}
      <Card>
        <CardHeader>
          <div>
            <h3 className="text-[14.5px] font-bold">Team &amp; roles</h3>
            <p className="text-[12.5px] text-slate-light mt-0.5">Who can do what in this project</p>
          </div>
          <Button variant="primary" size="xs"><Icon d={P.plus} s={14} /> Invite</Button>
        </CardHeader>
        <DataTable>
          <THead>
            <tr><TH>Member</TH><TH>Role</TH><TH>Scope</TH><TH>Last active</TH></tr>
          </THead>
          <TBody>
            {TEAM.map(([m, r, s, l]) => (
              <tr key={m}>
                <TD className="font-mono text-[12.5px]">{m}</TD>
                <TD className="font-semibold text-ink">{r}</TD>
                <TD className="text-slate-light text-[12.5px]">{s}</TD>
                <TD className="text-slate-light text-[12.5px]">{l}</TD>
              </tr>
            ))}
          </TBody>
        </DataTable>
      </Card>

      {/* Right column: API keys + Security */}
      <div className="flex flex-col gap-[14px]">
        <Card>
          <CardHeader>
            <div>
              <h3 className="text-[14.5px] font-bold">API keys</h3>
              <p className="text-[12.5px] text-slate-light mt-0.5">Programmatic access</p>
            </div>
            <Button size="xs">Create key</Button>
          </CardHeader>
          <CardBody>
            <div className="[&>div]:flex [&>div]:justify-between [&>div]:items-center [&>div]:gap-3 [&>div]:py-[10px] [&>div]:border-b [&>div]:border-hair [&>div:last-child]:border-b-0 [&>div]:text-[13.5px]">
              <div><span className="font-mono text-[12.5px]">ci-deploy-key</span><Status s="ok" map={{ ok: "Active" }} /></div>
              <div><span className="font-mono text-[12.5px]">terraform-provider</span><Status s="ok" map={{ ok: "Active" }} /></div>
              <div><span className="font-mono text-[12.5px]">legacy-exporter</span><Status s="wn" map={{ wn: "Rotate" }} /></div>
            </div>
          </CardBody>
          <CardHint><b>legacy-exporter</b> was created 397 days ago. Rotate keys older than a year.</CardHint>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <h3 className="text-[14.5px] font-bold">Security</h3>
              <p className="text-[12.5px] text-slate-light mt-0.5">Workspace controls</p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="[&>div]:flex [&>div]:justify-between [&>div]:items-center [&>div]:gap-3 [&>div]:py-[10px] [&>div]:border-b [&>div]:border-hair [&>div:last-child]:border-b-0 [&>div]:text-[13.5px]">
              <div><span className="text-slate-light">Single sign-on</span><Status s="ok" map={{ ok: "SAML enabled" }} /></div>
              <div><span className="text-slate-light">Two-factor</span><Status s="ok" map={{ ok: "Required" }} /></div>
              <div><span className="text-slate-light">SCIM provisioning</span><Status s="ok" map={{ ok: "Connected" }} /></div>
              <div><span className="text-slate-light">Audit retention</span><b className="font-mono text-ink font-semibold">365 days</b></div>
              <div><span className="text-slate-light">Data residency</span><b className="text-ink font-semibold">India only</b></div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
