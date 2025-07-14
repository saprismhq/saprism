import { z } from 'zod';
import { NoteOrderByWithRelationInputObjectSchema } from './objects/NoteOrderByWithRelationInput.schema';
import { NoteWhereInputObjectSchema } from './objects/NoteWhereInput.schema';
import { NoteWhereUniqueInputObjectSchema } from './objects/NoteWhereUniqueInput.schema';
import { NoteScalarFieldEnumSchema } from './enums/NoteScalarFieldEnum.schema';

export const NoteFindManySchema = z.object({
  orderBy: z
    .union([
      NoteOrderByWithRelationInputObjectSchema,
      NoteOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: NoteWhereInputObjectSchema.optional(),
  cursor: NoteWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(NoteScalarFieldEnumSchema).optional(),
});
