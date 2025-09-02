import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MeetingOrderByWithRelationInputObjectSchema } from './objects/MeetingOrderByWithRelationInput.schema';
import { MeetingWhereInputObjectSchema } from './objects/MeetingWhereInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './objects/MeetingWhereUniqueInput.schema';
import { MeetingCountAggregateInputObjectSchema } from './objects/MeetingCountAggregateInput.schema';

export const MeetingCountSchema: z.ZodType<Prisma.MeetingCountArgs> = z.object({ orderBy: z.union([MeetingOrderByWithRelationInputObjectSchema, MeetingOrderByWithRelationInputObjectSchema.array()]).optional(), where: MeetingWhereInputObjectSchema.optional(), cursor: MeetingWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), MeetingCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.MeetingCountArgs>;

export const MeetingCountZodSchema = z.object({ orderBy: z.union([MeetingOrderByWithRelationInputObjectSchema, MeetingOrderByWithRelationInputObjectSchema.array()]).optional(), where: MeetingWhereInputObjectSchema.optional(), cursor: MeetingWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), MeetingCountAggregateInputObjectSchema ]).optional() }).strict();