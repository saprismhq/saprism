import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutMeetingsInputObjectSchema } from './UserUpdateWithoutMeetingsInput.schema';
import { UserUncheckedUpdateWithoutMeetingsInputObjectSchema } from './UserUncheckedUpdateWithoutMeetingsInput.schema';
import { UserCreateWithoutMeetingsInputObjectSchema } from './UserCreateWithoutMeetingsInput.schema';
import { UserUncheckedCreateWithoutMeetingsInputObjectSchema } from './UserUncheckedCreateWithoutMeetingsInput.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutMeetingsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMeetingsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutMeetingsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMeetingsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutMeetingsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutMeetingsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutMeetingsInput>;
export const UserUpsertWithoutMeetingsInputObjectZodSchema = makeSchema();
