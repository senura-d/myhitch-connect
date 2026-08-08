import { store, delay, recordAudit } from "./store";
import type { User, Role } from "@/types/user";
import type { CmsPage, AuditLogEntry } from "./store";
import type { ServiceListing } from "@/types/listing";
import type { Provider } from "@/types/provider";
import type { Enquiry } from "@/types/booking";
import type { EnquiryStatus } from "@/types/status";

export interface AdminStats {
  totalProviders: number;
  approvedProviders: number;
  pendingVerification: number;
  activeListings: number;
  totalBookings: number;
  totalRevenue: number;
  disputedBookings: number;
  reportedReviews: number;
  registrationsSeries: { label: string; value: number }[];
  revenueSeries: { label: string; value: number }[];
  bookingsByStatus: { label: string; value: number }[];
}

export async function getAdminStats(): Promise<AdminStats> {
  const approvedProviders = store.providers.filter(
    (p) => p.verificationStatus === "approved" || p.verificationStatus === "conditionally_approved"
  ).length;
  const pendingVerification = store.providers.filter(
    (p) => p.verificationStatus === "pending_review" || p.verificationStatus === "action_required"
  ).length;
  const activeListings = store.listings.filter((l) => l.status === "published").length;
  const totalRevenue = store.bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + b.breakdown.total, 0);
  const disputedBookings = store.bookings.filter((b) => b.status === "disputed").length;
  const reportedReviews = store.reviews.filter((r) => r.reported).length;

  const statusCounts = new Map<string, number>();
  for (const b of store.bookings) statusCounts.set(b.status, (statusCounts.get(b.status) ?? 0) + 1);

  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const registrationsSeries = months.map((label, i) => ({
    label,
    value: Math.max(1, Math.round(store.providers.length * ((i + 2) / (months.length + 3)))),
  }));
  const revenueSeries = months.map((label, i) => ({
    label,
    value: Math.round((totalRevenue || 1000) * ((i + 1) / (months.length * 1.4))),
  }));

  return delay(
    {
      totalProviders: store.providers.length,
      approvedProviders,
      pendingVerification,
      activeListings,
      totalBookings: store.bookings.length,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      disputedBookings,
      reportedReviews,
      registrationsSeries,
      revenueSeries,
      bookingsByStatus: Array.from(statusCounts.entries()).map(([label, value]) => ({ label, value })),
    },
    350
  );
}

export async function getUsers(role?: Role): Promise<User[]> {
  const results = role ? store.users.filter((u) => u.role === role) : store.users;
  return delay(results);
}

export async function getVerificationQueue() {
  return delay(store.providers.filter((p) => p.verificationStatus === "pending_review" || p.verificationStatus === "action_required"));
}

export async function getListingModerationQueue() {
  return delay(store.listings.filter((l) => l.status === "pending"));
}

export async function getReportedReviews() {
  return delay(store.reviews.filter((r) => r.reported));
}

export async function getBookingsPaymentsOverview() {
  return delay(
    store.bookings
      .map((b) => ({
        booking: b,
        customer: store.users.find((u) => u.id === b.customerId),
        provider: store.providers.find((p) => p.id === b.providerId),
      }))
      .sort((a, b) => b.booking.createdAt.localeCompare(a.booking.createdAt))
  );
}

export async function getCmsPages(): Promise<CmsPage[]> {
  return delay(store.cms);
}

export async function updateCmsPage(id: string, patch: Partial<Pick<CmsPage, "title" | "body">>): Promise<CmsPage | undefined> {
  const page = store.cms.find((p) => p.id === id);
  if (!page) return delay(undefined);
  Object.assign(page, patch, { updatedAt: new Date().toISOString() });
  return delay(page, 300);
}

export async function getAuditLog(): Promise<AuditLogEntry[]> {
  return delay(store.auditLog);
}

export async function getAllListings(): Promise<{ listing: ServiceListing; provider?: Provider }[]> {
  const results = store.listings.map((l) => ({
    listing: l,
    provider: store.providers.find((p) => p.id === l.providerId),
  }));
  return delay(results);
}

export async function deleteListingAdmin(id: string): Promise<boolean> {
  const idx = store.listings.findIndex((l) => l.id === id);
  if (idx !== -1) {
    store.listings.splice(idx, 1);
    recordAudit({
      actorId: "admin-01",
      actorName: "Compliance Desk",
      action: `deleted service listing (ID: ${id})`,
      targetType: "service_listing",
      targetId: id,
    });
    return delay(true);
  }
  return delay(false);
}

export async function deleteUserAdmin(id: string): Promise<boolean> {
  const idx = store.users.findIndex((u) => u.id === id);
  if (idx !== -1) {
    const user = store.users[idx];
    store.users.splice(idx, 1);
    if (user.role === "provider") {
      const pIdx = store.providers.findIndex((p) => p.id === user.id);
      if (pIdx !== -1) store.providers.splice(pIdx, 1);
    }
    recordAudit({
      actorId: "admin-01",
      actorName: "Compliance Desk",
      action: `deleted user account (Name: ${user.name}, Role: ${user.role})`,
      targetType: "user",
      targetId: id,
    });
    return delay(true);
  }
  return delay(false);
}

export async function getEnquiriesAdmin(): Promise<{ enquiry: Enquiry & { status: EnquiryStatus; subject: string }; customer?: User; provider?: Provider }[]> {
  const results = store.enquiries.map((e) => ({
    enquiry: {
      ...e,
      status: (e as Enquiry & { status?: EnquiryStatus }).status ?? "pending",
      subject: (e as Enquiry & { subject?: string }).subject || `Enquiry for Service #${e.listingId}`,
    },
    customer: store.users.find((u) => u.id === e.customerId),
    provider: store.providers.find((p) => p.id === e.providerId),
  }));
  return delay(results);
}

export async function resolveEnquiryAdmin(id: string): Promise<boolean> {
  const enquiry = store.enquiries.find((e) => e.id === id);
  if (enquiry) {
    (enquiry as Enquiry & { status?: string }).status = "resolved";
    recordAudit({
      actorId: "admin-01",
      actorName: "Compliance Desk",
      action: `resolved support enquiry (ID: ${id})`,
      targetType: "enquiry",
      targetId: id,
    });
    return delay(true);
  }
  return delay(false);
}
