import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQuotesForCustomer,
  getQuotesForProvider,
  getQuote,
  submitQuoteRequest,
  respondToQuoteAsProvider,
  respondToQuoteAsCustomer,
} from "@/lib/mock-api/quotes";

export function useQuotesForCustomer(customerId: string | undefined) {
  return useQuery({
    queryKey: ["quotes", "customer", customerId],
    queryFn: () => getQuotesForCustomer(customerId!),
    enabled: !!customerId,
  });
}

export function useQuotesForProvider(providerId: string | undefined) {
  return useQuery({
    queryKey: ["quotes", "provider", providerId],
    queryFn: () => getQuotesForProvider(providerId!),
    enabled: !!providerId,
  });
}

export function useQuote(id: string | undefined) {
  return useQuery({ queryKey: ["quote", id], queryFn: () => getQuote(id!), enabled: !!id });
}

export function useSubmitQuoteRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitQuoteRequest,
    onSuccess: (quote) => {
      queryClient.invalidateQueries({ queryKey: ["quotes", "customer", quote.customerId] });
      queryClient.invalidateQueries({ queryKey: ["quotes", "provider", quote.providerId] });
    },
  });
}

export function useRespondToQuoteAsProvider() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quotedAmount, quotedMessage }: { id: string; quotedAmount: number; quotedMessage: string }) =>
      respondToQuoteAsProvider(id, { quotedAmount, quotedMessage }),
    onSuccess: (quote) => {
      queryClient.invalidateQueries({ queryKey: ["quote", quote?.id] });
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });
}

export function useRespondToQuoteAsCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: "accept" | "decline" }) => respondToQuoteAsCustomer(id, action),
    onSuccess: (quote) => {
      queryClient.invalidateQueries({ queryKey: ["quote", quote?.id] });
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });
}
