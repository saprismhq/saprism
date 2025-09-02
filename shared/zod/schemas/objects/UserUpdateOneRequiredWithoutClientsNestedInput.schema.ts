import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutClientsInputObjectSchema } from './UserCreateWithoutClientsInput.schema';
import { UserUncheckedCreateWithoutClientsInputObjectSchema } from './UserUncheckedCreateWithoutClientsInput.schema';
import { UserCreateOrConnectWithoutClientsInputObjectSchema } from './UserCreateOrConnectWithoutClientsInput.schema';
import { UserUpsertWithoutClientsInputObjectSchema } from './UserUpsertWithoutClientsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutClientsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutClientsInput.schema';
import { UserUpdateWithoutClientsInputObjectSchema } from './UserUpdateWithoutClientsInput.schema';
import { UserUncheckedUpdateWithoutClientsInputObjectSchema } from './UserUncheckedUpdateWithoutClientsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutClientsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutClientsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutClientsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutClientsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutClientsInputObjectSchema), z.lazy(() => UserUpdateWithoutClientsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutClientsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutClientsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutClientsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutClientsNestedInput>;
export const UserUpdateOneRequiredWithoutClientsNestedInputObjectZodSchema = makeSchema();
