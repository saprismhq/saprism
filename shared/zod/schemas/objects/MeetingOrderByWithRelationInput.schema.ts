import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ClientOrderByWithRelationInputObjectSchema } from './ClientOrderByWithRelationInput.schema';
import { NoteOrderByRelationAggregateInputObjectSchema } from './NoteOrderByRelationAggregateInput.schema';
import { CoachingSuggestionOrderByRelationAggregateInputObjectSchema } from './CoachingSuggestionOrderByRelationAggregateInput.schema';
import { CrmSyncLogOrderByRelationAggregateInputObjectSchema } from './CrmSyncLogOrderByRelationAggregateInput.schema';
import { CallSessionOrderByRelationAggregateInputObjectSchema } from './CallSessionOrderByRelationAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  clientId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  clientName: SortOrderSchema.optional(),
  clientCompany: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dealType: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  summary: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  client: z.lazy(() => ClientOrderByWithRelationInputObjectSchema).optional(),
  notes: z.lazy(() => NoteOrderByRelationAggregateInputObjectSchema).optional(),
  coachingSuggestions: z.lazy(() => CoachingSuggestionOrderByRelationAggregateInputObjectSchema).optional(),
  crmSyncLogs: z.lazy(() => CrmSyncLogOrderByRelationAggregateInputObjectSchema).optional(),
  callSessions: z.lazy(() => CallSessionOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const MeetingOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.MeetingOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingOrderByWithRelationInput>;
export const MeetingOrderByWithRelationInputObjectZodSchema = makeSchema();
