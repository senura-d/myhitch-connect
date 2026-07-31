"use client";

import * as React from "react";
import type { Role, Session, User } from "@/types/user";

const STORAGE_KEY = "myhitch-connect:session";

interface SessionContextValue {
  session: Session | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const SessionContext = React.createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<Session | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSession(JSON.parse(raw) as Session);
    } catch {
      // ignore malformed storage
    }
    setIsLoading(false);
  }, []);

  const login = React.useCallback((user: User) => {
    const next: Session = { user };
    setSession(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const logout = React.useCallback(() => {
    setSession(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = React.useMemo(
    () => ({ session, isLoading, login, logout }),
    [session, isLoading, login, logout]
  );

  return React.createElement(SessionContext.Provider, { value }, children);
}

export function useSession() {
  const ctx = React.useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}

export function useRequireRole(role: Role) {
  const { session, isLoading } = useSession();
  const hasAccess = !isLoading && session?.user.role === role;
  return { session, isLoading, hasAccess };
}
