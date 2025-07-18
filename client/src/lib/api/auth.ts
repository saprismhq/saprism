import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./base";
import type { User } from "@shared/schema";

// Auth API functions
export const authApi = {
  getCurrentUser: async (): Promise<User> => {
    const response = await fetch("/api/auth/user");
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
  },

  login: () => {
    window.location.href = "/api/login";
  },

  logout: () => {
    window.location.href = "/api/logout";
  },
};

// Custom hooks
export const useAuth = () => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    login: authApi.login,
    logout: authApi.logout,
  };
};

export const useRequireAuth = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  
  return {
    user,
    isLoading,
    isAuthenticated,
    requireAuth: () => {
      if (!isLoading && !isAuthenticated) {
        authApi.login();
      }
    },
  };
};