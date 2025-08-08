import { z } from 'zod';
import { MeetingCreateWithoutCallSessionsInputObjectSchema } from './MeetingCreateWithoutCallSessionsInput.schema';
import { MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCallSessionsInput.schema';
import { MeetingCreateOrConnectWithoutCallSessionsInputObjectSchema } from './MeetingCreateOrConnectWithoutCallSessionsInput.schema';
import { MeetingUpsertWithoutCallSessionsInputObjectSchema } from './MeetingUpsertWithoutCallSessionsInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateWithoutCallSessionsInputObjectSchema } from './MeetingUpdateWithoutCallSessionsInput.schema';
import { MeetingUncheckedUpdateWithoutCallSessionsInputObjectSchema } from './MeetingUncheckedUpdateWithoutCallSessionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUpdateOneRequiredWithoutCallSessionsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MeetingCreateWithoutCallSessionsInputObjectSchema),
          z.lazy(
            () => MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MeetingCreateOrConnectWithoutCallSessionsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => MeetingUpsertWithoutCallSessionsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => MeetingWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => MeetingUpdateWithoutCallSessionsInputObjectSchema),
          z.lazy(
            () => MeetingUncheckedUpdateWithoutCallSessionsInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const MeetingUpdateOneRequiredWithoutCallSessionsNestedInputObjectSchema =
  Schema;
