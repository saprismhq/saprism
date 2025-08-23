import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { UserController } from './UserController';
import { IUserService } from '../core/UserService';
import { createMockUser, createMockRequest, createMockResponse } from '../../test/utils/test-utils';

const mockUserService: jest.Mocked<IUserService> = {
  getUserById: jest.fn(),
  upsertUser: jest.fn(),
};

describe('UserController', () => {
  let userController: UserController;
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    jest.clearAllMocks();
    userController = new UserController(mockUserService);
    mockReq = createMockRequest();
    mockRes = createMockResponse();
  });

  describe('getCurrentUser', () => {
    it('should return user when found', async () => {
      const mockUser = createMockUser();
      mockReq.user.claims = { sub: 'test-user-id' };
      mockUserService.getUserById.mockResolvedValue(mockUser);

      await userController.getCurrentUser(mockReq, mockRes);

      expect(mockUserService.getUserById).toHaveBeenCalledWith('test-user-id');
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should return 500 when service throws error', async () => {
      mockReq.user.claims = { sub: 'test-user-id' };
      const error = new Error('Service error');
      mockUserService.getUserById.mockRejectedValue(error);

      await userController.getCurrentUser(mockReq, mockRes);

      expect(mockUserService.getUserById).toHaveBeenCalledWith('test-user-id');
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Failed to fetch user' });
    });

    it('should handle missing user claims', async () => {
      mockReq.user.claims = undefined;

      await userController.getCurrentUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Failed to fetch user' });
    });
  });
});
