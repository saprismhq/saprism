import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NoteWhereUniqueInputObjectSchema } from './NoteWhereUniqueInput.schema';
import { NoteUpdateWithoutMeetingInputObjectSchema } from './NoteUpdateWithoutMeetingInput.schema';
import { NoteUncheckedUpdateWithoutMeetingInputObjectSchema } from './NoteUncheckedUpdateWithoutMeetingInput.schema';
import { NoteCreateWithoutMeetingInputObjectSchema } from './NoteCreateWithoutMeetingInput.schema';
import { NoteUncheckedCreateWithoutMeetingInputObjectSchema } from './NoteUncheckedCreateWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => NoteWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => NoteUpdateWithoutMeetingInputObjectSchema), z.lazy(() => NoteUncheckedUpdateWithoutMeetingInputObjectSchema)]),
  create: z.union([z.lazy(() => NoteCreateWithoutMeetingInputObjectSchema), z.lazy(() => NoteUncheckedCreateWithoutMeetingInputObjectSchema)])
}).strict();
export const NoteUpsertWithWhereUniqueWithoutMeetingInputObjectSchema: z.ZodType<Prisma.NoteUpsertWithWhereUniqueWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteUpsertWithWhereUniqueWithoutMeetingInput>;
export const NoteUpsertWithWhereUniqueWithoutMeetingInputObjectZodSchema = makeSchema();
