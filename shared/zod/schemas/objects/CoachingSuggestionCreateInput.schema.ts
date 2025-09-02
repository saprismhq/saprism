import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { MeetingCreateNestedOneWithoutCoachingSuggestionsInputObjectSchema } from './MeetingCreateNestedOneWithoutCoachingSuggestionsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  type: z.string().max(255),
  content: z.union([JsonNullValueInputSchema, jsonSchema]),
  isUsed: z.boolean().nullish(),
  createdAt: z.date().nullish(),
  meeting: z.lazy(() => MeetingCreateNestedOneWithoutCoachingSuggestionsInputObjectSchema)
}).strict();
export const CoachingSuggestionCreateInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionCreateInput>;
export const CoachingSuggestionCreateInputObjectZodSchema = makeSchema();
