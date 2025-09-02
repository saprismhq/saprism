import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int().optional(),
  type: z.string(),
  content: z.union([JsonNullValueInputSchema, jsonSchema]),
  isUsed: z.boolean().nullish(),
  createdAt: z.date().nullish()
}).strict();
export const CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionUncheckedCreateWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionUncheckedCreateWithoutMeetingInput>;
export const CoachingSuggestionUncheckedCreateWithoutMeetingInputObjectZodSchema = makeSchema();
