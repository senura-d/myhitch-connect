import { store, delay, nextId, recordAudit } from "./store";
import type { ServiceListing, DeliveryMode } from "@/types/listing";
import type { Provider } from "@/types/provider";
import type { ListingStatus } from "@/types/status";
import { resolveServiceType } from "./taxonomy";

export interface ListingSearchResult {
  listing: ServiceListing;
  provider: Provider;
}

export type SortOption = "relevance" | "rating" | "response_time" | "price_low" | "price_high";

export interface SearchFilters {
  query?: string;
  categoryId?: string;
  mainCategoryId?: string;
  location?: string;
  deliveryMode?: DeliveryMode;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
}

function isPublished(listing: ServiceListing) {
  return listing.status === "published";
}

export async function searchListings(filters: SearchFilters = {}): Promise<ListingSearchResult[]> {
  let results: ListingSearchResult[] = store.listings
    .filter(isPublished)
    .map((listing) => ({ listing, provider: store.providers.find((p) => p.id === listing.providerId)! }))
    .filter((r) => !!r.provider);

  if (filters.categoryId) {
    results = results.filter((r) => r.listing.primaryCategoryId === filters.categoryId);
  }
  if (filters.mainCategoryId) {
    results = results.filter(
      (r) => resolveServiceType(r.listing.primaryCategoryId)?.mainCategory.id === filters.mainCategoryId
    );
  }
  if (filters.deliveryMode) {
    results = results.filter((r) => r.listing.deliveryMode === filters.deliveryMode);
  }
  if (filters.location) {
    const loc = filters.location.toLowerCase();
    results = results.filter((r) =>
      r.provider.locations.some((l) => l.suburb.toLowerCase().includes(loc) || l.state.toLowerCase() === loc)
    );
  }
  if (filters.minPrice != null) {
    results = results.filter((r) => (r.listing.pricing.amount ?? 0) >= filters.minPrice!);
  }
  if (filters.maxPrice != null) {
    results = results.filter((r) => (r.listing.pricing.amount ?? Infinity) <= filters.maxPrice!);
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (r) =>
        r.listing.title.toLowerCase().includes(q) ||
        r.listing.description.toLowerCase().includes(q) ||
        r.provider.businessName.toLowerCase().includes(q)
    );
  }

  const sort = filters.sort ?? "relevance";
  results.sort((a, b) => {
    switch (sort) {
      case "rating":
        return b.provider.ratingAverage - a.provider.ratingAverage;
      case "response_time":
        return a.provider.responseTimeHours - b.provider.responseTimeHours;
      case "price_low":
        return (a.listing.pricing.amount ?? 0) - (b.listing.pricing.amount ?? 0);
      case "price_high":
        return (b.listing.pricing.amount ?? 0) - (a.listing.pricing.amount ?? 0);
      case "relevance":
      default:
        return (
          Number(b.listing.isFeatured) - Number(a.listing.isFeatured) ||
          Number(b.provider.isPromoted) - Number(a.provider.isPromoted) ||
          b.provider.ratingAverage - a.provider.ratingAverage
        );
    }
  });

  return delay(results);
}

export async function getListing(id: string): Promise<ServiceListing | undefined> {
  return delay(store.listings.find((l) => l.id === id));
}

export async function getListingsByProvider(providerId: string): Promise<ServiceListing[]> {
  return delay(store.listings.filter((l) => l.providerId === providerId));
}

export async function getFeaturedListings(limit = 8): Promise<ListingSearchResult[]> {
  const results = await searchListings({ sort: "relevance" });
  return results.slice(0, limit);
}

export async function createListing(
  payload: Omit<ServiceListing, "id" | "createdAt" | "status" | "isFeatured">
): Promise<ServiceListing> {
  const listing: ServiceListing = {
    ...payload,
    id: nextId("list"),
    status: "pending",
    isFeatured: false,
    createdAt: new Date().toISOString(),
  };
  store.listings.push(listing);
  return delay(listing, 400);
}

export async function updateListing(id: string, patch: Partial<ServiceListing>): Promise<ServiceListing | undefined> {
  const listing = store.listings.find((l) => l.id === id);
  if (!listing) return delay(undefined);
  Object.assign(listing, patch);
  return delay(listing, 300);
}

export async function setListingStatus(
  id: string,
  status: ListingStatus,
  actorName = "Admin"
): Promise<ServiceListing | undefined> {
  const listing = await updateListing(id, { status });
  if (listing) {
    recordAudit({
      actorId: "user-admin-01",
      actorName,
      action: `set listing status to ${status}`,
      targetType: "listing",
      targetId: id,
    });
  }
  return listing;
}
