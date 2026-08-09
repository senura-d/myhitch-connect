"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAllListings, useDeleteListingAdmin } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  IconBox,
  IconSearch,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
} from "@tabler/icons-react";

export default function AdminListingsPage() {
  const { data: listings, isLoading } = useAllListings();
  const deleteMutation = useDeleteListingAdmin();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service listing? This action cannot be undone.")) {
      deleteMutation.mutate(id);
    }
  };

  const filtered = (listings || []).filter((item) => {
    const matchesSearch =
      item.listing.title.toLowerCase().includes(search.toLowerCase()) ||
      item.provider?.businessName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || item.listing.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">All Service Listings</h1>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mt-1">
            <Link href="/admin" className="text-brand hover:underline">Admin</Link>
            <span>&gt;</span>
            <span className="text-slate-600 font-bold">Listings</span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search service title, provider..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 border border-slate-200 bg-slate-50 pl-10! text-xs font-semibold text-slate-800 rounded-full focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-brand"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap">Filter Status:</span>
          <div className="relative w-full sm:w-40">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-10 pl-4 pr-10 border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 rounded-full appearance-none focus:outline-none focus:ring-1 focus:ring-brand cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="draft">Draft</option>
            </select>
            <IconChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl shadow-blue-500/5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-base text-slate-900">Platform Listings</h3>
          <span className="text-xs font-bold text-slate-400">{filtered.length} total listings</span>
        </div>

        {isLoading ? (
          <p className="text-xs text-slate-400">Loading service listings...</p>
        ) : filtered.length === 0 ? (
          <p className="text-xs text-slate-400">No listings found matching criteria.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Service Title</th>
                  <th className="py-3 px-3">Provider</th>
                  <th className="py-3 px-3">Pricing</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {filtered.map((item) => (
                  <tr key={item.listing.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-lg bg-blue-50 text-[#24a1dc] flex items-center justify-center shrink-0">
                          <IconBox className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{item.listing.title}</span>
                          <span className="text-[10px] text-slate-400 capitalize">{item.listing.deliveryMode}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      {item.provider ? (
                        <Link href={`/provider/${item.provider.id}`} className="hover:underline text-brand font-bold">
                          {item.provider.businessName}
                        </Link>
                      ) : (
                        <span className="text-slate-400">Unknown Provider</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-800">
                      ${item.listing.pricing.amount} <span className="text-[10px] text-slate-400">/ {item.listing.pricing.unit}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <StatusBadge status={item.listing.status} />
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="rounded-full font-bold text-xs gap-1.5 h-8 px-3 shadow-xs"
                        onClick={() => handleDelete(item.listing.id)}
                      >
                        <IconTrash className="h-3.5 w-3.5" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION BAR */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold text-slate-400">
          <span>Showing {filtered.length} of {filtered.length} listings</span>
          <div className="flex items-center gap-1">
            <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><IconChevronLeft className="h-4 w-4" /></button>
            <button className="h-7 w-7 rounded-lg bg-[#24a1dc] text-white font-bold flex items-center justify-center shadow-xs">1</button>
            <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><IconChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
