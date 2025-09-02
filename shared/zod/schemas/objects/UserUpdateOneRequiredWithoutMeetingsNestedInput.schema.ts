import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutMeetingsInputObjectSchema } from './UserCreateWithoutMeetingsInput.schema';
import { UserUncheckedCreateWithoutMeetingsInputObjectSchema } from './UserUncheckedCreateWithoutMeetingsInput.schema';
import { UserCreateOrConnectWithoutMeetingsInputObjectSchema } from './UserCreateOrConnectWithoutMeetingsInput.schema';
import { UserUpsertWithoutMeetingsInputObjectSchema } from './UserUpsertWithoutMeetingsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutMeetingsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutMeetingsInput.schema';
import { UserUpdateWithoutMeetingsInputObjectSchema } from './UserUpdateWithoutMeetingsInput.schema';
import { UserUncheckedUpdateWithoutMeetingsInputObjectSchema } from './UserUncheckedUpdateWithoutMeetingsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutMeetingsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMeetingsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMeetingsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMeetingsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutMeetingsInputObjectSchema), z.lazy(() => UserUpdateWithoutMeetingsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMeetingsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutMeetingsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMeetingsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutMeetingsNestedInput>;
export const UserUpdateOneRequiredWithoutMeetingsNestedInputObjectZodSchema = makeSchema();
