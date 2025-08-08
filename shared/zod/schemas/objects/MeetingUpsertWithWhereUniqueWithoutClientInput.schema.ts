import { z } from 'zod';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateWithoutClientInputObjectSchema } from './MeetingUpdateWithoutClientInput.schema';
import { MeetingUncheckedUpdateWithoutClientInputObjectSchema } from './MeetingUncheckedUpdateWithoutClientInput.schema';
import { MeetingCreateWithoutClientInputObjectSchema } from './MeetingCreateWithoutClientInput.schema';
import { MeetingUncheckedCreateWithoutClientInputObjectSchema } from './MeetingUncheckedCreateWithoutClientInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUpsertWithWhereUniqueWithoutClientInput> =
  z
    .object({
      where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => MeetingUpdateWithoutClientInputObjectSchema),
        z.lazy(() => MeetingUncheckedUpdateWithoutClientInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => MeetingCreateWithoutClientInputObjectSchema),
        z.lazy(() => MeetingUncheckedCreateWithoutClientInputObjectSchema),
      ]),
    })
    .strict();

export const MeetingUpsertWithWhereUniqueWithoutClientInputObjectSchema =
  Schema;
