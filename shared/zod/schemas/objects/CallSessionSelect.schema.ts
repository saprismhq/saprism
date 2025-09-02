import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingArgsObjectSchema } from './MeetingArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  meetingId: z.boolean().optional(),
  liveKitRoomName: z.boolean().optional(),
  liveKitToken: z.boolean().optional(),
  participants: z.boolean().optional(),
  status: z.boolean().optional(),
  startedAt: z.boolean().optional(),
  endedAt: z.boolean().optional(),
  transcription: z.boolean().optional(),
  sessionMetadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  meeting: z.union([z.boolean(), z.lazy(() => MeetingArgsObjectSchema)]).optional()
}).strict();
export const CallSessionSelectObjectSchema: z.ZodType<Prisma.CallSessionSelect> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionSelect>;
export const CallSessionSelectObjectZodSchema = makeSchema();
