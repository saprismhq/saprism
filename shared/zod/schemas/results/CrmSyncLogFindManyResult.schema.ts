import { z } from 'zod';
export const CrmSyncLogFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  meetingId: z.number().int(),
  status: z.string(),
  syncData: z.unknown().optional(),
  error: z.string().optional(),
  createdAt: z.date(),
  meeting: z.unknown()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});