import { z } from 'zod';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateWithoutClientInputObjectSchema } from './MeetingUpdateWithoutClientInput.schema';
import { MeetingUncheckedUpdateWithoutClientInputObjectSchema } from './MeetingUncheckedUpdateWithoutClientInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUpdateWithWhereUniqueWithoutClientInput> =
  z
    .object({
      where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => MeetingUpdateWithoutClientInputObjectSchema),
        z.lazy(() => MeetingUncheckedUpdateWithoutClientInputObjectSchema),
      ]),
    })
    .strict();

export const MeetingUpdateWithWhereUniqueWithoutClientInputObjectSchema =
  Schema;
