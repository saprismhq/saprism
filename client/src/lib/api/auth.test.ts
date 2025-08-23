import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { authApi, useAuth, useRequireAuth } from './auth';
import { createMockUser } from '../../../test/utils/test-utils';

// Mock fetch globally
global.fetch = jest.fn();

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    {children}
  </QueryClientProvider>
);

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
    window.location.href = '';
  });

  describe('authApi', () => {
    describe('getCurrentUser', () => {
      it('should fetch current user successfully', async () => {
        const mockUser = createMockUser();
        const mockResponse = {
          ok: true,
          json: jest.fn().mockResolvedValue(mockUser),
        };
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        const result = await authApi.getCurrentUser();

        expect(global.fetch).toHaveBeenCalledWith('/api/auth/user');
        expect(result).toEqual(mockUser);
      });

      it('should throw error when response is not ok', async () => {
        const mockResponse = {
          ok: false,
          status: 401,
          statusText: 'Unauthorized',
        };
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        await expect(authApi.getCurrentUser()).rejects.toThrow('401: Unauthorized');
        expect(global.fetch).toHaveBeenCalledWith('/api/auth/user');
      });

      it('should handle network errors', async () => {
        const error = new Error('Network error');
        (global.fetch as jest.Mock).mockRejectedValue(error);

        await expect(authApi.getCurrentUser()).rejects.toThrow('Network error');
        expect(global.fetch).toHaveBeenCalledWith('/api/auth/user');
      });
    });

    describe('login', () => {
      it('should redirect to login page', () => {
        authApi.login();

        expect(window.location.href).toBe('/api/login');
      });
    });

    describe('logout', () => {
      it('should redirect to logout page', () => {
        authApi.logout();

        expect(window.location.href).toBe('/api/logout');
      });
    });
  });

  describe('useAuth', () => {
    it('should return auth state with user when authenticated', async () => {
      const mockUser = createMockUser();
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.login).toBe('function');
      expect(typeof result.current.logout).toBe('function');
    });

    it('should return auth state when not authenticated', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.user).toBeUndefined();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.error).toBeDefined();
    });

    it('should handle loading state', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.user).toBeUndefined();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should handle network errors', async () => {
      const error = new Error('Network error');
      (global.fetch as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.user).toBeUndefined();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.error).toBeDefined();
    });
  });

  describe('useRequireAuth', () => {
    it('should return require auth state when authenticated', async () => {
      const mockUser = createMockUser();
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useRequireAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
      expect(typeof result.current.requireAuth).toBe('function');
    });

    it('should redirect to login when not authenticated', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useRequireAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(false);

      // Call requireAuth
      result.current.requireAuth();

      expect(window.location.href).toBe('/api/login');
    });

    it('should not redirect when still loading', () => {
      const { result } = renderHook(() => useRequireAuth(), { wrapper });

      expect(result.current.isLoading).toBe(true);

      // Call requireAuth while loading
      result.current.requireAuth();

      expect(window.location.href).toBe(''); // Should not redirect
    });
  });
});
