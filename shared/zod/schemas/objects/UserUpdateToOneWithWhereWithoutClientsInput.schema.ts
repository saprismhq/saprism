import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutClientsInputObjectSchema } from './UserUpdateWithoutClientsInput.schema';
import { UserUncheckedUpdateWithoutClientsInputObjectSchema } from './UserUncheckedUpdateWithoutClientsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutClientsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutClientsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutClientsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutClientsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutClientsInput>;
export const UserUpdateToOneWithWhereWithoutClientsInputObjectZodSchema = makeSchema();
