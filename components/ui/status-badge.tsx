import { Badge } from "@/components/ui/badge";
import {
  type AnyStatus,
  PROVIDER_VERIFICATION_STATUS_META,
  BOOKING_STATUS_META,
  QUOTE_STATUS_META,
  LISTING_STATUS_META,
  isProviderVerificationStatus,
  isBookingStatus,
  isQuoteStatus,
  isListingStatus,
} from "@/types/status";

function resolveMeta(status: AnyStatus) {
  if (isProviderVerificationStatus(status)) return PROVIDER_VERIFICATION_STATUS_META[status];
  if (isBookingStatus(status)) return BOOKING_STATUS_META[status];
  if (isQuoteStatus(status)) return QUOTE_STATUS_META[status];
  if (isListingStatus(status)) return LISTING_STATUS_META[status];
  return { label: status, variant: "secondary" as const };
}

export function StatusBadge({
  status,
  className,
}: {
  status: AnyStatus;
  className?: string;
}) {
  const meta = resolveMeta(status);
  return (
    <Badge variant={meta.variant} className={className}>
      {meta.label}
    </Badge>
  );
}
