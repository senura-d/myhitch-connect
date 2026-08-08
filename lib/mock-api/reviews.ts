import { store, delay, nextId, recordAudit } from "./store";
import type { Review, ReviewRatings } from "@/types/review";

export interface CreateReviewPayload {
  bookingId: string;
  listingId: string;
  providerId: string;
  customerId: string;
  customerName: string;
  ratings: ReviewRatings;
  body: string;
}

export async function getReviewsForProvider(providerId: string): Promise<Review[]> {
  return delay(store.reviews.filter((r) => r.providerId === providerId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}

export async function getReviewsForCustomer(customerId: string): Promise<Review[]> {
  return delay(store.reviews.filter((r) => r.customerId === customerId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}

export async function createReview(payload: CreateReviewPayload): Promise<Review> {
  const { quality, communication, punctuality, value, professionalism } = payload.ratings;
  const overallRating = Math.round(((quality + communication + punctuality + value + professionalism) / 5) * 10) / 10;
  const review: Review = {
    id: nextId("rev"),
    bookingId: payload.bookingId,
    listingId: payload.listingId,
    providerId: payload.providerId,
    customerId: payload.customerId,
    customerName: payload.customerName,
    ratings: payload.ratings,
    overallRating,
    body: payload.body,
    reported: false,
    createdAt: new Date().toISOString(),
  };
  store.reviews.push(review);

  const provider = store.providers.find((p) => p.id === payload.providerId);
  if (provider) {
    const providerReviews = store.reviews.filter((r) => r.providerId === payload.providerId);
    provider.ratingCount = providerReviews.length;
    provider.ratingAverage =
      Math.round((providerReviews.reduce((sum, r) => sum + r.overallRating, 0) / providerReviews.length) * 10) / 10;
  }

  return delay(review, 400);
}

export async function respondToReview(id: string, body: string): Promise<Review | undefined> {
  const review = store.reviews.find((r) => r.id === id);
  if (!review) return delay(undefined);
  review.providerResponse = { body, createdAt: new Date().toISOString() };
  return delay(review, 300);
}

export async function reportReview(id: string): Promise<Review | undefined> {
  const review = store.reviews.find((r) => r.id === id);
  if (!review) return delay(undefined);
  review.reported = true;
  recordAudit({
    actorId: review.customerId,
    actorName: "Customer",
    action: "reported a review",
    targetType: "review",
    targetId: id,
  });
  return delay(review, 300);
}

export async function moderateReview(id: string, action: "dismiss" | "remove"): Promise<Review | undefined> {
  if (action === "remove") {
    const index = store.reviews.findIndex((r) => r.id === id);
    if (index === -1) return delay(undefined);
    const [removed] = store.reviews.splice(index, 1);
    recordAudit({
      actorId: "user-admin-01",
      actorName: "Admin",
      action: "removed a reported review",
      targetType: "review",
      targetId: id,
    });
    return delay(removed, 300);
  }
  const review = store.reviews.find((r) => r.id === id);
  if (!review) return delay(undefined);
  review.reported = false;
  recordAudit({
    actorId: "user-admin-01",
    actorName: "Admin",
    action: "dismissed a review report",
    targetType: "review",
    targetId: id,
  });
  return delay(review, 300);
}
