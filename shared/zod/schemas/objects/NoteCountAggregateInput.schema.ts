import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  meetingId: z.literal(true).optional(),
  content: z.literal(true).optional(),
  aiAnalysis: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const NoteCountAggregateInputObjectSchema: z.ZodType<Prisma.NoteCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.NoteCountAggregateInputType>;
export const NoteCountAggregateInputObjectZodSchema = makeSchema();
