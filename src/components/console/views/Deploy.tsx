"use client";

import { useState } from "react";
import { Icon, P } from "@/lib/icons";
import { GPUS, AVAIL, REGIONS, TEMPLATES } from "@/lib/data";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Status } from "@/components/ui/StatusBadge";

/* ============================================================
   Deploy View
   GPU selection grid + configurator panel with live pricing.
   ============================================================ */

export function Deploy() {
  const [gpu, setGpu] = useState("a100-pcie");
  const [count, setCount] = useState(1);
  const [region, setRegion] = useState("pune-1");
  const [tmpl, setTmpl] = useState(TEMPLATES[0]);
  const [disk, setDisk] = useState(100);
  const [term, setTerm] = useState("ondemand");
  const [done, setDone] = useState(false);

  const g = GPUS.find((x) => x.id === gpu)!;
  const r = REGIONS.find((x) => x.id === region)!;
  const termMult = term === "spot" ? 0.55 : term === "reserved" ? 0.78 : 1;

  const gpuCost = g.price * count * r.mult * termMult;
  const diskCost = disk * 0.00012;
  const hourly = gpuCost + diskCost;

  return (
    <div className="grid grid-cols-[1fr_316px] gap-4 items-start max-[1180px]:grid-cols-1">
      <div className="flex flex-col gap-[14px]">
        {/* Deploy success alert */}
        {done && (
          <div className="flex gap-[11px] p-[13px] px-[15px] rounded-[9px] text-[13px] leading-relaxed items-start bg-ok-l text-[#065F46] border border-[#A7F3D0]">
            <Icon d={P.rocket} s={18} />
            <div>
              <b className="font-bold">Deployment started.</b> {count} × {g.name} in{" "}
              {r.name} is provisioning. It will appear in Instances within about
              40 seconds.
            </div>
          </div>
        )}

        {/* Tabs */}
        <div>
          <div className="flex gap-[2px] border-b border-hair mb-4 overflow-x-auto">
            <button className="px-[15px] py-[10px] text-[13.5px] font-semibold text-magenta border-b-2 border-accent -mb-[1px] whitespace-nowrap">
              GPU
            </button>
            <button className="px-[15px] py-[10px] text-[13.5px] font-semibold text-slate-light border-b-2 border-transparent -mb-[1px] whitespace-nowrap hover:text-ink">
              CPU only
            </button>
            <button className="px-[15px] py-[10px] text-[13.5px] font-semibold text-slate-light border-b-2 border-transparent -mb-[1px] whitespace-nowrap hover:text-ink">
              Bare metal
            </button>
          </div>

          {/* GPU grid */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(268px,1fr))] gap-3">
            {GPUS.map((x) => {
              const off = x.avail === "none";
              const selected = gpu === x.id;
              return (
                <button
                  key={x.id}
                  className={`bg-glass-bg-strong backdrop-blur-[24px] border-[1.5px] rounded-[10px] p-[15px] cursor-pointer transition-all text-left w-full relative ${
                    selected
                      ? "border-accent bg-accent-l"
                      : off
                        ? "opacity-55 cursor-not-allowed border-hair"
                        : "border-hair hover:border-slate-light/40 hover:shadow-sh-2"
                  }`}
                  onClick={() => !off && (setGpu(x.id), setDone(false))}
                  disabled={off}
                  aria-pressed={selected}
                >
                  <div className="absolute top-[15px] right-[15px]">
                    <Status s={AVAIL[x.avail].c} map={{ ok: "", wn: "", of: "" }} />
                  </div>
                  <div className="flex justify-between items-start gap-[10px] mb-3">
                    <div>
                      <div className="text-[14.5px] font-bold text-ink">
                        {x.name}
                      </div>
                      <div className="text-[12px] text-slate-light mt-0.5">
                        {x.note}
                      </div>
                    </div>
                    <div className="font-mono text-[16px] font-bold text-ink text-right whitespace-nowrap">
                      ${x.price.toFixed(2)}
                      <small className="block text-[10.5px] text-slate-light font-sans font-medium">
                        /hr
                      </small>
                    </div>
                  </div>
                  <div
                    className={`grid grid-cols-3 gap-2 pt-[11px] border-t ${
                      selected ? "border-magenta/30" : "border-hair"
                    }`}
                  >
                    <div className="text-center">
                      <b className="block text-[12.5px] text-ink font-mono font-semibold">
                        {x.vram}
                      </b>
                      <span className="text-[10.5px] text-slate-light">VRAM</span>
                    </div>
                    <div className="text-center">
                      <b className="block text-[12.5px] text-ink font-mono font-semibold">
                        {x.vcpu}
                      </b>
                      <span className="text-[10.5px] text-slate-light">vCPU</span>
                    </div>
                    <div className="text-center">
                      <b className="block text-[12.5px] text-ink font-mono font-semibold">
                        {x.mem}
                      </b>
                      <span className="text-[10.5px] text-slate-light">RAM</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Configurator */}
      <Card className="sticky top-[72px] max-[1180px]:static">
        <CardHeader>
          <div>
            <h3 className="text-[14.5px] font-bold">Configure</h3>
            <p className="text-[12.5px] text-slate-light mt-0.5">
              {g.name} · {r.name}
            </p>
          </div>
        </CardHeader>
        <CardBody className="pt-1">
          {/* GPU count */}
          <div className="py-[13px] border-b border-hair">
            <div className="text-[12.5px] font-semibold text-slate flex justify-between items-center mb-2">
              GPU count <span className="text-slate-light font-medium text-[11.5px]">max 8</span>
            </div>
            <div className="flex items-center border border-hair rounded-[7px] overflow-hidden">
              <button
                className="w-[34px] h-[34px] text-[16px] text-slate-light bg-glass-bg-strong hover:bg-sunk hover:text-ink disabled:text-hair disabled:cursor-not-allowed"
                onClick={() => setCount(Math.max(1, count - 1))}
                disabled={count <= 1}
                aria-label="Fewer GPUs"
              >
                −
              </button>
              <b className="flex-1 text-center font-mono text-[14px]">{count}</b>
              <button
                className="w-[34px] h-[34px] text-[16px] text-slate-light bg-glass-bg-strong hover:bg-sunk hover:text-ink disabled:text-hair disabled:cursor-not-allowed"
                onClick={() => setCount(Math.min(8, count + 1))}
                disabled={count >= 8}
                aria-label="More GPUs"
              >
                +
              </button>
            </div>
          </div>

          {/* Region */}
          <div className="py-[13px] border-b border-hair">
            <div className="text-[12.5px] font-semibold text-slate mb-2">Region</div>
            <select
              className="w-full px-[11px] py-2 border border-hair rounded-[7px] bg-glass-bg-strong text-ink font-medium cursor-pointer focus:outline-none focus:border-accent"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              {REGIONS.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </div>

          {/* Template */}
          <div className="py-[13px] border-b border-hair">
            <div className="text-[12.5px] font-semibold text-slate mb-2">Template</div>
            <select
              className="w-full px-[11px] py-2 border border-hair rounded-[7px] bg-glass-bg-strong text-ink font-medium cursor-pointer focus:outline-none focus:border-accent"
              value={tmpl}
              onChange={(e) => setTmpl(e.target.value)}
            >
              {TEMPLATES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Disk slider */}
          <div className="py-[13px] border-b border-hair">
            <div className="text-[12.5px] font-semibold text-slate flex justify-between items-center mb-2">
              Persistent disk{" "}
              <span className="font-mono text-slate-light">{disk} GB</span>
            </div>
            <input
              className="w-full accent-accent cursor-pointer"
              type="range"
              min="20"
              max="2000"
              step="20"
              value={disk}
              onChange={(e) => setDisk(+e.target.value)}
              aria-label="Disk size in GB"
            />
          </div>

          {/* Pricing segment */}
          <div className="py-[13px]">
            <div className="text-[12.5px] font-semibold text-slate mb-2">Pricing</div>
            <div className="flex bg-sunk rounded-[7px] p-[3px] gap-[3px]">
              {([["ondemand", "On-demand"], ["reserved", "Reserved"], ["spot", "Spot"]] as const).map(
                ([k, l]) => (
                  <button
                    key={k}
                    className={`flex-1 py-[7px] rounded-[5px] text-[12.5px] font-semibold transition-colors ${
                      term === k
                        ? "bg-glass-bg-strong text-ink shadow-sh"
                        : "text-slate-light"
                    }`}
                    onClick={() => setTerm(k)}
                  >
                    {l}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Price summary */}
          <div className="bg-sunk rounded-[8px] p-[14px] mt-[14px]">
            <div className="flex justify-between text-[12.5px] py-1 text-slate-light">
              <span>
                {count} × {g.name}
              </span>
              <b className="text-slate font-mono font-semibold">
                ${gpuCost.toFixed(3)}
              </b>
            </div>
            <div className="flex justify-between text-[12.5px] py-1 text-slate-light">
              <span>{disk} GB disk</span>
              <b className="text-slate font-mono font-semibold">
                ${diskCost.toFixed(3)}
              </b>
            </div>
            {term !== "ondemand" && (
              <div className="flex justify-between text-[12.5px] py-1 text-ok">
                <span>
                  {term === "spot" ? "Spot discount" : "Reserved discount"}
                </span>
                <b className="text-ok font-mono font-semibold">
                  −{term === "spot" ? "45" : "22"}%
                </b>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-[11px] mt-2 border-t border-hair">
              <span className="text-[13px] font-bold text-ink">Total</span>
              <b className="text-[22px] font-bold text-ink font-mono tracking-tight">
                ${hourly.toFixed(2)}
                <small className="text-[11.5px] text-slate-light font-sans font-medium">
                  /hr
                </small>
              </b>
            </div>
          </div>
          <p className="text-[12px] text-slate-light text-center mt-[9px]">
            ≈ $
            {(hourly * 730).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{" "}
            per month if left running
          </p>

          <Button
            variant="primary"
            className="w-full justify-center mt-[14px]"
            onClick={() => setDone(true)}
          >
            <Icon d={P.rocket} s={15} /> Deploy
          </Button>

          {term === "spot" && (
            <p className="text-[12px] text-warn text-center mt-[10px]">
              Spot instances can be reclaimed with 30 seconds notice. Checkpoint
              your work.
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
