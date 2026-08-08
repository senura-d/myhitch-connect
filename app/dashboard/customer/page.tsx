"use client";

import React from "react";
import Image from "next/image";
import { useBookingsForCustomer } from "@/hooks/use-bookings";
import { useQuotesForCustomer } from "@/hooks/use-quotes";
import { useSession } from "@/lib/mock-api/session";
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
  IconSearch,
  IconDownload,
  IconPlus,
} from "@tabler/icons-react";

export default function CustomerOverviewPage() {
  const { session } = useSession();
  const user = session?.user;

  const customerId = user?.id || "user-cust-01";
  const { data: bookings } = useBookingsForCustomer(customerId);
  const { data: quotes } = useQuotesForCustomer(customerId);

  return (
    <>
        {/* TITLE & BREADCRUMB */}
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Overview</h1>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Your account at a glance — recent activity, spend and upcoming work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT PROFILE & ORDER STATUS COLUMN (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* PROFILE CARD */}
            <div className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-xl shadow-blue-500/5">
              <div className="h-28 bg-linear-to-r from-[#2c89ff] via-[#1c6df3] to-brand-dark relative" />
              <div className="p-6 pt-0 text-center relative space-y-4">
                <div className="relative -mt-14 inline-block">
                  <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden shadow-lg relative mx-auto bg-slate-200">
                    {user?.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                        alt="Linda Blair"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-black text-slate-900">{user?.name || "Linda Blair"}</h2>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">{user?.username || "@linda_blair321"}</p>
                  {(user?.isPremium ?? true) && (
                    <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold uppercase">
                      Premium Member
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 text--brand flex items-center justify-center shrink-0">
                      <IconId className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">User ID</span>
                      <span className="text-xs font-bold text-slate-800">
                        {user?.id === "user-cust-01" ? "ID-011221" : (user?.id || "ID-011221")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 text--brand flex items-center justify-center shrink-0">
                      <IconMail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Billing Email</span>
                      <span className="text-xs font-bold text-slate-800">{user?.email || "lindablair@mail.com"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 text--brand flex items-center justify-center shrink-0">
                      <IconPhone className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Phone Number</span>
                      <span className="text-xs font-bold text-slate-800">{user?.phone || "050 414 8778"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 text--brand flex items-center justify-center shrink-0">
                      <IconMapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Delivery Address</span>
                      <span className="text-xs font-semibold text-slate-700 leading-snug">
                        {user?.address || "1833 Bel Meadow Drive, Fontana, California 92335, USA"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 text--brand flex items-center justify-center shrink-0">
                      <IconClock className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Latest Transaction</span>
                      <span className="text-xs font-bold text-slate-800">12 December 2022</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ORDER STATUS TIMELINE CARD */}
            <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl shadow-blue-500/5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900">Order Status</h3>
                <span className="text-xs font-bold text--brand hover:underline cursor-pointer">Detail</span>
              </div>

              <div className="space-y-4 relative pl-3">
                <div className="flex items-start gap-3 relative">
                  <div className="h-7 w-7 rounded-full bg-blue-100 text--brand flex items-center justify-center shrink-0 z-10 font-bold text-xs">
                    <IconShoppingBag className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Order Placed</h4>
                    <p className="text-[11px] text-slate-400">An order has been placed.</p>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">12/12/2022, 03:00</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 relative">
                  <div className="h-7 w-7 rounded-full bg-blue-100 text--brand flex items-center justify-center shrink-0 z-10 font-bold text-xs">
                    <IconRefresh className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Processing</h4>
                    <p className="text-[11px] text-slate-400">Seller has processed your order.</p>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">12/12/2022, 03:15</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 relative opacity-60">
                  <div className="h-7 w-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 z-10 font-bold text-xs">
                    <IconBox className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">Packed</h4>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">DD/MM/YY, 00:00</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 relative opacity-60">
                  <div className="h-7 w-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 z-10 font-bold text-xs">
                    <IconTruck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">Shipping</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT METRICS & DATA TABLE COLUMN (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 4 STAT METRIC CARDS ROW */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <IconWallet className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-600">-25%</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">Total Balance</span>
                  <span className="text-xl font-black text-slate-900">$723.00</span>
                </div>
              </div>

              <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <IconShoppingBag className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600">+10%</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">Total Orders</span>
                  <span className="text-xl font-black text-slate-900">1,296</span>
                </div>
              </div>

              <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center">
                    <IconCircleCheck className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600">+10%</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">Order successful</span>
                  <span className="text-xl font-black text-slate-900">1290</span>
                </div>
              </div>

              <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-full bg-blue-100 text--brand flex items-center justify-center">
                    <IconStar className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600">+10%</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">Rewards Point</span>
                  <span className="text-xl font-black text-slate-900">1400</span>
                </div>
              </div>
            </div>

            {/* DATA TABLE CARD */}
            <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl shadow-blue-500/5 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-3"><input type="checkbox" className="rounded" /></th>
                      <th className="py-3 px-3">Product / Service</th>
                      <th className="py-3 px-3 text--brand">SKU</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Stock</th>
                      <th className="py-3 px-3">Price</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Added</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {bookings?.map((b, idx) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-3"><input type="checkbox" className="rounded" /></td>
                        <td className="py-3.5 px-3 font-bold text-slate-900 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-slate-100 border border-slate-200 shrink-0 relative overflow-hidden">
                            <Image
                              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=100&q=80"
                              alt="Service"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="block truncate max-w-35">Service Booking #{b.id}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">2 Variants</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text--brand">302012</td>
                        <td className="py-3.5 px-3 text-slate-600 font-medium">Trade & Repairs</td>
                        <td className="py-3.5 px-3 font-bold text-slate-800">10</td>
                        <td className="py-3.5 px-3 font-extrabold text-slate-900">${b.breakdown.total}</td>
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-700">
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-slate-400 font-semibold">{new Date(b.createdAt).toLocaleDateString()}</td>
                        <td className="py-3.5 px-3 text-right space-x-1.5">
                          <button className="p-1 text-slate-400 hover:text--brand transition-colors"><IconEye className="h-4 w-4" /></button>
                          <button className="p-1 text-slate-400 hover:text-amber-600 transition-colors"><IconPencil className="h-4 w-4" /></button>
                          <button className="p-1 text-slate-400 hover:text-rose-600 transition-colors"><IconTrash className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}

                    {/* Mock Rows to Match Reference Layout */}
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-3"><input type="checkbox" className="rounded" /></td>
                      <td className="py-3.5 px-3 font-bold text-slate-900 flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-slate-100 border border-slate-200 shrink-0 relative overflow-hidden">
                          <Image
                            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=100&q=80"
                            alt="Plumbing"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="block truncate max-w-35">Emergency Plumbing Repair</span>
                          <span className="text-[10px] text-slate-400 font-semibold">3 Variants</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text--brand">302011</td>
                      <td className="py-3.5 px-3 text-slate-600 font-medium">Plumbing</td>
                      <td className="py-3.5 px-3 font-bold text-slate-800">204</td>
                      <td className="py-3.5 px-3 font-extrabold text-slate-900">$590.00</td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-700">
                          Published
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-400 font-semibold">24 Dec 2022</td>
                      <td className="py-3.5 px-3 text-right space-x-1.5">
                        <button className="p-1 text-slate-400 hover:text--brand transition-colors"><IconEye className="h-4 w-4" /></button>
                        <button className="p-1 text-slate-400 hover:text-amber-600 transition-colors"><IconPencil className="h-4 w-4" /></button>
                        <button className="p-1 text-slate-400 hover:text-rose-600 transition-colors"><IconTrash className="h-4 w-4" /></button>
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-3"><input type="checkbox" className="rounded" /></td>
                      <td className="py-3.5 px-3 font-bold text-slate-900 flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-slate-100 border border-slate-200 shrink-0 relative overflow-hidden">
                          <Image
                            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=100&q=80"
                            alt="Electrical"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="block truncate max-w-35">Safety Switch Installation</span>
                          <span className="text-[10px] text-slate-400 font-semibold">1 Variant</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text--brand">302002</td>
                      <td className="py-3.5 px-3 text-slate-600 font-medium">Electrical</td>
                      <td className="py-3.5 px-3 font-bold text-slate-800">48</td>
                      <td className="py-3.5 px-3 font-extrabold text-slate-900">$125.00</td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-600">
                          Draft
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-400 font-semibold">12 Dec 2022</td>
                      <td className="py-3.5 px-3 text-right space-x-1.5">
                        <button className="p-1 text-slate-400 hover:text--brand transition-colors"><IconEye className="h-4 w-4" /></button>
                        <button className="p-1 text-slate-400 hover:text-amber-600 transition-colors"><IconPencil className="h-4 w-4" /></button>
                        <button className="p-1 text-slate-400 hover:text-rose-600 transition-colors"><IconTrash className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* PAGINATION BAR */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold text-slate-400">
                <span>Showing 1-10 from 100</span>
                <div className="flex items-center gap-1">
                  <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><IconChevronLeft className="h-4 w-4" /></button>
                  <button className="h-7 w-7 rounded-lg bg-[#1b76ff] text-white font-bold flex items-center justify-center shadow-xs">1</button>
                  <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">2</button>
                  <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">3</button>
                  <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">4</button>
                  <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">5</button>
                  <span>...</span>
                  <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><IconChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
