import { z } from 'zod';
export const NoteGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  meetingId: z.number().int(),
  content: z.string(),
  aiAnalysis: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    meetingId: z.number(),
    content: z.number(),
    aiAnalysis: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
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
    content: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    meetingId: z.number().int().nullable(),
    content: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));