"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "@/lib/mock-api/session";
import { useProvider } from "@/hooks/use-providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconAlertTriangle, IconLogout, IconPencil, IconPlus } from "@tabler/icons-react";

const NOTIFICATIONS = [
  {
    key: "new-bookings",
    label: "New bookings",
    hint: "When a customer books one of your listings.",
    defaultOn: true,
  },
  {
    key: "quote-requests",
    label: "Quote requests",
    hint: "When someone asks you to price a job.",
    defaultOn: true,
  },
  {
    key: "reviews",
    label: "New reviews",
    hint: "When a customer leaves feedback.",
    defaultOn: true,
  },
  {
    key: "compliance",
    label: "Compliance reminders",
    hint: "Before a licence or insurance policy expires.",
    defaultOn: true,
  },
  {
    key: "marketing",
    label: "Product news",
    hint: "Occasional updates about new marketplace features.",
    defaultOn: false,
  },
];

const MAX_LOGO_MB = 2;

export default function ProviderSettingsPage() {
  const router = useRouter();
  const { session, login, logout } = useSession();
  const { data: provider } = useProvider("prov-01");
  const user = session?.user;

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [businessName, setBusinessName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [radius, setRadius] = React.useState("25");
  const [currency, setCurrency] = React.useState("AUD");
  const [acceptingWork, setAcceptingWork] = React.useState(true);
  const [toggles, setToggles] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(NOTIFICATIONS.map((n) => [n.key, n.defaultOn]))
  );

  // Seed from the provider record once it loads.
  React.useEffect(() => {
    if (provider) {
      setBusinessName(provider.businessName);
      setDescription(provider.description);
      setRadius(String(provider.serviceRadiusKm));
    }
  }, [provider]);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast.error("That file isn't an image", {
        description: "Choose a JPG, PNG or WebP.",
      });
      return;
    }
    if (file.size > MAX_LOGO_MB * 1024 * 1024) {
      toast.error("That image is too large", {
        description: `Keep it under ${MAX_LOGO_MB}MB.`,
      });
      return;
    }

    // Data URL so it survives a reload — the mock session lives in localStorage.
    const reader = new FileReader();
    reader.onload = () => {
      login({ ...user, avatarUrl: reader.result as string });
      toast.success("Business logo updated");
    };
    reader.onerror = () => toast.error("Could not read that image");
    reader.readAsDataURL(file);
  };

  const handleLogoRemove = () => {
    if (!user) return;
    const { avatarUrl: _removed, ...rest } = user;
    login(rest);
    toast.success("Business logo removed");
  };

  const handleSignOut = () => {
    logout();
    toast.success("Signed out");
    router.push("/");
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Business Settings
        </h1>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          How your business appears on the marketplace, and what we notify you about.
        </p>
      </div>

      {/* Business profile */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8">
        <h2 className="text-sm font-extrabold text-slate-900">Business profile</h2>

        <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Logo picker */}
          <div className="shrink-0 text-center">
            <div className="relative w-fit">
              {user?.avatarUrl ? (
                // User-uploaded data URL — nothing for next/image to optimise.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatarUrl}
                  alt=""
                  className="h-20 w-20 rounded-2xl object-cover shadow-lg shadow-blue-500/25"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-[#2c89ff] via-[#1c6df3] to--brand-dark text-3xl font-black text-white shadow-lg shadow-blue-500/25">
                  {(provider?.businessName ?? user?.name ?? "B").charAt(0)}
                </div>
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={!user}
                aria-label={user?.avatarUrl ? "Change business logo" : "Add business logo"}
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#1b76ff] text-white shadow-md transition-colors hover:bg-[#145ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b76ff]/40 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {user?.avatarUrl ? (
                  <IconPencil className="h-4 w-4" />
                ) : (
                  <IconPlus className="h-4 w-4" />
                )}
              </button>
            </div>

            <input
              ref={fileInputRef}
              id="logo-upload"
              name="logo"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="sr-only"
            />

            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={!user}
                className="text-[#1b76ff] hover:underline disabled:cursor-not-allowed disabled:opacity-40"
              >
                {user?.avatarUrl ? "Change logo" : "Add logo"}
              </button>
              {user?.avatarUrl && (
                <>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <button
                    type="button"
                    onClick={handleLogoRemove}
                    className="text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>

            <p className="mt-1 text-[10px] text-slate-400">max {MAX_LOGO_MB}MB</p>
          </div>

          <div className="min-w-0 flex-1 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="business-name">Business name</Label>
              <Input
                id="business-name"
                name="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Sunrise Plumbing Co."
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="business-description">Description</Label>
              <Textarea
                id="business-description"
                name="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What you do, the areas you cover and what sets you apart."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="service-radius">Service radius (km)</Label>
                <Input
                  id="service-radius"
                  name="serviceRadius"
                  type="number"
                  min={1}
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="provider-currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="provider-currency" className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AUD">AUD — Australian dollar</SelectItem>
                    <SelectItem value="NZD">NZD — New Zealand dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <Button
            type="button"
            size="sm"
            onClick={() => toast.success("Business profile saved")}
            className="rounded-full bg-[#1b76ff] px-5 text-xs font-bold text-white hover:bg-[#145ed8]"
          >
            Save profile
          </Button>
        </div>
      </section>

      {/* Availability */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex items-center justify-between gap-6">
          <div className="min-w-0">
            <Label htmlFor="accepting-work" className="text-sm font-extrabold text-slate-900">
              Accepting new work
            </Label>
            <p className="mt-1 text-[11px] text-slate-500">
              Turn this off to keep your listings visible but stop new bookings.
            </p>
          </div>
          <Switch
            id="accepting-work"
            checked={acceptingWork}
            onCheckedChange={(checked) => {
              setAcceptingWork(checked);
              toast.success(checked ? "Accepting new work" : "Paused new bookings");
            }}
          />
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8">
        <h2 className="text-sm font-extrabold text-slate-900">Notifications</h2>
        <p className="mt-1 text-[11px] font-semibold text-slate-500">
          Booking-critical and compliance messages are always sent.
        </p>

        <div className="mt-5 divide-y divide-slate-100">
          {NOTIFICATIONS.map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-6 py-4">
              <div className="min-w-0">
                <Label
                  htmlFor={`provider-toggle-${item.key}`}
                  className="text-xs font-extrabold text-slate-900"
                >
                  {item.label}
                </Label>
                <p className="mt-0.5 text-[11px] text-slate-500">{item.hint}</p>
              </div>
              <Switch
                id={`provider-toggle-${item.key}`}
                checked={toggles[item.key]}
                onCheckedChange={(checked) =>
                  setToggles((prev) => ({ ...prev, [item.key]: checked }))
                }
              />
            </div>
          ))}
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
              Close business account
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Removes your listings and profile from the marketplace.
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => toast.error("Account closure is disabled in this demo")}
            className="rounded-full border-rose-300 text-xs font-bold text-rose-600 hover:bg-rose-50"
          >
            Close account
          </Button>
        </div>
      </section>
    </>
  );
}
