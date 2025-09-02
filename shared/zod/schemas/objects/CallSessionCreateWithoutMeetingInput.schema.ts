import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  liveKitRoomName: z.string().max(255),
  liveKitToken: z.string().nullish(),
  participants: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  status: z.string().max(50).optional(),
  startedAt: z.date().nullish(),
  endedAt: z.date().nullish(),
  transcription: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  sessionMetadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const CallSessionCreateWithoutMeetingInputObjectSchema: z.ZodType<Prisma.CallSessionCreateWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.CallSessionCreateWithoutMeetingInput>;
export const CallSessionCreateWithoutMeetingInputObjectZodSchema = makeSchema();
