import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  status: z.string().max(50),
  syncData: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  error: z.string().nullish(),
  createdAt: z.date().optional()
}).strict();
export const CrmSyncLogCreateWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CrmSyncLogCreateWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogCreateWithoutMeetingInput>;
export const CrmSyncLogCreateWithoutMeetingInputObjectZodSchema = makeSchema();
