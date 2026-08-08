import taxonomySeed from "./data/taxonomy.json";
import providersSeed from "./data/providers.json";
import listingsSeed from "./data/listings.json";
import usersSeed from "./data/users.json";
import bookingsSeed from "./data/bookings.json";
import quotesSeed from "./data/quotes.json";
import enquiriesSeed from "./data/enquiries.json";
import messageThreadsSeed from "./data/message-threads.json";
import reviewsSeed from "./data/reviews.json";
import cmsSeed from "./data/cms.json";
import auditLogSeed from "./data/audit-log.json";

import type { MainCategory } from "@/types/taxonomy";
import type { Provider } from "@/types/provider";
import type { ServiceListing } from "@/types/listing";
import type { User } from "@/types/user";
import type { Booking, QuoteRequest, Enquiry } from "@/types/booking";
import type { MessageThread } from "@/types/message";
import type { Review } from "@/types/review";

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  body: string;
  updatedAt: string;
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  targetType: string;
  targetId: string;
  createdAt: string;
}

function clone<T>(value: unknown): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function freshState() {
  return {
    taxonomy: clone<MainCategory[]>(taxonomySeed),
    providers: clone<Provider[]>(providersSeed),
    listings: clone<ServiceListing[]>(listingsSeed),
    users: clone<User[]>(usersSeed),
    bookings: clone<Booking[]>(bookingsSeed),
    quotes: clone<QuoteRequest[]>(quotesSeed),
    enquiries: clone<Enquiry[]>(enquiriesSeed),
    messageThreads: clone<MessageThread[]>(messageThreadsSeed),
    reviews: clone<Review[]>(reviewsSeed),
    cms: clone<CmsPage[]>(cmsSeed),
    auditLog: clone<AuditLogEntry[]>(auditLogSeed),
  };
}

export const store = freshState();

/** Resets the in-memory store back to seed data (dev/testing convenience only). */
export function resetStore() {
  Object.assign(store, freshState());
}

let idCounter = 1000;
export function nextId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

export function recordAudit(entry: Omit<AuditLogEntry, "id" | "createdAt">) {
  store.auditLog.unshift({
    ...entry,
    id: nextId("audit"),
    createdAt: new Date().toISOString(),
  });
}

/** Returns data immediately — no artificial latency for mock endpoints. */
export function delay<T>(value: T, _ms = 0): Promise<T> {
  return Promise.resolve(value);
}
