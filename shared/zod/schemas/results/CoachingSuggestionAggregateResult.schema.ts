import { z } from 'zod';
export const CoachingSuggestionAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    meetingId: z.number(),
    type: z.number(),
    content: z.number(),
    isUsed: z.number(),
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
    type: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    meetingId: z.number().int().nullable(),
    type: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});