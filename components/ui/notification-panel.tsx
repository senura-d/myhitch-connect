"use client";

import React from "react";
import Link from "next/link";
import {
  IconBell,
  IconCheck,
  IconCheckbox,
  IconShieldCheck,
  IconStar,
  IconAlertCircle,
  IconX,
} from "@tabler/icons-react";
import {
  getNotificationsForRole,
  type AppNotification,
  type NotificationType,
} from "@/lib/mock-api/notifications";
import type { Role } from "@/types/user";

const iconMap: Record<NotificationType, typeof IconBell> = {
  booking: IconCheckbox,
  verification: IconShieldCheck,
  review: IconStar,
  alert: IconAlertCircle,
  system: IconBell,
};

const colorMap: Record<NotificationType, string> = {
  booking: "bg-blue-100 text-blue-600",
  verification: "bg-green-100 text-green-600",
  review: "bg-amber-100 text-amber-600",
  alert: "bg-orange-100 text-orange-600",
  system: "bg-slate-100 text-slate-500",
};

export function NotificationBell({ role }: { role: Role }) {
  const [open, setOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<AppNotification[]>([]);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Reload whenever the signed-in role changes, so a customer never inherits
  // the provider's list after a role switch.
  React.useEffect(() => {
    setNotifications(getNotificationsForRole(role));
  }, [role]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  React.useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const dismiss = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="relative" ref={panelRef}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={
          unreadCount > 0
            ? `Notifications, ${unreadCount} unread`
            : "Notifications"
        }
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        <IconBell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-black leading-none text-white"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/15">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-slate-900">Notifications</h2>
              {unreadCount > 0 && (
                <span className="inline-flex h-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-black text-white">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="flex items-center gap-1 text-[11px] font-bold text-brand transition-colors hover:text-[#24a1dc]"
              >
                <IconCheck className="h-3.5 w-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <ul className="max-h-[400px] divide-y divide-slate-100 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="flex flex-col items-center justify-center gap-3 py-12 text-slate-400">
                <IconBell className="h-8 w-8 opacity-30" />
                <p className="text-xs font-semibold">All caught up</p>
              </li>
            ) : (
              notifications.map((n) => {
                const Icon = iconMap[n.type];
                const body = (
                  <>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${colorMap[n.type]}`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-xs font-bold leading-snug ${
                          n.read ? "text-slate-600" : "text-slate-900"
                        }`}
                      >
                        {n.title}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-slate-500">
                        {n.description}
                      </span>
                      <span className="mt-1.5 block text-[10px] font-semibold text-slate-400">
                        {n.time}
                      </span>
                    </span>

                    {!n.read && (
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand"
                      />
                    )}
                  </>
                );

                const shared =
                  "flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:bg-slate-50";

                return (
                  <li
                    key={n.id}
                    className={`relative ${n.read ? "" : "bg-blue-50/40"}`}
                  >
                    {/* A real button/link, so the list is keyboard reachable. */}
                    {n.href ? (
                      <Link
                        href={n.href}
                        onClick={() => {
                          markRead(n.id);
                          setOpen(false);
                        }}
                        className={`${shared} pr-10`}
                      >
                        {body}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => markRead(n.id)}
                        className={`${shared} pr-10`}
                      >
                        {body}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => dismiss(n.id)}
                      aria-label={`Dismiss: ${n.title}`}
                      className="absolute right-3 top-4 rounded-md p-1 text-slate-300 transition-colors hover:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                    >
                      <IconX className="h-3.5 w-3.5" />
                    </button>
                  </li>
                );
              })
            )}
          </ul>

          <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3">
            <p className="text-center text-[11px] font-medium text-slate-400">
              {notifications.length} notification
              {notifications.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
