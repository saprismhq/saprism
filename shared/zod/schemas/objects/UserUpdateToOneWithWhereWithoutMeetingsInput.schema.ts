import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutMeetingsInputObjectSchema } from './UserUpdateWithoutMeetingsInput.schema';
import { UserUncheckedUpdateWithoutMeetingsInputObjectSchema } from './UserUncheckedUpdateWithoutMeetingsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutMeetingsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMeetingsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutMeetingsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMeetingsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMeetingsInput>;
export const UserUpdateToOneWithWhereWithoutMeetingsInputObjectZodSchema = makeSchema();
