import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { NoteRepository } from './NoteRepository';
import { db } from '../db';
import { createMockNote } from '../../test/utils/test-utils';

// Mock the database
jest.mock('../db', () => ({
  db: {
    note: {
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

const mockDb = db as jest.Mocked<typeof db>;

describe('NoteRepository', () => {
  let noteRepository: NoteRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    noteRepository = new NoteRepository();
  });

  describe('create', () => {
    it('should create note successfully', async () => {
      const noteData = {
        meetingId: 1,
        content: 'Test note content',
      };
      const mockNote = createMockNote(noteData);
      mockDb.note.create.mockResolvedValue(mockNote);

      const result = await noteRepository.create(noteData);

      expect(result).toEqual(mockNote);
      expect(mockDb.note.create).toHaveBeenCalledWith({
        data: noteData,
      });
    });

    it('should propagate database errors', async () => {
      const noteData = {
        meetingId: 1,
        content: 'Test note content',
      };
      const error = new Error('Database error');
      mockDb.note.create.mockRejectedValue(error);

      await expect(noteRepository.create(noteData)).rejects.toThrow('Database error');
      expect(mockDb.note.create).toHaveBeenCalledWith({
        data: noteData,
      });
    });
  });

  describe('update', () => {
    it('should update note successfully', async () => {
      const updates = {
        content: 'Updated note content',
      };
      const mockNote = createMockNote({ id: 1, ...updates });
      mockDb.note.update.mockResolvedValue(mockNote);

      const result = await noteRepository.update(1, updates);

      expect(result).toEqual(mockNote);
      expect(mockDb.note.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updates,
      });
    });

    it('should propagate database errors', async () => {
      const updates = { content: 'Updated content' };
      const error = new Error('Database error');
      mockDb.note.update.mockRejectedValue(error);

      await expect(noteRepository.update(1, updates)).rejects.toThrow('Database error');
      expect(mockDb.note.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updates,
      });
    });
  });

  describe('getByMeetingId', () => {
    it('should return notes for meeting', async () => {
      const mockNotes = [
        createMockNote({ id: 1, meetingId: 1 }),
        createMockNote({ id: 2, meetingId: 1 }),
      ];
      mockDb.note.findMany.mockResolvedValue(mockNotes);

      const result = await noteRepository.getByMeetingId(1);

      expect(result).toEqual(mockNotes);
      expect(mockDb.note.findMany).toHaveBeenCalledWith({
        where: { meetingId: 1 },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return empty array when no notes found', async () => {
      mockDb.note.findMany.mockResolvedValue([]);

      const result = await noteRepository.getByMeetingId(1);

      expect(result).toEqual([]);
      expect(mockDb.note.findMany).toHaveBeenCalledWith({
        where: { meetingId: 1 },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should propagate database errors', async () => {
      const error = new Error('Database error');
      mockDb.note.findMany.mockRejectedValue(error);

      await expect(noteRepository.getByMeetingId(1)).rejects.toThrow('Database error');
      expect(mockDb.note.findMany).toHaveBeenCalledWith({
        where: { meetingId: 1 },
        orderBy: { createdAt: 'desc' },
      });
    });
  });
});
