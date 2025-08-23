import { jest } from '@jest/globals';

// Mock data factories
export const createMockUser = (overrides = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  profileImageUrl: 'https://example.com/avatar.jpg',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createMockMeeting = (overrides = {}) => ({
  id: 1,
  userId: 'test-user-id',
  clientId: 1,
  clientName: 'Test Client',
  clientCompany: 'Test Company',
  dealType: 'enterprise',
  status: 'scheduled',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createMockMeetingWithSessions = (overrides = {}) => ({
  id: 1,
  userId: 'test-user-id',
  clientId: 1,
  clientName: 'Test Client',
  clientCompany: 'Test Company',
  dealType: 'enterprise',
  status: 'scheduled',
  createdAt: new Date(),
  updatedAt: new Date(),
  notes: [],
  coachingSuggestions: [],
  callSessions: [],
  ...overrides,
});

export const createMockNote = (overrides = {}) => ({
  id: 1,
  meetingId: 1,
  content: 'Test note content',
  aiAnalysis: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createMockClient = (overrides = {}) => ({
  id: 1,
  userId: 'test-user-id',
  name: 'Test Client',
  company: 'Test Company',
  email: 'client@example.com',
  phone: '+1234567890',
  industry: 'Technology',
  notes: 'Test client notes',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

// Mock request/response objects
export const createMockRequest = (overrides = {}) => ({
  body: {},
  params: {},
  query: {},
  headers: {},
  user: createMockUser(),
  isAuthenticated: () => true,
  logout: jest.fn(),
  ...overrides,
});

export const createMockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn().mockReturnValue(res);
  res.set = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res;
};

export const createMockNext = () => jest.fn();

// Async test utilities
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const flushPromises = () => new Promise(resolve => setImmediate(resolve));
