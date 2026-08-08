export interface ReviewRatings {
  quality: number;
  communication: number;
  punctuality: number;
  value: number;
  professionalism: number;
}

export interface ProviderResponse {
  body: string;
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  listingId: string;
  providerId: string;
  customerId: string;
  customerName: string;
  ratings: ReviewRatings;
  overallRating: number;
  body: string;
  providerResponse?: ProviderResponse;
  reported: boolean;
  createdAt: string;
}
