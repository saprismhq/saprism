import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  clientId: z.literal(true).optional(),
  clientName: z.literal(true).optional(),
  clientCompany: z.literal(true).optional(),
  dealType: z.literal(true).optional(),
  status: z.literal(true).optional(),
  summary: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const MeetingCountAggregateInputObjectSchema: z.ZodType<Prisma.MeetingCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCountAggregateInputType>;
export const MeetingCountAggregateInputObjectZodSchema = makeSchema();
