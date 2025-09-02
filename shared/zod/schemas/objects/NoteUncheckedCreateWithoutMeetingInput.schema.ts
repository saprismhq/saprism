import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int().optional(),
  content: z.string(),
  aiAnalysis: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const NoteUncheckedCreateWithoutMeetingInputObjectSchema: z.ZodType<Prisma.NoteUncheckedCreateWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteUncheckedCreateWithoutMeetingInput>;
export const NoteUncheckedCreateWithoutMeetingInputObjectZodSchema = makeSchema();
