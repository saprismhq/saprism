import { z } from 'zod';
import { NoteWhereInputObjectSchema } from './objects/NoteWhereInput.schema';
import { NoteOrderByWithAggregationInputObjectSchema } from './objects/NoteOrderByWithAggregationInput.schema';
import { NoteScalarWhereWithAggregatesInputObjectSchema } from './objects/NoteScalarWhereWithAggregatesInput.schema';
import { NoteScalarFieldEnumSchema } from './enums/NoteScalarFieldEnum.schema';
import { NoteCountAggregateInputObjectSchema } from './objects/NoteCountAggregateInput.schema';
import { NoteMinAggregateInputObjectSchema } from './objects/NoteMinAggregateInput.schema';
import { NoteMaxAggregateInputObjectSchema } from './objects/NoteMaxAggregateInput.schema';

export const NoteGroupBySchema = z.object({ where: NoteWhereInputObjectSchema.optional(), orderBy: z.union([NoteOrderByWithAggregationInputObjectSchema, NoteOrderByWithAggregationInputObjectSchema.array()]).optional(), having: NoteScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(NoteScalarFieldEnumSchema), _count: z.union([ z.literal(true), NoteCountAggregateInputObjectSchema ]).optional(), _min: NoteMinAggregateInputObjectSchema.optional(), _max: NoteMaxAggregateInputObjectSchema.optional() })