import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReviewsForProvider,
  getReviewsForCustomer,
  createReview,
  respondToReview,
  reportReview,
  moderateReview,
} from "@/lib/mock-api/reviews";

export function useReviewsForProvider(providerId: string | undefined) {
  return useQuery({
    queryKey: ["reviews", "provider", providerId],
    queryFn: () => getReviewsForProvider(providerId!),
    enabled: !!providerId,
  });
}

export function useReviewsForCustomer(customerId: string | undefined) {
  return useQuery({
    queryKey: ["reviews", "customer", customerId],
    queryFn: () => getReviewsForCustomer(customerId!),
    enabled: !!customerId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReview,
    onSuccess: (review) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", "provider", review.providerId] });
      queryClient.invalidateQueries({ queryKey: ["provider", review.providerId] });
    },
  });
}

export function useRespondToReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: string }) => respondToReview(id, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });
}

export function useReportReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reportReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "reported-reviews"] });
    },
  });
}

export function useModerateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: "dismiss" | "remove" }) => moderateReview(id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "reported-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "audit-log"] });
    },
  });
}
