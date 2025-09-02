import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema';
import { MeetingUpdateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUpdateWithoutCrmSyncLogsInput.schema';
import { MeetingUncheckedUpdateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUncheckedUpdateWithoutCrmSyncLogsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => MeetingUpdateWithoutCrmSyncLogsInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutCrmSyncLogsInputObjectSchema)])
}).strict();
export const MeetingUpdateToOneWithWhereWithoutCrmSyncLogsInputObjectSchema: z.ZodType<Prisma.MeetingUpdateToOneWithWhereWithoutCrmSyncLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpdateToOneWithWhereWithoutCrmSyncLogsInput>;
export const MeetingUpdateToOneWithWhereWithoutCrmSyncLogsInputObjectZodSchema = makeSchema();
