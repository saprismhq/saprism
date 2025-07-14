import { z } from 'zod';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateWithoutUserInputObjectSchema } from './MeetingUpdateWithoutUserInput.schema';
import { MeetingUncheckedUpdateWithoutUserInputObjectSchema } from './MeetingUncheckedUpdateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUpdateWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => MeetingUpdateWithoutUserInputObjectSchema),
      z.lazy(() => MeetingUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const MeetingUpdateWithWhereUniqueWithoutUserInputObjectSchema = Schema;
