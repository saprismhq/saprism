import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { MeetingRelationFilterObjectSchema } from './MeetingRelationFilter.schema';
import { MeetingWhereInputObjectSchema } from './MeetingWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CrmSyncLogWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CrmSyncLogWhereInputObjectSchema),
        z.lazy(() => CrmSyncLogWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CrmSyncLogWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CrmSyncLogWhereInputObjectSchema),
        z.lazy(() => CrmSyncLogWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    meetingId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    status: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    syncData: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
    error: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    meeting: z
      .union([
        z.lazy(() => MeetingRelationFilterObjectSchema),
        z.lazy(() => MeetingWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const CrmSyncLogWhereInputObjectSchema = Schema;
