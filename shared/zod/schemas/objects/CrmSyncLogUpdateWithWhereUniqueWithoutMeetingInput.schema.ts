import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './CrmSyncLogWhereUniqueInput.schema';
import { CrmSyncLogUpdateWithoutMeetingInputObjectSchema } from './CrmSyncLogUpdateWithoutMeetingInput.schema';
import { CrmSyncLogUncheckedUpdateWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedUpdateWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CrmSyncLogUpdateWithoutMeetingInputObjectSchema), z.lazy(() => CrmSyncLogUncheckedUpdateWithoutMeetingInputObjectSchema)])
}).strict();
export const CrmSyncLogUpdateWithWhereUniqueWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CrmSyncLogUpdateWithWhereUniqueWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogUpdateWithWhereUniqueWithoutMeetingInput>;
export const CrmSyncLogUpdateWithWhereUniqueWithoutMeetingInputObjectZodSchema = makeSchema();
