import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CrmSyncLogCreateManyMeetingInputObjectSchema } from './CrmSyncLogCreateManyMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => CrmSyncLogCreateManyMeetingInputObjectSchema), z.lazy(() => CrmSyncLogCreateManyMeetingInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CrmSyncLogCreateManyMeetingInputEnvelopeObjectSchema: z.ZodType<Prisma.CrmSyncLogCreateManyMeetingInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogCreateManyMeetingInputEnvelope>;
export const CrmSyncLogCreateManyMeetingInputEnvelopeObjectZodSchema = makeSchema();
