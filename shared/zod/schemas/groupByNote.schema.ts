import { z } from 'zod';
import { NoteWhereInputObjectSchema } from './objects/NoteWhereInput.schema';
import { NoteOrderByWithAggregationInputObjectSchema } from './objects/NoteOrderByWithAggregationInput.schema';
import { NoteScalarWhereWithAggregatesInputObjectSchema } from './objects/NoteScalarWhereWithAggregatesInput.schema';
import { NoteScalarFieldEnumSchema } from './enums/NoteScalarFieldEnum.schema';

export const NoteGroupBySchema = z.object({
  where: NoteWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      NoteOrderByWithAggregationInputObjectSchema,
      NoteOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: NoteScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(NoteScalarFieldEnumSchema),
});
