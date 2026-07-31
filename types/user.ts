export type Role = "customer" | "provider" | "admin";

export interface User {
  id: string;
  role: Role;
  name: string;
  email: string;
  avatarUrl?: string;
  /** Present only for role "provider" — links to their Provider record. */
  providerId?: string;
}

export interface Session {
  user: User;
}
