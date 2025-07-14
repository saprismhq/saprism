import { z } from 'zod';
import { UserCreateWithoutMeetingsInputObjectSchema } from './UserCreateWithoutMeetingsInput.schema';
import { UserUncheckedCreateWithoutMeetingsInputObjectSchema } from './UserUncheckedCreateWithoutMeetingsInput.schema';
import { UserCreateOrConnectWithoutMeetingsInputObjectSchema } from './UserCreateOrConnectWithoutMeetingsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutMeetingsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutMeetingsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutMeetingsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutMeetingsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutMeetingsInputObjectSchema = Schema;
