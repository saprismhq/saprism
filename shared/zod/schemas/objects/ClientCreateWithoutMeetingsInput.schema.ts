import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutClientsInputObjectSchema } from './UserCreateNestedOneWithoutClientsInput.schema'

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
  user: z.lazy(() => UserCreateNestedOneWithoutClientsInputObjectSchema)
}).strict();
export const ClientCreateWithoutMeetingsInputObjectSchema: z.ZodType<Prisma.ClientCreateWithoutMeetingsInput> = makeSchema() as unknown as z.ZodType<Prisma.ClientCreateWithoutMeetingsInput>;
export const ClientCreateWithoutMeetingsInputObjectZodSchema = makeSchema();
