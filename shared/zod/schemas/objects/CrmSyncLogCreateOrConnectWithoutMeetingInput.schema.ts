import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './CrmSyncLogWhereUniqueInput.schema';
import { CrmSyncLogCreateWithoutMeetingInputObjectSchema } from './CrmSyncLogCreateWithoutMeetingInput.schema';
import { CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedCreateWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CrmSyncLogCreateWithoutMeetingInputObjectSchema), z.lazy(() => CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema)])
}).strict();
export const CrmSyncLogCreateOrConnectWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CrmSyncLogCreateOrConnectWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogCreateOrConnectWithoutMeetingInput>;
export const CrmSyncLogCreateOrConnectWithoutMeetingInputObjectZodSchema = makeSchema();
