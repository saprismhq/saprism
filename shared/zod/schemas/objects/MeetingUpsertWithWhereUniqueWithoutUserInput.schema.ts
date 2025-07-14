import { z } from 'zod';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateWithoutUserInputObjectSchema } from './MeetingUpdateWithoutUserInput.schema';
import { MeetingUncheckedUpdateWithoutUserInputObjectSchema } from './MeetingUncheckedUpdateWithoutUserInput.schema';
import { MeetingCreateWithoutUserInputObjectSchema } from './MeetingCreateWithoutUserInput.schema';
import { MeetingUncheckedCreateWithoutUserInputObjectSchema } from './MeetingUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUpsertWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => MeetingUpdateWithoutUserInputObjectSchema),
      z.lazy(() => MeetingUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => MeetingCreateWithoutUserInputObjectSchema),
      z.lazy(() => MeetingUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const MeetingUpsertWithWhereUniqueWithoutUserInputObjectSchema = Schema;
