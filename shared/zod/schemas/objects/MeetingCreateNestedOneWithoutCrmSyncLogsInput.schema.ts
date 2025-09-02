import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateWithoutCrmSyncLogsInputObjectSchema } from './MeetingCreateWithoutCrmSyncLogsInput.schema';
import { MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUncheckedCreateWithoutCrmSyncLogsInput.schema';
import { MeetingCreateOrConnectWithoutCrmSyncLogsInputObjectSchema } from './MeetingCreateOrConnectWithoutCrmSyncLogsInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => MeetingCreateWithoutCrmSyncLogsInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MeetingCreateOrConnectWithoutCrmSyncLogsInputObjectSchema).optional(),
  connect: z.lazy(() => MeetingWhereUniqueInputObjectSchema).optional()
}).strict();
export const MeetingCreateNestedOneWithoutCrmSyncLogsInputObjectSchema: z.ZodType<Prisma.MeetingCreateNestedOneWithoutCrmSyncLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateNestedOneWithoutCrmSyncLogsInput>;
export const MeetingCreateNestedOneWithoutCrmSyncLogsInputObjectZodSchema = makeSchema();
