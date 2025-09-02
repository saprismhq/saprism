import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NoteSelectObjectSchema } from './NoteSelect.schema';
import { NoteIncludeObjectSchema } from './NoteInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => NoteSelectObjectSchema).optional(),
  include: z.lazy(() => NoteIncludeObjectSchema).optional()
}).strict();
export const NoteArgsObjectSchema = makeSchema();
export const NoteArgsObjectZodSchema = makeSchema();
