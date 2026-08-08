export type PaymentPlan = "deposit" | "full" | "milestone";
export type PaymentMethodType = "card" | "wallet";

export interface PriceBreakdown {
  subtotal: number;
  serviceFee: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
}

export interface Milestone {
  id: string;
  label: string;
  amount: number;
  status: "pending" | "paid";
  dueAt?: string;
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  plan: PaymentPlan;
  method: PaymentMethodType;
  breakdown: PriceBreakdown;
  milestones?: Milestone[];
  paidAt: string;
  receiptNumber: string;
}

export interface RefundRequest {
  id: string;
  bookingId: string;
  reason: string;
  amount: number;
  status: "requested" | "approved" | "declined" | "processed";
  requestedAt: string;
}
