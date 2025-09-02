import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CrmSyncLogIncludeObjectSchema } from './objects/CrmSyncLogInclude.schema';
import { CrmSyncLogOrderByWithRelationInputObjectSchema } from './objects/CrmSyncLogOrderByWithRelationInput.schema';
import { CrmSyncLogWhereInputObjectSchema } from './objects/CrmSyncLogWhereInput.schema';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './objects/CrmSyncLogWhereUniqueInput.schema';
import { CrmSyncLogScalarFieldEnumSchema } from './enums/CrmSyncLogScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CrmSyncLogFindFirstSelectSchema: z.ZodType<Prisma.CrmSyncLogSelect> = z.object({
    id: z.boolean().optional(),
    meetingId: z.boolean().optional(),
    status: z.boolean().optional(),
    syncData: z.boolean().optional(),
    error: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    meeting: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CrmSyncLogSelect>;

export const CrmSyncLogFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    meetingId: z.boolean().optional(),
    status: z.boolean().optional(),
    syncData: z.boolean().optional(),
    error: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    meeting: z.boolean().optional()
  }).strict();

export const CrmSyncLogFindFirstSchema: z.ZodType<Prisma.CrmSyncLogFindFirstArgs> = z.object({ select: CrmSyncLogFindFirstSelectSchema.optional(), include: z.lazy(() => CrmSyncLogIncludeObjectSchema.optional()), orderBy: z.union([CrmSyncLogOrderByWithRelationInputObjectSchema, CrmSyncLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: CrmSyncLogWhereInputObjectSchema.optional(), cursor: CrmSyncLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CrmSyncLogScalarFieldEnumSchema, CrmSyncLogScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CrmSyncLogFindFirstArgs>;

export const CrmSyncLogFindFirstZodSchema = z.object({ select: CrmSyncLogFindFirstSelectSchema.optional(), include: z.lazy(() => CrmSyncLogIncludeObjectSchema.optional()), orderBy: z.union([CrmSyncLogOrderByWithRelationInputObjectSchema, CrmSyncLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: CrmSyncLogWhereInputObjectSchema.optional(), cursor: CrmSyncLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CrmSyncLogScalarFieldEnumSchema, CrmSyncLogScalarFieldEnumSchema.array()]).optional() }).strict();