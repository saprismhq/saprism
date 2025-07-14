import { z } from 'zod';
import { MeetingCreateWithoutNotesInputObjectSchema } from './MeetingCreateWithoutNotesInput.schema';
import { MeetingUncheckedCreateWithoutNotesInputObjectSchema } from './MeetingUncheckedCreateWithoutNotesInput.schema';
import { MeetingCreateOrConnectWithoutNotesInputObjectSchema } from './MeetingCreateOrConnectWithoutNotesInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingCreateNestedOneWithoutNotesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => MeetingCreateWithoutNotesInputObjectSchema),
        z.lazy(() => MeetingUncheckedCreateWithoutNotesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => MeetingCreateOrConnectWithoutNotesInputObjectSchema)
      .optional(),
    connect: z.lazy(() => MeetingWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const MeetingCreateNestedOneWithoutNotesInputObjectSchema = Schema;
