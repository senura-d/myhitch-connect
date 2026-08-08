"use client";

import React from "react";
import { toast } from "sonner";
import { useSession } from "@/lib/mock-api/session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  IconShieldCheck,
  IconMail,
  IconPhone,
  IconMapPin,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";

const MAX_AVATAR_MB = 2;

export default function CustomerProfilePage() {
  const { session, login } = useSession();
  const user = session?.user;

  const [name, setName] = React.useState(user?.name ?? "");
  const [email, setEmail] = React.useState(user?.email ?? "");
  const [username, setUsername] = React.useState(user?.username ?? "@linda_blair321");
  const [phone, setPhone] = React.useState(user?.phone ?? "050 414 8778");
  const [suburb, setSuburb] = React.useState(user?.address ?? "1833 Bel Meadow Drive, Fontana, California 92335, USA");
  const [about, setAbout] = React.useState("");

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // The session resolves after mount, so seed the form once it arrives.
  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setUsername(user.username ?? "@linda_blair321");
      setPhone(user.phone ?? "050 414 8778");
      setSuburb(user.address ?? "1833 Bel Meadow Drive, Fontana, California 92335, USA");
    }
  }, [user]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Let the same file be picked again after a remove.
    event.target.value = "";
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast.error("That file isn't an image", {
        description: "Choose a JPG, PNG or WebP.",
      });
      return;
    }

    if (file.size > MAX_AVATAR_MB * 1024 * 1024) {
      toast.error("That image is too large", {
        description: `Keep it under ${MAX_AVATAR_MB}MB.`,
      });
      return;
    }

    // Read as a data URL so the photo survives a reload — the mock session is
    // persisted to localStorage, where an object URL would be dead on return.
    const reader = new FileReader();
    reader.onload = () => {
      login({ ...user, avatarUrl: reader.result as string });
      toast.success("Profile photo updated");
    };
    reader.onerror = () => toast.error("Could not read that image");
    reader.readAsDataURL(file);
  };

  const handleAvatarRemove = () => {
    if (!user) return;
    const { avatarUrl: _removed, ...rest } = user;
    login(rest);
    toast.success("Profile photo removed");
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    login({
      ...user,
      name,
      email,
      username,
      phone,
      address: suburb,
    });
    toast.success("Profile saved");
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Profile &amp; Account
        </h1>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          The details providers see when you book or request a quote.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Identity summary */}
        <aside className="lg:col-span-4">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm">
            {/* Avatar + picker */}
            <div className="mx-auto w-fit">
              <div className="relative">
                {user?.avatarUrl ? (
                  // Data URL from the user's own file — next/image can't optimise
                  // these, and there's no remote host to whitelist.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatarUrl}
                    alt=""
                    className="h-20 w-20 rounded-full object-cover shadow-lg shadow-blue-500/25"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#2c89ff] via-[#1c6df3] to-brand-dark text-3xl font-black text-white shadow-lg shadow-blue-500/25">
                    {(user?.name ?? "G").charAt(0)}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!user}
                  aria-label={
                    user?.avatarUrl ? "Change profile photo" : "Add profile photo"
                  }
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
                id="avatar-upload"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="sr-only"
              />
            </div>

            <div className="mt-3 flex items-center justify-center gap-3 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={!user}
                className="text-[#1b76ff] hover:underline disabled:cursor-not-allowed disabled:opacity-40"
              >
                {user?.avatarUrl ? "Change photo" : "Add photo"}
              </button>

              {user?.avatarUrl && (
                <>
                  <span aria-hidden="true" className="text-slate-300">
                    ·
                  </span>
                  <button
                    type="button"
                    onClick={handleAvatarRemove}
                    className="text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>

            <p className="mt-1 text-[10px] text-slate-400">
              JPG, PNG or WebP · max {MAX_AVATAR_MB}MB
            </p>

            <h2 className="mt-4 text-lg font-black text-slate-900">
              {user?.name ?? "Guest"}
            </h2>
            <p className="text-xs font-semibold capitalize text-slate-500">
              {user?.role ?? "not signed in"}
            </p>

            <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-left">
              <p className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                <IconMail className="h-3.5 w-3.5 shrink-0 text--brand" />
                <span className="truncate">{user?.email ?? "—"}</span>
              </p>
              <p className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                <IconPhone className="h-3.5 w-3.5 shrink-0 text--brand" />
                {phone || "No phone added"}
              </p>
              <p className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                <IconMapPin className="h-3.5 w-3.5 shrink-0 text--brand" />
                {suburb || "No suburb added"}
              </p>
            </div>

            <p className="mt-5 flex items-start gap-2 rounded-xl border border--brand/25 bg-[#f0f9ff] px-3 py-2 text-left text-[11px] font-medium text-slate-700">
              <IconShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text--brand" />
              Your contact details are only shared with a provider once you book
              or request a quote.
            </p>
          </div>
        </aside>

        {/* Editable details */}
        <div className="lg:col-span-8">
          <form
            onSubmit={handleSave}
            className="space-y-5 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8"
          >
            <h2 className="text-sm font-extrabold text-slate-900">
              Personal details
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="profile-name">Full name</Label>
                <Input
                  id="profile-name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Linda Blair"
                  autoComplete="name"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-username">Username / Handle</Label>
                <Input
                  id="profile-username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@linda_blair321"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-phone">Phone</Label>
                <Input
                  id="profile-phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="04XX XXX XXX"
                  autoComplete="tel"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-suburb">Suburb</Label>
                <Input
                  id="profile-suburb"
                  name="suburb"
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  placeholder="Fitzroy, VIC"
                  autoComplete="address-level2"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="profile-about">Notes for providers</Label>
              <Textarea
                id="profile-about"
                name="about"
                rows={4}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Access instructions, parking, pets on site — anything a provider should know before they arrive."
              />
              <p className="text-[11px] text-slate-500">
                Shared with a provider only after you book.
              </p>
            </div>

            <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
              <Button
                type="submit"
                size="sm"
                className="rounded-full bg-[#1b76ff] px-5 text-xs font-bold text-white hover:bg-[#145ed8]"
              >
                Save changes
              </Button>
              <Button
                type="reset"
                size="sm"
                variant="outline"
                className="rounded-full border-slate-300 text-xs font-bold text-slate-700"
              >
                Reset
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
