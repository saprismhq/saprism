import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './MeetingUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string(),
  email: z.string().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  profileImageUrl: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  meetings: z.lazy(() => MeetingUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutClientsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutClientsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutClientsInput>;
export const UserUncheckedCreateWithoutClientsInputObjectZodSchema = makeSchema();
