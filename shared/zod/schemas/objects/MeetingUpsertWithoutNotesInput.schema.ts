import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingUpdateWithoutNotesInputObjectSchema } from './MeetingUpdateWithoutNotesInput.schema';
import { MeetingUncheckedUpdateWithoutNotesInputObjectSchema } from './MeetingUncheckedUpdateWithoutNotesInput.schema';
import { MeetingCreateWithoutNotesInputObjectSchema } from './MeetingCreateWithoutNotesInput.schema';
import { MeetingUncheckedCreateWithoutNotesInputObjectSchema } from './MeetingUncheckedCreateWithoutNotesInput.schema';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => MeetingUpdateWithoutNotesInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutNotesInputObjectSchema)]),
  create: z.union([z.lazy(() => MeetingCreateWithoutNotesInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutNotesInputObjectSchema)]),
  where: z.lazy(() => MeetingWhereInputObjectSchema).optional()
}).strict();
export const MeetingUpsertWithoutNotesInputObjectSchema: z.ZodType<Prisma.MeetingUpsertWithoutNotesInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpsertWithoutNotesInput>;
export const MeetingUpsertWithoutNotesInputObjectZodSchema = makeSchema();
