import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NoteWhereInputObjectSchema } from './NoteWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => NoteWhereInputObjectSchema).optional(),
  some: z.lazy(() => NoteWhereInputObjectSchema).optional(),
  none: z.lazy(() => NoteWhereInputObjectSchema).optional()
}).strict();
export const NoteListRelationFilterObjectSchema: z.ZodType<Prisma.NoteListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.NoteListRelationFilter>;
export const NoteListRelationFilterObjectZodSchema = makeSchema();
