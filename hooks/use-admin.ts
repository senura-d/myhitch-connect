import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminStats,
  getUsers,
  getVerificationQueue,
  getListingModerationQueue,
  getReportedReviews,
  getBookingsPaymentsOverview,
  getCmsPages,
  updateCmsPage,
  getAuditLog,
  getAllListings,
  deleteListingAdmin,
  deleteUserAdmin,
  getEnquiriesAdmin,
  resolveEnquiryAdmin,
} from "@/lib/mock-api/admin";
import { createMainCategory, updateMainCategory } from "@/lib/mock-api/taxonomy";
import type { Role } from "@/types/user";

export function useAdminStats() {
  return useQuery({ queryKey: ["admin", "stats"], queryFn: getAdminStats });
}

export function useUsers(role?: Role) {
  return useQuery({ queryKey: ["admin", "users", role], queryFn: () => getUsers(role) });
}

export function useVerificationQueue() {
  return useQuery({ queryKey: ["admin", "verification-queue"], queryFn: getVerificationQueue });
}

export function useListingModerationQueue() {
  return useQuery({ queryKey: ["admin", "listing-moderation-queue"], queryFn: getListingModerationQueue });
}

export function useReportedReviews() {
  return useQuery({ queryKey: ["admin", "reported-reviews"], queryFn: getReportedReviews });
}

export function useBookingsPaymentsOverview() {
  return useQuery({ queryKey: ["admin", "bookings-payments"], queryFn: getBookingsPaymentsOverview });
}

export function useCmsPages() {
  return useQuery({ queryKey: ["admin", "cms"], queryFn: getCmsPages });
}

export function useUpdateCmsPage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: { title?: string; body?: string } }) => updateCmsPage(id, patch),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "cms"] }),
  });
}

export function useAuditLog() {
  return useQuery({ queryKey: ["admin", "audit-log"], queryFn: getAuditLog });
}

export function useCreateMainCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMainCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["taxonomy"] }),
  });
}

export function useUpdateMainCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Parameters<typeof updateMainCategory>[1] }) =>
      updateMainCategory(id, patch),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["taxonomy"] }),
  });
}

export function useAllListings() {
  return useQuery({ queryKey: ["admin", "listings"], queryFn: getAllListings });
}

export function useDeleteListingAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteListingAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "listings"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}

export function useDeleteUserAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}

export function useEnquiriesAdmin() {
  return useQuery({ queryKey: ["admin", "enquiries"], queryFn: getEnquiriesAdmin });
}

export function useResolveEnquiryAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resolveEnquiryAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "enquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}
