import { store, delay, nextId, recordAudit } from "./store";
import type { Provider, ProviderType } from "@/types/provider";
import type { ProviderVerificationStatus } from "@/types/status";

export interface ProviderFilters {
  query?: string;
  categoryId?: string;
  location?: string;
  verificationStatus?: ProviderVerificationStatus;
  onlyApproved?: boolean;
}

export async function getProviders(filters: ProviderFilters = {}): Promise<Provider[]> {
  let results = [...store.providers];

  if (filters.onlyApproved) {
    results = results.filter((p) => p.verificationStatus === "approved" || p.verificationStatus === "conditionally_approved");
  }
  if (filters.verificationStatus) {
    results = results.filter((p) => p.verificationStatus === filters.verificationStatus);
  }
  if (filters.categoryId) {
    results = results.filter((p) => p.categoryIds.includes(filters.categoryId!));
  }
  if (filters.location) {
    const loc = filters.location.toLowerCase();
    results = results.filter((p) =>
      p.locations.some((l) => l.suburb.toLowerCase().includes(loc) || l.state.toLowerCase() === loc)
    );
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (p) => p.businessName.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  results.sort((a, b) => Number(b.isPromoted) - Number(a.isPromoted) || b.ratingAverage - a.ratingAverage);
  return delay(results);
}

export async function getProvider(idOrSlug: string): Promise<Provider | undefined> {
  return delay(store.providers.find((p) => p.id === idOrSlug || p.slug === idOrSlug));
}

export async function createProviderDraft(payload: {
  businessName: string;
  providerType: ProviderType;
  categoryIds: string[];
}): Promise<Provider> {
  const provider: Provider = {
    id: nextId("prov"),
    slug: payload.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    businessName: payload.businessName,
    providerType: payload.providerType,
    verificationStatus: "draft",
    description: "",
    categoryIds: payload.categoryIds,
    locations: [],
    serviceRadiusKm: 20,
    languages: ["English"],
    operatingHours: [],
    socialLinks: [],
    ratingAverage: 0,
    ratingCount: 0,
    responseTimeHours: 24,
    isPromoted: false,
    createdAt: new Date().toISOString(),
  };
  store.providers.push(provider);
  return delay(provider, 400);
}

export async function updateProvider(id: string, patch: Partial<Provider>): Promise<Provider | undefined> {
  const provider = store.providers.find((p) => p.id === id);
  if (!provider) return delay(undefined);
  Object.assign(provider, patch);
  return delay(provider, 300);
}

export async function submitProviderForReview(id: string): Promise<Provider | undefined> {
  return updateProvider(id, { verificationStatus: "pending_review" });
}

export async function setProviderVerificationStatus(
  id: string,
  status: ProviderVerificationStatus,
  actorName = "Admin"
): Promise<Provider | undefined> {
  const provider = await updateProvider(id, { verificationStatus: status });
  if (provider) {
    recordAudit({
      actorId: "user-admin-01",
      actorName,
      action: `set provider verification status to ${status}`,
      targetType: "provider",
      targetId: id,
    });
  }
  return provider;
}
