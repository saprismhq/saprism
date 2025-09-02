import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingUpdateWithoutCallSessionsInputObjectSchema } from './MeetingUpdateWithoutCallSessionsInput.schema';
import { MeetingUncheckedUpdateWithoutCallSessionsInputObjectSchema } from './MeetingUncheckedUpdateWithoutCallSessionsInput.schema';
import { MeetingCreateWithoutCallSessionsInputObjectSchema } from './MeetingCreateWithoutCallSessionsInput.schema';
import { MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCallSessionsInput.schema';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => MeetingUpdateWithoutCallSessionsInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutCallSessionsInputObjectSchema)]),
  create: z.union([z.lazy(() => MeetingCreateWithoutCallSessionsInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutCallSessionsInputObjectSchema)]),
  where: z.lazy(() => MeetingWhereInputObjectSchema).optional()
}).strict();
export const MeetingUpsertWithoutCallSessionsInputObjectSchema: z.ZodType<Prisma.MeetingUpsertWithoutCallSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpsertWithoutCallSessionsInput>;
export const MeetingUpsertWithoutCallSessionsInputObjectZodSchema = makeSchema();
