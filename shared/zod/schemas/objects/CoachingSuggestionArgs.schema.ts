import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CoachingSuggestionSelectObjectSchema } from './CoachingSuggestionSelect.schema';
import { CoachingSuggestionIncludeObjectSchema } from './CoachingSuggestionInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => CoachingSuggestionSelectObjectSchema).optional(),
  include: z.lazy(() => CoachingSuggestionIncludeObjectSchema).optional()
}).strict();
export const CoachingSuggestionArgsObjectSchema = makeSchema();
export const CoachingSuggestionArgsObjectZodSchema = makeSchema();
