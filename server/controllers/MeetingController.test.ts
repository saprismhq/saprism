import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { MeetingController } from './MeetingController';
import { IMeetingService } from '../core/MeetingService';
import { createMockMeeting, createMockMeetingWithSessions, createMockRequest, createMockResponse } from '../../test/utils/test-utils';

const mockMeetingService: jest.Mocked<IMeetingService> = {
  createMeeting: jest.fn(),
  getMeetingById: jest.fn(),
  getMeetingsByUserId: jest.fn(),
  updateMeeting: jest.fn(),
  deleteMeeting: jest.fn(),
  validateMeetingOwnership: jest.fn(),
};

describe('MeetingController', () => {
  let meetingController: MeetingController;
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    jest.clearAllMocks();
    meetingController = new MeetingController(mockMeetingService);
    mockReq = createMockRequest();
    mockRes = createMockResponse();
  });

  describe('createMeeting', () => {
    it('should create meeting successfully', async () => {
      const meetingData = {
        clientId: 1,
        clientName: 'Test Client',
        clientCompany: 'Test Company',
        dealType: 'enterprise',
      };
      const mockMeeting = createMockMeeting(meetingData);
      
      mockReq.body = meetingData;
      mockReq.user.claims = { sub: 'test-user-id' };
      mockMeetingService.createMeeting.mockResolvedValue(mockMeeting);

      await meetingController.createMeeting(mockReq, mockRes);

      expect(mockMeetingService.createMeeting).toHaveBeenCalledWith({
        userId: 'test-user-id',
        clientId: 1,
        clientName: 'Test Client',
        clientCompany: 'Test Company',
        dealType: 'enterprise',
        status: 'active',
      });
      expect(mockRes.json).toHaveBeenCalledWith(mockMeeting);
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should handle missing optional fields', async () => {
      const meetingData = {
        clientName: 'Test Client',
      };
      const mockMeeting = createMockMeeting(meetingData);
      
      mockReq.body = meetingData;
      mockReq.user.claims = { sub: 'test-user-id' };
      mockMeetingService.createMeeting.mockResolvedValue(mockMeeting);

      await meetingController.createMeeting(mockReq, mockRes);

      expect(mockMeetingService.createMeeting).toHaveBeenCalledWith({
        userId: 'test-user-id',
        clientId: null,
        clientName: 'Test Client',
        clientCompany: null,
        dealType: 'Connect',
        status: 'active',
      });
    });

    it('should handle service errors', async () => {
      const meetingData = {
        clientName: 'Test Client',
      };
      
      mockReq.body = meetingData;
      mockReq.user.claims = { sub: 'test-user-id' };
      const error = new Error('Service error');
      mockMeetingService.createMeeting.mockRejectedValue(error);

      await meetingController.createMeeting(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Failed to create meeting' });
    });

    it('should handle validation errors', async () => {
      const invalidData = {
        // Missing required clientName
      };
      
      mockReq.body = invalidData;
      mockReq.user.claims = { sub: 'test-user-id' };

      await meetingController.createMeeting(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Failed to create meeting' });
    });
  });

  describe('getMeetings', () => {
    it('should return user meetings', async () => {
      const mockMeetings = [
        createMockMeeting({ id: 1, userId: 'test-user-id' }),
        createMockMeeting({ id: 2, userId: 'test-user-id' }),
      ];
      
      mockReq.user.claims = { sub: 'test-user-id' };
      mockMeetingService.getMeetingsByUserId.mockResolvedValue(mockMeetings);

      await meetingController.getMeetings(mockReq, mockRes);

      expect(mockMeetingService.getMeetingsByUserId).toHaveBeenCalledWith('test-user-id');
      expect(mockRes.json).toHaveBeenCalledWith(mockMeetings);
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should handle service errors', async () => {
      mockReq.user.claims = { sub: 'test-user-id' };
      const error = new Error('Service error');
      mockMeetingService.getMeetingsByUserId.mockRejectedValue(error);

      await meetingController.getMeetings(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Failed to fetch meetings' });
    });
  });

  describe('getMeetingById', () => {
    it('should return meeting when found and user has access', async () => {
      const mockMeeting = createMockMeetingWithSessions({ id: 1, userId: 'test-user-id' });
      
      mockReq.params = { id: '1' };
      mockReq.user.claims = { sub: 'test-user-id' };
      mockMeetingService.getMeetingById.mockResolvedValue(mockMeeting);
      mockMeetingService.validateMeetingOwnership.mockResolvedValue(true);

      await meetingController.getMeetingById(mockReq, mockRes);

      expect(mockMeetingService.getMeetingById).toHaveBeenCalledWith(1);
      expect(mockMeetingService.validateMeetingOwnership).toHaveBeenCalledWith(1, 'test-user-id');
      expect(mockRes.json).toHaveBeenCalledWith(mockMeeting);
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should return 404 when meeting not found', async () => {
      mockReq.params = { id: '999' };
      mockReq.user.claims = { sub: 'test-user-id' };
      mockMeetingService.getMeetingById.mockResolvedValue(undefined);

      await meetingController.getMeetingById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Meeting not found' });
    });

    it('should return 403 when user does not have access', async () => {
      const mockMeeting = createMockMeetingWithSessions({ id: 1, userId: 'different-user-id' });
      
      mockReq.params = { id: '1' };
      mockReq.user.claims = { sub: 'test-user-id' };
      mockMeetingService.getMeetingById.mockResolvedValue(mockMeeting);
      mockMeetingService.validateMeetingOwnership.mockResolvedValue(false);

      await meetingController.getMeetingById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Access denied' });
    });

    it('should handle service errors', async () => {
      mockReq.params = { id: '1' };
      mockReq.user.claims = { sub: 'test-user-id' };
      const error = new Error('Service error');
      mockMeetingService.getMeetingById.mockRejectedValue(error);

      await meetingController.getMeetingById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Failed to fetch meeting' });
    });
  });

  describe('deleteMeeting', () => {
    it('should delete meeting when user has access', async () => {
      mockReq.params = { id: '1' };
      mockReq.user.claims = { sub: 'test-user-id' };
      mockMeetingService.validateMeetingOwnership.mockResolvedValue(true);
      mockMeetingService.deleteMeeting.mockResolvedValue();

      await meetingController.deleteMeeting(mockReq, mockRes);

      expect(mockMeetingService.validateMeetingOwnership).toHaveBeenCalledWith(1, 'test-user-id');
      expect(mockMeetingService.deleteMeeting).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Meeting deleted successfully' });
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should return 403 when user does not have access', async () => {
      mockReq.params = { id: '1' };
      mockReq.user.claims = { sub: 'test-user-id' };
      mockMeetingService.validateMeetingOwnership.mockResolvedValue(false);

      await meetingController.deleteMeeting(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Access denied' });
      expect(mockMeetingService.deleteMeeting).not.toHaveBeenCalled();
    });

    it('should handle service errors', async () => {
      mockReq.params = { id: '1' };
      mockReq.user.claims = { sub: 'test-user-id' };
      mockMeetingService.validateMeetingOwnership.mockResolvedValue(true);
      const error = new Error('Service error');
      mockMeetingService.deleteMeeting.mockRejectedValue(error);

      await meetingController.deleteMeeting(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Failed to delete meeting' });
    });
  });
});
