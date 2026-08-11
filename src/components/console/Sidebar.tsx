"use client";

import { useState } from "react";
import { Icon, P } from "@/lib/icons";
import { NAV, NavItem } from "@/lib/nav-config";

/* ============================================================
   Sidebar Component
   Executive-grade navigation menu featuring active state glow,
   smart health/alert badges, collapsible icon-rail mode,
   and integrated campus power & spend telemetry widget.
   ============================================================ */

interface SidebarProps {
  activeView: string;
  onNavigate: (id: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({
  activeView,
  onNavigate,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  return (
    <aside
      className={`bg-glass-bg-strong backdrop-blur-[28px] backdrop-saturate-[180%] border-r border-hair/80 sticky top-[60px] h-[calc(100vh-60px)] flex flex-col justify-between transition-all duration-200 z-30 select-none ${
        isCollapsed ? "w-[68px] px-2 py-3" : "w-[236px] px-3 py-3"
      } max-[900px]:w-full max-[900px]:static max-[900px]:h-auto max-[900px]:p-2 max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:border-hair`}
    >
      {/* Scrollable Navigation Groups */}
      <div className="overflow-y-auto overflow-x-hidden space-y-4 max-[900px]:flex max-[900px]:space-y-0 max-[900px]:gap-2 max-[900px]:overflow-x-auto max-[900px]:pb-1">
        {NAV.map((group, gi) => {
          const isGroupCollapsed = collapsedGroups[group.g];

          return (
            <div key={gi} className="max-[900px]:flex max-[900px]:gap-1">
              {/* Group Header */}
              {group.g && !isCollapsed && (
                <div
                  onClick={() => toggleGroup(group.g)}
                  className="flex items-center justify-between text-[10px] font-bold tracking-[0.12em] uppercase text-slate-light/90 px-3 pt-2 pb-1.5 cursor-pointer hover:text-ink transition-colors max-[900px]:hidden"
                >
                  <span>{group.g}</span>
                  <Icon
                    d={P.down}
                    s={10}
                    className={`text-slate-light transition-transform duration-150 ${
                      isGroupCollapsed ? "-rotate-90" : ""
                    }`}
                  />
                </div>
              )}

              {/* Group Divider when collapsed */}
              {group.g && isCollapsed && (
                <div className="my-2 border-t border-hair/60 max-[900px]:hidden" />
              )}

              {/* Group Items */}
              {(!isGroupCollapsed || isCollapsed) && (
                <div className="space-y-0.5 max-[900px]:flex max-[900px]:gap-1">
                  {group.items.map((item) => {
                    const isActive = activeView === item.id;
                    const hasIssue =
                      item.id === "deployments" || (item.id === "mon" && item.n);

                    return (
                      <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        title={isCollapsed ? item.l : undefined}
                        aria-current={isActive ? "page" : undefined}
                        className={`group relative flex items-center gap-2.5 rounded-[10px] text-[13.5px] font-medium w-full text-left transition-all duration-150 ${
                          isCollapsed
                            ? "justify-center p-2.5"
                            : "px-3 py-2"
                        } max-[900px]:whitespace-nowrap max-[900px]:w-auto max-[900px]:px-3 max-[900px]:py-1.5 ${
                          isActive
                            ? "bg-white text-ink font-bold shadow-xs border border-magenta/15"
                            : "text-slate hover:bg-white/70 hover:text-ink hover:border-hair/50 border border-transparent"
                        }`}
                      >
                        {/* Active Left Gradient Accent Bar */}
                        {isActive && (
                          <span
                            className="absolute left-0 top-1.5 bottom-1.5 w-[3.5px] rounded-r-full max-[900px]:hidden"
                            style={{
                              background:
                                "linear-gradient(180deg, var(--purple), var(--magenta) 45%, var(--cyan))",
                            }}
                          />
                        )}

                        {/* Icon with active background box */}
                        <div
                          className={`w-6 h-6 rounded-[7px] grid place-items-center shrink-0 transition-colors ${
                            isActive
                              ? "bg-magenta/10 text-magenta"
                              : "text-slate group-hover:text-ink group-hover:bg-sunk"
                          }`}
                        >
                          <Icon d={item.i} s={15} />
                        </div>

                        {/* Label */}
                        {!isCollapsed && (
                          <span className="truncate flex-1 tracking-tight">
                            {item.l}
                          </span>
                        )}

                        {/* Badge Indicator */}
                        {!isCollapsed && item.n !== undefined && (
                          <span
                            className={`font-mono text-[10.5px] font-semibold px-2 py-0.5 rounded-full shrink-0 transition-colors ${
                              hasIssue
                                ? "bg-amber-100/80 text-amber-800 border border-amber-300/60"
                                : isActive
                                ? "bg-magenta/10 text-magenta border border-magenta/20"
                                : "bg-sunk text-slate-light group-hover:bg-white group-hover:text-slate border border-hair"
                            }`}
                          >
                            {hasIssue && item.id === "deployments" ? "5 · 1 fail" : item.n}
                          </span>
                        )}

                        {/* Collapsed dot badge */}
                        {isCollapsed && item.n !== undefined && (
                          <span
                            className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${
                              hasIssue ? "bg-warn" : "bg-magenta"
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer Widget: Campus Power & Spend Telemetry */}
      {!isCollapsed ? (
        <div className="mt-3 pt-3 border-t border-hair/80 space-y-2.5 max-[900px]:hidden">
          {/* Telemetry Card */}
          <div className="p-3 rounded-[12px] bg-white/70 border border-hair shadow-xs hover:border-magenta/30 transition-all group">
            <div className="flex items-center justify-between text-[11px] text-slate-light mb-1.5">
              <span className="flex items-center gap-1 font-semibold text-ink">
                <Icon d={P.zap} s={12} className="text-energy" />
                Pune Alpha Campus
              </span>
              <span className="text-[9.5px] font-bold text-ok font-mono">100% CLEAN</span>
            </div>

            <div className="text-[11.5px] text-slate-light flex justify-between items-center">
              <span>Month Spend</span>
              <span className="font-mono font-bold text-ink">$19,805 <span className="text-[10px] font-normal text-slate-light">/ $25k</span></span>
            </div>

            {/* Spend progress bar */}
            <div className="w-full h-1.5 bg-sunk rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: "79.2%",
                  background: "linear-gradient(90deg, var(--purple), var(--magenta) 60%, var(--cyan))",
                }}
              />
            </div>
          </div>

          {/* Bottom Actions: Collapse Toggle & Shortcuts */}
          <div className="flex items-center justify-between px-1 text-[11.5px] text-slate-light">
            <button
              onClick={() => onNavigate("billing")}
              className="hover:text-magenta transition-colors font-medium flex items-center gap-1"
            >
              Billing breakdown ›
            </button>

            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="p-1 rounded-md hover:bg-white hover:text-ink text-slate-light transition-colors"
                title="Collapse sidebar (Mini rail)"
              >
                <Icon d={P.sidebar} s={14} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Collapsed Footer Rail Toggle */
        <div className="mt-2 pt-2 border-t border-hair flex justify-center max-[900px]:hidden">
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-lg hover:bg-white text-slate-light hover:text-ink transition-colors"
              title="Expand sidebar"
            >
              <Icon d={P.sidebar} s={16} />
            </button>
          )}
        </div>
      )}
    </aside>
  );
}
