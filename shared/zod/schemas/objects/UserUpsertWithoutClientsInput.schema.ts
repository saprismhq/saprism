import { z } from 'zod';
import { UserUpdateWithoutClientsInputObjectSchema } from './UserUpdateWithoutClientsInput.schema';
import { UserUncheckedUpdateWithoutClientsInputObjectSchema } from './UserUncheckedUpdateWithoutClientsInput.schema';
import { UserCreateWithoutClientsInputObjectSchema } from './UserCreateWithoutClientsInput.schema';
import { UserUncheckedCreateWithoutClientsInputObjectSchema } from './UserUncheckedCreateWithoutClientsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutClientsInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutClientsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutClientsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutClientsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutClientsInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutClientsInputObjectSchema = Schema;
