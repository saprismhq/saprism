import { z } from 'zod';
import { MeetingUpdateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUpdateWithoutCoachingSuggestionsInput.schema';
import { MeetingUncheckedUpdateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUncheckedUpdateWithoutCoachingSuggestionsInput.schema';
import { MeetingCreateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingCreateWithoutCoachingSuggestionsInput.schema';
import { MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCoachingSuggestionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUpsertWithoutCoachingSuggestionsInput> = z
  .object({
    update: z.union([
      z.lazy(() => MeetingUpdateWithoutCoachingSuggestionsInputObjectSchema),
      z.lazy(
        () => MeetingUncheckedUpdateWithoutCoachingSuggestionsInputObjectSchema,
      ),
    ]),
    create: z.union([
      z.lazy(() => MeetingCreateWithoutCoachingSuggestionsInputObjectSchema),
      z.lazy(
        () => MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema,
      ),
    ]),
  })
  .strict();

export const MeetingUpsertWithoutCoachingSuggestionsInputObjectSchema = Schema;
