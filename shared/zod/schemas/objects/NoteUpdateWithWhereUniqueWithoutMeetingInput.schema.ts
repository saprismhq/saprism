import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NoteWhereUniqueInputObjectSchema } from './NoteWhereUniqueInput.schema';
import { NoteUpdateWithoutMeetingInputObjectSchema } from './NoteUpdateWithoutMeetingInput.schema';
import { NoteUncheckedUpdateWithoutMeetingInputObjectSchema } from './NoteUncheckedUpdateWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => NoteWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => NoteUpdateWithoutMeetingInputObjectSchema), z.lazy(() => NoteUncheckedUpdateWithoutMeetingInputObjectSchema)])
}).strict();
export const NoteUpdateWithWhereUniqueWithoutMeetingInputObjectSchema: z.ZodType<Prisma.NoteUpdateWithWhereUniqueWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteUpdateWithWhereUniqueWithoutMeetingInput>;
export const NoteUpdateWithWhereUniqueWithoutMeetingInputObjectZodSchema = makeSchema();
