import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './CrmSyncLogWhereUniqueInput.schema';
import { CrmSyncLogUpdateWithoutMeetingInputObjectSchema } from './CrmSyncLogUpdateWithoutMeetingInput.schema';
import { CrmSyncLogUncheckedUpdateWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedUpdateWithoutMeetingInput.schema';
import { CrmSyncLogCreateWithoutMeetingInputObjectSchema } from './CrmSyncLogCreateWithoutMeetingInput.schema';
import { CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedCreateWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CrmSyncLogUpdateWithoutMeetingInputObjectSchema), z.lazy(() => CrmSyncLogUncheckedUpdateWithoutMeetingInputObjectSchema)]),
  create: z.union([z.lazy(() => CrmSyncLogCreateWithoutMeetingInputObjectSchema), z.lazy(() => CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema)])
}).strict();
export const CrmSyncLogUpsertWithWhereUniqueWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CrmSyncLogUpsertWithWhereUniqueWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogUpsertWithWhereUniqueWithoutMeetingInput>;
export const CrmSyncLogUpsertWithWhereUniqueWithoutMeetingInputObjectZodSchema = makeSchema();
