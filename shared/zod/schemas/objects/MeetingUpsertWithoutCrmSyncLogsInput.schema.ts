import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingUpdateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUpdateWithoutCrmSyncLogsInput.schema';
import { MeetingUncheckedUpdateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUncheckedUpdateWithoutCrmSyncLogsInput.schema';
import { MeetingCreateWithoutCrmSyncLogsInputObjectSchema } from './MeetingCreateWithoutCrmSyncLogsInput.schema';
import { MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUncheckedCreateWithoutCrmSyncLogsInput.schema';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => MeetingUpdateWithoutCrmSyncLogsInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutCrmSyncLogsInputObjectSchema)]),
  create: z.union([z.lazy(() => MeetingCreateWithoutCrmSyncLogsInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema)]),
  where: z.lazy(() => MeetingWhereInputObjectSchema).optional()
}).strict();
export const MeetingUpsertWithoutCrmSyncLogsInputObjectSchema: z.ZodType<Prisma.MeetingUpsertWithoutCrmSyncLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpsertWithoutCrmSyncLogsInput>;
export const MeetingUpsertWithoutCrmSyncLogsInputObjectZodSchema = makeSchema();
