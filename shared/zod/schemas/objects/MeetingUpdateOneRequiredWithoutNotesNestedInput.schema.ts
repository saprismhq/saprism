import { z } from 'zod';
import { MeetingCreateWithoutNotesInputObjectSchema } from './MeetingCreateWithoutNotesInput.schema';
import { MeetingUncheckedCreateWithoutNotesInputObjectSchema } from './MeetingUncheckedCreateWithoutNotesInput.schema';
import { MeetingCreateOrConnectWithoutNotesInputObjectSchema } from './MeetingCreateOrConnectWithoutNotesInput.schema';
import { MeetingUpsertWithoutNotesInputObjectSchema } from './MeetingUpsertWithoutNotesInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateWithoutNotesInputObjectSchema } from './MeetingUpdateWithoutNotesInput.schema';
import { MeetingUncheckedUpdateWithoutNotesInputObjectSchema } from './MeetingUncheckedUpdateWithoutNotesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUpdateOneRequiredWithoutNotesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MeetingCreateWithoutNotesInputObjectSchema),
          z.lazy(() => MeetingUncheckedCreateWithoutNotesInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MeetingCreateOrConnectWithoutNotesInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => MeetingUpsertWithoutNotesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => MeetingWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => MeetingUpdateWithoutNotesInputObjectSchema),
          z.lazy(() => MeetingUncheckedUpdateWithoutNotesInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const MeetingUpdateOneRequiredWithoutNotesNestedInputObjectSchema =
  Schema;
