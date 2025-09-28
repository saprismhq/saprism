import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int().optional(),
  meetingId: z.number().int(),
  type: z.string().max(255),
  content: z.union([JsonNullValueInputSchema, jsonSchema]),
  isUsed: z.boolean().nullish(),
  createdAt: z.date().optional()
}).strict();
export const CoachingSuggestionCreateManyInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionCreateManyInput>;
export const CoachingSuggestionCreateManyInputObjectZodSchema = makeSchema();
