import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutClientsInputObjectSchema } from './UserCreateWithoutClientsInput.schema';
import { UserUncheckedCreateWithoutClientsInputObjectSchema } from './UserUncheckedCreateWithoutClientsInput.schema';
import { UserCreateOrConnectWithoutClientsInputObjectSchema } from './UserCreateOrConnectWithoutClientsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutClientsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutClientsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutClientsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutClientsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutClientsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutClientsInput>;
export const UserCreateNestedOneWithoutClientsInputObjectZodSchema = makeSchema();
