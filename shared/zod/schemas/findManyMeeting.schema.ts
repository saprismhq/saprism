import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MeetingIncludeObjectSchema } from './objects/MeetingInclude.schema';
import { MeetingOrderByWithRelationInputObjectSchema } from './objects/MeetingOrderByWithRelationInput.schema';
import { MeetingWhereInputObjectSchema } from './objects/MeetingWhereInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './objects/MeetingWhereUniqueInput.schema';
import { MeetingScalarFieldEnumSchema } from './enums/MeetingScalarFieldEnum.schema';
import { MeetingCountOutputTypeArgsObjectSchema } from './objects/MeetingCountOutputTypeArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MeetingFindManySelectSchema: z.ZodType<Prisma.MeetingSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    clientId: z.boolean().optional(),
    clientName: z.boolean().optional(),
    clientCompany: z.boolean().optional(),
    dealType: z.boolean().optional(),
    status: z.boolean().optional(),
    summary: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional(),
    client: z.boolean().optional(),
    notes: z.boolean().optional(),
    coachingSuggestions: z.boolean().optional(),
    crmSyncLogs: z.boolean().optional(),
    callSessions: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.MeetingSelect>;

export const MeetingFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    clientId: z.boolean().optional(),
    clientName: z.boolean().optional(),
    clientCompany: z.boolean().optional(),
    dealType: z.boolean().optional(),
    status: z.boolean().optional(),
    summary: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional(),
    client: z.boolean().optional(),
    notes: z.boolean().optional(),
    coachingSuggestions: z.boolean().optional(),
    crmSyncLogs: z.boolean().optional(),
    callSessions: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const MeetingFindManySchema: z.ZodType<Prisma.MeetingFindManyArgs> = z.object({ select: MeetingFindManySelectSchema.optional(), include: z.lazy(() => MeetingIncludeObjectSchema.optional()), orderBy: z.union([MeetingOrderByWithRelationInputObjectSchema, MeetingOrderByWithRelationInputObjectSchema.array()]).optional(), where: MeetingWhereInputObjectSchema.optional(), cursor: MeetingWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([MeetingScalarFieldEnumSchema, MeetingScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.MeetingFindManyArgs>;

export const MeetingFindManyZodSchema = z.object({ select: MeetingFindManySelectSchema.optional(), include: z.lazy(() => MeetingIncludeObjectSchema.optional()), orderBy: z.union([MeetingOrderByWithRelationInputObjectSchema, MeetingOrderByWithRelationInputObjectSchema.array()]).optional(), where: MeetingWhereInputObjectSchema.optional(), cursor: MeetingWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([MeetingScalarFieldEnumSchema, MeetingScalarFieldEnumSchema.array()]).optional() }).strict();