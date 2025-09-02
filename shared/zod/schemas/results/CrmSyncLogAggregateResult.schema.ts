import { z } from 'zod';
export const CrmSyncLogAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    meetingId: z.number(),
    status: z.number(),
    syncData: z.number(),
    error: z.number(),
    createdAt: z.number(),
    meeting: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    meetingId: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    meetingId: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    meetingId: z.number().int().nullable(),
    status: z.string().nullable(),
    error: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    meetingId: z.number().int().nullable(),
    status: z.string().nullable(),
    error: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});