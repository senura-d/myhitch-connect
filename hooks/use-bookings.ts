import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBookingsForCustomer,
  getBookingsForProvider,
  getBooking,
  createBooking,
  updateBookingStatus,
} from "@/lib/mock-api/bookings";
import type { BookingStatus } from "@/types/status";

export function useBookingsForCustomer(customerId: string | undefined) {
  return useQuery({
    queryKey: ["bookings", "customer", customerId],
    queryFn: () => getBookingsForCustomer(customerId!),
    enabled: !!customerId,
  });
}

export function useBookingsForProvider(providerId: string | undefined) {
  return useQuery({
    queryKey: ["bookings", "provider", providerId],
    queryFn: () => getBookingsForProvider(providerId!),
    enabled: !!providerId,
  });
}

export function useBooking(id: string | undefined) {
  return useQuery({ queryKey: ["booking", id], queryFn: () => getBooking(id!), enabled: !!id });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: ["bookings", "customer", booking.customerId] });
      queryClient.invalidateQueries({ queryKey: ["bookings", "provider", booking.providerId] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) => updateBookingStatus(id, status),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: ["booking", booking?.id] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}
