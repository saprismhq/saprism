import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ClientOrderByWithRelationInputObjectSchema } from './objects/ClientOrderByWithRelationInput.schema';
import { ClientWhereInputObjectSchema } from './objects/ClientWhereInput.schema';
import { ClientWhereUniqueInputObjectSchema } from './objects/ClientWhereUniqueInput.schema';
import { ClientCountAggregateInputObjectSchema } from './objects/ClientCountAggregateInput.schema';

export const ClientCountSchema: z.ZodType<Prisma.ClientCountArgs> = z.object({ orderBy: z.union([ClientOrderByWithRelationInputObjectSchema, ClientOrderByWithRelationInputObjectSchema.array()]).optional(), where: ClientWhereInputObjectSchema.optional(), cursor: ClientWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ClientCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ClientCountArgs>;

export const ClientCountZodSchema = z.object({ orderBy: z.union([ClientOrderByWithRelationInputObjectSchema, ClientOrderByWithRelationInputObjectSchema.array()]).optional(), where: ClientWhereInputObjectSchema.optional(), cursor: ClientWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ClientCountAggregateInputObjectSchema ]).optional() }).strict();