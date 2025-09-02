import { z } from 'zod';
import { NoteOrderByWithRelationInputObjectSchema } from './objects/NoteOrderByWithRelationInput.schema';
import { NoteWhereInputObjectSchema } from './objects/NoteWhereInput.schema';
import { NoteWhereUniqueInputObjectSchema } from './objects/NoteWhereUniqueInput.schema';
import { NoteCountAggregateInputObjectSchema } from './objects/NoteCountAggregateInput.schema';
import { NoteMinAggregateInputObjectSchema } from './objects/NoteMinAggregateInput.schema';
import { NoteMaxAggregateInputObjectSchema } from './objects/NoteMaxAggregateInput.schema';
import { NoteAvgAggregateInputObjectSchema } from './objects/NoteAvgAggregateInput.schema';
import { NoteSumAggregateInputObjectSchema } from './objects/NoteSumAggregateInput.schema';

export const NoteAggregateSchema = z.object({ orderBy: z.union([NoteOrderByWithRelationInputObjectSchema, NoteOrderByWithRelationInputObjectSchema.array()]).optional(), where: NoteWhereInputObjectSchema.optional(), cursor: NoteWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), NoteCountAggregateInputObjectSchema ]).optional(), _min: NoteMinAggregateInputObjectSchema.optional(), _max: NoteMaxAggregateInputObjectSchema.optional(), _avg: NoteAvgAggregateInputObjectSchema.optional(), _sum: NoteSumAggregateInputObjectSchema.optional() })