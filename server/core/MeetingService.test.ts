import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { MeetingService } from './MeetingService';
import { IMeetingRepository } from '../repositories/MeetingRepository';
import { createMockMeeting, createMockMeetingWithSessions } from '../../test/utils/test-utils';

const mockMeetingRepository: jest.Mocked<IMeetingRepository> = {
  create: jest.fn(),
  getById: jest.fn(),
  getByUserId: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('MeetingService', () => {
  let meetingService: MeetingService;

  beforeEach(() => {
    jest.clearAllMocks();
    meetingService = new MeetingService(mockMeetingRepository);
  });

  describe('createMeeting', () => {
    it('should create meeting successfully', async () => {
      const meetingData = {
        userId: 'test-user-id',
        clientId: 1,
        clientName: 'Test Client',
        clientCompany: 'Test Company',
        dealType: 'enterprise',
        status: 'scheduled',
      };
      const mockMeeting = createMockMeeting(meetingData);
      mockMeetingRepository.create.mockResolvedValue(mockMeeting);

      const result = await meetingService.createMeeting(meetingData);

      expect(result).toEqual(mockMeeting);
      expect(mockMeetingRepository.create).toHaveBeenCalledWith(meetingData);
    });

    it('should propagate repository errors', async () => {
      const meetingData = {
        userId: 'test-user-id',
        clientId: 1,
        clientName: 'Test Client',
        clientCompany: 'Test Company',
        dealType: 'enterprise',
        status: 'scheduled',
      };
      const error = new Error('Database error');
      mockMeetingRepository.create.mockRejectedValue(error);

      await expect(meetingService.createMeeting(meetingData)).rejects.toThrow('Database error');
      expect(mockMeetingRepository.create).toHaveBeenCalledWith(meetingData);
    });
  });

  describe('getMeetingById', () => {
    it('should return meeting when found', async () => {
      const mockMeeting = createMockMeetingWithSessions();
      mockMeetingRepository.getById.mockResolvedValue(mockMeeting);

      const result = await meetingService.getMeetingById(1);

      expect(result).toEqual(mockMeeting);
      expect(mockMeetingRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should return undefined when meeting not found', async () => {
      mockMeetingRepository.getById.mockResolvedValue(undefined);

      const result = await meetingService.getMeetingById(999);

      expect(result).toBeUndefined();
      expect(mockMeetingRepository.getById).toHaveBeenCalledWith(999);
    });

    it('should propagate repository errors', async () => {
      const error = new Error('Database error');
      mockMeetingRepository.getById.mockRejectedValue(error);

      await expect(meetingService.getMeetingById(1)).rejects.toThrow('Database error');
      expect(mockMeetingRepository.getById).toHaveBeenCalledWith(1);
    });
  });

  describe('getMeetingsByUserId', () => {
    it('should return meetings for user', async () => {
      const mockMeetings = [
        createMockMeeting({ id: 1, userId: 'test-user-id' }),
        createMockMeeting({ id: 2, userId: 'test-user-id' }),
      ];
      mockMeetingRepository.getByUserId.mockResolvedValue(mockMeetings);

      const result = await meetingService.getMeetingsByUserId('test-user-id');

      expect(result).toEqual(mockMeetings);
      expect(mockMeetingRepository.getByUserId).toHaveBeenCalledWith('test-user-id');
    });

    it('should return empty array when no meetings found', async () => {
      mockMeetingRepository.getByUserId.mockResolvedValue([]);

      const result = await meetingService.getMeetingsByUserId('test-user-id');

      expect(result).toEqual([]);
      expect(mockMeetingRepository.getByUserId).toHaveBeenCalledWith('test-user-id');
    });

    it('should propagate repository errors', async () => {
      const error = new Error('Database error');
      mockMeetingRepository.getByUserId.mockRejectedValue(error);

      await expect(meetingService.getMeetingsByUserId('test-user-id')).rejects.toThrow('Database error');
      expect(mockMeetingRepository.getByUserId).toHaveBeenCalledWith('test-user-id');
    });
  });

  describe('updateMeeting', () => {
    it('should update meeting successfully', async () => {
      const updates = {
        status: 'completed',
        clientName: 'Updated Client',
      };
      const mockMeeting = createMockMeeting({ id: 1, ...updates });
      mockMeetingRepository.update.mockResolvedValue(mockMeeting);

      const result = await meetingService.updateMeeting(1, updates);

      expect(result).toEqual(mockMeeting);
      expect(mockMeetingRepository.update).toHaveBeenCalledWith(1, updates);
    });

    it('should propagate repository errors', async () => {
      const updates = { status: 'completed' };
      const error = new Error('Database error');
      mockMeetingRepository.update.mockRejectedValue(error);

      await expect(meetingService.updateMeeting(1, updates)).rejects.toThrow('Database error');
      expect(mockMeetingRepository.update).toHaveBeenCalledWith(1, updates);
    });
  });

  describe('deleteMeeting', () => {
    it('should delete meeting successfully', async () => {
      mockMeetingRepository.delete.mockResolvedValue();

      await meetingService.deleteMeeting(1);

      expect(mockMeetingRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should propagate repository errors', async () => {
      const error = new Error('Database error');
      mockMeetingRepository.delete.mockRejectedValue(error);

      await expect(meetingService.deleteMeeting(1)).rejects.toThrow('Database error');
      expect(mockMeetingRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('validateMeetingOwnership', () => {
    it('should return true when user owns the meeting', async () => {
      const mockMeeting = createMockMeetingWithSessions({ id: 1, userId: 'test-user-id' });
      mockMeetingRepository.getById.mockResolvedValue(mockMeeting);

      const result = await meetingService.validateMeetingOwnership(1, 'test-user-id');

      expect(result).toBe(true);
      expect(mockMeetingRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should return false when user does not own the meeting', async () => {
      const mockMeeting = createMockMeetingWithSessions({ id: 1, userId: 'different-user-id' });
      mockMeetingRepository.getById.mockResolvedValue(mockMeeting);

      const result = await meetingService.validateMeetingOwnership(1, 'test-user-id');

      expect(result).toBe(false);
      expect(mockMeetingRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should return false when meeting not found', async () => {
      mockMeetingRepository.getById.mockResolvedValue(undefined);

      const result = await meetingService.validateMeetingOwnership(999, 'test-user-id');

      expect(result).toBe(false);
      expect(mockMeetingRepository.getById).toHaveBeenCalledWith(999);
    });

    it('should propagate repository errors', async () => {
      const error = new Error('Database error');
      mockMeetingRepository.getById.mockRejectedValue(error);

      await expect(meetingService.validateMeetingOwnership(1, 'test-user-id')).rejects.toThrow('Database error');
      expect(mockMeetingRepository.getById).toHaveBeenCalledWith(1);
    });
  });
});
