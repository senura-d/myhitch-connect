"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconSend,
  IconCheck,
  IconChevronDown,
  IconBuildingStore,
  IconHeadset,
  IconSparkles,
  IconUser,
  IconMessage,
  IconPencil,
  IconHelpCircle,
} from "@tabler/icons-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "Customer Inquiry",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 800);
  };

  const faqs = [
    {
      q: "How fast will I get a response to my inquiry?",
      a: "Our customer support and provider verification desks respond within 2 hours during business operating hours (Mon-Fri 8:00 AM - 7:00 PM AEST).",
    },
    {
      q: "How does MYHitch Connect verify provider trade licences?",
      a: "Every provider's credentials are standard-checked directly against state trade registration databases (e.g. NSW Fair Trading, QBCC, VBA) before approval.",
    },
    {
      q: "What if I need to cancel or reschedule a service booking?",
      a: "You can manage, reschedule, or communicate directly with your booked provider through your Customer Dashboard or by contacting support.",
    },
    {
      q: "How do I list my business on MYHitch Connect?",
      a: "Click 'Become a Provider' in the menu bar to complete our fast 3-step onboarding form and upload your licence & insurance documents.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans">
      <Header />

      <main className="flex-1">
        {/* HERO BANNER SECTION MATCHING LOGIN WAVE GRAPHICS */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#2c89ff] via-[#1c6df3] to-[#0946cd] text-white py-16 lg:py-20">
          <svg
            className="absolute inset-0 h-full w-full opacity-20 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="contact-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-grid)" />
          </svg>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-white border border-white/25 mb-4 shadow-lg">
              <IconHeadset className="h-4 w-4 text-blue-200" />
              <span>MYHitch Customer & Provider Support</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider text-white uppercase leading-tight">
              WE&apos;RE HERE TO <span className="underline underline-offset-8 decoration-white/50">HELP YOU</span>
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-blue-100/90 max-w-xl mx-auto leading-relaxed font-medium">
              Have questions about booking a provider, verifying trade credentials, or managing your listing? Reach out to our Australian support team.
            </p>
          </div>
        </section>

        {/* MAIN CONTACT FORM & INFO SECTION */}
        <section className="py-16 bg-white border-b border-slate-200/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* LEFT COLUMN: CONTACT CARDS */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <Badge className="bg-[#f0f7ff] text-[#2b89ff] border border-[#2b89ff]/30 font-extrabold uppercase tracking-wider text-xs mb-3">
                    Direct Contact Channels
                  </Badge>
                  <h2 className="text-3xl font-black text-slate-900">Get in Touch</h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Connect with our specialized support departments.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-5 rounded-3xl bg-slate-50/70 border border-slate-200/80 flex items-start gap-4 hover:border-[#2b89ff] transition-all hover:shadow-xl hover:shadow-blue-500/5">
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#2c89ff] via-[#1c6df3] to-[#0946cd] text-white flex shrink-0 items-center justify-center shadow-md shadow-blue-500/20">
                      <IconMail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">Email Support</h3>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">support@myhitchconnect.com.au</p>
                      <p className="text-[11px] text-[#2b89ff] font-bold mt-1">Mon-Fri response within 2 hours</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-3xl bg-slate-50/70 border border-slate-200/80 flex items-start gap-4 hover:border-[#2b89ff] transition-all hover:shadow-xl hover:shadow-blue-500/5">
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#2c89ff] via-[#1c6df3] to-[#0946cd] text-white flex shrink-0 items-center justify-center shadow-md shadow-blue-500/20">
                      <IconBuildingStore className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">Provider Verification Desk</h3>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">verifications@myhitchconnect.com.au</p>
                      <p className="text-[11px] text-slate-400 font-semibold mt-1">Licence & Insurance Audit Submissions</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-3xl bg-slate-50/70 border border-slate-200/80 flex items-start gap-4 hover:border-[#2b89ff] transition-all hover:shadow-xl hover:shadow-blue-500/5">
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#2c89ff] via-[#1c6df3] to-[#0946cd] text-white flex shrink-0 items-center justify-center shadow-md shadow-blue-500/20">
                      <IconPhone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">Phone Inquiries</h3>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">1300 MYHITCH (1300 694 482)</p>
                      <p className="text-[11px] text-slate-400 font-semibold mt-1">Toll-free across Australia</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-3xl bg-slate-50/70 border border-slate-200/80 flex items-start gap-4 hover:border-[#2b89ff] transition-all hover:shadow-xl hover:shadow-blue-500/5">
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#2c89ff] via-[#1c6df3] to-[#0946cd] text-white flex shrink-0 items-center justify-center shadow-md shadow-blue-500/20">
                      <IconMapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">National Headquarters</h3>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">Level 18, 201 Sussex Street, Sydney NSW 2000</p>
                      <p className="text-[11px] text-slate-400 font-semibold mt-1">Australia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: HIGH CONTRAST CLEAN FORM */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-blue-900/10 relative overflow-hidden">

                  <div className="mb-6 space-y-1">
                    <h3 className="text-2xl font-black text-slate-900">Send Us a Message</h3>
                    <p className="text-xs font-medium text-slate-500">Fill out the form below and our team will respond promptly.</p>
                  </div>

                  {submittedSuccess ? (
                    <div className="p-8 rounded-3xl bg-[#f0f7ff] border border-[#2b89ff]/40 text-center space-y-4 my-8">
                      <div className="h-14 w-14 rounded-full bg-[#1b76ff] text-white mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <IconCheck className="h-7 w-7 text-white" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900">Message Sent Successfully!</h4>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                        Thank you for contacting MYHitch Connect. Ticket reference <span className="font-mono font-bold text-[#2b89ff]">#MHC-{Math.floor(100000 + Math.random() * 900000)}</span> has been dispatched to our team.
                      </p>
                      <Button
                        onClick={() => setSubmittedSuccess(false)}
                        className="rounded-full bg-[#1b76ff] text-white hover:bg-[#145ed8] font-bold text-xs uppercase tracking-widest px-6 shadow-md"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-black uppercase tracking-wider text-slate-800">Full Name *</label>
                          <div className="relative flex items-center">
                            <IconUser className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2b89ff] z-10 pointer-events-none" />
                            <Input
                              required
                              placeholder="John Citizen"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              className="h-11 border border-slate-200 bg-[#f8fafc] !pl-10 text-xs font-semibold text-slate-900 placeholder:text-slate-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#2b89ff]/40 rounded-xl transition-all shadow-xs"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-black uppercase tracking-wider text-slate-800">Email Address *</label>
                          <div className="relative flex items-center">
                            <IconMail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2b89ff] z-10 pointer-events-none" />
                            <Input
                              required
                              type="email"
                              placeholder="john@example.com.au"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="h-11 border border-slate-200 bg-[#f8fafc] !pl-10 text-xs font-semibold text-slate-900 placeholder:text-slate-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#2b89ff]/40 rounded-xl transition-all shadow-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-black uppercase tracking-wider text-slate-800">Phone Number</label>
                          <div className="relative flex items-center">
                            <IconPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2b89ff] z-10 pointer-events-none" />
                            <Input
                              placeholder="0400 000 000"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="h-11 border border-slate-200 bg-[#f8fafc] !pl-10 text-xs font-semibold text-slate-900 placeholder:text-slate-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#2b89ff]/40 rounded-xl transition-all shadow-xs"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-black uppercase tracking-wider text-slate-800">Inquiry Type</label>
                          <div className="relative flex items-center">
                            <IconHelpCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2b89ff] z-10 pointer-events-none" />
                            <select
                              value={formData.inquiryType}
                              onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                              className="w-full h-11 border border-slate-200 bg-[#f8fafc] !pl-10 pr-4 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#2b89ff]/40 focus:outline-none rounded-xl transition-all shadow-xs"
                            >
                              <option value="Customer Inquiry">Customer General Inquiry</option>
                              <option value="Provider Verification">Provider Verification Support</option>
                              <option value="Booking Assistance">Booking Assistance & Rescheduling</option>
                              <option value="Partnerships">Partnerships & Media</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-wider text-slate-800">Subject *</label>
                        <div className="relative flex items-center">
                          <IconMessage className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2b89ff] z-10 pointer-events-none" />
                          <Input
                            required
                            placeholder="How can we assist you?"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="h-11 border border-slate-200 border-l-4 border-l-[#2b89ff] bg-[#f8fafc] !pl-10 text-xs font-semibold text-slate-900 placeholder:text-slate-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#2b89ff]/40 rounded-r-xl rounded-l-none transition-all shadow-xs"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-wider text-slate-800">Message *</label>
                        <div className="relative">
                          <IconPencil className="absolute left-3.5 top-3.5 h-4 w-4 text-[#2b89ff] z-10 pointer-events-none" />
                          <Textarea
                            required
                            rows={4}
                            placeholder="Provide details about your inquiry..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="border border-slate-200 bg-[#f8fafc] !pl-10 pt-3 text-xs font-semibold text-slate-900 placeholder:text-slate-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#2b89ff]/40 rounded-xl transition-all shadow-xs"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 rounded-full bg-gradient-to-r from-[#2c89ff] via-[#1c6df3] to-[#0946cd] hover:opacity-95 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/25 transition-all active:scale-[0.99] gap-2 mt-3"
                      >
                        {isSubmitting ? (
                          <span>Sending Inquiry...</span>
                        ) : (
                          <>
                            <IconSend className="h-4 w-4 text-white" />
                            <span>SUBMIT MESSAGE</span>
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="py-20 bg-[#f8fafc] border-b border-slate-200/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-12 space-y-2">
              <Badge className="bg-[#f0f7ff] text-[#2b89ff] border border-[#2b89ff]/30 font-extrabold uppercase tracking-wider text-xs px-3 py-1">
                FAQ Support
              </Badge>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-xs hover:border-[#2b89ff] transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between font-extrabold text-sm text-slate-900 hover:text-[#2b89ff]"
                    >
                      <span>{faq.q}</span>
                      <IconChevronDown
                        className={`h-5 w-5 text-[#2b89ff] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-3 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
