import { z } from 'zod';
export const ClientDeleteResultSchema = z.nullable(z.object({
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
}));