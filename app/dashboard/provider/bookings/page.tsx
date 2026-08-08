"use client";

import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useBookingsForProvider, useUpdateBookingStatus } from "@/hooks/use-bookings";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { IconCalendar, IconClock, IconReceipt, IconUser } from "@tabler/icons-react";
import type { BookingStatus } from "@/types/status";

const FILTERS: { key: BookingStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "in_progress", label: "In progress" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

/** What a provider can move each booking to next. */
const NEXT_ACTIONS: Partial<Record<BookingStatus, { to: BookingStatus; label: string }[]>> = {
  pending: [
    { to: "confirmed", label: "Accept" },
    { to: "cancelled", label: "Decline" },
  ],
  confirmed: [{ to: "in_progress", label: "Start job" }],
  in_progress: [{ to: "completed", label: "Mark complete" }],
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ProviderBookingsPage() {
  const { data: bookings, isLoading } = useBookingsForProvider("prov-01");
  const updateStatus = useUpdateBookingStatus();
  const [filter, setFilter] = React.useState<BookingStatus | "all">("all");

  const filtered = bookings?.filter((b) => filter === "all" || b.status === filter);

  const countFor = (key: BookingStatus | "all") =>
    key === "all"
      ? bookings?.length ?? 0
      : bookings?.filter((b) => b.status === key).length ?? 0;

  const handleStatusChange = (id: string, to: BookingStatus, label: string) => {
    updateStatus.mutate(
      { id, status: to },
      {
        onSuccess: () => toast.success(`${label} — booking ${id} is now ${to.replace("_", " ")}`),
        onError: () => toast.error("Could not update that booking"),
      }
    );
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Client Bookings
        </h1>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          Incoming jobs and where each one stands. Accept, start and complete work here.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map(({ key, label }) => {
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={active}
              className={`shrink-0 rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                active
                  ? "border-[#1b76ff] bg-[#1b76ff] text-white shadow-md shadow-blue-500/20"
                  : "border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {label}
              <span className={`ml-1.5 text-[10px] ${active ? "text-white/80" : "text-slate-400"}`}>
                {countFor(key)}
              </span>
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl border border-slate-200/60 bg-slate-100" />
          ))}
        </div>
      ) : filtered?.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <IconReceipt className="mx-auto h-8 w-8 text-slate-300" />
          <h2 className="mt-3 text-base font-extrabold text-slate-900">
            {filter === "all" ? "No client bookings yet" : "Nothing in this status"}
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-xs text-slate-500">
            {filter === "all"
              ? "Once a customer books one of your listings it will appear here."
              : "Try another status filter to see your other jobs."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered?.map((booking) => {
            const actions = NEXT_ACTIONS[booking.status] ?? [];
            return (
              <article
                key={booking.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 transition-all hover:border-[#1b76ff]/50 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="text-sm font-extrabold text-slate-900">
                        Booking {booking.id}
                      </h2>
                      <StatusBadge status={booking.status} />
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <IconUser className="h-3.5 w-3.5 text-brand" />
                        {booking.customerId}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <IconCalendar className="h-3.5 w-3.5 text-brand" />
                        {formatDate(booking.scheduledAt)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <IconClock className="h-3.5 w-3.5 text-brand" />
                        {formatTime(booking.scheduledAt)} · {booking.durationMinutes} min
                      </span>
                    </div>

                    {booking.notes && (
                      <p className="mt-2 line-clamp-2 text-[11px] leading-snug text-slate-500">
                        {booking.notes}
                      </p>
                    )}
                  </div>

                  <div className="text-right sm:shrink-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Job value
                    </span>
                    <span className="text-lg font-black text-[#1b76ff]">
                      ${booking.breakdown.total}
                    </span>
                  </div>
                </div>

                {actions.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-slate-100 pt-4">
                    {actions.map((action, i) => (
                      <Button
                        key={action.to}
                        size="sm"
                        variant={i === 0 ? "default" : "outline"}
                        disabled={updateStatus.isPending}
                        onClick={() =>
                          handleStatusChange(booking.id, action.to, action.label)
                        }
                        className={
                          i === 0
                            ? "rounded-full bg-[#1b76ff] text-xs font-bold text-white hover:bg-[#145ed8]"
                            : "rounded-full border-slate-300 text-xs font-bold text-slate-700 hover:border-rose-300 hover:text-rose-600"
                        }
                      >
                        {action.label}
                      </Button>
                    ))}

                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="ml-auto rounded-full border-slate-300 text-xs font-bold text-slate-700"
                    >
                      <Link href={`/provider/${booking.providerId}`}>View listing</Link>
                    </Button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
