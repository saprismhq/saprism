import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CoachingSuggestionOrderByWithRelationInputObjectSchema } from './objects/CoachingSuggestionOrderByWithRelationInput.schema';
import { CoachingSuggestionWhereInputObjectSchema } from './objects/CoachingSuggestionWhereInput.schema';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './objects/CoachingSuggestionWhereUniqueInput.schema';
import { CoachingSuggestionCountAggregateInputObjectSchema } from './objects/CoachingSuggestionCountAggregateInput.schema';

export const CoachingSuggestionCountSchema: z.ZodType<Prisma.CoachingSuggestionCountArgs> = z.object({ orderBy: z.union([CoachingSuggestionOrderByWithRelationInputObjectSchema, CoachingSuggestionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CoachingSuggestionWhereInputObjectSchema.optional(), cursor: CoachingSuggestionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CoachingSuggestionCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CoachingSuggestionCountArgs>;

export const CoachingSuggestionCountZodSchema = z.object({ orderBy: z.union([CoachingSuggestionOrderByWithRelationInputObjectSchema, CoachingSuggestionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CoachingSuggestionWhereInputObjectSchema.optional(), cursor: CoachingSuggestionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CoachingSuggestionCountAggregateInputObjectSchema ]).optional() }).strict();