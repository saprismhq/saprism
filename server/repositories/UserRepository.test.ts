import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { UserRepository } from './UserRepository';
import { db } from '../db';
import { createMockUser } from '../../test/utils/test-utils';

// Mock the database
jest.mock('../db', () => ({
  db: {
    user: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
    },
  },
}));

const mockDb = db as jest.Mocked<typeof db>;

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    userRepository = new UserRepository();
  });

  describe('getById', () => {
    it('should return user when found', async () => {
      const mockUser = createMockUser();
      mockDb.user.findUnique.mockResolvedValue(mockUser);

      const result = await userRepository.getById('test-user-id');

      expect(result).toEqual(mockUser);
      expect(mockDb.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'test-user-id' },
      });
    });

    it('should return undefined when user not found', async () => {
      mockDb.user.findUnique.mockResolvedValue(null);

      const result = await userRepository.getById('non-existent-id');

      expect(result).toBeUndefined();
      expect(mockDb.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'non-existent-id' },
      });
    });

    it('should propagate database errors', async () => {
      const error = new Error('Database error');
      mockDb.user.findUnique.mockRejectedValue(error);

      await expect(userRepository.getById('test-user-id')).rejects.toThrow('Database error');
      expect(mockDb.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'test-user-id' },
      });
    });
  });

  describe('upsert', () => {
    it('should upsert user successfully', async () => {
      const userData = {
        id: 'test-user-id',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        profileImageUrl: 'https://example.com/avatar.jpg',
      };
      const mockUser = createMockUser(userData);
      mockDb.user.upsert.mockResolvedValue(mockUser);

      const result = await userRepository.upsert(userData);

      expect(result).toEqual(mockUser);
      expect(mockDb.user.upsert).toHaveBeenCalledWith({
        where: { id: userData.id },
        update: {
          ...userData,
          updatedAt: expect.any(Date),
        },
        create: userData,
      });
    });

    it('should propagate database errors', async () => {
      const userData = {
        id: 'test-user-id',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        profileImageUrl: 'https://example.com/avatar.jpg',
      };
      const error = new Error('Database error');
      mockDb.user.upsert.mockRejectedValue(error);

      await expect(userRepository.upsert(userData)).rejects.toThrow('Database error');
      expect(mockDb.user.upsert).toHaveBeenCalledWith({
        where: { id: userData.id },
        update: {
          ...userData,
          updatedAt: expect.any(Date),
        },
        create: userData,
      });
    });
  });
});
