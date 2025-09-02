import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NoteCreateWithoutMeetingInputObjectSchema } from './NoteCreateWithoutMeetingInput.schema';
import { NoteUncheckedCreateWithoutMeetingInputObjectSchema } from './NoteUncheckedCreateWithoutMeetingInput.schema';
import { NoteCreateOrConnectWithoutMeetingInputObjectSchema } from './NoteCreateOrConnectWithoutMeetingInput.schema';
import { NoteCreateManyMeetingInputEnvelopeObjectSchema } from './NoteCreateManyMeetingInputEnvelope.schema';
import { NoteWhereUniqueInputObjectSchema } from './NoteWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => NoteCreateWithoutMeetingInputObjectSchema), z.lazy(() => NoteCreateWithoutMeetingInputObjectSchema).array(), z.lazy(() => NoteUncheckedCreateWithoutMeetingInputObjectSchema), z.lazy(() => NoteUncheckedCreateWithoutMeetingInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => NoteCreateOrConnectWithoutMeetingInputObjectSchema), z.lazy(() => NoteCreateOrConnectWithoutMeetingInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => NoteCreateManyMeetingInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => NoteWhereUniqueInputObjectSchema), z.lazy(() => NoteWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const NoteUncheckedCreateNestedManyWithoutMeetingInputObjectSchema: z.ZodType<Prisma.NoteUncheckedCreateNestedManyWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteUncheckedCreateNestedManyWithoutMeetingInput>;
export const NoteUncheckedCreateNestedManyWithoutMeetingInputObjectZodSchema = makeSchema();
