import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { MeetingUpdateOneRequiredWithoutCoachingSuggestionsNestedInputObjectSchema } from './MeetingUpdateOneRequiredWithoutCoachingSuggestionsNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  type: z.union([z.string().max(255), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  content: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  isUsed: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).nullish(),
  createdAt: z.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).nullish(),
  meeting: z.lazy(() => MeetingUpdateOneRequiredWithoutCoachingSuggestionsNestedInputObjectSchema).optional()
}).strict();
export const CoachingSuggestionUpdateInputObjectSchema: z.ZodType<Prisma.CoachingSuggestionUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.CoachingSuggestionUpdateInput>;
export const CoachingSuggestionUpdateInputObjectZodSchema = makeSchema();
