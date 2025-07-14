import { z } from 'zod';
import { NoteUpdateManyMutationInputObjectSchema } from './objects/NoteUpdateManyMutationInput.schema';
import { NoteWhereInputObjectSchema } from './objects/NoteWhereInput.schema';

export const NoteUpdateManySchema = z.object({
  data: NoteUpdateManyMutationInputObjectSchema,
  where: NoteWhereInputObjectSchema.optional(),
});
