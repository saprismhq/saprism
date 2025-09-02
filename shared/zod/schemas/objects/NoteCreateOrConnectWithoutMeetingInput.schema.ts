import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NoteWhereUniqueInputObjectSchema } from './NoteWhereUniqueInput.schema';
import { NoteCreateWithoutMeetingInputObjectSchema } from './NoteCreateWithoutMeetingInput.schema';
import { NoteUncheckedCreateWithoutMeetingInputObjectSchema } from './NoteUncheckedCreateWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => NoteWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => NoteCreateWithoutMeetingInputObjectSchema), z.lazy(() => NoteUncheckedCreateWithoutMeetingInputObjectSchema)])
}).strict();
export const NoteCreateOrConnectWithoutMeetingInputObjectSchema: z.ZodType<Prisma.NoteCreateOrConnectWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteCreateOrConnectWithoutMeetingInput>;
export const NoteCreateOrConnectWithoutMeetingInputObjectZodSchema = makeSchema();
