import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ClientUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ClientUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string(),
  email: z.string().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  profileImageUrl: z.string().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  clients: z.lazy(() => ClientUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutMeetingsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMeetingsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutMeetingsInput>;
export const UserUncheckedCreateWithoutMeetingsInputObjectZodSchema = makeSchema();
