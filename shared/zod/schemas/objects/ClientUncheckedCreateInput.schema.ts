import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingUncheckedCreateNestedManyWithoutClientInputObjectSchema } from './MeetingUncheckedCreateNestedManyWithoutClientInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int().optional(),
  userId: z.string().max(255),
  name: z.string().max(255),
  company: z.string().max(255),
  email: z.string().max(255).nullish(),
  phone: z.string().max(255).nullish(),
  industry: z.string().max(255).nullish(),
  salesMethodology: z.string().max(255).nullish(),
  notes: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  meetings: z.lazy(() => MeetingUncheckedCreateNestedManyWithoutClientInputObjectSchema).optional()
}).strict();
export const ClientUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ClientUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientUncheckedCreateInput>;
export const ClientUncheckedCreateInputObjectZodSchema = makeSchema();
