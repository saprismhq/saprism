import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CallSessionOrderByWithRelationInputObjectSchema } from './objects/CallSessionOrderByWithRelationInput.schema';
import { CallSessionWhereInputObjectSchema } from './objects/CallSessionWhereInput.schema';
import { CallSessionWhereUniqueInputObjectSchema } from './objects/CallSessionWhereUniqueInput.schema';
import { CallSessionCountAggregateInputObjectSchema } from './objects/CallSessionCountAggregateInput.schema';

export const CallSessionCountSchema: z.ZodType<Prisma.CallSessionCountArgs> = z.object({ orderBy: z.union([CallSessionOrderByWithRelationInputObjectSchema, CallSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CallSessionWhereInputObjectSchema.optional(), cursor: CallSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CallSessionCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CallSessionCountArgs>;

export const CallSessionCountZodSchema = z.object({ orderBy: z.union([CallSessionOrderByWithRelationInputObjectSchema, CallSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CallSessionWhereInputObjectSchema.optional(), cursor: CallSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CallSessionCountAggregateInputObjectSchema ]).optional() }).strict();