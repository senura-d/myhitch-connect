"use client";

import React from "react";
import { toast } from "sonner";
import {
  useAuditLog,
  useVerificationQueue,
  useBookingsPaymentsOverview,
  useUsers,
  useAllListings,
} from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { toCsv, downloadCsv, timestampedFilename, type CsvColumn } from "@/lib/csv";
import {
  IconFileExport,
  IconDownload,
  IconSearch,
  IconHistory,
  IconUser,
  IconClipboardCheck,
} from "@tabler/icons-react";

export type ExportDataset =
  | "verification-queue"
  | "bookings"
  | "users"
  | "listings"
  | "audit-log";

const DATASETS: { key: ExportDataset; label: string; hint: string }[] = [
  { key: "verification-queue", label: "Verification queue", hint: "Providers awaiting a licence check" },
  { key: "bookings", label: "Bookings & payments", hint: "Every booking with customer, provider and total" },
  { key: "users", label: "Users", hint: "All accounts and their roles" },
  { key: "listings", label: "Listings", hint: "Every service listing and its status" },
  { key: "audit-log", label: "Audit log", hint: "Who did what, and when" },
];

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function ExportAuditDesk({ id }: { id?: string }) {
  const { data: auditLog, isLoading: auditLoading } = useAuditLog();
  const { data: queue } = useVerificationQueue();
  const { data: bookings } = useBookingsPaymentsOverview();
  const { data: users } = useUsers();
  const { data: listings } = useAllListings();

  const [dataset, setDataset] = React.useState<ExportDataset>("verification-queue");
  const [auditSearch, setAuditSearch] = React.useState("");

  /** Row count shown next to each dataset, so you know what you're about to pull. */
  const countFor = (key: ExportDataset): number => {
    switch (key) {
      case "verification-queue":
        return queue?.length ?? 0;
      case "bookings":
        return bookings?.length ?? 0;
      case "users":
        return users?.length ?? 0;
      case "listings":
        return listings?.length ?? 0;
      case "audit-log":
        return auditLog?.length ?? 0;
    }
  };

  /** Builds the CSV for a dataset. Returns null when there's nothing to export. */
  const buildCsv = (key: ExportDataset): { csv: string; name: string; rows: number } | null => {
    switch (key) {
      case "verification-queue": {
        const rows = queue ?? [];
        if (!rows.length) return null;
        const columns: CsvColumn<(typeof rows)[number]>[] = [
          { header: "Provider ID", value: (r) => r.id },
          { header: "Business name", value: (r) => r.businessName },
          { header: "Provider type", value: (r) => r.providerType },
          { header: "Verification status", value: (r) => r.verificationStatus },
          { header: "Rating", value: (r) => r.ratingAverage },
          { header: "Reviews", value: (r) => r.ratingCount },
          { header: "Submitted", value: (r) => r.createdAt },
        ];
        return { csv: toCsv(rows, columns), name: timestampedFilename("verification-queue"), rows: rows.length };
      }

      case "bookings": {
        const rows = bookings ?? [];
        if (!rows.length) return null;
        const columns: CsvColumn<(typeof rows)[number]>[] = [
          { header: "Booking ID", value: (r) => r.booking.id },
          { header: "Status", value: (r) => r.booking.status },
          { header: "Customer", value: (r) => r.customer?.name ?? "" },
          { header: "Provider", value: (r) => r.provider?.businessName ?? "" },
          { header: "Scheduled", value: (r) => r.booking.scheduledAt },
          { header: "Duration (min)", value: (r) => r.booking.durationMinutes },
          { header: "Total", value: (r) => r.booking.breakdown.total },
          { header: "Currency", value: (r) => r.booking.breakdown.currency },
        ];
        return { csv: toCsv(rows, columns), name: timestampedFilename("bookings"), rows: rows.length };
      }

      case "users": {
        const rows = users ?? [];
        if (!rows.length) return null;
        const columns: CsvColumn<(typeof rows)[number]>[] = [
          { header: "User ID", value: (r) => r.id },
          { header: "Name", value: (r) => r.name },
          { header: "Email", value: (r) => r.email },
          { header: "Role", value: (r) => r.role },
        ];
        return { csv: toCsv(rows, columns), name: timestampedFilename("users"), rows: rows.length };
      }

      case "listings": {
        const rows = listings ?? [];
        if (!rows.length) return null;
        const columns: CsvColumn<(typeof rows)[number]>[] = [
          { header: "Listing ID", value: (r) => r.listing.id },
          { header: "Title", value: (r) => r.listing.title },
          { header: "Status", value: (r) => r.listing.status },
          { header: "Provider", value: (r) => r.provider?.businessName ?? "" },
          { header: "Pricing method", value: (r) => r.listing.pricing.method },
          { header: "Amount", value: (r) => r.listing.pricing.amount ?? "" },
        ];
        return { csv: toCsv(rows, columns), name: timestampedFilename("listings"), rows: rows.length };
      }

      case "audit-log": {
        const rows = auditLog ?? [];
        if (!rows.length) return null;
        const columns: CsvColumn<(typeof rows)[number]>[] = [
          { header: "Entry ID", value: (r) => r.id },
          { header: "Actor", value: (r) => r.actorName },
          { header: "Actor ID", value: (r) => r.actorId },
          { header: "Action", value: (r) => r.action },
          { header: "Target type", value: (r) => r.targetType },
          { header: "Target ID", value: (r) => r.targetId },
          { header: "Timestamp", value: (r) => r.createdAt },
        ];
        return { csv: toCsv(rows, columns), name: timestampedFilename("audit-log"), rows: rows.length };
      }
    }
  };

  const handleExport = (key: ExportDataset) => {
    const result = buildCsv(key);
    const label = DATASETS.find((d) => d.key === key)?.label ?? key;

    if (!result) {
      toast.error(`Nothing to export in ${label}`, {
        description: "That dataset is currently empty.",
      });
      return;
    }

    downloadCsv(result.name, result.csv);
    toast.success(`Exported ${result.rows} row${result.rows === 1 ? "" : "s"}`, {
      description: result.name,
    });
  };

  const filteredAudit = (auditLog ?? [])
    .filter((entry) => {
      const q = auditSearch.toLowerCase();
      return (
        entry.actorName.toLowerCase().includes(q) ||
        entry.action.toLowerCase().includes(q) ||
        entry.targetType.toLowerCase().includes(q) ||
        entry.targetId.toLowerCase().includes(q)
      );
    })
    .slice()
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return (
    <section id={id} className="scroll-mt-24 grid grid-cols-1 gap-6 xl:grid-cols-12">
      {/* EXPORT */}
      <div className="xl:col-span-5">
        <div className="h-full rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#2b89ff]">
              <IconFileExport className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="export-dataset-heading"
                tabIndex={-1}
                className="text-base font-extrabold text-slate-900 focus-visible:outline-none"
              >
                Export
              </h2>
              <p className="text-[11px] font-semibold text-slate-500">
                Download marketplace data as CSV.
              </p>
            </div>
          </div>

          <fieldset className="mt-5">
            <legend className="sr-only">Choose a dataset to export</legend>
            <div className="space-y-2">
              {DATASETS.map((d) => {
                const selected = dataset === d.key;
                const count = countFor(d.key);
                return (
                  <label
                    key={d.key}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-colors focus-within:ring-2 focus-within:ring-[#2b89ff]/40 ${
                      selected
                        ? "border-[#1b76ff] bg-blue-50/60"
                        : "border-slate-200 bg-white hover:border-[#1b76ff]/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="export-dataset"
                      value={d.key}
                      checked={selected}
                      onChange={() => setDataset(d.key)}
                      className="sr-only"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-extrabold text-slate-900">
                        {d.label}
                      </span>
                      <span className="block text-[11px] text-slate-500">{d.hint}</span>
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold tabular-nums ${
                        selected ? "bg-[#1b76ff] text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <Button
            type="button"
            onClick={() => handleExport(dataset)}
            disabled={countFor(dataset) === 0}
            className="mt-5 w-full gap-1.5 rounded-full bg-[#1b76ff] text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#145ed8]"
          >
            <IconDownload className="h-4 w-4" />
            <span>
              Download {DATASETS.find((d) => d.key === dataset)?.label} ({countFor(dataset)})
            </span>
          </Button>

          <p className="mt-3 text-[11px] leading-snug text-slate-400">
            Files are generated in your browser — no data leaves this device.
          </p>
        </div>
      </div>

      {/* AUDIT DESK */}
      <div className="xl:col-span-7">
        <div className="h-full rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#2b89ff]">
                <IconHistory className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Audit Desk</h2>
                <p className="text-[11px] font-semibold text-slate-500">
                  Every moderation action taken on the platform.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleExport("audit-log")}
              disabled={(auditLog?.length ?? 0) === 0}
              className="shrink-0 gap-1.5 rounded-full border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <IconFileExport className="h-4 w-4 text-slate-500" />
              <span>Export log</span>
            </Button>
          </div>

          <div className="relative mt-5">
            <IconSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="audit-search"
              name="audit-search"
              aria-label="Search the audit log"
              value={auditSearch}
              onChange={(e) => setAuditSearch(e.target.value)}
              placeholder="Search by actor, action or target..."
              className="h-9 rounded-full border border-slate-200/80 bg-slate-50 !pl-10 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-[#2b89ff]"
            />
          </div>

          {auditLoading ? (
            <div className="mt-5 space-y-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 animate-pulse rounded-2xl border border-slate-200/60 bg-slate-100"
                />
              ))}
            </div>
          ) : filteredAudit.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-10 text-center">
              <IconClipboardCheck className="mx-auto h-7 w-7 text-slate-300" />
              <p className="mt-2 text-xs font-extrabold text-slate-900">
                {auditSearch ? "No matching entries" : "No audit activity yet"}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">
                {auditSearch
                  ? "Try a different actor, action or target."
                  : "Moderation actions will be recorded here."}
              </p>
            </div>
          ) : (
            <ul className="mt-5 max-h-[420px] divide-y divide-slate-100 overflow-y-auto">
              {filteredAudit.map((entry) => (
                <li key={entry.id} className="flex items-start gap-3 py-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <IconUser className="h-4 w-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs leading-snug text-slate-700">
                      <span className="font-extrabold text-slate-900">
                        {entry.actorName}
                      </span>{" "}
                      {entry.action}
                    </p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold text-slate-400">
                      <span className="rounded-md bg-slate-100 px-1.5 py-0.5 capitalize text-slate-500">
                        {entry.targetType}
                      </span>
                      <span className="font-mono">{entry.targetId}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={entry.createdAt}>
                        {formatDateTime(entry.createdAt)}
                      </time>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 border-t border-slate-100 pt-3 text-[11px] font-semibold text-slate-400">
            Showing {filteredAudit.length} of {auditLog?.length ?? 0} entries
          </p>
        </div>
      </div>
    </section>
  );
}
