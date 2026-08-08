"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useAdminStats,
  useVerificationQueue,
  useBookingsPaymentsOverview,
} from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { ExportAuditDesk } from "@/components/admin/export-audit-desk";
import {
  IconBox,
  IconUsers,
  IconShieldCheck,
  IconTrendingUp,
  IconFileExport,
  IconSearch,
  IconChevronDown,
  IconChevronRight,
  IconFolder,
  IconCalendar,
  IconSparkles,
} from "@tabler/icons-react";

export default function AdminOverviewPage() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: queue, isLoading: queueLoading } = useVerificationQueue();
  const { data: bookingsOverview, isLoading: bookingsLoading } = useBookingsPaymentsOverview();

  const [taskSearch, setTaskSearch] = useState("");
  const [bookingSearch, setBookingSearch] = useState("");

  // Both header buttons lead to the same section; the focus target differs so
  // the keyboard lands on the control you actually asked for.
  const scrollToDesk = (focus: "export" | "audit") => {
    const section = document.getElementById("export-audit-desk");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });

    const targetId = focus === "export" ? "export-dataset-heading" : "audit-search";
    window.setTimeout(() => {
      document.getElementById(targetId)?.focus({ preventScroll: true });
    }, 400);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Filter verification queue for "Today's Tasks" section
  const filteredQueue = (queue || [])
    .filter((item) =>
      item.businessName.toLowerCase().includes(taskSearch.toLowerCase())
    )
    .slice(0, 5);

  // Filter bookings for "Today's Bookings" section
  const filteredBookings = (bookingsOverview || [])
    .filter((item) =>
      item.booking.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      item.provider?.businessName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      item.customer?.name.toLowerCase().includes(bookingSearch.toLowerCase())
    )
    .slice(0, 4);

  return (
    <div className="space-y-6 text-slate-800">
      {/* HEADER: Welcome Back */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome back, Admin!</h1>
          <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold text-slate-500">
            <span className="px-3 py-1.5 rounded-full border border-slate-200 bg-white">
              <strong className="text-slate-800 font-extrabold">{stats?.pendingVerification || 0}</strong> Audits Pending
            </span>
            <span className="px-3 py-1.5 rounded-full border border-slate-200 bg-white">
              <strong className="text-slate-800 font-extrabold">{stats?.disputedBookings || 0}</strong> Disputes Active
            </span>
            <span className="px-3 py-1.5 rounded-full border border-slate-200 bg-white">
              <strong className="text-slate-800 font-extrabold">{stats?.reportedReviews || 0}</strong> Reported Reviews
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scrollToDesk("export")}
            className="rounded-full border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs gap-1.5 h-10 px-4"
          >
            <IconFileExport className="h-4 w-4 text-slate-500" />
            <span>Export</span>
          </Button>
          <Button
            size="sm"
            onClick={() => scrollToDesk("audit")}
            className="rounded-full bg-[#1b76ff] hover:bg-[#145ed8] text-white font-bold text-xs gap-1.5 h-10 px-4 shadow-md shadow-blue-500/20"
          >
            <IconSparkles className="h-4 w-4" />
            <span>Audit Desk</span>
          </Button>
        </div>
      </div>

      {/* METRICS ROW (4 Cards with Sparklines) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL REVENUE */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1 z-10">
            <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Total Revenue</span>
            <span className="text-2xl font-black text-slate-900 block leading-none">
              {statsLoading ? "..." : formatCurrency(stats?.totalRevenue || 0)}
            </span>
            <span className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-0.5">
              +15% <span className="text-slate-400 font-semibold">vs last month</span>
            </span>
          </div>
          <div className="shrink-0 w-24 h-12 flex items-center justify-end">
            <svg viewBox="0 0 100 30" className="w-20 h-10 stroke-emerald-500" strokeWidth="2.5" fill="none">
              <path d="M0,25 Q15,35 30,10 T60,30 T90,5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* ACTIVE LISTINGS */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1 z-10">
            <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Active Listings</span>
            <span className="text-2xl font-black text-slate-900 block leading-none">
              {statsLoading ? "..." : stats?.activeListings || 0}
            </span>
            <span className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-0.5">
              +5 <span className="text-slate-400 font-semibold">vs last month</span>
            </span>
          </div>
          <div className="shrink-0 w-24 h-12 flex items-center justify-end">
            <svg viewBox="0 0 100 30" className="w-20 h-10 stroke-blue-500" strokeWidth="2.5" fill="none">
              <path d="M0,15 Q20,5 40,25 T80,8 T100,2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* TOTAL PROVIDERS */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1 z-10">
            <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Total Providers</span>
            <span className="text-2xl font-black text-slate-900 block leading-none">
              {statsLoading ? "..." : stats?.totalProviders || 0}
            </span>
            <span className="text-[10px] text-rose-600 font-extrabold flex items-center gap-0.5">
              -1 <span className="text-slate-400 font-semibold">vs last month</span>
            </span>
          </div>
          <div className="shrink-0 w-24 h-12 flex items-center justify-end">
            <svg viewBox="0 0 100 30" className="w-20 h-10 stroke-rose-500" strokeWidth="2.5" fill="none">
              <path d="M0,5 Q25,25 50,15 T100,28" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* COMPLIANCE QUEUE */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1 z-10">
            <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">In Reviews</span>
            <span className="text-2xl font-black text-slate-900 block leading-none">
              {statsLoading ? "..." : stats?.pendingVerification || 0}
            </span>
            <span className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-0.5">
              +12 <span className="text-slate-400 font-semibold">vs last month</span>
            </span>
          </div>
          <div className="shrink-0 w-24 h-12 flex items-center justify-end">
            <svg viewBox="0 0 100 30" className="w-20 h-10 stroke-emerald-500" strokeWidth="2.5" fill="none">
              <path d="M0,28 Q20,10 40,22 T80,5 T100,12" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* MIDDLE ROW (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Today's Tasks (Verification Queue) */}
        <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
              <h3 className="font-extrabold text-base text-slate-900">Today's Audits</h3>
              <div className="flex items-center gap-2">
                <div className="relative w-40 sm:w-48">
                  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <Input
                    placeholder="Search..."
                    value={taskSearch}
                    onChange={(e) => setTaskSearch(e.target.value)}
                    className="h-8 border border-slate-200 bg-slate-50 !pl-8 text-[11px] font-semibold text-slate-800 rounded-full focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-[#2b89ff]"
                  />
                </div>
              </div>
            </div>

            {queueLoading ? (
              <p className="text-xs text-slate-400">Loading audits...</p>
            ) : filteredQueue.length === 0 ? (
              <p className="text-xs text-slate-400">No audits found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <th className="py-2.5 px-2">Provider Name</th>
                      <th className="py-2.5 px-2">Type</th>
                      <th className="py-2.5 px-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {filteredQueue.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-2">
                          <Link href={`/provider/${item.id}`} className="hover:underline text-[#2b89ff] font-bold">
                            {item.businessName}
                          </Link>
                        </td>
                        <td className="py-3 px-2">
                          <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 font-extrabold uppercase">
                            <IconFolder className="h-3.5 w-3.5 text-[#2b89ff]/70" />
                            <span>{item.providerType.replace("_", " ")}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <StatusBadge status={item.verificationStatus} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Link href="/admin/providers/verification" className="text-xs font-bold text-[#1b76ff] hover:underline flex items-center gap-0.5">
              <span>View Verification Queue</span>
              <IconChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Performance Volume */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">Performance</h3>
            <div className="relative">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-[10px] font-bold text-slate-600 hover:bg-slate-50">
                <span>This Week</span>
                <IconChevronDown className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-3xl font-black text-slate-900 block leading-none">
              {statsLoading ? "..." : formatCurrency(stats?.totalRevenue || 0)}
            </span>
            <span className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-0.5">
              +15% <span className="text-slate-400 font-semibold">vs last month</span>
            </span>
          </div>

          {/* Graphical rounded bar charts */}
          <div className="flex justify-between items-end h-40 pt-4 relative">
            {/* Monday */}
            <div className="flex flex-col items-center flex-1 space-y-1.5">
              <span className="text-[8px] font-extrabold text-slate-400">+57%</span>
              <div className="w-5 bg-slate-50 border border-slate-100 rounded-full h-20 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-slate-100 h-10 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-slate-400">Mon</span>
            </div>

            {/* Tuesday */}
            <div className="flex flex-col items-center flex-1 space-y-1.5">
              <span className="text-[8px] font-extrabold text-rose-500">-34%</span>
              <div className="w-5 bg-slate-50 border border-slate-100 rounded-full h-20 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-slate-100 h-6 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-slate-400">Tue</span>
            </div>

            {/* Wednesday (Hovered/Active) */}
            <div className="flex flex-col items-center flex-1 space-y-1.5 relative">
              {/* Tooltip Card */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white shadow-xl rounded-xl p-2 text-center z-10 whitespace-nowrap space-y-0.5 pointer-events-none">
                <span className="text-[9px] font-bold block text-slate-300">Cleaning Bookings</span>
                <span className="text-[10px] font-black block text-white">Value: $14,200</span>
              </div>
              <span className="text-[8px] font-extrabold text-[#1b76ff]">+21%</span>
              <div className="w-5 bg-slate-50 border border-slate-100 rounded-full h-20 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0946cd] to-[#1b76ff] h-16 rounded-full" />
              </div>
              <span className="text-[9px] font-extrabold text-slate-800">Wed</span>
            </div>

            {/* Thursday */}
            <div className="flex flex-col items-center flex-1 space-y-1.5">
              <span className="text-[8px] font-extrabold text-slate-400">-15%</span>
              <div className="w-5 bg-slate-50 border border-slate-100 rounded-full h-20 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-slate-100 h-8 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-slate-400">Thu</span>
            </div>

            {/* Friday */}
            <div className="flex flex-col items-center flex-1 space-y-1.5">
              <span className="text-[8px] font-extrabold text-slate-400">+73%</span>
              <div className="w-5 bg-slate-50 border border-slate-100 rounded-full h-20 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-slate-100 h-14 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-slate-400">Fri</span>
            </div>

            {/* Saturday */}
            <div className="flex flex-col items-center flex-1 space-y-1.5">
              <span className="text-[8px] font-extrabold text-rose-500">-49%</span>
              <div className="w-5 bg-slate-50 border border-slate-100 rounded-full h-20 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-slate-100 h-4 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-slate-400">Sat</span>
            </div>

            {/* Sunday */}
            <div className="flex flex-col items-center flex-1 space-y-1.5">
              <span className="text-[8px] font-extrabold text-slate-400">+88%</span>
              <div className="w-5 bg-slate-50 border border-slate-100 rounded-full h-20 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-slate-100 h-18 rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-slate-400">Sun</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Today's Tasks -> Platform Bookings */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl shadow-blue-500/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">Platform Bookings</h3>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Live service transactions audit log.</p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search bookings, providers..."
              value={bookingSearch}
              onChange={(e) => setBookingSearch(e.target.value)}
              className="h-9 border border-slate-200 bg-slate-50 !pl-10 text-xs font-semibold text-slate-800 rounded-full focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-[#2b89ff]"
            />
          </div>
        </div>

        {bookingsLoading ? (
          <p className="text-xs text-slate-400">Loading bookings...</p>
        ) : filteredBookings.length === 0 ? (
          <p className="text-xs text-slate-400">No bookings matching criteria.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Service Booking ID</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Verification Progress</th>
                  <th className="py-3 px-3">Total Cost</th>
                  <th className="py-3 px-3 text-right">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {filteredBookings.map((item) => {
                  const statusColors =
                    item.booking.status === "completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : item.booking.status === "disputed"
                        ? "bg-rose-50 text-rose-700"
                        : "bg-blue-50 text-blue-700";

                  const progressVal = item.booking.status === "completed" ? 100 : 30;

                  return (
                    <tr key={item.booking.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-xl bg-blue-50 text-[#1b76ff] flex items-center justify-center shrink-0">
                            <IconFolder className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="font-extrabold text-slate-900 block">{item.booking.id}</span>
                            <span className="text-[10px] text-[#1b76ff] block font-extrabold">
                              {item.provider?.businessName || "General Provider"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${statusColors}`}>
                          {item.booking.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden shrink-0">
                            <div
                              className="h-full bg-gradient-to-r from-[#1b76ff] to-[#0946cd] rounded-full transition-all duration-300"
                              style={{ width: `${progressVal}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">{progressVal}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-800">
                        {formatCurrency(item.booking.breakdown.total)}
                      </td>
                      <td className="py-3.5 px-3 text-right text-slate-400 font-bold text-[10px]">
                        <span className="inline-flex items-center gap-1">
                          <IconCalendar className="h-3.5 w-3.5" />
                          {new Date(item.booking.createdAt).toLocaleDateString("en-AU", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EXPORT & AUDIT DESK */}
      <ExportAuditDesk id="export-audit-desk" />
    </div>
  );
}
