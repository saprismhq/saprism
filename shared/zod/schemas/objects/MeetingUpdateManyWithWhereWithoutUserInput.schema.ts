import { z } from 'zod';
import { MeetingScalarWhereInputObjectSchema } from './MeetingScalarWhereInput.schema';
import { MeetingUpdateManyMutationInputObjectSchema } from './MeetingUpdateManyMutationInput.schema';
import { MeetingUncheckedUpdateManyWithoutMeetingsInputObjectSchema } from './MeetingUncheckedUpdateManyWithoutMeetingsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUpdateManyWithWhereWithoutUserInput> = z
  .object({
    where: z.lazy(() => MeetingScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => MeetingUpdateManyMutationInputObjectSchema),
      z.lazy(() => MeetingUncheckedUpdateManyWithoutMeetingsInputObjectSchema),
    ]),
  })
  .strict();

export const MeetingUpdateManyWithWhereWithoutUserInputObjectSchema = Schema;
