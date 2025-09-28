import { z } from 'zod';
export const MeetingGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  userId: z.string(),
  clientId: z.number().int(),
  clientName: z.string(),
  clientCompany: z.string(),
  dealType: z.string(),
  status: z.string(),
  summary: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    clientId: z.number(),
    clientName: z.number(),
    clientCompany: z.number(),
    dealType: z.number(),
    status: z.number(),
    summary: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    user: z.number(),
    client: z.number(),
    notes: z.number(),
    coachingSuggestions: z.number(),
    crmSyncLogs: z.number(),
    callSessions: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    clientId: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    clientId: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    userId: z.string().nullable(),
    clientId: z.number().int().nullable(),
    clientName: z.string().nullable(),
    clientCompany: z.string().nullable(),
    dealType: z.string().nullable(),
    status: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    userId: z.string().nullable(),
    clientId: z.number().int().nullable(),
    clientName: z.string().nullable(),
    clientCompany: z.string().nullable(),
    dealType: z.string().nullable(),
    status: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));