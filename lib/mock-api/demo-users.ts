import type { Role, User } from "@/types/user";

/**
 * Demo identities for the mock backend. Sign-in matches on email; anything else
 * is rejected so the login form still behaves like a real one.
 */
export const DEMO_CUSTOMER: User = {
  id: "user-cust-01",
  role: "customer",
  name: "Linda Blair",
  email: "lindablair@mail.com",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  phone: "050 414 8778",
  address: "1833 Bel Meadow Drive, Fontana, California 92335, USA",
  username: "@linda_blair321",
  isPremium: true,
};

export const DEMO_PROVIDER: User = {
  id: "user-prov-prov-01",
  role: "provider",
  name: "Sunrise Plumbing Co.",
  email: "sunrise-plumbing-co@example.test",
  providerId: "prov-01",
};

export const DEMO_ADMIN: User = {
  id: "user-admin-01",
  role: "admin",
  name: "Priya Admin",
  email: "admin@myhitchconnect.test",
};

export const DEMO_USERS: User[] = [DEMO_CUSTOMER, DEMO_PROVIDER, DEMO_ADMIN];

export function findDemoUserByEmail(email: string): User | undefined {
  const normalised = email.trim().toLowerCase();
  return DEMO_USERS.find((u) => u.email.toLowerCase() === normalised);
}

/** Where each role lands after signing in. */
export function dashboardPathForRole(role: Role): string {
  switch (role) {
    case "provider":
      return "/dashboard/provider";
    case "admin":
      return "/admin/providers/verification";
    default:
      return "/dashboard/customer";
  }
}

/**
 * Builds a session user for someone signing up. Providers are pinned to the
 * seeded `prov-01` record so the provider dashboard has something to show —
 * a real backend would create a new Provider row here instead.
 */
export function createSignupUser(
  role: Exclude<Role, "admin">,
  name: string,
  email: string
): User {
  return {
    id: `user-${role}-signup`,
    role,
    name: name.trim(),
    email: email.trim(),
    ...(role === "provider" ? { providerId: "prov-01" } : {}),
  };
}
