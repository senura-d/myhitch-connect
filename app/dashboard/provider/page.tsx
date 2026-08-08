"use client";

import React from "react";
import Image from "next/image";
import { useBookingsForProvider } from "@/hooks/use-bookings";
import { useProvider } from "@/hooks/use-providers";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconBox,
  IconId,
  IconMail,
  IconPhone,
  IconMapPin,
  IconClock,
  IconRefresh,
  IconTruck,
  IconEye,
  IconPencil,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconWallet,
  IconShoppingBag,
  IconCircleCheck,
  IconStar,
  IconSparkles,
  IconShieldCheck,
  IconSearch,
  IconDownload,
  IconPlus,
  IconUsers,
  IconCheckbox,
  IconLayoutDashboard,
  IconHelpCircle,
  IconSettings,
} from "@tabler/icons-react";

export default function ProviderOverviewPage() {
  const { data: provider } = useProvider("prov-01");
  const { data: bookings } = useBookingsForProvider("prov-01");

  return (
    <>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Overview</h1>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Your business at a glance — jobs, earnings and verification standing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT PROFILE & STATUS COLUMN (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* PROVIDER PROFILE CARD */}
            <div className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-xl shadow-blue-500/5">
              <div className="h-28 bg-linear-to-r from-[#2c89ff] via-[#1c6df3] to--brand-dark relative" />
              <div className="p-6 pt-0 text-center relative space-y-4">
                <div className="relative -mt-14 inline-block">
                  <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden shadow-lg relative mx-auto bg-slate-100">
                    <Image
                      src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80"
                      alt={provider?.businessName || "Provider Logo"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-black text-slate-900">{provider?.businessName || "Sydney Express Plumbing"}</h2>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">Licence: NSW-PL-883921</p>
                  <div className="mt-2 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-blue-100 text--brand text-[10px] font-extrabold uppercase">
                    ⭐ {provider?.ratingAverage.toFixed(1) || "5.0"} ({provider?.ratingCount || 48} Reviews)
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 text--brand flex items-center justify-center shrink-0">
                      <IconId className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">ABN Registration</span>
                      <span className="text-xs font-bold text-slate-800">ABN 94 883 291 002</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 text--brand flex items-center justify-center shrink-0">
                      <IconMail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Business Email</span>
                      <span className="text-xs font-bold text-slate-800">contact@sydneyexpressplumbing.com.au</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 text--brand flex items-center justify-center shrink-0">
                      <IconPhone className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Dispatch Phone</span>
                      <span className="text-xs font-bold text-slate-800">1300 000 882</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 text--brand flex items-center justify-center shrink-0">
                      <IconMapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Service Area Radius</span>
                      <span className="text-xs font-semibold text-slate-700">Sydney Metropolitan (35 km)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TIMELINE AUDIT STATUS */}
            <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl shadow-blue-500/5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900">Verification Audit Status</h3>
                <span className="text-xs font-bold text--brand hover:underline cursor-pointer">View Certificate</span>
              </div>

              <div className="space-y-4 relative pl-3">
                <div className="flex items-start gap-3 relative">
                  <div className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 z-10 font-bold text-xs">
                    <IconCircleCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Trade Licence Verified</h4>
                    <p className="text-[11px] text-slate-400">NSW Fair Trading database check complete.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 relative">
                  <div className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 z-10 font-bold text-xs">
                    <IconShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Public Liability Covered</h4>
                    <p className="text-[11px] text-slate-400">$10M Policy Active through Dec 2026.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 relative">
                  <div className="h-7 w-7 rounded-full bg-blue-100 text--brand flex items-center justify-center shrink-0 z-10 font-bold text-xs">
                    <IconStar className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Gold Provider Badge</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT METRICS & CLIENT BOOKINGS TABLE (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 4 STAT METRICS CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <IconWallet className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600">+18%</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">Total Earnings</span>
                  <span className="text-xl font-black text-slate-900">$4,850.00</span>
                </div>
              </div>

              <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-full bg-blue-100 text--brand flex items-center justify-center">
                    <IconShoppingBag className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600">+12%</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">Active Bookings</span>
                  <span className="text-xl font-black text-slate-900">{bookings?.length || 2}</span>
                </div>
              </div>

              <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center">
                    <IconCircleCheck className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600">+100%</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">Completed Jobs</span>
                  <span className="text-xl font-black text-slate-900">48</span>
                </div>
              </div>

              <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <IconStar className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600">5.0★</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">Rating Average</span>
                  <span className="text-xl font-black text-slate-900">4.9★</span>
                </div>
              </div>
            </div>

            {/* CLIENT BOOKINGS TABLE CARD */}
            <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl shadow-blue-500/5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-base text-slate-900">Incoming Client Bookings & Jobs</h3>
                <span className="text-xs font-bold text-slate-400">{bookings?.length || 0} active</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-3"><input type="checkbox" className="rounded" /></th>
                      <th className="py-3 px-3">Service Title</th>
                      <th className="py-3 px-3 text--brand">Booking ID</th>
                      <th className="py-3 px-3">Client</th>
                      <th className="py-3 px-3">Scheduled Date</th>
                      <th className="py-3 px-3">Payout Price</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {bookings?.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-3"><input type="checkbox" className="rounded" /></td>
                        <td className="py-3.5 px-3 font-bold text-slate-900 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-slate-100 border border-slate-200 shrink-0 relative overflow-hidden">
                            <Image
                              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=100&q=80"
                              alt="Service"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="block truncate max-w-35">Emergency Plumbing Repair</span>
                            <span className="text-[10px] text-slate-400 font-semibold">Standard Booking</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text--brand">#{b.id}</td>
                        <td className="py-3.5 px-3 text-slate-700 font-bold">{b.customerId}</td>
                        <td className="py-3.5 px-3 text-slate-500 font-medium">{new Date(b.scheduledAt).toLocaleDateString()}</td>
                        <td className="py-3.5 px-3 font-extrabold text-slate-900">${b.breakdown.total}</td>
                        <td className="py-3.5 px-3">
                          <StatusBadge status={b.status} />
                        </td>
                        <td className="py-3.5 px-3 text-right space-x-1.5">
                          <button className="p-1 text-slate-400 hover:text--brand transition-colors"><IconEye className="h-4 w-4" /></button>
                          <button className="p-1 text-slate-400 hover:text-amber-600 transition-colors"><IconPencil className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION BAR */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold text-slate-400">
                <span>Showing 1-5 of 12 bookings</span>
                <div className="flex items-center gap-1">
                  <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><IconChevronLeft className="h-4 w-4" /></button>
                  <button className="h-7 w-7 rounded-lg bg-[#1b76ff] text-white font-bold flex items-center justify-center shadow-xs">1</button>
                  <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">2</button>
                  <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><IconChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
