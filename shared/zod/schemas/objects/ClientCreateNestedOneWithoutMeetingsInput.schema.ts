import { z } from 'zod';
import { ClientCreateWithoutMeetingsInputObjectSchema } from './ClientCreateWithoutMeetingsInput.schema';
import { ClientUncheckedCreateWithoutMeetingsInputObjectSchema } from './ClientUncheckedCreateWithoutMeetingsInput.schema';
import { ClientCreateOrConnectWithoutMeetingsInputObjectSchema } from './ClientCreateOrConnectWithoutMeetingsInput.schema';
import { ClientWhereUniqueInputObjectSchema } from './ClientWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientCreateNestedOneWithoutMeetingsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ClientCreateWithoutMeetingsInputObjectSchema),
        z.lazy(() => ClientUncheckedCreateWithoutMeetingsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ClientCreateOrConnectWithoutMeetingsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => ClientWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const ClientCreateNestedOneWithoutMeetingsInputObjectSchema = Schema;
