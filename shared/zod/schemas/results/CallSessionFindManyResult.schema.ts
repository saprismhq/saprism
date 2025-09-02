import { z } from 'zod';
export const CallSessionFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  meetingId: z.number().int(),
  liveKitRoomName: z.string(),
  liveKitToken: z.string().optional(),
  participants: z.unknown(),
  status: z.string(),
  startedAt: z.date().optional(),
  endedAt: z.date().optional(),
  transcription: z.unknown().optional(),
  sessionMetadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  meeting: z.unknown()
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