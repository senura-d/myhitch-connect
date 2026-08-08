import type { Role } from "@/types/user";

export type NotificationType =
  | "booking"
  | "verification"
  | "review"
  | "alert"
  | "system";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
  /** Where clicking the notification should take you, when there's somewhere useful. */
  href?: string;
}

/**
 * Notifications are role-specific — a customer never sees "your licence was
 * approved", and an admin cares about the review queue rather than their own
 * bookings. Keyed by role so each dashboard shows something truthful.
 */
const BY_ROLE: Record<Role, AppNotification[]> = {
  customer: [
    {
      id: "c1",
      type: "booking",
      title: "Booking confirmed",
      description:
        "Sunrise Plumbing Co. confirmed your end of lease clean for 14 Aug, 9:00 AM.",
      time: "2 min ago",
      read: false,
      href: "/dashboard/customer/bookings",
    },
    {
      id: "c2",
      type: "alert",
      title: "Quote received",
      description:
        "Harbor Plumbing & Gas replied to your quote request with a price of $410.",
      time: "1 hour ago",
      read: false,
      href: "/dashboard/customer/bookings",
    },
    {
      id: "c3",
      type: "system",
      title: "Provider on the way",
      description: "Your garden design consult starts in 30 minutes.",
      time: "3 hours ago",
      read: false,
      href: "/dashboard/customer/bookings",
    },
    {
      id: "c4",
      type: "review",
      title: "Leave a review",
      description:
        "How did your plumbing repair go? Your feedback helps other customers.",
      time: "Yesterday",
      read: true,
      href: "/dashboard/customer/bookings",
    },
    {
      id: "c5",
      type: "verification",
      title: "New verified providers near you",
      description: "Three licence-checked electricians joined in Fitzroy this week.",
      time: "2 days ago",
      read: true,
      href: "/dashboard/customer/services",
    },
  ],

  provider: [
    {
      id: "p1",
      type: "booking",
      title: "New booking request",
      description:
        "Linda B. requested an end of lease clean for 14 Aug, 9:00 AM. Accept to confirm.",
      time: "2 min ago",
      read: false,
      href: "/dashboard/provider/bookings",
    },
    {
      id: "p2",
      type: "verification",
      title: "Licence verified",
      description:
        "Your trade licence has been approved. Your listings are live on the marketplace.",
      time: "1 hour ago",
      read: false,
      href: "/dashboard/provider/verification",
    },
    {
      id: "p3",
      type: "review",
      title: "New 5-star review",
      description: 'James K. wrote: "Excellent work, very professional."',
      time: "3 hours ago",
      read: false,
    },
    {
      id: "p4",
      type: "alert",
      title: "Insurance expiring soon",
      description:
        "Your public liability cover expires in 21 days. Upload a current certificate to stay listed.",
      time: "Yesterday",
      read: true,
      href: "/dashboard/provider/verification",
    },
    {
      id: "p5",
      type: "system",
      title: "Payout sent",
      description: "$388 for booking bk-104 is on its way to your account.",
      time: "2 days ago",
      read: true,
    },
  ],

  admin: [
    {
      id: "a1",
      type: "verification",
      title: "3 providers awaiting review",
      description:
        "New submissions in the verification queue need a licence and insurance check.",
      time: "5 min ago",
      read: false,
      href: "/admin/providers/verification",
    },
    {
      id: "a2",
      type: "alert",
      title: "Expired licence detected",
      description:
        "BrightSpark Electrical's trade licence lapsed — their listings were paused automatically.",
      time: "40 min ago",
      read: false,
      href: "/admin/providers/verification",
    },
    {
      id: "a3",
      type: "review",
      title: "Review reported",
      description:
        "A provider flagged a 1-star review as inaccurate. Awaiting moderation.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "a4",
      type: "booking",
      title: "Disputed booking",
      description: "Booking bk-118 was marked disputed by the customer.",
      time: "Yesterday",
      read: true,
    },
    {
      id: "a5",
      type: "system",
      title: "Weekly compliance digest",
      description: "12 providers verified, 2 suspended, 1 expired in the last 7 days.",
      time: "2 days ago",
      read: true,
    },
  ],
};

export function getNotificationsForRole(role: Role): AppNotification[] {
  // Copy so a dashboard's local read/dismiss state can't mutate the source.
  return BY_ROLE[role].map((n) => ({ ...n }));
}
