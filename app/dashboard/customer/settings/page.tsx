"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "@/lib/mock-api/session";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconAlertTriangle, IconLogout } from "@tabler/icons-react";

const NOTIFICATIONS = [
  {
    key: "booking-updates",
    label: "Booking updates",
    hint: "Confirmations, reschedules and cancellations.",
    defaultOn: true,
  },
  {
    key: "quote-replies",
    label: "Quote replies",
    hint: "When a provider responds to a quote request.",
    defaultOn: true,
  },
  {
    key: "reminders",
    label: "Job reminders",
    hint: "A nudge the day before a scheduled service.",
    defaultOn: true,
  },
  {
    key: "marketing",
    label: "New providers and offers",
    hint: "Occasional email when verified providers join your area.",
    defaultOn: false,
  },
];

export default function CustomerSettingsPage() {
  const router = useRouter();
  const { logout } = useSession();

  const [toggles, setToggles] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(NOTIFICATIONS.map((n) => [n.key, n.defaultOn]))
  );
  const [language, setLanguage] = React.useState("en-AU");
  const [currency, setCurrency] = React.useState("AUD");

  const handleSave = () => toast.success("Settings saved");

  const handleSignOut = () => {
    logout();
    toast.success("Signed out");
    router.push("/");
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Settings
        </h1>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          Control what we send you and how the marketplace is displayed.
        </p>
      </div>

      {/* Notifications */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8">
        <h2 className="text-sm font-extrabold text-slate-900">Notifications</h2>
        <p className="mt-1 text-[11px] font-semibold text-slate-500">
          Booking-critical messages are always sent.
        </p>

        <div className="mt-5 divide-y divide-slate-100">
          {NOTIFICATIONS.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between gap-6 py-4"
            >
              <div className="min-w-0">
                <Label
                  htmlFor={`toggle-${item.key}`}
                  className="text-xs font-extrabold text-slate-900"
                >
                  {item.label}
                </Label>
                <p className="mt-0.5 text-[11px] text-slate-500">{item.hint}</p>
              </div>

              <Switch
                id={`toggle-${item.key}`}
                checked={toggles[item.key]}
                onCheckedChange={(checked) =>
                  setToggles((prev) => ({ ...prev, [item.key]: checked }))
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* Preferences */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8">
        <h2 className="text-sm font-extrabold text-slate-900">Preferences</h2>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="setting-language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="setting-language" className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-AU">English (Australia)</SelectItem>
                <SelectItem value="en-GB">English (UK)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="setting-currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="setting-currency" className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AUD">AUD — Australian dollar</SelectItem>
                <SelectItem value="NZD">NZD — New Zealand dollar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            className="rounded-full bg-[#1b76ff] px-5 text-xs font-bold text-white hover:bg-[#145ed8]"
          >
            Save settings
          </Button>
        </div>
      </section>

      {/* Account actions */}
      <section className="rounded-3xl border border-rose-200 bg-white p-6 shadow-sm lg:p-8">
        <h2 className="text-sm font-extrabold text-slate-900">Account</h2>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-extrabold text-slate-900">Sign out</p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Ends this session on this device.
            </p>
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleSignOut}
            className="gap-1.5 rounded-full border-slate-300 text-xs font-bold text-slate-700 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
          >
            <IconLogout className="h-4 w-4" />
            <span>Sign out</span>
          </Button>
        </div>

        <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs font-extrabold text-rose-600">
              <IconAlertTriangle className="h-4 w-4" />
              Delete account
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Permanently removes your profile and booking history.
            </p>
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              toast.error("Account deletion is disabled in this demo")
            }
            className="rounded-full border-rose-300 text-xs font-bold text-rose-600 hover:bg-rose-50"
          >
            Delete account
          </Button>
        </div>
      </section>
    </>
  );
}
