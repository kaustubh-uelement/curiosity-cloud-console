import { P } from "./icons";

/* ============================================================
   Nav Configuration
   Matches the original NAV array exactly.
   ============================================================ */

export interface NavItem {
  id: string;
  l: string;
  i: string;
  n?: number;
  t: string;
  s: string;
  crumb: string;
}

export interface NavGroup {
  g: string;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  {
    g: "",
    items: [
      {
        id: "home",
        l: "Dashboard",
        i: P.home,
        t: "Dashboard",
        s: "Everything running in this project",
        crumb: "Dashboard",
      },
    ],
  },
  {
    g: "Compute · IaaS",
    items: [
      {
        id: "deploy",
        l: "Deploy",
        i: P.rocket,
        t: "Deploy",
        s: "Pick hardware, choose a template, and launch. Pricing updates as you configure.",
        crumb: "Compute › Deploy",
      },
      {
        id: "instances",
        l: "Instances",
        i: P.server,
        n: 6,
        t: "Instances",
        s: "Virtual machines, GPU nodes and bare metal you operate yourself",
        crumb: "Compute › Instances",
      },
      {
        id: "storage",
        l: "Storage",
        i: P.disk,
        n: 34,
        t: "Storage",
        s: "Block volumes, object buckets and snapshots",
        crumb: "Compute › Storage",
      },
      {
        id: "network",
        l: "Networking",
        i: P.net,
        n: 4,
        t: "Networking",
        s: "VPCs, subnets, load balancers and egress",
        crumb: "Compute › Networking",
      },
    ],
  },
  {
    g: "Platform · PaaS",
    items: [
      {
        id: "k8s",
        l: "Kubernetes",
        i: P.ship,
        n: 3,
        t: "Kubernetes",
        s: "Managed clusters with autoscaling node pools",
        crumb: "Platform › Kubernetes",
      },
      {
        id: "db",
        l: "Data stores",
        i: P.db,
        n: 4,
        t: "Data stores",
        s: "Managed PostgreSQL and Redis",
        crumb: "Platform › Data stores",
      },
      {
        id: "deployments",
        l: "Deployments",
        i: P.fn,
        n: 5,
        t: "Deployments",
        s: "Application rollouts across every environment",
        crumb: "Platform › Deployments",
      },
    ],
  },
  {
    g: "Applications · SaaS",
    items: [
      {
        id: "apps",
        l: "Subscriptions",
        i: P.app,
        n: 5,
        t: "Subscriptions",
        s: "Finished software your team signs into",
        crumb: "Applications › Subscriptions",
      },
    ],
  },
  {
    g: "Operations",
    items: [
      {
        id: "mon",
        l: "Monitoring",
        i: P.eye,
        t: "Monitoring",
        s: "Metrics, logs, traces and alerts",
        crumb: "Operations › Monitoring",
      },
      {
        id: "billing",
        l: "Billing",
        i: P.card,
        t: "Billing",
        s: "Unified spend across all three service layers",
        crumb: "Operations › Billing",
      },
      {
        id: "iam",
        l: "Access & security",
        i: P.key,
        t: "Access & security",
        s: "Team roles, API keys and workspace controls",
        crumb: "Operations › Access",
      },
    ],
  },
];

export const FLAT: NavItem[] = NAV.flatMap((g) => g.items);
