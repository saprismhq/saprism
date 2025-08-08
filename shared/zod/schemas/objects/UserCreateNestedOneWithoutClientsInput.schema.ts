import { z } from 'zod';
import { UserCreateWithoutClientsInputObjectSchema } from './UserCreateWithoutClientsInput.schema';
import { UserUncheckedCreateWithoutClientsInputObjectSchema } from './UserUncheckedCreateWithoutClientsInput.schema';
import { UserCreateOrConnectWithoutClientsInputObjectSchema } from './UserCreateOrConnectWithoutClientsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutClientsInput> = z
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
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutClientsInputObjectSchema = Schema;
