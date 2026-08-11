import React, { useState, useMemo } from "react";

/* ============================================================
   CURIOSITY CLOUD — CONSOLE
   Practical console pattern: project/region context in the bar,
   grouped resource nav, dense tables with real toolbars, and a
   deploy flow that prices as you configure it.
   ============================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

.cq * { box-sizing:border-box; }
.cq {
  --bg:#F5F7FA; --surface:#FFFFFF; --sunk:#F0F3F8; --hover:#F7F9FC;
  --bd:#E2E8F0; --bd-2:#CBD5E1;
  --ink:#0F172A; --txt:#334155; --mute:#64748B; --dim:#94A3B8;
  --blue:#2563EB; --blue-d:#1D4ED8; --blue-l:#EFF6FF;
  --cyan:#0891B2; --cyan-l:#ECFEFF;
  --violet:#6D28D9; --violet-l:#F5F3FF;
  --ok:#059669; --ok-l:#ECFDF5; --warn:#D97706; --warn-l:#FFFBEB;
  --bad:#DC2626; --bad-l:#FEF2F2;
  --sh:0 1px 2px rgba(15,23,42,.05); --sh-2:0 4px 14px rgba(15,23,42,.09);
  font-family:'Manrope',system-ui,-apple-system,sans-serif;
  color:var(--txt); background:var(--bg); min-height:100vh; -webkit-font-smoothing:antialiased; font-size:14px;
}
.cq h1,.cq h2,.cq h3,.cq h4 { margin:0; color:var(--ink); letter-spacing:-.01em; }
.cq .mono { font-family:'JetBrains Mono',ui-monospace,monospace; font-variant-numeric:tabular-nums; }
.cq button { font-family:inherit; cursor:pointer; border:none; background:none; color:inherit; }
.cq input,.cq select { font-family:inherit; font-size:13.5px; }
.cq :focus-visible { outline:2px solid var(--blue); outline-offset:1px; border-radius:4px; }

/* ---------- TOP BAR ---------- */
.bar { height:56px; background:var(--surface); border-bottom:1px solid var(--bd);
  display:flex; align-items:center; gap:14px; padding:0 16px; position:sticky; top:0; z-index:50; }
