import { z } from 'zod';
export const CrmSyncLogFindUniqueResultSchema = z.nullable(z.object({
  id: z.number().int(),
  meetingId: z.number().int(),
  status: z.string(),
  syncData: z.unknown().optional(),
  error: z.string().optional(),
  createdAt: z.date(),
  meeting: z.unknown()
}));