import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { MeetingCreateNestedOneWithoutNotesInputObjectSchema } from './MeetingCreateNestedOneWithoutNotesInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  content: z.string(),
  aiAnalysis: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  meeting: z.lazy(() => MeetingCreateNestedOneWithoutNotesInputObjectSchema)
}).strict();
export const NoteCreateInputObjectSchema: z.ZodType<Prisma.NoteCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteCreateInput>;
export const NoteCreateInputObjectZodSchema = makeSchema();
