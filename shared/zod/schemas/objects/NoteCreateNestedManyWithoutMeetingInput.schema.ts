import { z } from 'zod';
import { NoteCreateWithoutMeetingInputObjectSchema } from './NoteCreateWithoutMeetingInput.schema';
import { NoteUncheckedCreateWithoutMeetingInputObjectSchema } from './NoteUncheckedCreateWithoutMeetingInput.schema';
import { NoteCreateOrConnectWithoutMeetingInputObjectSchema } from './NoteCreateOrConnectWithoutMeetingInput.schema';
import { NoteCreateManyMeetingInputEnvelopeObjectSchema } from './NoteCreateManyMeetingInputEnvelope.schema';
import { NoteWhereUniqueInputObjectSchema } from './NoteWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NoteCreateNestedManyWithoutMeetingInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => NoteCreateWithoutMeetingInputObjectSchema),
        z.lazy(() => NoteCreateWithoutMeetingInputObjectSchema).array(),
        z.lazy(() => NoteUncheckedCreateWithoutMeetingInputObjectSchema),
        z
          .lazy(() => NoteUncheckedCreateWithoutMeetingInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => NoteCreateOrConnectWithoutMeetingInputObjectSchema),
        z
          .lazy(() => NoteCreateOrConnectWithoutMeetingInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => NoteCreateManyMeetingInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => NoteWhereUniqueInputObjectSchema),
        z.lazy(() => NoteWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const NoteCreateNestedManyWithoutMeetingInputObjectSchema = Schema;
