import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CrmSyncLogOrderByWithRelationInputObjectSchema } from './objects/CrmSyncLogOrderByWithRelationInput.schema';
import { CrmSyncLogWhereInputObjectSchema } from './objects/CrmSyncLogWhereInput.schema';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './objects/CrmSyncLogWhereUniqueInput.schema';
import { CrmSyncLogCountAggregateInputObjectSchema } from './objects/CrmSyncLogCountAggregateInput.schema';

export const CrmSyncLogCountSchema: z.ZodType<Prisma.CrmSyncLogCountArgs> = z.object({ orderBy: z.union([CrmSyncLogOrderByWithRelationInputObjectSchema, CrmSyncLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: CrmSyncLogWhereInputObjectSchema.optional(), cursor: CrmSyncLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CrmSyncLogCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CrmSyncLogCountArgs>;

export const CrmSyncLogCountZodSchema = z.object({ orderBy: z.union([CrmSyncLogOrderByWithRelationInputObjectSchema, CrmSyncLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: CrmSyncLogWhereInputObjectSchema.optional(), cursor: CrmSyncLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CrmSyncLogCountAggregateInputObjectSchema ]).optional() }).strict();