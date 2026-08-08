"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useListingsByProvider, useSetListingStatus } from "@/hooks/use-listings";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getListingImage } from "@/lib/category-meta";
import { IconBox, IconPlus, IconEye, IconPencil } from "@tabler/icons-react";

export default function ProviderServicesPage() {
  const { data: listings, isLoading } = useListingsByProvider("prov-01");
  const setStatus = useSetListingStatus();

  const publish = (id: string, title: string) => {
    setStatus.mutate(
      { id, status: "published" },
      {
        onSuccess: () => toast.success(`"${title}" is now live`),
        onError: () => toast.error("Could not publish that listing"),
      }
    );
  };

  const unpublish = (id: string, title: string) => {
    setStatus.mutate(
      { id, status: "paused" },
      {
        onSuccess: () => toast.success(`"${title}" is paused`),
        onError: () => toast.error("Could not pause that listing"),
      }
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            My Services
          </h1>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            The listings customers can book. Pause one to take it off the marketplace.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => toast.info("Listing builder isn't wired up in this demo yet")}
          className="gap-1.5 rounded-full bg-[#1b76ff] text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#145ed8]"
        >
          <IconPlus className="h-4 w-4" />
          <span>New listing</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl border border-slate-200/60 bg-slate-100" />
          ))}
        </div>
      ) : listings?.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <IconBox className="mx-auto h-8 w-8 text-slate-300" />
          <h2 className="mt-3 text-base font-extrabold text-slate-900">
            No listings yet
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-xs text-slate-500">
            Add a service so customers can find and book you.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {listings?.map((listing) => (
            <article
              key={listing.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all hover:border-[#1b76ff]/50 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                <Image
                  src={getListingImage(listing.primaryCategoryId)}
                  alt={listing.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-2.5 top-2.5">
                  <StatusBadge status={listing.status} />
                </div>
                <div className="absolute right-2.5 top-2.5">
                  <Badge
                    variant="secondary"
                    className="border border--brand/30 bg-white/95 px-2.5 py-0.5 text-[10px] font-bold capitalize text--brand"
                  >
                    {listing.pricing.method.replace("_", " ")}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h2 className="line-clamp-1 text-sm font-extrabold text-slate-900">
                    {listing.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-slate-500">
                    {listing.description}
                  </p>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Price
                      </span>
                      <span className="text-base font-black text-[#1b76ff]">
                        ${listing.pricing.amount || "Quote"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 rounded-full border-slate-300 p-0 text-slate-600"
                      >
                        <Link
                          href={`/provider/prov-01/service/${listing.id}`}
                          aria-label={`Preview ${listing.title}`}
                        >
                          <IconEye className="h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        aria-label={`Edit ${listing.title}`}
                        onClick={() => toast.info("Listing editor isn't wired up yet")}
                        className="h-8 w-8 rounded-full border-slate-300 p-0 text-slate-600"
                      >
                        <IconPencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    disabled={setStatus.isPending}
                    onClick={() =>
                      listing.status === "published"
                        ? unpublish(listing.id, listing.title)
                        : publish(listing.id, listing.title)
                    }
                    className={`mt-3 w-full rounded-full text-xs font-bold ${
                      listing.status === "published"
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        : "bg-[#1b76ff] text-white hover:bg-[#145ed8]"
                    }`}
                  >
                    {listing.status === "published" ? "Pause listing" : "Publish listing"}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
