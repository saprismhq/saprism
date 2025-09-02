import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingCreateWithoutNotesInputObjectSchema } from './MeetingCreateWithoutNotesInput.schema';
import { MeetingUncheckedCreateWithoutNotesInputObjectSchema } from './MeetingUncheckedCreateWithoutNotesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MeetingCreateWithoutNotesInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutNotesInputObjectSchema)])
}).strict();
export const MeetingCreateOrConnectWithoutNotesInputObjectSchema: z.ZodType<Prisma.MeetingCreateOrConnectWithoutNotesInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateOrConnectWithoutNotesInput>;
export const MeetingCreateOrConnectWithoutNotesInputObjectZodSchema = makeSchema();
