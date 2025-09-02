import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CallSessionIncludeObjectSchema } from './objects/CallSessionInclude.schema';
import { CallSessionOrderByWithRelationInputObjectSchema } from './objects/CallSessionOrderByWithRelationInput.schema';
import { CallSessionWhereInputObjectSchema } from './objects/CallSessionWhereInput.schema';
import { CallSessionWhereUniqueInputObjectSchema } from './objects/CallSessionWhereUniqueInput.schema';
import { CallSessionScalarFieldEnumSchema } from './enums/CallSessionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CallSessionFindManySelectSchema: z.ZodType<Prisma.CallSessionSelect> = z.object({
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
    meeting: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CallSessionSelect>;

export const CallSessionFindManySelectZodSchema = z.object({
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
    meeting: z.boolean().optional()
  }).strict();

export const CallSessionFindManySchema: z.ZodType<Prisma.CallSessionFindManyArgs> = z.object({ select: CallSessionFindManySelectSchema.optional(), include: z.lazy(() => CallSessionIncludeObjectSchema.optional()), orderBy: z.union([CallSessionOrderByWithRelationInputObjectSchema, CallSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CallSessionWhereInputObjectSchema.optional(), cursor: CallSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CallSessionScalarFieldEnumSchema, CallSessionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CallSessionFindManyArgs>;

export const CallSessionFindManyZodSchema = z.object({ select: CallSessionFindManySelectSchema.optional(), include: z.lazy(() => CallSessionIncludeObjectSchema.optional()), orderBy: z.union([CallSessionOrderByWithRelationInputObjectSchema, CallSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CallSessionWhereInputObjectSchema.optional(), cursor: CallSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CallSessionScalarFieldEnumSchema, CallSessionScalarFieldEnumSchema.array()]).optional() }).strict();