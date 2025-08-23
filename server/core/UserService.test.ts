import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { UserService } from './UserService';
import { IUserRepository } from '../repositories/UserRepository';
import { createMockUser } from '../../test/utils/test-utils';

const mockUserRepository: jest.Mocked<IUserRepository> = {
  getById: jest.fn(),
  upsert: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    userService = new UserService(mockUserRepository);
  });

  describe('getUserById', () => {
    it('should return user when found', async () => {
      const mockUser = createMockUser();
      mockUserRepository.getById.mockResolvedValue(mockUser);

      const result = await userService.getUserById('test-user-id');

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.getById).toHaveBeenCalledWith('test-user-id');
    });

    it('should return undefined when user not found', async () => {
      mockUserRepository.getById.mockResolvedValue(undefined);

      const result = await userService.getUserById('non-existent-id');

      expect(result).toBeUndefined();
      expect(mockUserRepository.getById).toHaveBeenCalledWith('non-existent-id');
    });

    it('should propagate repository errors', async () => {
      const error = new Error('Database error');
      mockUserRepository.getById.mockRejectedValue(error);

      await expect(userService.getUserById('test-user-id')).rejects.toThrow('Database error');
      expect(mockUserRepository.getById).toHaveBeenCalledWith('test-user-id');
    });
  });

  describe('upsertUser', () => {
    it('should upsert user successfully', async () => {
      const userData = {
        id: 'test-user-id',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        profileImageUrl: 'https://example.com/avatar.jpg',
      };
      const mockUser = createMockUser(userData);
      mockUserRepository.upsert.mockResolvedValue(mockUser);

      const result = await userService.upsertUser(userData);

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.upsert).toHaveBeenCalledWith(userData);
    });

    it('should propagate repository errors', async () => {
      const userData = {
        id: 'test-user-id',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        profileImageUrl: 'https://example.com/avatar.jpg',
      };
      const error = new Error('Database error');
      mockUserRepository.upsert.mockRejectedValue(error);

      await expect(userService.upsertUser(userData)).rejects.toThrow('Database error');
      expect(mockUserRepository.upsert).toHaveBeenCalledWith(userData);
    });
  });
});
