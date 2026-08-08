import type { ProviderVerificationStatus } from "./status";

export type ProviderType = "individual" | "sole_trader" | "company" | "non_profit" | "government";

export interface OperatingHours {
  day: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  open: string | null;
  close: string | null;
}

export interface ProviderLocation {
  suburb: string;
  state: string;
  postcode: string;
  country: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface Provider {
  id: string;
  slug: string;
  businessName: string;
  providerType: ProviderType;
  verificationStatus: ProviderVerificationStatus;
  logoUrl?: string;
  coverImageUrl?: string;
  description: string;
  categoryIds: string[];
  locations: ProviderLocation[];
  serviceRadiusKm: number;
  languages: string[];
  operatingHours: OperatingHours[];
  socialLinks: { platform: string; url: string }[];
  ratingAverage: number;
  ratingCount: number;
  responseTimeHours: number;
  isPromoted: boolean;
  createdAt: string;
  staff?: StaffMember[];
}