.logo { display:flex; align-items:center; gap:9px; padding-right:14px; border-right:1px solid var(--bd); }
.logo-d { width:22px; height:22px; border-radius:6px; background:linear-gradient(135deg,var(--violet),var(--cyan));
  display:grid; place-items:center; color:#fff; font-size:11px; font-weight:800; font-family:'Poppins'; }
.logo-t { font-family:'Poppins'; font-weight:600; font-size:14.5px; color:var(--ink); white-space:nowrap; }
.ctx { display:flex; align-items:center; gap:7px; }
.ctx-btn { display:flex; align-items:center; gap:7px; padding:6px 11px; border:1px solid var(--bd);
  border-radius:7px; font-size:13px; font-weight:600; color:var(--txt); background:var(--surface); transition:.14s; white-space:nowrap; }
.ctx-btn:hover { background:var(--hover); border-color:var(--bd-2); }
.ctx-btn small { color:var(--dim); font-weight:500; font-size:11px; text-transform:uppercase; letter-spacing:.07em; }
.search { flex:1; max-width:440px; display:flex; align-items:center; gap:9px; padding:7px 12px;
  background:var(--sunk); border:1px solid transparent; border-radius:8px; color:var(--dim); transition:.14s; }
.search:focus-within { background:var(--surface); border-color:var(--blue); }
.search input { flex:1; border:none; background:none; outline:none; color:var(--ink); }
.search input::placeholder { color:var(--dim); }
.kbd { font-family:'JetBrains Mono'; font-size:10.5px; padding:2px 6px; background:var(--surface);
  border:1px solid var(--bd); border-radius:4px; color:var(--dim); }
.bar-r { margin-left:auto; display:flex; align-items:center; gap:6px; }
.icb { width:34px; height:34px; border-radius:8px; display:grid; place-items:center; color:var(--mute); transition:.14s; }
.icb:hover { background:var(--sunk); color:var(--ink); }
.avatar { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,var(--blue),var(--violet));
  display:grid; place-items:center; color:#fff; font-size:12px; font-weight:700; }

/* ---------- LAYOUT ---------- */
.wrap { display:grid; grid-template-columns:228px 1fr; align-items:start; }
.nav { background:var(--surface); border-right:1px solid var(--bd); padding:12px 10px 30px;
  position:sticky; top:56px; height:calc(100vh - 56px); overflow-y:auto; }
.nav-g { font-size:10.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
  color:var(--dim); padding:14px 10px 5px; }
.nav-i { display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:7px;
  font-size:13.5px; font-weight:500; color:var(--txt); width:100%; text-align:left; transition:.13s; }
.nav-i:hover { background:var(--sunk); }
.nav-i.on { background:var(--blue-l); color:var(--blue-d); font-weight:700; }
.nav-i.on svg { color:var(--blue); }
.nav-i svg { color:var(--dim); flex-shrink:0; }
.nav-ct { margin-left:auto; font-size:11px; font-family:'JetBrains Mono'; color:var(--dim); font-weight:500; }
.nav-i.on .nav-ct { color:var(--blue); }

.page { min-width:0; }
.crumb { display:flex; align-items:center; gap:7px; font-size:12.5px; color:var(--mute); padding:16px 26px 0; }
.crumb b { color:var(--ink); font-weight:600; }
.head { padding:10px 26px 18px; display:flex; justify-content:space-between; align-items:flex-end; gap:18px; flex-wrap:wrap; }
.head h1 { font-size:23px; font-weight:700; font-family:'Poppins'; }
.head p { font-size:13.5px; color:var(--mute); margin-top:4px; max-width:640px; line-height:1.5; }
.head-a { display:flex; gap:8px; }
.content { padding:0 26px 60px; }

/* ---------- BUTTONS ---------- */
.btn { display:inline-flex; align-items:center; gap:7px; padding:8px 15px; border-radius:7px;
  font-size:13.5px; font-weight:600; transition:.14s; white-space:nowrap; }
.btn-p { background:var(--blue); color:#fff; box-shadow:var(--sh); }
.btn-p:hover { background:var(--blue-d); }
.btn-p:disabled { background:var(--bd-2); cursor:not-allowed; box-shadow:none; }
.btn-s { background:var(--surface); border:1px solid var(--bd); color:var(--txt); }
.btn-s:hover { background:var(--hover); border-color:var(--bd-2); }
.btn-g { background:none; color:var(--mute); }
.btn-g:hover { background:var(--sunk); color:var(--ink); }
.btn-xs { padding:5px 10px; font-size:12.5px; }

/* ---------- CARDS ---------- */
.card { background:var(--surface); border:1px solid var(--bd); border-radius:10px; box-shadow:var(--sh); }
.card-h { padding:15px 18px; border-bottom:1px solid var(--bd); display:flex;
  justify-content:space-between; align-items:center; gap:14px; flex-wrap:wrap; }
.card-h h3 { font-size:14.5px; font-weight:700; }
.card-h p { font-size:12.5px; color:var(--mute); margin-top:2px; }
.card-b { padding:18px; }
.g4 { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
.g3 { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
.g2 { display:grid; grid-template-columns:1.4fr 1fr; gap:14px; }
.stack { display:flex; flex-direction:column; gap:14px; }

.kpi { padding:16px 18px; }
.kpi .k { font-size:12.5px; color:var(--mute); font-weight:600; display:flex; align-items:center; gap:6px; }
.kpi .v { font-size:26px; font-weight:700; color:var(--ink); margin-top:9px; line-height:1; letter-spacing:-.02em; }
.kpi .d { font-size:12.5px; color:var(--dim); margin-top:7px; }
.up { color:var(--ok); font-weight:700; }
.dn { color:var(--bad); font-weight:700; }

/* ---------- TABLE ---------- */
.tools { padding:11px 14px; border-bottom:1px solid var(--bd); display:flex;
  align-items:center; gap:9px; flex-wrap:wrap; background:var(--surface); border-radius:10px 10px 0 0; }
.tsearch { display:flex; align-items:center; gap:8px; padding:6px 11px; background:var(--sunk);
  border:1px solid transparent; border-radius:7px; min-width:220px; }
.tsearch:focus-within { background:var(--surface); border-color:var(--blue); }
.tsearch input { border:none; background:none; outline:none; flex:1; min-width:0; color:var(--ink); }
.tchip { display:inline-flex; align-items:center; gap:6px; padding:5px 11px; border:1px solid var(--bd);
  border-radius:99px; font-size:12.5px; font-weight:600; color:var(--mute); transition:.13s; }
.tchip:hover { border-color:var(--bd-2); color:var(--txt); }
.tchip.on { background:var(--blue-l); border-color:#BFDBFE; color:var(--blue-d); }
.tbl-w { overflow-x:auto; }
.tbl { width:100%; border-collapse:collapse; }
.tbl th { text-align:left; font-size:11.5px; font-weight:700; color:var(--mute); padding:10px 14px;
  background:var(--sunk); border-bottom:1px solid var(--bd); white-space:nowrap; }
.tbl td { padding:12px 14px; border-bottom:1px solid var(--bd); font-size:13.5px; vertical-align:middle; }
.tbl tbody tr:last-child td { border-bottom:none; }
.tbl tbody tr:hover { background:var(--hover); }
.tbl input[type=checkbox] { width:15px; height:15px; accent-color:var(--blue); cursor:pointer; }
.rname { font-weight:600; color:var(--blue-d); cursor:pointer; }
.rname:hover { text-decoration:underline; }
.sub { font-size:12px; color:var(--dim); margin-top:2px; }

.st { display:inline-flex; align-items:center; gap:6px; font-size:12.5px; font-weight:600; white-space:nowrap; }
.dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
.st.ok { color:var(--ok); } .st.ok .dot { background:var(--ok); }
.st.wn { color:var(--warn); } .st.wn .dot { background:var(--warn); }
.st.bd { color:var(--bad); } .st.bd .dot { background:var(--bad); }
.st.of { color:var(--dim); } .st.of .dot { background:var(--dim); }

.badge { display:inline-flex; align-items:center; padding:2px 8px; border-radius:5px;
  font-size:11px; font-weight:700; letter-spacing:.03em; }
.badge.iaas { background:var(--cyan-l); color:var(--cyan); }
.badge.paas { background:var(--blue-l); color:var(--blue-d); }
.badge.saas { background:var(--violet-l); color:var(--violet); }
.badge.n { background:var(--sunk); color:var(--mute); }

.meter { width:64px; height:6px; border-radius:99px; background:var(--sunk); overflow:hidden; display:inline-block; vertical-align:middle; }
.meter i { display:block; height:100%; border-radius:99px; background:var(--blue); }
.meter i.hot { background:var(--warn); }

/* ---------- DEPLOY ---------- */
.dep { display:grid; grid-template-columns:1fr 316px; gap:16px; align-items:start; }
.gpu-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(268px,1fr)); gap:12px; }
.gpu { background:var(--surface); border:1.5px solid var(--bd); border-radius:10px; padding:15px;
  cursor:pointer; transition:.15s; text-align:left; width:100%; position:relative; }
.gpu:hover { border-color:var(--bd-2); box-shadow:var(--sh-2); }
.gpu.on { border-color:var(--blue); background:var(--blue-l); }
.gpu.off { opacity:.55; cursor:not-allowed; }
.gpu.off:hover { border-color:var(--bd); box-shadow:none; }
.gpu-t { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:12px; }
.gpu-n { font-size:14.5px; font-weight:700; color:var(--ink); }
.gpu-v { font-size:12px; color:var(--mute); margin-top:2px; }
.gpu-p { font-size:16px; font-weight:700; color:var(--ink); font-family:'JetBrains Mono'; text-align:right; white-space:nowrap; }
.gpu-p small { display:block; font-size:10.5px; color:var(--dim); font-family:'Manrope'; font-weight:500; }
.gpu-s { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; padding-top:11px; border-top:1px solid var(--bd); }
.gpu.on .gpu-s { border-color:#BFDBFE; }
.spec { text-align:center; }
.spec b { display:block; font-size:12.5px; color:var(--ink); font-family:'JetBrains Mono'; font-weight:600; }
.spec span { font-size:10.5px; color:var(--dim); }
.avail { position:absolute; top:15px; right:15px; }

.cfg { position:sticky; top:72px; }
.cfg-row { padding:13px 0; border-bottom:1px solid var(--bd); }
.cfg-row:last-of-type { border-bottom:none; }
.cfg-l { font-size:12.5px; font-weight:600; color:var(--txt); display:flex;
  justify-content:space-between; align-items:center; margin-bottom:8px; }
.cfg-l span { color:var(--dim); font-weight:500; font-size:11.5px; }
.sel { width:100%; padding:8px 11px; border:1px solid var(--bd); border-radius:7px;
  background:var(--surface); color:var(--ink); font-weight:500; cursor:pointer; }
.sel:focus { outline:none; border-color:var(--blue); }
.stepper { display:flex; align-items:center; border:1px solid var(--bd); border-radius:7px; overflow:hidden; }
.stepper button { width:34px; height:34px; font-size:16px; color:var(--mute); background:var(--surface); }
.stepper button:hover:not(:disabled) { background:var(--sunk); color:var(--ink); }
.stepper button:disabled { color:var(--bd-2); cursor:not-allowed; }
.stepper b { flex:1; text-align:center; font-family:'JetBrains Mono'; font-size:14px; }
.rng { width:100%; accent-color:var(--blue); cursor:pointer; }
.seg { display:flex; background:var(--sunk); border-radius:7px; padding:3px; gap:3px; }
.seg button { flex:1; padding:7px; border-radius:5px; font-size:12.5px; font-weight:600; color:var(--mute); transition:.13s; }
.seg button.on { background:var(--surface); color:var(--ink); box-shadow:var(--sh); }
.total { background:var(--sunk); border-radius:8px; padding:14px; margin-top:14px; }
.total-r { display:flex; justify-content:space-between; font-size:12.5px; padding:4px 0; color:var(--mute); }
.total-r b { color:var(--txt); font-family:'JetBrains Mono'; font-weight:600; }
.total-g { display:flex; justify-content:space-between; align-items:baseline;
  padding-top:11px; margin-top:8px; border-top:1px solid var(--bd); }
.total-g span { font-size:13px; font-weight:700; color:var(--ink); }
.total-g b { font-size:22px; font-weight:700; color:var(--ink); font-family:'JetBrains Mono'; letter-spacing:-.02em; }
.total-g b small { font-size:11.5px; color:var(--dim); font-family:'Manrope'; font-weight:500; }
.est { font-size:12px; color:var(--mute); text-align:center; margin-top:9px; }

/* ---------- MISC ---------- */
.rows > div { display:flex; justify-content:space-between; align-items:center; gap:12px;
  padding:10px 0; border-bottom:1px solid var(--bd); font-size:13.5px; }
.rows > div:last-child { border-bottom:none; }
.rows span:first-child { color:var(--mute); }
.rows b { color:var(--ink); font-weight:600; }
.hint { font-size:12.5px; color:var(--mute); line-height:1.6; padding:12px 18px;
  background:var(--sunk); border-top:1px solid var(--bd); border-radius:0 0 10px 10px; }
.hint b { color:var(--txt); font-weight:700; }
.alert { display:flex; gap:11px; padding:13px 15px; border-radius:9px; font-size:13px; line-height:1.55; align-items:flex-start; }
.alert.wn { background:var(--warn-l); color:#92400E; border:1px solid #FDE68A; }
.alert.bd { background:var(--bad-l); color:#991B1B; border:1px solid #FECACA; }
.alert b { font-weight:700; }
.tabs { display:flex; gap:2px; border-bottom:1px solid var(--bd); margin-bottom:16px; overflow-x:auto; }
.tab { padding:10px 15px; font-size:13.5px; font-weight:600; color:var(--mute);
  border-bottom:2px solid transparent; margin-bottom:-1px; white-space:nowrap; transition:.13s; }
.tab:hover { color:var(--ink); }
.tab.on { color:var(--blue-d); border-bottom-color:var(--blue); }
.spark { display:flex; align-items:flex-end; gap:2px; height:46px; }
.spark i { flex:1; background:#BFDBFE; border-radius:2px 2px 0 0; min-width:0; }
.spark i.now { background:var(--blue); }
.split { display:flex; height:9px; border-radius:99px; overflow:hidden; margin-bottom:14px; }
.empty { text-align:center; padding:44px 20px; color:var(--mute); }
.empty h4 { font-size:15px; margin-bottom:6px; }
.empty p { font-size:13px; margin-bottom:16px; }

@media (max-width:1180px){ .dep{grid-template-columns:1fr} .cfg{position:static} .g4{grid-template-columns:repeat(2,1fr)} .g2,.g3{grid-template-columns:1fr} }
@media (max-width:900px){
  .wrap{grid-template-columns:1fr}
  .nav{position:static;height:auto;display:flex;overflow-x:auto;padding:8px;border-right:none;border-bottom:1px solid var(--bd)}
  .nav-g{display:none} .nav-i{white-space:nowrap;width:auto}
  .search{display:none} .crumb,.head,.content{padding-left:16px;padding-right:16px}
}
@media (max-width:600px){ .g4{grid-template-columns:1fr} .ctx-btn small{display:none} }
@media (prefers-reduced-motion:reduce){ .cq *{transition:none!important} }
`;

/* ---------- ICONS ---------- */
const I = ({ d, s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const P = {
  home: "M3 10.5 12 3l9 7.5V21H3zM9 21v-7h6v7",
  rocket: "M4.5 16.5 3 21l4.5-1.5M9 15l-3-3 2-5 6-4 6 6-4 6-5 2zM15 9h.01",
  server: "M3 4h18v7H3zM3 13h18v7H3zM7 7.5h.01M7 16.5h.01",
  disk: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  net: "M12 2v6m0 8v6M2 12h6m8 0h6M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  ship: "m12 2 10 5-10 5L2 7l10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  db: "M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  fn: "m8 3-2 4 2 4-2 4 2 4M16 3l2 4-2 4 2 4-2 4M12 7v10",
  app: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  eye: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  card: "M2 7h20v12H2zM2 11h20",
  key: "M15 7a4 4 0 1 1-3.9 5H8v3H5v3H2v-3l6.1-6.1A4 4 0 0 1 15 7z",
  srch: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  down: "m6 9 6 6 6-6",
  bell: "M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8M13.7 21a2 2 0 0 1-3.4 0",
  help: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01",
  ref: "M21 12a9 9 0 1 1-2.6-6.4M21 3v6h-6",
  filt: "M22 3H2l8 9.5V19l4 2v-8.5z",
  warn: "M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  plus: "M12 5v14M5 12h14",
  dots: "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
};

/* ============================================================
   DATA
   ============================================================ */
const GPUS = [
  { id: "h100-sxm", name: "H100 SXM", vram: "80 GB", mem: "251 GB", vcpu: 26, price: 2.99, avail: "high", note: "HBM3 · NVLink" },
  { id: "h100-pcie", name: "H100 PCIe", vram: "80 GB", mem: "188 GB", vcpu: 20, price: 2.39, avail: "high", note: "HBM2e" },
  { id: "a100-sxm", name: "A100 SXM", vram: "80 GB", mem: "125 GB", vcpu: 16, price: 1.89, avail: "med", note: "HBM2e · NVLink" },
  { id: "a100-pcie", name: "A100 PCIe", vram: "40 GB", mem: "117 GB", vcpu: 12, price: 1.49, avail: "high", note: "HBM2" },
  { id: "l40s", name: "L40S", vram: "48 GB", mem: "62 GB", vcpu: 12, price: 0.89, avail: "high", note: "Ada · inference" },
  { id: "a6000", name: "RTX A6000", vram: "48 GB", mem: "50 GB", vcpu: 9, price: 0.62, avail: "med", note: "Ampere" },
  { id: "4090", name: "RTX 4090", vram: "24 GB", mem: "41 GB", vcpu: 8, price: 0.44, avail: "low", note: "Ada" },
  { id: "l4", name: "L4", vram: "24 GB", mem: "48 GB", vcpu: 12, price: 0.31, avail: "none", note: "Ada · low power" },
];
const AVAIL = {
  high: { t: "High availability", c: "ok" },
  med: { t: "Limited stock", c: "wn" },
  low: { t: "Low stock", c: "wn" },
  none: { t: "Unavailable", c: "of" },
};
const REGIONS = [
  { id: "pune-1", name: "Pune (India West)", mult: 1 },
  { id: "mumbai-2", name: "Mumbai (India West 2)", mult: 1.04 },
  { id: "sg-1", name: "Singapore", mult: 1.12 },
  { id: "uae-1", name: "Dubai (UAE North)", mult: 1.09 },
];
const TEMPLATES = [
  "PyTorch 2.4 · CUDA 12.4",
  "TensorFlow 2.17 · CUDA 12.4",
  "vLLM Inference Server",
  "Jupyter Lab · Data Science",
  "CUDA 12.4 Base (minimal)",
  "Custom container image",
];

const INSTANCES = [
  { id: "ci-prod-api-01", tmpl: "c6.2xlarge", region: "Pune-1", layer: "iaas", st: "ok", cpu: 62, mem: 71, up: "34d 02h", rate: 0.34 },
  { id: "ci-prod-api-02", tmpl: "c6.2xlarge", region: "Pune-1", layer: "iaas", st: "ok", cpu: 58, mem: 68, up: "34d 02h", rate: 0.34 },
  { id: "gpu-train-01", tmpl: "H100 SXM x8", region: "Mumbai-2", layer: "iaas", st: "ok", cpu: 91, mem: 84, up: "6d 11h", rate: 23.92 },
  { id: "gpu-infer-03", tmpl: "L40S x2", region: "Pune-1", layer: "iaas", st: "ok", cpu: 44, mem: 51, up: "19d 03h", rate: 1.78 },
  { id: "ci-worker-04", tmpl: "m6.xlarge", region: "Pune-1", layer: "iaas", st: "wn", cpu: 94, mem: 89, up: "12d 07h", rate: 0.17 },
  { id: "ci-staging-01", tmpl: "m6.large", region: "Pune-1", layer: "iaas", st: "of", cpu: 0, mem: 0, up: "—", rate: 0 },
];
const CLUSTERS = [
  { id: "k8s-prod", ver: "1.31.4", nodes: 6, pods: 84, region: "Pune-1", st: "ok", cpu: 64 },
  { id: "k8s-staging", ver: "1.31.4", nodes: 2, pods: 19, region: "Pune-1", st: "ok", cpu: 22 },
  { id: "k8s-ml", ver: "1.30.8", nodes: 3, pods: 11, region: "Mumbai-2", st: "wn", cpu: 88 },
];
const DBS = [
  { id: "pg-orders-prod", eng: "PostgreSQL 16.3", plan: "HA · 4 vCPU / 16 GB", size: "412 GB", st: "ok", conn: "184 / 400" },
  { id: "pg-analytics", eng: "PostgreSQL 16.3", plan: "Single · 8 vCPU / 32 GB", size: "1.8 TB", st: "ok", conn: "37 / 200" },
  { id: "redis-session", eng: "Redis 7.2", plan: "Cluster · 3 shards", size: "24 GB", st: "ok", conn: "912 / 5000" },
  { id: "pg-legacy-billing", eng: "PostgreSQL 14.11", plan: "Single · 2 vCPU / 8 GB", size: "88 GB", st: "wn", conn: "12 / 100" },
];
const DEPLOYS = [
  { app: "orders-api", env: "production", ver: "v4.12.0", st: "ok", when: "2h ago", by: "pipeline", reps: "8/8" },
  { app: "web-storefront", env: "production", ver: "v2.31.4", st: "ok", when: "6h ago", by: "pipeline", reps: "6/6" },
  { app: "recs-engine", env: "production", ver: "v1.9.2", st: "wn", when: "18m ago", by: "d.mehta", reps: "3/4" },
  { app: "orders-api", env: "staging", ver: "v4.13.0-rc1", st: "ok", when: "41m ago", by: "pipeline", reps: "2/2" },
  { app: "batch-etl", env: "production", ver: "v0.8.7", st: "bd", when: "1d ago", by: "pipeline", reps: "0/2" },
];
const SUBS = [
  { name: "Identity & Access", seats: "42 / 50", plan: "Business", renew: "1 Sep 2026", cost: 168, st: "ok" },
  { name: "Observability Suite", seats: "Usage-based", plan: "Pro", renew: "1 Sep 2026", cost: 892, st: "ok" },
  { name: "Cost Intelligence", seats: "Unlimited", plan: "Standard", renew: "1 Sep 2026", cost: 149, st: "ok" },
  { name: "API Gateway Console", seats: "Usage-based", plan: "Pro", renew: "1 Sep 2026", cost: 314, st: "ok" },
  { name: "Backup & Recovery", seats: "Unlimited", plan: "Standard", renew: "14 Aug 2026", cost: 227, st: "wn" },
];
const SPEND = { iaas: 11840, paas: 6215, saas: 1750 };
const SPARK = [42, 48, 45, 52, 61, 58, 66, 71, 68, 74, 82, 79, 88, 91, 86, 94];

const St = ({ s, map }) => <span className={`st ${s}`}><span className="dot" />{map[s]}</span>;

/* ============================================================
   DEPLOY — the practical core
   ============================================================ */
function Deploy() {
  const [gpu, setGpu] = useState("a100-pcie");
  const [count, setCount] = useState(1);
  const [region, setRegion] = useState("pune-1");
  const [tmpl, setTmpl] = useState(TEMPLATES[0]);
  const [disk, setDisk] = useState(100);
  const [term, setTerm] = useState("ondemand");
  const [done, setDone] = useState(false);

  const g = GPUS.find((x) => x.id === gpu);
  const r = REGIONS.find((x) => x.id === region);
  const termMult = term === "spot" ? 0.55 : term === "reserved" ? 0.78 : 1;

  const gpuCost = g.price * count * r.mult * termMult;
  const diskCost = (disk * 0.00012);
  const hourly = gpuCost + diskCost;

  return (
    <div className="dep">
      <div className="stack">
        {done && (
          <div className="alert" style={{ background: "var(--ok-l)", color: "#065F46", border: "1px solid #A7F3D0" }}>
            <I d={P.rocket} s={18} />
            <div>
              <b>Deployment started.</b> {count} × {g.name} in {r.name} is provisioning.
              It will appear in Instances within about 40 seconds.
            </div>
          </div>
        )}

        <div>
          <div className="tabs">
            <button className="tab on">GPU</button>
            <button className="tab">CPU only</button>
            <button className="tab">Bare metal</button>
          </div>

          <div className="gpu-grid">
            {GPUS.map((x) => {
              const off = x.avail === "none";
              return (
                <button key={x.id} className={`gpu ${gpu === x.id ? "on" : ""} ${off ? "off" : ""}`}
                  onClick={() => !off && (setGpu(x.id), setDone(false))} disabled={off}
                  aria-pressed={gpu === x.id}>
                  <div className="avail"><St s={AVAIL[x.avail].c} map={{ ok: "", wn: "", of: "" }} /></div>
                  <div className="gpu-t">
                    <div>
                      <div className="gpu-n">{x.name}</div>
                      <div className="gpu-v">{x.note}</div>
                    </div>
                    <div className="gpu-p">${x.price.toFixed(2)}<small>/hr</small></div>
                  </div>
                  <div className="gpu-s">
                    <div className="spec"><b>{x.vram}</b><span>VRAM</span></div>
                    <div className="spec"><b>{x.vcpu}</b><span>vCPU</span></div>
                    <div className="spec"><b>{x.mem}</b><span>RAM</span></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* configurator */}
      <div className="card cfg">
        <div className="card-h"><div><h3>Configure</h3><p>{g.name} · {r.name}</p></div></div>
        <div className="card-b" style={{ paddingTop: 4 }}>
          <div className="cfg-row">
            <div className="cfg-l">GPU count <span>max 8</span></div>
            <div className="stepper">
              <button onClick={() => setCount(Math.max(1, count - 1))} disabled={count <= 1} aria-label="Fewer GPUs">−</button>
              <b>{count}</b>
              <button onClick={() => setCount(Math.min(8, count + 1))} disabled={count >= 8} aria-label="More GPUs">+</button>
            </div>
          </div>

          <div className="cfg-row">
            <div className="cfg-l">Region</div>
            <select className="sel" value={region} onChange={(e) => setRegion(e.target.value)}>
              {REGIONS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
          </div>

          <div className="cfg-row">
            <div className="cfg-l">Template</div>
            <select className="sel" value={tmpl} onChange={(e) => setTmpl(e.target.value)}>
              {TEMPLATES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="cfg-row">
            <div className="cfg-l">Persistent disk <span className="mono">{disk} GB</span></div>
            <input className="rng" type="range" min="20" max="2000" step="20"
              value={disk} onChange={(e) => setDisk(+e.target.value)} aria-label="Disk size in GB" />
          </div>

          <div className="cfg-row">
            <div className="cfg-l">Pricing</div>
            <div className="seg">
              {[["ondemand", "On-demand"], ["reserved", "Reserved"], ["spot", "Spot"]].map(([k, l]) => (
                <button key={k} className={term === k ? "on" : ""} onClick={() => setTerm(k)}>{l}</button>
              ))}
            </div>
          </div>

          <div className="total">
            <div className="total-r"><span>{count} × {g.name}</span><b>${gpuCost.toFixed(3)}</b></div>
            <div className="total-r"><span>{disk} GB disk</span><b>${diskCost.toFixed(3)}</b></div>
            {term !== "ondemand" && (
              <div className="total-r" style={{ color: "var(--ok)" }}>
                <span>{term === "spot" ? "Spot discount" : "Reserved discount"}</span>
                <b style={{ color: "var(--ok)" }}>−{term === "spot" ? "45" : "22"}%</b>
              </div>
            )}
            <div className="total-g">
              <span>Total</span>
              <b>${hourly.toFixed(2)}<small>/hr</small></b>
            </div>
          </div>
          <p className="est">≈ ${(hourly * 730).toLocaleString(undefined, { maximumFractionDigits: 0 })} per month if left running</p>

          <button className="btn btn-p" style={{ width: "100%", justifyContent: "center", marginTop: 14 }}
            onClick={() => setDone(true)}>
            <I d={P.rocket} s={15} /> Deploy
          </button>

          {term === "spot" && (
            <p className="est" style={{ color: "var(--warn)", marginTop: 10 }}>
              Spot instances can be reclaimed with 30 seconds notice. Checkpoint your work.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   VIEWS
   ============================================================ */
function Home({ go }) {
  const total = SPEND.iaas + SPEND.paas + SPEND.saas;
  const pct = (v) => ((v / total) * 100).toFixed(1);
  return (
    <div className="stack">
      <div className="alert bd">
        <I d={P.warn} s={18} />
        <div><b>batch-etl has no healthy replicas.</b> The production deployment has been failing
          for 22 hours. Check the pipeline logs before the next scheduled window.</div>
      </div>

      <div className="g4">
        {[
          ["Monthly run rate", `$${total.toLocaleString()}`, <><span className="up">↑ 6.2%</span> vs last month</>],
          ["Running instances", "5", "1 stopped · 142 vCPU allocated"],
          ["Managed services", "7", "3 clusters · 4 data stores"],
          ["Open alerts", "3", "1 critical · 2 warning"],
        ].map(([k, v, d], i) => (
          <div className="card kpi" key={i}>
            <div className="k">{k}</div>
            <div className="v">{v}</div>
            <div className="d">{d}</div>
          </div>
        ))}
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-h">
            <div><h3>Recent deployments</h3><p>Last 24 hours, all environments</p></div>
            <button className="btn btn-s btn-xs" onClick={() => go("deployments")}>View all</button>
          </div>
          <div className="tbl-w">
            <table className="tbl">
              <thead><tr><th>Application</th><th>Environment</th><th>Version</th><th>Replicas</th><th>Status</th><th>Deployed</th></tr></thead>
              <tbody>
                {DEPLOYS.map((d, i) => (
                  <tr key={i}>
                    <td><span className="rname">{d.app}</span></td>
                    <td><span className="badge n">{d.env}</span></td>
                    <td className="mono" style={{ fontSize: 12.5 }}>{d.ver}</td>
                    <td className="mono" style={{ fontSize: 12.5, color: d.reps[0] === "0" ? "var(--bad)" : undefined }}>{d.reps}</td>
                    <td><St s={d.st} map={{ ok: "Healthy", wn: "Degraded", bd: "Failed" }} /></td>
                    <td style={{ color: "var(--dim)", fontSize: 12.5 }}>{d.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-h"><div><h3>Spend</h3><p>Month to date</p></div></div>
          <div className="card-b">
            <div style={{ fontSize: 30, fontWeight: 700, color: "var(--ink)", letterSpacing: "-.02em" }}>
              ${total.toLocaleString()}
            </div>
            <div className="spark" style={{ margin: "14px 0 18px" }}>
              {SPARK.map((v, i) => <i key={i} className={i > 11 ? "now" : ""} style={{ height: `${v}%` }} />)}
            </div>
            <div className="split">
              <div style={{ width: `${pct(SPEND.iaas)}%`, background: "var(--cyan)" }} />
              <div style={{ width: `${pct(SPEND.paas)}%`, background: "var(--blue)" }} />
              <div style={{ width: `${pct(SPEND.saas)}%`, background: "var(--violet)" }} />
            </div>
            <div className="rows">
              <div><span><span className="badge iaas">IaaS</span> Infrastructure</span><b className="mono">${SPEND.iaas.toLocaleString()}</b></div>
              <div><span><span className="badge paas">PaaS</span> Platform</span><b className="mono">${SPEND.paas.toLocaleString()}</b></div>
              <div><span><span className="badge saas">SaaS</span> Applications</span><b className="mono">${SPEND.saas.toLocaleString()}</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Instances() {
  const [q, setQ] = useState("");
  const [f, setF] = useState("all");
  const [sel, setSel] = useState([]);

  const rows = useMemo(() => INSTANCES.filter((n) => {
    const mq = !q || n.id.toLowerCase().includes(q.toLowerCase()) || n.tmpl.toLowerCase().includes(q.toLowerCase());
    const mf = f === "all" || (f === "running" && n.st !== "of") || (f === "stopped" && n.st === "of") || (f === "gpu" && n.id.startsWith("gpu"));
    return mq && mf;
  }), [q, f]);

  const allSel = rows.length > 0 && sel.length === rows.length;

  return (
    <div className="card">
      <div className="tools">
        <div className="tsearch">
          <I d={P.srch} s={15} />
          <input placeholder="Filter instances" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {[["all", "All"], ["running", "Running"], ["stopped", "Stopped"], ["gpu", "GPU"]].map(([k, l]) => (
          <button key={k} className={`tchip ${f === k ? "on" : ""}`} onClick={() => setF(k)}>{l}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          {sel.length > 0 && (
            <>
              <span style={{ fontSize: 12.5, color: "var(--mute)", fontWeight: 600 }}>{sel.length} selected</span>
              <button className="btn btn-s btn-xs">Stop</button>
              <button className="btn btn-s btn-xs" style={{ color: "var(--bad)" }}>Terminate</button>
            </>
          )}
          <button className="icb" title="Refresh"><I d={P.ref} s={16} /></button>
        </div>
      </div>

      <div className="tbl-w">
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <input type="checkbox" checked={allSel}
                  onChange={() => setSel(allSel ? [] : rows.map((r) => r.id))} aria-label="Select all" />
              </th>
              <th>Name</th><th>Type</th><th>Region</th><th>Status</th>
              <th>CPU</th><th>Memory</th><th>Uptime</th><th>Rate</th><th style={{ width: 40 }} />
            </tr>
          </thead>
          <tbody>
            {rows.map((n) => (
              <tr key={n.id}>
                <td>
                  <input type="checkbox" checked={sel.includes(n.id)} aria-label={`Select ${n.id}`}
                    onChange={() => setSel(sel.includes(n.id) ? sel.filter((x) => x !== n.id) : [...sel, n.id])} />
                </td>
                <td>
                  <div className="rname mono" style={{ fontSize: 13 }}>{n.id}</div>
                  <div className="sub">{n.id.startsWith("gpu") ? "GPU instance" : "General purpose"}</div>
                </td>
                <td style={{ fontWeight: 600, color: "var(--ink)" }}>{n.tmpl}</td>
                <td style={{ color: "var(--mute)" }}>{n.region}</td>
                <td><St s={n.st} map={{ ok: "Running", wn: "Under pressure", of: "Stopped" }} /></td>
                <td>{n.st !== "of" ? <><span className="meter"><i className={n.cpu > 90 ? "hot" : ""} style={{ width: `${n.cpu}%` }} /></span> <span className="mono" style={{ fontSize: 12, marginLeft: 6 }}>{n.cpu}%</span></> : <span style={{ color: "var(--dim)" }}>—</span>}</td>
                <td>{n.st !== "of" ? <><span className="meter"><i className={n.mem > 85 ? "hot" : ""} style={{ width: `${n.mem}%` }} /></span> <span className="mono" style={{ fontSize: 12, marginLeft: 6 }}>{n.mem}%</span></> : <span style={{ color: "var(--dim)" }}>—</span>}</td>
                <td className="mono" style={{ fontSize: 12.5, color: "var(--mute)" }}>{n.up}</td>
                <td className="mono" style={{ fontWeight: 600 }}>{n.rate ? `$${n.rate.toFixed(2)}` : "—"}</td>
                <td><button className="icb" style={{ width: 28, height: 28 }} aria-label="Actions"><I d={P.dots} s={15} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <div className="empty">
          <h4>No instances match that filter</h4>
          <p>Clear the search, or deploy a new instance to get started.</p>
          <button className="btn btn-s" onClick={() => { setQ(""); setF("all"); }}>Clear filters</button>
        </div>
      )}

      {rows.length > 0 && (
        <div className="hint">
          <b>ci-worker-04</b> is sustaining 94% CPU and 89% memory. Resize it to m6.2xlarge or add a
          second worker before the queue backs up.
        </div>
      )}
    </div>
  );
}

function Storage() {
  return (
    <div className="stack">
      <div className="g4">
        {[["Block attached", "8.4 TB", "34 volumes"], ["Block unattached", "620 GB", "4 volumes, still billing"],
          ["Object storage", "41.2 TB", "11 buckets"], ["Snapshots", "146", "Retained 30 days"]].map(([k, v, d], i) => (
          <div className="card kpi" key={i}><div className="k">{k}</div><div className="v">{v}</div><div className="d">{d}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-h">
          <div><h3>Volumes</h3><p>Block storage attached to your instances</p></div>
          <button className="btn btn-p btn-xs"><I d={P.plus} s={14} /> Create volume</button>
        </div>
        <div className="tbl-w">
          <table className="tbl">
            <thead><tr><th>Volume</th><th>Type</th><th>Size</th><th>Attached to</th><th>Region</th><th>Status</th><th>Monthly</th></tr></thead>
            <tbody>
              {[
                ["vol-prod-data-01", "NVMe SSD", "2 TB", "ci-prod-api-01", "Pune-1", "ok"],
                ["vol-prod-data-02", "NVMe SSD", "2 TB", "ci-prod-api-02", "Pune-1", "ok"],
                ["vol-train-scratch", "NVMe SSD", "4 TB", "gpu-train-01", "Mumbai-2", "ok"],
                ["vol-orphan-legacy", "SSD", "620 GB", "—", "Pune-1", "wn"],
              ].map(([id, t, s, a, r, st]) => (
                <tr key={id}>
                  <td><span className="rname mono" style={{ fontSize: 13 }}>{id}</span></td>
                  <td>{t}</td><td className="mono">{s}</td>
                  <td className="mono" style={{ fontSize: 12.5, color: a === "—" ? "var(--dim)" : "var(--txt)" }}>{a}</td>
                  <td style={{ color: "var(--mute)" }}>{r}</td>
                  <td><St s={st} map={{ ok: "In use", wn: "Unattached" }} /></td>
                  <td className="mono">${(parseFloat(s) * (s.includes("TB") ? 1024 : 1) * 0.025).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="hint"><b>vol-orphan-legacy</b> is not attached to anything and still bills at the full rate. Snapshot and delete it to save $15.50 a month.</div>
      </div>
    </div>
  );
}

function Kubernetes() {
  return (
    <div className="card">
      <div className="card-h">
        <div><h3>Kubernetes clusters</h3><p>Managed control plane with autoscaling node pools</p></div>
        <button className="btn btn-p btn-xs"><I d={P.plus} s={14} /> Create cluster</button>
      </div>
      <div className="tbl-w">
        <table className="tbl">
          <thead><tr><th>Cluster</th><th>Version</th><th>Region</th><th>Nodes</th><th>Pods</th><th>CPU</th><th>Status</th><th style={{ width: 90 }} /></tr></thead>
          <tbody>
            {CLUSTERS.map((c) => (
              <tr key={c.id}>
                <td><span className="rname mono" style={{ fontSize: 13 }}>{c.id}</span></td>
                <td className="mono" style={{ fontSize: 12.5, color: "var(--mute)" }}>{c.ver}</td>
                <td style={{ color: "var(--mute)" }}>{c.region}</td>
                <td className="mono">{c.nodes}</td><td className="mono">{c.pods}</td>
                <td><span className="meter"><i className={c.cpu > 85 ? "hot" : ""} style={{ width: `${c.cpu}%` }} /></span> <span className="mono" style={{ fontSize: 12, marginLeft: 6 }}>{c.cpu}%</span></td>
                <td><St s={c.st} map={{ ok: "Healthy", wn: "Under pressure" }} /></td>
                <td><button className="btn btn-s btn-xs">Connect</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="hint"><b>k8s-ml</b> is two minor versions behind and running hot. The control plane upgrade is zero-downtime; node pools roll one at a time.</div>
    </div>
  );
}

function Databases() {
  return (
    <div className="card">
      <div className="card-h">
        <div><h3>Data stores</h3><p>Managed PostgreSQL and Redis with automated backups</p></div>
        <button className="btn btn-p btn-xs"><I d={P.plus} s={14} /> Create data store</button>
      </div>
      <div className="tbl-w">
        <table className="tbl">
          <thead><tr><th>Name</th><th>Engine</th><th>Plan</th><th>Size</th><th>Connections</th><th>Status</th><th style={{ width: 90 }} /></tr></thead>
          <tbody>
            {DBS.map((d) => (
              <tr key={d.id}>
                <td><span className="rname mono" style={{ fontSize: 13 }}>{d.id}</span></td>
                <td style={{ fontWeight: 600, color: "var(--ink)" }}>{d.eng}</td>
                <td style={{ color: "var(--mute)", fontSize: 12.5 }}>{d.plan}</td>
                <td className="mono">{d.size}</td>
                <td className="mono" style={{ fontSize: 12.5 }}>{d.conn}</td>
                <td><St s={d.st} map={{ ok: "Available", wn: "Needs attention" }} /></td>
                <td><button className="btn btn-s btn-xs">Manage</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="hint"><b>pg-legacy-billing</b> runs PostgreSQL 14, which leaves standard support in November 2026. Plan a major-version upgrade.</div>
    </div>
  );
}

function Deployments() {
  return (
    <div className="card">
      <div className="card-h">
        <div><h3>Deployments</h3><p>Application rollouts across every environment</p></div>
        <button className="btn btn-p btn-xs"><I d={P.plus} s={14} /> New deployment</button>
      </div>
      <div className="tbl-w">
        <table className="tbl">
          <thead><tr><th>Application</th><th>Environment</th><th>Version</th><th>Replicas</th><th>Status</th><th>Deployed</th><th>By</th><th style={{ width: 100 }} /></tr></thead>
          <tbody>
            {DEPLOYS.map((d, i) => (
              <tr key={i}>
                <td><span className="rname">{d.app}</span></td>
                <td><span className="badge n">{d.env}</span></td>
                <td className="mono" style={{ fontSize: 12.5 }}>{d.ver}</td>
                <td className="mono" style={{ fontSize: 12.5, color: d.reps[0] === "0" ? "var(--bad)" : undefined }}>{d.reps}</td>
                <td><St s={d.st} map={{ ok: "Healthy", wn: "Degraded", bd: "Failed" }} /></td>
                <td style={{ color: "var(--dim)", fontSize: 12.5 }}>{d.when}</td>
                <td style={{ color: "var(--mute)", fontSize: 12.5 }}>{d.by}</td>
                <td><button className="btn btn-s btn-xs">{d.st === "bd" ? "View logs" : "Roll back"}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="hint">Rolling back restores the previous image and configuration. It does not revert database migrations — check the migration history first.</div>
    </div>
  );
}

function Apps() {
  const total = SUBS.reduce((a, b) => a + b.cost, 0);
  return (
    <div className="stack">
      <div className="g3">
        {[["Active subscriptions", SUBS.length, "1 more available"], ["Monthly cost", `$${total.toLocaleString()}`, "Billed on the 1st"],
          ["Identity seats", "42 / 50", "8 remaining"]].map(([k, v, d], i) => (
          <div className="card kpi" key={i}><div className="k">{k}</div><div className="v">{v}</div><div className="d">{d}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-h">
          <div><h3>Subscriptions</h3><p>Managed software your team signs into — nothing to deploy or patch</p></div>
          <button className="btn btn-s btn-xs">Browse catalog</button>
        </div>
        <div className="tbl-w">
          <table className="tbl">
            <thead><tr><th>Application</th><th>Plan</th><th>Seats</th><th>Renews</th><th>Monthly</th><th>Status</th><th style={{ width: 100 }} /></tr></thead>
            <tbody>
              {SUBS.map((s) => (
                <tr key={s.name}>
                  <td><span className="rname">{s.name}</span> <span className="badge saas" style={{ marginLeft: 6 }}>SaaS</span></td>
                  <td style={{ color: "var(--mute)" }}>{s.plan}</td>
                  <td className="mono" style={{ fontSize: 12.5 }}>{s.seats}</td>
                  <td style={{ color: "var(--mute)", fontSize: 12.5 }}>{s.renew}</td>
                  <td className="mono" style={{ fontWeight: 600 }}>${s.cost}</td>
                  <td><St s={s.st} map={{ ok: "Active", wn: "Renews soon" }} /></td>
                  <td><button className="btn btn-s btn-xs">Configure</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="hint"><b>Backup & Recovery</b> renews in a week on Standard. Your restore-drill history suggests Business tier would meet your current RPO target.</div>
      </div>
    </div>
  );
}

function Monitoring() {
  return (
    <div className="stack">
      <div className="g4">
        {[["Availability", "99.97%", "SLO 99.95% · 30-day"], ["p99 latency", "84 ms", "Public API endpoints"],
          ["Error rate", "0.42%", <><span className="dn">↑</span> from 0.18% yesterday</>], ["Open alerts", "3", "1 critical · 2 warning"]].map(([k, v, d], i) => (
          <div className="card kpi" key={i}><div className="k">{k}</div><div className="v">{v}</div><div className="d">{d}</div></div>
        ))}
      </div>
      <div className="g2">
        <div className="card">
          <div className="card-h"><div><h3>Active alerts</h3><p>Ordered by severity</p></div><button className="btn btn-s btn-xs">Alert rules</button></div>
          <div className="tbl-w">
            <table className="tbl">
              <thead><tr><th>Alert</th><th>Resource</th><th>Severity</th><th>Age</th><th style={{ width: 90 }} /></tr></thead>
              <tbody>
                {[["Deployment has no healthy replicas", "batch-etl", "bd", "Critical", "22h"],
                  ["Node memory above 85%", "ci-worker-04", "wn", "Warning", "3h"],
                  ["Dead-letter queue growing", "orders-events-dlq", "wn", "Warning", "1h"]].map(([a, r, s, l, g]) => (
                  <tr key={a}>
                    <td style={{ fontWeight: 600, color: "var(--ink)" }}>{a}</td>
                    <td className="mono" style={{ fontSize: 12.5 }}>{r}</td>
                    <td><St s={s} map={{ bd: l, wn: l }} /></td>
                    <td style={{ color: "var(--dim)", fontSize: 12.5 }}>{g}</td>
                    <td><button className="btn btn-s btn-xs">Silence</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-h"><div><h3>Telemetry volume</h3><p>Ingested this month</p></div></div>
          <div className="card-b">
            <div className="rows">
              <div><span>Metrics series</span><b className="mono">2.4 M</b></div>
              <div><span>Log volume</span><b className="mono">1.9 TB</b></div>
              <div><span>Traces sampled</span><b className="mono">184 M</b></div>
              <div><span>Retention</span><b className="mono">30 days</b></div>
            </div>
          </div>
          <div className="hint">Log ingestion drives most of your Observability cost. Sampling debug logs in staging would cut roughly 300 GB a month.</div>
        </div>
      </div>
    </div>
  );
}

function Billing() {
  const total = SPEND.iaas + SPEND.paas + SPEND.saas;
  const pct = (v) => ((v / total) * 100).toFixed(1);
  return (
    <div className="stack">
      <div className="g4">
        {[["Month to date", `$${total.toLocaleString()}`, "1–7 August 2026"],
          ["Projected close", `$${(total * 4.4).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, "18% under cap"],
          ["Monthly cap", "$105,000", "Alerts at 80%"],
          ["Committed discount", "−22%", "On reserved compute"]].map(([k, v, d], i) => (
          <div className="card kpi" key={i}><div className="k">{k}</div><div className="v">{v}</div><div className="d">{d}</div></div>
        ))}
      </div>

      <div className="card">
        <div className="card-h"><div><h3>Spend by service layer</h3><p>Where the money goes across IaaS, PaaS and SaaS</p></div>
          <button className="btn btn-s btn-xs">Export CSV</button></div>
        <div className="card-b">
          <div className="split" style={{ height: 12 }}>
            <div style={{ width: `${pct(SPEND.iaas)}%`, background: "var(--cyan)" }} />
            <div style={{ width: `${pct(SPEND.paas)}%`, background: "var(--blue)" }} />
            <div style={{ width: `${pct(SPEND.saas)}%`, background: "var(--violet)" }} />
          </div>
          <div className="rows">
            <div><span><span className="badge iaas">IaaS</span> Compute, storage, network</span><b className="mono">${SPEND.iaas.toLocaleString()} · {pct(SPEND.iaas)}%</b></div>
            <div><span><span className="badge paas">PaaS</span> Clusters, data stores, pipelines</span><b className="mono">${SPEND.paas.toLocaleString()} · {pct(SPEND.paas)}%</b></div>
            <div><span><span className="badge saas">SaaS</span> Subscribed software</span><b className="mono">${SPEND.saas.toLocaleString()} · {pct(SPEND.saas)}%</b></div>
          </div>
        </div>
        <div className="hint">Platform charges already include the infrastructure they consume. A managed Postgres instance bills once, here — its nodes and volumes are not billed separately.</div>
      </div>

      <div className="card">
        <div className="card-h"><div><h3>Invoices</h3><p>Download any period as PDF or CSV</p></div></div>
        <div className="tbl-w">
          <table className="tbl">
            <thead><tr><th>Period</th><th>IaaS</th><th>PaaS</th><th>SaaS</th><th>Total</th><th>Status</th><th style={{ width: 100 }} /></tr></thead>
            <tbody>
              {[["Aug 2026", 11840, 6215, 1750, "wn"], ["Jul 2026", 48210, 24980, 7562, "ok"],
                ["Jun 2026", 44160, 22140, 7562, "ok"], ["May 2026", 41902, 20880, 6980, "ok"]].map(([p, a, b, c, st]) => (
                <tr key={p}>
                  <td style={{ fontWeight: 600, color: "var(--ink)" }}>{p}</td>
                  <td className="mono" style={{ fontSize: 12.5 }}>${a.toLocaleString()}</td>
                  <td className="mono" style={{ fontSize: 12.5 }}>${b.toLocaleString()}</td>
                  <td className="mono" style={{ fontSize: 12.5 }}>${c.toLocaleString()}</td>
                  <td className="mono" style={{ fontWeight: 700 }}>${(a + b + c).toLocaleString()}</td>
                  <td><St s={st} map={{ ok: "Paid", wn: "Open" }} /></td>
                  <td><button className="btn btn-s btn-xs">Download</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Access() {
  return (
    <div className="g2">
      <div className="card">
        <div className="card-h"><div><h3>Team & roles</h3><p>Who can do what in this project</p></div>
          <button className="btn btn-p btn-xs"><I d={P.plus} s={14} /> Invite</button></div>
        <div className="tbl-w">
          <table className="tbl">
            <thead><tr><th>Member</th><th>Role</th><th>Scope</th><th>Last active</th></tr></thead>
            <tbody>
              {[["priya.n@northwind.io", "Owner", "All resources", "now"],
                ["d.mehta@northwind.io", "Platform admin", "All resources", "12m ago"],
                ["a.rao@northwind.io", "Developer", "orders, storefront", "2h ago"],
                ["s.iyer@northwind.io", "Developer", "recs-engine", "5h ago"],
                ["billing@northwind.io", "Billing viewer", "Billing only", "3d ago"]].map(([m, r, s, l]) => (
                <tr key={m}>
                  <td className="mono" style={{ fontSize: 12.5 }}>{m}</td>
                  <td style={{ fontWeight: 600, color: "var(--ink)" }}>{r}</td>
                  <td style={{ color: "var(--mute)", fontSize: 12.5 }}>{s}</td>
                  <td style={{ color: "var(--dim)", fontSize: 12.5 }}>{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="stack">
        <div className="card">
          <div className="card-h"><div><h3>API keys</h3><p>Programmatic access</p></div><button className="btn btn-s btn-xs">Create key</button></div>
          <div className="card-b">
            <div className="rows">
              <div><span className="mono" style={{ fontSize: 12.5 }}>ci-deploy-key</span><St s="ok" map={{ ok: "Active" }} /></div>
              <div><span className="mono" style={{ fontSize: 12.5 }}>terraform-provider</span><St s="ok" map={{ ok: "Active" }} /></div>
              <div><span className="mono" style={{ fontSize: 12.5 }}>legacy-exporter</span><St s="wn" map={{ wn: "Rotate" }} /></div>
            </div>
          </div>
          <div className="hint"><b>legacy-exporter</b> was created 397 days ago. Rotate keys older than a year.</div>
        </div>
        <div className="card">
          <div className="card-h"><div><h3>Security</h3><p>Workspace controls</p></div></div>
          <div className="card-b">
            <div className="rows">
              <div><span>Single sign-on</span><St s="ok" map={{ ok: "SAML enabled" }} /></div>
              <div><span>Two-factor</span><St s="ok" map={{ ok: "Required" }} /></div>
              <div><span>SCIM provisioning</span><St s="ok" map={{ ok: "Connected" }} /></div>
              <div><span>Audit retention</span><b className="mono">365 days</b></div>
              <div><span>Data residency</span><b>India only</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SHELL
   ============================================================ */
const NAV = [
  { g: "", items: [{ id: "home", l: "Dashboard", i: P.home, t: "Dashboard", s: "Everything running in this project", crumb: "Dashboard" }] },
  { g: "Compute · IaaS", items: [
    { id: "deploy", l: "Deploy", i: P.rocket, t: "Deploy", s: "Pick hardware, choose a template, and launch. Pricing updates as you configure.", crumb: "Compute › Deploy" },
    { id: "instances", l: "Instances", i: P.server, n: 6, t: "Instances", s: "Virtual machines, GPU nodes and bare metal you operate yourself", crumb: "Compute › Instances" },
    { id: "storage", l: "Storage", i: P.disk, n: 34, t: "Storage", s: "Block volumes, object buckets and snapshots", crumb: "Compute › Storage" },
    { id: "network", l: "Networking", i: P.net, n: 4, t: "Networking", s: "VPCs, subnets, load balancers and egress", crumb: "Compute › Networking" },
  ]},
  { g: "Platform · PaaS", items: [
    { id: "k8s", l: "Kubernetes", i: P.ship, n: 3, t: "Kubernetes", s: "Managed clusters with autoscaling node pools", crumb: "Platform › Kubernetes" },
    { id: "db", l: "Data stores", i: P.db, n: 4, t: "Data stores", s: "Managed PostgreSQL and Redis", crumb: "Platform › Data stores" },
    { id: "deployments", l: "Deployments", i: P.fn, n: 5, t: "Deployments", s: "Application rollouts across every environment", crumb: "Platform › Deployments" },
  ]},
  { g: "Applications · SaaS", items: [
    { id: "apps", l: "Subscriptions", i: P.app, n: 5, t: "Subscriptions", s: "Finished software your team signs into", crumb: "Applications › Subscriptions" },
  ]},
  { g: "Operations", items: [
    { id: "mon", l: "Monitoring", i: P.eye, t: "Monitoring", s: "Metrics, logs, traces and alerts", crumb: "Operations › Monitoring" },
    { id: "billing", l: "Billing", i: P.card, t: "Billing", s: "Unified spend across all three service layers", crumb: "Operations › Billing" },
    { id: "iam", l: "Access & security", i: P.key, t: "Access & security", s: "Team roles, API keys and workspace controls", crumb: "Operations › Access" },
  ]},
];
const FLAT = NAV.flatMap((g) => g.items);

function Networking() {
  return (
    <div className="stack">
      <div className="g4">
        {[["VPCs", "4", "Across 2 regions"], ["Subnets", "11", "7 private · 4 public"],
          ["Load balancers", "5", "3 L7 · 2 L4"], ["Egress this month", "2.9 TB", "1 TB included"]].map(([k, v, d], i) => (
          <div className="card kpi" key={i}><div className="k">{k}</div><div className="v">{v}</div><div className="d">{d}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-h"><div><h3>Virtual private clouds</h3><p>Network isolation boundaries</p></div>
          <button className="btn btn-p btn-xs"><I d={P.plus} s={14} /> Create VPC</button></div>
        <div className="tbl-w">
          <table className="tbl">
            <thead><tr><th>Name</th><th>CIDR</th><th>Region</th><th>Subnets</th><th>Resources</th><th>Status</th></tr></thead>
            <tbody>
              {[["vpc-prod", "10.0.0.0/16", "Pune-1", 4, 18, "ok"],
                ["vpc-staging", "10.1.0.0/16", "Pune-1", 3, 5, "ok"],
                ["vpc-ml", "10.2.0.0/16", "Mumbai-2", 2, 4, "ok"],
                ["vpc-sandbox", "10.3.0.0/16", "Pune-1", 2, 0, "of"]].map(([n, c, r, s, res, st]) => (
                <tr key={n}>
                  <td><span className="rname mono" style={{ fontSize: 13 }}>{n}</span></td>
                  <td className="mono" style={{ fontSize: 12.5 }}>{c}</td>
                  <td style={{ color: "var(--mute)" }}>{r}</td>
                  <td className="mono">{s}</td><td className="mono">{res}</td>
                  <td><St s={st} map={{ ok: "Active", of: "Empty" }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="hint"><b>vpc-sandbox</b> has no resources in it. Deleting unused VPCs keeps your route tables readable.</div>
      </div>
    </div>
  );
}

export default function CuriosityCloudConsole() {
  const [view, setView] = useState("deploy");
  const m = FLAT.find((n) => n.id === view);

  return (
    <div className="cq">
      <style>{CSS}</style>

      <div className="bar">
        <div className="logo">
          <span className="logo-d">C</span>
          <span className="logo-t">Curiosity Cloud</span>
        </div>
        <div className="ctx">
          <button className="ctx-btn"><small>Project</small> northwind-prod <I d={P.down} s={13} /></button>
          <button className="ctx-btn"><small>Region</small> Pune-1 <I d={P.down} s={13} /></button>
        </div>
        <div className="search">
          <I d={P.srch} s={15} />
          <input placeholder="Search resources, services and docs" />
          <span className="kbd">⌘K</span>
        </div>
        <div className="bar-r">
          <button className="icb" title="Help"><I d={P.help} s={18} /></button>
          <button className="icb" title="Notifications"><I d={P.bell} s={18} /></button>
          <span className="avatar">PN</span>
        </div>
      </div>

      <div className="wrap">
        <nav className="nav">
          {NAV.map((g, gi) => (
            <div key={gi}>
              {g.g && <div className="nav-g">{g.g}</div>}
              {g.items.map((n) => (
                <button key={n.id} className={`nav-i ${view === n.id ? "on" : ""}`}
                  onClick={() => setView(n.id)} aria-current={view === n.id ? "page" : undefined}>
                  <I d={n.i} s={17} /> {n.l}
                  {n.n && <span className="nav-ct">{n.n}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="page">
          <div className="crumb">northwind-prod <span>›</span> <b>{m.crumb}</b></div>
          <div className="head">
            <div>
              <h1>{m.t}</h1>
              <p>{m.s}</p>
            </div>
            <div className="head-a">
              {view === "instances" && <button className="btn btn-p" onClick={() => setView("deploy")}><I d={P.plus} s={15} /> Deploy instance</button>}
              {view === "home" && <button className="btn btn-p" onClick={() => setView("deploy")}><I d={P.rocket} s={15} /> Deploy</button>}
              <button className="btn btn-s"><I d={P.help} s={15} /> Docs</button>
            </div>
          </div>

          <div className="content">
            {view === "home" && <Home go={setView} />}
            {view === "deploy" && <Deploy />}
            {view === "instances" && <Instances />}
            {view === "storage" && <Storage />}
            {view === "network" && <Networking />}
            {view === "k8s" && <Kubernetes />}
            {view === "db" && <Databases />}
            {view === "deployments" && <Deployments />}
            {view === "apps" && <Apps />}
            {view === "mon" && <Monitoring />}
            {view === "billing" && <Billing />}
            {view === "iam" && <Access />}
          </div>
        </div>
      </div>
    </div>
  );
}
