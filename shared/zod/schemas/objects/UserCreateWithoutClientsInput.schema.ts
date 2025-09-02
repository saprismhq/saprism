import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateNestedManyWithoutUserInputObjectSchema } from './MeetingCreateNestedManyWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().max(255),
  email: z.string().max(255).nullish(),
  firstName: z.string().max(255).nullish(),
  lastName: z.string().max(255).nullish(),
  profileImageUrl: z.string().max(255).nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  meetings: z.lazy(() => MeetingCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutClientsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutClientsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutClientsInput>;
export const UserCreateWithoutClientsInputObjectZodSchema = makeSchema();
