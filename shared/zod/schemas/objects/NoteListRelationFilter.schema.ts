import { z } from 'zod';
import { NoteWhereInputObjectSchema } from './NoteWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NoteListRelationFilter> = z
  .object({
    every: z.lazy(() => NoteWhereInputObjectSchema).optional(),
    some: z.lazy(() => NoteWhereInputObjectSchema).optional(),
    none: z.lazy(() => NoteWhereInputObjectSchema).optional(),
  })
  .strict();

export const NoteListRelationFilterObjectSchema = Schema;
