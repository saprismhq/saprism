import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NoteCreateWithoutMeetingInputObjectSchema } from './NoteCreateWithoutMeetingInput.schema';
import { NoteUncheckedCreateWithoutMeetingInputObjectSchema } from './NoteUncheckedCreateWithoutMeetingInput.schema';
import { NoteCreateOrConnectWithoutMeetingInputObjectSchema } from './NoteCreateOrConnectWithoutMeetingInput.schema';
import { NoteUpsertWithWhereUniqueWithoutMeetingInputObjectSchema } from './NoteUpsertWithWhereUniqueWithoutMeetingInput.schema';
import { NoteCreateManyMeetingInputEnvelopeObjectSchema } from './NoteCreateManyMeetingInputEnvelope.schema';
import { NoteWhereUniqueInputObjectSchema } from './NoteWhereUniqueInput.schema';
import { NoteUpdateWithWhereUniqueWithoutMeetingInputObjectSchema } from './NoteUpdateWithWhereUniqueWithoutMeetingInput.schema';
import { NoteUpdateManyWithWhereWithoutMeetingInputObjectSchema } from './NoteUpdateManyWithWhereWithoutMeetingInput.schema';
import { NoteScalarWhereInputObjectSchema } from './NoteScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => NoteCreateWithoutMeetingInputObjectSchema), z.lazy(() => NoteCreateWithoutMeetingInputObjectSchema).array(), z.lazy(() => NoteUncheckedCreateWithoutMeetingInputObjectSchema), z.lazy(() => NoteUncheckedCreateWithoutMeetingInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => NoteCreateOrConnectWithoutMeetingInputObjectSchema), z.lazy(() => NoteCreateOrConnectWithoutMeetingInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => NoteUpsertWithWhereUniqueWithoutMeetingInputObjectSchema), z.lazy(() => NoteUpsertWithWhereUniqueWithoutMeetingInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => NoteCreateManyMeetingInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => NoteWhereUniqueInputObjectSchema), z.lazy(() => NoteWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => NoteWhereUniqueInputObjectSchema), z.lazy(() => NoteWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => NoteWhereUniqueInputObjectSchema), z.lazy(() => NoteWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => NoteWhereUniqueInputObjectSchema), z.lazy(() => NoteWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => NoteUpdateWithWhereUniqueWithoutMeetingInputObjectSchema), z.lazy(() => NoteUpdateWithWhereUniqueWithoutMeetingInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => NoteUpdateManyWithWhereWithoutMeetingInputObjectSchema), z.lazy(() => NoteUpdateManyWithWhereWithoutMeetingInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => NoteScalarWhereInputObjectSchema), z.lazy(() => NoteScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const NoteUncheckedUpdateManyWithoutMeetingNestedInputObjectSchema: z.ZodType<Prisma.NoteUncheckedUpdateManyWithoutMeetingNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteUncheckedUpdateManyWithoutMeetingNestedInput>;
export const NoteUncheckedUpdateManyWithoutMeetingNestedInputObjectZodSchema = makeSchema();
