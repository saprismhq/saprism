import { z } from 'zod';
export const CallSessionCreateResultSchema = z.object({
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
});