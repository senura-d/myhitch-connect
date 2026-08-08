import { store, delay, nextId, recordAudit } from "./store";
import type { Booking } from "@/types/booking";
import type { BookingStatus } from "@/types/status";
import type { PaymentPlan } from "@/types/payment";

export interface CreateBookingPayload {
  listingId: string;
  providerId: string;
  customerId: string;
  scheduledAt: string;
  durationMinutes: number;
  notes?: string;
  paymentPlan: PaymentPlan;
  subtotal: number;
}

export async function getBookingsForCustomer(customerId: string): Promise<Booking[]> {
  return delay(store.bookings.filter((b) => b.customerId === customerId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}

export async function getBookingsForProvider(providerId: string): Promise<Booking[]> {
  return delay(store.bookings.filter((b) => b.providerId === providerId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}

export async function getBooking(id: string): Promise<Booking | undefined> {
  return delay(store.bookings.find((b) => b.id === id));
}

export async function createBooking(payload: CreateBookingPayload): Promise<Booking> {
  const serviceFee = Math.round(payload.subtotal * 0.08 * 100) / 100;
  const tax = Math.round((payload.subtotal + serviceFee) * 0.1 * 100) / 100;
  const booking: Booking = {
    id: nextId("book"),
    listingId: payload.listingId,
    providerId: payload.providerId,
    customerId: payload.customerId,
    status: "pending",
    scheduledAt: payload.scheduledAt,
    durationMinutes: payload.durationMinutes,
    notes: payload.notes,
    breakdown: {
      subtotal: payload.subtotal,
      serviceFee,
      tax,
      discount: 0,
      total: Math.round((payload.subtotal + serviceFee + tax) * 100) / 100,
      currency: "AUD",
    },
    paymentPlan: payload.paymentPlan,
    createdAt: new Date().toISOString(),
  };
  store.bookings.push(booking);
  return delay(booking, 500);
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Booking | undefined> {
  const booking = store.bookings.find((b) => b.id === id);
  if (!booking) return delay(undefined);
  booking.status = status;
  recordAudit({
    actorId: booking.providerId,
    actorName: "Provider",
    action: `updated booking status to ${status}`,
    targetType: "booking",
    targetId: id,
  });
  return delay(booking, 300);
}
