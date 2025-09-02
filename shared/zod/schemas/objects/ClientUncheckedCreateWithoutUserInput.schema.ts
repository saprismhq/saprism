import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingUncheckedCreateNestedManyWithoutClientInputObjectSchema } from './MeetingUncheckedCreateNestedManyWithoutClientInput.schema'

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
  updatedAt: z.date().optional(),
  meetings: z.lazy(() => MeetingUncheckedCreateNestedManyWithoutClientInputObjectSchema).optional()
}).strict();
export const ClientUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ClientUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientUncheckedCreateWithoutUserInput>;
export const ClientUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
