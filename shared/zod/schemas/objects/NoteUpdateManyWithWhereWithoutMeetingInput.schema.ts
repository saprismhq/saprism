import { z } from 'zod';
import { NoteScalarWhereInputObjectSchema } from './NoteScalarWhereInput.schema';
import { NoteUpdateManyMutationInputObjectSchema } from './NoteUpdateManyMutationInput.schema';
import { NoteUncheckedUpdateManyWithoutNotesInputObjectSchema } from './NoteUncheckedUpdateManyWithoutNotesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NoteUpdateManyWithWhereWithoutMeetingInput> = z
  .object({
    where: z.lazy(() => NoteScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => NoteUpdateManyMutationInputObjectSchema),
      z.lazy(() => NoteUncheckedUpdateManyWithoutNotesInputObjectSchema),
    ]),
  })
  .strict();

export const NoteUpdateManyWithWhereWithoutMeetingInputObjectSchema = Schema;
