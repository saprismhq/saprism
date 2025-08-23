import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { CoachingService } from './CoachingService';
import { ICoachingSuggestionRepository } from '../repositories/CoachingSuggestionRepository';

const mockCoachingSuggestionRepository: jest.Mocked<ICoachingSuggestionRepository> = {
  create: jest.fn(),
  getByMeetingId: jest.fn(),
  update: jest.fn(),
};

describe('CoachingService', () => {
  let coachingService: CoachingService;

  beforeEach(() => {
    jest.clearAllMocks();
    coachingService = new CoachingService(mockCoachingSuggestionRepository);
  });

  describe('createCoachingSuggestion', () => {
    it('should create coaching suggestion successfully', async () => {
      const suggestionData = {
        meetingId: 1,
        type: 'coaching',
        content: {
          questions: ['question1', 'question2'],
          painMapping: [],
          framing: {
            context: 'test context',
            suggestion: 'test suggestion',
            valueProposition: 'test value',
            differentiators: ['diff1'],
          },
          nextSteps: [],
        },
        isUsed: false,
      };
      const mockSuggestion = {
        id: 1,
        meetingId: 1,
        type: 'coaching',
        content: suggestionData.content,
        isUsed: false,
        createdAt: new Date(),
      };
      mockCoachingSuggestionRepository.create.mockResolvedValue(mockSuggestion);

      const result = await coachingService.createCoachingSuggestion(suggestionData);

      expect(result).toEqual(mockSuggestion);
      expect(mockCoachingSuggestionRepository.create).toHaveBeenCalledWith(suggestionData);
    });

    it('should propagate repository errors', async () => {
      const suggestionData = {
        meetingId: 1,
        type: 'coaching',
        content: {
          questions: ['question1'],
          painMapping: [],
          framing: {
            context: 'test context',
            suggestion: 'test suggestion',
            valueProposition: 'test value',
            differentiators: ['diff1'],
          },
          nextSteps: [],
        },
        isUsed: false,
      };
      const error = new Error('Database error');
      mockCoachingSuggestionRepository.create.mockRejectedValue(error);

      await expect(coachingService.createCoachingSuggestion(suggestionData)).rejects.toThrow('Database error');
      expect(mockCoachingSuggestionRepository.create).toHaveBeenCalledWith(suggestionData);
    });
  });

  describe('getCoachingSuggestionsByMeetingId', () => {
    it('should return coaching suggestions for meeting', async () => {
      const mockSuggestions = [
        {
          id: 1,
          meetingId: 1,
          type: 'coaching',
          content: {
            questions: ['question1'],
            painMapping: [],
            framing: {
              context: 'test context',
              suggestion: 'test suggestion',
              valueProposition: 'test value',
              differentiators: ['diff1'],
            },
            nextSteps: [],
          },
          isUsed: false,
          createdAt: new Date(),
        },
        {
          id: 2,
          meetingId: 1,
          type: 'coaching',
          content: {
            questions: ['question2'],
            painMapping: [],
            framing: {
              context: 'test context 2',
              suggestion: 'test suggestion 2',
              valueProposition: 'test value 2',
              differentiators: ['diff2'],
            },
            nextSteps: [],
          },
          isUsed: true,
          createdAt: new Date(),
        },
      ];
      mockCoachingSuggestionRepository.getByMeetingId.mockResolvedValue(mockSuggestions);

      const result = await coachingService.getCoachingSuggestionsByMeetingId(1);

      expect(result).toEqual(mockSuggestions);
      expect(mockCoachingSuggestionRepository.getByMeetingId).toHaveBeenCalledWith(1);
    });

    it('should return empty array when no suggestions found', async () => {
      mockCoachingSuggestionRepository.getByMeetingId.mockResolvedValue([]);

      const result = await coachingService.getCoachingSuggestionsByMeetingId(1);

      expect(result).toEqual([]);
      expect(mockCoachingSuggestionRepository.getByMeetingId).toHaveBeenCalledWith(1);
    });

    it('should propagate repository errors', async () => {
      const error = new Error('Database error');
      mockCoachingSuggestionRepository.getByMeetingId.mockRejectedValue(error);

      await expect(coachingService.getCoachingSuggestionsByMeetingId(1)).rejects.toThrow('Database error');
      expect(mockCoachingSuggestionRepository.getByMeetingId).toHaveBeenCalledWith(1);
    });
  });

  describe('updateCoachingSuggestion', () => {
    it('should update coaching suggestion successfully', async () => {
      const updates = {
        isUsed: true,
      };
      const mockSuggestion = {
        id: 1,
        meetingId: 1,
        type: 'coaching',
        content: {
          questions: ['question1'],
          painMapping: [],
          framing: {
            context: 'test context',
            suggestion: 'test suggestion',
            valueProposition: 'test value',
            differentiators: ['diff1'],
          },
          nextSteps: [],
        },
        isUsed: true,
        createdAt: new Date(),
      };
      mockCoachingSuggestionRepository.update.mockResolvedValue(mockSuggestion);

      const result = await coachingService.updateCoachingSuggestion(1, updates);

      expect(result).toEqual(mockSuggestion);
      expect(mockCoachingSuggestionRepository.update).toHaveBeenCalledWith(1, updates);
    });

    it('should propagate repository errors', async () => {
      const updates = { isUsed: true };
      const error = new Error('Database error');
      mockCoachingSuggestionRepository.update.mockRejectedValue(error);

      await expect(coachingService.updateCoachingSuggestion(1, updates)).rejects.toThrow('Database error');
      expect(mockCoachingSuggestionRepository.update).toHaveBeenCalledWith(1, updates);
    });
  });
});
