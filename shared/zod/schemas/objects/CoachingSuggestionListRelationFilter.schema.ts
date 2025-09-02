import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CoachingSuggestionWhereInputObjectSchema } from './CoachingSuggestionWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => CoachingSuggestionWhereInputObjectSchema).optional(),
  some: z.lazy(() => CoachingSuggestionWhereInputObjectSchema).optional(),
  none: z.lazy(() => CoachingSuggestionWhereInputObjectSchema).optional()
}).strict();
export const CoachingSuggestionListRelationFilterObjectSchema: z.ZodType<Prisma.CoachingSuggestionListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionListRelationFilter>;
export const CoachingSuggestionListRelationFilterObjectZodSchema = makeSchema();
