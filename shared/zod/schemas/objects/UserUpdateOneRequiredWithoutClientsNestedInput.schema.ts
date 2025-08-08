import { z } from 'zod';
import { UserCreateWithoutClientsInputObjectSchema } from './UserCreateWithoutClientsInput.schema';
import { UserUncheckedCreateWithoutClientsInputObjectSchema } from './UserUncheckedCreateWithoutClientsInput.schema';
import { UserCreateOrConnectWithoutClientsInputObjectSchema } from './UserCreateOrConnectWithoutClientsInput.schema';
import { UserUpsertWithoutClientsInputObjectSchema } from './UserUpsertWithoutClientsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutClientsInputObjectSchema } from './UserUpdateWithoutClientsInput.schema';
import { UserUncheckedUpdateWithoutClientsInputObjectSchema } from './UserUncheckedUpdateWithoutClientsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutClientsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutClientsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutClientsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutClientsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutClientsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutClientsInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutClientsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutClientsNestedInputObjectSchema =
  Schema;
