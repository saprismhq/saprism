import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { NoteService } from './NoteService';
import { INoteRepository } from '../repositories/NoteRepository';
import { createMockNote } from '../../test/utils/test-utils';

const mockNoteRepository: jest.Mocked<INoteRepository> = {
  create: jest.fn(),
  update: jest.fn(),
  getByMeetingId: jest.fn(),
};

describe('NoteService', () => {
  let noteService: NoteService;

  beforeEach(() => {
    jest.clearAllMocks();
    noteService = new NoteService(mockNoteRepository);
  });

  describe('createNote', () => {
    it('should create note successfully', async () => {
      const noteData = {
        meetingId: 1,
        content: 'Test note content',
      };
      const mockNote = createMockNote(noteData);
      mockNoteRepository.create.mockResolvedValue(mockNote);

      const result = await noteService.createNote(noteData);

      expect(result).toEqual(mockNote);
      expect(mockNoteRepository.create).toHaveBeenCalledWith(noteData);
    });

    it('should propagate repository errors', async () => {
      const noteData = {
        meetingId: 1,
        content: 'Test note content',
      };
      const error = new Error('Database error');
      mockNoteRepository.create.mockRejectedValue(error);

      await expect(noteService.createNote(noteData)).rejects.toThrow('Database error');
      expect(mockNoteRepository.create).toHaveBeenCalledWith(noteData);
    });
  });

  describe('updateNote', () => {
    it('should update note successfully', async () => {
      const updates = {
        content: 'Updated note content',
      };
      const mockNote = createMockNote({ id: 1, ...updates });
      mockNoteRepository.update.mockResolvedValue(mockNote);

      const result = await noteService.updateNote(1, updates);

      expect(result).toEqual(mockNote);
      expect(mockNoteRepository.update).toHaveBeenCalledWith(1, updates);
    });

    it('should propagate repository errors', async () => {
      const updates = { content: 'Updated content' };
      const error = new Error('Database error');
      mockNoteRepository.update.mockRejectedValue(error);

      await expect(noteService.updateNote(1, updates)).rejects.toThrow('Database error');
      expect(mockNoteRepository.update).toHaveBeenCalledWith(1, updates);
    });
  });

  describe('getNotesByMeetingId', () => {
    it('should return notes for meeting', async () => {
      const mockNotes = [
        createMockNote({ id: 1, meetingId: 1 }),
        createMockNote({ id: 2, meetingId: 1 }),
      ];
      mockNoteRepository.getByMeetingId.mockResolvedValue(mockNotes);

      const result = await noteService.getNotesByMeetingId(1);

      expect(result).toEqual(mockNotes);
      expect(mockNoteRepository.getByMeetingId).toHaveBeenCalledWith(1);
    });

    it('should return empty array when no notes found', async () => {
      mockNoteRepository.getByMeetingId.mockResolvedValue([]);

      const result = await noteService.getNotesByMeetingId(1);

      expect(result).toEqual([]);
      expect(mockNoteRepository.getByMeetingId).toHaveBeenCalledWith(1);
    });

    it('should propagate repository errors', async () => {
      const error = new Error('Database error');
      mockNoteRepository.getByMeetingId.mockRejectedValue(error);

      await expect(noteService.getNotesByMeetingId(1)).rejects.toThrow('Database error');
      expect(mockNoteRepository.getByMeetingId).toHaveBeenCalledWith(1);
    });
  });
});
