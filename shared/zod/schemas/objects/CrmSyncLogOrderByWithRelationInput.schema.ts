import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MeetingOrderByWithRelationInputObjectSchema } from './MeetingOrderByWithRelationInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  syncData: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  error: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  meeting: z.lazy(() => MeetingOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CrmSyncLogOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CrmSyncLogOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CrmSyncLogOrderByWithRelationInput>;
export const CrmSyncLogOrderByWithRelationInputObjectZodSchema = makeSchema();
