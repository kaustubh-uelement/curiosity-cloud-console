/* ============================================================
   Mock Data
   All data from the original CuriosityCloudConsole.jsx.
   ============================================================ */

export interface GPU {
  id: string;
  name: string;
  vram: string;
  mem: string;
  vcpu: number;
  price: number;
  avail: "high" | "med" | "low" | "none";
  note: string;
}

export const GPUS: GPU[] = [
  { id: "h100-sxm", name: "H100 SXM", vram: "80 GB", mem: "251 GB", vcpu: 26, price: 2.99, avail: "high", note: "HBM3 · NVLink" },
  { id: "h100-pcie", name: "H100 PCIe", vram: "80 GB", mem: "188 GB", vcpu: 20, price: 2.39, avail: "high", note: "HBM2e" },
  { id: "a100-sxm", name: "A100 SXM", vram: "80 GB", mem: "125 GB", vcpu: 16, price: 1.89, avail: "med", note: "HBM2e · NVLink" },
  { id: "a100-pcie", name: "A100 PCIe", vram: "40 GB", mem: "117 GB", vcpu: 12, price: 1.49, avail: "high", note: "HBM2" },
  { id: "l40s", name: "L40S", vram: "48 GB", mem: "62 GB", vcpu: 12, price: 0.89, avail: "high", note: "Ada · inference" },
  { id: "a6000", name: "RTX A6000", vram: "48 GB", mem: "50 GB", vcpu: 9, price: 0.62, avail: "med", note: "Ampere" },
  { id: "4090", name: "RTX 4090", vram: "24 GB", mem: "41 GB", vcpu: 8, price: 0.44, avail: "low", note: "Ada" },
  { id: "l4", name: "L4", vram: "24 GB", mem: "48 GB", vcpu: 12, price: 0.31, avail: "none", note: "Ada · low power" },
];

export const AVAIL: Record<string, { t: string; c: string }> = {
  high: { t: "High availability", c: "ok" },
  med: { t: "Limited stock", c: "wn" },
  low: { t: "Low stock", c: "wn" },
  none: { t: "Unavailable", c: "of" },
};

export interface Region {
  id: string;
  name: string;
  mult: number;
}

export const REGIONS: Region[] = [
  { id: "pune-1", name: "Pune (India West)", mult: 1 },
  { id: "mumbai-2", name: "Mumbai (India West 2)", mult: 1.04 },
  { id: "sg-1", name: "Singapore", mult: 1.12 },
  { id: "uae-1", name: "Dubai (UAE North)", mult: 1.09 },
];

export const TEMPLATES: string[] = [
  "PyTorch 2.4 · CUDA 12.4",
  "TensorFlow 2.17 · CUDA 12.4",
  "vLLM Inference Server",
  "Jupyter Lab · Data Science",
  "CUDA 12.4 Base (minimal)",
  "Custom container image",
];

export interface Instance {
  id: string;
  tmpl: string;
  region: string;
  layer: string;
  st: string;
  cpu: number;
  mem: number;
  up: string;
  rate: number;
}

export const INSTANCES: Instance[] = [
  { id: "ci-prod-api-01", tmpl: "c6.2xlarge", region: "Pune-1", layer: "iaas", st: "ok", cpu: 62, mem: 71, up: "34d 02h", rate: 0.34 },
  { id: "ci-prod-api-02", tmpl: "c6.2xlarge", region: "Pune-1", layer: "iaas", st: "ok", cpu: 58, mem: 68, up: "34d 02h", rate: 0.34 },
  { id: "gpu-train-01", tmpl: "H100 SXM x8", region: "Mumbai-2", layer: "iaas", st: "ok", cpu: 91, mem: 84, up: "6d 11h", rate: 23.92 },
  { id: "gpu-infer-03", tmpl: "L40S x2", region: "Pune-1", layer: "iaas", st: "ok", cpu: 44, mem: 51, up: "19d 03h", rate: 1.78 },
  { id: "ci-worker-04", tmpl: "m6.xlarge", region: "Pune-1", layer: "iaas", st: "wn", cpu: 94, mem: 89, up: "12d 07h", rate: 0.17 },
  { id: "ci-staging-01", tmpl: "m6.large", region: "Pune-1", layer: "iaas", st: "of", cpu: 0, mem: 0, up: "—", rate: 0 },
];

