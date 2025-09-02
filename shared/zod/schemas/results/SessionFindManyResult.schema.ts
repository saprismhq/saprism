import { z } from 'zod';
export const SessionFindManyResultSchema = z.object({
  data: z.array(z.object({
  sid: z.string(),
  sess: z.unknown(),
  expire: z.date()
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