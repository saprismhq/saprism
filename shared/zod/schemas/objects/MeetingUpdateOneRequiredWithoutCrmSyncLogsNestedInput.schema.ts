import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateWithoutCrmSyncLogsInputObjectSchema } from './MeetingCreateWithoutCrmSyncLogsInput.schema';
import { MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUncheckedCreateWithoutCrmSyncLogsInput.schema';
import { MeetingCreateOrConnectWithoutCrmSyncLogsInputObjectSchema } from './MeetingCreateOrConnectWithoutCrmSyncLogsInput.schema';
import { MeetingUpsertWithoutCrmSyncLogsInputObjectSchema } from './MeetingUpsertWithoutCrmSyncLogsInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateToOneWithWhereWithoutCrmSyncLogsInputObjectSchema } from './MeetingUpdateToOneWithWhereWithoutCrmSyncLogsInput.schema';
import { MeetingUpdateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUpdateWithoutCrmSyncLogsInput.schema';
import { MeetingUncheckedUpdateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUncheckedUpdateWithoutCrmSyncLogsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => MeetingCreateWithoutCrmSyncLogsInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MeetingCreateOrConnectWithoutCrmSyncLogsInputObjectSchema).optional(),
  upsert: z.lazy(() => MeetingUpsertWithoutCrmSyncLogsInputObjectSchema).optional(),
  connect: z.lazy(() => MeetingWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => MeetingUpdateToOneWithWhereWithoutCrmSyncLogsInputObjectSchema), z.lazy(() => MeetingUpdateWithoutCrmSyncLogsInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutCrmSyncLogsInputObjectSchema)]).optional()
}).strict();
export const MeetingUpdateOneRequiredWithoutCrmSyncLogsNestedInputObjectSchema: z.ZodType<Prisma.MeetingUpdateOneRequiredWithoutCrmSyncLogsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpdateOneRequiredWithoutCrmSyncLogsNestedInput>;
export const MeetingUpdateOneRequiredWithoutCrmSyncLogsNestedInputObjectZodSchema = makeSchema();
