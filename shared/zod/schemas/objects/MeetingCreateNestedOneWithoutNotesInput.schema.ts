import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateWithoutNotesInputObjectSchema } from './MeetingCreateWithoutNotesInput.schema';
import { MeetingUncheckedCreateWithoutNotesInputObjectSchema } from './MeetingUncheckedCreateWithoutNotesInput.schema';
import { MeetingCreateOrConnectWithoutNotesInputObjectSchema } from './MeetingCreateOrConnectWithoutNotesInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => MeetingCreateWithoutNotesInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutNotesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MeetingCreateOrConnectWithoutNotesInputObjectSchema).optional(),
  connect: z.lazy(() => MeetingWhereUniqueInputObjectSchema).optional()
}).strict();
export const MeetingCreateNestedOneWithoutNotesInputObjectSchema: z.ZodType<Prisma.MeetingCreateNestedOneWithoutNotesInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateNestedOneWithoutNotesInput>;
export const MeetingCreateNestedOneWithoutNotesInputObjectZodSchema = makeSchema();
