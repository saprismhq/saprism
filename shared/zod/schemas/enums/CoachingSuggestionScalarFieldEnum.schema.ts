import { z } from 'zod';

export const CoachingSuggestionScalarFieldEnumSchema = z.enum([
  'id',
  'meetingId',
  'content',
  'used',
  'createdAt',
  'updatedAt',
]);
