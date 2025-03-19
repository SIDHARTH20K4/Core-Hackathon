// components/auth/AuthRedirect.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function AuthRedirect({ 
  whenAuthenticated = "/dashboard", 
  whenUnauthenticated = "/" 
}: { 
  whenAuthenticated?: string;
  whenUnauthenticated?: string;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push(whenAuthenticated);
      } else {
        router.push(whenUnauthenticated);
      }
    }
  }, [isAuthenticated, isLoading, router, whenAuthenticated, whenUnauthenticated]);

  return null;
}
