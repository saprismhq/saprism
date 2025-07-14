import { z } from 'zod';
import { NoteCreateManyInputObjectSchema } from './objects/NoteCreateManyInput.schema';

export const NoteCreateManySchema = z.object({
  data: z.union([
    NoteCreateManyInputObjectSchema,
    z.array(NoteCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
