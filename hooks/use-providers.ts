import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProviders,
  getProvider,
  createProviderDraft,
  updateProvider,
  submitProviderForReview,
  setProviderVerificationStatus,
  type ProviderFilters,
} from "@/lib/mock-api/providers";
import type { Provider } from "@/types/provider";
import type { ProviderVerificationStatus } from "@/types/status";

export function useProviders(filters: ProviderFilters = {}) {
  return useQuery({ queryKey: ["providers", filters], queryFn: () => getProviders(filters) });
}

export function useProvider(idOrSlug: string | undefined) {
  return useQuery({
    queryKey: ["provider", idOrSlug],
    queryFn: () => getProvider(idOrSlug!),
    enabled: !!idOrSlug,
  });
}

export function useCreateProviderDraft() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProviderDraft,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["providers"] }),
  });
}

export function useUpdateProvider() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<Provider> }) => updateProvider(id, patch),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["provider", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
  });
}

export function useSubmitProviderForReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitProviderForReview,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["provider", id] });
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
  });
}

export function useSetProviderVerificationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ProviderVerificationStatus }) =>
      setProviderVerificationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      queryClient.invalidateQueries({ queryKey: ["provider"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "verification-queue"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}
