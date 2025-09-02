import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MeetingOrderByWithRelationInputObjectSchema } from './MeetingOrderByWithRelationInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  meetingId: SortOrderSchema.optional(),
  liveKitRoomName: SortOrderSchema.optional(),
  liveKitToken: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  participants: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  startedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  endedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  transcription: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  sessionMetadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  meeting: z.lazy(() => MeetingOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CallSessionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CallSessionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionOrderByWithRelationInput>;
export const CallSessionOrderByWithRelationInputObjectZodSchema = makeSchema();
