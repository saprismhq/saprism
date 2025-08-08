import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ClientOrderByWithRelationInputObjectSchema } from './ClientOrderByWithRelationInput.schema';
import { NoteOrderByRelationAggregateInputObjectSchema } from './NoteOrderByRelationAggregateInput.schema';
import { CoachingSuggestionOrderByRelationAggregateInputObjectSchema } from './CoachingSuggestionOrderByRelationAggregateInput.schema';
import { CrmSyncLogOrderByRelationAggregateInputObjectSchema } from './CrmSyncLogOrderByRelationAggregateInput.schema';
import { CallSessionOrderByRelationAggregateInputObjectSchema } from './CallSessionOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MeetingOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    clientId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    clientName: z.lazy(() => SortOrderSchema).optional(),
    clientCompany: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    dealType: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    client: z.lazy(() => ClientOrderByWithRelationInputObjectSchema).optional(),
    notes: z
      .lazy(() => NoteOrderByRelationAggregateInputObjectSchema)
      .optional(),
    coachingSuggestions: z
      .lazy(() => CoachingSuggestionOrderByRelationAggregateInputObjectSchema)
      .optional(),
    crmSyncLogs: z
      .lazy(() => CrmSyncLogOrderByRelationAggregateInputObjectSchema)
      .optional(),
    callSessions: z
      .lazy(() => CallSessionOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const MeetingOrderByWithRelationInputObjectSchema = Schema;
