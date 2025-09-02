import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema';
import { MeetingUpdateWithoutCallSessionsInputObjectSchema } from './MeetingUpdateWithoutCallSessionsInput.schema';
import { MeetingUncheckedUpdateWithoutCallSessionsInputObjectSchema } from './MeetingUncheckedUpdateWithoutCallSessionsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => MeetingUpdateWithoutCallSessionsInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutCallSessionsInputObjectSchema)])
}).strict();
export const MeetingUpdateToOneWithWhereWithoutCallSessionsInputObjectSchema: z.ZodType<Prisma.MeetingUpdateToOneWithWhereWithoutCallSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpdateToOneWithWhereWithoutCallSessionsInput>;
export const MeetingUpdateToOneWithWhereWithoutCallSessionsInputObjectZodSchema = makeSchema();
