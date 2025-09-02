import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  meetingId: z.literal(true).optional(),
  content: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const NoteMaxAggregateInputObjectSchema: z.ZodType<Prisma.NoteMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.NoteMaxAggregateInputType>;
export const NoteMaxAggregateInputObjectZodSchema = makeSchema();
