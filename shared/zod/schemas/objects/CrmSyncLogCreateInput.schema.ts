import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { MeetingCreateNestedOneWithoutCrmSyncLogsInputObjectSchema } from './MeetingCreateNestedOneWithoutCrmSyncLogsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  status: z.string().max(50),
  syncData: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  error: z.string().nullish(),
  createdAt: z.date().optional(),
  meeting: z.lazy(() => MeetingCreateNestedOneWithoutCrmSyncLogsInputObjectSchema)
}).strict();
export const CrmSyncLogCreateInputObjectSchema: z.ZodType<Prisma.CrmSyncLogCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogCreateInput>;
export const CrmSyncLogCreateInputObjectZodSchema = makeSchema();
