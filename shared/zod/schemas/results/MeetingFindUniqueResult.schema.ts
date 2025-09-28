import { z } from 'zod';
export const MeetingFindUniqueResultSchema = z.nullable(z.object({
  id: z.number().int(),
  userId: z.string(),
  clientId: z.number().int().optional(),
  clientName: z.string(),
  clientCompany: z.string().optional(),
  dealType: z.string(),
  status: z.string(),
  summary: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.unknown(),
  client: z.unknown().optional(),
  notes: z.array(z.unknown()),
  coachingSuggestions: z.array(z.unknown()),
  crmSyncLogs: z.array(z.unknown()),
  callSessions: z.array(z.unknown())
}));