import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutMeetingsInputObjectSchema } from './UserCreateWithoutMeetingsInput.schema';
import { UserUncheckedCreateWithoutMeetingsInputObjectSchema } from './UserUncheckedCreateWithoutMeetingsInput.schema';
import { UserCreateOrConnectWithoutMeetingsInputObjectSchema } from './UserCreateOrConnectWithoutMeetingsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutMeetingsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMeetingsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMeetingsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutMeetingsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMeetingsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutMeetingsInput>;
export const UserCreateNestedOneWithoutMeetingsInputObjectZodSchema = makeSchema();
