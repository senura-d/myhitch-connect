import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  searchListings,
  getListing,
  getListingsByProvider,
  getFeaturedListings,
  createListing,
  updateListing,
  setListingStatus,
  type SearchFilters,
} from "@/lib/mock-api/listings";
import type { ServiceListing } from "@/types/listing";
import type { ListingStatus } from "@/types/status";

export function useSearchListings(filters: SearchFilters = {}) {
  return useQuery({ queryKey: ["listings", "search", filters], queryFn: () => searchListings(filters) });
}

export function useFeaturedListings(limit = 8) {
  return useQuery({ queryKey: ["listings", "featured", limit], queryFn: () => getFeaturedListings(limit) });
}

export function useListing(id: string | undefined) {
  return useQuery({ queryKey: ["listing", id], queryFn: () => getListing(id!), enabled: !!id });
}

export function useListingsByProvider(providerId: string | undefined) {
  return useQuery({
    queryKey: ["listings", "provider", providerId],
    queryFn: () => getListingsByProvider(providerId!),
    enabled: !!providerId,
  });
}

export function useCreateListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createListing,
    onSuccess: (listing) => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["listings", "provider", listing.providerId] });
    },
  });
}

export function useUpdateListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<ServiceListing> }) => updateListing(id, patch),
    onSuccess: (listing) => {
      queryClient.invalidateQueries({ queryKey: ["listing", listing?.id] });
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });
}

export function useSetListingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ListingStatus }) => setListingStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "listing-moderation-queue"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}
