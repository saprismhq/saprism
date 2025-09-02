import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int().optional(),
  userId: z.string(),
  clientName: z.string(),
  clientCompany: z.string().nullish(),
  dealType: z.string().optional(),
  status: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const MeetingCreateManyClientInputObjectSchema: z.ZodType<Prisma.MeetingCreateManyClientInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateManyClientInput>;
export const MeetingCreateManyClientInputObjectZodSchema = makeSchema();
