import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutMeetingsInputObjectSchema } from './UserCreateWithoutMeetingsInput.schema';
import { UserUncheckedCreateWithoutMeetingsInputObjectSchema } from './UserUncheckedCreateWithoutMeetingsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutMeetingsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMeetingsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutMeetingsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMeetingsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutMeetingsInput>;
export const UserCreateOrConnectWithoutMeetingsInputObjectZodSchema = makeSchema();
