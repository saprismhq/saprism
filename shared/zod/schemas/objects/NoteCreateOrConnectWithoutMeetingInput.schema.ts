import { z } from 'zod';
import { NoteWhereUniqueInputObjectSchema } from './NoteWhereUniqueInput.schema';
import { NoteCreateWithoutMeetingInputObjectSchema } from './NoteCreateWithoutMeetingInput.schema';
import { NoteUncheckedCreateWithoutMeetingInputObjectSchema } from './NoteUncheckedCreateWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NoteCreateOrConnectWithoutMeetingInput> = z
  .object({
    where: z.lazy(() => NoteWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => NoteCreateWithoutMeetingInputObjectSchema),
      z.lazy(() => NoteUncheckedCreateWithoutMeetingInputObjectSchema),
    ]),
  })
  .strict();

export const NoteCreateOrConnectWithoutMeetingInputObjectSchema = Schema;
