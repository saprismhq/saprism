import { z } from 'zod';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingCreateWithoutNotesInputObjectSchema } from './MeetingCreateWithoutNotesInput.schema';
import { MeetingUncheckedCreateWithoutNotesInputObjectSchema } from './MeetingUncheckedCreateWithoutNotesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateOrConnectWithoutNotesInput> = z
  .object({
    where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => MeetingCreateWithoutNotesInputObjectSchema),
      z.lazy(() => MeetingUncheckedCreateWithoutNotesInputObjectSchema),
    ]),
  })
  .strict();

export const MeetingCreateOrConnectWithoutNotesInputObjectSchema = Schema;
