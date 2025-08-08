import { z } from 'zod';
import { MeetingUpdateWithoutCallSessionsInputObjectSchema } from './MeetingUpdateWithoutCallSessionsInput.schema';
import { MeetingUncheckedUpdateWithoutCallSessionsInputObjectSchema } from './MeetingUncheckedUpdateWithoutCallSessionsInput.schema';
import { MeetingCreateWithoutCallSessionsInputObjectSchema } from './MeetingCreateWithoutCallSessionsInput.schema';
import { MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCallSessionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUpsertWithoutCallSessionsInput> = z
  .object({
    update: z.union([
      z.lazy(() => MeetingUpdateWithoutCallSessionsInputObjectSchema),
      z.lazy(() => MeetingUncheckedUpdateWithoutCallSessionsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => MeetingCreateWithoutCallSessionsInputObjectSchema),
      z.lazy(() => MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema),
    ]),
  })
  .strict();

export const MeetingUpsertWithoutCallSessionsInputObjectSchema = Schema;
