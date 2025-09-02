import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  meetingId: z.literal(true).optional()
}).strict();
export const NoteAvgAggregateInputObjectSchema: z.ZodType<Prisma.NoteAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.NoteAvgAggregateInputType>;
export const NoteAvgAggregateInputObjectZodSchema = makeSchema();
