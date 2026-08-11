"use client";

import { useState, useMemo } from "react";
import { Icon, P } from "@/lib/icons";
import { INSTANCES } from "@/lib/data";
import { Card, CardHint } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { Chip } from "@/components/ui/Chip";
import { DataTable, THead, TH, TD, TBody } from "@/components/ui/DataTable";
import { Status } from "@/components/ui/StatusBadge";

/* ============================================================
   Instances View
   Table with search, filter chips, checkboxes, meters.
   ============================================================ */

export function Instances() {
  const [q, setQ] = useState("");
  const [f, setF] = useState("all");
  const [sel, setSel] = useState<string[]>([]);

  const rows = useMemo(
    () =>
      INSTANCES.filter((n) => {
        const mq =
          !q ||
          n.id.toLowerCase().includes(q.toLowerCase()) ||
          n.tmpl.toLowerCase().includes(q.toLowerCase());
        const mf =
          f === "all" ||
          (f === "running" && n.st !== "of") ||
          (f === "stopped" && n.st === "of") ||
          (f === "gpu" && n.id.startsWith("gpu"));
        return mq && mf;
      }),
    [q, f]
  );

  const allSel = rows.length > 0 && sel.length === rows.length;

  return (
    <Card>
      {/* Toolbar */}
      <div className="px-[14px] py-[11px] border-b border-hair flex items-center gap-[9px] flex-wrap bg-glass-bg-strong backdrop-blur-[24px] rounded-t-[16px]">
        <SearchInput
          placeholder="Filter instances"
          value={q}
          onChange={setQ}
          className="min-w-[220px]"
        />
        {(
          [
            ["all", "All"],
            ["running", "Running"],
            ["stopped", "Stopped"],
            ["gpu", "GPU"],
          ] as const
        ).map(([k, l]) => (
          <Chip key={k} active={f === k} onClick={() => setF(k)}>
            {l}
          </Chip>
        ))}
        <div className="ml-auto flex gap-2 items-center">
          {sel.length > 0 && (
            <>
              <span className="text-[12.5px] text-slate-light font-semibold">
                {sel.length} selected
              </span>
              <Button size="xs">Stop</Button>
              <Button size="xs" className="text-bad">
                Terminate
              </Button>
            </>
          )}
          <button
            className="w-[34px] h-[34px] rounded-[8px] grid place-items-center text-slate-light transition-colors hover:bg-sunk hover:text-ink"
            title="Refresh"
          >
            <Icon d={P.ref} s={16} />
          </button>
        </div>
      </div>

      {/* Table */}
      <DataTable>
        <THead>
          <tr>
            <TH style={{ width: 40 }}>
              <input
                type="checkbox"
                className="w-[15px] h-[15px] accent-accent cursor-pointer"
                checked={allSel}
                onChange={() =>
                  setSel(allSel ? [] : rows.map((r) => r.id))
                }
                aria-label="Select all"
              />
            </TH>
            <TH>Name</TH>
            <TH>Type</TH>
            <TH>Region</TH>
            <TH>Status</TH>
            <TH>CPU</TH>
            <TH>Memory</TH>
            <TH>Uptime</TH>
            <TH>Rate</TH>
            <TH style={{ width: 40 }} />
          </tr>
        </THead>
        <TBody>
          {rows.map((n) => (
            <tr key={n.id}>
              <TD>
                <input
                  type="checkbox"
                  className="w-[15px] h-[15px] accent-accent cursor-pointer"
                  checked={sel.includes(n.id)}
                  aria-label={`Select ${n.id}`}
                  onChange={() =>
                    setSel(
                      sel.includes(n.id)
                        ? sel.filter((x) => x !== n.id)
                        : [...sel, n.id]
                    )
                  }
                />
              </TD>
              <TD>
                <div className="font-semibold font-mono text-[13px] text-magenta cursor-pointer hover:underline">
                  {n.id}
                </div>
                <div className="text-[12px] text-slate-light mt-0.5">
                  {n.id.startsWith("gpu") ? "GPU instance" : "General purpose"}
                </div>
              </TD>
              <TD className="font-semibold text-ink">{n.tmpl}</TD>
              <TD className="text-slate-light">{n.region}</TD>
              <TD>
                <Status
                  s={n.st}
                  map={{ ok: "Running", wn: "Under pressure", of: "Stopped" }}
                />
              </TD>
              <TD>
                {n.st !== "of" ? (
                  <>
                    <span className="inline-block w-[64px] h-[6px] rounded-full bg-sunk overflow-hidden align-middle">
                      <i
                        className={`block h-full rounded-full ${
                          n.cpu > 90 ? "bg-warn" : "bg-accent"
                        }`}
                        style={{ width: `${n.cpu}%` }}
                      />
                    </span>
                    <span className="font-mono text-[12px] ml-[6px]">
                      {n.cpu}%
                    </span>
                  </>
                ) : (
                  <span className="text-slate-light">—</span>
                )}
              </TD>
              <TD>
                {n.st !== "of" ? (
                  <>
                    <span className="inline-block w-[64px] h-[6px] rounded-full bg-sunk overflow-hidden align-middle">
                      <i
                        className={`block h-full rounded-full ${
                          n.mem > 85 ? "bg-warn" : "bg-accent"
                        }`}
                        style={{ width: `${n.mem}%` }}
                      />
                    </span>
                    <span className="font-mono text-[12px] ml-[6px]">
                      {n.mem}%
                    </span>
                  </>
                ) : (
                  <span className="text-slate-light">—</span>
                )}
              </TD>
              <TD className="font-mono text-[12.5px] text-slate-light">
                {n.up}
              </TD>
              <TD className="font-mono font-semibold">
                {n.rate ? `$${n.rate.toFixed(2)}` : "—"}
              </TD>
              <TD>
                <button
                  className="w-[28px] h-[28px] rounded-[8px] grid place-items-center text-slate-light transition-colors hover:bg-sunk hover:text-ink"
                  aria-label="Actions"
                >
                  <Icon d={P.dots} s={15} />
                </button>
              </TD>
            </tr>
          ))}
        </TBody>
      </DataTable>

      {rows.length === 0 && (
        <div className="text-center py-[44px] px-5 text-slate-light">
          <h4 className="text-[15px] mb-[6px] font-semibold">
            No instances match that filter
          </h4>
          <p className="text-[13px] mb-4">
            Clear the search, or deploy a new instance to get started.
          </p>
          <Button
            onClick={() => {
              setQ("");
              setF("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {rows.length > 0 && (
        <CardHint>
          <b>ci-worker-04</b> is sustaining 94% CPU and 89% memory. Resize it to
          m6.2xlarge or add a second worker before the queue backs up.
        </CardHint>
      )}
    </Card>
  );
}
