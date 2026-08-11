"use client";

import { useState } from "react";
import { Icon, P } from "@/lib/icons";
import { FLAT } from "@/lib/nav-config";
import { TopBar } from "@/components/console/TopBar";
import { Sidebar } from "@/components/console/Sidebar";
import { Breadcrumb } from "@/components/console/Breadcrumb";
import { PageHeader } from "@/components/console/PageHeader";
import { Button } from "@/components/ui/Button";

import { Home } from "@/components/console/views/Home";
import { Deploy } from "@/components/console/views/Deploy";
import { Instances } from "@/components/console/views/Instances";
import { Storage } from "@/components/console/views/Storage";
import { Networking } from "@/components/console/views/Networking";
import { Kubernetes } from "@/components/console/views/Kubernetes";
import { Databases } from "@/components/console/views/Databases";
import { Deployments } from "@/components/console/views/Deployments";
import { Apps } from "@/components/console/views/Apps";
import { Monitoring } from "@/components/console/views/Monitoring";
import { Billing } from "@/components/console/views/Billing";
import { Access } from "@/components/console/views/Access";

/* ============================================================
   Curiosity Cloud Console — Main Shell
   Coordinates dynamic layout, sidebar collapse state, and view routing.
   ============================================================ */

export default function ConsolePage() {
  const [view, setView] = useState("home");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const m = FLAT.find((n) => n.id === view) || FLAT[0];

  return (
    <div className="min-h-screen">
      {/* TopBar with full navigation callback */}
      <TopBar onNavigate={setView} />

      {/* Main Grid Layout */}
      <div
        className={`grid ${
          isSidebarCollapsed ? "grid-cols-[68px_1fr]" : "grid-cols-[236px_1fr]"
        } items-start max-[900px]:grid-cols-1 transition-all duration-200`}
      >
        <Sidebar
          activeView={view}
          onNavigate={setView}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <div className="min-w-0">
          <Breadcrumb crumb={m.crumb} />
          <PageHeader
            title={m.t}
            subtitle={m.s}
            actions={
              <>
                {view === "instances" && (
                  <Button variant="primary" onClick={() => setView("deploy")}>
                    <Icon d={P.plus} s={15} /> Deploy instance
                  </Button>
                )}
                {view === "home" && (
                  <Button variant="primary" onClick={() => setView("deploy")}>
                    <Icon d={P.rocket} s={15} /> Deploy
                  </Button>
                )}
                <Button onClick={() => alert("Curiosity Cloud Technical Docs: https://docs.curiosity.cloud")}>
                  <Icon d={P.help} s={15} /> Docs
                </Button>
              </>
            }
          />

          <div className="px-[26px] pb-[60px] max-[900px]:px-4">
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
