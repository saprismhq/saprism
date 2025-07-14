import { z } from 'zod';
import { UserCreateWithoutMeetingsInputObjectSchema } from './UserCreateWithoutMeetingsInput.schema';
import { UserUncheckedCreateWithoutMeetingsInputObjectSchema } from './UserUncheckedCreateWithoutMeetingsInput.schema';
import { UserCreateOrConnectWithoutMeetingsInputObjectSchema } from './UserCreateOrConnectWithoutMeetingsInput.schema';
import { UserUpsertWithoutMeetingsInputObjectSchema } from './UserUpsertWithoutMeetingsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutMeetingsInputObjectSchema } from './UserUpdateWithoutMeetingsInput.schema';
import { UserUncheckedUpdateWithoutMeetingsInputObjectSchema } from './UserUncheckedUpdateWithoutMeetingsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMeetingsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutMeetingsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutMeetingsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutMeetingsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutMeetingsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutMeetingsInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutMeetingsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutMeetingsNestedInputObjectSchema =
  Schema;
