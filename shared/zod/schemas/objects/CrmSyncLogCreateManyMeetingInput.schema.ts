import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int().optional(),
  status: z.string(),
  syncData: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  error: z.string().nullish(),
  createdAt: z.date().optional()
}).strict();
export const CrmSyncLogCreateManyMeetingInputObjectSchema: z.ZodType<Prisma.CrmSyncLogCreateManyMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogCreateManyMeetingInput>;
export const CrmSyncLogCreateManyMeetingInputObjectZodSchema = makeSchema();
