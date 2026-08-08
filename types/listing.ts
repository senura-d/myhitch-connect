import type { ListingStatus } from "./status";

export type PricingMethod =
  | "fixed"
  | "starting_from"
  | "hourly"
  | "daily"
  | "package"
  | "free_consultation"
  | "quote_required"
  | "recurring_fee";

export type DeliveryMode =
  | "at_provider_location"
  | "at_customer_location"
  | "online"
  | "mobile"
  | "hybrid"
  | "nationwide";

export type BookingPathway = "instant" | "quote" | "enquiry";

export interface PricingDetail {
  method: PricingMethod;
  amount?: number;
  currency: string;
  unit?: string;
  packageTiers?: { name: string; price: number; description: string }[];
  recurringInterval?: "weekly" | "monthly" | "yearly";
}

export interface Coverage {
  type: "postcodes" | "suburb_radius" | "states" | "countries" | "online";
  values: string[];
  radiusKm?: number;
}

export interface AvailabilityRule {
  leadTimeHours: number;
  blackoutDates: string[];
  bookableDays: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[];
}

export interface ListingMedia {
  id: string;
  type: "image" | "video" | "document";
  url: string;
  caption?: string;
}

export interface ListingTerms {
  cancellationPolicy: string;
  refundPolicy: string;
  travelCharges?: string;
  exclusions?: string;
}

export interface ServiceListing {
  id: string;
  providerId: string;
  title: string;
  primaryCategoryId: string;
  secondaryCategoryId?: string;
  description: string;
  pricing: PricingDetail;
  deliveryMode: DeliveryMode;
  bookingPathway: BookingPathway;
  coverage: Coverage;
  durationMinutes?: number;
  capacity?: number;
  availability: AvailabilityRule;
  media: ListingMedia[];
  terms: ListingTerms;
  complianceValues: Record<string, string | number | boolean>;
  status: ListingStatus;
  isFeatured: boolean;
  createdAt: string;
}
