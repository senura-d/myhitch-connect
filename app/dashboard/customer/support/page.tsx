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
    q: "How do I know a provider is actually verified?",
    a: "Every provider on the register has had their trade licence, business registration and public liability cover checked against official sources before their listings go live. The badge on a provider card shows their current verification state.",
  },
  {
    q: "Can I cancel or reschedule a booking?",
    a: "Yes. Open the booking from My Bookings and contact the provider directly. Cancellation terms depend on how close you are to the scheduled time — the provider sets these on each listing.",
  },
  {
    q: "When am I charged?",
    a: "Nothing is taken at the point of enquiry. Payment terms are set per listing — some take a deposit on booking, others invoice on completion. The total shown on each booking is the agreed price.",
  },
  {
    q: "What if the work isn't up to standard?",
    a: "Raise it with the provider first through your booking. If it can't be resolved, contact us and we'll review it — repeated issues affect a provider's verification status.",
  },
  {
    q: "What does a quote request involve?",
    a: "You describe the job and the provider comes back with a price. There's no obligation to accept, and you can request quotes from several providers at once.",
  },
];

export default function CustomerSupportPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Message sent", {
      description: "Our support team replies within one business day.",
    });
    setSubject("");
    setMessage("");
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Help &amp; Support
        </h1>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          Answers to the common questions, and a direct line if you need one.
        </p>
      </div>

      {/* Contact channels */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            icon: <IconMail className="h-5 w-5 text-[#2b89ff]" />,
            label: "Email us",
            value: "support@myhitchconnect.test",
            hint: "Replies within 1 business day",
          },
          {
            icon: <IconPhone className="h-5 w-5 text-[#2b89ff]" />,
            label: "Call us",
            value: "1300 000 000",
            hint: "Mon–Fri, 9am–5pm AEST",
          },
          {
            icon: <IconClock className="h-5 w-5 text-[#2b89ff]" />,
            label: "Urgent booking issue",
            value: "Contact your provider",
            hint: "Fastest route for same-day jobs",
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
            <p className="mt-1 text-sm font-extrabold text-slate-900">
              {item.value}
            </p>
            <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
              {item.hint}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* FAQ */}
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
                        aria-controls={`faq-panel-${i}`}
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
                        id={`faq-panel-${i}`}
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

        {/* Contact form */}
        <section className="lg:col-span-5">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8"
          >
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">
                Still stuck?
              </h2>
              <p className="mt-1 text-[11px] font-semibold text-slate-500">
                Tell us what happened and we&apos;ll pick it up.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="support-subject">Subject</Label>
              <Input
                id="support-subject"
                name="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Problem with a booking"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="support-message">What happened?</Label>
              <Textarea
                id="support-message"
                name="message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Include the booking reference if you have one."
              />
            </div>

            <Button
              type="submit"
              size="sm"
              className="w-full rounded-full bg-[#1b76ff] text-xs font-bold text-white hover:bg-[#145ed8]"
            >
              Send message
            </Button>

            <p className="flex items-start gap-2 rounded-xl border border-[#2b89ff]/25 bg-[#f0f9ff] px-3 py-2 text-[11px] font-medium text-slate-700">
              <IconShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#2b89ff]" />
              Reporting a provider? Include the booking reference and we&apos;ll
              review their verification status.
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
