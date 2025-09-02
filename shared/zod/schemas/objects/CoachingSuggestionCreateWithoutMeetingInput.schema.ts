import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  type: z.string().max(255),
  content: z.union([JsonNullValueInputSchema, jsonSchema]),
  isUsed: z.boolean().nullish(),
  createdAt: z.date().nullish()
}).strict();
export const CoachingSuggestionCreateWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionCreateWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionCreateWithoutMeetingInput>;
export const CoachingSuggestionCreateWithoutMeetingInputObjectZodSchema = makeSchema();
