import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int().optional(),
  meetingId: z.number().int(),
  content: z.string(),
  aiAnalysis: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const NoteUncheckedCreateInputObjectSchema: z.ZodType<Prisma.NoteUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteUncheckedCreateInput>;
export const NoteUncheckedCreateInputObjectZodSchema = makeSchema();
