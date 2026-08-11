"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon, P } from "@/lib/icons";
import { CommandPalette } from "./CommandPalette";

/* ============================================================
   TopBar Component
   Executive-grade navigation header with interactive project/region
   switchers, live clean energy telemetry, global ⌘K search,
   real-time notification center, and user profile drawer.
   ============================================================ */

interface TopBarProps {
  onNavigate?: (id: string) => void;
}

interface ProjectOption {
  id: string;
  name: string;
  env: "prod" | "staging" | "dev";
  nodes: number;
  region: string;
}

const PROJECTS: ProjectOption[] = [
  {
    id: "curiositycloud-prod",
    name: "curiositycloud-prod",
    env: "prod",
    nodes: 6,
    region: "Pune-1",
  },
  {
    id: "stargazer-stage",
    name: "stargazer-stage",
    env: "staging",
    nodes: 2,
    region: "Pune-1",
  },
  {
    id: "hydra-dev",
    name: "hydra-dev",
    env: "dev",
    nodes: 1,
    region: "Mumbai-2",
  },
];

const REGIONS = [
  {
    id: "Pune-1",
    name: "Pune-1 (Alpha Campus)",
    latency: "18ms",
    power: "100% Solar + BESS",
    status: "Primary",
  },
  {
    id: "Mumbai-2",
    name: "Mumbai-2 (Coastal Hub)",
    latency: "24ms",
    power: "94% Clean Wind/Grid",
    status: "Secondary",
  },
  {
    id: "Bengaluru-1",
    name: "Bengaluru-1 (Edge Fabric)",
    latency: "31ms",
    power: "98% Clean Solar",
    status: "Edge",
  },
];

const NOTIFICATIONS = [
  {
    id: "n1",
    title: "Deployment failure in batch-etl",
    desc: "Production deployment failed 22h ago. 0/2 replicas available.",
    time: "22h ago",
    type: "bad" as const,
    unread: true,
    view: "deployments",
  },
  {
    id: "n2",
    title: "Monthly budget milestone",
    desc: "Spend reached $19,805 (68% of $25k soft quota).",
    time: "1d ago",
    type: "warn" as const,
    unread: true,
    view: "billing",
  },
  {
    id: "n3",
    title: "Autoscaling event: GPU node pool",
    desc: "Successfully provisioned 2x NVIDIA H100 SXM5 nodes.",
    time: "2d ago",
    type: "ok" as const,
    unread: false,
    view: "instances",
  },
];

