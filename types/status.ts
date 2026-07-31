export type ProviderVerificationStatus =
  | "draft"
  | "pending_review"
  | "action_required"
  | "approved"
  | "conditionally_approved"
  | "suspended"
  | "rejected"
  | "expired_verification";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "disputed";

export type QuoteStatus = "requested" | "quoted" | "accepted" | "declined" | "expired";

export type ListingStatus = "draft" | "pending" | "published" | "paused" | "rejected" | "archived";

export type AnyStatus =
  | ProviderVerificationStatus
  | BookingStatus
  | QuoteStatus
  | ListingStatus;

type StatusVariant = "default" | "secondary" | "success" | "warning" | "destructive" | "outline";

interface StatusMeta {
  label: string;
  variant: StatusVariant;
}

export const PROVIDER_VERIFICATION_STATUS_META: Record<ProviderVerificationStatus, StatusMeta> = {
  draft: { label: "Draft", variant: "secondary" },
  pending_review: { label: "Pending Review", variant: "warning" },
  action_required: { label: "Action Required", variant: "warning" },
  approved: { label: "Approved", variant: "success" },
  conditionally_approved: { label: "Conditionally Approved", variant: "warning" },
  suspended: { label: "Suspended", variant: "destructive" },
  rejected: { label: "Rejected", variant: "destructive" },
  expired_verification: { label: "Expired Verification", variant: "destructive" },
};

export const BOOKING_STATUS_META: Record<BookingStatus, StatusMeta> = {
  pending: { label: "Pending", variant: "warning" },
  confirmed: { label: "Confirmed", variant: "success" },
  in_progress: { label: "In Progress", variant: "default" },
  completed: { label: "Completed", variant: "success" },
  cancelled: { label: "Cancelled", variant: "secondary" },
  disputed: { label: "Disputed", variant: "destructive" },
};

export const QUOTE_STATUS_META: Record<QuoteStatus, StatusMeta> = {
  requested: { label: "Requested", variant: "warning" },
  quoted: { label: "Quoted", variant: "default" },
  accepted: { label: "Accepted", variant: "success" },
  declined: { label: "Declined", variant: "secondary" },
  expired: { label: "Expired", variant: "destructive" },
};

export const LISTING_STATUS_META: Record<ListingStatus, StatusMeta> = {
  draft: { label: "Draft", variant: "secondary" },
  pending: { label: "Pending", variant: "warning" },
  published: { label: "Published", variant: "success" },
  paused: { label: "Paused", variant: "secondary" },
  rejected: { label: "Rejected", variant: "destructive" },
  archived: { label: "Archived", variant: "secondary" },
};

export function isProviderVerificationStatus(s: string): s is ProviderVerificationStatus {
  return s in PROVIDER_VERIFICATION_STATUS_META;
}
export function isBookingStatus(s: string): s is BookingStatus {
  return s in BOOKING_STATUS_META;
}
export function isQuoteStatus(s: string): s is QuoteStatus {
  return s in QUOTE_STATUS_META;
}
export function isListingStatus(s: string): s is ListingStatus {
  return s in LISTING_STATUS_META;
}
