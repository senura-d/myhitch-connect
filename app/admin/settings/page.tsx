"use client";

import React, { useState } from "react";
import Link from "next/link";
import { resetStore } from "@/lib/mock-api/store";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IconSettings,
  IconRefresh,
  IconShield,
  IconBell,
  IconPercentage,
  IconAlertTriangle,
} from "@tabler/icons-react";

export default function AdminSettingsPage() {
  const queryClient = useQueryClient();
  const [maintenance, setMaintenance] = useState(false);
  const [autoVerify, setAutoVerify] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [commissionRate, setCommissionRate] = useState("8.0");
  const [isResetting, setIsResetting] = useState(false);

  const handleResetDb = () => {
    if (
      confirm(
        "WARNING: This will reset the in-memory mock database store back to its default seed data. All local additions, license verification approvals, and profile updates will be reverted. Continue?"
      )
    ) {
      setIsResetting(true);
      resetStore();
      queryClient.clear();
      setTimeout(() => {
        setIsResetting(false);
        alert("Mock database store has been reset to defaults!");
        window.location.reload();
      }, 800);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Platform Settings</h1>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mt-1">
            <Link href="/admin" className="text--brand hover:underline">Admin</Link>
            <span>&gt;</span>
            <span className="text-slate-600 font-bold">Platform Settings</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COMPLIANCE & VERIFICATION CONTROLS (Left 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          {/* GENERAL SYSTEM TOGGLES */}
          <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl shadow-blue-500/5 space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <IconShield className="h-5 w-5 text-[#1b76ff]" />
              <h3 className="font-extrabold text-base text-slate-900">Governance & Security Controls</h3>
            </div>

            <div className="space-y-4">
              {/* MAINTENANCE MODE */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Maintenance Triage Mode</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Toggles public landing to maintenance template</span>
                </div>
                <input
                  type="checkbox"
                  checked={maintenance}
                  onChange={(e) => setMaintenance(e.target.checked)}
                  className="rounded h-4 w-4 border-slate-300 text-[#1b76ff] focus:ring-[#1b76ff] cursor-pointer"
                />
              </div>

              {/* AUTO VERIFY LICENSE */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Automate Licensing Verification</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Instantly auto-approves NSW/QLD provider trade checks</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoVerify}
                  onChange={(e) => setAutoVerify(e.target.checked)}
                  className="rounded h-4 w-4 border-slate-300 text-[#1b76ff] focus:ring-[#1b76ff] cursor-pointer"
                />
              </div>

              {/* EMAIL NOTIFICATION TOGGLE */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">Dispatch Auditing email alerts</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Mail out automated receipts for license re-evaluations</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="rounded h-4 w-4 border-slate-300 text-[#1b76ff] focus:ring-[#1b76ff] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* FINANCIAL SETTINGS */}
          <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl shadow-blue-500/5 space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <IconPercentage className="h-5 w-5 text-[#1b76ff]" />
              <h3 className="font-extrabold text-base text-slate-900">Financial Brokerage Commissions</h3>
            </div>

            <div className="space-y-4 max-w-xs">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 block">Base Platform Commission (%)</label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="50"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                    className="h-10 border border-slate-200 bg-slate-50 font-mono text-xs font-bold text-slate-800 rounded-full focus-visible:bg-white focus-visible:ring-1 focus-visible:ring--brand"
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">
                  Applicable charge on all completed provider booking totals.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* DATABASE UTILITIES (Right 1 column) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl shadow-blue-500/5 space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2 text-rose-600">
              <IconAlertTriangle className="h-5 w-5" />
              <h3 className="font-extrabold text-base text-slate-900">Dangerous Actions</h3>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                Resetting the in-memory database will scrub all live testing mutations, profile adjustments, deleted listings, and status changes, resetting back to taxonomy seeds.
              </p>

              <Button
                variant="destructive"
                className="w-full font-bold text-xs gap-2 rounded-full h-10 shadow-md shadow-red-500/10"
                onClick={handleResetDb}
                disabled={isResetting}
              >
                <IconRefresh className={`h-4 w-4 ${isResetting ? "animate-spin" : ""}`} />
                <span>{isResetting ? "Reverting store..." : "Reset Mock Database"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