export function TopBar({ onNavigate }: TopBarProps) {
  const [selectedProject, setSelectedProject] = useState("curiositycloud-prod");
  const [selectedRegion, setSelectedRegion] = useState("Pune-1");
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEnergyOpen, setIsEnergyOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const projectRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const energyRef = useRef<HTMLDivElement>(null);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        projectRef.current &&
        !projectRef.current.contains(event.target as Node)
      )
        setIsProjectOpen(false);
      if (
        regionRef.current &&
        !regionRef.current.contains(event.target as Node)
      )
        setIsRegionOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target as Node))
        setIsNotifOpen(false);
      if (helpRef.current && !helpRef.current.contains(event.target as Node))
        setIsHelpOpen(false);
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      )
        setIsProfileOpen(false);
      if (
        energyRef.current &&
        !energyRef.current.contains(event.target as Node)
      )
        setIsEnergyOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <>
      <header className="h-[56px] sm:h-[60px] bg-glass-bg-strong backdrop-blur-[28px] backdrop-saturate-[190%] border-b border-hair/80 flex items-center justify-between gap-2 sm:gap-3 px-2.5 sm:px-4 md:px-6 sticky top-0 z-40 shadow-sh select-none">
        {/* Left Section: Logo & Context Selectors */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 min-w-0 flex-1">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-2 shrink-0 pr-2 sm:pr-3 md:pr-4 border-r border-hair">
            <Link
              href="/"
              className="items-center gap-2 hidden md:flex shrink-0"
            >
              <Image
                src="/curiosity.png"
                alt="Curiosity Cloud"
                width={120}
                height={20}
                priority
                className="h-5 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Project Switcher Dropdown */}
          <div className="relative min-w-0 shrink" ref={projectRef}>
            <button
              onClick={() => {
                setIsProjectOpen(!isProjectOpen);
                setIsRegionOpen(false);
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-[9px] border text-[13px] font-semibold transition-all duration-150 min-w-0 max-w-full ${
                isProjectOpen
                  ? "bg-white border-magenta shadow-sm text-ink ring-2 ring-magenta/10"
                  : "bg-white/60 hover:bg-white border-hair hover:border-slate-light/40 text-ink-soft"
              }`}
            >
              <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                <span className="hidden sm:inline text-[10px] font-bold tracking-wider uppercase text-slate-light shrink-0">
                  Project
                </span>
                <span className="font-mono text-ink font-medium max-w-[88px] xs:max-w-[110px] sm:max-w-[130px] md:max-w-[150px] truncate">
                  {selectedProject}
                </span>
              </div>
              <Icon
                d={P.down}
                s={12}
                className={`text-slate-light transition-transform duration-200 shrink-0 ${
                  isProjectOpen ? "rotate-180 text-magenta" : ""
                }`}
              />
            </button>

            {/* Project Dropdown Menu */}
            {isProjectOpen && (
              <div className="absolute left-0 top-[calc(100%+8px)] w-[280px] max-w-[calc(100vw-24px)] bg-white rounded-[14px] border border-hair shadow-deep p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-light">
                  Switch Active Project
                </div>
                <div className="space-y-0.5">
                  {PROJECTS.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => {
                        setSelectedProject(proj.id);
                        setIsProjectOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-[9px] text-left text-[13px] transition-colors ${
                        selectedProject === proj.id
                          ? "bg-accent-l text-magenta font-bold"
                          : "text-slate hover:bg-sunk hover:text-ink"
                      }`}
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="font-mono text-[13px] truncate">
                          {proj.name}
                        </span>
                        <span className="text-[11px] text-slate-light font-normal truncate">
                          {proj.nodes} compute nodes • {proj.region}
                        </span>
                      </div>
                      {selectedProject === proj.id && (
                        <Icon
                          d={P.check}
                          s={14}
                          className="text-magenta shrink-0"
                        />
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-1 pt-1 border-t border-hair">
                  <button
                    onClick={() => {
                      setIsProjectOpen(false);
                      onNavigate?.("deploy");
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 rounded-[8px] text-[12px] font-semibold text-magenta hover:bg-accent-l transition-colors"
                  >
                    <Icon d={P.plus} s={13} /> Create new project
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Region Switcher Dropdown */}
          <div className="relative hidden md:block shrink-0" ref={regionRef}>
            <button
              onClick={() => {
                setIsRegionOpen(!isRegionOpen);
                setIsProjectOpen(false);
              }}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-[9px] border text-[13px] font-semibold transition-all duration-150 ${
                isRegionOpen
                  ? "bg-white border-magenta shadow-sm text-ink ring-2 ring-magenta/10"
                  : "bg-white/60 hover:bg-white border-hair hover:border-slate-light/40 text-ink-soft"
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-ok animate-pulse shrink-0" />
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-light shrink-0">
                  Region
                </span>
                <span className="font-medium text-ink truncate max-w-[90px] lg:max-w-[140px]">
                  {selectedRegion}
                </span>
              </div>
              <Icon
                d={P.down}
                s={12}
                className={`text-slate-light transition-transform duration-200 shrink-0 ${
                  isRegionOpen ? "rotate-180 text-magenta" : ""
                }`}
              />
            </button>

            {/* Region Dropdown Menu */}
            {isRegionOpen && (
              <div className="absolute left-0 top-[calc(100%+8px)] w-[300px] max-w-[calc(100vw-24px)] bg-white rounded-[14px] border border-hair shadow-deep p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-light">
                  Available Campus Regions
                </div>
                <div className="space-y-0.5">
                  {REGIONS.map((reg) => (
                    <button
                      key={reg.id}
                      onClick={() => {
                        setSelectedRegion(reg.id);
                        setIsRegionOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-[9px] text-left text-[13px] transition-colors ${
                        selectedRegion === reg.id
                          ? "bg-accent-l text-magenta font-bold"
                          : "text-slate hover:bg-sunk hover:text-ink"
                      }`}
                    >
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[13px] truncate">
                            {reg.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-sunk text-slate-light shrink-0">
                            {reg.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-light font-normal flex items-center gap-2 mt-0.5">
                          <span className="text-ok font-mono">
                            {reg.latency}
                          </span>
                          <span>•</span>
                          <span className="text-amber">{reg.power}</span>
                        </span>
                      </div>
                      {selectedRegion === reg.id && (
                        <Icon
                          d={P.check}
                          s={14}
                          className="text-magenta shrink-0"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Middle Section: Global Search Bar Trigger (Command Bar) */}
        <div className="flex-1 max-w-[420px] mx-2 hidden lg:block">
          <button
            onClick={() => setIsCommandOpen(true)}
            className="w-full flex items-center justify-between gap-2.5 px-3 py-1.5 rounded-[10px] bg-white/70 hover:bg-white border border-hair hover:border-slate-light/40 shadow-inner text-slate-light hover:text-ink transition-all duration-150 group"
          >
            <div className="flex items-center gap-2 text-[13px] min-w-0">
              <Icon
                d={P.srch}
                s={15}
                className="text-slate-light group-hover:text-magenta transition-colors shrink-0"
              />
              <span className="text-slate-light truncate">
                Search resources, clusters, docs...
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <kbd className="font-mono text-[10.5px] px-1.5 py-0.5 bg-paper rounded border border-hair text-slate font-semibold shadow-xs">
                ⌘K
              </kbd>
            </div>
          </button>
        </div>

        {/* Right Section: Telemetry & User Controls */}
        <div className="flex items-center gap-0.5 sm:gap-1.5 md:gap-2 shrink-0">
          {/* Energy Status Telemetry Pill */}
          <div className="relative hidden xl:block" ref={energyRef}>
            <button
              onClick={() => setIsEnergyOpen(!isEnergyOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100/70 transition-colors whitespace-nowrap"
            >
              <Icon d={P.zap} s={13} className="text-energy shrink-0" />
              <span>100% Clean Energy</span>
              <span className="w-1.5 h-1.5 rounded-full bg-energy shrink-0" />
            </button>

            {/* Energy Telemetry Popover */}
            {isEnergyOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-[290px] max-w-[calc(100vw-24px)] bg-white rounded-[14px] border border-hair shadow-deep p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-hair">
                  <div className="flex items-center gap-1.5 font-heading font-bold text-[13px] text-ink">
                    <Icon d={P.zap} s={15} className="text-energy" />
                    Pune Campus Power Telemetry
                  </div>
                  <span className="text-[10px] font-mono text-ok bg-ok-l px-1.5 py-0.5 rounded font-bold">
                    ACTIVE
                  </span>
                </div>
                <div className="py-2.5 space-y-2 text-[12px]">
                  <div className="flex justify-between items-center text-slate">
                    <span>Solar Generation</span>
                    <span className="font-mono font-bold text-ink">
                      54% (Utility PV)
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate">
                    <span>Wind Complement</span>
                    <span className="font-mono font-bold text-ink">
                      36% (Overnight)
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate">
                    <span>Battery Storage (BESS)</span>
                    <span className="font-mono font-bold text-ink">
                      10% (Firming)
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate">
                    <span>Carbon Intensity</span>
                    <span className="font-mono font-bold text-ok">
                      0.0 g CO₂/kWh
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-hair text-[11px] text-slate-light">
                  Powered under 24/7 matching PPA contracts.
                </div>
              </div>
            )}
          </div>

          {/* Quick Mobile Search Trigger */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] rounded-[9px] grid place-items-center text-slate hover:bg-white hover:text-ink border border-transparent hover:border-hair transition-colors lg:hidden shrink-0"
            title="Search (⌘K)"
          >
            <Icon d={P.srch} s={16} />
          </button>

          {/* Cloud Shell / Terminal Button */}
          <button
            onClick={() =>
              alert("Curiosity Cloud Shell: Connecting to alpha-node-01...")
            }
            className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] rounded-[9px] grid place-items-center text-slate hover:bg-white hover:text-ink border border-transparent hover:border-hair transition-colors hidden sm:grid shrink-0"
            title="Cloud Shell Terminal"
          >
            <Icon d={P.terminal} s={16} />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative shrink-0" ref={notifRef}>
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsHelpOpen(false);
                setIsProfileOpen(false);
              }}
              className={`w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] rounded-[9px] grid place-items-center text-slate relative transition-colors ${
                isNotifOpen
                  ? "bg-white text-magenta border border-hair shadow-xs"
                  : "hover:bg-white hover:text-ink"
              }`}
              title="Notifications"
            >
              <Icon d={P.bell} s={16} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 rounded-full bg-bad ring-2 ring-white" />
              )}
            </button>

            {/* Notifications Popover */}
            {isNotifOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-[320px] sm:w-[350px] max-w-[calc(100vw-24px)] bg-white rounded-[16px] border border-hair shadow-deep overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-3 border-b border-hair flex items-center justify-between bg-paper/50">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-[13.5px] text-ink">
                      Alerts & Events
                    </span>
                    <span className="text-[10.5px] font-bold px-1.5 py-0.2 rounded-full bg-bad text-white">
                      {unreadCount} new
                    </span>
                  </div>
                  <button className="text-[11px] font-semibold text-magenta hover:underline">
                    Mark read
                  </button>
                </div>
                <div className="max-h-[300px] overflow-y-auto divide-y divide-hair">
                  {NOTIFICATIONS.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setIsNotifOpen(false);
                        onNavigate?.(n.view);
                      }}
                      className={`p-3 text-left hover:bg-accent-l/50 cursor-pointer transition-colors flex gap-2.5 items-start ${
                        n.unread
                          ? "bg-white font-medium"
                          : "bg-paper/30 opacity-80"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          n.type === "bad"
                            ? "bg-bad"
                            : n.type === "warn"
                              ? "bg-warn"
                              : "bg-ok"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[12.5px] font-semibold text-ink leading-snug">
                          {n.title}
                        </div>
                        <div className="text-[11.5px] text-slate-light mt-0.5 leading-snug">
                          {n.desc}
                        </div>
                        <div className="text-[10px] text-slate-light font-mono mt-1">
                          {n.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-hair bg-paper/50 text-center">
                  <button
                    onClick={() => {
                      setIsNotifOpen(false);
                      onNavigate?.("mon");
                    }}
                    className="text-[12px] font-semibold text-magenta hover:underline"
                  >
                    View all in Monitoring ›
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help & Support Dropdown */}
          <div className="relative hidden sm:block shrink-0" ref={helpRef}>
            <button
              onClick={() => {
                setIsHelpOpen(!isHelpOpen);
                setIsNotifOpen(false);
                setIsProfileOpen(false);
              }}
              className={`w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] rounded-[9px] grid place-items-center text-slate transition-colors ${
                isHelpOpen
                  ? "bg-white text-magenta border border-hair shadow-xs"
                  : "hover:bg-white hover:text-ink"
              }`}
              title="Help & Documentation"
            >
              <Icon d={P.help} s={16} />
            </button>

            {/* Help Dropdown Popover */}
            {isHelpOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-[240px] max-w-[calc(100vw-24px)] bg-white rounded-[14px] border border-hair shadow-deep p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-light">
                  Support & Resources
                </div>
                <a
                  href="#docs"
                  onClick={() => setIsHelpOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] text-slate hover:bg-sunk hover:text-ink transition-colors"
                >
                  <Icon d={P.help} s={14} className="text-magenta" />
                  Documentation
                </a>
                <a
                  href="#api"
                  onClick={() => setIsHelpOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] text-slate hover:bg-sunk hover:text-ink transition-colors"
                >
                  <Icon d={P.key} s={14} className="text-terra" />
                  API Reference
                </a>
                <a
                  href="#status"
                  onClick={() => setIsHelpOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] text-slate hover:bg-sunk hover:text-ink transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon d={P.activity} s={14} className="text-ok" />
                    System Status
                  </div>
                  <span className="w-2 h-2 rounded-full bg-ok" />
                </a>
                <div className="mt-1 pt-1 border-t border-hair">
                  <button
                    onClick={() => {
                      setIsHelpOpen(false);
                      setIsCommandOpen(true);
                    }}
                    className="w-full flex items-center justify-between px-3 py-1.5 rounded-[8px] text-[12px] text-slate hover:bg-sunk font-medium"
                  >
                    <span>Keyboard shortcuts</span>
                    <kbd className="font-mono text-[10px] px-1 bg-paper border border-hair rounded">
                      ⌘K
                    </kbd>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative shrink-0" ref={profileRef}>
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
                setIsHelpOpen(false);
              }}
              className="flex items-center gap-2 pl-0.5 sm:pl-1 pr-0.5 sm:pr-1.5 py-1 rounded-[10px] hover:bg-white/80 border border-transparent hover:border-hair transition-all shrink-0"
            >
              <span
                className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] rounded-full grid place-items-center text-white text-[12px] font-bold shadow-xs shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, var(--magenta), var(--purple))",
                }}
              >
                PN
              </span>
              <div className="flex-col text-left hidden xl:flex">
                <span className="text-[12.5px] font-bold text-ink leading-tight">
                  Pranav N.
                </span>
                <span className="text-[10px] text-slate-light font-medium">
                  Org Owner
                </span>
              </div>
              <Icon
                d={P.down}
                s={11}
                className="text-slate-light hidden xl:block"
              />
            </button>

            {/* Profile Popover */}
            {isProfileOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-[260px] max-w-[calc(100vw-24px)] bg-white rounded-[16px] border border-hair shadow-deep p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2.5 border-b border-hair bg-paper/40 rounded-[10px] mb-1">
                  <div className="font-bold text-[13.5px] text-ink">
                    Pranav Nambiar
                  </div>
                  <div className="text-[11.5px] text-slate-light font-mono truncate">
                    pranav@curiositycloud.ai
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-purple-50 text-purple border border-purple/20">
                      CuriosityCloud
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onNavigate?.("iam");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] text-slate hover:bg-sunk hover:text-ink transition-colors"
                >
                  <Icon d={P.key} s={14} /> Access & API Keys
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onNavigate?.("billing");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] text-slate hover:bg-sunk hover:text-ink transition-colors"
                >
                  <Icon d={P.card} s={14} /> Organization Billing
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onNavigate?.("iam");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] text-slate hover:bg-sunk hover:text-ink transition-colors"
                >
                  <Icon d={P.settings} s={14} /> Workspace Settings
                </button>

                {/* Mobile-only: help links folded into profile menu since Help icon is hidden below sm */}
                <div className="sm:hidden mt-1 pt-1 border-t border-hair">
                  <a
                    href="#docs"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] text-slate hover:bg-sunk hover:text-ink transition-colors"
                  >
                    <Icon d={P.help} s={14} className="text-magenta" />
                    Documentation
                  </a>
                </div>

                <div className="mt-1 pt-1 border-t border-hair">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      alert("Signed out of Curiosity Cloud");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[13px] text-bad hover:bg-bad-l transition-colors font-medium"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global ⌘K Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={(id) => onNavigate?.(id)}
      />
    </>
  );
}
