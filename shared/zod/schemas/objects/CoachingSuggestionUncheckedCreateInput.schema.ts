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
export const CoachingSuggestionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionUncheckedCreateInput>;
export const CoachingSuggestionUncheckedCreateInputObjectZodSchema = makeSchema();
