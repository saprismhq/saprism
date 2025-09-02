import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingCreateWithoutCrmSyncLogsInputObjectSchema } from './MeetingCreateWithoutCrmSyncLogsInput.schema';
import { MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema } from './MeetingUncheckedCreateWithoutCrmSyncLogsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MeetingCreateWithoutCrmSyncLogsInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutCrmSyncLogsInputObjectSchema)])
}).strict();
export const MeetingCreateOrConnectWithoutCrmSyncLogsInputObjectSchema: z.ZodType<Prisma.MeetingCreateOrConnectWithoutCrmSyncLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingCreateOrConnectWithoutCrmSyncLogsInput>;
export const MeetingCreateOrConnectWithoutCrmSyncLogsInputObjectZodSchema = makeSchema();
