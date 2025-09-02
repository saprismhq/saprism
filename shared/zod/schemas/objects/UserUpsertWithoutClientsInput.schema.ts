import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutClientsInputObjectSchema } from './UserUpdateWithoutClientsInput.schema';
import { UserUncheckedUpdateWithoutClientsInputObjectSchema } from './UserUncheckedUpdateWithoutClientsInput.schema';
import { UserCreateWithoutClientsInputObjectSchema } from './UserCreateWithoutClientsInput.schema';
import { UserUncheckedCreateWithoutClientsInputObjectSchema } from './UserUncheckedCreateWithoutClientsInput.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutClientsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutClientsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutClientsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutClientsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutClientsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutClientsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutClientsInput>;
export const UserUpsertWithoutClientsInputObjectZodSchema = makeSchema();
