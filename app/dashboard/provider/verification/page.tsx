"use client";

import React from "react";
import { toast } from "sonner";
import { useProvider } from "@/hooks/use-providers";
import { useTaxonomy } from "@/hooks/use-taxonomy";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/ui/file-upload";
import {
  IconShieldCheck,
  IconCheck,
  IconAlertCircle,
  IconFileText,
} from "@tabler/icons-react";

export default function ProviderVerificationPage() {
  const { data: provider } = useProvider("prov-01");
  const { data: taxonomy } = useTaxonomy();

  const [abn, setAbn] = React.useState("");
  const [licenceNumber, setLicenceNumber] = React.useState("");
  const [licenceExpiry, setLicenceExpiry] = React.useState("");
  const [insurer, setInsurer] = React.useState("");
  const [coverAmount, setCoverAmount] = React.useState("");

  // Documents required depend on which categories this provider operates in.
  const requiredDocuments = React.useMemo(() => {
    if (!provider || !taxonomy) return [];
    const seen = new Map<string, { key: string; label: string; required: boolean }>();
    taxonomy
      .filter((cat) => provider.categoryIds.includes(cat.id))
      .forEach((cat) =>
        cat.requiredDocuments.forEach((doc) => {
          if (!seen.has(doc.key)) seen.set(doc.key, doc);
        })
      );
    return [...seen.values()];
  }, [provider, taxonomy]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Submitted for review", {
      description: "We'll check your details against official sources.",
    });
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Licence &amp; ABN
        </h1>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          Your compliance record. Listings stay hidden until this is approved.
        </p>
      </div>

      {/* Current status */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0f9ff]">
              <IconShieldCheck className="h-6 w-6 text-brand" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-extrabold text-slate-900">
                {provider?.businessName ?? "Your business"}
              </h2>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
                Verification status
              </p>
            </div>
          </div>

          {provider && <StatusBadge status={provider.verificationStatus} />}
        </div>

        <p className="mt-5 flex items-start gap-2 rounded-xl border border-brand/25 bg-[#f0f9ff] px-3 py-2.5 text-[11px] font-medium text-slate-700">
          <IconAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          We verify every licence and insurance policy against official registers.
          Re-check happens automatically before expiry — keep these details current
          or your listings are paused.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Compliance details */}
        <section className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8"
          >
            <h2 className="text-sm font-extrabold text-slate-900">
              Business &amp; licence details
            </h2>

            <div className="space-y-1.5">
              <Label htmlFor="abn">ABN</Label>
              <Input
                id="abn"
                name="abn"
                inputMode="numeric"
                value={abn}
                onChange={(e) => setAbn(e.target.value)}
                placeholder="51 824 753 556"
              />
              <p className="text-[11px] text-slate-500">
                Checked against the Australian Business Register.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="licence-number">Trade licence number</Label>
                <Input
                  id="licence-number"
                  name="licenceNumber"
                  value={licenceNumber}
                  onChange={(e) => setLicenceNumber(e.target.value)}
                  placeholder="e.g. 123456C"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="licence-expiry">Licence expiry</Label>
                <Input
                  id="licence-expiry"
                  name="licenceExpiry"
                  type="date"
                  value={licenceExpiry}
                  onChange={(e) => setLicenceExpiry(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="insurer">Public liability insurer</Label>
                <Input
                  id="insurer"
                  name="insurer"
                  value={insurer}
                  onChange={(e) => setInsurer(e.target.value)}
                  placeholder="Insurer name"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cover-amount">Cover amount</Label>
                <Input
                  id="cover-amount"
                  name="coverAmount"
                  value={coverAmount}
                  onChange={(e) => setCoverAmount(e.target.value)}
                  placeholder="$20,000,000"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5">
              <Button
                type="submit"
                size="sm"
                className="rounded-full bg-[#1b76ff] px-5 text-xs font-bold text-white hover:bg-[#145ed8]"
              >
                Submit for review
              </Button>
            </div>
          </form>
        </section>

        {/* Required documents */}
        <section className="lg:col-span-5">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8">
            <h2 className="text-sm font-extrabold text-slate-900">
              Required documents
            </h2>
            <p className="mt-1 text-[11px] font-semibold text-slate-500">
              Based on the categories you operate in.
            </p>

            {requiredDocuments.length === 0 ? (
              <p className="mt-4 text-xs text-slate-500">
                No documents required for your current categories.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {requiredDocuments.map((doc) => (
                  <li
                    key={doc.key}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
                  >
                    <IconFileText className="h-4 w-4 shrink-0 text-brand" />
                    <span className="min-w-0 flex-1 text-[11px] font-bold text-slate-800">
                      {doc.label}
                    </span>
                    {doc.required ? (
                      <span className="shrink-0 rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-600">
                        Required
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Optional
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 border-t border-slate-100 pt-5">
              <Label className="mb-2 block">Upload documents</Label>
              <FileUpload
                accept=".pdf,.jpg,.jpeg,.png"
                maxSizeMb={10}
                hint="PDF, JPG or PNG · max 10MB each"
                onFilesChange={(files) => {
                  if (files.length > 0) {
                    toast.success(`${files.length} document(s) attached`);
                  }
                }}
              />
            </div>

            <p className="mt-4 flex items-start gap-2 text-[11px] text-slate-500">
              <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
              Documents are only used for verification and are never shown on your
              public profile.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
