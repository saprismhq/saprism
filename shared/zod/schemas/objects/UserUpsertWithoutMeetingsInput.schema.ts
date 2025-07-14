import { z } from 'zod';
import { UserUpdateWithoutMeetingsInputObjectSchema } from './UserUpdateWithoutMeetingsInput.schema';
import { UserUncheckedUpdateWithoutMeetingsInputObjectSchema } from './UserUncheckedUpdateWithoutMeetingsInput.schema';
import { UserCreateWithoutMeetingsInputObjectSchema } from './UserCreateWithoutMeetingsInput.schema';
import { UserUncheckedCreateWithoutMeetingsInputObjectSchema } from './UserUncheckedCreateWithoutMeetingsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutMeetingsInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutMeetingsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutMeetingsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutMeetingsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutMeetingsInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutMeetingsInputObjectSchema = Schema;
