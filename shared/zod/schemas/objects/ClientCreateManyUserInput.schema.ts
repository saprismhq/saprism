import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  company: z.string(),
  email: z.string().nullish(),
  phone: z.string().nullish(),
  industry: z.string().nullish(),
  salesMethodology: z.string().nullish(),
  notes: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const ClientCreateManyUserInputObjectSchema: z.ZodType<Prisma.ClientCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientCreateManyUserInput>;
export const ClientCreateManyUserInputObjectZodSchema = makeSchema();
