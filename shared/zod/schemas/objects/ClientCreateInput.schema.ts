import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutClientsInputObjectSchema } from './UserCreateNestedOneWithoutClientsInput.schema';
import { MeetingCreateNestedManyWithoutClientInputObjectSchema } from './MeetingCreateNestedManyWithoutClientInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  name: z.string().max(255),
  company: z.string().max(255),
  email: z.string().max(255).nullish(),
  phone: z.string().max(255).nullish(),
  industry: z.string().max(255).nullish(),
  salesMethodology: z.string().max(255).nullish(),
  notes: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutClientsInputObjectSchema),
  meetings: z.lazy(() => MeetingCreateNestedManyWithoutClientInputObjectSchema).optional()
}).strict();
export const ClientCreateInputObjectSchema: z.ZodType<Prisma.ClientCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientCreateInput>;
export const ClientCreateInputObjectZodSchema = makeSchema();
