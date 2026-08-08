"use client";

import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  IconMail,
  IconPhone,
  IconClock,
  IconShieldCheck,
  IconChevronDown,
} from "@tabler/icons-react";

const FAQS = [
  {
    q: "Why aren't my listings showing on the marketplace?",
    a: "Listings only go live once your verification is approved and the listing itself is published. Check Licence & ABN for your current status, then My Services to confirm each listing is published rather than paused or draft.",
  },
  {
    q: "How do I get paid?",
    a: "Payment terms are set per listing. Fixed-price jobs can take a deposit at booking; quoted work is invoiced on completion. Payouts settle to the bank account on your business profile.",
  },
  {
    q: "What happens when my licence expires?",
    a: "We re-check licences before their expiry date. If a licence lapses, your listings are paused automatically until you upload a current one — customers are never shown an unverified provider.",
  },
  {
    q: "Can I decline a booking?",
    a: "Yes. A pending booking can be accepted or declined from Client Bookings. Declining is free, but a pattern of declines affects how prominently you appear in search.",
  },
  {
    q: "A customer left an unfair review — what can I do?",
    a: "You can respond publicly to any review from your profile. If it breaches our guidelines, report it and our moderation team will assess it.",
  },
];

export default function ProviderSupportPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Message sent", {
      description: "Our provider support team replies within one business day.",
    });
    setSubject("");
    setMessage("");
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Support Desk
        </h1>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          Help with verification, listings, bookings and payouts.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            icon: <IconMail className="h-5 w-5 text-brand" />,
            label: "Provider support",
            value: "providers@myhitchconnect.test",
            hint: "Replies within 1 business day",
          },
          {
            icon: <IconPhone className="h-5 w-5 text-brand" />,
            label: "Call us",
            value: "1300 000 111",
            hint: "Mon–Fri, 8am–6pm AEST",
          },
          {
            icon: <IconClock className="h-5 w-5 text-brand" />,
            label: "Verification queries",
            value: "Usually 2 business days",
            hint: "From document upload to decision",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f9ff]">
              {item.icon}
            </div>
            <h2 className="mt-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              {item.label}
            </h2>
            <p className="mt-1 text-sm font-extrabold text-slate-900">{item.value}</p>
            <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
              {item.hint}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8">
            <h2 className="text-sm font-extrabold text-slate-900">
              Frequently asked
            </h2>

            <div className="mt-4 divide-y divide-slate-100">
              {FAQS.map((faq, i) => {
                const open = openIndex === i;
                return (
                  <div key={faq.q}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(open ? null : i)}
                        aria-expanded={open}
                        aria-controls={`provider-faq-${i}`}
                        className="flex w-full items-center justify-between gap-4 py-4 text-left"
                      >
                        <span className="text-xs font-extrabold text-slate-900">
                          {faq.q}
                        </span>
                        <IconChevronDown
                          aria-hidden="true"
                          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform motion-reduce:transition-none ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </h3>

                    {open && (
                      <p
                        id={`provider-faq-${i}`}
                        className="pb-4 text-xs leading-relaxed text-slate-600"
                      >
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="lg:col-span-5">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8"
          >
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">
                Raise a ticket
              </h2>
              <p className="mt-1 text-[11px] font-semibold text-slate-500">
                Include a booking or listing reference where you can.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="provider-support-subject">Subject</Label>
              <Input
                id="provider-support-subject"
                name="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Verification stuck in review"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="provider-support-message">What&apos;s happening?</Label>
              <Textarea
                id="provider-support-message"
                name="message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the issue and what you've already tried."
              />
            </div>

            <Button
              type="submit"
              size="sm"
              className="w-full rounded-full bg-[#1b76ff] text-xs font-bold text-white hover:bg-[#145ed8]"
            >
              Send message
            </Button>

            <p className="flex items-start gap-2 rounded-xl border border-brand/25 bg-[#f0f9ff] px-3 py-2 text-[11px] font-medium text-slate-700">
              <IconShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              Verification questions are handled by the compliance team — expect a
              reply within two business days.
            </p>

            <p className="text-center text-[11px] text-slate-500">
              Prefer the public form?{" "}
              <Link
                href="/contact"
                className="font-bold text-[#1b76ff] hover:underline"
              >
                Contact us
              </Link>
            </p>
          </form>
        </section>
      </div>
    </>
  );
}