export interface Cluster {
  id: string;
  ver: string;
  nodes: number;
  pods: number;
  region: string;
  st: string;
  cpu: number;
}

export const CLUSTERS: Cluster[] = [
  { id: "k8s-prod", ver: "1.31.4", nodes: 6, pods: 84, region: "Pune-1", st: "ok", cpu: 64 },
  { id: "k8s-staging", ver: "1.31.4", nodes: 2, pods: 19, region: "Pune-1", st: "ok", cpu: 22 },
  { id: "k8s-ml", ver: "1.30.8", nodes: 3, pods: 11, region: "Mumbai-2", st: "wn", cpu: 88 },
];

export interface DB {
  id: string;
  eng: string;
  plan: string;
  size: string;
  st: string;
  conn: string;
}

export const DBS: DB[] = [
  { id: "pg-orders-prod", eng: "PostgreSQL 16.3", plan: "HA · 4 vCPU / 16 GB", size: "412 GB", st: "ok", conn: "184 / 400" },
  { id: "pg-analytics", eng: "PostgreSQL 16.3", plan: "Single · 8 vCPU / 32 GB", size: "1.8 TB", st: "ok", conn: "37 / 200" },
  { id: "redis-session", eng: "Redis 7.2", plan: "Cluster · 3 shards", size: "24 GB", st: "ok", conn: "912 / 5000" },
  { id: "pg-legacy-billing", eng: "PostgreSQL 14.11", plan: "Single · 2 vCPU / 8 GB", size: "88 GB", st: "wn", conn: "12 / 100" },
];

export interface Deploy {
  app: string;
  env: string;
  ver: string;
  st: string;
  when: string;
  by: string;
  reps: string;
}

export const DEPLOYS: Deploy[] = [
  { app: "orders-api", env: "production", ver: "v4.12.0", st: "ok", when: "2h ago", by: "pipeline", reps: "8/8" },
  { app: "web-storefront", env: "production", ver: "v2.31.4", st: "ok", when: "6h ago", by: "pipeline", reps: "6/6" },
  { app: "recs-engine", env: "production", ver: "v1.9.2", st: "wn", when: "18m ago", by: "d.mehta", reps: "3/4" },
  { app: "orders-api", env: "staging", ver: "v4.13.0-rc1", st: "ok", when: "41m ago", by: "pipeline", reps: "2/2" },
  { app: "batch-etl", env: "production", ver: "v0.8.7", st: "bd", when: "1d ago", by: "pipeline", reps: "0/2" },
];

export interface Subscription {
  name: string;
  seats: string;
  plan: string;
  renew: string;
  cost: number;
  st: string;
}

export const SUBS: Subscription[] = [
  { name: "Identity & Access", seats: "42 / 50", plan: "Business", renew: "1 Sep 2026", cost: 168, st: "ok" },
  { name: "Observability Suite", seats: "Usage-based", plan: "Pro", renew: "1 Sep 2026", cost: 892, st: "ok" },
  { name: "Cost Intelligence", seats: "Unlimited", plan: "Standard", renew: "1 Sep 2026", cost: 149, st: "ok" },
  { name: "API Gateway Console", seats: "Usage-based", plan: "Pro", renew: "1 Sep 2026", cost: 314, st: "ok" },
  { name: "Backup & Recovery", seats: "Unlimited", plan: "Standard", renew: "14 Aug 2026", cost: 227, st: "wn" },
];

export const SPEND = { iaas: 11840, paas: 6215, saas: 1750 };

export const SPARK = [42, 48, 45, 52, 61, 58, 66, 71, 68, 74, 82, 79, 88, 91, 86, 94];
