import { z } from 'zod';
export const ClientFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  userId: z.string(),
  name: z.string(),
  company: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  salesMethodology: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.unknown(),
  meetings: z.array(z.unknown())
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