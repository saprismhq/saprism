import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.number().int().optional(),
  meetingId: z.number().int(),
  status: z.string().max(50),
  syncData: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  error: z.string().nullish(),
  createdAt: z.date().optional()
}).strict();
export const CrmSyncLogUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CrmSyncLogUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogUncheckedCreateInput>;
export const CrmSyncLogUncheckedCreateInputObjectZodSchema = makeSchema();
