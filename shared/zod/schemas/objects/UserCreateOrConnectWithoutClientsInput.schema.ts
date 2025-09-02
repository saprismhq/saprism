import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutClientsInputObjectSchema } from './UserCreateWithoutClientsInput.schema';
import { UserUncheckedCreateWithoutClientsInputObjectSchema } from './UserUncheckedCreateWithoutClientsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutClientsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutClientsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutClientsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutClientsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutClientsInput>;
export const UserCreateOrConnectWithoutClientsInputObjectZodSchema = makeSchema();
