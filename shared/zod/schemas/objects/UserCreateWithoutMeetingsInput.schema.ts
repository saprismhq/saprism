import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientCreateNestedManyWithoutUserInputObjectSchema } from './ClientCreateNestedManyWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().max(255),
  email: z.string().max(255).nullish(),
  firstName: z.string().max(255).nullish(),
  lastName: z.string().max(255).nullish(),
  profileImageUrl: z.string().max(255).nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  clients: z.lazy(() => ClientCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutMeetingsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutMeetingsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutMeetingsInput>;
export const UserCreateWithoutMeetingsInputObjectZodSchema = makeSchema();
