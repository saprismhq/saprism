import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateWithoutNotesInputObjectSchema } from './MeetingCreateWithoutNotesInput.schema';
import { MeetingUncheckedCreateWithoutNotesInputObjectSchema } from './MeetingUncheckedCreateWithoutNotesInput.schema';
import { MeetingCreateOrConnectWithoutNotesInputObjectSchema } from './MeetingCreateOrConnectWithoutNotesInput.schema';
import { MeetingUpsertWithoutNotesInputObjectSchema } from './MeetingUpsertWithoutNotesInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateToOneWithWhereWithoutNotesInputObjectSchema } from './MeetingUpdateToOneWithWhereWithoutNotesInput.schema';
import { MeetingUpdateWithoutNotesInputObjectSchema } from './MeetingUpdateWithoutNotesInput.schema';
import { MeetingUncheckedUpdateWithoutNotesInputObjectSchema } from './MeetingUncheckedUpdateWithoutNotesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => MeetingCreateWithoutNotesInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutNotesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MeetingCreateOrConnectWithoutNotesInputObjectSchema).optional(),
  upsert: z.lazy(() => MeetingUpsertWithoutNotesInputObjectSchema).optional(),
  connect: z.lazy(() => MeetingWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => MeetingUpdateToOneWithWhereWithoutNotesInputObjectSchema), z.lazy(() => MeetingUpdateWithoutNotesInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutNotesInputObjectSchema)]).optional()
}).strict();
export const MeetingUpdateOneRequiredWithoutNotesNestedInputObjectSchema: z.ZodType<Prisma.MeetingUpdateOneRequiredWithoutNotesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpdateOneRequiredWithoutNotesNestedInput>;
export const MeetingUpdateOneRequiredWithoutNotesNestedInputObjectZodSchema = makeSchema();
