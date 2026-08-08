import { store, delay, nextId } from "./store";
import type { QuoteRequest } from "@/types/booking";
import type { ListingMedia } from "@/types/listing";

export interface SubmitQuoteRequestPayload {
  listingId: string;
  providerId: string;
  customerId: string;
  requirements: string;
  desiredDate?: string;
  attachments?: ListingMedia[];
}

export async function getQuotesForCustomer(customerId: string): Promise<QuoteRequest[]> {
  return delay(store.quotes.filter((q) => q.customerId === customerId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}

export async function getQuotesForProvider(providerId: string): Promise<QuoteRequest[]> {
  return delay(store.quotes.filter((q) => q.providerId === providerId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}

export async function getQuote(id: string): Promise<QuoteRequest | undefined> {
  return delay(store.quotes.find((q) => q.id === id));
}

export async function submitQuoteRequest(payload: SubmitQuoteRequestPayload): Promise<QuoteRequest> {
  const quote: QuoteRequest = {
    id: nextId("quote"),
    listingId: payload.listingId,
    providerId: payload.providerId,
    customerId: payload.customerId,
    status: "requested",
    requirements: payload.requirements,
    desiredDate: payload.desiredDate,
    attachments: payload.attachments ?? [],
    createdAt: new Date().toISOString(),
  };
  store.quotes.push(quote);
  return delay(quote, 500);
}

export async function respondToQuoteAsProvider(
  id: string,
  payload: { quotedAmount: number; quotedMessage: string }
): Promise<QuoteRequest | undefined> {
  const quote = store.quotes.find((q) => q.id === id);
  if (!quote) return delay(undefined);
  quote.status = "quoted";
  quote.quotedAmount = payload.quotedAmount;
  quote.quotedMessage = payload.quotedMessage;
  quote.respondedAt = new Date().toISOString();
  return delay(quote, 400);
}

export async function respondToQuoteAsCustomer(
  id: string,
  action: "accept" | "decline"
): Promise<QuoteRequest | undefined> {
  const quote = store.quotes.find((q) => q.id === id);
  if (!quote) return delay(undefined);
  quote.status = action === "accept" ? "accepted" : "declined";
  return delay(quote, 300);
}
