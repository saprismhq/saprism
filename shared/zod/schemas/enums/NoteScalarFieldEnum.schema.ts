import { z } from 'zod';

export const NoteScalarFieldEnumSchema = z.enum(['id', 'meetingId', 'content', 'aiAnalysis', 'createdAt', 'updatedAt'])