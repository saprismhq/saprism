import { z } from 'zod';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingCreateWithoutClientInputObjectSchema } from './MeetingCreateWithoutClientInput.schema';
import { MeetingUncheckedCreateWithoutClientInputObjectSchema } from './MeetingUncheckedCreateWithoutClientInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateOrConnectWithoutClientInput> = z
  .object({
    where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => MeetingCreateWithoutClientInputObjectSchema),
      z.lazy(() => MeetingUncheckedCreateWithoutClientInputObjectSchema),
    ]),
  })
  .strict();

export const MeetingCreateOrConnectWithoutClientInputObjectSchema = Schema;
