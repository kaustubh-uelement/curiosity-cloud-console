"use client";

import { useState, useEffect, useRef } from "react";
import { Icon, P } from "@/lib/icons";
import { FLAT, NavItem } from "@/lib/nav-config";

/* ============================================================
   CommandPalette Component
   Global ⌘K quick switcher & search modal for Curiosity Cloud.
   ============================================================ */

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

interface QuickAction {
  id: string;
  label: string;
  category: string;
  icon: string;
  targetView: string;
  meta?: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "act-deploy",
    label: "Deploy New GPU Instance",
    category: "Quick Actions",
    icon: P.rocket,
    targetView: "deploy",
    meta: "NVIDIA H100 / H200 / B200",
  },
  {
    id: "act-cluster",
    label: "Scale Kubernetes Node Pool",
    category: "Quick Actions",
    icon: P.ship,
    targetView: "k8s",
    meta: "alpha-primary-gpu",
  },
  {
    id: "act-etl",
    label: "Inspect Failed Deployment: batch-etl",
    category: "Troubleshooting",
    icon: P.warn,
    targetView: "deployments",
    meta: "0/2 replicas healthy",
  },
  {
    id: "act-db",
    label: "Create PostgreSQL Replica",
    category: "Quick Actions",
    icon: P.db,
    targetView: "db",
    meta: "v16.2 pgvector",
  },
  {
    id: "act-key",
    label: "Generate API / SSH Key",
    category: "Security",
    icon: P.key,
    targetView: "iam",
    meta: "Workspace auth",
  },
  {
    id: "act-bill",
    label: "View Monthly Energy & Compute Invoices",
    category: "Billing",
    icon: P.card,
    targetView: "billing",
    meta: "$19,805 current",
  },
];

export function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredViews = FLAT.filter(
    (item) =>
      item.l.toLowerCase().includes(q) ||
      item.t.toLowerCase().includes(q) ||
      item.crumb.toLowerCase().includes(q) ||
      item.s.toLowerCase().includes(q)
  );

  const filteredActions = QUICK_ACTIONS.filter(
    (act) =>
      act.label.toLowerCase().includes(q) ||
      act.category.toLowerCase().includes(q) ||
      (act.meta && act.meta.toLowerCase().includes(q))
  );

  const handleSelect = (viewId: string) => {
    onNavigate(viewId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-[620px] bg-white rounded-[18px] border border-glass-line shadow-deep overflow-hidden z-10 flex flex-col max-h-[70vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-hair bg-paper/60">
          <Icon d={P.srch} s={18} className="text-magenta shrink-0" />
          <input
            ref={inputRef}
            className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium text-ink placeholder:text-slate-light"
            placeholder="Search commands, resources, views, or docs... (Esc to exit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-slate-light hover:text-ink p-1 rounded-md"
            >
              <Icon d={P.x} s={14} />
            </button>
          )}
          <span className="font-mono text-[11px] px-2 py-0.5 bg-sunk rounded text-slate border border-hair">
            ESC
          </span>
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-2 space-y-3">
          {/* Quick Actions Section */}
          {filteredActions.length > 0 && (
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-light px-3 py-1.5">
                Quick Actions & Resources
              </div>
              <div className="space-y-0.5">
                {filteredActions.map((act) => (
                  <button
                    key={act.id}
                    onClick={() => handleSelect(act.targetView)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-[10px] text-left transition-colors hover:bg-accent-l group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-sunk flex items-center justify-center text-slate group-hover:bg-magenta group-hover:text-white transition-colors shrink-0">
                        <Icon d={act.icon} s={14} />
                      </div>
                      <div className="truncate">
                        <div className="text-[13.5px] font-semibold text-ink group-hover:text-magenta truncate">
                          {act.label}
                        </div>
                        {act.meta && (
                          <div className="text-[11.5px] text-slate-light truncate">
                            {act.meta}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-light bg-sunk group-hover:bg-white px-2 py-0.5 rounded border border-hair shrink-0">
                      {act.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Views Section */}
          {filteredViews.length > 0 && (
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-light px-3 py-1.5">
                Console Navigation
              </div>
              <div className="space-y-0.5">
                {filteredViews.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-[10px] text-left transition-colors hover:bg-accent-l group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-sunk flex items-center justify-center text-slate group-hover:bg-magenta group-hover:text-white transition-colors shrink-0">
                        <Icon d={item.i} s={14} />
                      </div>
                      <div className="truncate">
                        <div className="text-[13.5px] font-semibold text-ink group-hover:text-magenta truncate">
                          {item.l}
                        </div>
                        <div className="text-[11.5px] text-slate-light truncate">
                          {item.crumb} — {item.s}
                        </div>
                      </div>
                    </div>
                    {item.n !== undefined && (
                      <span className="font-mono text-[11px] text-slate-light px-2 py-0.5 bg-sunk rounded border border-hair shrink-0">
                        {item.n} items
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredActions.length === 0 && filteredViews.length === 0 && (
            <div className="p-8 text-center text-slate">
              <Icon d={P.srch} s={24} className="mx-auto mb-2 text-slate-light" />
              <p className="font-semibold text-ink text-[14px]">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-[12.5px] text-slate-light mt-1">
                Try searching for &quot;instances&quot;, &quot;k8s&quot;, &quot;deploy&quot;, or &quot;billing&quot;.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-paper/80 border-t border-hair flex items-center justify-between text-[11.5px] text-slate-light">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div className="flex items-center gap-1 text-slate">
            <span className="w-2 h-2 rounded-full bg-ok animate-pulse" />
            <span>Region: Pune-1 (Active)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
