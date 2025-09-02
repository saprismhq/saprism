import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { MeetingUpdateOneRequiredWithoutNotesNestedInputObjectSchema } from './MeetingUpdateOneRequiredWithoutNotesNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  content: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  aiAnalysis: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  meeting: z.lazy(() => MeetingUpdateOneRequiredWithoutNotesNestedInputObjectSchema).optional()
}).strict();
export const NoteUpdateInputObjectSchema: z.ZodType<Prisma.NoteUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteUpdateInput>;
export const NoteUpdateInputObjectZodSchema = makeSchema();
