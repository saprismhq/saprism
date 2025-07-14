import { z } from 'zod';
import { NoteWhereUniqueInputObjectSchema } from './NoteWhereUniqueInput.schema';
import { NoteUpdateWithoutMeetingInputObjectSchema } from './NoteUpdateWithoutMeetingInput.schema';
import { NoteUncheckedUpdateWithoutMeetingInputObjectSchema } from './NoteUncheckedUpdateWithoutMeetingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NoteUpdateWithWhereUniqueWithoutMeetingInput> = z
  .object({
    where: z.lazy(() => NoteWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => NoteUpdateWithoutMeetingInputObjectSchema),
      z.lazy(() => NoteUncheckedUpdateWithoutMeetingInputObjectSchema),
    ]),
  })
  .strict();

export const NoteUpdateWithWhereUniqueWithoutMeetingInputObjectSchema = Schema;
