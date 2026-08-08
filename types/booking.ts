import type { BookingStatus, QuoteStatus } from "./status";
import type { PriceBreakdown, PaymentPlan } from "./payment";
import type { ListingMedia } from "./listing";

export interface Booking {
  id: string;
  listingId: string;
  providerId: string;
  customerId: string;
  status: BookingStatus;
  scheduledAt: string;
  durationMinutes: number;
  notes?: string;
  breakdown: PriceBreakdown;
  paymentPlan: PaymentPlan;
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  listingId: string;
  providerId: string;
  customerId: string;
  status: QuoteStatus;
  requirements: string;
  desiredDate?: string;
  attachments: ListingMedia[];
  quotedAmount?: number;
  quotedMessage?: string;
  createdAt: string;
  respondedAt?: string;
}

export interface Enquiry {
  id: string;
  listingId: string;
  providerId: string;
  customerId: string;
  message: string;
  threadId: string;
  createdAt: string;
}
