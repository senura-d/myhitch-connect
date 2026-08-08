"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUsers, useDeleteUserAdmin } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IconUsers,
  IconSearch,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
} from "@tabler/icons-react";
import type { Role } from "@/types/user";

export default function AdminUsersPage() {
  const { data: users, isLoading } = useUsers();
  const deleteMutation = useDeleteUserAdmin();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user? All associated data and provider records will be removed. This cannot be undone.")) {
      deleteMutation.mutate(id);
    }
  };

  const filtered = (users || []).filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.username && u.username.toLowerCase().includes(search.toLowerCase()));

    const matchesRole =
      roleFilter === "all" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">User Directory</h1>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mt-1">
            <Link href="/admin" className="text--brand hover:underline">Admin</Link>
            <span>&gt;</span>
            <span className="text-slate-600 font-bold">Users</span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search name, email, handle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 border border-slate-200 bg-slate-50 pl-10! text-xs font-semibold text-slate-800 rounded-full focus-visible:bg-white focus-visible:ring-1 focus-visible:ring--brand"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap">Filter Role:</span>
          <div className="relative w-full sm:w-40">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full h-10 pl-4 pr-10 border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 rounded-full appearance-none focus:outline-none focus:ring-1 focus:ring--brand cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="customer">Customer</option>
              <option value="provider">Provider</option>
              <option value="admin">Administrator</option>
            </select>
            <IconChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* DATA TABLE CARD */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xl shadow-blue-500/5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-base text-slate-900">Platform Users</h3>
          <span className="text-xs font-bold text-slate-400">{filtered.length} total users</span>
        </div>

        {isLoading ? (
          <p className="text-xs text-slate-400">Loading user directory...</p>
        ) : filtered.length === 0 ? (
          <p className="text-xs text-slate-400">No users found matching search criteria.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Name</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3 text--brand">Role</th>
                  <th className="py-3 px-3">Username / Handle</th>
                  <th className="py-3 px-3 text-right">Account Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        {u.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={u.avatarUrl}
                            alt=""
                            className="h-8 w-8 rounded-full object-cover shrink-0"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-blue-50 text-[#1b76ff] flex items-center justify-center font-bold text-xs shrink-0">
                            {u.name.charAt(0)}
                          </div>
                        )}
                        <span className="font-bold text-slate-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 font-bold">{u.email}</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : u.role === "provider"
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-blue-100 text-blue-800"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-400">
                      {u.username || <span className="italic text-slate-300">not set</span>}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {u.role !== "admin" ? (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="rounded-full font-bold text-xs gap-1.5 h-8 px-3 shadow-xs"
                          onClick={() => handleDelete(u.id)}
                        >
                          <IconTrash className="h-3.5 w-3.5" /> Remove
                        </Button>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">Protected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION BAR */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold text-slate-400">
          <span>Showing {filtered.length} of {filtered.length} users</span>
          <div className="flex items-center gap-1">
            <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><IconChevronLeft className="h-4 w-4" /></button>
            <button className="h-7 w-7 rounded-lg bg-[#1b76ff] text-white font-bold flex items-center justify-center shadow-xs">1</button>
            <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><IconChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
