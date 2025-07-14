import { z } from 'zod';
import { MeetingUpdateWithoutNotesInputObjectSchema } from './MeetingUpdateWithoutNotesInput.schema';
import { MeetingUncheckedUpdateWithoutNotesInputObjectSchema } from './MeetingUncheckedUpdateWithoutNotesInput.schema';
import { MeetingCreateWithoutNotesInputObjectSchema } from './MeetingCreateWithoutNotesInput.schema';
import { MeetingUncheckedCreateWithoutNotesInputObjectSchema } from './MeetingUncheckedCreateWithoutNotesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingUpsertWithoutNotesInput> = z
  .object({
    update: z.union([
      z.lazy(() => MeetingUpdateWithoutNotesInputObjectSchema),
      z.lazy(() => MeetingUncheckedUpdateWithoutNotesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => MeetingCreateWithoutNotesInputObjectSchema),
      z.lazy(() => MeetingUncheckedCreateWithoutNotesInputObjectSchema),
    ]),
  })
  .strict();

export const MeetingUpsertWithoutNotesInputObjectSchema = Schema;
