import { z } from 'zod';
export const CallSessionAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    meetingId: z.number(),
    liveKitRoomName: z.number(),
    liveKitToken: z.number(),
    participants: z.number(),
    status: z.number(),
    startedAt: z.number(),
    endedAt: z.number(),
    transcription: z.number(),
    sessionMetadata: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    meeting: z.number()
  }).optional(),
  _sum: z.object({
    meetingId: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    meetingId: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    meetingId: z.number().int().nullable(),
    liveKitRoomName: z.string().nullable(),
    liveKitToken: z.string().nullable(),
    status: z.string().nullable(),
    startedAt: z.date().nullable(),
    endedAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    meetingId: z.number().int().nullable(),
    liveKitRoomName: z.string().nullable(),
    liveKitToken: z.string().nullable(),
    status: z.string().nullable(),
    startedAt: z.date().nullable(),
    endedAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});