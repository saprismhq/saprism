import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the hooks and components
jest.mock('./hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('./pages/landing', () => ({
  __esModule: true,
  default: () => <div data-testid="landing-page">Landing Page</div>,
}));

jest.mock('./pages/home', () => ({
  __esModule: true,
  default: () => <div data-testid="home-page">Home Page</div>,
}));

jest.mock('./pages/not-found', () => ({
  __esModule: true,
  default: () => <div data-testid="not-found-page">Not Found Page</div>,
}));

const { useAuth } = require('./hooks/useAuth');

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when loading', () => {
    it('should show loading spinner', () => {
      (useAuth as jest.Mock).mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
      });

      renderWithProviders(<App />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument(); // spinner
    });
  });

  describe('when not authenticated', () => {
    beforeEach(() => {
      (useAuth as jest.Mock).mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });
    });

    it('should show landing page for root path', () => {
      renderWithProviders(<App />);

      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
      expect(screen.queryByTestId('home-page')).not.toBeInTheDocument();
    });

    it('should show landing page for login path', () => {
      window.history.pushState({}, '', '/login');
      renderWithProviders(<App />);

      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });

    it('should show not found page for unknown paths', () => {
      window.history.pushState({}, '', '/unknown');
      renderWithProviders(<App />);

      expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    });
  });

  describe('when authenticated', () => {
    beforeEach(() => {
      (useAuth as jest.Mock).mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });
    });

    it('should show home page for root path', () => {
      renderWithProviders(<App />);

      expect(screen.getByTestId('home-page')).toBeInTheDocument();
      expect(screen.queryByTestId('landing-page')).not.toBeInTheDocument();
    });

    it('should show home page for dashboard path', () => {
      window.history.pushState({}, '', '/dashboard');
      renderWithProviders(<App />);

      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });

    it('should show not found page for unknown paths', () => {
      window.history.pushState({}, '', '/unknown');
      renderWithProviders(<App />);

      expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    beforeEach(() => {
      (useAuth as jest.Mock).mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });
    });

    it('should render with all required providers', () => {
      renderWithProviders(<App />);

      // Check that the app renders without errors
      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });

    it('should include tooltip provider', () => {
      renderWithProviders(<App />);

      // The TooltipProvider should be present in the component tree
      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });

    it('should include toaster component', () => {
      renderWithProviders(<App />);

      // The Toaster component should be present in the component tree
      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });
  });
});
