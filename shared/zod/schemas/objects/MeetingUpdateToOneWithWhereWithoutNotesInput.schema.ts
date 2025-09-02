import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema';
import { MeetingUpdateWithoutNotesInputObjectSchema } from './MeetingUpdateWithoutNotesInput.schema';
import { MeetingUncheckedUpdateWithoutNotesInputObjectSchema } from './MeetingUncheckedUpdateWithoutNotesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => MeetingUpdateWithoutNotesInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutNotesInputObjectSchema)])
}).strict();
export const MeetingUpdateToOneWithWhereWithoutNotesInputObjectSchema: z.ZodType<Prisma.MeetingUpdateToOneWithWhereWithoutNotesInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpdateToOneWithWhereWithoutNotesInput>;
export const MeetingUpdateToOneWithWhereWithoutNotesInputObjectZodSchema = makeSchema();
