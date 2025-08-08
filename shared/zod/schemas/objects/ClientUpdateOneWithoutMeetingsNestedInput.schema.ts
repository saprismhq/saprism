import { z } from 'zod';
import { ClientCreateWithoutMeetingsInputObjectSchema } from './ClientCreateWithoutMeetingsInput.schema';
import { ClientUncheckedCreateWithoutMeetingsInputObjectSchema } from './ClientUncheckedCreateWithoutMeetingsInput.schema';
import { ClientCreateOrConnectWithoutMeetingsInputObjectSchema } from './ClientCreateOrConnectWithoutMeetingsInput.schema';
import { ClientUpsertWithoutMeetingsInputObjectSchema } from './ClientUpsertWithoutMeetingsInput.schema';
import { ClientWhereUniqueInputObjectSchema } from './ClientWhereUniqueInput.schema';
import { ClientUpdateWithoutMeetingsInputObjectSchema } from './ClientUpdateWithoutMeetingsInput.schema';
import { ClientUncheckedUpdateWithoutMeetingsInputObjectSchema } from './ClientUncheckedUpdateWithoutMeetingsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ClientUpdateOneWithoutMeetingsNestedInput> = z
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
    upsert: z
      .lazy(() => ClientUpsertWithoutMeetingsInputObjectSchema)
      .optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => ClientWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => ClientUpdateWithoutMeetingsInputObjectSchema),
        z.lazy(() => ClientUncheckedUpdateWithoutMeetingsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const ClientUpdateOneWithoutMeetingsNestedInputObjectSchema = Schema;
