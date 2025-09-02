import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CrmSyncLogCreateWithoutMeetingInputObjectSchema } from './CrmSyncLogCreateWithoutMeetingInput.schema';
import { CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema } from './CrmSyncLogUncheckedCreateWithoutMeetingInput.schema';
import { CrmSyncLogCreateOrConnectWithoutMeetingInputObjectSchema } from './CrmSyncLogCreateOrConnectWithoutMeetingInput.schema';
import { CrmSyncLogCreateManyMeetingInputEnvelopeObjectSchema } from './CrmSyncLogCreateManyMeetingInputEnvelope.schema';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './CrmSyncLogWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => CrmSyncLogCreateWithoutMeetingInputObjectSchema), z.lazy(() => CrmSyncLogCreateWithoutMeetingInputObjectSchema).array(), z.lazy(() => CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema), z.lazy(() => CrmSyncLogUncheckedCreateWithoutMeetingInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CrmSyncLogCreateOrConnectWithoutMeetingInputObjectSchema), z.lazy(() => CrmSyncLogCreateOrConnectWithoutMeetingInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CrmSyncLogCreateManyMeetingInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema), z.lazy(() => CrmSyncLogWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CrmSyncLogCreateNestedManyWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CrmSyncLogCreateNestedManyWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogCreateNestedManyWithoutMeetingInput>;
export const CrmSyncLogCreateNestedManyWithoutMeetingInputObjectZodSchema = makeSchema();
