import { z } from 'zod';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingCreateWithoutUserInputObjectSchema } from './MeetingCreateWithoutUserInput.schema';
import { MeetingUncheckedCreateWithoutUserInputObjectSchema } from './MeetingUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => MeetingCreateWithoutUserInputObjectSchema),
      z.lazy(() => MeetingUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const MeetingCreateOrConnectWithoutUserInputObjectSchema = Schema;
