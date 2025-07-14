import { z } from 'zod';

export const CoachingSuggestionScalarFieldEnumSchema = z.enum([
  'id',
  'meetingId',
  'type',
  'content',
  'isUsed',
  'createdAt',
]);
