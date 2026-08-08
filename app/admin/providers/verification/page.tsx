"use client";

import React from "react";
import Link from "next/link";
import { useVerificationQueue, useAdminStats } from "@/hooks/use-admin";
import { useSetProviderVerificationStatus } from "@/hooks/use-providers";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import {
  IconShieldCheck,
  IconMail,
  IconClock,
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconChevronLeft,
  IconChevronRight,
  IconBox,
} from "@tabler/icons-react";

export default function AdminVerificationQueuePage() {
  const { data: queue, isLoading } = useVerificationQueue();
  const { data: stats } = useAdminStats();
  const setStatusMutation = useSetProviderVerificationStatus();

  const handleApprove = (id: string) => {
    setStatusMutation.mutate({ id, status: "approved" });
  };

  const handleReject = (id: string) => {
    setStatusMutation.mutate({ id, status: "rejected" });
  };

  const handleRequestAction = (id: string) => {
    setStatusMutation.mutate({ id, status: "action_required" });
  };

  if (isLoading) {
    return <p className="text-xs text-slate-400">Loading verification queue...</p>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Provider Verification Queue</h1>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mt-1">
            <Link href="/admin" className="text--brand hover:underline">Admin</Link>
            <span>&gt;</span>
            <span className="text-slate-600 font-bold">Licence Verification</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT INSPECTOR CARD & COMPLIANCE TIMELINE (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* MODERATION PROFILE CARD */}
          <div className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-xl shadow-blue-500/5">
            <div className="h-28 bg-linear-to-r from-[#2c89ff] via-[#1c6df3] to--brand-dark relative" />
            <div className="p-6 pt-0 text-center relative space-y-4">
              <div className="relative -mt-14 inline-block">
                <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden shadow-lg relative mx-auto bg-slate-100 flex items-center justify-center text--brand">
                  <IconShieldCheck className="h-12 w-12" />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900">National Compliance Desk</h2>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Government Registry Auditor</p>
                <div className="mt-2 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase">
                  {stats?.pendingVerification || 0} Pending Audits
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-50 text--brand flex items-center justify-center shrink-0">
                    <IconShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Verification Standard</span>
                    <span className="text-xs font-bold text-slate-800">State Registry + ABN Match</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-50 text--brand flex items-center justify-center shrink-0">
                    <IconMail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Moderation Email</span>
                    <span className="text-xs font-bold text-slate-800">verifications@myhitchconnect.com.au</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-50 text--brand flex items-center justify-center shrink-0">
                    <IconClock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Turnaround SLA</span>
                    <span className="text-xs font-bold text-slate-800">Under 2 Hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AUDIT STATUS TIMELINE */}
          <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl shadow-blue-500/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900">Audit Protocol Workflow</h3>
            </div>

            <div className="space-y-4 relative pl-3">
              <div className="flex items-start gap-3 relative">
                <div className="h-7 w-7 rounded-full bg-blue-100 text--brand flex items-center justify-center shrink-0 z-10 font-bold text-xs">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">ABN & Business Check</h4>
                  <p className="text-[11px] text-slate-400">Match ABR record against legal name.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 relative">
                <div className="h-7 w-7 rounded-full bg-blue-100 text--brand flex items-center justify-center shrink-0 z-10 font-bold text-xs">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Trade Licence Verification</h4>
                  <p className="text-[11px] text-slate-400">NSW Fair Trading / QBCC / VBA audit.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 relative">
                <div className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 z-10 font-bold text-xs">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Final Verification Badge</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT METRICS & QUEUE DATA TABLE (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* STAT METRICS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <IconClock className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">Urgent</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block">Pending Reviews</span>
                <span className="text-xl font-black text-amber-600">{stats?.pendingVerification || 0}</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <IconShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600">100%</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block">Approved Providers</span>
                <span className="text-xl font-black text-emerald-600">{stats?.approvedProviders || 0}</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-8 w-8 rounded-full bg-blue-100 text--brand flex items-center justify-center">
                  <IconBox className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-blue-100 text--brand">Active</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block">Active Listings</span>
                <span className="text-xl font-black text--brand">{stats?.activeListings || 0}</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-8 w-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                  <IconAlertTriangle className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-600">0</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block">Disputes Active</span>
                <span className="text-xl font-black text-rose-600">{stats?.disputedBookings || 0}</span>
              </div>
            </div>
          </div>

          {/* QUEUE DATA TABLE CARD */}
          <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl shadow-blue-500/5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">Provider Submissions & Applications</h3>
              <span className="text-xs font-bold text-slate-400">{queue?.length || 0} pending action</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-3"><input type="checkbox" className="rounded" /></th>
                    <th className="py-3 px-3">Business Name</th>
                    <th className="py-3 px-3 text--brand">Type</th>
                    <th className="py-3 px-3">Radius</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {queue?.map((provider) => (
                    <tr key={provider.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-3"><input type="checkbox" className="rounded" /></td>
                      <td className="py-3.5 px-3 font-bold text-slate-900">
                        <Link href={`/provider/${provider.id}`} className="hover:underline text--brand">
                          {provider.businessName}
                        </Link>
                      </td>
                      <td className="py-3.5 px-3 capitalize font-bold text-slate-600">
                        {provider.providerType.replace("_", " ")}
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-800">{provider.serviceRadiusKm} km</td>
                      <td className="py-3.5 px-3">
                        <StatusBadge status={provider.verificationStatus} />
                      </td>
                      <td className="py-3.5 px-3 text-right space-x-2">
                        <Button
                          size="sm"
                          className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1 shadow-xs h-8 px-3"
                          onClick={() => handleApprove(provider.id)}
                        >
                          <IconCheck className="h-3.5 w-3.5" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full text-amber-700 border-amber-300 hover:bg-amber-50 font-bold text-xs gap-1 h-8 px-3"
                          onClick={() => handleRequestAction(provider.id)}
                        >
                          <IconAlertTriangle className="h-3.5 w-3.5" /> Action
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="rounded-full font-bold text-xs gap-1 shadow-xs h-8 px-3"
                          onClick={() => handleReject(provider.id)}
                        >
                          <IconX className="h-3.5 w-3.5" /> Reject
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION BAR */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold text-slate-400">
              <span>Showing {queue?.length || 0} of {queue?.length || 0} applications</span>
              <div className="flex items-center gap-1">
                <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><IconChevronLeft className="h-4 w-4" /></button>
                <button className="h-7 w-7 rounded-lg bg-[#1b76ff] text-white font-bold flex items-center justify-center shadow-xs">1</button>
                <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><IconChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
