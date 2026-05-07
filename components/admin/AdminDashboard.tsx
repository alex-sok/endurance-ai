"use client";

import { MonoLabel } from "@/components/ui/MonoLabel";

export default function AdminDashboard() {
  return (
    <div className="space-y-3">

      <a
        href="/admin/portals/new"
        className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-[#e6e5e0]/60"
        style={{ border: "1px solid #262510", borderRadius: "4px", background: "#262510" }}
      >
        <div>
          <p className="text-sm font-medium" style={{ letterSpacing: "-0.025em", color: "#f7f7f4" }}>
            New Portal
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#9a9991" }}>Create a new client portal</p>
        </div>
        <MonoLabel style={{ color: "#f7f7f4" }}>→</MonoLabel>
      </a>

      <a
        href="/admin/portals"
        className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-surface/50"
        style={{ border: "1px solid #e6e5e0", borderRadius: "4px" }}
      >
        <div>
          <p className="text-sm font-medium text-ink" style={{ letterSpacing: "-0.025em" }}>
            Client Portals
          </p>
          <p className="text-xs mt-0.5 text-muted-ash">Edit existing portals</p>
        </div>
        <MonoLabel>→</MonoLabel>
      </a>

      <a
        href="/admin/analytics"
        className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-surface/50"
        style={{ border: "1px solid #e6e5e0", borderRadius: "4px" }}
      >
        <div>
          <p className="text-sm font-medium text-ink" style={{ letterSpacing: "-0.025em" }}>
            Analytics
          </p>
          <p className="text-xs mt-0.5 text-muted-ash">Sessions, time, sections viewed</p>
        </div>
        <MonoLabel>→</MonoLabel>
      </a>

      <a
        href="/admin/ops"
        className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-surface/50"
        style={{ border: "1px solid #e6e5e0", borderRadius: "4px" }}
      >
        <div>
          <p className="text-sm font-medium text-ink" style={{ letterSpacing: "-0.025em" }}>
            Operations
          </p>
          <p className="text-xs mt-0.5 text-muted-ash">System health, leads, activity</p>
        </div>
        <MonoLabel>→</MonoLabel>
      </a>

      <a
        href="/admin/pricing"
        className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-surface/50"
        style={{ border: "1px solid #e6e5e0", borderRadius: "4px" }}
      >
        <div>
          <p className="text-sm font-medium text-ink" style={{ letterSpacing: "-0.025em" }}>
            Services & Pricing
          </p>
          <p className="text-xs mt-0.5 text-muted-ash">Offerings, tiers, descriptions</p>
        </div>
        <MonoLabel>→</MonoLabel>
      </a>

    </div>
  );
}
