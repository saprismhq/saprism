import { z } from 'zod';
import { NoteWhereUniqueInputObjectSchema } from './NoteWhereUniqueInput.schema';
import { NoteUpdateWithoutMeetingInputObjectSchema } from './NoteUpdateWithoutMeetingInput.schema';
import { NoteUncheckedUpdateWithoutMeetingInputObjectSchema } from './NoteUncheckedUpdateWithoutMeetingInput.schema';
import { NoteCreateWithoutMeetingInputObjectSchema } from './NoteCreateWithoutMeetingInput.schema';
import { NoteUncheckedCreateWithoutMeetingInputObjectSchema } from './NoteUncheckedCreateWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NoteUpsertWithWhereUniqueWithoutMeetingInput> = z
  .object({
    where: z.lazy(() => NoteWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => NoteUpdateWithoutMeetingInputObjectSchema),
      z.lazy(() => NoteUncheckedUpdateWithoutMeetingInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => NoteCreateWithoutMeetingInputObjectSchema),
      z.lazy(() => NoteUncheckedCreateWithoutMeetingInputObjectSchema),
    ]),
  })
  .strict();

export const NoteUpsertWithWhereUniqueWithoutMeetingInputObjectSchema = Schema;
