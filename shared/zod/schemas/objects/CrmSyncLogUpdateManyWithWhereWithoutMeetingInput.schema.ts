import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CrmSyncLogScalarWhereInputObjectSchema } from './CrmSyncLogScalarWhereInput.schema';
import { CrmSyncLogUpdateManyMutationInputObjectSchema } from './CrmSyncLogUpdateManyMutationInput.schema';
import { CrmSyncLogUncheckedUpdateManyWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedUpdateManyWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CrmSyncLogScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CrmSyncLogUpdateManyMutationInputObjectSchema), z.lazy(() => CrmSyncLogUncheckedUpdateManyWithoutMeetingInputObjectSchema)])
}).strict();
export const CrmSyncLogUpdateManyWithWhereWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CrmSyncLogUpdateManyWithWhereWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogUpdateManyWithWhereWithoutMeetingInput>;
export const CrmSyncLogUpdateManyWithWhereWithoutMeetingInputObjectZodSchema = makeSchema();
